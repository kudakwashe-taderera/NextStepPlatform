import React from 'react';
import {
  Calendar,
  BookOpen,
  GraduationCap,
  MessageSquare,
  FileText,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  { icon: Calendar, label: 'Timetable', link: '/calendar' },
  { icon: BookOpen, label: 'Course Catalog', link: '/courses' },
  { icon: GraduationCap, label: 'Degree Plan', link: '/degrees' },
  { icon: MessageSquare, label: 'Inbox', link: '/inbox' },
  { icon: FileText, label: 'Transcripts', link: '/transcripts' },
  { icon: User, label: 'Profile', link: '/profile' },
];

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
      </div>
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map(({ icon: Icon, label, link }) => (
          <Link
            to={link}
            key={label}
            className="flex items-center justify-center px-4 py-3 border rounded-xl shadow-sm bg-gray-50 hover:bg-[#F0F4F8] hover:shadow-md transition-all duration-200 group"
          >
            <Icon className="h-5 w-5 mr-2 text-[#13294B] group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium text-[#13294B]">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
