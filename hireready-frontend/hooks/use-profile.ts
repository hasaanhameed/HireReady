import { useState, useEffect, useCallback } from 'react';
import { profileService, ProfileResponse } from '@/services/profile-service';

export function useProfile() {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await profileService.getProfile();
      setData(result);
    } catch (err: any) {
      console.error('Failed to fetch profile:', err);
      setError(err.response?.data?.detail || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    data,
    isLoading,
    error,
    refreshData: fetchProfile
  };
}
