'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/store';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Share2,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  FileText,
  ThumbsUp,
  Briefcase
} from 'lucide-react';

const MOCK_POSTS = [
  {
    id: '1',
    title: 'Advanced OS Concepts Cheatsheet',
    category: 'ACADEMICS',
    branchTag: 'Computer Science',
    reliabilityScore: 92,
    file: { fileKey: 'os_cheatsheet.pdf', fileUrl: '#' }
  },
  {
    id: '2',
    title: 'Microsoft SDE Intern Interview Process',
    category: 'PLACEMENTS',
    branchTag: 'General',
    reliabilityScore: 98,
    file: null
  },
  {
    id: '3',
    title: 'Registration deadline for Hackathon XYZ',
    category: 'ANNOUNCEMENTS',
    branchTag: 'Information Tech',
    reliabilityScore: 85,
    file: null
  }
];

export default function LandingPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Section 1: Hero Segment */}
      <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Empowering First-Generation Students
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
            Demystify the <span className="text-primary">Campus Experience</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The exclusive crowd-sourced intelligence platform bridging the knowledge gap.
            Powered by verified seniors, driven by peer consensus.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {isAuthenticated ? (
              <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center")}>
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center")}>
                Join InsightU
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
            <Link href="/dashboard/share" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-14 px-8 text-lg rounded-full border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all flex items-center")}>
              <Share2 className="mr-2 h-5 w-5" />
              Share Intelligence
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Live Institutional Pulse */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Live Institutional Pulse</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Real-time intelligence from across the campus, verified by the student body.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_POSTS.map((post) => (
            <div key={post.id} className="group relative bg-card/50 backdrop-blur-md border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Score: {post.reliabilityScore}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground mb-4">
                  {post.branchTag}
                </span>
              </div>

              {post.file && (
                <div className="mt-4 pt-4 border-t border-border flex items-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" />
                  Attachment: {post.file.fileKey}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: The 'Invisible Curriculum' Demystifier */}
      <section className="py-24 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Demystifying the Invisible Curriculum</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Breaking down the barriers that hold back first-generation students through proactive technology.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-destructive flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Standard Roadblocks
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 bg-destructive/10 p-1 rounded-full text-destructive mr-3">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                  </div>
                  <p className="text-muted-foreground">Information is siloed in fragmented WhatsApp groups.</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 bg-destructive/10 p-1 rounded-full text-destructive mr-3">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                  </div>
                  <p className="text-muted-foreground">Lack of context on critical placement deadlines.</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 bg-destructive/10 p-1 rounded-full text-destructive mr-3">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                  </div>
                  <p className="text-muted-foreground">No verification system for academic advice.</p>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-primary flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-2" />
                Proactive Solutions
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full text-primary mr-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground">Centralized intelligence hub built specifically for your branch.</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full text-primary mr-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground">Automated Nudge Engine highlighting expiring deadlines.</p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full text-primary mr-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-foreground">Strict algorithm punishing false data and rewarding reliable seniors.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Credibility Blueprint */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">The Credibility Blueprint</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">How our algorithmic trust engine ensures the highest quality of shared knowledge.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10" />

          <div className="bg-background border border-border rounded-2xl p-6 text-center shadow-lg relative">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 ring-8 ring-background">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">1. Seniors Post Data</h3>
            <p className="text-muted-foreground text-sm">Verified seniors share academic cheatsheets, placement strategies, and critical campus alerts.</p>
          </div>

          <div className="bg-background border border-border rounded-2xl p-6 text-center shadow-lg relative">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 ring-8 ring-background">
              <ThumbsUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">2. Peers Vote</h3>
            <p className="text-muted-foreground text-sm">The student body atomically votes on the validity of the post using our transactional polling system.</p>
          </div>

          <div className="bg-background border border-border rounded-2xl p-6 text-center shadow-lg relative">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 ring-8 ring-background">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">3. Trust Algorithm</h3>
            <p className="text-muted-foreground text-sm">High validity boosts the author's Reliability Score. Downvoted posts are automatically flagged or suppressed.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Proactive Nudge Preview */}
      <section className="py-24 bg-card/50 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-500 mb-6">
            <Clock className="w-4 h-4 mr-2" />
            Nudge Engine Preview
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Never Miss a Deadline Again</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            InsightU monitors critical campus timelines. If a placement form or scholarship deadline expires in under 48 hours, it gets pinned to your dashboard.
          </p>

          <div className="bg-background border border-border rounded-xl p-6 max-w-2xl mx-auto text-left shadow-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-red-500 text-white text-xs font-bold uppercase">Expiring Soon</span>
                <span className="text-sm font-medium text-muted-foreground">Expires in 12h 45m</span>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-1">Google STEP Internship Application 2026</h4>
              <p className="text-sm text-muted-foreground">Upload your resume and complete the pre-screening quiz.</p>
            </div>
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Section 6: Semantic Footer Casing */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">IU</span>
            </div>
            <span className="text-foreground font-semibold text-xl tracking-tight">InsightU</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Schema</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Algorithm Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} InsightU Intelligence Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

