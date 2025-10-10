import axios from "axios";

// Properly construct the API base URL
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use relative path
    return '/api';
  }
  // Server-side: use full URL
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  return `${baseUrl.replace(/\/$/, '')}/api`;
};

const axiosSecure = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosSecure;
