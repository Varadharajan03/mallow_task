import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Your backend server URL
});

// Axios interceptor to add the JWT token to every request
// This is a professional pattern that keeps your API calls clean
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        const token = user ? JSON.parse(user).token : null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
