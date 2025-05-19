import React from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6 border-b pb-4">
      <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};

export default DashboardHeader;
