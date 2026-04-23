import axiosInstance from '@/lib/axios';
import { UserSignupRequest, UserResponse, LoginRequest, TokenResponse } from '@/lib/types/auth';

export const authService = {
  register: async (data: UserSignupRequest): Promise<UserResponse> => {
    const response = await axiosInstance.post<UserResponse>('/users/', data);
    return response.data;
  },
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await axiosInstance.post<TokenResponse>('/users/login', data);
    return response.data;
  },
  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await axiosInstance.get<UserResponse>('/users/me');
    return response.data;
  },
};
