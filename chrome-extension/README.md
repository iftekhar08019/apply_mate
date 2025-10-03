# ApplyMate Chrome Extension

A Chrome extension that scrapes job listings from various job sites and saves them to your ApplyMate dashboard.

## Features

- **Email Storage**: Store your email once in the extension popup
- **Job Scraping**: Extract job data from any job listing page
- **Smart Detection**: Automatically detects job title, company, location, description, and job type
- **MongoDB Integration**: Saves scraped jobs to your ApplyMate database
- **Duplicate Prevention**: Prevents saving the same job multiple times

## Files Structure

```
chrome-extension/
├── manifest.json          # Extension configuration (Manifest V3)
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality and API communication
├── content.js            # Content script for job data extraction
├── background.js         # Background service worker
├── icon16.png           # Extension icon (16x16)
├── icon48.png           # Extension icon (48x48)
├── icon128.png          # Extension icon (128x128)
└── README.md            # This file
```

## Installation

### 1. Load Extension in Chrome (Development Mode)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `chrome-extension` folder from your ApplyMate project
5. The extension should now appear in your extensions list

### 2. Configure API Endpoint

The extension is configured to send data to `http://localhost:3000/api/saveJob` by default.

To change this for production:
1. Edit `popup.js`
2. Update the `apiUrl` variable in the `sendJobToAPI` function
3. Replace `http://localhost:3000` with your production URL

## Usage

### 1. Set Up Your Email

1. Click the ApplyMate extension icon in your browser toolbar
2. Enter your email address in the popup
3. Click "Save Email"
4. Your email is now stored locally in the extension

### 2. Scrape Job Listings

1. Navigate to any job listing page (LinkedIn, Indeed, Glassdoor, etc.)
2. Click the ApplyMate extension icon
3. Click "Scrape Current Job"
4. The extension will extract job data and save it to your ApplyMate dashboard
5. You'll see a success message if the job was saved

### 3. Supported Job Sites

The extension works on most job listing sites including:
- LinkedIn Jobs
- Indeed
- Glassdoor
- Monster
- CareerBuilder
- ZipRecruiter
- AngelList
- Stack Overflow Jobs
- Remote.co
- We Work Remotely
- And many more...

## Job Data Extracted

The extension extracts the following information:

- **Job Title**: Main heading or title element
- **Company Name**: Company information from various selectors
- **Location**: Job location or workplace type
- **Job Type**: Remote/Hybrid/Onsite (detected from page content)
- **Description**: Main job description content
- **URL**: Current page URL
- **Date**: Today's date (auto-generated)

## Customization

### Adjusting Selectors

If the extension doesn't extract data correctly from certain sites, you can modify the selectors in `content.js`:

```javascript
// Job title selectors (add more as needed)
const titleSelectors = [
  'h1[data-testid*="job-title"]',
  'h1.job-title',
  // Add your custom selectors here
];
```

### Adding New Job Sites

To optimize for new job sites, add their URLs to the `jobSites` array in `background.js`:

```javascript
const jobSites = [
  'linkedin.com/jobs',
  'indeed.com',
  // Add new sites here
];
```

## API Integration

The extension communicates with your Next.js API at `/api/saveJob`:

### POST Request Format
```json
{
  "email": "user@example.com",
  "job": {
    "title": "Software Engineer",
    "description": "Job description...",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "type": "remote",
    "url": "https://example.com/job/123",
    "date": "2024-01-15"
  }
}
```

### Response Format
```json
{
  "message": "Job saved successfully",
  "totalJobs": 5
}
```

## Troubleshooting

### Common Issues

1. **"Could not access page" error**
   - Make sure you're on a job listing page
   - Refresh the page and try again
   - Check if the site blocks content scripts

2. **"Network error" message**
   - Ensure your Next.js app is running on localhost:3000
   - Check your internet connection
   - Verify the API endpoint URL in popup.js

3. **Job data not extracted correctly**
   - The page might use different HTML structure
   - Add custom selectors in content.js
   - Check browser console for errors

4. **Extension not loading**
   - Make sure all files are in the chrome-extension folder
   - Check manifest.json for syntax errors
   - Reload the extension in chrome://extensions/

### Debug Mode

To debug the extension:

1. Open Chrome DevTools (F12)
2. Go to the "Console" tab
3. Look for messages starting with "ApplyMate" or "Background"
4. Check the "Network" tab to see API requests

## Security Notes

- The extension only requests necessary permissions
- Email is stored locally in Chrome storage
- No sensitive data is transmitted except to your own API
- All communication is over HTTPS in production

## Development

### Making Changes

1. Edit the relevant files in the `chrome-extension` folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test the changes

### Testing

1. Test on various job sites
2. Verify data extraction accuracy
3. Check MongoDB for saved jobs
4. Test error handling scenarios

## Production Deployment

For production deployment:

1. Update the API URL in `popup.js`
2. Create proper icon files (16x16, 48x48, 128x128 PNG)
3. Update version number in `manifest.json`
4. Test thoroughly on production environment
5. Consider publishing to Chrome Web Store

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Next.js API is working correctly
3. Test the API endpoint directly with curl or Postman
4. Check MongoDB connection and data storage
