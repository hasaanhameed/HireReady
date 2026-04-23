export type UserRole = 'job-seeker' | 'recruiter' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinDate: string;
  status: 'active' | 'suspended';
}

export interface JobSeeker extends User {
  role: 'job-seeker';
  targetRole: string;
  location: string;
  currentSkills: string[];
  matchScore: number;
  resumeHistory: { date: string; filename: string }[];
}

export interface Recruiter extends User {
  role: 'recruiter';
  companyName: string;
  companyLogo?: string;
  workEmail: string;
}

export interface Admin extends User {
  role: 'admin';
}

export interface Skill {
  name: string;
  importance: number;
  category?: string;
}

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  jobType: 'full-time' | 'part-time' | 'contract' | 'remote';
  recruiterId: string;
  companyName: string;
  postedDate: string;
  applicantCount: number;
  avgMatchScore: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobSeekerId: string;
  seekerName: string;
  matchScore: number;
  skillsMatch: string[];
  missingSkills: string[];
  applyDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}

export interface LearningResource {
  id: string;
  skill: string;
  title: string;
  provider: string;
  duration: string;
  url: string;
  type: 'course' | 'tutorial' | 'certification';
}

export interface GapAnalysis {
  targetRole: string;
  overallMatch: number;
  skillsYouHave: string[];
  skillsMissing: Skill[];
}

export interface PlatformStats {
  totalUsers: number;
  activeJobSeekers: number;
  pendingRecruiterApprovals: number;
  totalJobPostings: number;
}
