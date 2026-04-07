import { apiClient } from '../client';
import { UserSignupRequest, UserResponse, LoginRequest, TokenResponse } from '../interface/auth';

export const authApi = {
  register: (data: UserSignupRequest): Promise<UserResponse> => {
    return apiClient('/users/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  login: (data: LoginRequest): Promise<TokenResponse> => {
    return apiClient('/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
