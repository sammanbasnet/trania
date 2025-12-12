const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('tranlyToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Handle network errors
    if (!response.ok) {
      let errorMessage = 'Something went wrong';
      try {
        const data = await response.json();
        errorMessage = data.error || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network errors (server not running, CORS, etc.)
    if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please make sure the backend server is running.');
    }
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  // User signup
  userSignup: async (userData) => {
    return apiRequest('/auth/user/signup', {
      method: 'POST',
      body: userData,
    });
  },

  // User login
  userLogin: async (email, password) => {
    return apiRequest('/auth/user/login', {
      method: 'POST',
      body: { email, password },
    });
  },

  // Trainer signup
  trainerSignup: async (trainerData) => {
    return apiRequest('/auth/trainer/signup', {
      method: 'POST',
      body: trainerData,
    });
  },

  // Trainer login
  trainerLogin: async (email, password) => {
    return apiRequest('/auth/trainer/login', {
      method: 'POST',
      body: { email, password },
    });
  },

  // Universal login (checks both user and trainer)
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },
};

export default apiRequest;

