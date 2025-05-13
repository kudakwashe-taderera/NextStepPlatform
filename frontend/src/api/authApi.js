import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Create an axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        
        if (!refreshToken) {
          // No refresh token, logout user
          useAuthStore.getState().clearAuth();
          return Promise.reject(error);
        }
        
        // Try to refresh token
        const response = await axios.post('/api/auth/token/refresh/', {
          refresh: refreshToken,
        });
        
        const { access } = response.data;
        
        // Update token in store
        useAuthStore.getState().setAuth(
          useAuthStore.getState().user,
          access,
          refreshToken
        );
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API functions
export const authApi = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
  },
  
  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },
  
  // Logout user
  logout: async () => {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (refreshToken) {
      await api.post('/auth/logout/', { refresh: refreshToken });
    }
    useAuthStore.getState().clearAuth();
  },
  
  // Get current user data
  getCurrentUser: async () => {
    const response = await api.get('/auth/user/');
    return response.data;
  },
  
  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.patch('/auth/user/', userData);
    return response.data;
  },
  
  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post('/auth/change-password/', passwordData);
    return response.data;
  },
};

// Export the API instance for other services
export default api;