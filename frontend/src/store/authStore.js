import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define user roles as constants
export const USER_ROLES = {
  O_LEVEL_STUDENT: 'O_LEVEL',
  A_LEVEL_STUDENT: 'A_LEVEL',
  TERTIARY_STUDENT: 'TERTIARY',
  LECTURER: 'LECTURER',
  MENTOR: 'MENTOR',
  EMPLOYER: 'EMPLOYER',
  INSTITUTION_ADMIN: 'INST_ADMIN',
  MINISTRY_ADMIN: 'MIN_ADMIN',
  SUPERUSER: 'SUPERUSER',
  GENERAL_USER: 'GENERAL',
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,

      // Set authentication data after login/register
      setAuth: (user, token, refreshToken) => 
        set({ user, token, refreshToken }),

      // Clear authentication data on logout
      clearAuth: () => 
        set({ user: null, token: null, refreshToken: null }),

      // Update user data
      updateUser: (userData) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        })),

      // Check if user is authenticated
      isAuthenticated: () => {
        const state = get();
        return !!state.token && !!state.user;
      },

      // Check if user has specific role
      hasRole: (role) => {
        const state = get();
        if (!state.user) return false;
        if (Array.isArray(role)) {
          return role.includes(state.user.role);
        }
        return state.user.role === role;
      },

      // Check if user is student (any level)
      isStudent: () => {
        const state = get();
        if (!state.user) return false;
        return [
          USER_ROLES.O_LEVEL_STUDENT,
          USER_ROLES.A_LEVEL_STUDENT,
          USER_ROLES.TERTIARY_STUDENT
        ].includes(state.user.role);
      },

      // Check if user is admin (any level)
      isAdmin: () => {
        const state = get();
        if (!state.user) return false;
        return [
          USER_ROLES.INSTITUTION_ADMIN,
          USER_ROLES.MINISTRY_ADMIN, 
          USER_ROLES.SUPERUSER
        ].includes(state.user.role);
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