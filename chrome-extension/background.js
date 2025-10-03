// Background service worker for ApplyMate Job Scraper
// This handles extension lifecycle and cross-origin requests if needed

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('ApplyMate Job Scraper extension installed');
    
    // Set default settings
    chrome.storage.local.set({
      extensionEnabled: true,
      apiEndpoint: 'http://localhost:3002/api/saveJob' // Default for development
    });
    
    // Create context menu for right-click scraping
    chrome.contextMenus.create({
      id: 'scrapeJob',
      title: 'Scrape this job with ApplyMate',
      contexts: ['page'],
      documentUrlPatterns: ['http://*/*', 'https://*/*']
    });
  } else if (details.reason === 'update') {
    console.log('ApplyMate Job Scraper extension updated');
  }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  console.log('ApplyMate Job Scraper extension started');
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  switch (request.action) {
    case 'checkStatus':
      // Check if extension is enabled and user has email set
      chrome.storage.local.get(['extensionEnabled', 'userEmail'], (result) => {
        sendResponse({
          enabled: result.extensionEnabled !== false,
          hasEmail: !!result.userEmail
        });
      });
      break;
      
    case 'updateSettings':
      // Update extension settings
      chrome.storage.local.set(request.settings, () => {
        sendResponse({ success: true });
      });
      break;
      
    case 'getSettings':
      // Get current settings
      chrome.storage.local.get(['extensionEnabled', 'userEmail', 'apiEndpoint'], (result) => {
        sendResponse(result);
      });
      break;
      
    default:
      sendResponse({ error: 'Unknown action' });
  }
  
  return true; // Keep message channel open for async response
});

// Handle tab updates to potentially inject content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if the tab might be a job listing page
    const mightBeJobPage = mightBeJobListing(tab.url, tab.title);
    
    if (mightBeJobPage) {
      console.log('Potential job listing detected:', tab.url);
      
      // Set badge to indicate potential job page
      chrome.action.setBadgeText({
        text: 'JOB',
        tabId: tabId
      });
      
      chrome.action.setBadgeBackgroundColor({
        color: '#ffc107', // Yellow to indicate "potential"
        tabId: tabId
      });
    } else {
      // Clear badge for non-job sites
      chrome.action.setBadgeText({
        text: '',
        tabId: tabId
      });
    }
  }
});

// Helper function to detect if a page might be a job listing based on keywords
function mightBeJobListing(url, title) {
  // Job-related keywords to look for in URL and title
  const jobKeywords = [
    // Job-related terms
    'job', 'jobs', 'career', 'careers', 'position', 'positions',
    'employment', 'hiring', 'vacancy', 'vacancies', 'opening', 'openings',
    'opportunity', 'opportunities', 'role', 'roles', 'apply', 'application',
    
    // Work-related terms
    'work', 'workplace', 'employee', 'employer', 'recruit', 'recruitment',
    'staff', 'staffing', 'talent', 'resume', 'cv', 'interview',
    
    // Industry-specific terms
    'developer', 'engineer', 'manager', 'analyst', 'designer', 'consultant',
    'specialist', 'coordinator', 'director', 'executive', 'assistant',
    'technician', 'supervisor', 'lead', 'senior', 'junior', 'intern',
    
    // Remote work terms
    'remote', 'hybrid', 'onsite', 'work from home', 'wfh', 'flexible',
    
    // Company pages
    'careers', 'about us', 'join us', 'work with us'
  ];
  
  // Convert to lowercase for comparison
  const urlLower = url.toLowerCase();
  const titleLower = (title || '').toLowerCase();
  const combinedText = `${urlLower} ${titleLower}`;
  
  // Count how many job keywords are found
  const keywordMatches = jobKeywords.filter(keyword => 
    combinedText.includes(keyword.toLowerCase())
  );
  
  // Consider it a potential job page if we find at least 2 job-related keywords
  // or if it contains strong indicators like "apply" or "career"
  const strongIndicators = ['apply', 'application', 'career', 'job', 'hiring'];
  const hasStrongIndicator = strongIndicators.some(indicator => 
    combinedText.includes(indicator.toLowerCase())
  );
  
  return keywordMatches.length >= 2 || hasStrongIndicator;
}

// Note: chrome.action.onClicked is not available in Manifest V3 service workers
// The popup will handle all user interactions

// Handle context menu clicks (only if contextMenus API is available)
if (chrome.contextMenus && chrome.contextMenus.onClicked) {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'scrapeJob') {
      // Send message to content script to scrape job
      chrome.tabs.sendMessage(tab.id, { action: 'scrapeJob' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error scraping job:', chrome.runtime.lastError);
        } else if (response && response.success) {
          console.log('Job scraped successfully:', response.jobData);
        } else {
          console.error('Failed to scrape job:', response?.error);
        }
      });
    }
  });
}

// Handle storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    console.log('Storage changed:', changes);
    
    // React to specific storage changes if needed
    if (changes.userEmail) {
      console.log('User email updated:', changes.userEmail.newValue);
    }
    
    if (changes.extensionEnabled) {
      console.log('Extension enabled status:', changes.extensionEnabled.newValue);
    }
  }
});

// Clean up when extension is disabled/uninstalled
chrome.runtime.onSuspend.addListener(() => {
  console.log('ApplyMate Job Scraper extension suspended');
});
