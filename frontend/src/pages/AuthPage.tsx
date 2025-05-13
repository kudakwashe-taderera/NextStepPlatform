import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { UserRole } from '@/types';
import { validateForm } from '@/lib/utils';

const AuthPage: React.FC = () => {
  const { user, loginMutation, registerMutation } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Form states
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    full_name: '',
    email: '',
    username: '',
    password: '',
    password_confirm: '',
    role: UserRole.STUDENT,
  });

  // If user is already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Handle login form changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  // Handle registration form changes
  const handleRegisterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  // Handle login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationRules = {
      username: { required: true },
      password: { required: true },
    };
    
    const validation = validateForm(loginForm, validationRules);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }
    
    // Clear any previous errors
    setFormErrors({});
    
    // Submit login request
    loginMutation.mutate(loginForm);
  };

  // Handle registration submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationRules = {
      full_name: { required: true },
      email: { required: true, isEmail: true },
      username: { required: true, minLength: 3 },
      password: { required: true, minLength: 6 },
      password_confirm: { required: true, matches: 'password' },
    };
    
    const validation = validateForm(registerForm, validationRules);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }
    
    // Clear any previous errors
    setFormErrors({});
    
    // Submit registration request
    registerMutation.mutate(registerForm);
  };

  // Role options for select dropdown
  const roleOptions = [
    { value: UserRole.STUDENT, label: 'Student' },
    { value: UserRole.LECTURER, label: 'Lecturer' },
    { value: UserRole.EMPLOYER, label: 'Employer' },
    { value: UserRole.MENTOR, label: 'Mentor' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isLoginMode ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setFormErrors({});
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isLoginMode ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            {isLoginMode ? (
              // Login Form
              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={handleLoginChange}
                  error={formErrors.username}
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  error={formErrors.password}
                />

                {loginMutation.isError && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-sm text-red-700">
                      {loginMutation.error?.message || 'Login failed. Please try again.'}
                    </p>
                  </div>
                )}

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={loginMutation.isPending}
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            ) : (
              // Registration Form
              <form className="space-y-6" onSubmit={handleRegisterSubmit}>
                <Input
                  label="Full Name"
                  name="full_name"
                  type="text"
                  required
                  value={registerForm.full_name}
                  onChange={handleRegisterChange}
                  error={formErrors.full_name}
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  error={formErrors.email}
                />

                <Input
                  label="Username"
                  name="username"
                  type="text"
                  required
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                  error={formErrors.username}
                />

                <Select
                  label="Role"
                  name="role"
                  required
                  options={roleOptions}
                  value={registerForm.role}
                  onChange={handleRegisterChange}
                  error={formErrors.role}
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  required
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  error={formErrors.password}
                />

                <Input
                  label="Confirm Password"
                  name="password_confirm"
                  type="password"
                  required
                  value={registerForm.password_confirm}
                  onChange={handleRegisterChange}
                  error={formErrors.password_confirm}
                />

                {registerMutation.isError && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-sm text-red-700">
                      {registerMutation.error?.message || 'Registration failed. Please try again.'}
                    </p>
                  </div>
                )}

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={registerMutation.isPending}
                  >
                    Create account
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hidden md:block md:w-1/2 bg-blue-600">
        <div className="flex flex-col justify-center h-full px-12 text-white">
          <h1 className="text-4xl font-bold mb-6">Welcome to NeXTStep</h1>
          <p className="text-xl mb-8">
            Your comprehensive platform for education, career guidance, and professional development.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Access comprehensive learning resources
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Get personalized career recommendations
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Connect with employers and job opportunities
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Track your educational progress
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;