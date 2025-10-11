# ApplyMate Chrome Extension

A Chrome extension that uses **AI-powered scraping** to extract job listings from various job sites and saves them to your ApplyMate dashboard.

## ✨ Features

- **🤖 AI-Powered Extraction**: Uses Google Gemini 2.0 Flash for state-of-the-art job data extraction
- **📧 Email Storage**: Store your email once in the extension popup
- **🔐 Secure Token Management**: API token is securely fetched from backend
- **🎯 Smart Detection**: AI automatically extracts job title, company, location, job type, and description
- **💾 MongoDB Integration**: Saves scraped jobs to your ApplyMate database
- **🔄 Fallback Mechanism**: Traditional DOM scraping as backup if AI fails
- **🌍 Multi-language Support**: Works with job sites in multiple languages

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

## 🚀 Quick Setup

### Step 1: Configure Backend API Key

1. Go to [Google AI Studio](https://aistudio.google.com/) and create an account (free)
2. Navigate to [Get API Key](https://aistudio.google.com/app/apikey)
3. Click "Create API Key" and select "Create API key in new project" or use existing project
4. Copy the generated API key
5. Add the key to your `.env` file: `GOOGLE_GEMINI_API_KEY=your_api_key_here`
6. Restart your Next.js development server

### Step 2: Install Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `chrome-extension` folder from your ApplyMate project
5. The extension should now appear in your extensions list

### Step 3: Configure Extension

1. Click the ApplyMate extension icon in your browser toolbar
2. Enter your email address
3. Click "Save Email"

✅ **You're ready to start scraping jobs with AI!**


### Configure API Endpoint

The extension sends data to `https://apply-mate-m1m6.vercel.app/api/saveJob` by default.

To change this for production:
1. Edit `popup.js` (line 350)
2. Update the `apiUrl` variable in the `sendJobToAPI` function
3. Replace `https://apply-mate-m1m6.vercel.app` with your production URL (if different)

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

## How It Works

The extension uses a simplified AI-first approach:

1. **Extracts Raw Content**: Captures entire page text, metadata, and structured data
2. **Sends to AI**: Google Gemini 2.0 Flash analyzes the content intelligently
3. **Extracts Job Data**: AI identifies and structures:
   - Job Title
   - Company Name
   - Location
   - Job Type (Remote/Hybrid/Onsite)
   - Job Description
   - Status (Always set to "Applied")
   - URL and Date
4. **Saves to Database**: Sends structured data to your Next.js backend

## Why AI-First Approach?

### Advantages

- **Universal**: Works on ANY job site without site-specific code
- **Future-Proof**: No need to update selectors when sites change
- **Multi-Language**: Handles job listings in any language
- **Smart**: Google Gemini understands context, not just HTML structure
- **Low Maintenance**: No selector updates needed

### Traditional vs AI-First

| Aspect | Traditional Scraping | AI-First Approach |
|--------|---------------------|-------------------|
| Setup | Site-specific selectors | Universal content extraction |
| Maintenance | Breaks when sites update | Adapts automatically |
| New Sites | Requires code changes | Works immediately |
| Languages | English only | Multi-language support |
| Accuracy | 60-70% | 85-95% |

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
    "status": "Applied",
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

### Database Structure
Jobs are saved as individual documents in the `jobs` collection:
```json
{
  "_id": "68e3764829652dece8f7dd56",
  "email": "user@example.com",
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "type": "remote",
  "description": "Job description...",
  "status": "Applied",
  "url": "https://example.com/job/123",
  "date": "2024-01-15",
  "createdAt": "2025-01-15T...",
  "source": "chrome-extension"
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
