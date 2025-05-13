import axios from 'axios';

// Auth Endpoints
export const loginUser = (credentials) => {
  return axios.post('/api/auth/login/', credentials);
};

export const registerUser = (userData) => {
  return axios.post('/api/auth/register/', userData);
};

export const logoutUser = () => {
  return axios.post('/api/auth/logout/');
};

export const fetchCurrentUser = () => {
  return axios.get('/api/auth/user/');
};

// LMS Endpoints
export const fetchCourses = (filters = {}) => {
  return axios.get('/api/lms/courses/', { params: filters });
};

export const fetchCourseDetails = (courseId) => {
  return axios.get(`/api/lms/courses/${courseId}/`);
};

// Career Endpoints
export const fetchCareerPaths = (filters = {}) => {
  return axios.get('/api/career/paths/', { params: filters });
};

export const fetchCareerPathDetails = (pathId) => {
  return axios.get(`/api/career/paths/${pathId}/`);
};

export const fetchUserRecommendations = () => {
  return axios.get('/api/career/recommendations/');
};

// Jobs Endpoints
export const fetchJobs = (filters = {}) => {
  return axios.get('/api/jobs/listings/', { params: filters });
};

export const fetchJobDetails = (jobId) => {
  return axios.get(`/api/jobs/listings/${jobId}/`);
};

// Learning Resources Endpoints
export const fetchLearningResources = (filters = {}) => {
  return axios.get('/api/learning/resources/', { params: filters });
};

export const fetchResourceDetails = (resourceId) => {
  return axios.get(`/api/learning/resources/${resourceId}/`);
};