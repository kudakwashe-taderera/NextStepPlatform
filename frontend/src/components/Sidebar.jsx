import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Sidebar = () => {
  const user = useAuthStore(state => state.user);
  const role = user?.role || 'GENERAL';

  // Define menu items based on user role
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: ['*'] },
    { name: 'LMS', path: '/lms', icon: '📚', roles: ['LECTURER', 'O_LEVEL', 'A_LEVEL', 'TERTIARY'] },
    { name: 'Career Guidance', path: '/career', icon: '🧭', roles: ['*'] },
    { name: 'Job Portal', path: '/jobs', icon: '💼', roles: ['*'] },
    { name: 'Learning Hub', path: '/learning', icon: '🎓', roles: ['*'] },
    { name: 'Profile', path: '/profile', icon: '👤', roles: ['*'] },
    { name: 'Messages', path: '/messages', icon: '✉️', roles: ['*'] },
    { name: 'Admin Panel', path: '/admin', icon: '⚙️', roles: ['SUPERUSER', 'INST_ADMIN', 'MIN_ADMIN'] },
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(item => 
    item.roles.includes('*') || item.roles.includes(role)
  );

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">NeXTStep</h2>
        <p className="text-gray-400 text-sm">{user?.role}</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {visibleMenuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path} 
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;