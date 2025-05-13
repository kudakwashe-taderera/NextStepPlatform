import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';

// Pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';
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
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* Role-specific routes */}
            <Route
              path="/courses/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.LECTURER]}>
                  {/* Nested routes will be added later */}
                </ProtectedRoute>
              }
            />

            <Route
              path="/careers/*"
              element={
                <ProtectedRoute>
                  {/* Career paths and recommendations - to be implemented */}
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.EMPLOYER]}>
                  {/* Job listings and applications - to be implemented */}
                </ProtectedRoute>
              }
            />

            <Route
              path="/learning/*"
              element={
                <ProtectedRoute>
                  {/* Learning resources - to be implemented */}
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/users/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                  {/* User management - to be implemented */}
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                  {/* System settings - to be implemented */}
                </ProtectedRoute>
              }
            />

            {/* Lecturer Routes */}
            <Route
              path="/course-management/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.LECTURER]}>
                  {/* Course management - to be implemented */}
                </ProtectedRoute>
              }
            />

            {/* Employer Routes */}
            <Route
              path="/job-management/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  {/* Job management - to be implemented */}
                </ProtectedRoute>
              }
            />

            <Route
              path="/applications/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                  {/* Application management - to be implemented */}
                </ProtectedRoute>
              }
            />

            {/* Mentor Routes */}
            <Route
              path="/mentees/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.MENTOR]}>
                  {/* Mentee management - to be implemented */}
                </ProtectedRoute>
              }
            />

            <Route
              path="/resources/*"
              element={
                <ProtectedRoute allowedRoles={[UserRole.MENTOR]}>
                  {/* Mentor resources - to be implemented */}
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