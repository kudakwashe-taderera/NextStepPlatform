import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = '/auth',
  children,
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // If authentication is still being determined, show a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If no user or roles don't match, redirect to login
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If there are children, render them, otherwise render the outlet
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;