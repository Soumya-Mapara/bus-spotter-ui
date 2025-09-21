// Backend API configuration
// Update this URL when you deploy your Flask backend
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-deployed-backend.com' // Replace with your deployed backend URL
  : 'http://localhost:5000'; // Local development

export const API_ENDPOINTS = {
  latest: `${API_BASE_URL}/latest`,
  track: `${API_BASE_URL}/track`,
} as const;