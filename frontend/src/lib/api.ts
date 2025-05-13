import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
export const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refresh');
        
        if (!refreshToken) {
          // No refresh token available, redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
          window.location.href = '/auth';
          return Promise.reject(error);
        }
        
        // Make refresh token request
        const { data } = await axios.post(
          `${api.defaults.baseURL}/api/auth/token/refresh/`,
          { refresh: refreshToken }
        );
        
        // Save the new token
        localStorage.setItem('token', data.access);
        
        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        
        // Show error message
        toast.error('Your session has expired. Please log in again.');
        
        // Redirect to login page
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          'Something went wrong. Please try again.';
    
    // Show error toast for non-auth errors
    if (error.response?.status !== 401) {
      toast.error(errorMessage);
    }
    
    return Promise.reject(error);
  }
);

export default api;
