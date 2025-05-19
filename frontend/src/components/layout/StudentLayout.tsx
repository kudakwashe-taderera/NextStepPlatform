import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface StudentLayoutProps {
  children: ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed */}
      <div className="fixed top-0 left-0 h-screen w-64 z-40">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Topbar - Fixed */}
        <div className="fixed top-0 left-64 right-0 z-30">
          <Topbar />
        </div>

        {/* Page content */}
        <main className="pt-16 px-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
