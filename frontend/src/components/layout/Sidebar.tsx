import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  Briefcase,
  BookOpen,
  GraduationCap,
  Book,
  Star,
  Award,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';

const menuConfig = {
  common: [
    { label: 'Dashboard', path: '/', icon: Home },
    { label: 'Career Guidance', path: '/careers', icon: Compass },
    { label: 'Job Portal', path: '/jobs', icon: Briefcase },
    { label: 'Learning Hub', path: '/learning', icon: BookOpen },
  ],
  oAndAlevelExtra: [
    { label: 'Subjects', path: '/courses', icon: Book },
  ],
  aLevel: [
    { label: 'University Applications', path: '/applications', icon: GraduationCap },
  ],
  tertiary: [
    { label: 'My Courses', path: '/courses', icon: Book },
    { label: 'Grades', path: '/grades', icon: Star },
    { label: 'Certificates', path: '/certificates', icon: Award },
  ],
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const getMenuItems = () => {
    if (!user) return menuConfig.common;

    if (user.role === UserRole.O_LEVEL_STUDENT) {
      return [...menuConfig.common, ...menuConfig.oAndAlevelExtra];
    } else if (user.role === UserRole.A_LEVEL_STUDENT) {
      return [...menuConfig.common, ...menuConfig.oAndAlevelExtra, ...menuConfig.aLevel];
    } else if (user.role === UserRole.TERTIARY_STUDENT) {
      return [...menuConfig.common, ...menuConfig.tertiary];
    }
    return menuConfig.common;
  };

  const studentLabel =
    user?.role === UserRole.A_LEVEL_STUDENT
      ? 'A Level Student'
      : user?.role === UserRole.TERTIARY_STUDENT
      ? 'University Student'
      : user?.role === UserRole.O_LEVEL_STUDENT
      ? 'O Level Student'
      : 'Student';

  return (
    <aside className="w-64 bg-[#13294B] text-white flex flex-col justify-between min-h-screen">
      <div>
        <div className="px-6 py-4 text-2xl font-bold text-white tracking-tight">
          NeXTStep
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {getMenuItems().map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                isActive(path)
                  ? 'bg-white text-[#13294B]'
                  : 'hover:bg-[#1E3A8A] hover:text-white text-gray-200'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* User Info */}
      <div className="border-t border-white/20 p-4 text-sm">
        <div className="text-white font-semibold truncate">{user?.full_name}</div>
        <div className="text-gray-300 text-xs">{studentLabel}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
