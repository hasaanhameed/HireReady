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
