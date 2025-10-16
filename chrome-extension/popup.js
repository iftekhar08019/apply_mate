// Popup script for ApplyMate Job Scraper

// ⚠️ IMPORTANT: Update this URL for production deployment!
// Development: 'http://localhost:3000'
// Production: 'https://apply-mate-two.vercel.app' (NO trailing slash)
const API_BASE_URL = 'https://apply-mate-two.vercel.app';

// Rate limiting and safety constants
const RATE_LIMIT_COOLDOWN = 30000; // 30 seconds between scrapes
const DAILY_SCRAPE_LIMIT = 10; // Max 10 scrapes per day

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
    // Check rate limiting
    const lastScrapeTime = localStorage.getItem('lastScrapeTime');
    const now = Date.now();
    
    if (lastScrapeTime && (now - parseInt(lastScrapeTime)) < RATE_LIMIT_COOLDOWN) {
      const remainingTime = Math.ceil((RATE_LIMIT_COOLDOWN - (now - parseInt(lastScrapeTime))) / 1000);
      showStatus(`Please wait ${remainingTime} seconds before scraping again`, 'warning');
      return;
    }

    // Check daily limit
    if (!checkDailyLimit()) {
      showStatus(`Daily limit reached (${DAILY_SCRAPE_LIMIT} scrapes). Try again tomorrow.`, 'warning');
      return;
    }

    chrome.storage.local.get(['userEmail'], async function(result) {
      const email = result.userEmail;
      
      if (!email) {
        showStatus('Please enter and save your email first', 'error');
        return;
      }

      // Get current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
        if (tabs[0]) {
          // Ask if user actually applied to the job
          const appliedToJob = confirm(
            '📝 Job Application Confirmation\n\n' +
            'Have you actually applied to this job?\n\n' +
            'This extension is designed to track jobs you have already applied to.\n\n' +
            'Click OK only if you have submitted an application for this position.'
          );
          if (!appliedToJob) {
            showStatus('Please apply to the job first, then use this extension to track it.', 'warning');
            return;
          }

          // Add LinkedIn warning
          if (isLinkedInPage(tabs[0].url)) {
            const confirmed = confirm(
              '⚠️ WARNING: Scraping LinkedIn may result in account restrictions.\n\n' +
              'LinkedIn actively monitors for automated scraping and may suspend accounts.\n\n' +
              'For best results, navigate to a specific job posting page (not the job search results).\n\n' +
              'Do you want to continue?'
            );
            if (!confirmed) {
              return;
            }
          }

          // Set rate limit timestamp
          localStorage.setItem('lastScrapeTime', now.toString());

          scrapeJobBtn.disabled = true;
          scrapeJobBtn.textContent = 'Waiting for page...';
          
          // Dynamic delay based on site type
          const baseDelay = isLinkedInPage(tabs[0].url) ? 3000 : 1500;
          const randomDelay = getRandomDelay(baseDelay, baseDelay + 2000);
          await new Promise(resolve => setTimeout(resolve, randomDelay));
          
          scrapeJobBtn.textContent = 'Extracting content...';
          
          // Send message to content script to extract page content
          chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeJob' }, async function(response) {
            if (chrome.runtime.lastError) {
              scrapeJobBtn.disabled = false;
              scrapeJobBtn.textContent = 'Track Applied Job';
              showStatus('Error: Could not access page. Make sure you\'re on a job listing page.', 'error');
              return;
            }
            
            if (response && response.success && response.pageContent) {
              // Send to backend for AI processing
              scrapeJobBtn.textContent = 'Processing with AI...';
              
              try {
                const result = await processWithBackendAI(email, response.pageContent);
                
                scrapeJobBtn.disabled = false;
                scrapeJobBtn.textContent = 'Track Applied Job';
                
                // Check if it's not a job page
                if (result.isJobPage === false) {
                  showStatus(result.message, 'warning');
                  return;
                }
                
                // If it is a job page, send data to Next.js API
                await sendJobToAPI(email, result);
                
                // Increment daily counter
                const currentCount = parseInt(localStorage.getItem('dailyScrapeCount') || '0');
                localStorage.setItem('dailyScrapeCount', (currentCount + 1).toString());
                
                showStatus(`Job saved successfully!`, 'success');
              } catch (error) {
                scrapeJobBtn.disabled = false;
                scrapeJobBtn.textContent = 'Track Applied Job';
                
                // console.error('AI processing error:', error);
                showStatus(`Error: ${error.message}. Try again.`, 'error');
              }
            } else {
              scrapeJobBtn.disabled = false;
              scrapeJobBtn.textContent = 'Track Applied Job';
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

  // Helper function to check if current page is LinkedIn
  function isLinkedInPage(url) {
    return url.includes('linkedin.com/jobs');
  }

  // Helper function to get random delay
  function getRandomDelay(min = 1000, max = 3000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Helper function to check daily scrape limit
  function checkDailyLimit() {
    const today = new Date().toDateString();
    const lastScrapeDate = localStorage.getItem('lastScrapeDate');
    const dailyCount = parseInt(localStorage.getItem('dailyScrapeCount') || '0');
    
    if (lastScrapeDate !== today) {
      localStorage.setItem('lastScrapeDate', today);
      localStorage.setItem('dailyScrapeCount', '0');
      return true;
    }
    
    return dailyCount < DAILY_SCRAPE_LIMIT;
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

  // Helper function to process job data with backend AI
  async function processWithBackendAI(email, pageContent) {
    try {
      // Send to backend for AI processing
      const response = await fetch(`${API_BASE_URL}/api/extension/analyze-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          pageContent: pageContent
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to analyze job');
      }
      
      return result.jobData;
    } catch (error) {
      // console.error('Error in backend AI processing:', error);
      throw error;
    }
  }

  // Helper function to send job data to Next.js API
  async function sendJobToAPI(email, jobData) {
    try {
      const apiUrl = `${API_BASE_URL}/api/saveJob`;
      
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
