import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;