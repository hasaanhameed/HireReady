import axiosInstance from '@/lib/axios';

export interface MissingSkillDashboard {
  name: string;
  importance: number;
}

export interface DashboardResponse {
  match_score: number;
  target_role?: string;
  completed_steps: number;
  total_steps: number;
  top_missing_skills: MissingSkillDashboard[];
  recent_applications_count: number;
}

export const dashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await axiosInstance.get<DashboardResponse>('/dashboard/me');
    return response.data;
  }
};
