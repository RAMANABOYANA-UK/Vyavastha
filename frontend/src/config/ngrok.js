// ngrok Configuration for QR Code URLs
// =====================================
//
// SETUP INSTRUCTIONS:
// 1. Run: ngrok http 5173
// 2. Copy the https URL ngrok gives you (e.g. https://abc123.ngrok-free.app)
// 3. Create/Update frontend/.env file with:
//    VITE_NGROK_URL=https://your-ngrok-url.ngrok-free.app
// 4. Restart your frontend dev server (npm run dev)
//
// NOTE: Free ngrok URL changes every restart, so update .env each time

// Get the base URL for QR codes
// Automatically uses the current browser origin, so QR codes work
// on any phone on the same WiFi — no manual IP configuration needed.
export const getBaseUrl = () => {
  // First priority: ngrok URL from environment
  if (import.meta.env.VITE_NGROK_URL) {
    return import.meta.env.VITE_NGROK_URL;
  }
  
  // Use whatever origin the browser is currently using.
  // If accessed via http://192.168.x.x:5173, QR codes will encode that IP.
  // If accessed via ngrok/Netlify/any domain, QR codes use that domain.
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  return 'http://localhost:5173';
};

// Build the rating URL for QR codes
export const buildRatingUrl = (serviceId) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/rate/${serviceId}`;
};

// Check if we're running on ngrok
export const isNgrokEnvironment = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin.includes('ngrok');
  }
  return false;
};

// Get a displayable URL (shortened for UI)
export const getDisplayUrl = (serviceId) => {
  const fullUrl = buildRatingUrl(serviceId);
  // Shorten for display
  if (fullUrl.length > 50) {
    return fullUrl.substring(0, 47) + '...';
  }
  return fullUrl;
};

export default {
  getBaseUrl,
  buildRatingUrl,
  isNgrokEnvironment,
  getDisplayUrl
};
