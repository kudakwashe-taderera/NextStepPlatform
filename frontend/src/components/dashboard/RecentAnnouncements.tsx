import React from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

interface Announcement {
  id: number;
  title: string;
  course: string;
  author: string;
  date: string;
  content: string;
  unread: boolean;
}

interface RecentAnnouncementsProps {
  announcements: Announcement[];
}

const RecentAnnouncements: React.FC<RecentAnnouncementsProps> = ({ announcements }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Bell className="h-5 w-5 text-amber-500 mr-2" />
          Recent Announcements
        </h2>
        <Button variant="ghost" size="sm" className="text-sm">
          Mark All as Read
        </Button>
      </div>

      <ul className="divide-y">
        {announcements.slice(0, 3).map((a) => (
          <li key={a.id} className={`px-5 py-4 ${a.unread ? 'bg-blue-50' : ''}`}>
            <div className="flex items-start gap-3">
              {a.unread && (
                <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900">{a.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{a.date}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{a.course}</p>
                <p className="text-sm text-gray-700 mt-2">{a.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-5 py-4 border-t bg-gray-50 text-center">
        <Link to="/announcements" className="text-sm font-medium text-blue-600 hover:underline">
          View All Announcements
        </Link>
      </div>
    </div>
  );
};

export default RecentAnnouncements;
