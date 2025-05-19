import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AcademicCalendar: React.FC = () => {
  return (
    <div className="bg-white border rounded-xl shadow-sm flex flex-col justify-between h-full">
      <div className="px-5 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Calendar className="h-5 w-5 text-purple-500 mr-2" />
          Academic Calendar
        </h2>
      </div>
      <div className="flex-1 px-5 py-6 text-center text-sm text-gray-500">
        Calendar integration coming soon. Stay tuned for term dates and key deadlines.
      </div>
      <div className="px-5 py-4 border-t bg-gray-50 text-center">
        <Link to="/calendar" className="text-sm font-medium text-blue-600 hover:underline">
          View Full Calendar
        </Link>
      </div>
    </div>
  );
};

export default AcademicCalendar;
