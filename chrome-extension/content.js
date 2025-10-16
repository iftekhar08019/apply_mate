// Content script for ApplyMate Job Scraper
// This script extracts page content and sends it to AI for processing

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeJob') {
    try {
      // Extract page content and send to AI
      const pageContent = extractPageContent();
      sendResponse({ success: true, pageContent: pageContent });
    } catch (error) {
      // console.error('Error extracting page content:', error);
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keep message channel open for async response
});

// Extract page content for AI processing
function extractPageContent() {
  // console.log('Extracting page content for AI...');
  
  // Get basic page metadata
  const pageTitle = document.title;
  const pageUrl = window.location.href;
  const isLinkedIn = pageUrl.includes('linkedin.com/jobs');
  
  // Get meta tags for additional context
  const metaDescription = document.querySelector('meta[name="description"]')?.content || '';
  const ogTitle = document.querySelector('meta[property="og:title"]')?.content || '';
  const ogDescription = document.querySelector('meta[property="og:description"]')?.content || '';
  
  // Get structured data if available (helpful for AI)
  let structuredData = '';
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
  jsonLdScripts.forEach(script => {
    try {
      const data = JSON.parse(script.textContent);
      if (data['@type'] === 'JobPosting') {
        structuredData = JSON.stringify(data);
      }
    } catch {
      // Ignore parsing errors
    }
  });
  
  // Smart content extraction - try to find main content area first
  let mainContent = '';
  
  // Try common main content selectors (helps with SPA sites like LinkedIn)
  const mainSelectors = [
    'main',
    '[role="main"]',
    'article',
    '#main-content',
    '.main-content',
    '#content'
  ];
  
  for (const selector of mainSelectors) {
    const container = document.querySelector(selector);
    if (container) {
      mainContent = container.textContent || container.innerText;
      if (mainContent.length > 500) {
        // console.log(`Found main content using selector: ${selector}`);
        break;
      }
    }
  }
  
  // Fallback to body if main content not found
  if (!mainContent || mainContent.length < 500) {
    mainContent = document.body.textContent || document.body.innerText;
  }
  
  // Remove common noise elements (navigation, footer, ads, etc.)
  const noiseSelectors = [
    'nav', 'header', 'footer', '.advertisement', '.ad', '[role="navigation"]',
    '.navigation', '.nav', '.sidebar', '.cookie-banner', '.modal'
  ];
  
  noiseSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      const text = el.textContent || '';
      if (text.length > 0) {
        mainContent = mainContent.replace(text, '');
      }
    });
  });
  
  // Clean and limit content to avoid token limits
  // Reduce content extraction on LinkedIn to minimize detection risk
  const maxLength = isLinkedIn ? 5000 : 10000;
  const cleanedContent = cleanText(mainContent).substring(0, maxLength);
  
  return {
    url: pageUrl,
    title: pageTitle,
    content: cleanedContent,
    metaDescription: metaDescription,
    ogTitle: ogTitle,
    ogDescription: ogDescription,
    structuredData: structuredData,
    date: new Date().toISOString().split('T')[0]
  };
}

// Helper function to clean and format text
function cleanText(text) {
  if (!text) return '';
  
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n') // Remove empty lines
    .trim();
}
