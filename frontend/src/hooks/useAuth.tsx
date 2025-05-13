import { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState 
} from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { toast } from 'react-hot-toast';
import { User, LoginData, RegisterData } from '../types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const { 
    data: user, 
    isLoading, 
    error,
    remove: removeUser
  } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const { data } = await api.get('/api/auth/user/');
        return data;
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        throw error;
      }
    },
    retry: false,
    onSettled: () => {
      setInitialCheckDone(true);
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (loginData: LoginData) => {
      const { data } = await api.post('/api/auth/login/', loginData);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh', data.refresh);
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (error: Error) => {
      toast.error('Login failed: ' + error.message);
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (registerData: RegisterData) => {
      const { data } = await api.post('/api/auth/register/', registerData);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh', data.refresh);
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (error: Error) => {
      toast.error('Registration failed: ' + error.message);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        const refresh = localStorage.getItem('refresh');
        if (refresh) {
          await api.post('/api/auth/logout/', { refresh });
        }
      } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        removeUser();
      }
    },
    onError: (error: Error) => {
      toast.error('Logout failed: ' + error.message);
    }
  });

  const login = async (data: LoginData) => {
    await loginMutation.mutateAsync(data);
  };

  const register = async (data: RegisterData) => {
    await registerMutation.mutateAsync(data);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    navigate('/auth');
  };

  // Automatically redirect based on user role when auth state changes
  useEffect(() => {
    if (!initialCheckDone) return;
    
    if (user) {
      // Redirect to appropriate dashboard based on role
      switch (user.role) {
        case 'O_LEVEL':
          navigate('/dashboard/o-level');
          break;
        case 'A_LEVEL':
          navigate('/dashboard/a-level');
          break;
        case 'TERTIARY':
          navigate('/dashboard/university');
          break;
        case 'LECTURER':
          navigate('/dashboard/lecturer');
          break;
        case 'MENTOR':
          navigate('/dashboard/mentor');
          break;
        case 'EMPLOYER':
          navigate('/dashboard/employer');
          break;
        case 'INST_ADMIN':
        case 'MIN_ADMIN':
        case 'SUPERUSER':
          navigate('/dashboard/admin');
          break;
        case 'GENERAL':
          navigate('/dashboard/general');
          break;
        default:
          navigate('/');
      }
    } else if (!isLoading && window.location.pathname !== '/auth') {
      // Redirect to auth page if not authenticated and not already on auth page
      navigate('/auth');
    }
  }, [user, isLoading, initialCheckDone, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout
      }}
    >
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
