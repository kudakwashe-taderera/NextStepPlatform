import React from 'react';
import { Book, FileText, Bell, Calendar } from 'lucide-react';

interface StatCardProps {
  courses: number;
  assignments: number;
  unread: number;
  events: number;
}

const StatCard: React.FC<StatCardProps> = ({ courses, assignments, unread, events }) => {
  const stats = [
    {
      icon: <Book className="h-5 w-5 text-blue-600" />,
      label: 'Courses',
      value: courses,
      bg: 'bg-blue-100',
    },
    {
      icon: <FileText className="h-5 w-5 text-amber-600" />,
      label: 'Assignments Due',
      value: assignments,
      bg: 'bg-amber-100',
    },
    {
      icon: <Bell className="h-5 w-5 text-red-600" />,
      label: 'Unread',
      value: unread,
      bg: 'bg-red-100',
    },
    {
      icon: <Calendar className="h-5 w-5 text-indigo-600" />,
      label: 'Events',
      value: events,
      bg: 'bg-indigo-100',
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center min-w-[130px]">
          <div className={`p-2 rounded-full ${stat.bg}`}>{stat.icon}</div>
          <div className="ml-3">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-base font-semibold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCard;
