import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { platformStats, analyticsData } from '@/lib/mock-data';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, Users, Briefcase, Search } from 'lucide-react';

const COLORS = ['hsl(var(--sienna))', 'hsl(var(--slate))', 'hsl(var(--mist))'];

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="mt-1 text-muted-foreground">
          Platform statistics and insights
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="mt-2 text-3xl font-bold text-foreground font-heading">
                {platformStats.totalUsers}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Seekers</p>
              <p className="mt-2 text-3xl font-bold text-foreground font-heading">
                {platformStats.activeJobSeekers}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Job Postings</p>
              <p className="mt-2 text-3xl font-bold text-foreground font-heading">
                {platformStats.totalJobPostings}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm bg-card">
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monthly Growth</p>
              <p className="mt-2 text-3xl font-bold text-sienna font-heading">+29%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Most Searched Roles */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              Most Searched Job Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.mostSearchedRoles}
                  layout="vertical"
                  margin={{ left: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="role"
                    axisLine={false}
                    tickLine={false}
                    width={130}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))',
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="searches" fill="hsl(var(--sienna))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              User Role Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {analyticsData.userDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))',
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span className="text-xs text-muted-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Growth */}
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">
            Platform Growth Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.platformGrowth}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: number) => [`${value} users`, 'Total Users']}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--sienna))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--sienna))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
