import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CareerRecommendations from '@/components/dashboard/CareerRecommendations';
import AcademicCalendar from '@/components/dashboard/AcademicCalendar';
import SummaryCards from '@/components/dashboard/SummaryCards';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentAnnouncements from '@/components/dashboard/RecentAnnouncements';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingAssignments from '@/components/dashboard/UpcomingAssignments';
import CareerServices from '@/components/dashboard/CareerServices';

const OLevelDashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <DashboardHeader
          title="O Level Student Dashboard"
          subtitle="Based on your selected O Level subjects, here are your recommended next steps and opportunities."
        />

        {/* Top actions */}
        <div className="mb-8 bg-white border rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-gray-600 mb-2 text-sm">Update your subjects or take the quiz to improve recommendations.</p>
            <div className="flex gap-3">
              <Button className="bg-[#13294B] hover:bg-[#0f213d] text-white">Update My Subjects</Button>
              <Button variant="outline" className="border-[#FF552E] text-[#FF552E] hover:bg-[#FFF4F1]">Take Career Quiz</Button>
            </div>
          </div>
          <SummaryCards gpa={0} credits={0} degreeProgress={0} />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* 3-column Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <CareerRecommendations
            careers={[
              { id: 1, title: 'Software Engineer', company: 'Tech Sector', description: 'Design and develop applications.', match: 95 },
              { id: 2, title: 'Data Scientist', company: 'AI & Analytics', description: 'Analyze and model data insights.', match: 92 },
              { id: 3, title: 'AI/ML Engineer', company: 'Emerging Tech', description: 'Build intelligent algorithms.', match: 89 },
            ]}
          />
          <AcademicCalendar />
          <CareerServices />
        </div>

        {/* Additional Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <UpcomingAssignments
            assignments={[
              { id: 1, title: 'Algebra Test', courseCode: 'MAT101', courseTitle: 'Mathematics', dueDate: '2025-05-17', status: 'not-started' },
              { id: 2, title: 'Physics Lab Report', courseCode: 'PHY102', courseTitle: 'Physics', dueDate: '2025-05-19', status: 'in-progress' },
            ]}
          />
          <RecentAnnouncements
            announcements={[
              { id: 1, title: 'Exam Dates Released', course: 'All Courses', author: 'Admin', date: 'May 10, 2025', content: 'Check your exam timetable.', unread: true },
              { id: 2, title: 'New Learning Portal', course: 'ICT', author: 'Mr. Dube', date: 'May 8, 2025', content: 'Try out the new video library.', unread: false },
            ]}
          />
          <RecentActivity
            activity={[
              { id: 1, type: 'submission', course: 'Biology', detail: 'Submitted Genetics Assignment', date: 'May 12, 2025' },
              { id: 2, type: 'grade', course: 'English', detail: 'Received grade for Essay', date: 'May 11, 2025' },
            ]}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default OLevelDashboardPage;
