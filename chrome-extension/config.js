// Configuration file for ApplyMate Chrome Extension
// ⚠️ THIS FILE IS GITIGNORED - DO NOT COMMIT TO VERSION CONTROL

const CONFIG = {
  // Your Hugging Face API token
  HUGGINGFACE_API_TOKEN: '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',
  
  // API endpoint for your Next.js backend
  API_ENDPOINT: 'http://localhost:3002/api/saveJob'
};

// Make CONFIG available globally for popup.js
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
