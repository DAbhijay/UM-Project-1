import axios from 'axios';

console.log('🔍 API URL:', BASE_URL);

const BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:5000';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content_type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;