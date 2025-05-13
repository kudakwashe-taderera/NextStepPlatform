import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      let redirectPath = '/';
      
      // Redirect based on user role
      switch (user.role) {
        case 'O_LEVEL':
          redirectPath = '/dashboard/o-level';
          break;
        case 'A_LEVEL':
          redirectPath = '/dashboard/a-level';
          break;
        case 'TERTIARY':
          redirectPath = '/dashboard/university';
          break;
        case 'LECTURER':
          redirectPath = '/dashboard/lecturer';
          break;
        case 'MENTOR':
          redirectPath = '/dashboard/mentor';
          break;
        case 'EMPLOYER':
          redirectPath = '/dashboard/employer';
          break;
        case 'INST_ADMIN':
        case 'MIN_ADMIN':
        case 'SUPERUSER':
          redirectPath = '/dashboard/admin';
          break;
        case 'GENERAL':
          redirectPath = '/dashboard/general';
          break;
      }
      
      navigate(redirectPath);
    }
  }, [user, isLoading, navigate]);

  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Login/Register tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`py-4 px-6 text-sm font-medium focus:outline-none ${
              isLogin
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`py-4 px-6 text-sm font-medium focus:outline-none ${
              !isLogin
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <div>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* Toggle between forms */}
        <div className="text-center text-sm">
          {isLogin ? (
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                className="text-indigo-600 font-medium hover:text-indigo-500"
                onClick={() => setIsLogin(false)}
              >
                Create one
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                className="text-indigo-600 font-medium hover:text-indigo-500"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
