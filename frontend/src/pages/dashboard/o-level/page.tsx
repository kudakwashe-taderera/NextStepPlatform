import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layout/MainLayout';
import { UserRole } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button.tsx';

const OLevelDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect check should be handled by ProtectedRoute

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">O Level Student Dashboard</h1>
          <p className="text-gray-600 mb-4">
            Welcome to your personalized dashboard. Based on your O Level subjects, we've prepared
            some recommendations to help guide your educational journey.
          </p>
          <div className="flex space-x-2">
            <Button>Update My Subjects</Button>
            <Button variant="outline">Take Career Quiz</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* A Level Subject Recommendations */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recommended A Level Subjects
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Mathematics</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  96% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Physics</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  92% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Computer Science</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  88% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Chemistry</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  85% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Biology</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  74% Match
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/careers/subjects/a-level" className="text-blue-600 hover:underline text-sm">
                View all recommended subjects →
              </Link>
            </div>
          </div>

          {/* Program Recommendations */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recommended University Programs
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Computer Engineering</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  94% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Software Development</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  91% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Data Science</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  87% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Electrical Engineering</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  76% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Mechanical Engineering</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  72% Match
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/careers/programs" className="text-blue-600 hover:underline text-sm">
                View all recommended programs →
              </Link>
            </div>
          </div>

          {/* Career Recommendations */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Potential Career Paths
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Software Engineer</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  95% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Data Scientist</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  92% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">AI/ML Engineer</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  89% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">Systems Architect</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  77% Match
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-800">IT Consultant</span>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  75% Match
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/careers/paths" className="text-blue-600 hover:underline text-sm">
                View all career paths →
              </Link>
            </div>
          </div>
        </div>

        {/* Educational Journey Map */}
        <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Educational Journey</h2>
          <div className="flex justify-between items-center relative py-6">
            {/* Progress line */}
            <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2 z-0"></div>
            
            {/* Steps */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                1
              </div>
              <span className="text-sm font-medium mt-2">O Level</span>
              <span className="text-xs text-gray-500">Current</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                2
              </div>
              <span className="text-sm font-medium mt-2">A Level</span>
              <span className="text-xs text-gray-500">Next Step</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                3
              </div>
              <span className="text-sm font-medium mt-2">University</span>
              <span className="text-xs text-gray-500">Future</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                4
              </div>
              <span className="text-sm font-medium mt-2">Career</span>
              <span className="text-xs text-gray-500">Goal</span>
            </div>
          </div>
        </div>

        {/* Extra Learning Resources */}
        <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recommended Learning Resources</h2>
            <Link to="/learning" className="text-blue-600 hover:underline text-sm">
              View All Resources
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Coursera
                </span>
                <span className="text-xs text-gray-500">Free</span>
              </div>
              <h3 className="font-medium mb-1">Mathematics for Machine Learning</h3>
              <p className="text-sm text-gray-600 mb-3">
                Learn the essential math concepts for advanced studies.
              </p>
              <Link to="/learning/resource/1" className="text-blue-600 hover:underline text-sm">
                Start Learning →
              </Link>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-1 rounded">
                  YouTube
                </span>
                <span className="text-xs text-gray-500">Free</span>
              </div>
              <h3 className="font-medium mb-1">A Level Physics Explained</h3>
              <p className="text-sm text-gray-600 mb-3">
                Comprehensive tutorial series covering all A Level physics topics.
              </p>
              <Link to="/learning/resource/2" className="text-blue-600 hover:underline text-sm">
                Start Learning →
              </Link>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  LinkedIn Learning
                </span>
                <span className="text-xs text-gray-500">Premium</span>
              </div>
              <h3 className="font-medium mb-1">Computer Science Fundamentals</h3>
              <p className="text-sm text-gray-600 mb-3">
                Build the foundation you need for advanced CS studies.
              </p>
              <Link to="/learning/resource/3" className="text-blue-600 hover:underline text-sm">
                Start Learning →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OLevelDashboardPage;