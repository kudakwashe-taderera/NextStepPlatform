import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle, ChevronRight, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Course {
  id: number;
  code: string;
  title: string;
  lecturer: string;
  progress: number;
  color: string;
  image?: string;
  nextAssignment?: string;
  dueDate?: string;
  announcements: number;
  newGrades: number;
  unreadMessages: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      {/* Header with color/image */}
      <div
        className="h-24 relative"
        style={{
          backgroundColor: course.color,
          backgroundImage: course.image ? `url(${course.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30 flex items-end p-3">
          <div>
            <span className="inline-block bg-white/90 text-xs font-medium px-2 py-0.5 rounded">
              {course.code}
            </span>
            <h3 className="text-white text-lg font-semibold mt-1 truncate max-w-[200px]">
              {course.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">{course.lecturer}</p>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span className="font-medium text-gray-700">{course.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full w-full">
            <div
              className="h-2 rounded-full"
              style={{ width: `${course.progress}%`, backgroundColor: course.color }}
            ></div>
          </div>
        </div>

        {/* Upcoming Assignment */}
        {course.nextAssignment && (
          <div className="flex items-center gap-2 text-sm mt-3">
            <Clock className="h-4 w-4 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{course.nextAssignment}</p>
              <p className="text-xs text-gray-500">
                Due {new Date(course.dueDate || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Notifications & CTA */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t text-xs">
          <div className="flex gap-3">
            {course.announcements > 0 && (
              <div className="flex items-center">
                <Bell className="h-3 w-3 text-amber-500 mr-1" />
                <span className="text-gray-600">{course.announcements}</span>
              </div>
            )}
            {course.newGrades > 0 && (
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-gray-600">{course.newGrades}</span>
              </div>
            )}
            {course.unreadMessages > 0 && (
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 text-blue-500 mr-1" />
                <span className="text-gray-600">{course.unreadMessages}</span>
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" className="text-xs ml-auto" asChild>
            <Link to={`/course/${course.id}`}>
              Go to Course <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
