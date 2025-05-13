import React, { useState } from 'react';
import { useParams, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { TopNav } from '../components/ui/TopNav';

// Import course pages
import CourseHome from './course/CourseHome';
import CourseModules from './course/CourseModules';
import CourseFiles from './course/CourseFiles';
import CourseAssignments from './course/CourseAssignments';
import CourseDiscussions from './course/CourseDiscussions';
import CourseZoom from './course/CourseZoom';
import CourseGrades from './course/CourseGrades';
import CourseCertificates from './course/CourseCertificates';

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Fetch course details
  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data } = await api.get(`/api/lms/courses/${id}/`);
      return data;
    },
    enabled: !!id,
  });
  
  // Get current tab from URL
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.endsWith('/modules')) return 'modules';
    if (path.endsWith('/files')) return 'files';
    if (path.endsWith('/assignments')) return 'assignments';
    if (path.endsWith('/discussions')) return 'discussions';
    if (path.endsWith('/zoom')) return 'zoom';
    if (path.endsWith('/grades')) return 'grades';
    if (path.endsWith('/certificates')) return 'certificates';
    return 'home';
  };
  
  const currentTab = getCurrentTab();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
        <p className="text-gray-600">Failed to load course. Please try again later.</p>
        <Link to="/" className="mt-4 text-indigo-600 hover:text-indigo-800">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Course Sidebar */}
      <aside 
        className={`bg-white shadow w-64 fixed inset-y-0 left-0 z-20 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Course title */}
          <div className="px-4 py-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {course?.title || 'Course'}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {course?.code} • {course?.institution}
            </p>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to={`/course/${id}`}
                  className={`block px-4 py-2 rounded-md ${
                    currentTab === 'home'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/course/${id}/modules`}
                  className={`block px-4 py-2 rounded-md ${
                    currentTab === 'modules'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Modules
                </Link>
              </li>
              <li>
                <Link
                  to={`/course/${id}/files`}
                  className={`block px-4 py-2 rounded-md ${
                    currentTab === 'files'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Files
                </Link>
              </li>
              <li>
                <Link
                  to={`/course/${id}/assignments`}
                  className={`block px-4 py-2 rounded-md ${
                    currentTab === 'assignments'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Assignments
                </Link>
              </li>
              <li>
                <Link
                  to={`/course/${id}/discussions`}
                  className={`block px-4 py-2 rounded-md ${
                    currentTab === 'discussions'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Discussions
                </Link>
              </li>
              <li>
                <Link
                  to={`/course/${id}/zoom`}
                  className={`block px-4 py-2 rounded-md ${
                    currentTab === 'zoom'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Zoom
                </Link>
              </li>
              <li>
                <Link
                  to={`/course/${id}/grades`}
                  className={`block px-4 py-2 rounded-md ${
                    currentTab === 'grades'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Grades
                </Link>
              </li>
              <li>
                <Link
                  to={`/course/${id}/certificates`}
                  className={`block px-4 py-2 rounded-md ${
                    currentTab === 'certificates'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Certificates
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Course info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Instructor</p>
                <p className="text-xs text-gray-500">{course?.instructor?.full_name || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <TopNav title="NeXTStep" />
        
        {/* Mobile sidebar toggle */}
        <div className="md:hidden p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Course content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Routes>
            <Route path="/" element={<CourseHome course={course} />} />
            <Route path="/modules" element={<CourseModules courseId={id} />} />
            <Route path="/files" element={<CourseFiles courseId={id} />} />
            <Route path="/assignments" element={<CourseAssignments courseId={id} />} />
            <Route path="/discussions" element={<CourseDiscussions courseId={id} />} />
            <Route path="/zoom" element={<CourseZoom courseId={id} />} />
            <Route path="/grades" element={<CourseGrades courseId={id} />} />
            <Route path="/certificates" element={<CourseCertificates courseId={id} />} />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to={`/course/${id}`} replace />} />
          </Routes>
        </main>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
