import { useEffect } from 'react';
import { useNavigation } from '@/lib/navigation-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SkillBadge } from '@/components/skill-badge';
import { useJobs } from '@/hooks/use-jobs';
import { Plus, Users, TrendingUp, Calendar, MoreHorizontal, Loader2, Globe, Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export function RecruiterPostings() {
  const { navigate } = useNavigation();
  const { postings, isLoading, fetchMyPostings } = useJobs();

  useEffect(() => {
    fetchMyPostings();
  }, [fetchMyPostings]);

  return (
    <div className="space-y-6 animate-liquid">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Job Postings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage all your active job postings
          </p>
        </div>
        <Button
          className="bg-sienna text-warm-white hover:bg-sienna/90 cursor-pointer"
          onClick={() => navigate('recruiter-post-job')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-sienna" />
        </div>
      ) : postings.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
          <div className="mb-4 rounded-full bg-sienna/10 p-4">
            <Briefcase className="h-8 w-8 text-sienna" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No job postings yet</h3>
          <p className="mt-2 max-w-sm text-muted-foreground">
            You haven't posted any jobs. Create your first posting to start receiving applications.
          </p>
          <Button
            className="mt-6 bg-sienna text-warm-white hover:bg-sienna/90"
            onClick={() => navigate('recruiter-post-job')}
          >
            Post Your First Job
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {postings.map((job) => (
            <Card key={job.id} className="border-border/50 shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-foreground font-heading">
                      {job.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 capitalize">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {job.experience_level === 'junior' ? 'Junior Level' : 
                         job.experience_level === 'senior' ? 'Senior Level' : 
                         job.experience_level === 'mid' ? 'Mid Level' : 
                         `${job.experience_level} Level`}
                      </span>
                      <span className="flex items-center gap-1 capitalize">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.employment_type}
                      </span>
                      <span className="flex items-center gap-1 capitalize">
                        <Globe className="h-3.5 w-3.5 text-sienna" />
                        {job.work_location}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground cursor-pointer">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats Row */}
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-sienna" />
                    <span className="text-sm text-foreground">
                      <strong className="text-foreground">0</strong> <span className="text-muted-foreground">applicants</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-sienna" />
                    <span className="text-sm text-foreground">
                      <strong className="text-foreground">0%</strong> <span className="text-muted-foreground">avg match</span>
                    </span>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {job.required_skills.slice(0, 5).map((skill) => (
                      <SkillBadge key={skill} skill={skill} variant="outlined" size="sm" />
                    ))}
                    {job.required_skills.length > 5 && (
                      <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground bg-muted/30">
                        +{job.required_skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-sienna" />
                    <span>Posted {format(new Date(job.created_at), 'MMM dd, yyyy')}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-foreground hover:bg-muted cursor-pointer"
                    onClick={() => navigate('recruiter-applicants')}
                  >
                    View Applicants
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
