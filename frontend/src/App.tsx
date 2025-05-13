import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

// Pages
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import CoursePage from './pages/CoursePage';
import NotFound from './pages/NotFound';

// Layouts with role-specific routes
import StudentLayout from './components/layout/StudentLayout';
import LecturerLayout from './components/layout/LecturerLayout';
import AdminLayout from './components/layout/AdminLayout';
import EmployerLayout from './components/layout/EmployerLayout';
import MentorLayout from './components/layout/MentorLayout';
import GeneralLayout from './components/layout/GeneralLayout';

// Protected route component
import ProtectedRoute from './components/ProtectedRoute';

// Auth Provider
import { AuthProvider } from './hooks/useAuth';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* O Level Student Routes */}
            <Route path="/dashboard/o-level/*" element={
              <ProtectedRoute allowedRoles={['O_LEVEL']}>
                <StudentLayout userRole="O_LEVEL" />
              </ProtectedRoute>
            } />
            
            {/* A Level Student Routes */}
            <Route path="/dashboard/a-level/*" element={
              <ProtectedRoute allowedRoles={['A_LEVEL']}>
                <StudentLayout userRole="A_LEVEL" />
              </ProtectedRoute>
            } />
            
            {/* Tertiary Student Routes */}
            <Route path="/dashboard/university/*" element={
              <ProtectedRoute allowedRoles={['TERTIARY']}>
                <StudentLayout userRole="TERTIARY" />
              </ProtectedRoute>
            } />
            
            {/* Course Page */}
            <Route path="/course/:id/*" element={
              <ProtectedRoute allowedRoles={['TERTIARY', 'LECTURER']}>
                <CoursePage />
              </ProtectedRoute>
            } />
            
            {/* Lecturer Routes */}
            <Route path="/dashboard/lecturer/*" element={
              <ProtectedRoute allowedRoles={['LECTURER']}>
                <LecturerLayout />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/dashboard/admin/*" element={
              <ProtectedRoute allowedRoles={['INST_ADMIN', 'MIN_ADMIN', 'SUPERUSER']}>
                <AdminLayout />
              </ProtectedRoute>
            } />
            
            {/* Employer Routes */}
            <Route path="/dashboard/employer/*" element={
              <ProtectedRoute allowedRoles={['EMPLOYER']}>
                <EmployerLayout />
              </ProtectedRoute>
            } />
            
            {/* Mentor Routes */}
            <Route path="/dashboard/mentor/*" element={
              <ProtectedRoute allowedRoles={['MENTOR']}>
                <MentorLayout />
              </ProtectedRoute>
            } />
            
            {/* General User Routes */}
            <Route path="/dashboard/general/*" element={
              <ProtectedRoute allowedRoles={['GENERAL']}>
                <GeneralLayout />
              </ProtectedRoute>
            } />
            
            {/* Redirect root to appropriate dashboard based on role (handled by Dashboard component) */}
            <Route path="/" element={<Dashboard />} />
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
