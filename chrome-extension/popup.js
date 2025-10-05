// Popup script for ApplyMate Job Scraper

// Hugging Face API token (hardcoded for convenience)
const HUGGINGFACE_API_TOKEN = 'Your token here';

document.addEventListener('DOMContentLoaded', function() {
  const emailInput = document.getElementById('email');
  const saveEmailBtn = document.getElementById('saveEmail');
  const scrapeJobBtn = document.getElementById('scrapeJob');
  const statusDiv = document.getElementById('status');
  const emailSetup = document.getElementById('emailSetup');
  const emailDisplay = document.getElementById('emailDisplay');
  const savedEmailDiv = document.getElementById('savedEmail');
  const changeEmailBtn = document.getElementById('changeEmail');

  // Load saved email
  chrome.storage.local.get(['userEmail'], function(result) {
    if (result.userEmail) {
      showEmailDisplay(result.userEmail);
    } else {
      showEmailSetup();
    }
  });

  // Save email button handler
  saveEmailBtn.addEventListener('click', function() {
    const email = emailInput.value.trim();
    
    if (!email) {
      showStatus('Please enter a valid email address', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('Please enter a valid email format', 'error');
      return;
    }

    chrome.storage.local.set({ userEmail: email }, function() {
      showStatus('Email saved successfully!', 'success');
      showEmailDisplay(email);
    });
  });

  // Change email button handler
  changeEmailBtn.addEventListener('click', function() {
    showEmailSetup();
    // Pre-fill the input with current email for easy editing
    chrome.storage.local.get(['userEmail'], function(result) {
      if (result.userEmail) {
        emailInput.value = result.userEmail;
      }
    });
  });

  // Scrape job button handler
  scrapeJobBtn.addEventListener('click', async function() {
    chrome.storage.local.get(['userEmail'], async function(result) {
      const email = result.userEmail;
      
      if (!email) {
        showStatus('Please enter and save your email first', 'error');
        return;
      }

      // Get current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
        if (tabs[0]) {
          scrapeJobBtn.disabled = true;
          scrapeJobBtn.textContent = 'Waiting for page...';
          
          // Small delay to let dynamic content load (especially for SPAs like LinkedIn)
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          scrapeJobBtn.textContent = 'Extracting content...';
          
          // Send message to content script to extract page content
          chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeJob' }, async function(response) {
            if (chrome.runtime.lastError) {
              scrapeJobBtn.disabled = false;
              scrapeJobBtn.textContent = 'Scrape Current Job';
              showStatus('Error: Could not access page. Make sure you\'re on a job listing page.', 'error');
              return;
            }
            
            if (response && response.success && response.pageContent) {
              // Process with AI using hardcoded token
              scrapeJobBtn.textContent = 'Processing with AI...';
              
              try {
                const jobData = await processWithAI(response.pageContent, HUGGINGFACE_API_TOKEN);
                
                scrapeJobBtn.disabled = false;
                scrapeJobBtn.textContent = 'Scrape Current Job';
                
                // Send data to Next.js API
                await sendJobToAPI(email, jobData);
              } catch (error) {
                scrapeJobBtn.disabled = false;
                scrapeJobBtn.textContent = 'Scrape Current Job';
                
                console.error('AI processing error:', error);
                showStatus(`AI Error: ${error.message}. Try again.`, 'error');
              }
            } else {
              scrapeJobBtn.disabled = false;
              scrapeJobBtn.textContent = 'Scrape Current Job';
              showStatus(response ? response.error : 'Failed to extract page content', 'error');
            }
          });
        }
      });
    });
  });

  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper function to show status messages
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    
    // Hide status after 3 seconds for success messages
    if (type === 'success') {
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 3000);
    }
  }

  // Helper function to show email setup form
  function showEmailSetup() {
    emailSetup.style.display = 'block';
    emailDisplay.style.display = 'none';
    scrapeJobBtn.disabled = true;
    emailInput.value = '';
  }

  // Helper function to show email display
  function showEmailDisplay(email) {
    emailSetup.style.display = 'none';
    emailDisplay.style.display = 'block';
    savedEmailDiv.textContent = email;
    scrapeJobBtn.disabled = false;
  }

  // Helper function to process job data with AI
  async function processWithAI(pageContent, apiToken) {
    try {
      console.log('Processing with AI using DeepSeek-R1...');
      
      // Prepare the prompt in chat format
      const systemMessage = "You are a helpful assistant that extracts structured job information from web pages. Always respond with valid JSON only, no additional text.";
      const userMessage = createExtractionPrompt(pageContent);
      
      // Call Hugging Face Router API with DeepSeek-R1 (OpenAI-compatible)
      const response = await fetch(
        'https://router.huggingface.co/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek-ai/DeepSeek-R1:fireworks-ai',
            messages: [
              {
                role: 'system',
                content: systemMessage
              },
              {
                role: 'user',
                content: userMessage
              }
            ],
            max_tokens: 500,
            temperature: 0.1
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('AI Response:', result);
      
      // Parse the OpenAI-format response
      const jobData = parseOpenAIResponse(result, pageContent);
      
      return jobData;
    } catch (error) {
      console.error('Error in AI processing:', error);
      throw error;
    }
  }

  // Helper function to create extraction prompt
  function createExtractionPrompt(pageContent) {
    const { title, content, ogTitle, ogDescription, structuredData } = pageContent;
    
    // If structured data exists, prioritize it
    if (structuredData) {
      return `You are analyzing a job posting page. Extract the job information accurately.

**Structured Data (JSON-LD):**
${structuredData}

**Page Title:** ${title}

**Page Content:**
${content.substring(0, 3000)}

Extract and provide ONLY a JSON response in this exact format:
{"title":"job title","company":"company name","location":"location","type":"remote/hybrid/onsite","description":"brief job summary"}`;
    }
    
    return `You are analyzing a job posting page. Extract the job information accurately from the content below.

**Page Title:** ${title}
${ogTitle ? `**OG Title:** ${ogTitle}` : ''}
${ogDescription ? `**Meta Description:** ${ogDescription}` : ''}

**Page Content:**
${content.substring(0, 4000)}

**Instructions:**
1. Find the job title (usually a prominent heading)
2. Identify the company name
3. Extract the location (city, state, country, or "Remote")
4. Determine job type: "remote", "hybrid", or "onsite"
5. Summarize the job description in 2-3 sentences

Provide ONLY a JSON response in this exact format (no other text):
{"title":"job title","company":"company name","location":"location","type":"remote/hybrid/onsite","description":"brief job summary"}`;
  }

  // Helper function to parse OpenAI-format response
  function parseOpenAIResponse(aiResponse, pageContent) {
    try {
      // Extract content from OpenAI-format response
      let text = '';
      
      if (aiResponse.choices && aiResponse.choices.length > 0) {
        text = aiResponse.choices[0].message?.content || '';
      }
      
      console.log('Parsing AI text:', text);
      
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[0]);
        
        // Validate and clean the data
        return {
          title: jsonData.title?.trim() || 'Job Title Not Found',
          company: jsonData.company?.trim() || 'Company Not Found',
          location: jsonData.location?.trim() || 'Location Not Specified',
          type: normalizeJobType(jsonData.type),
          description: jsonData.description?.trim() || 'Description not available',
          url: pageContent.url,
          date: pageContent.date
        };
      }
      
      throw new Error('Could not parse JSON from AI response');
    } catch (error) {
      console.error('Error parsing AI response:', error);
      
      // Return fallback data
      return {
        title: pageContent.ogTitle || pageContent.title || 'Job Title Not Found',
        company: 'Company Not Found',
        location: 'Location Not Specified',
        type: 'unknown',
        description: pageContent.ogDescription || 'Description not available',
        url: pageContent.url,
        date: pageContent.date
      };
    }
  }

  // Helper function to normalize job type
  function normalizeJobType(type) {
    if (!type) return 'unknown';
    
    const normalized = type.toLowerCase().trim();
    
    if (normalized.includes('remote')) return 'remote';
    if (normalized.includes('hybrid')) return 'hybrid';
    if (normalized.includes('onsite') || normalized.includes('on-site')) return 'onsite';
    
    return 'unknown';
  }

  // Helper function to send job data to Next.js API
  async function sendJobToAPI(email, jobData) {
    try {
      
      // For development: http://localhost:3002 (or whatever port your server uses)
      // For production: https://yourdomain.com
      const apiUrl = 'http://localhost:3002/api/saveJob';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          job: jobData
        })
      });

      if (response.ok) {
        const result = await response.json();
        showStatus(`Job saved successfully! (${result.message || 'Success'})`, 'success');
      } else {
        const errorData = await response.json();
        showStatus(`Failed to save job: ${errorData.message || 'Server error'}`, 'error');
      }
    } catch (error) {
      console.error('Error sending job to API:', error);
      showStatus('Network error: Could not connect to ApplyMate server', 'error');
    }
  }
});
