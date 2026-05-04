import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SkillBadge } from '@/components/skill-badge';
import { useJobs } from '@/hooks/use-jobs';
import { 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  Globe, 
  GraduationCap, 
  Filter, 
  Loader2, 
  ChevronRight,
  TrendingUp,
  Building2
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function SeekerJobPostings() {
  const { allJobs, isLoading, fetchAllJobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.required_skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [allJobs, searchQuery]);

  const selectedJob = useMemo(() => {
    return allJobs.find(j => j.id === selectedJobId) || (filteredJobs.length > 0 ? filteredJobs[0] : null);
  }, [allJobs, selectedJobId, filteredJobs]);

  useEffect(() => {
    if (!selectedJobId && filteredJobs.length > 0) {
      setSelectedJobId(filteredJobs[0].id);
    }
  }, [filteredJobs, selectedJobId]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6 animate-liquid">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Find Your Next Role</h1>
          <p className="text-muted-foreground">Discover opportunities that match your skills and career goals</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex gap-4 items-center bg-card p-4 rounded-xl border border-border/50 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title, skills, or description..." 
            className="pl-10 border-none bg-muted/50 focus-visible:ring-sienna"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 border-border/50">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left: Job List */}
        <div className="w-full md:w-[400px] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-sienna" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground">No jobs found matching your search.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div 
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer group relative",
                  selectedJobId === job.id 
                    ? "border-sienna bg-sienna/5 shadow-md" 
                    : "border-border/50 bg-card hover:border-sienna/30 hover:shadow-sm"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={cn(
                    "font-bold font-heading truncate pr-4",
                    selectedJobId === job.id ? "text-sienna" : "text-foreground"
                  )}>
                    {job.title}
                  </h3>
                  <TrendingUp className="h-4 w-4 text-sienna opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {job.work_location}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.employment_type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {job.required_skills.slice(0, 3).map(skill => (
                    <SkillBadge key={skill} skill={skill} variant="outlined" size="sm" className="text-[10px] py-0 h-5" />
                  ))}
                  {job.required_skills.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">+{job.required_skills.length - 3}</span>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-border/30 flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">
                    Posted {format(new Date(job.created_at), 'MMM dd')}
                  </span>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    selectedJobId === job.id ? "text-sienna translate-x-1" : "text-muted-foreground"
                  )} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Job Detail View */}
        <div className="hidden md:flex flex-1 flex-col bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
          {selectedJob ? (
            <>
              {/* Detail Header */}
              <div className="p-8 border-b border-border/50 bg-gradient-to-br from-sienna/5 to-transparent">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-sienna/10 px-3 py-1 text-xs font-bold text-sienna uppercase tracking-wider">
                      {selectedJob.employment_type}
                    </div>
                    <h2 className="text-3xl font-bold text-foreground font-heading">{selectedJob.title}</h2>
                    <div className="flex flex-wrap gap-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-sienna" />
                        <span className="capitalize">{selectedJob.work_location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-sienna" />
                        <span className="capitalize">{selectedJob.experience_level} Level</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-sienna" />
                        <span>Posted {format(new Date(selectedJob.created_at), 'MMMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="lg" className="bg-sienna text-warm-white hover:bg-sienna/90 px-10 font-bold shadow-lg shadow-sienna/20">
                    Apply Now
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedJob.required_skills.map(skill => (
                    <SkillBadge key={skill} skill={skill} variant="sienna" size="md" />
                  ))}
                </div>
              </div>

              {/* Detail Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground font-heading">Role Description</h3>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedJob.description}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground font-heading">Key Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {selectedJob.required_skills.map(skill => (
                      <li key={skill}>Proficiency in <span className="text-foreground font-medium">{skill}</span></li>
                    ))}
                    <li>Ability to work in a <span className="text-foreground font-medium capitalize">{selectedJob.work_location}</span> environment</li>
                    <li>Professional experience at a <span className="text-foreground font-medium capitalize">{selectedJob.experience_level}</span> level</li>
                  </ul>
                </section>
                
                <div className="p-6 rounded-xl bg-muted/30 border border-border/50 text-center space-y-3">
                  <h4 className="font-bold text-foreground">Interested in this position?</h4>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Click apply to submit your profile and resume. We'll analyze your skills against this role and notify you of the match score.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center p-12 text-center text-muted-foreground">
              Select a job from the list to view full details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
