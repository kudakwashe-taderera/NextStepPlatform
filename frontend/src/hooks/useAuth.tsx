import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import api from '../lib/api';
import { useAuthStore } from "@/store/useAuthStore";
import { User, LoginCredentials, RegisterData } from "@/types";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginCredentials>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authStore = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Check for existing auth on mount
  useEffect(() => {
    const init = async () => {
      // If we have a token but no user, try to fetch the user
      if (authStore.token && !authStore.user) {
        try {
          const response = await api.get('/auth/user/');
          if (response.data) {
            authStore.updateUser(response.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If we can't get the user, clear the auth
          authStore.logout();
        }
      }
      
      setIsInitialized(true);
    };
    
    init();
  }, []);
  
  // User data query
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!authStore.token) return null;
      
      try {
        const response = await api.get('/auth/user/');
        return response.data as User;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
    enabled: isInitialized && Boolean(authStore.token),
    initialData: authStore.user || null,
  });
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const result = await authStore.login(credentials);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.data!;
    },
  });
  
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const result = await authStore.register(data);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.data!;
    },
  });
  
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authStore.logout();
    },
  });
  
  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading: isLoading || !isInitialized,
        error: error instanceof Error ? error : null,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}