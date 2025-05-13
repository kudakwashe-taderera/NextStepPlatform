import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button.tsx';
import { 
  Home,
  Briefcase, 
  Users, 
  FileText, 
  Bell, 
  Settings, 
  Menu, 
  X, 
  LogOut
} from 'lucide-react';

interface EmployerLayoutProps {
  children: ReactNode;
}

const EmployerLayout: React.FC<EmployerLayoutProps> = ({ children }) => {
  const { user, logoutMutation } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navigation = [
    { name: 'Dashboard', href: '/employer/dashboard', icon: Home },
    { name: 'Job Postings', href: '/job-management', icon: Briefcase },
    { name: 'Applications', href: '/applications', icon: FileText },
    { name: 'Candidates', href: '/employer/candidates', icon: Users },
    { name: 'Messages', href: '/employer/messages', icon: Bell },
    { name: 'Settings', href: '/employer/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-700 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-blue-800 text-white">
          <span className="text-xl font-semibold">NeXTStep</span>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive 
                    ? 'bg-blue-800 text-white' 
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon
                  className={`mr-4 h-6 w-6 ${
                    isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="w-full mt-4 group flex items-center px-2 py-2 text-base font-medium rounded-md text-blue-100 hover:bg-blue-600 hover:text-white"
          >
            <LogOut className="mr-4 h-6 w-6 text-blue-300 group-hover:text-white" />
            Logout
          </button>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-blue-700 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-bold text-white">NeXTStep</span>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-blue-800 text-white' 
                        : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 ${
                        isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full mt-4 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-blue-100 hover:bg-blue-600 hover:text-white"
              >
                <LogOut className="mr-3 h-6 w-6 text-blue-300 group-hover:text-white" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Employer Portal
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center">
                <span className="hidden md:block mr-3 text-sm font-medium text-gray-700">
                  {user?.full_name || user?.username || 'User'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="ml-2"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerLayout;