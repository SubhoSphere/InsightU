'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  ArrowUp,
  ArrowDown,
  Paperclip,
  ShieldCheck,
  GraduationCap,
  AlertTriangle,
  Clock,
  TrendingUp,
  Activity,
  Filter,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Types & Interfaces ---
type Urgency = 'LOW' | 'MEDIUM' | 'CRITICAL';
type Category = 'FACULTY_PREFERENCE' | 'SCHOLARSHIP_DEADLINE' | 'RECRUITMENT_PIPELINE' | 'ACADEMIC_ADMINISTRATION' | 'ALL';

interface IntelligencePost {
  id: string;
  authorName: string;
  authorRole: 'FRESHER' | 'VERIFIED_SENIOR';
  credibilityScore: number;
  category: Category;
  branchTag: string;
  urgency: Urgency;
  title: string;
  description: string;
  fileUrl?: string;
  netConfidence: number;
}

// --- Mock Database Response ---
const INITIAL_POSTS: IntelligencePost[] = [
  {
    id: '1',
    authorName: 'Alex Rodriguez',
    authorRole: 'VERIFIED_SENIOR',
    credibilityScore: 94,
    category: 'SCHOLARSHIP_DEADLINE',
    branchTag: 'General',
    urgency: 'CRITICAL',
    title: 'First-Gen Opportunity Grant Deadline Shifted',
    description: 'The financial aid office just silently moved the deadline for the Opportunity Grant up by two weeks. You must submit your FAFSA supplemental form by this Friday or you will be automatically disqualified for the Fall semester.',
    fileUrl: 'https://cloudinary.com/demo/fafsa_supplemental.pdf',
    netConfidence: 45
  },
  {
    id: '2',
    authorName: 'Sarah Jenkins',
    authorRole: 'VERIFIED_SENIOR',
    credibilityScore: 82,
    category: 'FACULTY_PREFERENCE',
    branchTag: 'Computer Science',
    urgency: 'MEDIUM',
    title: 'Prof. Davis OS Midterm Format Change',
    description: 'Davis usually does multiple choice, but this semester he is switching to entirely written short-answer questions. Make sure you memorize the paging algorithms in detail rather than just recognizing the names.',
    netConfidence: 28
  },
  {
    id: '3',
    authorName: 'Mike Chen',
    authorRole: 'FRESHER',
    credibilityScore: 12,
    category: 'RECRUITMENT_PIPELINE',
    branchTag: 'Business',
    urgency: 'LOW',
    title: 'Consulting Club Interview Timeline',
    description: 'Does anyone know when the business consulting club usually sends out first-round interview invites? I submitted my resume last week but haven\'t heard back through the official portal.',
    netConfidence: 3
  },
  {
    id: '4',
    authorName: 'Emily Carter',
    authorRole: 'VERIFIED_SENIOR',
    credibilityScore: 88,
    category: 'ACADEMIC_ADMINISTRATION',
    branchTag: 'Engineering',
    urgency: 'CRITICAL',
    title: 'Hidden Capstone Prerequisite Enforcement',
    description: 'Advising just confirmed they are strictly enforcing the ENGR-301 prerequisite for Senior Capstone next year. Previously they waived it. If you haven\'t taken it, you need to enroll during the priority window tomorrow morning at 8 AM.',
    netConfidence: 56
  }
];

