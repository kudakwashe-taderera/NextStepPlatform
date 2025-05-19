import React from 'react';
import { cn } from '@/lib/utils';

interface NavTabsProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}

const NavTabs: React.FC<NavTabsProps> = ({ selectedTab, onTabChange, tabs }) => {
  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="flex space-x-6 overflow-x-auto text-sm font-medium text-gray-500">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              'pb-2 border-b-2 transition-colors',
              selectedTab === tab
                ? 'text-blue-600 border-blue-600'
                : 'hover:text-blue-600 border-transparent'
            )}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavTabs;
