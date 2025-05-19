import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }


  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

 
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as UserRole)) {
    const redirectMap: Record<UserRole, string> = {
      O_LEVEL: '/dashboard/o-level',
      A_LEVEL: '/dashboard/a-level',
      TERTIARY: '/dashboard/university',
      LECTURER: '/dashboard/lecturer',
      MENTOR: '/dashboard/mentor',
      EMPLOYER: '/employer/dashboard',
      INST_ADMIN: '/dashboard/admin',
      MIN_ADMIN: '/dashboard/admin',
      SUPERUSER: '/dashboard/admin',
      GENERAL: '/dashboard/general',
    };

    const expectedPath = redirectMap[user.role as UserRole] || '/';

    
    if (location.pathname !== expectedPath) {
      return <Navigate to={expectedPath} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
