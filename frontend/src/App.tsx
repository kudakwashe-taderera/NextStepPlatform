import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

// Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/login/page';
import RegisterPage from './pages/auth/register/page';
import OLevelDashboardPage from './pages/dashboard/o-level/page';
import ALevelDashboardPage from './pages/dashboard/a-level/page';
import UniversityDashboardPage from './pages/dashboard/university/page';
import EmployerDashboardPage from './pages/employer/dashboard/page';
import JobManagementPage from './pages/job-management/page';
import CreateJobPage from './pages/job-management/create/page';
import JobDetailPage from './pages/job-management/[id]/page';

// Auth Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';
import { UserRole } from './types';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

           {/* Dashboard Routes */}
            <Route
              path="/dashboard/o-level"
              element={
                <ProtectedRoute allowedRoles={[UserRole.O_LEVEL_STUDENT]}>
                  <OLevelDashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/a-level"
              element={
                <ProtectedRoute allowedRoles={[UserRole.A_LEVEL_STUDENT]}>
                  <ALevelDashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/university"
              element={
                <ProtectedRoute allowedRoles={[UserRole.TERTIARY_STUDENT]}>
                  <UniversityDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Role-Specific Routes */}
            <Route
              path="/courses/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.O_LEVEL_STUDENT, UserRole.A_LEVEL_STUDENT, UserRole.TERTIARY_STUDENT, UserRole.LECTURER]}>
                  <div>Courses - To be implemented</div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/careers/*"
              element={
                <ProtectedRoute>
                  <div>Career paths and recommendations - To be implemented</div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.O_LEVEL_STUDENT, UserRole.A_LEVEL_STUDENT, UserRole.TERTIARY_STUDENT, UserRole.EMPLOYER]}>
                  <div>Job listings and applications - To be implemented</div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/learning/*"
              element={
                <ProtectedRoute>
                  <div>Learning resources - To be implemented</div>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/users/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.INSTITUTION_ADMIN, UserRole.MINISTRY_ADMIN]}>
                  <div>User management - To be implemented</div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.INSTITUTION_ADMIN, UserRole.MINISTRY_ADMIN]}>
                  <div>System settings - To be implemented</div>
                </ProtectedRoute>
              }
            />

            {/* Lecturer Routes */}
            <Route
              path="/course-management/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.LECTURER]}>
                  <div>Course management - To be implemented</div>
                </ProtectedRoute>
              }
            />

            {/* Employer Routes */}
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  <EmployerDashboardPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/job-management"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  <JobManagementPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/job-management/create"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  <CreateJobPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/job-management/:id"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  <JobDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applications/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  <div>Application management - To be implemented</div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/employer/candidates"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  <div>Candidates management - To be implemented</div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/employer/messages"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  <div>Employer messages - To be implemented</div>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/employer/settings"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  <div>Employer settings - To be implemented</div>
                </ProtectedRoute>
              }
            />

            {/* Mentor Routes */}
            <Route
              path="/mentees/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.MENTOR]}>
                  <div>Mentee management - To be implemented</div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/resources/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.MENTOR]}>
                  <div>Mentor resources - To be implemented</div>
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#22c55e',
                color: '#fff',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;