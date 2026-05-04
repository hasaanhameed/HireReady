import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth-service';
import { UserResponse } from './types/auth';

export type Role = 'job-seeker' | 'recruiter' | 'admin';

export type Page = 
  | 'landing' 
  | 'auth'
  // Seeker pages
  | 'seeker-dashboard'
  | 'seeker-resume'
  | 'seeker-gap-analysis'
  | 'seeker-roadmap'
  | 'seeker-applications'
  | 'seeker-job-postings'
  | 'seeker-profile'
  // Recruiter pages
  | 'recruiter-dashboard'
  | 'recruiter-post-job'
  | 'recruiter-postings'
  | 'recruiter-applicants'
  | 'recruiter-profile'
  // Admin pages
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-postings'
  | 'admin-approvals'
  | 'admin-analytics';

interface NavigationContextType {
  currentPage: Page;
  currentRole: Role | null;
  userData: UserResponse | null;
  isLoggedIn: boolean;
  sidebarCollapsed: boolean;
  pageParams: any;
  navigate: (page: Page, params?: any) => void;
  login: (token: string, role: Role) => void;
  logout: () => void;
  toggleSidebar: () => void;
  refreshUser: () => Promise<void>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageParams, setPageParams] = useState<any>(null);

  const refreshUser = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      setUserData(user);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    }
  }, []);

  // Check for stored auth on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role') as Role;
    const lastPage = localStorage.getItem('last_page') as Page;

    if (token && role) {
      setIsLoggedIn(true);
      setCurrentRole(role);
      refreshUser();
      if (lastPage && lastPage !== 'auth') {
        setCurrentPage(lastPage);
      } else {
        setCurrentPage(role === 'job-seeker' ? 'seeker-dashboard' : role === 'recruiter' ? 'recruiter-dashboard' : 'admin-dashboard');
      }
    }
  }, [refreshUser]);

  const navigate = (page: Page, params: any = null) => {
    setCurrentPage(page);
    setPageParams(params);
    localStorage.setItem('last_page', page);
    window.scrollTo(0, 0);
  };

  const login = (token: string, role: Role) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_role', role);
    setIsLoggedIn(true);
    setCurrentRole(role);
    refreshUser();
    navigate(role === 'job-seeker' ? 'seeker-dashboard' : role === 'recruiter' ? 'recruiter-dashboard' : 'admin-dashboard');
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('last_page');
    setIsLoggedIn(false);
    setCurrentRole(null);
    setUserData(null);
    setCurrentPage('landing');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <NavigationContext.Provider 
      value={{ 
        currentPage, 
        currentRole, 
        userData,
        isLoggedIn, 
        sidebarCollapsed, 
        pageParams,
        navigate, 
        login, 
        logout,
        toggleSidebar,
        refreshUser
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
