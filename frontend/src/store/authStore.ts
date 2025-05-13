import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  setAuth: (user: User, token: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: () => boolean;
  hasRole: (roles: UserRole[]) => boolean;
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
          user: state.user ? { ...state.user, ...userData } : null
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
