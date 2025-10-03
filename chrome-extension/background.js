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
    
    // Bangladesh job portals
    'bdjobs', 'chakri', 'jobsbd', 'jobsbangladesh', 'jobstoday', 'jobsalert',
    'jobscircular', 'jobspoint', 'jobsnews', 'jobscareer', 'jobsportal',
    'bdeshjobs', 'jobsbd24', 'jobsbangladesh24', 'jobsalertbd', 'jobspointbd',
    
    // German job portals
    'arbeitsagentur', 'jobcenter', 'arbeitsamt', 'jobsuche', 'jobsucher',
    'stellenmarkt', 'jobbörse', 'karriere', 'karriereportal', 'bewerbung',
    'personalberatung', 'headhunter', 'recruiting', 'personaldienstleister',
    'zeitarbeit', 'temp', 'temporär', 'befristet', 'unbefristet',
    
    // Popular job sites (Germany)
    'stepstone', 'xing', 'monster', 'arbeitsagentur', 'jobcenter',
    'karriere', 'bewerbung', 'stellen', 'jobs', 'arbeit', 'personal',
    'recruiting', 'headhunter', 'personaldienstleister', 'zeitarbeit',
    
    // Popular job sites (Bangladesh)
    'bdjobs', 'chakri', 'jobsbd', 'jobsbangladesh', 'jobstoday',
    'jobsalert', 'jobscircular', 'jobspoint', 'jobsnews', 'jobscareer',
    'jobsportal', 'bdeshjobs', 'jobsbd24', 'jobsbangladesh24',
    
    // International platforms
    'linkedin', 'indeed', 'glassdoor', 'monster', 'ziprecruiter',
    'careerbuilder', 'dice', 'angel', 'stackoverflow', 'remote',
    'weworkremotely', 'flexjobs', 'github', 'apple', 'google',
    'microsoft', 'amazon', 'facebook', 'netflix', 'uber', 'airbnb',
    
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