export default function FeedDashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  // --- State Controllers ---
  const [posts, setPosts] = useState<IntelligencePost[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('ALL');
  const [branchFilter, setBranchFilter] = useState('');

  // Interaction States (Locking & Optimistic UI)
  const [votingStates, setVotingStates] = useState<Record<string, { loading: boolean, voted: 'up' | 'down' | null }>>({});

  // Simulate Initial Data Load
  useEffect(() => {
    const fetchPosts = async () => {
      await new Promise(resolve => setTimeout(resolve, 800)); // Network delay
      setPosts(INITIAL_POSTS);
      setIsFetching(false);
    };
    fetchPosts();
  }, []);

  // --- Filter Logic ---
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'ALL' || post.category === categoryFilter;
      const matchesUrgency = urgencyFilter === 'ALL' || post.urgency === urgencyFilter;
      const matchesBranch = !branchFilter || post.branchTag.toLowerCase().includes(branchFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesUrgency && matchesBranch;
    });
  }, [posts, searchQuery, categoryFilter, urgencyFilter, branchFilter]);

  // --- Interaction Handlers ---
  const handleVote = async (postId: string, direction: 'up' | 'down') => {
    if (votingStates[postId]?.loading) return;
    
    // Core Modifiers: verified seniors have 2x authority
    const voteWeight = user?.role === 'VERIFIED_SENIOR' ? 10 : 5;
    
    setVotingStates(prev => ({ 
      ...prev, 
      [postId]: { loading: true, voted: prev[postId]?.voted || null } 
    }));

    // Mock Backend /api/verify execution
    await new Promise(resolve => setTimeout(resolve, 600));

    // Optimistic UI Update
    setPosts(currentPosts => currentPosts.map(post => {
      if (post.id === postId) {
        const previousVote = votingStates[postId]?.voted;
        let scoreChange = 0;
        
        if (previousVote === direction) {
          scoreChange = direction === 'up' ? -voteWeight : voteWeight; // Undo
        } else {
          const baseChange = direction === 'up' ? voteWeight : -voteWeight;
          scoreChange = previousVote ? baseChange * 2 : baseChange; // Swap
        }
        
        return { ...post, netConfidence: post.netConfidence + scoreChange };
      }
      return post;
    }));

    // Unlock and set active vote
    setVotingStates(prev => ({
      ...prev,
      [postId]: {
        loading: false,
        voted: prev[postId]?.voted === direction ? null : direction
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-12 gap-8">
        
        {/* --- MAIN FEED CENTER --- */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center">
              <Activity className="w-8 h-8 mr-3 text-primary" />
              Campus Intelligence Feed
            </h1>
          </div>

          {/* Dynamic Control Bar (Search & Filter Infrastructure) */}
          <div className="bg-card/40 backdrop-blur-md border border-border p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search intel..." 
                className="pl-9 bg-background/50 border-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[220px] bg-background/50 border-input">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="FACULTY_PREFERENCE">Faculty Preferences</SelectItem>
                <SelectItem value="SCHOLARSHIP_DEADLINE">Scholarship Deadlines</SelectItem>
                <SelectItem value="RECRUITMENT_PIPELINE">Recruitment Pipeline</SelectItem>
                <SelectItem value="ACADEMIC_ADMINISTRATION">Academic Admin</SelectItem>
              </SelectContent>
            </Select>

            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-background/50 border-input">
                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Any Urgency</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>

            <Input 
              placeholder="Branch Tag (e.g. CS)" 
              className="w-full md:w-[150px] bg-background/50 border-input"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            />
          </div>

          {/* Feed Post Render Loop */}
          <div className="space-y-6 min-h-[500px]">
            {isFetching ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                <p className="font-mono text-sm tracking-widest uppercase">Decoupling Pipeline...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="bg-card/40 backdrop-blur-sm border border-border p-12 rounded-xl text-center">
                <Filter className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-xl font-bold text-foreground">No Intelligence Found</h3>
                <p className="text-muted-foreground mt-2">Adjust your filters or be the first to contribute to this sector.</p>
              </div>
            ) : (
              filteredPosts.map(post => (
                <div 
                  key={post.id} 
                  className={cn(
                    "bg-card/40 backdrop-blur-sm border border-border p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex gap-4",
                    post.urgency === 'CRITICAL' && "ring-2 ring-destructive/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                  )}
                >
                  {/* Voting Wrapper Panel */}
                  <div className="flex flex-col items-center justify-start gap-2 pt-2 w-12 shrink-0">
                    <button 
                      onClick={() => handleVote(post.id, 'up')}
                      disabled={votingStates[post.id]?.loading}
                      className={cn(
                        "p-2 rounded-lg transition-all hover:bg-green-500/20 text-muted-foreground hover:text-green-500 disabled:opacity-50",
                        votingStates[post.id]?.voted === 'up' && "bg-green-500/20 text-green-500"
                      )}
                    >
                      <ArrowUp className="w-5 h-5" strokeWidth={3} />
                    </button>
                    
                    <span className={cn(
                      "font-bold text-sm",
                      post.netConfidence > 10 ? "text-green-500" : post.netConfidence < 0 ? "text-destructive" : "text-foreground"
                    )}>
                      {votingStates[post.id]?.loading ? (
                        <Loader2 className="w-4 h-4 animate-spin opacity-50 mx-auto" />
                      ) : (
                        post.netConfidence
                      )}
                    </span>
                    
                    <button 
                      onClick={() => handleVote(post.id, 'down')}
                      disabled={votingStates[post.id]?.loading}
                      className={cn(
                        "p-2 rounded-lg transition-all hover:bg-destructive/20 text-muted-foreground hover:text-destructive disabled:opacity-50",
                        votingStates[post.id]?.voted === 'down' && "bg-destructive/20 text-destructive"
                      )}
                    >
                      <ArrowDown className="w-5 h-5" strokeWidth={3} />
                    </button>
                  </div>

                  {/* Post Content Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {post.urgency === 'CRITICAL' && (
                        <Badge variant="destructive" className="animate-pulse">
                          CRITICAL
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                        {post.category.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground border-border">
                        {post.branchTag}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {post.description}
                    </p>

                    {post.fileUrl && (
                      <a href={post.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary/50 border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors mb-4 group">
                        <Paperclip className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                        View Attached Asset
                      </a>
                    )}

                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs">
                        {post.authorName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-foreground flex items-center">
                          {post.authorName}
                          {post.authorRole === 'VERIFIED_SENIOR' && (
                            <ShieldCheck className="w-3.5 h-3.5 ml-1 text-primary" />
                          )}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                          {post.authorRole.replace('_', ' ')} • Credibility: {post.credibilityScore}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* --- STICKY SIDEBAR PANEL --- */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="sticky top-28 space-y-6">
            
            {/* Global Stats Card */}
            <div className="bg-card/50 backdrop-blur-md border border-border p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Network Pulse
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Activity className="w-4 h-4 mr-2" />
                    Active Intel Threads
                  </div>
                  <span className="font-mono font-bold text-foreground">1,248</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                    Verified Seniors
                  </div>
                  <span className="font-mono font-bold text-foreground">342</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-500" />
                    Pending Reviews
                  </div>
                  <span className="font-mono font-bold text-foreground">14</span>
                </div>
              </div>
            </div>

            {/* Action Items Card */}
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-foreground mb-2">Contribute to the Grid</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your credibility score is tied directly to the accuracy of your shared intelligence. 
              </p>
              <Button className="w-full font-bold uppercase tracking-wider text-xs h-12 shadow-lg hover:shadow-primary/25 transition-all">
                Publish New Intel
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
