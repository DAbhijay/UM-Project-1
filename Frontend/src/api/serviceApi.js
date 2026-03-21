import axios from './axiosConfig';

export const serviceApi = {
  createRequest: async (requestData) => {
    const response = await axios.post('/api/services', requestData);
    return response.data;
  },

  getMyRequests: async () => {
    const response = await axios.get('/api/services');
    return response.data;
  },

  acceptRequest: async (requestId) => {
    const response = await axios.patch(
      `/api/services/${requestId}/accept`
    );
    return response.data;
  },

  getProviders: async (serviceType) => {
    const response = await axios.get(
      `/api/providers?type=${serviceType}`
    );
    return response.data;
  },

  getProviderDetails: async (providerId) => {
    const response = await axios.get(`/api/providers/${providerId}`);
    return response.data;
  },
};