import axios from 'axios';

const BASE_URL = String(
  process.env.REACT_APP_API_URL || 'http://localhost:5000'
).trim();

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-type': 'application/json',
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
        const status = error.response?.status;
        const url = String(error.config?.url || '');
        const isAuthForm =
            url.includes('/api/auth/login') || url.includes('/api/auth/register');
        // Failed login/register returns 401/400 — do not redirect or clear storage
        if (status === 401 && !isAuthForm) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;