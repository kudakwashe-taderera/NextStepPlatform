import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { UserRole } from '@/types';

// Icons can be imported from a package like 'lucide-react'
// For now, we'll use simple SVG elements

interface StudentLayoutProps {
  children: ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const { user, logoutMutation } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Menu items based on student level
  const getMenuItems = () => {
    // Common items for all student types
    const commonItems = [
      { name: 'Dashboard', path: '/', icon: HomeIcon },
      { name: 'Career Guidance', path: '/careers', icon: CompassIcon },
      { name: 'Job Portal', path: '/jobs', icon: BriefcaseIcon },
      { name: 'Learning Hub', path: '/learning', icon: BookOpenIcon },
    ];

    // Add specific items based on user role/level
    if (user) {
      if (user.studentLevel === 'O_LEVEL') {
        return commonItems;
      } else if (user.studentLevel === 'A_LEVEL') {
        return [
          ...commonItems,
          { name: 'University Applications', path: '/applications', icon: GraduationCapIcon },
        ];
      } else {
        // University student
        return [
          ...commonItems,
          { name: 'My Courses', path: '/courses', icon: BooksIcon },
          { name: 'Grades', path: '/grades', icon: StarIcon },
          { name: 'Certificates', path: '/certificates', icon: AwardIcon },
        ];
      }
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  // Helper to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Mock notifications
  const notifications = [
    { id: 1, text: 'New assignment posted in CS101', time: '2 hours ago', read: false },
    { id: 2, text: 'Your career quiz results are ready', time: '1 day ago', read: false },
    { id: 3, text: 'New job posting matches your profile', time: '2 days ago', read: true },
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
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                    {user?.full_name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium">{user?.full_name || 'User'}</span>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                  {user?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.full_name || 'User'}</p>
                  <p className="text-xs text-gray-500">
                    {user?.studentLevel === 'O_LEVEL'
                      ? 'O Level Student'
                      : user?.studentLevel === 'A_LEVEL'
                      ? 'A Level Student'
                      : 'University Student'}
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

const CompassIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const BookOpenIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const GraduationCapIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const BooksIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
  </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const AwardIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default StudentLayout;