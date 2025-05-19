import React from 'react';
import { Grid, List, Star } from 'lucide-react';

interface CourseFiltersProps {
  courseView: 'grid' | 'list';
  selectedTab: 'all' | 'favorites' | 'past';
  onCourseViewChange: (view: 'grid' | 'list') => void;
  onTabChange: (tab: 'all' | 'favorites' | 'past') => void;
}

const CourseFilterBar: React.FC<CourseFiltersProps> = ({
  courseView,
  selectedTab,
  onCourseViewChange,
  onTabChange,
}) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
      <div className="mb-4 sm:mb-0">
        <h2 className="text-xl font-bold text-gray-900 mb-1">My Courses</h2>
        <p className="text-sm text-gray-600">View and manage your enrolled courses</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
        {/* View Toggle */}
        <div className="flex border rounded-md overflow-hidden">
          <button
            onClick={() => onCourseViewChange('grid')}
            className={`flex items-center px-3 py-1.5 text-sm font-medium ${
              courseView === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Grid className="h-4 w-4 mr-1" />
            Grid
          </button>
          <button
            onClick={() => onCourseViewChange('list')}
            className={`flex items-center px-3 py-1.5 text-sm font-medium ${
              courseView === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <List className="h-4 w-4 mr-1" />
            List
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex border rounded-md overflow-hidden">
          <button
            onClick={() => onTabChange('all')}
            className={`px-3 py-1.5 text-sm font-medium ${
              selectedTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onTabChange('favorites')}
            className={`flex items-center px-3 py-1.5 text-sm font-medium ${
              selectedTab === 'favorites'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Star className="h-3 w-3 mr-1" />
            Favorites
          </button>
          <button
            onClick={() => onTabChange('past')}
            className={`px-3 py-1.5 text-sm font-medium ${
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
  );
};

export default CourseFilterBar;
