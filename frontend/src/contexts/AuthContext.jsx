import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const authStore = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Check if token exists and set axios default header
  useEffect(() => {
    const initializeAuth = async () => {
      if (authStore.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
        
        // Optionally refresh the token or verify it
        try {
          await authStore.refreshAuthToken();
        } catch (error) {
          console.error('Failed to refresh token:', error);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authStore, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};