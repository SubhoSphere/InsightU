'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { 
  Loader2, 
  UserCircle, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  AlertTriangle,
  History,
  GraduationCap,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Activity
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- Types ---
interface HistoryPost {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  status: 'ACTIVE' | 'FLAGGED';
}

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [historyPosts, setHistoryPosts] = useState<HistoryPost[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // --- Auth Protection ---
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // --- Mock Historical API Fetch ---
  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        // Mock asynchronous database request to `/api/user/posts`
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data ledger mapping to the current user
        setHistoryPosts([
          {
            id: '101',
            title: 'First-Gen Opportunity Grant Deadline Shifted',
            category: 'SCHOLARSHIP_DEADLINE',
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
            upvotes: 45,
            downvotes: 0,
            status: 'ACTIVE'
          },
          {
            id: '102',
            title: 'Biology 101 Lab Syllabus Error',
            category: 'ACADEMIC_ADMINISTRATION',
            createdAt: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
            upvotes: 12,
            downvotes: 2,
            status: 'ACTIVE'
          },
          {
            id: '103',
            title: 'Free Campus Parking Hack Behind Library',
            category: 'FACULTY_PREFERENCE',
            createdAt: new Date(Date.now() - 86400000 * 45).toISOString(), // 45 days ago
            upvotes: 2,
            downvotes: 18,
            status: 'FLAGGED'
          }
        ]);
        setIsFetching(false);
      };
      fetchHistory();
    }
  }, [user]);

  if (!isAuthenticated || !user) return null;

  // Fallback to 54 for UI demo purposes if reliabilityScore isn't seeded in Redux yet
  const displayScore = (user as any).reliabilityScore ?? 54; 

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center">
          <UserCircle className="w-8 h-8 mr-3 text-primary" />
          Operator Profile
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Track your institutional identity and gamified trust metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* --- LEFT COLUMN: IDENTITY & TRUST METRICS --- */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Identity Card */}
          <div className="bg-card/40 backdrop-blur-md border border-border p-6 rounded-2xl shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-2xl uppercase shadow-inner">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground font-mono">{user.email}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2" /> Role Tier
                </span>
                <Badge variant={user.role === 'VERIFIED_SENIOR' ? 'default' : 'secondary'} className="font-mono tracking-wider">
                  {user.role.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" /> Institution
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {user.email.split('@')[1] || 'Verified Domain'}
                </span>
              </div>
            </div>
          </div>

          {/* Gamified Trust Score Card */}
          <div className="bg-card/40 backdrop-blur-md border border-border p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center">
              <Activity className="w-4 h-4 mr-2" /> Global Trust Index
            </h3>
            
            <div className="flex items-end justify-between mb-4">
              <div className="flex items-baseline space-x-1">
                <span className={cn(
                  "text-6xl font-black tracking-tighter",
                  displayScore >= 50 ? "text-green-500" : displayScore < 0 ? "text-destructive" : "text-foreground"
                )}>
                  {displayScore}
                </span>
                <span className="text-xl text-muted-foreground font-bold">PTS</span>
              </div>
            </div>

            {displayScore >= 50 ? (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center">
                <Award className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm font-bold text-green-500">Elite Contributor Tier</span>
              </div>
            ) : displayScore < 0 ? (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center">
                <AlertTriangle className="w-5 h-5 text-destructive mr-2" />
                <span className="text-sm font-bold text-destructive">Account Under Review</span>
              </div>
            ) : (
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center">
                <TrendingUp className="w-5 h-5 text-primary mr-2" />
                <span className="text-sm font-bold text-primary">Standard Standing</span>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Your Trust Index fluctuates based on peer-verification upvotes and automated purge algorithms. High scores grant increased feed visibility.
            </p>
          </div>

        </div>

        {/* --- RIGHT COLUMN: PERSONAL HISTORY LEDGER --- */}
        <div className="lg:col-span-8">
          <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl p-6 sm:p-8 shadow-xl min-h-[600px]">
            <h2 className="text-2xl font-bold flex items-center text-foreground mb-6">
              <History className="w-6 h-6 mr-3 text-primary" />
              Intelligence Ledger
            </h2>

            {isFetching ? (
              <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                <p className="font-mono text-sm tracking-widest uppercase">Syncing Database...</p>
              </div>
            ) : historyPosts.length === 0 ? (
              <div className="text-center py-24 border-2 border-dashed border-border rounded-xl">
                <History className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-xl font-bold text-foreground">No History Found</h3>
                <p className="text-muted-foreground mt-2">You haven't contributed any intelligence to the network yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {historyPosts.map(post => (
                  <div 
                    key={post.id} 
                    className={cn(
                      "relative border p-5 rounded-xl transition-all overflow-hidden",
                      post.status === 'FLAGGED' ? "bg-destructive/5 border-destructive/20 opacity-80" : "bg-background/50 border-border hover:shadow-md"
                    )}
                  >
                    {/* FLAGGED BANNER */}
                    {post.status === 'FLAGGED' && (
                      <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-[10px] font-bold px-3 py-1 uppercase tracking-widest flex items-center rounded-bl-lg">
                        <Flag className="w-3 h-3 mr-1" />
                        Flagged by Community
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      
                      {/* Meta & Title */}
                      <div className="space-y-2 flex-1">
                        <Badge variant="outline" className="text-xs bg-background/50 text-muted-foreground">
                          {post.category.replace('_', ' ')}
                        </Badge>
                        <h3 className={cn(
                          "text-lg font-bold leading-tight",
                          post.status === 'FLAGGED' ? "text-destructive line-through decoration-destructive/50" : "text-foreground"
                        )}>
                          {post.title}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground font-medium pt-1">
                          <Calendar className="w-3.5 h-3.5 mr-1.5" />
                          {new Date(post.createdAt).toLocaleDateString(undefined, { 
                            year: 'numeric', month: 'short', day: 'numeric' 
                          })}
                        </div>
                      </div>

                      {/* Mini Analytics Panel */}
                      <div className="flex items-center gap-3 bg-secondary/50 p-2.5 rounded-lg border border-border/50 shrink-0">
                        <div className="flex items-center text-sm font-bold text-green-500">
                          <ThumbsUp className="w-4 h-4 mr-1.5" />
                          {post.upvotes}
                        </div>
                        <div className="w-px h-4 bg-border" />
                        <div className="flex items-center text-sm font-bold text-destructive">
                          <ThumbsDown className="w-4 h-4 mr-1.5" />
                          {post.downvotes}
                        </div>
                      </div>

                    </div>
                    
                    {post.status === 'FLAGGED' && (
                      <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-xs text-destructive flex items-start">
                        <AlertTriangle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                        <p>This post dropped below the -5 absolute threshold and was purged from the active global feed. Submitting flagged content severely damages your global Trust Index.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
