import { Skill } from './job';

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

export interface GapAnalysis {
  targetRole: string;
  overallMatch: number;
  skillsYouHave: string[];
  skillsMissing: Skill[];
}
