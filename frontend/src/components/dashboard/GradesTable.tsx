import React from 'react';

interface CourseGrade {
  id: number;
  code: string;
  title: string;
  lecturer: string;
  progress: number;
  color: string;
}

interface GradesTableProps {
  courses: CourseGrade[];
}

const GradesTable: React.FC<GradesTableProps> = ({ courses }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-bold text-gray-900">Course Grades</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Course', 'Instructor', 'Credits', 'Grade', 'Score', 'Status'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className="h-10 w-10 rounded-md"
                      style={{ backgroundColor: course.color }}
                    ></div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{course.code}</div>
                      <div className="text-gray-500">{course.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {course.lecturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">3</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex rounded-full text-xs font-medium ${
                      course.progress > 90
                        ? 'bg-green-100 text-green-800'
                        : course.progress > 80
                        ? 'bg-blue-100 text-blue-800'
                        : course.progress > 70
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {course.progress > 90
                      ? 'A'
                      : course.progress > 80
                      ? 'B'
                      : course.progress > 70
                      ? 'C'
                      : 'D'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {course.progress}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  In Progress
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradesTable;
