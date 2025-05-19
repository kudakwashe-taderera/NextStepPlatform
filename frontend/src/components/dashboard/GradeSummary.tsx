import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

interface Grade {
  course: string;
  grade: string;
  percentage: number;
}

interface GradeSummaryProps {
  currentGPA: number;
  totalCredits: number;
  courseGrades: Grade[];
}

const GradeSummary: React.FC<GradeSummaryProps> = ({
  currentGPA,
  totalCredits,
  courseGrades,
}) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <BarChart2 className="h-5 w-5 text-green-500 mr-2" />
          Grade Summary
        </h2>
        <Link to="/grades" className="text-sm font-medium text-blue-600 hover:underline">
          View All Grades
        </Link>
      </div>

      <div className="px-5 py-4">
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500">Current GPA</p>
            <p className="text-2xl font-bold text-blue-600">{currentGPA}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Credits</p>
            <p className="text-2xl font-bold text-green-600">{totalCredits}</p>
          </div>
        </div>

        <div className="space-y-3">
          {courseGrades.map((course, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <p className="text-gray-800 w-1/3 truncate">{course.course}</p>
              <div className="flex items-center w-2/3 justify-end">
                <div className="w-24 h-2 bg-gray-200 rounded-full mr-3">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${course.percentage}%` }}
                  />
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    course.grade.startsWith('A')
                      ? 'bg-green-100 text-green-800'
                      : course.grade.startsWith('B')
                      ? 'bg-blue-100 text-blue-800'
                      : course.grade.startsWith('C')
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {course.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeSummary;
