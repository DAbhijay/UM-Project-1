import axios from './axiosConfig';

export const authApi = {
  register: async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get('/api/auth/me');
    return response.data;
  },

  completeProviderProfile: async (profileData) => {
    const response = await axios.post(
      '/api/auth/complete-provider-profile',
      profileData
    );
    return response.data;
  },
};