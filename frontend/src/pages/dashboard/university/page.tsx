import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const UniversityDashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Sample data - in a real application this would come from API
  const enrolledCourses = [
    {
      id: 1,
      code: 'CS101',
      title: 'Introduction to Computer Science',
      lecturer: 'Dr. Sarah Johnson',
      progress: 65,
      nextAssignment: 'Project Proposal',
      dueDate: '2025-05-20',
    },
    {
      id: 2,
      code: 'MATH201',
      title: 'Linear Algebra',
      lecturer: 'Prof. Michael Chen',
      progress: 78,
      nextAssignment: 'Problem Set 5',
      dueDate: '2025-05-18',
    },
    {
      id: 3,
      code: 'PHY102',
      title: 'Mechanics and Waves',
      lecturer: 'Dr. Robert Williams',
      progress: 42,
      nextAssignment: 'Lab Report 3',
      dueDate: '2025-05-25',
    },
    {
      id: 4,
      code: 'ENG205',
      title: 'Technical Communication',
      lecturer: 'Prof. Emily Davis',
      progress: 90,
      nextAssignment: 'Final Essay',
      dueDate: '2025-06-01',
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'CS101 Midterm Exam',
      date: 'May 22, 2025',
      time: '14:00 - 16:00',
      location: 'Main Hall',
    },
    {
      id: 2,
      title: 'Programming Contest',
      date: 'May 25, 2025',
      time: '10:00 - 18:00',
      location: 'Computer Science Building',
    },
    {
      id: 3,
      title: 'Physics Lab Session',
      date: 'May 19, 2025',
      time: '15:00 - 17:00',
      location: 'Physics Lab 2',
    },
  ];

  // Career recommendations
  const careerRecommendations = [
    {
      id: 1,
      title: 'Software Engineer',
      match: 96,
    },
    {
      id: 2,
      title: 'Data Scientist',
      match: 92,
    },
    {
      id: 3,
      title: 'Machine Learning Engineer',
      match: 88,
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">University Student Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {user?.full_name || 'Student'}! You're enrolled in {enrolledCourses.length} courses this semester.
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Current GPA</p>
                <p className="text-2xl font-bold text-blue-600">3.7</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Completed Credits</p>
                <p className="text-2xl font-bold text-green-600">48</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrolled Courses */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                <Link to="/courses" className="text-blue-600 hover:underline text-sm">
                  View All Courses
                </Link>
              </div>

              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between">
                      <div>
                        <Link to={`/course/${course.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                          {course.code}: {course.title}
                        </Link>
                        <p className="text-sm text-gray-600">{course.lecturer}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">Next Due:</span>
                        <p className="text-sm font-medium text-gray-900">{course.nextAssignment}</p>
                        <p className="text-xs text-gray-500">{new Date(course.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-medium text-gray-700">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Calendar */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
                <Link to="/calendar" className="text-blue-600 hover:underline text-sm">
                  View Full Calendar
                </Link>
              </div>
              
              <div className="divide-y">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="py-3 flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-lg p-2 mr-4 text-center">
                      <div className="text-xs text-blue-600 font-medium">
                        {event.date.split(',')[0]}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.time} • {event.location}</p>
                    </div>
                    <Button variant="ghost" size="sm">Add to Calendar</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Content - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-center">Course Registration</Button>
                <Button variant="outline" className="justify-center">View Timetable</Button>
                <Button variant="outline" className="justify-center">Check Grades</Button>
                <Button variant="outline" className="justify-center">Contact Lecturer</Button>
                <Button variant="outline" className="justify-center">Library Resources</Button>
                <Button variant="outline" className="justify-center">Tuition Fees</Button>
              </div>
            </div>

            {/* Career Recommendations */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Career Matches</h2>
                <Link to="/careers/recommendations" className="text-blue-600 hover:underline text-sm">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {careerRecommendations.map((career) => (
                  <div key={career.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{career.title}</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {career.match}% Match
                    </span>
                  </div>
                ))}
                <Link to="/careers/quiz">
                  <Button variant="default" className="w-full mt-3">Take Career Quiz</Button>
                </Link>
              </div>
            </div>

            {/* Job Listings */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Internship Opportunities</h2>
                <Link to="/jobs" className="text-blue-600 hover:underline text-sm">
                  View All Jobs
                </Link>
              </div>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Software Development Intern</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      89% Match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">TechCorp • Harare</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Data Analytics Intern</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      85% Match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">DataGrowth • Remote</p>
                </div>
                <Link to="/jobs">
                  <Button variant="outline" className="w-full mt-2">Browse More Jobs</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UniversityDashboardPage;