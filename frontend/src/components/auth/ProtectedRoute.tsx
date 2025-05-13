import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check if user has required role if allowedRoles are specified
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have the required permissions to view this page. This area is restricted to 
            {allowedRoles.map((role, i) => (
              <span key={role}>
                {i === 0 ? ' ' : i === allowedRoles.length - 1 ? ' and ' : ', '}
                <span className="font-medium">{role.toLowerCase()}</span>
                {i === allowedRoles.length - 1 ? '.' : ''}
              </span>
            ))}
          </p>
          <p className="text-gray-600">
            Please contact your administrator if you believe this is an error.
          </p>
          <div className="mt-8">
            <Navigate to="/" replace />
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};

export default ProtectedRoute;