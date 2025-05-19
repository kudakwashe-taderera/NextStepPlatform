import React, { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Topbar: React.FC = () => {
  const { user, logoutMutation } = useAuth();
  const [open, setOpen] = useState<'none' | 'profile' | 'notifications'>('none');

  const unreadCount = 3; // Replace with dynamic value

  const handleLogout = () => logoutMutation.mutate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20 px-6 h-16 flex items-center justify-between border-b border-gray-200">
      {/* Search */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#13294B]"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === 'notifications' ? 'none' : 'notifications')}
            className="relative text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full px-1">
                {unreadCount}
              </span>
            )}
          </button>
          {open === 'notifications' && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
              <div className="px-4 py-2 font-semibold border-b">Notifications</div>
              <div className="p-4 text-sm text-gray-500">No new notifications.</div>
              <div className="px-4 py-2 border-t text-center">
                <Link to="/notifications" className="text-blue-600 hover:underline text-sm">
                  View all
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(open === 'profile' ? 'none' : 'profile')}
            className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <div className="h-8 w-8 bg-[#FF552E] text-white font-bold flex items-center justify-center rounded-full">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
            <span className="hidden sm:block font-medium">{user?.full_name || 'User'}</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {open === 'profile' && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
