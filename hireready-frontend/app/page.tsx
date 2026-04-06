"use client";

import { NavigationProvider, useNavigation } from '@/lib/navigation-context';
import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';

// Pages
import { LandingPage } from '@/components/pages/landing-page';
import { AuthPage } from '@/components/pages/auth-page';

// Seeker Pages
import { SeekerDashboard } from '@/components/pages/seeker/seeker-dashboard';
import { SeekerResume } from '@/components/pages/seeker/seeker-resume';
import { SeekerGapAnalysis } from '@/components/pages/seeker/seeker-gap-analysis';
import { SeekerRoadmap } from '@/components/pages/seeker/seeker-roadmap';
import { SeekerApplications } from '@/components/pages/seeker/seeker-applications';
import { SeekerProfile } from '@/components/pages/seeker/seeker-profile';

// Recruiter Pages
import { RecruiterDashboard } from '@/components/pages/recruiter/recruiter-dashboard';
import { RecruiterPostJob } from '@/components/pages/recruiter/recruiter-post-job';
import { RecruiterPostings } from '@/components/pages/recruiter/recruiter-postings';
import { RecruiterApplicants } from '@/components/pages/recruiter/recruiter-applicants';
import { RecruiterProfile } from '@/components/pages/recruiter/recruiter-profile';

// Admin Pages
import { AdminDashboard } from '@/components/pages/admin/admin-dashboard';
import { AdminUsers } from '@/components/pages/admin/admin-users';
import { AdminPostings } from '@/components/pages/admin/admin-postings';
import { AdminApprovals } from '@/components/pages/admin/admin-approvals';
import { AdminAnalytics } from '@/components/pages/admin/admin-analytics';

function PageRouter() {
  const { currentPage, isLoggedIn, sidebarCollapsed } = useNavigation();

  // Render landing page
  if (currentPage === 'landing') {
    return (
      <>
        <Navbar />
        <LandingPage />
      </>
    );
  }

  // Render auth page
  if (currentPage === 'auth') {
    return (
      <>
        <Navbar />
        <AuthPage />
      </>
    );
  }

  // Render authenticated pages with sidebar
  if (isLoggedIn) {
    const renderPage = () => {
      switch (currentPage) {
        // Seeker pages
        case 'seeker-dashboard':
          return <SeekerDashboard />;
        case 'seeker-resume':
          return <SeekerResume />;
        case 'seeker-gap-analysis':
          return <SeekerGapAnalysis />;
        case 'seeker-roadmap':
          return <SeekerRoadmap />;
        case 'seeker-applications':
          return <SeekerApplications />;
        case 'seeker-profile':
          return <SeekerProfile />;
        // Recruiter pages
        case 'recruiter-dashboard':
          return <RecruiterDashboard />;
        case 'recruiter-post-job':
          return <RecruiterPostJob />;
        case 'recruiter-postings':
          return <RecruiterPostings />;
        case 'recruiter-applicants':
          return <RecruiterApplicants />;
        case 'recruiter-profile':
          return <RecruiterProfile />;
        // Admin pages
        case 'admin-dashboard':
          return <AdminDashboard />;
        case 'admin-users':
          return <AdminUsers />;
        case 'admin-postings':
          return <AdminPostings />;
        case 'admin-approvals':
          return <AdminApprovals />;
        case 'admin-analytics':
          return <AdminAnalytics />;
        default:
          return <SeekerDashboard />;
      }
    };

    return (
      <>
        <Navbar />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <Sidebar />
          <main className={`flex-1 bg-[#F5F5F5] p-4 transition-all md:p-6 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-0'}`}>
            <div className="mx-auto max-w-7xl">
              {renderPage()}
            </div>
          </main>
        </div>
      </>
    );
  }

  // Fallback
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}

export default function Home() {
  return (
    <NavigationProvider>
      <PageRouter />
    </NavigationProvider>
  );
}
