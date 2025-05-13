import React, { useState } from 'react';
import EmployerLayout from '@/components/layout/EmployerLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button.tsx';
import { 
  Briefcase, 
  Plus, 
  Search,
  ChevronRight,
  Filter,
} from 'lucide-react';

const JobManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Sample data - would come from API in real implementation
  const jobPostings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      location: 'Remote',
      type: 'Full-time',
      status: 'active',
      postedDate: '2025-05-01T12:00:00Z',
      applications: 15
    },
    {
      id: 2,
      title: 'Frontend Developer',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      status: 'active',
      postedDate: '2025-05-03T12:00:00Z',
      applications: 8
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      location: 'Hybrid',
      type: 'Contract',
      status: 'draft',
      postedDate: '2025-05-05T12:00:00Z',
      applications: 0
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      location: 'Nairobi, Kenya',
      type: 'Part-time',
      status: 'closed',
      postedDate: '2025-04-15T12:00:00Z',
      applications: 12
    },
    {
      id: 5,
      title: 'Product Manager',
      location: 'Remote',
      type: 'Full-time',
      status: 'active',
      postedDate: '2025-04-28T12:00:00Z',
      applications: 7
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'draft': return 'Draft';
      case 'closed': return 'Closed';
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
  
  const filteredJobs = jobPostings
    .filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(job => statusFilter === 'all' ? true : job.status === statusFilter);
  
  return (
    <EmployerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <Link to="/job-management/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Job
            </Button>
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search jobs by title, location, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="md:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                            <Briefcase className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                          {getStatusLabel(job.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(job.postedDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.applications}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/job-management/${job.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                          View
                        </Link>
                        <Link to={`/job-management/${job.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                      No job postings found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </EmployerLayout>
  );
};

export default JobManagementPage;