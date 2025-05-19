import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import StudentLayout from '@/components/layout/StudentLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button.tsx';
import {
  Calendar,
  Clock,
  FileText,
  Bell,
  Book,
  CheckCircle,
  MessageSquare,
  User,
  ChevronDown,
  ChevronRight,
  BarChart2,
  BookOpen,
  GraduationCap,
  Briefcase,
  Star,
  Flag,
  Settings,
  Grid,
  List,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';

const UniversityDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [courseView, setCourseView] = useState<'grid' | 'list'>('grid');
  const [displayMode, setDisplayMode] = useState<'cards' | 'dashboard'>('dashboard');
  const [selectedTab, setSelectedTab] = useState<'all' | 'upcoming' | 'past' | 'favorites'>('all');
  const [selectedMenu, setSelectedMenu] = useState<string>('dashboard');

  // Sample data - in a real application this would come from API
  const enrolledCourses = [
    {
      id: 1,
      code: 'CS101',
      title: 'Introduction to Computer Science',
      lecturer: 'Dr. Sarah Johnson',
      progress: 65,
      color: '#3b82f6', // blue-500
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      nextAssignment: 'Project Proposal',
      dueDate: '2025-05-20',
      announcements: 2,
      newGrades: 1,
      unreadMessages: 3,
    },
    {
      id: 2,
      code: 'MATH201',
      title: 'Linear Algebra',
      lecturer: 'Prof. Michael Chen',
      progress: 78,
      color: '#65a30d', // lime-600
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
      nextAssignment: 'Problem Set 5',
      dueDate: '2025-05-18',
      announcements: 0,
      newGrades: 0,
      unreadMessages: 0,
    },
    {
      id: 3,
      code: 'PHY102',
      title: 'Mechanics and Waves',
      lecturer: 'Dr. Robert Williams',
      progress: 42,
      color: '#9333ea', // purple-600
      image: 'https://images.unsplash.com/photo-1636633762833-5d1658f1a3c8',
      nextAssignment: 'Lab Report 3',
      dueDate: '2025-05-25',
      announcements: 1,
      newGrades: 0,
      unreadMessages: 2,
    },
    {
      id: 4,
      code: 'ENG205',
      title: 'Technical Communication',
      lecturer: 'Prof. Emily Davis',
      progress: 90,
      color: '#ea580c', // orange-600
      image: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667',
      nextAssignment: 'Final Essay',
      dueDate: '2025-06-01',
      announcements: 0,
      newGrades: 2,
      unreadMessages: 0,
    },
    {
      id: 5,
      code: 'BIO110',
      title: 'Introduction to Biology',
      lecturer: 'Dr. Jason Miller',
      progress: 60,
      color: '#10b981', // emerald-500
      image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8',
      nextAssignment: 'Quiz 4',
      dueDate: '2025-05-28',
      announcements: 0,
      newGrades: 0,
      unreadMessages: 0,
    },
    {
      id: 6,
      code: 'CHEM201',
      title: 'Organic Chemistry',
      lecturer: 'Prof. Lisa Anderson',
      progress: 35,
      color: '#ec4899', // pink-500
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6',
      nextAssignment: 'Lab Report 2',
      dueDate: '2025-05-22',
      announcements: 3,
      newGrades: 0,
      unreadMessages: 1,
    },
  ];

  // Upcoming assignments
  const upcomingAssignments = [
    {
      id: 1,
      title: 'Project Proposal',
      courseCode: 'CS101',
      courseTitle: 'Introduction to Computer Science',
      dueDate: '2025-05-20',
      status: 'not-started',
    },
    {
      id: 2,
      title: 'Problem Set 5',
      courseCode: 'MATH201',
      courseTitle: 'Linear Algebra',
      dueDate: '2025-05-18',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Lab Report 3',
      courseCode: 'PHY102',
      courseTitle: 'Mechanics and Waves',
      dueDate: '2025-05-25',
      status: 'not-started',
    },
    {
      id: 4,
      title: 'Quiz 4',
      courseCode: 'BIO110',
      courseTitle: 'Introduction to Biology',
      dueDate: '2025-05-28',
      status: 'not-started',
    },
  ];

  // Recent announcements
  const recentAnnouncements = [
    {
      id: 1,
      title: 'Class canceled for tomorrow',
      course: 'CS101: Introduction to Computer Science',
      author: 'Dr. Sarah Johnson',
      date: 'May 16, 2025',
      content: 'Due to a scheduling conflict, tomorrow\'s class will be canceled. We will have a makeup class next week.',
      unread: true,
    },
    {
      id: 2,
      title: 'Lab session rescheduled',
      course: 'PHY102: Mechanics and Waves',
      author: 'Dr. Robert Williams',
      date: 'May 15, 2025',
      content: 'The lab session for this Friday has been rescheduled to Monday at the same time.',
      unread: true,
    },
    {
      id: 3,
      title: 'Final project requirements updated',
      course: 'CS101: Introduction to Computer Science',
      author: 'Dr. Sarah Johnson',
      date: 'May 14, 2025',
      content: 'I\'ve updated the requirements for the final project. Please review the new document on the course page.',
      unread: false,
    },
    {
      id: 4,
      title: 'Office hours changed',
      course: 'CHEM201: Organic Chemistry',
      author: 'Prof. Lisa Anderson',
      date: 'May 14, 2025',
      content: 'My office hours will now be on Wednesdays from 2pm to 4pm instead of Tuesdays.',
      unread: true,
    },
    {
      id: 5,
      title: 'Extra credit opportunity',
      course: 'CHEM201: Organic Chemistry',
      author: 'Prof. Lisa Anderson',
      date: 'May 13, 2025',
      content: 'There will be an extra credit opportunity for those who attend the chemistry department symposium next week.',
      unread: true,
    },
    {
      id: 6,
      title: 'Midterm exam information',
      course: 'CHEM201: Organic Chemistry',
      author: 'Prof. Lisa Anderson',
      date: 'May 12, 2025',
      content: 'The midterm exam will cover chapters 1-5 and will be held in the main lecture hall.',
      unread: true,
    },
  ];

  // Upcoming events/calendar items
  const calendarItems = [
    {
      id: 1,
      title: 'CS101 Midterm Exam',
      date: 'May 22, 2025',
      time: '14:00 - 16:00',
      location: 'Main Hall',
      type: 'exam',
    },
    {
      id: 2,
      title: 'Programming Contest',
      date: 'May 25, 2025',
      time: '10:00 - 18:00',
      location: 'Computer Science Building',
      type: 'event',
    },
    {
      id: 3,
      title: 'Physics Lab Session',
      date: 'May 19, 2025',
      time: '15:00 - 17:00',
      location: 'Physics Lab 2',
      type: 'class',
    },
    {
      id: 4,
      title: 'Study Group - Linear Algebra',
      date: 'May 20, 2025',
      time: '18:00 - 20:00',
      location: 'Library Study Room 3',
      type: 'study',
    },
    {
      id: 5,
      title: 'Career Fair',
      date: 'May 30, 2025',
      time: '10:00 - 16:00',
      location: 'University Center',
      type: 'event',
    },
  ];

  // Get status color for calendar items
  const getEventStatusColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-red-100 text-red-800';
      case 'event':
        return 'bg-purple-100 text-purple-800';
      case 'class':
        return 'bg-blue-100 text-blue-800';
      case 'study':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: 'grade',
      course: 'CS101: Introduction to Computer Science',
      detail: 'Quiz 2 graded: 92%',
      date: 'May 15, 2025',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      id: 2,
      type: 'submission',
      course: 'ENG205: Technical Communication',
      detail: 'Draft 1 submission: Draft for Research Paper',
      date: 'May 14, 2025',
      icon: <FileText className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 3,
      type: 'comment',
      course: 'MATH201: Linear Algebra',
      detail: 'Comments on Problem Set 4',
      date: 'May 13, 2025',
      icon: <MessageSquare className="h-5 w-5 text-indigo-500" />,
    },
    {
      id: 4,
      type: 'grade',
      course: 'ENG205: Technical Communication',
      detail: 'Outline feedback: Excellent work',
      date: 'May 13, 2025',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
  ];

  // Career recommendations
  const careerRecommendations = [
    {
      id: 1,
      title: 'Software Engineer',
      match: 96,
      company: 'Various Tech Companies',
      description: 'Design and develop software applications using programming languages and development tools.',
    },
    {
      id: 2,
      title: 'Data Scientist',
      match: 92,
      company: 'Research Institutions, Tech Companies',
      description: 'Analyze complex data to find patterns and insights using statistical methods and machine learning.',
    },
    {
      id: 3,
      title: 'Machine Learning Engineer',
      match: 88,
      company: 'AI Startups, Tech Giants',
      description: 'Develop algorithms and models that allow computers to learn from and make predictions based on data.',
    },
  ];

  // Grade summary data
  const gradeSummary = {
    currentGPA: 3.7,
    totalCredits: 48,
    courseGrades: [
      { course: 'CS101', grade: 'A-', percentage: 92 },
      { course: 'MATH201', grade: 'B+', percentage: 87 },
      { course: 'PHY102', grade: 'B', percentage: 83 },
      { course: 'ENG205', grade: 'A', percentage: 94 },
    ],
  };

  // Job listings
  const jobListings = [
    {
      id: 1,
      title: 'Software Development Intern',
      company: 'TechCorp',
      location: 'Harare',
      match: 89,
    },
    {
      id: 2,
      title: 'Data Analytics Intern',
      company: 'DataGrowth',
      location: 'Remote',
      match: 85,
    },
  ];

  const courseInProgressCount = enrolledCourses.length;
  const assignmentsDueCount = upcomingAssignments.length;
  const unreadAnnouncementsCount = recentAnnouncements.filter(a => a.unread).length;
  const upcomingEventsCount = calendarItems.length;

  // Function to render course card in grid view
  const renderCourseCard = (course: any) => (
    <div 
      key={course.id} 
      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Course Header with background color or image */}
      <div 
        className="h-24 relative" 
        style={{ 
          backgroundColor: course.color,
          backgroundImage: course.image ? `url(${course.image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30 flex items-end p-3">
          <div>
            <span className="inline-block bg-white/90 text-xs font-medium px-2 py-1 rounded">
              {course.code}
            </span>
            <h3 className="text-white font-bold mt-1 text-lg truncate max-w-[200px]">
              {course.title}
            </h3>
          </div>
        </div>
      </div>
      
      {/* Course Body */}
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">{course.lecturer}</p>
        
        {/* Progress Bar */}
        <div className="mt-2 mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs font-medium text-gray-700">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: `${course.progress}%`,
                backgroundColor: course.color 
              }}
            ></div>
          </div>
        </div>
        
        {/* Assignment Due */}
        {course.nextAssignment && (
          <div className="flex items-center text-sm mt-3">
            <Clock className="h-4 w-4 text-gray-400 mr-1.5" />
            <div>
              <p className="font-medium text-gray-900">{course.nextAssignment}</p>
              <p className="text-xs text-gray-500">Due {new Date(course.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}
        
        {/* Notification Indicators */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          {course.announcements > 0 && (
            <div className="flex items-center text-xs">
              <Bell className="h-3 w-3 text-amber-500 mr-1" />
              <span className="text-gray-600">{course.announcements}</span>
            </div>
          )}
          
          {course.newGrades > 0 && (
            <div className="flex items-center text-xs">
              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-gray-600">{course.newGrades}</span>
            </div>
          )}
          
          {course.unreadMessages > 0 && (
            <div className="flex items-center text-xs">
              <MessageSquare className="h-3 w-3 text-blue-500 mr-1" />
              <span className="text-gray-600">{course.unreadMessages}</span>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs ml-auto"
            asChild
          >
            <Link to={`/course/${course.id}`}>
              Go to Course <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );

  // Function to render course in list view
  const renderCourseListItem = (course: any) => (
    <div 
      key={course.id} 
      className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center">
        {/* Course Color Indicator */}
        <div 
          className="w-2 h-full min-h-[50px] rounded-md mr-3" 
          style={{ backgroundColor: course.color }}
        ></div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <div className="flex items-center">
                <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded">
                  {course.code}
                </span>
                {(course.announcements > 0 || course.newGrades > 0 || course.unreadMessages > 0) && (
                  <div className="flex ml-2 space-x-2">
                    {course.announcements > 0 && (
                      <div className="flex items-center text-xs">
                        <Bell className="h-3 w-3 text-amber-500 mr-1" />
                        <span className="text-gray-600">{course.announcements}</span>
                      </div>
                    )}
                    
                    {course.newGrades > 0 && (
                      <div className="flex items-center text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-gray-600">{course.newGrades}</span>
                      </div>
                    )}
                    
                    {course.unreadMessages > 0 && (
                      <div className="flex items-center text-xs">
                        <MessageSquare className="h-3 w-3 text-blue-500 mr-1" />
                        <span className="text-gray-600">{course.unreadMessages}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mt-1">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.lecturer}</p>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <div className="flex items-center mb-1">
                <span className="text-xs text-gray-500 mr-2">Progress: {course.progress}%</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${course.progress}%`,
                      backgroundColor: course.color 
                    }}
                  ></div>
                </div>
              </div>
              
              {course.nextAssignment && (
                <div className="text-xs">
                  <span className="text-gray-500">Next: {course.nextAssignment}</span>
                  <span className="text-gray-400 ml-1">({new Date(course.dueDate).toLocaleDateString()})</span>
                </div>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs mt-2"
                asChild
              >
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

  // Render the Canvas-like dashboard
  return (
    <StudentLayout level="university">
      {/* Dashboard Header with Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {user?.full_name || 'Student'}! Here's what's happening in your courses.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex mt-4 md:mt-0 space-x-4 md:space-x-6">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100">
                  <Book className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-2">
                  <p className="text-xs text-gray-500">Courses</p>
                  <p className="font-semibold">{courseInProgressCount}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-amber-100">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-2">
                  <p className="text-xs text-gray-500">Assignments Due</p>
                  <p className="font-semibold">{assignmentsDueCount}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-red-100">
                  <Bell className="h-5 w-5 text-red-600" />
                </div>
                <div className="ml-2">
                  <p className="text-xs text-gray-500">Unread</p>
                  <p className="font-semibold">{unreadAnnouncementsCount}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-indigo-100">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-2">
                  <p className="text-xs text-gray-500">Events</p>
                  <p className="font-semibold">{upcomingEventsCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setSelectedMenu('dashboard')}
              className={`px-4 py-3 flex items-center text-sm font-medium border-b-2 ${
                selectedMenu === 'dashboard' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setSelectedMenu('courses')}
              className={`px-4 py-3 flex items-center text-sm font-medium border-b-2 ${
                selectedMenu === 'courses' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Courses
            </button>
            <button 
              onClick={() => setSelectedMenu('grades')}
              className={`px-4 py-3 flex items-center text-sm font-medium border-b-2 ${
                selectedMenu === 'grades' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Grades
            </button>
            <button 
              onClick={() => setSelectedMenu('calendar')}
              className={`px-4 py-3 flex items-center text-sm font-medium border-b-2 ${
                selectedMenu === 'calendar' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Calendar
            </button>
            <button 
              onClick={() => setSelectedMenu('career')}
              className={`px-4 py-3 flex items-center text-sm font-medium border-b-2 ${
                selectedMenu === 'career' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Career
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-6">
        {selectedMenu === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              {/* Announcement Section */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-amber-500" />
                    Recent Announcements
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-sm"
                  >
                    Mark All as Read
                  </Button>
                </div>

                <div className="divide-y">
                  {recentAnnouncements.slice(0, 3).map((announcement) => (
                    <div key={announcement.id} className={`p-4 ${announcement.unread ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-start">
                        {announcement.unread && (
                          <div className="mt-1.5 mr-3 h-2 w-2 rounded-full bg-blue-600"></div>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                            <span className="text-xs text-gray-500">{announcement.date}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5">{announcement.course}</p>
                          <p className="text-sm mt-2 text-gray-700">{announcement.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t bg-gray-50 text-center">
                  <Link to="/announcements" className="text-sm text-blue-600 font-medium hover:underline">
                    View All Announcements
                  </Link>
                </div>
              </div>

              {/* Upcoming Assignments */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    Upcoming Assignments
                  </h2>
                  <Link to="/assignments" className="text-sm text-blue-600 font-medium hover:underline">
                    View All
                  </Link>
                </div>

                <div className="divide-y">
                  {upcomingAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 flex justify-between items-center">
                      <div>
                        <Link to={`/assignment/${assignment.id}`} className="font-medium text-blue-600 hover:underline">
                          {assignment.title}
                        </Link>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {assignment.courseCode}: {assignment.courseTitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          new Date(assignment.dueDate) < new Date() 
                            ? 'bg-red-100 text-red-800' 
                            : new Date(assignment.dueDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          Due {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs mt-1"
                          asChild
                        >
                          <Link to={`/assignment/${assignment.id}`}>
                            {assignment.status === 'in-progress' ? 'Continue' : 'Start'}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-indigo-500" />
                    Recent Activity
                  </h2>
                </div>

                <div className="divide-y">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 flex">
                      <div className="mr-3">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.detail}</p>
                        <p className="text-xs text-gray-600">{activity.course}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.date}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t bg-gray-50 text-center">
                  <Link to="/activity" className="text-sm text-blue-600 font-medium hover:underline">
                    View All Activity
                  </Link>
                </div>
              </div>
            </div>

            {/* Side Content - 1/3 width on large screens */}
            <div className="space-y-6">
              {/* Quick Links/Actions */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-center">
                    <Calendar className="h-4 w-4 mr-2" /> Timetable
                  </Button>
                  <Button variant="outline" className="justify-center">
                    <BookOpen className="h-4 w-4 mr-2" /> Course Catalog
                  </Button>
                  <Button variant="outline" className="justify-center">
                    <GraduationCap className="h-4 w-4 mr-2" /> Degree Plan
                  </Button>
                  <Button variant="outline" className="justify-center">
                    <MessageSquare className="h-4 w-4 mr-2" /> Inbox
                  </Button>
                  <Button variant="outline" className="justify-center">
                    <FileText className="h-4 w-4 mr-2" /> Transcripts
                  </Button>
                  <Button variant="outline" className="justify-center">
                    <User className="h-4 w-4 mr-2" /> Profile
                  </Button>
                </div>
              </div>

              {/* Calendar/Upcoming Events */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                    Upcoming Events
                  </h2>
                  <Link to="/calendar" className="text-sm text-blue-600 font-medium hover:underline">
                    Full Calendar
                  </Link>
                </div>
                <div className="p-4 divide-y">
                  {calendarItems.slice(0, 4).map((event) => (
                    <div key={event.id} className="py-3 flex items-start">
                      <div className="flex-shrink-0 bg-gray-100 rounded-lg p-2 mr-3 text-center min-w-[60px]">
                        <p className="text-xs text-gray-600">{event.date.split(',')[0].split(' ')[0]}</p>
                        <p className="font-medium">{event.date.split(',')[0].split(' ')[1]}</p>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                        <div className="flex items-center text-xs text-gray-600 mt-0.5">
                          <Clock className="h-3 w-3 mr-1" />{event.time}
                          {event.location && (
                            <>
                              <span className="mx-1">•</span>
                              <MapPin className="h-3 w-3 mr-1" />{event.location}
                            </>
                          )}
                        </div>
                        <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${getEventStatusColor(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grade Summary */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-green-500" />
                    Grade Summary
                  </h2>
                  <Link to="/grades" className="text-sm text-blue-600 font-medium hover:underline">
                    View All Grades
                  </Link>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Current GPA</p>
                      <p className="text-2xl font-semibold text-blue-600">{gradeSummary.currentGPA}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Credits</p>
                      <p className="text-2xl font-semibold text-green-600">{gradeSummary.totalCredits}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {gradeSummary.courseGrades.map((course, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <p className="text-sm">{course.course}</p>
                        <div className="flex items-center">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-1.5 rounded-full bg-blue-600" 
                              style={{ width: `${course.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                            course.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                            course.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                            course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>{course.grade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMenu === 'courses' && (
          <>
            {/* Courses View Filters and Controls */}
            <div className="bg-white p-4 mb-6 rounded-lg shadow-sm border flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-xl font-bold text-gray-900 mb-1">My Courses</h2>
                <p className="text-sm text-gray-600">
                  You're enrolled in {enrolledCourses.length} courses this semester
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                {/* Course View Type Toggle */}
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    onClick={() => setCourseView('grid')}
                    className={`flex items-center px-3 py-1.5 text-sm ${
                      courseView === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Grid className="h-4 w-4 mr-1" />
                    Grid
                  </button>
                  <button
                    onClick={() => setCourseView('list')}
                    className={`flex items-center px-3 py-1.5 text-sm ${
                      courseView === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <List className="h-4 w-4 mr-1" />
                    List
                  </button>
                </div>
                
                {/* Course Filter Tabs */}
                <div className="flex rounded-md overflow-hidden border">
                  <button
                    onClick={() => setSelectedTab('all')}
                    className={`px-3 py-1.5 text-sm ${
                      selectedTab === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedTab('favorites')}
                    className={`flex items-center px-3 py-1.5 text-sm ${
                      selectedTab === 'favorites'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    Favorites
                  </button>
                  <button
                    onClick={() => setSelectedTab('past')}
                    className={`px-3 py-1.5 text-sm ${
                      selectedTab === 'past'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Past
                  </button>
                </div>
              </div>
            </div>
            
            {/* Course Cards/List */}
            {courseView === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {enrolledCourses.map(course => renderCourseCard(course))}
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.map(course => renderCourseListItem(course))}
              </div>
            )}
          </>
        )}

        {selectedMenu === 'calendar' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Academic Calendar</h2>
            
            {/* Calendar Placeholder - In a real app, implement a full calendar component */}
            <div className="border rounded-lg p-4 bg-gray-50 text-center h-[500px] flex items-center justify-center">
              <div>
                <Calendar className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Calendar View</h3>
                <p className="text-gray-600 mt-2 max-w-md mx-auto">
                  This would be a full calendar component with day, week, and month views,
                  displaying all course sessions, assignment due dates, exams, and other academic events.
                </p>
                <Button className="mt-4">
                  Add New Event
                </Button>
              </div>
            </div>
            
            {/* Upcoming Events List */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {calendarItems.map((event) => (
                  <div key={event.id} className="flex p-4 border rounded-lg bg-white">
                    <div className="flex-shrink-0 bg-gray-100 rounded-lg p-3 mr-4 text-center w-16">
                      <p className="text-xs text-gray-600">{event.date.split(',')[0].split(' ')[0]}</p>
                      <p className="text-lg font-semibold">{event.date.split(',')[0].split(' ')[1]}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.time}
                            {event.location && (
                              <span className="flex items-center ml-3">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className={`h-min text-xs px-2 py-1 rounded-full ${getEventStatusColor(event.type)}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedMenu === 'grades' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Current GPA</h3>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-blue-600">{gradeSummary.currentGPA}</p>
                  <p className="text-sm text-gray-500 ml-2 mb-1">/ 4.0</p>
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 rounded-full bg-blue-600" 
                    style={{ width: `${(gradeSummary.currentGPA / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Credits</h3>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-green-600">{gradeSummary.totalCredits}</p>
                  <p className="text-sm text-gray-500 ml-2 mb-1">/ 120</p>
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 rounded-full bg-green-600" 
                    style={{ width: `${(gradeSummary.totalCredits / 120) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Degree Progress</h3>
                <div className="flex items-end">
                  <p className="text-3xl font-bold text-purple-600">40%</p>
                  <p className="text-sm text-gray-500 ml-2 mb-1">Complete</p>
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 rounded-full bg-purple-600" 
                    style={{ width: '40%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Detailed Grades */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Course Grades</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instructor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credits
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enrolledCourses.map((course) => (
                      <tr key={course.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-lg" style={{ backgroundColor: course.color }}></div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{course.code}</div>
                              <div className="text-sm text-gray-500">{course.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.lecturer}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          3
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            course.progress > 90 ? 'bg-green-100 text-green-800' :
                            course.progress > 80 ? 'bg-blue-100 text-blue-800' :
                            course.progress > 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.progress > 90 ? 'A' :
                             course.progress > 80 ? 'B' :
                             course.progress > 70 ? 'C' :
                             'D'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.progress}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          In Progress
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedMenu === 'career' && (
          <div className="space-y-6">
            {/* Career Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Career Recommendations</h2>
                <p className="text-gray-600 mt-1">Based on your courses, skills, and interests</p>
              </div>
              
              <div className="divide-y">
                {careerRecommendations.map((career) => (
                  <div key={career.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between">
                    <div className="md:flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{career.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{career.company}</p>
                      <p className="text-sm text-gray-700 mt-2">{career.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:items-end">
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-green-600">{career.match}%</span>
                        <span className="ml-2 text-sm text-gray-600">Match</span>
                      </div>
                      <Button className="mt-3" asChild>
                        <Link to={`/careers/${career.id}`}>
                          Explore Career <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-gray-50">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Want More Personalized Recommendations?</h3>
                  <p className="text-gray-600 mb-4">Take our career assessment to get better matches based on your skills and interests.</p>
                  <Button asChild>
                    <Link to="/careers/quiz">
                      Take Career Assessment
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Career Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-blue-100">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="ml-2 text-lg font-medium text-gray-900">Resume Review</h3>
                </div>
                <p className="text-gray-600 mb-4">Get professional feedback on your resume to make it stand out to employers.</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/careers/resume-review">Schedule Review</Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-green-100">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="ml-2 text-lg font-medium text-gray-900">Career Counseling</h3>
                </div>
                <p className="text-gray-600 mb-4">Meet with a career counselor to discuss your career goals and options.</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/careers/counseling">Book Appointment</Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-purple-100">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="ml-2 text-lg font-medium text-gray-900">Job Opportunities</h3>
                </div>
                <p className="text-gray-600 mb-4">Browse through internships and job opportunities tailored to your skills.</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/careers/jobs">View Jobs</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default UniversityDashboardPage;