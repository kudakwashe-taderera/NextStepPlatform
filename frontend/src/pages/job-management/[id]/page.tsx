import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import EmployerLayout from '@/components/layout/EmployerLayout';
import { Button } from '@/components/ui/Button.tsx';
import { ArrowLeft, Edit, Trash2, User, Calendar, MapPin, Briefcase } from 'lucide-react';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample job data - would come from API in real implementation
  const [job, setJob] = useState({
    id: parseInt(id || '0'),
    title: 'Senior Software Engineer',
    location: 'Remote',
    type: 'Full-time',
    status: 'active',
    postedDate: '2025-05-01T12:00:00Z',
    applications: 15,
    description: 'We are looking for a talented Senior Software Engineer to join our growing team. You will be responsible for developing high-quality software solutions, collaborating with cross-functional teams, and mentoring junior developers.',
    requirements: '• 5+ years of experience in software development\n• Strong proficiency in JavaScript, TypeScript, and React\n• Experience with backend technologies such as Node.js, Django or similar\n• Knowledge of database systems and data modeling\n• Experience with cloud services (AWS, GCP, or Azure)\n• Strong problem-solving skills and attention to detail',
    responsibilities: '• Design, develop, and maintain high-quality software\n• Work closely with product managers to understand requirements\n• Collaborate with cross-functional teams to define, design, and ship new features\n• Identify and resolve performance and scalability issues\n• Mentor junior team members and conduct code reviews\n• Stay updated with emerging trends and technologies',
    salary: '$90,000 - $120,000 per year',
    deadline: '2025-06-15',
    company: 'NeXTStep Technologies',
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real implementation, you would fetch job data from API here
        // const response = await axios.get(`/api/jobs/${id}`);
        // setJob(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      // In a real implementation, you would call API to delete the job
      console.log('Deleting job:', id);
      navigate('/job-management');
    }
  };

  if (isLoading) {
    return (
      <EmployerLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </EmployerLayout>
    );
  }

  return (
    <EmployerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/job-management')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          </div>
          <div className="flex gap-2">
            <Link to={`/job-management/${id}/edit`}>
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleDelete}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(job.status)}`}>
                    {getStatusLabel(job.status)}
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.type}
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Job Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>

                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Responsibilities</h2>
                <p className="text-gray-700 whitespace-pre-line">{job.responsibilities}</p>

                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Requirements</h2>
                <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Posted On</p>
                    <p className="text-gray-900">{formatDate(job.postedDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Application Deadline</p>
                    <p className="text-gray-900">{job.deadline}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Applications</p>
                    <p className="text-gray-900">{job.applications}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Company</p>
                    <p className="text-gray-900">{job.company}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Salary Range</p>
                    <p className="text-gray-900">{job.salary}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link to={`/applications?job=${id}`}>
                  <Button className="w-full justify-start">
                    View Applications
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  Close Job Posting
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmployerLayout>
  );
};

export default JobDetailPage;