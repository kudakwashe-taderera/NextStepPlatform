import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import StudentLayout from './StudentLayout';
import LecturerLayout from './LecturerLayout';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            Please log in to access the NeXTStep platform.
          </p>
          <Link to="/auth/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Render based on actual user roles from your Django model
  switch (user.role) {
    case 'O_LEVEL':
    case 'A_LEVEL':
    case 'TERTIARY':
      return <StudentLayout>{children}</StudentLayout>;

    case 'LECTURER':
      return <LecturerLayout>{children}</LecturerLayout>;

    case 'EMPLOYER':
      return <EmployerLayout>{children}</EmployerLayout>;

    case 'MENTOR':
      return <MentorLayout>{children}</MentorLayout>;

    case 'INST_ADMIN':
    case 'MIN_ADMIN':
    case 'SUPERUSER':
      return <AdminLayout>{children}</AdminLayout>;

    default:
      return fallbackLayout(children);
  }
};

// Fallback layout
const fallbackLayout = (children: ReactNode) => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-blue-600 font-bold text-xl">
                NeXTStep
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="outline" onClick={() => useAuth().logoutMutation.mutate()}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
    <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">{children}</main>
  </div>
);

// Placeholder layouts
const EmployerLayout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <SimpleLayout title="Employer">{children}</SimpleLayout>
);

const MentorLayout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <SimpleLayout title="Mentor">{children}</SimpleLayout>
);

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <SimpleLayout title="Admin">{children}</SimpleLayout>
);

const SimpleLayout: React.FC<{ children: ReactNode; title: string }> = ({ children, title }) => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-blue-600 font-bold text-xl">
                NeXTStep ({title})
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="outline" onClick={() => useAuth().logoutMutation.mutate()}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
    <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">{children}</main>
  </div>
);

export default MainLayout;
