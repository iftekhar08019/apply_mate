// Popup script for ApplyMate Job Scraper

// Groq API key will be fetched from backend
let GROQ_API_KEY = null;

document.addEventListener('DOMContentLoaded', function() {
  const emailInput = document.getElementById('email');
  const saveEmailBtn = document.getElementById('saveEmail');
  const scrapeJobBtn = document.getElementById('scrapeJob');
  const statusDiv = document.getElementById('status');
  const emailSetup = document.getElementById('emailSetup');
  const emailDisplay = document.getElementById('emailDisplay');
  const savedEmailDiv = document.getElementById('savedEmail');
  const changeEmailBtn = document.getElementById('changeEmail');

  // Initialize the extension
  initializeExtension();

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

  // Initialize extension by fetching Groq API key
  async function initializeExtension() {
    try {
      const token = await fetchGroqApiKey();
      GROQ_API_KEY = token;
      console.log('Groq API key loaded successfully');
    } catch (error) {
      console.error('Failed to load Groq API key:', error);
      showStatus('Failed to initialize AI service. Please check your connection.', 'error');
    }
  }

  // Fetch Groq API key from backend
  async function fetchGroqApiKey() {
    const apiUrl = 'http://localhost:3000/api/gemini-token';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch API key: ${response.status}`);
    }

    const data = await response.json();
    return data.token;
  }

  // Scrape job button handler
  scrapeJobBtn.addEventListener('click', async function() {
    chrome.storage.local.get(['userEmail'], async function(result) {
      const email = result.userEmail;
      
      if (!email) {
        showStatus('Please enter and save your email first', 'error');
        return;
      }

      if (!GROQ_API_KEY) {
        showStatus('AI service not initialized. Please refresh and try again.', 'error');
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
              // Process with AI using token from backend
              scrapeJobBtn.textContent = 'Processing with AI...';
              
              try {
                const jobData = await processWithAI(response.pageContent, GROQ_API_KEY);
                
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
    
    // Hide status after 3 seconds for success and warning messages
    if (type === 'success' || type === 'warning') {
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
  async function processWithAI(pageContent, apiKey) {
    try {
      console.log('Processing with AI using Groq Llama 3.1 8B...');
      
      // Prepare the prompt for Groq API
      const prompt = createGroqPrompt(pageContent);
      
      // Call Groq API
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ],
            max_tokens: 1000,
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
      
      // Parse the Groq response
      const jobData = parseGroqResponse(result, pageContent);
      
      return jobData;
    } catch (error) {
      console.error('Error in AI processing:', error);
      throw error;
    }
  }

  // Helper function to create Groq extraction prompt
  function createGroqPrompt(pageContent) {
    const { title, content, ogTitle, ogDescription, structuredData } = pageContent;
    
    // If structured data exists, prioritize it
    if (structuredData) {
      return `You are a helpful assistant that extracts structured job information from web pages. Always respond with valid JSON only, no additional text.

You are analyzing a job posting page. Extract the job information accurately.

**Structured Data (JSON-LD):**
${structuredData}

**Page Title:** ${title}

**Page Content:**
${content.substring(0, 3000)}

Extract and provide ONLY a JSON response in this exact format:
{"title":"job title","company":"company name","location":"location","type":"remote/hybrid/onsite","description":"brief job summary"}`;
    }
    
    return `You are a helpful assistant that extracts structured job information from web pages. Always respond with valid JSON only, no additional text.

You are analyzing a job posting page. Extract the job information accurately from the content below.

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

  // Helper function to parse Groq response
  function parseGroqResponse(aiResponse, pageContent) {
    try {
      // Extract content from Groq response
      let text = '';
      
      if (aiResponse.choices && aiResponse.choices.length > 0) {
        const choice = aiResponse.choices[0];
        if (choice.message && choice.message.content) {
          text = choice.message.content || '';
        }
      }
      
      console.log('Parsing AI text:', text);
      
      // Try to extract JSON from the response (handle markdown code blocks)
      let jsonMatch = text.match(/```json\s*(\{[\s\S]*?\})\s*```/);
      if (!jsonMatch) {
        jsonMatch = text.match(/\{[\s\S]*\}/);
      }
      if (jsonMatch) {
        const jsonString = jsonMatch[1] || jsonMatch[0];
        const jsonData = JSON.parse(jsonString);
        
        // Validate and clean the data
        return {
          title: jsonData.title?.trim() || 'Job Title Not Found',
          company: jsonData.company?.trim() || 'Company Not Found',
          location: jsonData.location?.trim() || 'Location Not Specified',
          type: normalizeJobType(jsonData.type),
          description: jsonData.description?.trim() || 'Description not available',
          status: 'Applied', // Always set to "Applied" when scraped
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
        status: 'Applied', // Always set to "Applied" when scraped
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
      
      // For development: http://localhost:3000 (or whatever port your server uses)
      // For production: https://yourdomain.com
      const apiUrl = 'http://localhost:3000/api/saveJob';
      
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
        
        // Check if this is a duplicate job
        if (result.isDuplicate) {
          showStatus(`Job already exists in your collection (${result.totalJobs} total jobs)`, 'warning');
        } else {
          showStatus(`Job saved successfully! (${result.totalJobs} total jobs)`, 'success');
        }
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
