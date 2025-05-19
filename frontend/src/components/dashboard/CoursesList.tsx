import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CourseListItemProps {
  course: {
    id: number;
    code: string;
    title: string;
    lecturer: string;
    progress: number;
    color: string;
    nextAssignment?: string;
    dueDate?: string;
    announcements: number;
    newGrades: number;
    unreadMessages: number;
  };
}

const CourseListItem: React.FC<CourseListItemProps> = ({ course }) => {
  return (
    <div className="bg-white border rounded-xl p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        {/* Color strip */}
        <div
          className="w-2 min-h-[60px] rounded-md"
          style={{ backgroundColor: course.color }}
        ></div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded">
                  {course.code}
                </span>
                {course.announcements > 0 && (
                  <span className="flex items-center text-xs text-gray-600">
                    <Bell className="h-3 w-3 text-amber-500 mr-1" />
                    {course.announcements}
                  </span>
                )}
                {course.newGrades > 0 && (
                  <span className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    {course.newGrades}
                  </span>
                )}
                {course.unreadMessages > 0 && (
                  <span className="flex items-center text-xs text-gray-600">
                    <MessageSquare className="h-3 w-3 text-blue-500 mr-1" />
                    {course.unreadMessages}
                  </span>
                )}
              </div>

              <h3 className="text-base font-semibold text-gray-900 mt-1">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.lecturer}</p>
            </div>

            <div className="text-right space-y-1">
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-2">Progress: {course.progress}%</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: course.color,
                    }}
                  ></div>
                </div>
              </div>

              {course.nextAssignment && (
                <div className="text-xs text-gray-500">
                  <span>Next: {course.nextAssignment}</span>
                  <span className="ml-1 text-gray-400">
                    ({new Date(course.dueDate || '').toLocaleDateString()})
                  </span>
                </div>
              )}

              <Button variant="ghost" size="sm" className="text-xs mt-2" asChild>
                <Link to={`/course/${course.id}`}>
                  Go to Course <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListItem;
