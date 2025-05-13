import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layout/MainLayout';
import { UserRole } from '@/types';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  // Generate dashboard content based on user role
  const renderDashboardContent = () => {
    if (!user) {
      // Public dashboard
      return (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to NeXTStep
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            The comprehensive platform for education, career guidance, and professional development.
            Sign in to start your journey.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/auth"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      );
    }

    // User-specific dashboard
    switch (user.role) {
      case UserRole.STUDENT:
        return <StudentDashboard />;
      case UserRole.LECTURER:
        return <LecturerDashboard />;
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.EMPLOYER:
        return <EmployerDashboard />;
      case UserRole.MENTOR:
        return <MentorDashboard />;
      default:
        return <DefaultDashboard />;
    }
  };

  return (
    <MainLayout>
      <div className="bg-white shadow rounded-lg p-6">
        {renderDashboardContent()}
      </div>
    </MainLayout>
  );
};

// Role-specific dashboard components
const StudentDashboard: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="My Courses"
        description="View your enrolled courses and track your progress."
        linkUrl="/courses"
        linkText="View Courses"
      />
      <DashboardCard
        title="Career Recommendations"
        description="Discover career paths matched to your skills and interests."
        linkUrl="/careers/recommendations"
        linkText="View Recommendations"
      />
      <DashboardCard
        title="Job Opportunities"
        description="Browse available job listings that match your career interests."
        linkUrl="/jobs"
        linkText="Browse Jobs"
      />
    </div>
  </div>
);

const LecturerDashboard: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Lecturer Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="My Courses"
        description="Manage your courses, materials, and student progress."
        linkUrl="/course-management"
        linkText="Manage Courses"
      />
      <DashboardCard
        title="Assignments"
        description="Create and grade assignments for your courses."
        linkUrl="/assignments"
        linkText="View Assignments"
      />
      <DashboardCard
        title="Student Performance"
        description="Track student performance and engagement in your courses."
        linkUrl="/student-performance"
        linkText="View Analytics"
      />
    </div>
  </div>
);

const AdminDashboard: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="User Management"
        description="Manage users, roles, and permissions."
        linkUrl="/users"
        linkText="Manage Users"
      />
      <DashboardCard
        title="System Settings"
        description="Configure system settings and preferences."
        linkUrl="/settings"
        linkText="View Settings"
      />
      <DashboardCard
        title="Content Management"
        description="Manage platform content and resources."
        linkUrl="/content"
        linkText="Manage Content"
      />
    </div>
  </div>
);

const EmployerDashboard: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Employer Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="Job Listings"
        description="Manage your job listings and position openings."
        linkUrl="/job-management"
        linkText="Manage Jobs"
      />
      <DashboardCard
        title="Applications"
        description="Review applications for your job listings."
        linkUrl="/applications"
        linkText="View Applications"
      />
      <DashboardCard
        title="Talent Search"
        description="Search for potential candidates based on skills and education."
        linkUrl="/talent-search"
        linkText="Search Talent"
      />
    </div>
  </div>
);

const MentorDashboard: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Mentor Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="My Mentees"
        description="View and manage your mentee relationships."
        linkUrl="/mentees"
        linkText="View Mentees"
      />
      <DashboardCard
        title="Learning Resources"
        description="Browse and share learning resources with your mentees."
        linkUrl="/resources"
        linkText="View Resources"
      />
      <DashboardCard
        title="Session Planning"
        description="Plan and schedule mentoring sessions."
        linkUrl="/sessions"
        linkText="Plan Sessions"
      />
    </div>
  </div>
);

const DefaultDashboard: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        title="Learning Hub"
        description="Access educational resources and materials."
        linkUrl="/learning"
        linkText="Browse Resources"
      />
      <DashboardCard
        title="Career Paths"
        description="Explore potential career paths and opportunities."
        linkUrl="/careers"
        linkText="Explore Careers"
      />
      <DashboardCard
        title="Profile"
        description="Update your profile and preferences."
        linkUrl="/profile"
        linkText="Edit Profile"
      />
    </div>
  </div>
);

// Helper component for dashboard cards
interface DashboardCardProps {
  title: string;
  description: string;
  linkUrl: string;
  linkText: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  linkUrl,
  linkText,
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow transition-shadow">
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link
      to={linkUrl}
      className="text-blue-600 hover:text-blue-800 font-medium"
    >
      {linkText} →
    </Link>
  </div>
);

export default HomePage;