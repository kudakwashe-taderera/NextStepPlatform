import React from 'react';
import { BarChart2, CheckCircle, FileText, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivityItem {
  id: number;
  type: 'grade' | 'submission' | 'comment';
  course: string;
  detail: string;
  date: string;
}

interface RecentActivityProps {
  activity: ActivityItem[];
}

const getIcon = (type: string) => {
  switch (type) {
    case 'grade':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'submission':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'comment':
      return <MessageSquare className="h-5 w-5 text-indigo-500" />;
    default:
      return null;
  }
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activity }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <BarChart2 className="h-5 w-5 text-indigo-500 mr-2" />
          Recent Activity
        </h2>
      </div>

      <ul className="divide-y">
        {activity.map((item) => (
          <li key={item.id} className="flex items-start gap-4 px-5 py-4">
            <div>{getIcon(item.type)}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.detail}</p>
              <p className="text-xs text-gray-600">{item.course}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">{item.date}</span>
          </li>
        ))}
      </ul>

      <div className="px-5 py-4 border-t bg-gray-50 text-center">
        <Link to="/activity" className="text-sm font-medium text-blue-600 hover:underline">
          View All Activity
        </Link>
      </div>
    </div>
  );
};

export default RecentActivity;
