import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">NeXTStep</span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Dashboard
                </Link>
                {/* Add more navigation links based on user role */}
              </div>
            </div>

            <div className="ml-4 flex items-center">
              <div className="relative">
                <div className="flex items-center">
                  <span className="mr-2">{user?.full_name}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-blue-900 p-2 rounded-md hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;