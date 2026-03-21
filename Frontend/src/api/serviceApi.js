import axios from '../api/axiosConfig';

export const serviceApi = {
    // Create Request
    createRequest: async (requestData) =>{
    const response =  await axios.post('/api/services', requestData);
    return response.data;
    },

    // Get my requests
    getMyRequests: async () =>{
    const response = await axios.get('/api/services');
    return response.data;
    },

    // Accept request
    acceptRequest: async (requestId) =>{
    const response = await axios.patch(`/api/services/${requestId}/accept`);
    return response.data;
    },

    // Get Provider Profile
    getProviders: async (serviceType) =>{
    const response = await axios.get(`/api/providers?service_type=${serviceType}`);
    return response.data;
    },

    // Get Provider Profile
    getProviderDetails: async (providerId) => {
    const response = await axios.get(`/api/providers/${providerId}`);
    return response.data;
    },
}