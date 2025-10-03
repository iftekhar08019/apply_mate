// Content script for ApplyMate Job Scraper
// This script runs on all web pages and extracts job information

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeJob') {
    try {
      const jobData = scrapeJobData();
      sendResponse({ success: true, jobData: jobData });
    } catch (error) {
      console.error('Error scraping job data:', error);
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keep message channel open for async response
});

// Main function to scrape job data from the current page
function scrapeJobData() {
  console.log('Starting job data scraping...');
  
  const jobData = {
    title: extractJobTitle(),
    description: extractJobDescription(),
    company: extractCompanyName(),
    location: extractLocation(),
    type: extractJobType(),
    url: window.location.href,
    date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  };

  console.log('Scraped job data:', jobData);
  return jobData;
}

// Extract job title - try multiple selectors
function extractJobTitle() {
  const titleSelectors = [
    'h1[data-testid*="job-title"]',
    'h1.job-title',
    'h1[class*="title"]',
    '.job-header h1',
    '.job-details h1',
    'h1',
    '[data-testid="job-title"]',
    '.title',
    '.job-title'
  ];

  for (const selector of titleSelectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.trim()) {
      return element.textContent.trim();
    }
  }

  // Fallback: try to find the largest heading
  const headings = document.querySelectorAll('h1, h2, h3');
  for (const heading of headings) {
    const text = heading.textContent.trim();
    if (text && text.length > 5 && text.length < 100) {
      return text;
    }
  }

  return 'Job Title Not Found';
}

// Extract job description - look for main content area
function extractJobDescription() {
  const descriptionSelectors = [
    '[data-testid*="job-description"]',
    '.job-description',
    '.job-content',
    '.job-details',
    '.description',
    '[class*="description"]',
    '.content',
    'main',
    '.main-content'
  ];

  for (const selector of descriptionSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      const text = element.textContent.trim();
      if (text.length > 100) { // Ensure it's substantial content
        return cleanText(text);
      }
    }
  }

  // Fallback: get all paragraph text
  const paragraphs = document.querySelectorAll('p');
  let description = '';
  for (const p of paragraphs) {
    const text = p.textContent.trim();
    if (text.length > 20) {
      description += text + '\n\n';
    }
  }

  return cleanText(description) || 'Job description not found';
}

// Extract company name
function extractCompanyName() {
  const companySelectors = [
    '[data-testid*="company"]',
    '.company-name',
    '.company',
    '[class*="company"]',
    '.employer',
    '.organization',
    'a[href*="/company/"]',
    '.job-header .company',
    '.job-details .company'
  ];

  for (const selector of companySelectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.trim()) {
      return element.textContent.trim();
    }
  }

  // Try to find company in meta tags
  const metaCompany = document.querySelector('meta[property="og:site_name"]');
  if (metaCompany) {
    return metaCompany.content;
  }

  return 'Company Not Found';
}

// Extract location
function extractLocation() {
  const locationSelectors = [
    '[data-testid*="location"]',
    '.location',
    '[class*="location"]',
    '.job-location',
    '.workplace',
    '.address',
    '.city',
    '.region'
  ];

  for (const selector of locationSelectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.trim()) {
      return element.textContent.trim();
    }
  }

  // Try to find location in structured data
  const jsonLd = document.querySelector('script[type="application/ld+json"]');
  if (jsonLd) {
    try {
      const data = JSON.parse(jsonLd.textContent);
      if (data.jobLocation && data.jobLocation.address) {
        return data.jobLocation.address.addressLocality || data.jobLocation.address.addressRegion;
      }
    } catch (e) {
      // Ignore JSON parsing errors
    }
  }

  return 'Location Not Found';
}

// Extract job type (Remote/Hybrid/Onsite)
function extractJobType() {
  const pageText = document.body.textContent.toLowerCase();
  
  // Check for remote keywords
  if (pageText.includes('remote') || pageText.includes('work from home') || pageText.includes('wfh')) {
    if (pageText.includes('hybrid')) {
      return 'hybrid';
    }
    return 'remote';
  }
  
  // Check for hybrid keywords
  if (pageText.includes('hybrid') || pageText.includes('partially remote') || pageText.includes('flexible')) {
    return 'hybrid';
  }
  
  // Check for onsite keywords
  if (pageText.includes('onsite') || pageText.includes('on-site') || pageText.includes('office') || pageText.includes('in-person')) {
    return 'onsite';
  }

  // Try to find in specific job type selectors
  const typeSelectors = [
    '[data-testid*="job-type"]',
    '.job-type',
    '.employment-type',
    '.work-type',
    '[class*="type"]'
  ];

  for (const selector of typeSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      const text = element.textContent.toLowerCase();
      if (text.includes('remote')) return 'remote';
      if (text.includes('hybrid')) return 'hybrid';
      if (text.includes('onsite') || text.includes('on-site')) return 'onsite';
    }
  }

  return 'unknown';
}

// Helper function to clean and format text
function cleanText(text) {
  if (!text) return '';
  
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n') // Remove empty lines
    .trim()
    .substring(0, 5000); // Limit to 5000 characters
}

// Auto-detect if current page looks like a job listing
function isJobListing() {
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
    'remote', 'hybrid', 'onsite', 'work from home', 'wfh', 'flexible'
  ];
  
  const pageText = document.body.textContent.toLowerCase();
  const title = document.title.toLowerCase();
  const url = window.location.href.toLowerCase();
  const combinedText = `${pageText} ${title} ${url}`;
  
  // Count keyword matches
  const keywordMatches = jobKeywords.filter(keyword => 
    combinedText.includes(keyword.toLowerCase())
  );
  
  // Strong indicators that suggest this is definitely a job page
  const strongIndicators = [
    'requirements', 'responsibilities', 'qualifications', 'skills required',
    'job description', 'about the role', 'what you will do',
    'benefits', 'compensation', 'salary', 'full-time', 'part-time',
    'contract', 'freelance', 'permanent', 'temporary'
  ];
  
  const strongMatches = strongIndicators.filter(indicator =>
    combinedText.includes(indicator.toLowerCase())
  );
  
  // Consider it a job listing if:
  // 1. We find 3+ job keywords, OR
  // 2. We find 1+ strong indicators, OR  
  // 3. We find 2+ job keywords AND the page has job-like structure
  const hasJobStructure = document.querySelector('h1, h2, h3') && 
                         document.querySelector('p, div, span') &&
                         document.body.textContent.length > 500;
  
  return keywordMatches.length >= 3 || 
         strongMatches.length >= 1 || 
         (keywordMatches.length >= 2 && hasJobStructure);
}

// Optional: Auto-scrape when page loads (uncomment if desired)
// if (isJobListing()) {
//   console.log('Job listing detected. Ready to scrape.');
// }
