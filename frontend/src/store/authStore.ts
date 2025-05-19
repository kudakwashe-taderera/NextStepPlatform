import { User, UserRole, RegisterData } from '../types';
import api from '../lib/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  setAuth: (user: User, token: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: () => boolean;
  hasRole: (roles: UserRole[]) => boolean;
  register: (data: RegisterData) => Promise<{ success: boolean; data?: User; message?: string }>; // Add this
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,

      setAuth: (user, token, refreshToken) =>
        set({ user, token, refreshToken }),

      clearAuth: () =>
        set({ user: null, token: null, refreshToken: null }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      isAuthenticated: () => {
        const state = get();
        return !!state.token && !!state.user;
      },

      hasRole: (roles) => {
        const state = get();
        if (!state.user) return false;
        return roles.includes(state.user.role as UserRole);
      },

      register: async (data: RegisterData) => {
        try {
          const response = await api.post('/auth/register/', data);
          return { success: true, data: response.data };
        } catch (error: any) {
          console.error('Error during registration:', error);
          return {
            success: false,
            message: error.response?.data?.detail || 'Registration failed',
          };
        }
      },
    }),
    {
      name: 'nextstep-auth',
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);