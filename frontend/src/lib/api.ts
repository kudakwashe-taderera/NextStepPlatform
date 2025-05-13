import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { ApiResponse, AuthTokens, User, LoginCredentials, RegisterData } from '@/types';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add interceptor to handle errors and authentication
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      // Handle unauthorized errors
      if (error.response.status === 401) {
        // Try to refresh token
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            const response = await axios.post<AuthTokens>('/api/auth/token/refresh/', {
              refresh: refreshToken,
            });
            
            // Update tokens
            const { access, refresh } = response.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            
            // Retry the original request
            const config = error.config as AxiosRequestConfig;
            if (config.headers) {
              config.headers['Authorization'] = `Bearer ${access}`;
            }
            return axios(config);
          }
        } catch (refreshError) {
          // If refresh failed, clear tokens and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
      
      // Show error message for client errors
      if (error.response.status >= 400 && error.response.status < 500) {
        const data = error.response.data as any;
        const message = data.detail || data.message || 'An error occurred';
        toast.error(message);
      }
      
      // Show general error for server errors
      if (error.response.status >= 500) {
        toast.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      // Request made but no response received
      toast.error('No response from server. Please check your internet connection.');
    } else {
      // Something else happened
      toast.error('An error occurred. Please try again.');
    }
    
    return Promise.reject(error);
  }
);

// Set token in headers
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('accessToken', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

// Initialize token from localStorage
const token = localStorage.getItem('accessToken');
if (token) {
  setAuthToken(token);
}

// Define API client modules
const authClient = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User & AuthTokens>> => {
    try {
      const response = await api.post<User & AuthTokens>('/auth/login/', credentials);
      
      if (response.data.access) {
        setAuthToken(response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      const err = error as AxiosError<any>;
      return { 
        success: false, 
        message: err.response?.data?.detail || 'Login failed',
      };
    }
  },
  
  register: async (userData: RegisterData): Promise<ApiResponse<User & AuthTokens>> => {
    try {
      const response = await api.post<User & AuthTokens>('/auth/register/', userData);
      
      if (response.data.access) {
        setAuthToken(response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      const err = error as AxiosError<any>;
      return { 
        success: false, 
        message: err.response?.data?.detail || 'Registration failed',
        errors: err.response?.data as Record<string, string[]> || undefined,
      };
    }
  },
  
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.post('/auth/logout/', { refresh: refreshToken });
      }
      setAuthToken(null);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Logout failed' };
    }
  },
  
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get<User>('/auth/user/');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch user data' };
    }
  },
};

// LMS API
const lmsClient = {
  getCourses: () => api.get('/lms/courses/'),
  getCourseById: (id: string) => api.get(`/lms/courses/${id}/`),
};

// Career API
const careerClient = {
  getCareerPaths: () => api.get('/career/paths/'),
  getCareerPathById: (id: string) => api.get(`/career/paths/${id}/`),
  getRecommendations: () => api.get('/career/recommendations/'),
};

// Jobs API
const jobsClient = {
  getJobs: () => api.get('/jobs/listings/'),
  getJobById: (id: string) => api.get(`/jobs/listings/${id}/`),
};

// Learning Resources API
const learningClient = {
  getResources: () => api.get('/learning/resources/'),
  getResourceById: (id: string) => api.get(`/learning/resources/${id}/`),
};

// Export the clients
export const authAPI = authClient;
export const lmsAPI = lmsClient;
export const careerAPI = careerClient;
export const jobsAPI = jobsClient;
export const learningAPI = learningClient;
export default api;