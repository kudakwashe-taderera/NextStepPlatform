import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logoutMutation } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Get current path for active link highlighting
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Set navigation links based on user role
  const navLinks = () => {
    const commonLinks = [
      { name: 'Dashboard', path: '/' },
      { name: 'Learning Hub', path: '/learning' },
      { name: 'Career Paths', path: '/careers' },
    ];

    if (!user) return commonLinks;

    switch (user.role) {
      case UserRole.STUDENT:
        return [
          ...commonLinks,
          { name: 'My Courses', path: '/courses' },
          { name: 'Job Listings', path: '/jobs' },
        ];
      case UserRole.LECTURER:
        return [
          ...commonLinks,
          { name: 'My Courses', path: '/courses' },
          { name: 'Course Management', path: '/course-management' },
        ];
      case UserRole.ADMIN:
        return [
          ...commonLinks,
          { name: 'User Management', path: '/users' },
          { name: 'System Settings', path: '/settings' },
        ];
      case UserRole.EMPLOYER:
        return [
          ...commonLinks,
          { name: 'Job Management', path: '/job-management' },
          { name: 'Applications', path: '/applications' },
        ];
      case UserRole.MENTOR:
        return [
          ...commonLinks,
          { name: 'Mentees', path: '/mentees' },
          { name: 'Resources', path: '/resources' },
        ];
      default:
        return commonLinks;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-blue-600 font-bold text-xl">
                  NeXTStep
                </Link>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks().map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive(link.path)
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    {user.full_name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    isLoading={logoutMutation.isPending}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className="sm:hidden bg-white border-b">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks().map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-base text-gray-500">
                &copy; {new Date().getFullYear()} NeXTStep. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex justify-center md:justify-end space-x-6">
                <Link to="/about" className="text-gray-500 hover:text-gray-700">
                  About
                </Link>
                <Link to="/privacy" className="text-gray-500 hover:text-gray-700">
                  Privacy
                </Link>
                <Link to="/terms" className="text-gray-500 hover:text-gray-700">
                  Terms
                </Link>
                <Link to="/contact" className="text-gray-500 hover:text-gray-700">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;