'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart, 
    Pie, 
    Cell 
} from 'recharts';
import { 
    Activity, 
    Users, 
    ShieldCheck, 
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Clock,
    FileText,
    CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

// --- Mock Data for Charts ---
const pulseData = [
  { day: 'Mon', contributions: 12 },
  { day: 'Tue', contributions: 28 },
  { day: 'Wed', contributions: 15 },
  { day: 'Thu', contributions: 45 },
  { day: 'Fri', contributions: 35 },
  { day: 'Sat', contributions: 20 },
  { day: 'Sun', contributions: 55 },
];

const categoryData = [
  { name: 'Faculty Pref', value: 35 },
  { name: 'Scholarships', value: 25 },
  { name: 'Recruitment', value: 25 },
  { name: 'Admin Policies', value: 15 },
];
// Beautiful vibrant colors for the pie chart
// Beautiful theme-aware colors for the pie chart
const COLORS = [
  'hsl(var(--primary))',
  'oklch(0.6801 0.1583 276.9349 / 0.8)',
  'oklch(0.5106 0.2301 276.9656 / 0.65)',
  'oklch(0.4568 0.2146 277.0229 / 0.5)'
];

// --- Mock Data for Table ---
const recentActivity = [
  { id: 1, author: 'Alex Rodriguez', role: 'VERIFIED_SENIOR', category: 'Scholarships', title: 'Opportunity Grant Shift', status: 'Verified', date: '2 hours ago' },
  { id: 2, author: 'Sarah Jenkins', role: 'VERIFIED_SENIOR', category: 'Faculty Pref', title: 'OS Midterm Format Change', status: 'Pending', date: '5 hours ago' },
  { id: 3, author: 'Mike Chen', role: 'FRESHER', category: 'Recruitment', title: 'Consulting Club Timeline', status: 'Verified', date: '1 day ago' },
  { id: 4, author: 'Emily Carter', role: 'VERIFIED_SENIOR', category: 'Admin Policies', title: 'Capstone Prerequisite Enforcement', status: 'Flagged', date: '2 days ago' },
];

export default function DashboardOverviewPage() {
    const { user, token } = useAppSelector((state) => state.auth);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration errors with recharts
    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch live statistics with React Query
    const { data: statsData, isLoading: isLoadingStats } = useQuery({
        queryKey: ['dashboard-overview-stats', token],
        queryFn: async () => {
            if (!token) return null;
            const res = await fetch('http://localhost:5000/api/stats/overview', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Failed to fetch overview stats.');
            return json.data;
        },
        enabled: !!token,
    });

    // Map dynamic and resilient metrics
    const liveTotalIntel = statsData?.metrics?.totalIntel ?? 0;
    const liveActiveSeniors = statsData?.metrics?.activeSeniors ?? 0;
    const liveReliabilityScore = statsData?.metrics?.reliabilityScore ?? user?.reliabilityScore ?? 0;
    const livePendingReviews = statsData?.metrics?.pendingReviews ?? 0;

    const livePulseData = statsData?.pulseData && statsData.pulseData.length > 0 ? statsData.pulseData : pulseData;
    
    // Check if categoryData is empty or not yet initialized
    const isCategoryEmpty = !statsData?.categoryData || statsData.categoryData.reduce((sum: number, item: any) => sum + item.value, 0) === 0;
    const liveCategoryData = isCategoryEmpty ? categoryData : statsData.categoryData;

    const liveRecentActivity = statsData?.recentActivity && statsData.recentActivity.length > 0 ? statsData.recentActivity : recentActivity;

    // Get the first name or fallback, guarded by mount state to prevent hydration errors
    const firstName = mounted && user?.name ? user.name.split(' ')[0] : 'Operator';

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    Hello, {firstName} <span className="inline-block animate-wave">👋</span>
                </h2>
                <p className="text-muted-foreground text-sm max-w-md">
                    Here is your campus intelligence summary for today.
                </p>
            </div>

            {/* Metrics Top Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                
                {/* Card 1: Total Intel */}
                <div className="bg-card/40 backdrop-blur-md border border-border rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">Total Intel Shared</p>
                        <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-4xl font-extrabold text-foreground tracking-tight">
                            {liveTotalIntel.toLocaleString()}
                        </span>
                        <p className="text-xs text-emerald-500 font-bold flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Live curriculum grid
                        </p>
                    </div>
                </div>

                {/* Card 2: Verified Seniors */}
                <div className="bg-card/40 backdrop-blur-md border border-border rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">Active Seniors</p>
                        <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-4xl font-extrabold text-foreground tracking-tight">
                            {liveActiveSeniors}
                        </span>
                        <p className="text-xs text-emerald-500 font-bold flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Upperclassmen & guides
                        </p>
                    </div>
                </div>

                {/* Card 3: Trust Index */}
                <div className="bg-card/40 backdrop-blur-md border border-border rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                    <div className="flex items-center justify-between space-y-0 pb-2 relative z-10">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">Your Trust Index</p>
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="flex flex-col mt-2 relative z-10">
                        <span className="text-4xl font-extrabold text-foreground tracking-tight">
                            {liveReliabilityScore}
                            <span className="text-sm font-semibold text-muted-foreground ml-1">pts</span>
                        </span>
                        <p className="text-xs text-emerald-500 font-bold flex items-center mt-1">
                            {liveReliabilityScore >= 80 ? 'Elite Verification Tier' : 'Standard Peer Tier'}
                        </p>
                    </div>
                </div>

                {/* Card 4: Flagged Content */}
                <div className="bg-card/40 backdrop-blur-md border border-border rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider font-mono">Pending Reviews</p>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-4xl font-extrabold text-foreground tracking-tight">
                            {livePendingReviews}
                        </span>
                        <p className="text-xs text-amber-500 font-bold flex items-center mt-1">
                            Needs peer moderation
                        </p>
                    </div>
                </div>

            </div>

            {/* Charts Middle Row */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                
                {/* Area Chart: Intelligence Pulse */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-card/40 backdrop-blur-md border border-border rounded-[20px] p-6 shadow-sm">
                    <div className="mb-4">
                        <h3 className="text-base font-extrabold text-foreground uppercase tracking-wider font-mono text-xs text-primary mb-1">Network Contribution Pulse</h3>
                        <p className="text-xs text-muted-foreground">Intelligence volume over the last 7 days</p>
                    </div>
                    <div className="h-[280px] w-full">
                        {mounted && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={livePulseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35}/>
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis 
                                        dataKey="day" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="contributions" 
                                        stroke="var(--primary)" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorPulse)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Pie Chart: Intel Categories */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card/40 backdrop-blur-md border border-border rounded-[20px] p-6 shadow-sm flex flex-col">
                    <div className="mb-2">
                        <h3 className="text-base font-extrabold text-foreground uppercase tracking-wider font-mono text-xs text-primary mb-1">Intelligence by Category</h3>
                        <p className="text-xs text-muted-foreground">Distribution of total active grid posts</p>
                    </div>
                    <div className="flex-1 h-[220px] w-full relative">
                        {mounted && (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={liveCategoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {liveCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                        {/* Center Text for Donut Chart */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                            <span className="text-2xl font-black text-foreground">100%</span>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Coverage</span>
                        </div>
                    </div>
                    {/* Custom Legend */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border/50">
                        {liveCategoryData.map((item, index) => (
                            <div key={item.name} className="flex items-center">
                                <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-xs text-muted-foreground font-semibold">{item.name}</span>
                                <span className="ml-auto text-xs font-bold text-foreground">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
