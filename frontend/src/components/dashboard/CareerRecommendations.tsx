import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Career {
  id: number;
  title: string;
  match: number;
  company: string;
  description: string;
}

interface CareerRecommendationsProps {
  careers: Career[];
}

const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ careers }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm">
      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-bold text-gray-900">Career Recommendations</h2>
        <p className="text-sm text-gray-600 mt-1">Based on your courses, skills, and interests</p>
      </div>

      <ul className="divide-y">
        {careers.map((career) => (
          <li key={career.id} className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{career.title}</h3>
              <p className="text-sm text-gray-600">{career.company}</p>
              <p className="text-sm text-gray-700 mt-2">{career.description}</p>
            </div>
            <div className="md:text-right">
              <div className="flex items-center justify-start md:justify-end">
                <span className="text-3xl font-bold text-green-600">{career.match}%</span>
                <span className="ml-2 text-sm text-gray-600">Match</span>
              </div>
              <Button className="mt-3 w-full md:w-auto" asChild>
                <Link to={`/careers/${career.id}`}>
                  Explore Career <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-6 py-6 bg-gray-50 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Want More Personalized Recommendations?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Take our career assessment to get better matches based on your skills and interests.
        </p>
        <Button asChild>
          <Link to="/careers/quiz">Take Career Assessment</Link>
        </Button>
      </div>
    </div>
  );
};

export default CareerRecommendations;
