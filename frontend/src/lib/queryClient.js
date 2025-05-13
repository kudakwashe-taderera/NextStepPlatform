import axios from 'axios';

// Function to generate query functions with common options
export const getQueryFn = ({ on401 = 'throw' } = {}) => {
  return async ({ queryKey }) => {
    const [path, params] = Array.isArray(queryKey) ? queryKey : [queryKey];
    
    try {
      const response = await apiRequest('GET', path, null, params);
      return await response.json();
    } catch (error) {
      if (error.status === 401 && on401 === 'returnNull') {
        return null;
      }
      throw error;
    }
  };
};

// Function for making API requests
export const apiRequest = async (method, path, data = null, params = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(data && { body: JSON.stringify(data) }),
    };

    const url = new URL(path, window.location.origin);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }

    const response = await fetch(url.toString(), options);
    
    if (!response.ok) {
      const error = new Error(`HTTP error ${response.status}`);
      error.status = response.status;
      error.response = response;
      throw error;
    }
    
    return response;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Create a dummy queryClient since we're not using React Query yet
export const queryClient = {
  setQueryData: (key, data) => {
    console.log(`Setting query data for ${key}:`, data);
    // In a real implementation, this would update the React Query cache
  },
};