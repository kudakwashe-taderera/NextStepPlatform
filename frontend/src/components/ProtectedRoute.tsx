import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  // If authentication is still loading, show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If there are allowed roles specified and user's role is not included, redirect to appropriate dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as UserRole)) {
    // Get the appropriate route based on user's role
    let redirectTo = '/';
    switch (user.role) {
      case UserRole.O_LEVEL_STUDENT:
        redirectTo = '/dashboard/o-level';
        break;
      case UserRole.A_LEVEL_STUDENT:
        redirectTo = '/dashboard/a-level';
        break;
      case UserRole.TERTIARY_STUDENT:
        redirectTo = '/dashboard/university';
        break;
      case UserRole.LECTURER:
        redirectTo = '/dashboard/lecturer';
        break;
      case UserRole.MENTOR:
        redirectTo = '/dashboard/mentor';
        break;
      case UserRole.EMPLOYER:
        redirectTo = '/dashboard/employer';
        break;
      case UserRole.INSTITUTION_ADMIN:
      case UserRole.MINISTRY_ADMIN:
      case UserRole.SUPERUSER:
        redirectTo = '/dashboard/admin';
        break;
      case UserRole.GENERAL_USER:
        redirectTo = '/dashboard/general';
        break;
    }
    return <Navigate to={redirectTo} replace />;
  }

  // If user is authenticated and has allowed role, render children
  return <>{children}</>;
};

export default ProtectedRoute;
