import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button.tsx';
import { UserRole } from '@/types';
import { validateForm } from '@/lib/utils';
import { 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  User,
  Users,
  UserCog,
  ChevronRight,
  MailIcon,
  LockIcon,
  UserIcon,
  BuildingIcon,
  PhoneIcon,
  School
} from 'lucide-react';

// Type for form data
interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
  phone?: string;
  institution?: string;
  role: UserRole;
  [key: string]: string | UserRole | undefined;
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loginMutation, registerMutation } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    institution: '',
    role: UserRole.STUDENT,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedLevel, setSelectedLevel] = useState<'o-level' | 'a-level' | 'university'>('o-level');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      redirectBasedOnRole(user.role);
    }
  }, [user]);

  const redirectBasedOnRole = (role: UserRole) => {
    switch (role) {
      case UserRole.STUDENT:
        if (user?.studentLevel === 'O_LEVEL') {
          navigate('/dashboard/o-level');
        } else if (user?.studentLevel === 'A_LEVEL') {
          navigate('/dashboard/a-level');
        } else {
          navigate('/dashboard/university');
        }
        break;
      case UserRole.LECTURER:
        navigate('/dashboard/lecturer');
        break;
      case UserRole.EMPLOYER:
        navigate('/employer/dashboard');
        break;
      case UserRole.MENTOR:
        navigate('/dashboard/mentor');
        break;
      case UserRole.ADMIN:
        navigate('/dashboard/admin');
        break;
      default:
        navigate('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const validateRegisterForm = () => {
    const rules = {
      email: { required: true, email: true },
      password: { required: true, minLength: 6 },
      confirmPassword: { required: true, match: 'password' },
      fullName: { required: true },
      phone: { required: true },
      institution: { required: formData.role !== UserRole.EMPLOYER }
    };
    
    return validateForm(formData, rules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let validationResult;
    
    if (isLogin) {
      validationResult = validateLoginForm();
    } else {
      validationResult = validateRegisterForm();
    }
    
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }
    
    if (isLogin) {
      loginMutation.mutate({
        username: formData.email,
        password: formData.password,
      });
    } else {
      const registerData = {
        username: formData.email,
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName || '',
        phone: formData.phone || '',
        institution: formData.institution || '',
        role: formData.role,
        student_level: formData.role === UserRole.STUDENT ? selectedLevel.toUpperCase() : undefined,
      };
      
      registerMutation.mutate(registerData);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.STUDENT:
        return <GraduationCap className="h-5 w-5" />;
      case UserRole.LECTURER:
        return <BookOpen className="h-5 w-5" />;
      case UserRole.EMPLOYER:
        return <Briefcase className="h-5 w-5" />;
      case UserRole.MENTOR:
        return <Users className="h-5 w-5" />;
      case UserRole.ADMIN:
        return <UserCog className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left side - Auth Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back to' : 'Join'} NeXTStep
            </h1>
            <p className="mt-2 text-gray-600">
              {isLogin 
                ? 'Your gateway to education, career guidance, and job opportunities' 
                : 'Create your account to access personalized education and career resources'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex border-b mb-6">
              <button
                className={`pb-4 px-2 ${isLogin ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`pb-4 px-2 ml-8 ${!isLogin ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
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
              
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`pl-10 block w-full rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className={`pl-10 block w-full rounded-md border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`pl-10 block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="+1234567890"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      I am a
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.values(UserRole).map(role => (
                        <div
                          key={role}
                          className={`flex items-center p-3 rounded-md cursor-pointer border ${
                            formData.role === role 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, role }))}
                        >
                          {getRoleIcon(role)}
                          <span className="ml-2 text-sm font-medium">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {formData.role === UserRole.STUDENT && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Education Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <div
                          className={`flex items-center justify-center p-2 rounded-md cursor-pointer border text-sm font-medium ${
                            selectedLevel === 'o-level' 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedLevel('o-level')}
                        >
                          O-Level
                        </div>
                        <div
                          className={`flex items-center justify-center p-2 rounded-md cursor-pointer border text-sm font-medium ${
                            selectedLevel === 'a-level' 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedLevel('a-level')}
                        >
                          A-Level
                        </div>
                        <div
                          className={`flex items-center justify-center p-2 rounded-md cursor-pointer border text-sm font-medium ${
                            selectedLevel === 'university' 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedLevel('university')}
                        >
                          University
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formData.role !== UserRole.EMPLOYER && (
                    <div>
                      <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                        {formData.role === UserRole.STUDENT ? 'School/University' : 'Institution'}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {formData.role === UserRole.STUDENT ? 
                            <School className="h-5 w-5 text-gray-400" /> : 
                            <BuildingIcon className="h-5 w-5 text-gray-400" />
                          }
                        </div>
                        <input
                          type="text"
                          id="institution"
                          name="institution"
                          className={`pl-10 block w-full rounded-md border ${errors.institution ? 'border-red-500' : 'border-gray-300'} shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          placeholder={formData.role === UserRole.STUDENT ? "School or University name" : "Institution name"}
                          value={formData.institution}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.institution && <p className="mt-1 text-sm text-red-600">{errors.institution}</p>}
                    </div>
                  )}
                </>
              )}
              
              {isLogin && (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              )}
              
              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4"
                  disabled={loginMutation.isLoading || registerMutation.isLoading}
                >
                  {loginMutation.isLoading || registerMutation.isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </>
                  )}
                </Button>
              </div>
            </form>
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

export default AuthPage;