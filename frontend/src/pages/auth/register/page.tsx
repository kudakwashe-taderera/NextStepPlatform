import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { RegisterForm } from '@/components/auth/RegisterForm';
import {
  GraduationCap,
  User,
  Briefcase,
  BookOpen,
} from 'lucide-react';

const Feature = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div className="ml-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-gray-200">{desc}</p>
    </div>
  </div>
);

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) redirectBasedOnRole();
  }, [user]);

  const redirectBasedOnRole = () => {
    if (!user) return;

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
        navigate('/employer/dashboard');
        break;
      case 'INST_ADMIN':
      case 'MIN_ADMIN':
      case 'SUPERUSER':
        navigate('/dashboard/admin');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:to-gray-800 transition duration-500">
      {/* Left side - Register Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl px-10 py-12 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Create your <span className="text-[#13294B]">NeXTStep</span> account
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Access learning, career, and job opportunities in one place
            </p>
          </div>

          {/* ✅ Redirects to login after successful registration */}
          <RegisterForm onSuccess={() => navigate('/auth/login')} />

          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-[#FF5F05] hover:underline font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Hero section */}
      <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-12">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-4">Africa's Digital Learning Backbone</h2>
          <p className="text-lg mb-6">
            NeXTStep connects your education, career goals, and job opportunities in one powerful platform designed for African excellence.
          </p>
          <div className="space-y-4">
            <Feature
              icon={<GraduationCap className="h-6 w-6 text-blue-300" />}
              title="Learning Management System"
              desc="Access courses, assignments, and earn certificates"
            />
            <Feature
              icon={<User className="h-6 w-6 text-blue-300" />}
              title="Career Guidance"
              desc="Get personalized recommendations based on your profile"
            />
            <Feature
              icon={<Briefcase className="h-6 w-6 text-blue-300" />}
              title="Job Portal"
              desc="Find internships and jobs matched to your skills"
            />
            <Feature
              icon={<BookOpen className="h-6 w-6 text-blue-300" />}
              title="Learning Hub"
              desc="Discover curated resources from top platforms"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
