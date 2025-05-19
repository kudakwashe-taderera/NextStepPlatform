// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string | string[]>;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  role: UserRole;
  profile_picture?: string;
  is_active: boolean;
  is_verified: boolean;
  date_joined: string;
  last_login?: string;
}

export enum UserRole {
  O_LEVEL_STUDENT = 'O_LEVEL',
  A_LEVEL_STUDENT = 'A_LEVEL',
  TERTIARY_STUDENT = 'TERTIARY',
  LECTURER = 'LECTURER',
  MENTOR = 'MENTOR',
  EMPLOYER = 'EMPLOYER',
  INSTITUTION_ADMIN = 'INST_ADMIN',
  MINISTRY_ADMIN = 'MIN_ADMIN',
  SUPERUSER = 'SUPERUSER',
  GENERAL_USER = 'GENERAL',
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  full_name: string; 
  email: string;
  password: string;
  confirm_password: string; 
  phone?: string;
  role: UserRole;
  institution?: string;
  school?: string;
  university?: string;
  program?: string;
  company?: string;
  specialization?: string;
  bio?: string;
}
// Validation Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  pattern?: RegExp;
  matches?: string;
  custom?: (value: any) => boolean;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// LMS Types
export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  level: string;
  department: string;
  is_active: boolean;
  lecturer: string;
  lecturer_id: string;
  enrollment_count: number;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  course_title: string;
  title: string;
  description: string;
  order: number;
  is_published: boolean;
}

export interface Assignment {
  id: string;
  course_id: string;
  title: string;
  description: string;
  due_date: string;
  total_points: number;
  is_published: boolean;
  created_at: string;
}

export interface Enrollment {
  id: string;
  course_id: string;
  course_title: string;
  student_id: string;
  student_name: string;
  enrollment_date: string;
  status: string;
  grade?: number;
  completion_date?: string;
}

// Career Types
export interface Subject {
  id: string;
  name: string;
  subject_code: string;
  level: string;
  description: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  address: string;
  description: string;
  website: string;
  logo_url?: string;
}

export interface Program {
  id: string;
  name: string;
  university: string | University;
  university_name?: string;
  degree_type: string;
  description: string;
  duration: number;
  entry_requirements: string;
  subjects_required: Subject[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  skills_required: string;
  sector: string;
  average_salary: string;
  job_outlook: string;
  related_programs: Program[];
}

export interface Recommendation {
  id: string;
  user: string;
  career_path: string;
  career_path_data?: CareerPath;
  score: number;
  reasoning: string;
  created_at: string;
}

// Job Types
export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary_range: string;
  job_type: string;
  application_deadline: string;
  posted_by: string;
  posted_at: string;
  is_active: boolean;
}

export interface JobApplication {
  id: string;
  job: string;
  job_title?: string;
  applicant: string;
  applicant_name?: string;
  cover_letter: string;
  resume_url: string;
  status: string;
  applied_at: string;
  last_updated: string;
}

// Learning Types
export interface LearningResource {
  id: string;
  title: string;
  description: string;
  resource_type: string;
  subject: string;
  subject_name?: string;
  provider: string;
  url: string;
  difficulty_level: string;
  duration_minutes: number;
  is_free: boolean;
  rating: number;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user: string;
  resource: string;
  resource_title?: string;
  status: string;
  progress_percentage: number;
  started_at: string;
  completed_at?: string;
  notes: string;
  rating?: number;
}

// Quiz Types
export interface CareerQuiz {
  id: string;
  title: string;
  description: string;
  created_at: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  order: number;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizResult {
  id: string;
  user: string;
  quiz: string;
  quiz_title?: string;
  answers: Record<string, string>;
  score: Record<string, number>;
  completed_at: string;
}