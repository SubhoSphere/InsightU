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
const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

// --- Mock Data for Table ---
const recentActivity = [
  { id: 1, author: 'Alex Rodriguez', role: 'VERIFIED_SENIOR', category: 'Scholarships', title: 'Opportunity Grant Shift', status: 'Verified', date: '2 hours ago' },
  { id: 2, author: 'Sarah Jenkins', role: 'VERIFIED_SENIOR', category: 'Faculty Pref', title: 'OS Midterm Format Change', status: 'Pending', date: '5 hours ago' },
  { id: 3, author: 'Mike Chen', role: 'FRESHER', category: 'Recruitment', title: 'Consulting Club Timeline', status: 'Verified', date: '1 day ago' },
  { id: 4, author: 'Emily Carter', role: 'VERIFIED_SENIOR', category: 'Admin Policies', title: 'Capstone Prerequisite Enforcement', status: 'Flagged', date: '2 days ago' },
];

export default function DashboardOverviewPage() {
    const { user } = useAppSelector((state) => state.auth);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration errors with recharts
    useEffect(() => {
        setMounted(true);
    }, []);

    // Get the first name or fallback
    const firstName = user?.name ? user.name.split(' ')[0] : 'Operator';

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    Hello, {firstName} <span className="inline-block animate-wave">👋</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                    Here is your campus intelligence summary for today.
                </p>
            </div>

            {/* Metrics Top Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                
                {/* Card 1: Total Intel */}
                <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-sm font-medium text-muted-foreground tracking-wide">Total Intel Shared</p>
                        <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-4xl font-bold text-foreground">1,248</span>
                        <p className="text-xs text-green-500 font-medium flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12% from last month
                        </p>
                    </div>
                </div>

                {/* Card 2: Verified Seniors */}
                <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-sm font-medium text-muted-foreground tracking-wide">Active Verified Seniors</p>
                        <Users className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-4xl font-bold text-foreground">342</span>
                        <p className="text-xs text-green-500 font-medium flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +4 new this week
                        </p>
                    </div>
                </div>

                {/* Card 3: Trust Index */}
                <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                    <div className="flex items-center justify-between space-y-0 pb-2 relative z-10">
                        <p className="text-sm font-medium text-muted-foreground tracking-wide">Your Trust Index</p>
                        <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col mt-2 relative z-10">
                        <span className="text-4xl font-bold text-foreground">94<span className="text-xl text-muted-foreground">/100</span></span>
                        <p className="text-xs text-green-500 font-medium flex items-center mt-1">
                            Elite Verification Tier
                        </p>
                    </div>
                </div>

                {/* Card 4: Flagged Content */}
                <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-sm font-medium text-muted-foreground tracking-wide">Pending Reviews</p>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-4xl font-bold text-foreground">14</span>
                        <p className="text-xs text-orange-500 font-medium flex items-center mt-1">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            Needs peer moderation
                        </p>
                    </div>
                </div>

            </div>

            {/* Charts Middle Row */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                
                {/* Area Chart: Intelligence Pulse (Spans 4 cols on large screens) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Network Contribution Pulse</h3>
                        <p className="text-sm text-muted-foreground">Intelligence volume over the last 7 days</p>
                    </div>
                    <div className="h-[300px] w-full">
                        {mounted && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={pulseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis 
                                        dataKey="day" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="contributions" 
                                        stroke="#3b82f6" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorPulse)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Pie Chart: Intel Categories (Spans 3 cols on large screens) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="mb-2">
                        <h3 className="text-lg font-semibold text-foreground">Intelligence by Category</h3>
                        <p className="text-sm text-muted-foreground">Distribution of total active grid posts</p>
                    </div>
                    <div className="flex-1 h-[250px] w-full relative">
                        {mounted && (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={95}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {categoryData.map((entry, index) => (
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
                            <span className="text-3xl font-bold text-foreground">100%</span>
                            <span className="text-xs text-muted-foreground">Coverage</span>
                        </div>
                    </div>
                    {/* Custom Legend */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border/50">
                        {categoryData.map((item, index) => (
                            <div key={item.name} className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
                                <span className="ml-auto text-xs font-bold text-foreground">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Data Table Bottom Row */}
            <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Recent Network Activity</h3>
                        <p className="text-sm text-muted-foreground">Latest intelligence submitted to the grid.</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/20 border-b border-border/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Author Profile</th>
                                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Intelligence Target</th>
                                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-4 font-medium tracking-wider text-right">Verification Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {recentActivity.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                                {item.author.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-foreground flex items-center gap-1">
                                                    {item.author}
                                                    {item.role === 'VERIFIED_SENIOR' && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
                                                </div>
                                                <div className="text-xs text-muted-foreground truncate">{item.role.replace('_', ' ')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-foreground">{item.title}</div>
                                        <div className="text-xs text-muted-foreground mt-1 flex items-center">
                                            <FileText className="w-3 h-3 mr-1" />
                                            {item.category}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        <div className="flex items-center">
                                            <Clock className="w-3.5 h-3.5 mr-1" />
                                            {item.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Badge variant="outline" className={cn(
                                            "border",
                                            item.status === 'Verified' && "bg-green-500/10 text-green-500 border-green-500/20",
                                            item.status === 'Pending' && "bg-orange-500/10 text-orange-500 border-orange-500/20",
                                            item.status === 'Flagged' && "bg-destructive/10 text-destructive border-destructive/20"
                                        )}>
                                            {item.status === 'Verified' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                            {item.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                                            {item.status === 'Flagged' && <AlertCircle className="w-3 h-3 mr-1" />}
                                            {item.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
