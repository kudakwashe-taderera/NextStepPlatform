import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthTokens, LoginCredentials, RegisterData, ApiResponse } from '@/types';
import { authAPI, setAuthToken } from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  
  // Methods
  isAuthenticated: () => boolean;
  login: (credentials: LoginCredentials) => Promise<ApiResponse<User & AuthTokens>>;
  register: (userData: RegisterData) => Promise<ApiResponse<User & AuthTokens>>;
  logout: () => Promise<ApiResponse<null>>;
  refreshAuthToken: () => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      loading: false,
      error: null,
      
      // Check if user is authenticated
      isAuthenticated: () => {
        return Boolean(get().token && get().user);
      },
      
      // Login
      login: async (credentials) => {
        set({ loading: true, error: null });
        
        try {
          const result = await authAPI.login(credentials);
          
          if (result.success && result.data) {
            const { access, refresh, ...userData } = result.data;
            
            set({ 
              user: userData as User,
              token: access,
              refreshToken: refresh,
              loading: false,
            });
            
            // Set the token in axios default headers
            setAuthToken(access);
          } else {
            set({ 
              error: result.message || 'Login failed', 
              loading: false,
            });
          }
          
          return result;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({ error: errorMessage, loading: false });
          return { success: false, message: errorMessage };
        }
      },
      
      // Register
      register: async (userData) => {
        set({ loading: true, error: null });
        
        try {
          const result = await authAPI.register(userData);
          
          if (result.success && result.data) {
            const { access, refresh, ...user } = result.data;
            
            set({ 
              user: user as User,
              token: access,
              refreshToken: refresh,
              loading: false,
            });
            
            // Set the token in axios default headers
            setAuthToken(access);
          } else {
            set({
              error: result.message || 'Registration failed',
              loading: false,
            });
          }
          
          return result;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Registration failed';
          set({ error: errorMessage, loading: false });
          return { success: false, message: errorMessage };
        }
      },
      
      // Logout
      logout: async () => {
        set({ loading: true });
        
        try {
          const result = await authAPI.logout();
          
          // Clear state regardless of API success
          set({ 
            user: null, 
            token: null, 
            refreshToken: null,
            loading: false,
          });
          
          // Clear axios auth header
          setAuthToken(null);
          
          return result;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Logout failed';
          
          // Still clear state even if API fails
          set({ 
            user: null, 
            token: null, 
            refreshToken: null,
            error: errorMessage, 
            loading: false,
          });
          
          // Clear axios auth header
          setAuthToken(null);
          
          return { success: false, message: errorMessage };
        }
      },
      
      // Refresh token
      refreshAuthToken: async () => {
        const currentRefreshToken = get().refreshToken;
        
        if (!currentRefreshToken) return false;
        
        set({ loading: true });
        
        try {
          const response = await fetch('/api/auth/token/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: currentRefreshToken }),
          });
          
          if (!response.ok) {
            throw new Error('Token refresh failed');
          }
          
          const data = await response.json() as AuthTokens;
          
          if (data.access) {
            set({ 
              token: data.access,
              refreshToken: data.refresh || currentRefreshToken,
              loading: false,
            });
            
            // Update the token in axios default headers
            setAuthToken(data.access);
            
            return true;
          }
          
          set({ loading: false });
          return false;
        } catch (error) {
          console.error('Token refresh error:', error);
          
          // If refresh fails, log out the user
          await get().logout();
          
          set({ loading: false });
          return false;
        }
      },
      
      // Update user data
      updateUser: (userData) => {
        if (!get().user) return;
        
        set({ 
          user: { ...get().user!, ...userData } 
        });
      },
      
      // Clear error
      clearError: () => {
        set({ error: null });
      },
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