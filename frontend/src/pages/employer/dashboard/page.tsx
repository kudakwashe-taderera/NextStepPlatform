import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import EmployerLayout from '@/components/layout/EmployerLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button.tsx';
import { 
  Clock, 
  Users, 
  Briefcase as BriefcaseIcon, 
  BarChart4, 
  Hexagon,
  Calendar
} from 'lucide-react';

const EmployerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Sample data - would come from API in real implementation
  const metrics = {
    openPositions: 12,
    activeApplications: 48,
    hiredCandidates: 5,
    interviewsScheduled: 7
  };

  const recentApplications = [
    {
      id: 1,
      position: 'Senior Software Engineer',
      candidate: 'John Doe',
      status: 'under_review',
      date: '2025-05-10T14:30:00Z'
    },
    {
      id: 2,
      position: 'Frontend Developer',
      candidate: 'Jane Smith',
      status: 'interview_scheduled',
      date: '2025-05-09T10:00:00Z'
    },
    {
      id: 3,
      position: 'DevOps Engineer',
      candidate: 'Michael Johnson',
      status: 'new',
      date: '2025-05-08T16:45:00Z'
    },
    {
      id: 4,
      position: 'UI/UX Designer',
      candidate: 'Sara Williams',
      status: 'offer_sent',
      date: '2025-05-07T11:15:00Z'
    },
    {
      id: 5,
      position: 'Product Manager',
      candidate: 'Robert Chen',
      status: 'rejected',
      date: '2025-05-06T09:30:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'interview_scheduled': return 'bg-purple-100 text-purple-800';
      case 'offer_sent': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'under_review': return 'Under Review';
      case 'interview_scheduled': return 'Interview Scheduled';
      case 'offer_sent': return 'Offer Sent';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <EmployerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
          <Link to="/job-management/create">
            <Button className="flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4" />
              Post a Job
            </Button>
          </Link>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <BriefcaseIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase">Open Positions</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.openPositions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase">Active Applications</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.activeApplications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <Hexagon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase">Hired</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.hiredCandidates}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase">Interviews Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.interviewsScheduled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Period Toggle for Stats */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Application Statistics</h2>
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-3 py-1 text-sm font-medium ${
                  selectedPeriod === 'week' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-3 py-1 text-sm font-medium border-l ${
                  selectedPeriod === 'month' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setSelectedPeriod('year')}
                className={`px-3 py-1 text-sm font-medium border-l ${
                  selectedPeriod === 'year' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Year
              </button>
            </div>
          </div>
          
          {/* Placeholder for Chart */}
          <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart4 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">
                Application statistics visualization for {selectedPeriod}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                (Chart component would be implemented here)
              </p>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.candidate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(application.status)}`}>
                        {getStatusLabel(application.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(application.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/applications/${application.id}`} className="text-blue-600 hover:text-blue-900">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 text-right">
            <Link to="/applications" className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              View All Applications →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/job-management/create">
              <div className="bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors">
                <BriefcaseIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-blue-900">Post New Job</p>
              </div>
            </Link>
            <Link to="/applications">
              <div className="bg-green-50 p-4 rounded-lg text-center hover:bg-green-100 transition-colors">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-green-900">Review Applications</p>
              </div>
            </Link>
            <Link to="/employer/settings">
              <div className="bg-purple-50 p-4 rounded-lg text-center hover:bg-purple-100 transition-colors">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-purple-900">Schedule Interviews</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </EmployerLayout>
  );
};

export default EmployerDashboardPage;