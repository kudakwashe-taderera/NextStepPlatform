import React from 'react';
import { useAuthStore } from '../store/authStore';

const Dashboard = () => {
  const user = useAuthStore(state => state.user);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Welcome, {user?.full_name}</h2>
        <p className="text-gray-600 mb-4">
          This is your personalized dashboard for the NeXTStep platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium">Your Role</h3>
            <p>{user?.role}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-medium">Your UIN</h3>
            <p>{user?.uin}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="font-medium">Member Since</h3>
            <p>{new Date(user?.date_joined).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold mb-2">LMS</h3>
          <p className="text-sm text-gray-600 mb-3">Access courses and learning materials</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go to LMS
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold mb-2">Career Guidance</h3>
          <p className="text-sm text-gray-600 mb-3">Explore career paths and get recommendations</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Explore Careers
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold mb-2">Job Portal</h3>
          <p className="text-sm text-gray-600 mb-3">Find jobs and internships</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Search Jobs
          </button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold mb-2">Learning Hub</h3>
          <p className="text-sm text-gray-600 mb-3">Access additional learning resources</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Browse Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;