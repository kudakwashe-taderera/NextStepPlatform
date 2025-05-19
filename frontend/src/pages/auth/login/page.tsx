import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/auth/LoginForm';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  // Wait until loading is complete before redirecting
  useEffect(() => {
    if (!isLoading && user) {
      redirectBasedOnRole();
    }
  }, [user, isLoading]);

  const redirectBasedOnRole = () => {
    switch (user?.role) {
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
      case 'EMPLOYER':
        navigate('/employer/dashboard');
        break;
      case 'MENTOR':
        navigate('/dashboard/mentor');
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
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:to-gray-800 transition duration-500">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl px-10 py-12 space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Sign in to <span className="text-[#13294B]">NeXTStep</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Your digital learning & career ecosystem
            </p>
          </div>

          <LoginForm onSuccess={redirectBasedOnRole} />

          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">or continue with</div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-white text-gray-800 font-semibold rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <FcGoogle className="text-xl" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-900 text-white font-semibold rounded-xl shadow hover:shadow-md transition">
              <FaGithub className="text-xl" /> GitHub
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-[#1877f2] text-white font-semibold rounded-xl shadow hover:shadow-md transition">
              <FaFacebook className="text-xl" /> Facebook
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 bg-[#0a66c2] text-white font-semibold rounded-xl shadow hover:shadow-md transition">
              <FaLinkedin className="text-xl" /> LinkedIn
            </button>
          </div>

          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            Don’t have an account?{' '}
            <Link to="/auth/register" className="text-[#FF5F05] hover:underline font-semibold">
              Create one here
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Hero section */}
      <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-md"
        >
          <h2 className="text-4xl font-bold mb-4">Africa's Digital Learning Backbone</h2>
          <p className="text-lg mb-6">
            NeXTStep connects your education, career goals, and job opportunities in one powerful platform designed for African excellence.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">🎓 Learning Management System with certificates & live sessions</li>
            <li className="flex items-center gap-3">🧭 Personalized Career Guidance for every stage</li>
            <li className="flex items-center gap-3">💼 Job Portal for internships and employment</li>
            <li className="flex items-center gap-3">🌐 External Learning Hub (Coursera, LinkedIn, YouTube)</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
