import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button.tsx';
import { validateForm } from '@/lib/utils';
import { 
  GraduationCap, 
  Briefcase, 
  User,
  BookOpen,
  MailIcon,
  LockIcon,
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loginMutation } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      redirectBasedOnRole();
    }
  }, [user]);

  const redirectBasedOnRole = () => {
    if (!user) return;
    
    switch (user.role) {
      case 'STUDENT':
        if (user.studentLevel === 'O_LEVEL') {
          navigate('/dashboard/o-level');
        } else if (user.studentLevel === 'A_LEVEL') {
          navigate('/dashboard/a-level');
        } else {
          navigate('/dashboard/university');
        }
        break;
      case 'LECTURER':
        navigate('/dashboard/lecturer');
        break;
      case 'EMPLOYER':
        navigate('/employer/dashboard');
        break;
      case 'MENTOR':
        navigate('/dashboard/mentor');
        break;
      case 'ADMIN':
        navigate('/dashboard/admin');
        break;
      default:
        navigate('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateLoginForm = () => {
    const rules = {
      email: { required: true, email: true },
      password: { required: true, minLength: 6 }
    };
    
    return validateForm(formData, rules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationResult = validateLoginForm();
    
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }
    
    loginMutation.mutate({
      username: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back to NeXTStep
            </h1>
            <p className="mt-2 text-gray-600">
              Your gateway to education, career guidance, and job opportunities
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Sign In</h2>
              <Link to="/auth/register" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Create an account
              </Link>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`pl-10 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`pl-10 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4"
                  disabled={loginMutation.isLoading}
                >
                  {loginMutation.isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
                
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Hero section */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-700 p-12 hidden md:flex flex-col justify-center">
        <div className="max-w-md mx-auto text-white">
          <h2 className="text-3xl font-bold mb-6">Your All-In-One Education and Career Platform</h2>
          <p className="text-gray-100 mb-8">
            NeXTStep helps you navigate from education to career with personalized guidance, 
            learning resources, and job opportunities tailored to your unique journey.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <GraduationCap className="h-6 w-6 text-blue-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Learning Management System</h3>
                <p className="text-gray-200">Access courses, assignments, and earn certificates</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <User className="h-6 w-6 text-blue-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Career Guidance</h3>
                <p className="text-gray-200">Get personalized recommendations based on your profile</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Briefcase className="h-6 w-6 text-blue-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Job Portal</h3>
                <p className="text-gray-200">Find internships and jobs matched to your skills</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <BookOpen className="h-6 w-6 text-blue-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Learning Hub</h3>
                <p className="text-gray-200">Discover curated resources from top platforms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;