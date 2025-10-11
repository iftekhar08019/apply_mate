// Background service worker for ApplyMate Job Scraper

// ⚠️ IMPORTANT: Update this URL for production deployment!
// Development: 'http://localhost:3000'
// Production: 'https://apply-mate-ai.netlify.app' (NO trailing slash)
const API_BASE_URL = 'https://apply-mate-ai.netlify.app';

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // console.log('ApplyMate Job Scraper extension installed');
    
    // Set default settings
    chrome.storage.local.set({
      extensionEnabled: true,
      apiEndpoint: `${API_BASE_URL}/api/saveJob`
    });
  } else if (details.reason === 'update') {
    // console.log('ApplyMate Job Scraper extension updated');
  }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  // console.log('ApplyMate Job Scraper extension started');
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log('Background received message:', request);
  
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

// Handle storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    // console.log('Storage changed:', changes);
    
    if (changes.userEmail) {
      // console.log('User email updated:', changes.userEmail.newValue);
    }
    
    if (changes.extensionEnabled) {
      // console.log('Extension enabled status:', changes.extensionEnabled.newValue);
    }
  }
});

// Clean up when extension is disabled/uninstalled
chrome.runtime.onSuspend.addListener(() => {
  // console.log('ApplyMate Job Scraper extension suspended');
});
