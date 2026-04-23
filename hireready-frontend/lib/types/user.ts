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
