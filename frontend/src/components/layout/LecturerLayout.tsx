import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

interface LecturerLayoutProps {
  children: ReactNode;
}

const LecturerLayout: React.FC<LecturerLayoutProps> = ({ children }) => {
  const { user, logoutMutation } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Navigation menu items for lecturers
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'My Courses', path: '/course-management', icon: BookIcon },
    { name: 'Assignments', path: '/assignments', icon: ClipboardIcon },
    { name: 'Student Performance', path: '/performance', icon: ChartIcon },
    { name: 'Group Projects', path: '/groups', icon: UsersIcon },
    { name: 'Certificate Center', path: '/certificates', icon: AwardIcon },
    { name: 'Announcements', path: '/announcements', icon: MegaphoneIcon },
  ];

  // Helper to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Mock notifications
  const notifications = [
    { id: 1, text: 'Assignment submitted by John Doe', time: '2 hours ago', read: false },
    { id: 2, text: 'New discussion post in CS101', time: '1 day ago', read: false },
    { id: 3, text: 'Course approval request', time: '2 days ago', read: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-blue-600 font-bold text-xl">
                  NeXTStep
                </Link>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden inline-flex items-center justify-center p-2 ml-3 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {/* Menu Icon */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsProfileOpen(false);
                  }}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <div className="relative">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    {notifications.some(n => !n.read) && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                  </div>
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                    <div className="py-2 px-4 border-b border-gray-100">
                      <h2 className="text-sm font-bold text-gray-800">Notifications</h2>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="py-2">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-4 py-2 hover:bg-gray-50 ${
                                !notification.read ? 'bg-blue-50' : ''
                              }`}
                            >
                              <p className="text-sm text-gray-700">{notification.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <p className="text-sm text-gray-500">No notifications yet</p>
                        </div>
                      )}
                    </div>
                    <div className="py-2 px-4 border-t border-gray-100 text-center">
                      <Link to="/notifications" className="text-sm text-blue-600 hover:underline">
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    {user?.full_name?.charAt(0) || 'L'}
                  </div>
                  <span className="text-sm font-medium">{user?.full_name || 'Lecturer'}</span>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                    <div className="py-1">
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
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-b">
          <div className="pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content with Sidebar */}
      <div className="flex-grow flex">
        {/* Sidebar - Desktop only */}
        <aside className="hidden sm:block w-64 bg-white border-r border-gray-200">
          <div className="h-full flex flex-col">
            <div className="flex-grow py-4 px-4">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive(item.path) ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* User Info - Bottom of Sidebar */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  {user?.full_name?.charAt(0) || 'L'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.full_name || 'Lecturer'}</p>
                  <p className="text-xs text-gray-500">
                    {user?.institution || 'University'} - Lecturer
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={handleLogout}
                  isLoading={logoutMutation.isPending}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Icon Components (simplified for demo)
const HomeIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BookIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ClipboardIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const ChartIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const AwardIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const MegaphoneIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
  </svg>
);

export default LecturerLayout;