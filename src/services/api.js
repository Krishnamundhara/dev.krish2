const API_URL = 'http://localhost:5000/api';

// Helper function to get auth header
const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  'x-auth-token': localStorage.getItem('token')
});

// Auth API calls
export const auth = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeader()
    });
    return response.json();
  }
};

// Bills API calls
export const bills = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/bills`, {
      headers: getAuthHeader()
    });
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/bills/${id}`, {
      headers: getAuthHeader()
    });
    return response.json();
  },

  create: async (billData) => {
    const response = await fetch(`${API_URL}/bills`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(billData)
    });
    return response.json();
  },

  update: async (id, billData) => {
    const response = await fetch(`${API_URL}/bills/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(billData)
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/bills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return response.json();
  }
}; 