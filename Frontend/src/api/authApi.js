import axios from './axiosConfig';

const json = { 'Content-Type': 'application/json' };

export const authApi = {
  register: async (userData) => {
    const response = await axios.post(
      '/api/auth/register',
      JSON.stringify(userData),
      { headers: json }
    );
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(
      '/api/auth/login',
      JSON.stringify(credentials),
      { headers: json }
    );
    return response.data;
  },

  getProfile: async () => {
    const response = await axios.get('/api/auth/me');
    return response.data;
  },

  completeProviderProfile: async (profileData) => {
    const response = await axios.post(
      '/api/auth/complete-provider-profile',
      JSON.stringify(profileData),
      { headers: json }
    );
    return response.data;
  },
};