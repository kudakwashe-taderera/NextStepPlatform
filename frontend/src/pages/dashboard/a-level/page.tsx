import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button.tsx';

const ALevelDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'programs' | 'careers'>('programs');

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">A Level Student Dashboard</h1>
          <p className="text-gray-600 mb-4">
            Welcome to your personalized dashboard. Based on your A Level subjects, we've prepared
            recommendations to help guide your university and career choices.
          </p>
          <div className="flex space-x-2">
            <Button>Update My Subjects</Button>
            <Button variant="outline">University Applications</Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-sm rounded-lg mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'programs'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('programs')}
            >
              University Programs
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'careers'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('careers')}
            >
              Career Paths
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'programs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* University Programs */}
            {[1, 2, 3, 4, 5, 6].map((program) => (
              <div key={program} className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {['Computer Science', 'Electrical Engineering', 'Software Engineering', 'Data Science', 'Mechanical Engineering', 'Civil Engineering'][program - 1]}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {['University of Zimbabwe', 'University of Cape Town', 'NUST', 'University of Pretoria', 'University of Johannesburg', 'Stellenbosch University'][program - 1]}
                    </p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {[96, 94, 93, 91, 87, 85][program - 1]}% Match
                  </span>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Entry Requirements:</h3>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                    <li>Mathematics: A</li>
                    <li>Computer Science/Physics: B or above</li>
                    <li>English Language: C or above</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Duration:</h3>
                  <p className="text-sm text-gray-600">4 years</p>
                </div>
                <div className="flex space-x-2">
                  <Link to={`/programs/${program}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                  <Button size="sm" variant="outline">Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Career Paths */}
            {[1, 2, 3, 4, 5, 6].map((career) => (
              <div key={career} className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {['Software Engineer', 'Data Scientist', 'Machine Learning Engineer', 'Systems Architect', 'Network Engineer', 'DevOps Engineer'][career - 1]}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {['Tech Industry', 'Data Analytics', 'Artificial Intelligence', 'IT Infrastructure', 'Telecommunications', 'Cloud Computing'][career - 1]}
                    </p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {[95, 92, 90, 88, 85, 82][career - 1]}% Match
                  </span>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h3>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                    <li>{['Programming', 'Statistical Analysis', 'Algorithm Design', 'System Design', 'Network Configuration', 'CI/CD Pipeline Management'][career - 1]}</li>
                    <li>{['Problem Solving', 'Data Visualization', 'Math and Statistics', 'Architecture Planning', 'Security Protocols', 'Infrastructure as Code'][career - 1]}</li>
                    <li>{['Database Management', 'Machine Learning', 'Neural Networks', 'Cloud Solutions', 'Routing Protocols', 'Containerization'][career - 1]}</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Avg. Salary Range:</h3>
                  <p className="text-sm text-gray-600">{['$60,000 - $120,000', '$70,000 - $130,000', '$80,000 - $140,000', '$90,000 - $150,000', '$65,000 - $110,000', '$75,000 - $125,000'][career - 1]}</p>
                </div>
                <div className="flex space-x-2">
                  <Link to={`/careers/${career}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Educational Journey Map */}
        <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Educational Journey</h2>
          <div className="flex justify-between items-center relative py-6">
            {/* Progress line */}
            <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2 z-0"></div>
            <div className="absolute left-0 right-0 h-1 bg-blue-600 top-1/2 transform -translate-y-1/2 z-0" style={{ width: '37.5%' }}></div>
            
            {/* Steps */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                1
              </div>
              <span className="text-sm font-medium mt-2">O Level</span>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                2
              </div>
              <span className="text-sm font-medium mt-2">A Level</span>
              <span className="text-xs text-gray-500">Current</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                3
              </div>
              <span className="text-sm font-medium mt-2">University</span>
              <span className="text-xs text-gray-500">Next Step</span>
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

        {/* University Applications */}
        <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">My University Applications</h2>
            <Button size="sm">New Application</Button>
          </div>
          
          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-gray-700 font-medium">University</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-medium">Program</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-medium">Submitted On</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 text-gray-800">University of Zimbabwe</td>
                  <td className="px-4 py-3 text-gray-800">Computer Science</td>
                  <td className="px-4 py-3 text-gray-600">May 10, 2025</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">In Review</span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 text-gray-800">University of Cape Town</td>
                  <td className="px-4 py-3 text-gray-800">Data Science</td>
                  <td className="px-4 py-3 text-gray-600">April 28, 2025</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Submitted</span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">You can apply to up to 3 universities in total.</p>
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
              <h3 className="font-medium mb-1">Introduction to University Mathematics</h3>
              <p className="text-sm text-gray-600 mb-3">
                Prepare for university-level mathematics coursework.
              </p>
              <Link to="/learning/resource/4" className="text-blue-600 hover:underline text-sm">
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
              <h3 className="font-medium mb-1">University Application Tips</h3>
              <p className="text-sm text-gray-600 mb-3">
                Learn how to create a standout university application.
              </p>
              <Link to="/learning/resource/5" className="text-blue-600 hover:underline text-sm">
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
              <h3 className="font-medium mb-1">Programming Fundamentals</h3>
              <p className="text-sm text-gray-600 mb-3">
                Get a head start on programming skills before university.
              </p>
              <Link to="/learning/resource/6" className="text-blue-600 hover:underline text-sm">
                Start Learning →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ALevelDashboardPage;