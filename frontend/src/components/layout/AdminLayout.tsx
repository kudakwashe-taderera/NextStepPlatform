import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from '../ui/Sidebar';
import { TopNav } from '../ui/TopNav';
import { useAuth } from '../../hooks/useAuth';

// Import admin pages
import UserControl from '../../pages/admin/UserControl';
import InternalReports from '../../pages/admin/InternalReports';
import ProgramSetup from '../../pages/admin/ProgramSetup';
import Messaging from '../../pages/admin/Messaging';
import DataInsights from '../../pages/admin/DataInsights';
import ReportExports from '../../pages/admin/ReportExports';
import StudentTracking from '../../pages/admin/StudentTracking';
import SystemSettings from '../../pages/admin/SystemSettings';
import ApprovalLogs from '../../pages/admin/ApprovalLogs';
import Profile from '../../pages/admin/Profile';
import Notifications from '../../pages/admin/Notifications';

export default function AdminLayout() {
  const { user } = useAuth();
  
  // Determine admin type
  const isInstitutionAdmin = user?.role === 'INST_ADMIN';
  const isMinistryAdmin = user?.role === 'MIN_ADMIN';
  const isSuperuser = user?.role === 'SUPERUSER';
  
  // Construct sidebar links based on admin type
  const getSidebarLinks = () => {
    // Common links for all admin types
    const commonLinks = [
      {
        name: 'Profile',
        href: './profile',
        icon: (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
      {
        name: 'Notifications',
        href: './notifications',
        icon: (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        ),
      },
    ];
    
    // Institution Admin specific links
    if (isInstitutionAdmin || isSuperuser) {
      commonLinks.unshift(
        {
          name: 'User Control',
          href: './users',
          icon: (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ),
        },
        {
          name: 'Internal Reports',
          href: './reports',
          icon: (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
        {
          name: 'Program Setup',
          href: './programs',
          icon: (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ),
        },
        {
          name: 'Messaging',
          href: './messaging',
          icon: (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          ),
        }
      );
    }
    
    // Ministry Admin specific links
    if (isMinistryAdmin || isSuperuser) {
      commonLinks.unshift(
        {
          name: 'Approval Logs',
          href: './approvals',
          icon: (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          name: 'Data Insights',
          href: './insights',
          icon: (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
        },
        {
          name: 'Report Exports',
          href: './exports',
          icon: (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
        {
          name: 'Student Tracking',
          href: './tracking',
          icon: (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
        }
      );
    }
    
    // Superuser specific links
    if (isSuperuser) {
      commonLinks.unshift({
        name: 'System Settings',
        href: './settings',
        icon: (
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      });
    }
    
    return commonLinks;
  };

  const sidebarLinks = getSidebarLinks();
  
  // Get admin title
  const getAdminTitle = () => {
    if (isInstitutionAdmin) return 'Institution Admin';
    if (isMinistryAdmin) return 'Ministry Admin';
    if (isSuperuser) return 'System Admin';
    return 'Administrator';
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        links={sidebarLinks} 
        title={getAdminTitle()} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="NeXTStep" />
        
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Routes>
            {/* Institution Admin Routes */}
            {(isInstitutionAdmin || isSuperuser) && (
              <>
                <Route path="users" element={<UserControl />} />
                <Route path="reports" element={<InternalReports />} />
                <Route path="programs" element={<ProgramSetup />} />
                <Route path="messaging" element={<Messaging />} />
              </>
            )}
            
            {/* Ministry Admin Routes */}
            {(isMinistryAdmin || isSuperuser) && (
              <>
                <Route path="approvals" element={<ApprovalLogs />} />
                <Route path="insights" element={<DataInsights />} />
                <Route path="exports" element={<ReportExports />} />
                <Route path="tracking" element={<StudentTracking />} />
              </>
            )}
            
            {/* Superuser Routes */}
            {isSuperuser && (
              <Route path="settings" element={<SystemSettings />} />
            )}
            
            {/* Common Routes */}
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            
            {/* Default redirect based on role */}
            <Route path="*" element={
              <>
                {isInstitutionAdmin && <Navigate to="/dashboard/admin/users" replace />}
                {isMinistryAdmin && <Navigate to="/dashboard/admin/insights" replace />}
                {isSuperuser && <Navigate to="/dashboard/admin/settings" replace />}
                {!isInstitutionAdmin && !isMinistryAdmin && !isSuperuser && <Navigate to="/dashboard/admin/profile" replace />}
              </>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}
