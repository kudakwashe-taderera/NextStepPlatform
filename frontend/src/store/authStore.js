import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      
      // Login
      login: async (email, password) => {
        try {
          const response = await axios.post('/api/auth/login/', { email, password });
          
          if (response.data && response.data.access) {
            set({ 
              user: response.data.user,
              token: response.data.access,
              refreshToken: response.data.refresh
            });
            
            // Set the token in axios default headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            
            return { success: true };
          }
        } catch (error) {
          console.error('Login error:', error);
          return { 
            success: false, 
            message: error.response?.data?.detail || 'Login failed. Please try again.' 
          };
        }
      },
      
      // Register
      register: async (userData) => {
        try {
          const response = await axios.post('/api/auth/register/', userData);
          
          if (response.data && response.data.access) {
            set({ 
              user: response.data.user,
              token: response.data.access,
              refreshToken: response.data.refresh
            });
            
            // Set the token in axios default headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            
            return { success: true };
          }
        } catch (error) {
          console.error('Registration error:', error);
          return { 
            success: false, 
            message: error.response?.data || 'Registration failed. Please try again.' 
          };
        }
      },
      
      // Logout
      logout: async () => {
        try {
          // Call logout API if needed
          if (get().refreshToken) {
            await axios.post('/api/auth/logout/', { refresh: get().refreshToken });
          }
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Remove token from axios headers
          delete axios.defaults.headers.common['Authorization'];
          
          // Clear state
          set({ user: null, token: null, refreshToken: null });
        }
      },
      
      // Check if user is authenticated
      isAuthenticated: () => {
        return !!get().token && !!get().user;
      },
      
      // Refresh token
      refreshAuthToken: async () => {
        const currentRefreshToken = get().refreshToken;
        
        if (!currentRefreshToken) return false;
        
        try {
          const response = await axios.post('/api/auth/token/refresh/', { refresh: currentRefreshToken });
          
          if (response.data && response.data.access) {
            set({ 
              token: response.data.access,
              refreshToken: response.data.refresh || currentRefreshToken
            });
            
            // Update the token in axios default headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            
            return true;
          }
        } catch (error) {
          console.error('Token refresh error:', error);
          
          // If refresh fails, log out the user
          get().logout();
          
          return false;
        }
      },
      
      // Update user profile
      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } });
      }
    }),
    {
      name: 'nextstep-auth',
      // Only persist these keys
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);