import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Assignment {
  id: number;
  title: string;
  courseCode: string;
  courseTitle: string;
  dueDate: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface UpcomingAssignmentsProps {
  assignments: Assignment[];
}

const UpcomingAssignments: React.FC<UpcomingAssignmentsProps> = ({ assignments }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <FileText className="h-5 w-5 text-blue-500 mr-2" />
          Upcoming Assignments
        </h2>
        <Link to="/assignments" className="text-sm font-medium text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      <ul className="divide-y">
        {assignments.map((a) => {
          const due = new Date(a.dueDate);
          const now = new Date();
          const soon = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

          const dueColor =
            due < now
              ? 'bg-red-100 text-red-800'
              : due < soon
              ? 'bg-amber-100 text-amber-800'
              : 'bg-blue-100 text-blue-800';

          return (
            <li key={a.id} className="px-5 py-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <Link
                  to={`/assignment/${a.id}`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {a.title}
                </Link>
                <p className="text-xs text-gray-600 mt-0.5">
                  {a.courseCode}: {a.courseTitle}
                </p>
              </div>
              <div className="text-right space-y-2">
                <div
                  className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block ${dueColor}`}
                >
                  Due {due.toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm" className="text-xs" asChild>
                  <Link to={`/assignment/${a.id}`}>
                    {a.status === 'in-progress' ? 'Continue' : 'Start'}
                  </Link>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UpcomingAssignments;
