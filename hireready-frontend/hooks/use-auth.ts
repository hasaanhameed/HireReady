import { useState } from 'react';
import { useNavigation } from '@/lib/navigation-context';
import { authService } from '@/services/auth-service';
import type { LoginRequest, UserSignupRequest, UserResponse } from '@/lib/types/auth';

export function useAuth() {
  const { login: navLogin, logout: navLogout } = useNavigation();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      localStorage.setItem('auth_token', response.access_token);

      // Fetch user profile after login to get full details
      const userData = await authService.getCurrentUser();
      setUser(userData);

      // Update global navigation state
      navLogin(response.access_token);
      return userData;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: UserSignupRequest) => {
    setIsLoading(true);
    try {
      return await authService.register(data);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    navLogout();
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout
  };
}
