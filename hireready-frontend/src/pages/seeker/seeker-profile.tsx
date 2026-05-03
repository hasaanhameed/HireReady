import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillBadge } from '@/components/skill-badge';
import { useProfile } from '@/hooks/use-profile';
import { Target, FileText, Calendar, Loader2 } from 'lucide-react';

export function SeekerProfile() {
  const { data, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 animate-liquid">
        <Loader2 className="h-8 w-8 animate-spin text-sienna" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Retrieving your profile...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{error || "Failed to load profile"}</p>
      </div>
    );
  }

  const userName = data.name || 'User';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="space-y-6 animate-liquid">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile and track your progress
        </p>
      </div>

      {/* Profile Header */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sienna/10 border-2 border-sienna/20">
              <span className="text-3xl font-bold text-sienna">{initials}</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground font-heading">
                {userName}
              </h2>
              <div className="mt-2 flex flex-col items-center gap-2 md:flex-row md:items-start">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Target className="h-4 w-4 text-sienna" />
                  <span className="text-sm">{data.target_role || "No Target Role Set"}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold text-sienna">
                    {data.match_score}%
                  </p>
                  <p className="text-xs text-muted-foreground">Match Score</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {data.skills_count}
                  </p>
                  <p className="text-xs text-muted-foreground">Skills</p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {data.resumes_count}
                  </p>
                  <p className="text-xs text-muted-foreground">Resumes</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {/* Current Skills */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground font-heading">
              Current Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} variant="filled" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No skills extracted yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resume Upload History */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground font-heading">
            Resume Upload History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.resume_history.length > 0 ? (
            <div className="space-y-3">
              {data.resume_history.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-lg border border-border bg-background p-4 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
                    <FileText className="h-5 w-5 text-sienna" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.filename || 'Unnamed Resume'}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="rounded-full bg-sienna/10 text-sienna border border-sienna/20 px-2 py-0.5 text-xs font-medium">
                      Current
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">No resume history found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
