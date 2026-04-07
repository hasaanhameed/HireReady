import { apiClient } from '../client';
import { UserSignupRequest, UserResponse } from '../interface/auth';

export const authApi = {
  register: (data: UserSignupRequest): Promise<UserResponse> => {
    return apiClient('/users/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
