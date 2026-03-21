import axios from '../api/axiosConfig';

export const authApi = {
    // Register
    register: async (userData) =>{
     await axios.post('/api/auth/register', userData);
    return response.data;
    },

    // Login
    login: async (credentials) =>{
     await axios.post('/api/auth/login', credentials);
    return response.data;
    },

    // Get Profile
    getProfile: async () =>{
     await axios.get('/api/auth/me');
    return response.data;
    },

    // Complete Provider Profile
    completeProviderProfile: async (profileData) =>{
     await axios.post('/api/auth/complete-provider-profile', profileData);
    return response.data;
    },
}