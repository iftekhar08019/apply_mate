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

// Extract job title - try multiple selectors with platform-specific targeting
function extractJobTitle() {
  const url = window.location.href.toLowerCase();
  
  // LinkedIn-specific selectors
  if (url.includes('linkedin.com')) {
    const linkedinSelectors = [
      // New LinkedIn selectors based on current DOM structure
      'h1[data-testid="job-title"]',
      '.jobs-unified-top-card__job-title',
      '.job-details-jobs-unified-top-card__job-title',
      '.jobs-details-top-card__job-title',
      '.jobs-details-top-card__job-title-text',
      '.jobs-details__main-content h1',
      'h1.jobs-details-top-card__job-title',
      '.job-details-jobs-unified-top-card__job-title-text',
      // Additional fallback selectors
      '.jobs-details__main-content .jobs-details-top-card__job-title',
      '.jobs-details__main-content h1',
      '.jobs-unified-top-card h1',
      // Generic LinkedIn job title selectors
      'h1[class*="job-title"]',
      '.job-title h1',
      'h1[class*="title"]'
    ];
    
    for (const selector of linkedinSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        const title = element.textContent.trim();
        // Skip if it's clearly not a job title
        if (!title.includes('notifications') && !title.includes('Premium') && 
            title.length > 3 && title.length < 100) {
          return title;
        }
      }
    }
  }
  
  // Indeed-specific selectors
  if (url.includes('indeed.com')) {
    const indeedSelectors = [
      'h1[data-testid="jobsearch-JobInfoHeader-title"]',
      '.jobsearch-JobInfoHeader-title',
      'h1.jobsearch-JobInfoHeader-title',
      '.jobsearch-DesktopStickyContainer h1',
      '[data-testid="job-title"]'
    ];
    
    for (const selector of indeedSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // Glassdoor-specific selectors
  if (url.includes('glassdoor.com')) {
    const glassdoorSelectors = [
      '[data-test="job-title"]',
      '.jobTitle',
      '.jobTitle h2',
      '.jobDescriptionContent h2',
      '.jobDetails h1'
    ];
    
    for (const selector of glassdoorSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // StepStone (Germany) selectors
  if (url.includes('stepstone.com') || url.includes('stepstone.de')) {
    const stepstoneSelectors = [
      '.jobTitle',
      '.job-header h1',
      '.job-details h1',
      '[data-testid="job-title"]',
      '.job-title'
    ];
    
    for (const selector of stepstoneSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // XING (Germany) selectors
  if (url.includes('xing.com')) {
    const xingSelectors = [
      '.job-title',
      '.job-header h1',
      '[data-testid="job-title"]',
      '.job-details h1'
    ];
    
    for (const selector of xingSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // BDJobs (Bangladesh) selectors
  if (url.includes('bdjobs.com')) {
    const bdjobsSelectors = [
      '.job-title',
      '.job-header h1',
      '.job-details h1',
      '.job-info h1',
      '.job-title-text'
    ];
    
    for (const selector of bdjobsSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // Chakri.com (Bangladesh) selectors
  if (url.includes('chakri.com')) {
    const chakriSelectors = [
      '.job-title',
      '.job-header h1',
      '.job-details h1'
    ];
    
    for (const selector of chakriSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // Additional Bangladesh job portals
  if (url.includes('jobsbd.com') || url.includes('jobsbangladesh.com') || 
      url.includes('jobstoday.com') || url.includes('jobsalert.com') ||
      url.includes('jobscircular.com') || url.includes('jobspoint.com')) {
    const bdPortalSelectors = [
      '.job-title',
      '.job-header h1',
      '.job-details h1',
      '.job-info h1',
      '.job-title-text'
    ];
    
    for (const selector of bdPortalSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }

  // Generic selectors for all other sites
  const genericSelectors = [
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

  for (const selector of genericSelectors) {
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
  const url = window.location.href.toLowerCase();
  
  // LinkedIn-specific description selectors
  if (url.includes('linkedin.com')) {
    const linkedinDescriptionSelectors = [
      '.jobs-description-content__text',
      '.jobs-description-content',
      '.jobs-box__html-content',
      '.jobs-description-content__text .jobs-description-content__text--stretch',
      '.jobs-description-content__text--stretch',
      // Fallback selectors for LinkedIn
      '.jobs-details__main-content .jobs-description-content',
      '.jobs-unified-top-card + .jobs-description-content',
      // Generic LinkedIn content selectors
      '[data-testid*="job-description"]',
      '.job-description',
      '.job-content'
    ];
    
    for (const selector of linkedinDescriptionSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        if (text.length > 100) { // Ensure it's substantial content
          // Skip if it contains profile information
          if (!text.includes('Premium') && !text.includes('Frontend & MERN') && 
              !text.includes('Developer | Reac') && text.length > 200) {
            return cleanText(text);
          }
        }
      }
    }
  }

  // Generic description selectors for all other sites
  const genericDescriptionSelectors = [
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

  for (const selector of genericDescriptionSelectors) {
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

// Extract company name with platform-specific selectors
function extractCompanyName() {
  const url = window.location.href.toLowerCase();
  
  // LinkedIn-specific company selectors
  if (url.includes('linkedin.com')) {
    const linkedinCompanySelectors = [
      // Updated LinkedIn company selectors
      '.jobs-unified-top-card__company-name',
      '.job-details-jobs-unified-top-card__company-name',
      '.jobs-details-top-card__company-name',
      '[data-testid="job-company-name"]',
      // Additional selectors for company name
      '.jobs-company__box a',
      '.job-details-jobs-unified-top-card__company-name a',
      '.jobs-details-top-card__company-name a',
      '.jobs-unified-top-card__company-name a',
      // Fallback selectors
      '.jobs-details__main-content .jobs-details-top-card__company-name',
      '.jobs-unified-top-card .jobs-unified-top-card__company-name',
      // Generic company selectors for LinkedIn
      'a[href*="/company/"]',
      '.company-name',
      '.jobs-company__box'
    ];
    
    for (const selector of linkedinCompanySelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        const company = element.textContent.trim();
        // Skip if it's clearly not a company name
        if (company !== 'Company Not Found' && company.length > 1 && company.length < 100) {
          return company;
        }
      }
    }
  }
  
  // Indeed-specific company selectors
  if (url.includes('indeed.com')) {
    const indeedCompanySelectors = [
      '[data-testid="job-company-name"]',
      '.jobsearch-CompanyInfoContainer .jobsearch-CompanyReview--primary',
      '.jobsearch-CompanyInfoContainer-companyName',
      '.jobsearch-InlineCompanyRating .jobsearch-CompanyReview--primary'
    ];
    
    for (const selector of indeedCompanySelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // Glassdoor-specific company selectors
  if (url.includes('glassdoor.com')) {
    const glassdoorCompanySelectors = [
      '[data-test="employer-name"]',
      '.employerName',
      '.jobDetails .employerName',
      '.jobDescriptionContent .employerName'
    ];
    
    for (const selector of glassdoorCompanySelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // StepStone (Germany) company selectors
  if (url.includes('stepstone.com') || url.includes('stepstone.de')) {
    const stepstoneCompanySelectors = [
      '.company-name',
      '.job-company',
      '.job-header .company',
      '.job-details .company'
    ];
    
    for (const selector of stepstoneCompanySelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // XING (Germany) company selectors
  if (url.includes('xing.com')) {
    const xingCompanySelectors = [
      '.company-name',
      '.job-company',
      '.job-header .company'
    ];
    
    for (const selector of xingCompanySelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // BDJobs (Bangladesh) company selectors
  if (url.includes('bdjobs.com')) {
    const bdjobsCompanySelectors = [
      '.company-name',
      '.job-company',
      '.job-header .company',
      '.company-info .company-name'
    ];
    
    for (const selector of bdjobsCompanySelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // Chakri.com (Bangladesh) company selectors
  if (url.includes('chakri.com')) {
    const chakriCompanySelectors = [
      '.company-name',
      '.job-company',
      '.job-header .company'
    ];
    
    for (const selector of chakriCompanySelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }

  // Generic company selectors for all other sites
  const genericCompanySelectors = [
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

  for (const selector of genericCompanySelectors) {
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

// Extract location with platform-specific selectors
function extractLocation() {
  const url = window.location.href.toLowerCase();
  
  // LinkedIn-specific location selectors (lean version)
  if (url.includes('linkedin.com')) {
    // Target the subtitle grouping bullet span
    const locationElement = document.querySelector(
      '.jobs-unified-top-card__subtitle-primary-grouping span.jobs-unified-top-card__bullet'
    );

    if (locationElement) {
      const text = locationElement.textContent.trim();
      if (text && !/city, state, or zip code/i.test(text)) {
        return text;
      }
    }

    // Fallback: look for any bullet span that looks like a location
    const bullets = document.querySelectorAll('span.jobs-unified-top-card__bullet');
    for (const span of bullets) {
      const text = span.textContent.trim();
      if (
        text &&
        text.includes(',') &&
        text.length > 3 &&
        text.length < 100 &&
        !/city, state, or zip code/i.test(text) &&
        !/applicant|ago|clicked|reposted|people/i.test(text)
      ) {
        return text;
      }
    }
  }
  
  // Indeed-specific location selectors
  if (url.includes('indeed.com')) {
    const indeedLocationSelectors = [
      '[data-testid="job-location"]',
      '.jobsearch-JobInfoHeader-subtitle',
      '.jobsearch-CompanyInfoContainer .jobsearch-JobInfoHeader-subtitle'
    ];
    
    for (const selector of indeedLocationSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // Glassdoor-specific location selectors
  if (url.includes('glassdoor.com')) {
    const glassdoorLocationSelectors = [
      '[data-test="job-location"]',
      '.jobInfoItem .location',
      '.jobDetails .location'
    ];
    
    for (const selector of glassdoorLocationSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // StepStone (Germany) location selectors
  if (url.includes('stepstone.com') || url.includes('stepstone.de')) {
    const stepstoneLocationSelectors = [
      '.job-location',
      '.location',
      '.job-header .location',
      '.job-details .location'
    ];
    
    for (const selector of stepstoneLocationSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // XING (Germany) location selectors
  if (url.includes('xing.com')) {
    const xingLocationSelectors = [
      '.job-location',
      '.location',
      '.job-header .location'
    ];
    
    for (const selector of xingLocationSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }
  
  // BDJobs (Bangladesh) location selectors
  if (url.includes('bdjobs.com')) {
    const bdjobsLocationSelectors = [
      '.job-location',
      '.location',
      '.job-header .location',
      '.job-info .location'
    ];
    
    for (const selector of bdjobsLocationSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
  }

  // Generic location selectors for all other sites
  const genericLocationSelectors = [
    '[data-testid*="location"]',
    '.location',
    '[class*="location"]',
    '.job-location',
    '.workplace',
    '.address',
    '.city',
    '.region'
  ];

  for (const selector of genericLocationSelectors) {
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
  const url = window.location.href.toLowerCase();
  
  // LinkedIn-specific job type detection
  if (url.includes('linkedin.com')) {
    // Look for LinkedIn job type buttons/elements
    const linkedinTypeSelectors = [
      'button[aria-pressed="true"]',
      '.jobs-unified-top-card__job-insight span',
      '.jobs-details-top-card__job-insight span',
      '.jobs-unified-top-card__bullet',
      '.jobs-details-top-card__bullet',
      // Look for selected job type buttons
      'button[data-testid*="job-type"]',
      'button[class*="job-type"]'
    ];
    
    for (const selector of linkedinTypeSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent.toLowerCase();
        if (text.includes('on-site') || text.includes('onsite')) {
          return 'onsite';
        }
        if (text.includes('hybrid')) {
          return 'hybrid';
        }
        if (text.includes('remote')) {
          return 'remote';
        }
      }
    }
    
    // Check for LinkedIn job type indicators in the page
    const pageText = document.body.textContent.toLowerCase();
    if (pageText.includes('on-site') || pageText.includes('onsite')) {
      return 'onsite';
    }
    if (pageText.includes('hybrid')) {
      return 'hybrid';
    }
    if (pageText.includes('remote')) {
      return 'remote';
    }
  }

  // Generic job type detection for all sites
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
    // English job-related terms
    'job', 'jobs', 'career', 'careers', 'position', 'positions',
    'employment', 'hiring', 'vacancy', 'vacancies', 'opening', 'openings',
    'opportunity', 'opportunities', 'role', 'roles', 'apply', 'application',
    'candidate', 'candidates', 'jobseekers', 'job-seekers', 'jobseeker',
    
    // Work-related terms
    'work', 'workplace', 'employee', 'employer', 'recruit', 'recruitment',
    'recruiter', 'recruiters', 'staff', 'staffing', 'talent', 'resume', 'cv', 
    'interview', 'interviews', 'candidate', 'candidates', 'jobboard', 'job-board',
    
    // Industry-specific terms
    'developer', 'developers', 'engineer', 'engineers', 'engineering',
    'manager', 'managers', 'management', 'analyst', 'analysts', 'analysis',
    'designer', 'designers', 'design', 'consultant', 'consultants', 'consulting',
    'specialist', 'specialists', 'coordinator', 'coordinators', 'coordination',
    'director', 'directors', 'executive', 'executives', 'assistant', 'assistants',
    'technician', 'technicians', 'supervisor', 'supervisors', 'supervision',
    'lead', 'leads', 'senior', 'junior', 'intern', 'interns', 'internship',
    'entry-level', 'mid-level', 'senior-level', 'expert', 'expertise',
    
    // Job types and work arrangements
    'remote', 'hybrid', 'onsite', 'on-site', 'work from home', 'wfh', 'flexible',
    'full-time', 'part-time', 'contract', 'contractor', 'freelance', 'freelancer',
    'temporary', 'permanent', 'volunteer', 'intern', 'apprentice', 'apprenticeship',
    
    // Company and career pages
    'careers', 'career', 'about us', 'join us', 'work with us', 'team',
    'company', 'companies', 'organization', 'organizations', 'corporate',
    
    // German job-related terms
    'stellen', 'stelle', 'stellenangebot', 'stellenanzeige', 'jobangebot',
    'karriere', 'karrieren', 'bewerbung', 'bewerbungen', 'arbeit', 'arbeiten',
    'arbeitsplatz', 'arbeitsplätze', 'mitarbeiter', 'mitarbeiterin', 'personal',
    'einstellung', 'einstellungen', 'suche', 'sucht', 'gesucht', 'verfügbar',
    'vollzeit', 'teilzeit', 'praktikum', 'praktikant', 'praktikantin',
    'ausbildung', 'ausbildungsplatz', 'azubi', 'lehrstelle', 'lehrstellen',
    'arbeitnehmer', 'arbeitgeber', 'unternehmen', 'firma', 'betrieb',
    'beruf', 'berufe', 'tätigkeit', 'tätigkeiten', 'position', 'positionen',
    'aufgabe', 'aufgaben', 'verantwortung', 'verantwortlichkeiten',
    'qualifikation', 'qualifikationen', 'erfahrung', 'kenntnisse', 'skills',
    'entwickler', 'entwicklerin', 'ingenieur', 'ingenieurin', 'manager',
    'designer', 'designerin', 'berater', 'beraterin', 'spezialist', 'spezialistin',
    'koordinator', 'koordinatorin', 'direktor', 'direktorin', 'assistent',
    'assistentin', 'techniker', 'technikerin', 'supervisor', 'supervisorin',
    'lead', 'senior', 'junior', 'trainee', 'werkstudent', 'werkstudentin',
    'homeoffice', 'home-office', 'hybrid', 'vor-ort', 'flexibel', 'flexible',
    'befristet', 'unbefristet', 'freiberufler', 'freiberuflerin', 'selbständig',
    
    // Additional German terms
    'xing', 'linkedin', 'stepstone', 'indeed', 'glassdoor', 'monster',
    'arbeitsagentur', 'jobcenter', 'börse', 'börsen', 'markt', 'märkte',
    'branche', 'branchen', 'bereich', 'bereiche', 'abteilung', 'abteilungen',
    'standort', 'standorte', 'niederlassung', 'niederlassungen',
    'gehalt', 'lohn', 'vergütung', 'bezahlung', 'benefits', 'leistungen',
    'kündigung', 'kündigen', 'wechsel', 'wechsler', 'neuorientierung',
    
    // Job search platforms (German)
    'jobsuche', 'jobportal', 'jobbörse', 'stellenmarkt', 'karriereportal',
    'bewerbungsportal', 'recruiting', 'headhunter', 'personalberatung',
    'personaldienstleister', 'zeitarbeit', 'temp', 'temporär',
    
    // Additional English terms
    'salary', 'compensation', 'benefits', 'perks', 'bonus', 'commission',
    'startup', 'startups', 'scale-up', 'scaleup', 'unicorn', 'ipo',
    'venture', 'capital', 'funding', 'investment', 'investor', 'investors',
    'board', 'ceo', 'cto', 'cfo', 'cmo', 'vp', 'head of', 'chief',
    'founder', 'founders', 'co-founder', 'cofounder', 'startup founder',
    'entrepreneur', 'entrepreneurs', 'entrepreneurship', 'business',
    'product', 'marketing', 'sales', 'customer', 'client', 'user',
    'data', 'analytics', 'research', 'development', 'operations', 'ops',
    'finance', 'accounting', 'hr', 'human resources', 'legal', 'compliance',
    'security', 'devops', 'qa', 'quality assurance', 'testing', 'test',
    'frontend', 'front-end', 'backend', 'back-end', 'fullstack', 'full-stack',
    'mobile', 'ios', 'android', 'react', 'angular', 'vue', 'node', 'python',
    'java', 'javascript', 'typescript', 'php', 'ruby', 'go', 'rust', 'swift',
    'kotlin', 'scala', 'c++', 'c#', '.net', 'sql', 'nosql', 'database',
    'cloud', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'microservices',
    'api', 'rest', 'graphql', 'agile', 'scrum', 'kanban', 'ci/cd', 'devops',
    'machine learning', 'ai', 'artificial intelligence', 'ml', 'data science',
    'blockchain', 'cryptocurrency', 'fintech', 'healthtech', 'edtech',
    'saas', 'paas', 'iaas', 'b2b', 'b2c', 'ecommerce', 'e-commerce'
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
