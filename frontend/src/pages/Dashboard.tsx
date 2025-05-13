import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // If user is not authenticated, redirect to auth page
        navigate('/auth');
      } else {
        // Redirect based on user role
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
            // If role doesn't match any expected values
            navigate('/auth');
        }
      }
    }
  }, [user, isLoading, navigate]);

  // Render loading state while determining redirection
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
}
