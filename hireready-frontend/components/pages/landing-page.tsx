"use client";

import { useNavigation } from '@/lib/navigation-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, BarChart3, BookOpen, Upload, Search, Users, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Skill Gap Analysis',
    description: 'Upload your resume and see exactly which skills you need to land your target role.',
  },
  {
    icon: BookOpen,
    title: 'Learning Roadmap',
    description: 'Get a personalized learning path with curated resources to bridge your skill gaps.',
  },
  {
    icon: BarChart3,
    title: 'Match Scoring',
    description: 'See your compatibility score with job postings and track your progress over time.',
  },
];

const seekerSteps = [
  { step: 1, title: 'Upload Resume', description: 'Add your current resume to extract your skills' },
  { step: 2, title: 'Choose Target Role', description: 'Select the job role you want to pursue' },
  { step: 3, title: 'View Gap Analysis', description: 'See which skills you have and which you need' },
  { step: 4, title: 'Follow Roadmap', description: 'Learn missing skills with curated resources' },
  { step: 5, title: 'Apply with Confidence', description: 'Apply to jobs knowing your match score' },
];

const recruiterSteps = [
  { step: 1, title: 'Create Account', description: 'Sign up as a recruiter with your company details' },
  { step: 2, title: 'Post Job Openings', description: 'Add required skills and job requirements' },
  { step: 3, title: 'Review Applicants', description: 'See candidates ranked by skill match score' },
  { step: 4, title: 'Identify Gaps', description: 'Understand what skills candidates are missing' },
  { step: 5, title: 'Make Better Hires', description: 'Hire candidates with the right skill fit' },
];

export function LandingPage() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-[#1C1C1E] px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Know exactly what&apos;s standing between you and your dream job
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-[#9CA3AF] md:text-xl">
            Upload your resume, choose your target role, and get a detailed skill gap analysis with a personalized learning roadmap to close the gap.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-white text-[#1C1C1E] hover:bg-gray-200 sm:w-auto"
              onClick={() => navigate('auth')}
            >
              Get Started as Job Seeker
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white bg-transparent text-white hover:bg-white/10 sm:w-auto"
              onClick={() => navigate('auth')}
            >
              Post a Job as Recruiter
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-[#1C1C1E]">
            Bridge the gap between where you are and where you want to be
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-none shadow-sm">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F3F4F6]">
                    <feature.icon className="h-6 w-6 text-[#6B7280]" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#1C1C1E]">{feature.title}</h3>
                  <p className="mt-3 text-[#6B7280]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-[#F5F5F5] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-[#1C1C1E]">How it works</h2>

          {/* Job Seeker Flow */}
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D2D2D]">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1C1E]">For Job Seekers</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {seekerSteps.map((item, index) => (
                <div key={item.step} className="relative">
                  <Card className="h-full border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1C1C1E] text-sm font-bold text-white">
                        {item.step}
                      </div>
                      <h4 className="mt-4 font-semibold text-[#1C1C1E]">{item.title}</h4>
                      <p className="mt-2 text-sm text-[#6B7280]">{item.description}</p>
                    </CardContent>
                  </Card>
                  {index < seekerSteps.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                      <ArrowRight className="h-4 w-4 text-[#9CA3AF]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Flow */}
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D2D2D]">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1C1E]">For Recruiters</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-5">
              {recruiterSteps.map((item, index) => (
                <div key={item.step} className="relative">
                  <Card className="h-full border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1C1C1E] text-sm font-bold text-white">
                        {item.step}
                      </div>
                      <h4 className="mt-4 font-semibold text-[#1C1C1E]">{item.title}</h4>
                      <p className="mt-2 text-sm text-[#6B7280]">{item.description}</p>
                    </CardContent>
                  </Card>
                  {index < recruiterSteps.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                      <ArrowRight className="h-4 w-4 text-[#9CA3AF]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1C1C1E] px-4 py-20 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white">Ready to bridge your skill gap?</h2>
          <p className="mt-4 text-[#9CA3AF]">
            Join thousands of job seekers who have accelerated their careers with HireReady.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-white text-[#1C1C1E] hover:bg-gray-200"
            onClick={() => navigate('auth')}
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] bg-white px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C1C1E]">
                <span className="text-sm font-bold text-white">HR</span>
              </div>
              <span className="text-lg font-semibold text-[#1C1C1E]">HireReady</span>
            </div>
            <p className="text-sm text-[#6B7280]">
              2024 HireReady. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
