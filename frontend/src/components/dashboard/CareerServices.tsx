import React from 'react';
import {
  FileText,
  User,
  Briefcase,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Resume Review',
    description: 'Get professional feedback on your resume to make it stand out to employers.',
    icon: FileText,
    link: '/career-services/resume',
    bg: 'bg-blue-50',
    iconColor: 'text-[#13294B]',
  },
  {
    title: 'Career Counseling',
    description: 'Meet with a career counselor to discuss your career goals and options.',
    icon: User,
    link: '/career-services/counseling',
    bg: 'bg-green-50',
    iconColor: 'text-green-700',
  },
  {
    title: 'Job Opportunities',
    description: 'Browse internships and jobs tailored to your skills and goals.',
    icon: Briefcase,
    link: '/jobs',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-700',
  },
];

const CareerServices: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      {services.map(({ title, description, icon: Icon, link, bg, iconColor }) => (
        <div
          key={title}
          className={`rounded-xl p-5 shadow-sm border ${bg} hover:shadow-md transition-shadow`}
        >
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-full ${iconColor} bg-white shadow`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600 mb-3">{description}</p>
              <Link
                to={link}
                className="inline-block text-sm font-medium text-[#FF552E] hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareerServices;
