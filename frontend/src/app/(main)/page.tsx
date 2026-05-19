'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Briefcase,
  Star,
  Smile,
  Plus,
  Users,
  GraduationCap,
  Quote
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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

const TESTIMONIALS = [
  {
    id: 1,
    name: "Linda Mensah",
    role: "Computer Science Senior",
    quote: "Working with InsightU was a total game-changer. The peer guides helped me lock in a perfect grade in my toughest syllabus module!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name: "David Okoro",
    role: "Mechanical Engineering Junior",
    quote: "I was blown away by the accuracy of the lab guides. Navigating professors' grading templates is no longer an invisible barrier.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name: "Aisha Boateng",
    role: "Information Technology Graduate",
    quote: "Their network helped me build trust with senior advisors. It felt like they were part of my study group every step of the way.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name: "Marcus Sterling",
    role: "Electrical Engineering Senior",
    quote: "The automated nudge alerts for placements saved my application. Highly recommend InsightU for any serious engineering undergrad.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    name: "Chloe Zhao",
    role: "Civil Engineering Sophomore",
    quote: "Finding quiet project labs and exam hacks in one unified space is insanely convenient. InsightU has completely transformed my campus routine.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
  }
];

export default function LandingPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Section 1: Hero Segment */}
      <section className="relative h-screen min-h-[720px] overflow-hidden flex flex-col justify-between bg-background text-foreground pt-24 pb-0">
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_0.5px,transparent_0.5px),linear-gradient(to_bottom,var(--border)_0.5px,transparent_0.5px)] opacity-[0.12] pointer-events-none" />

        {/* Radial Glows */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Center Header Content */}
        <div className="relative z-30 max-w-4xl mx-auto text-center px-4 pt-8 md:pt-12 flex-1 flex flex-col justify-start items-center space-y-5 md:space-y-6">
          {/* Monospace Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-md px-4 py-1.5 text-xs font-mono tracking-widest text-primary uppercase">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Campus Intelligence Network
          </div>

          {/* Massive Bold Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-[1.05] max-w-3xl drop-shadow-md text-foreground">
            Demystify the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-foreground/75">Campus Experience</span>
          </h1>

          {/* Subtext Description */}
          <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto font-mono tracking-wide leading-relaxed">
            Powered by verified seniors, driven by peer consensus. The exclusive crowd-sourced intelligence platform bridging the knowledge gap.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-6 pt-2">
            {mounted && isAuthenticated ? (
              <Link
                href="/dashboard"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            ) : (
              <Link
                href="/signup"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95"
              >
                Join InsightU
              </Link>
            )}
            <Link
              href="/dashboard/share"
              className="text-foreground hover:text-primary transition-colors font-semibold font-mono tracking-widest uppercase text-xs border-b border-foreground hover:border-primary pb-0.5"
            >
              Share Intel
            </Link>
          </div>
        </div>



        {/* LEFT SIDE CONTENT - Desktop only */}
        <div className="absolute left-8 lg:left-16 xl:left-24 top-1/4 bottom-12 w-72 hidden md:flex flex-col justify-between pointer-events-none z-20">
          {/* Happy Students Widget */}
          <div className="flex items-center gap-3 bg-card/60 backdrop-blur-md border border-border p-4 rounded-xl shadow-sm self-start pointer-events-auto">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Smile size={22} className="fill-primary/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">600+</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Verified Seniors</span>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="flex flex-col gap-3 max-w-[240px] mt-auto self-start pointer-events-auto">
            <p className="text-xs text-muted-foreground/80 italic font-mono leading-relaxed">
              "Explore crowd-sourced intelligence that shapes your personal and professional campus trajectory."
            </p>
            <Link href="/#about" className="text-[10px] font-mono font-bold tracking-widest text-primary hover:underline flex items-center gap-1.5 uppercase">
              Let's Go <ArrowRight size={12} />
            </Link>
          </div>

          {/* Contributor Card */}
          <div className="flex items-center gap-3 mt-4 self-start pointer-events-auto bg-card/40 backdrop-blur-sm border border-border p-3 rounded-xl">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin"
                alt="Contributor"
                className="w-full h-full object-cover filter grayscale"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">Marvin McKinney</span>
              <span className="text-[9px] text-muted-foreground uppercase font-mono">Senior Advisor</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CONTENT - Desktop only */}
        <div className="absolute right-8 lg:right-16 xl:right-24 top-1/4 bottom-12 w-72 hidden md:flex flex-col justify-between pointer-events-none z-20 text-right">
          {/* Rotating Custom Circular Badge */}
          <div className="relative w-28 h-28 self-end flex items-center justify-center animate-[spin_25s_linear_infinite] pointer-events-auto">
            {/* Circular SVG Path Text */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text className="text-[6px] font-mono fill-foreground/30 dark:fill-white/30 tracking-[1.8px] uppercase">
                <textPath href="#circlePath">
                  Verified Seniors • Peer Consensus •
                </textPath>
              </text>
            </svg>
            {/* Icon in Center */}
            <div className="absolute w-8 h-8 rounded-full bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center text-primary">
              <ShieldCheck size={16} />
            </div>
          </div>

          {/* 5-Star Block */}
          <div className="flex flex-col gap-1 items-end mt-auto self-end pointer-events-auto">
            <span className="text-xs font-semibold tracking-wide text-foreground uppercase font-mono">5 Star Rating</span>
            <span className="text-[9px] text-muted-foreground font-mono">Peer consensus validation rate</span>
            <div className="flex gap-1 mt-1 text-[#eab308] dark:text-[#facc15]">
              <Star size={11} className="fill-current" />
              <Star size={11} className="fill-current" />
              <Star size={11} className="fill-current" />
              <Star size={11} className="fill-current" />
              <Star size={11} className="fill-current" />
            </div>
          </div>
        </div>

      </section>

      {/* Section 1.2: Dedicated Stats Grid */}
      <section className="border-y border-primary/20 bg-primary relative z-10 overflow-hidden shadow-lg">
        {/* Subtle grid and glows inside the colored block */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">

          {/* Stat 1 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Users size={22} />
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">15K+</span>
              <p className="text-[10px] font-extrabold text-[#9EFF2B] uppercase font-mono tracking-widest mt-1">Active Students</p>
              <p className="text-xs text-white/80 mt-0.5 font-mono">Consensus size</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">98.6%</span>
              <p className="text-[10px] font-extrabold text-[#9EFF2B] uppercase font-mono tracking-widest mt-1">Accuracy Rating</p>
              <p className="text-xs text-white/80 mt-0.5 font-mono">Verified guides</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm">
              <GraduationCap size={22} />
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">4.2K+</span>
              <p className="text-[10px] font-extrabold text-[#9EFF2B] uppercase font-mono tracking-widest mt-1">Senior Advisors</p>
              <p className="text-xs text-white/80 mt-0.5 font-mono">Active advisors</p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm">
              <FileText size={22} />
            </div>
            <div>
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">120K+</span>
              <p className="text-[10px] font-extrabold text-[#9EFF2B] uppercase font-mono tracking-widest mt-1">Shared Intel</p>
              <p className="text-xs text-white/80 mt-0.5 font-mono">Guides & papers</p>
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Live Institutional Pulse */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3 relative z-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest font-mono">
            Institutional Pulse
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-foreground leading-tight">
            Campus Verification Stream
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            Real-time verified intelligence from across the campus, authenticated directly by the student network.
          </p>
        </div>

        {/* Minimalist Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {MOCK_POSTS.map((post) => (
            <div
              key={post.id}
              className="group bg-card/60 backdrop-blur-md border border-border rounded-[20px] p-6 hover:shadow-md hover:border-primary/45 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row Badges */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs font-bold text-emerald-500">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Score: {post.reliabilityScore}%
                  </div>
                </div>

                {/* Post Title */}
                <h3 className="text-base font-extrabold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Campus Branch Tag */}
                <span className="text-xs text-muted-foreground font-mono">
                  # {post.branchTag}
                </span>
              </div>

              {/* Bottom attachment/consensus audit status */}
              <div className="mt-6 pt-4 border-t border-border/50">
                {post.file ? (
                  <div className="w-full bg-secondary/80 hover:bg-primary hover:text-white transition-all duration-200 py-2.5 px-3.5 rounded-xl border border-border/40 flex items-center justify-between cursor-pointer group/attachment">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground group-hover/attachment:text-white transition-colors">
                      <FileText className="w-4 h-4 text-primary group-hover/attachment:text-white" />
                      {post.file.fileKey}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-primary group-hover/attachment:text-white">
                      File &rarr;
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground/80">
                    <span>Status: Verified</span>
                    <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">Secure Node</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Section 1.5: Platform Features (Bento Grid) */}
      <section id="features" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-16">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-md px-4 py-1.5 text-xs font-mono tracking-widest text-primary uppercase">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Inside InsightU
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-foreground">
            Sovereign Peer Intelligence
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Explore how we structure crowdsourced campus details to secure absolute reliability and clarity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Card 1: Wide Top-Left (Spans 2 columns, Row 1) */}
          <div className="md:col-span-2 bg-[#F3F4F6] dark:bg-card/40 border border-border rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 justify-between items-center group hover:shadow-md transition-all duration-300">
            {/* Left text */}
            <div className="flex-1 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest font-mono">About</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground leading-[1.2] tracking-tight mt-2 mb-3">
                  InsightU is the first step towards a brighter future.
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  We inspire, we educate, and we shape the future!
                </p>
              </div>
            </div>
            {/* Right floating image with border and shadow */}
            <div className="w-full sm:w-[42%] aspect-[4/3] sm:aspect-square relative overflow-hidden rounded-2xl border-4 border-white dark:border-zinc-800 shadow-md shrink-0">
              <img
                src="/bento_students.png"
                alt="Students Collaboration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 2: Library Box (Column 3, Row 1) */}
          <div className="md:col-span-1 relative group border border-border rounded-[28px] overflow-hidden shadow-sm flex flex-col justify-end min-h-[240px] hover:shadow-md transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <img
              src="/bento_library.png"
              alt="Study Workspace"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Plus Icon */}
            <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md font-bold hover:scale-115 active:scale-95 transition-all cursor-pointer">
              <Plus size={16} />
            </div>
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 space-y-1">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[#9EFF2B]">Quiet Spaces</span>
              <p className="text-sm font-extrabold text-white leading-snug mt-1">
                A place to work quietly on your own and your projects.
              </p>
            </div>
          </div>

          {/* Card 3: Classrooms (Spans 3 columns, Row 2) */}
          <div className="md:col-span-3 bg-[#F3F4F6] dark:bg-card/40 border border-border rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 justify-between items-center group hover:shadow-md transition-all duration-300">
            {/* Left image with border and shadow */}
            <div className="w-full sm:w-[40%] aspect-[16/10] relative overflow-hidden rounded-2xl border-4 border-white dark:border-zinc-800 shadow-md shrink-0">
              {/* Plus Icon */}
              <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md font-bold hover:scale-115 active:scale-95 transition-all cursor-pointer">
                <Plus size={16} />
              </div>
              <img
                src="/bento_classroom.png"
                alt="Modern Classroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Right text */}
            <div className="flex-1 space-y-3 pl-0 sm:pl-4">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest font-mono">Classrooms</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground leading-[1.2] tracking-tight">
                Modern equipment {"&"} interactive learning
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                The classrooms of our school have been equipped with the latest technology, creating an ideal learning environment for students and teachers. This provides them with the necessary tools to engage in active learning and interaction.
              </p>
            </div>
          </div>

          {/* Card 4: Tall Swimmer Box (Column 4, Spans Row 1 & 2) */}
          <div className="md:col-span-1 md:row-span-2 md:col-start-4 md:row-start-1 relative group border border-border rounded-[28px] overflow-hidden shadow-sm flex flex-col justify-end min-h-[350px] md:min-h-full hover:shadow-md transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <img
              src="/bento_vertical.png"
              alt="Student Working"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Plus Icon */}
            <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md font-bold hover:scale-115 active:scale-95 transition-all cursor-pointer">
              <Plus size={16} />
            </div>
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 space-y-2">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-[#9EFF2B]">Athletics</span>
              <h4 className="text-base sm:text-lg font-extrabold text-white leading-snug mt-1">
                A source of health, strength and athletic achievement.
              </h4>
            </div>
          </div>

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
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8 relative overflow-hidden">

        {/* Title Block */}
        <div className="text-center mb-16 sm:mb-24 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-foreground">
            The Credibility Blueprint
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Explore how our algorithmic trust engine verifies and elevates crowdsourced campus advice in 3 easy steps.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-start relative max-w-5xl mx-auto">

          {/* Curve 1: Between Step 1 & Step 2 (Downward curved dashed line) */}
          <div className="hidden md:block absolute left-[26%] top-[20%] w-[16%] h-12 text-zinc-300 dark:text-zinc-700 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 40" fill="none" preserveAspectRatio="none">
              <path d="M 0,10 Q 50,45 100,10" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            </svg>
          </div>

          {/* Curve 2: Between Step 2 & Step 3 (Upward curved dashed line) */}
          <div className="hidden md:block absolute left-[59%] top-[14%] w-[16%] h-12 text-zinc-300 dark:text-zinc-700 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 40" fill="none" preserveAspectRatio="none">
              <path d="M 0,30 Q 50,-5 100,30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            </svg>
          </div>

          {/* Step 1: Register */}
          <div className="relative text-center group">
            {/* Step Number at top-left of circle */}
            <div className="absolute top-[8%] left-[34%] md:left-[32%] text-zinc-400 dark:text-zinc-600 font-mono font-black text-sm">
              1
            </div>

            {/* Solid White Circle with soft shadow */}
            <div className="w-28 h-28 mx-auto rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-foreground mt-6 mb-2 uppercase tracking-tight">
              Verify profile
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[250px] mx-auto font-mono">
              College seniors securely connect credentials to authorize posting status.
            </p>
          </div>

          {/* Step 2: Complete Setup / Post Intel */}
          <div className="relative text-center group">
            {/* Step Number at top-left of circle */}
            <div className="absolute top-[8%] left-[34%] md:left-[32%] text-zinc-400 dark:text-zinc-600 font-mono font-black text-sm">
              2
            </div>

            {/* Dashed Circle Outline */}
            <div className="w-28 h-28 mx-auto rounded-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-transparent hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <FileText size={24} />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-foreground mt-6 mb-2 uppercase tracking-tight">
              Publish Intel
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[250px] mx-auto font-mono">
              Seniors post actual course structures, shortcuts, lab cheat sheets, or deadlines.
            </p>
          </div>

          {/* Step 3: Utilize App / Trust Consensus */}
          <div className="relative text-center group">
            {/* Step Number at top-left of circle */}
            <div className="absolute top-[8%] left-[34%] md:left-[32%] text-zinc-400 dark:text-zinc-600 font-mono font-black text-sm">
              3
            </div>

            {/* Dashed Circle Outline */}
            <div className="w-28 h-28 mx-auto rounded-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-transparent hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-foreground mt-6 mb-2 uppercase tracking-tight">
              Peer Consensus
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[250px] mx-auto font-mono">
              Peers rate post validity. Successful consensus upgrades the senior's trust score.
            </p>
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

      {/* Section 5.5: Testimonials */}
      <section className="py-24 bg-background border-t border-border relative z-10">
        {/* Soft Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Title */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-foreground">
              Loved by peers across campus
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Real stories from students who demystified their curriculum shortcuts.
            </p>
          </div>

          {/* Embla Carousel Container */}
          <div className="max-w-6xl mx-auto px-4 sm:px-12 relative">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-6">
                {TESTIMONIALS.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-6 basis-full sm:basis-1/2 md:basis-1/3">
                    <div className="bg-[#F3F4F6] dark:bg-card/40 border border-border rounded-[28px] overflow-hidden shadow-sm flex flex-col h-full hover:border-primary/45 transition-all duration-300 group">

                      {/* Photo Container */}
                      <div className="w-full h-64 relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F3F4F6] dark:from-card via-transparent to-transparent z-10" />
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />

                        {/* Floating Quote Icon */}
                        <div className="absolute bottom-4 left-6 z-20 w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center shadow-md">
                          <Quote className="w-3.5 h-3.5 text-primary fill-current" />
                        </div>
                      </div>

                      {/* Quote & Author content */}
                      <div className="p-6 pt-4 flex flex-col justify-between flex-grow">
                        <p className="text-sm text-foreground/90 font-medium leading-relaxed font-sans italic">
                          "{testimonial.quote}"
                        </p>
                        <div className="mt-6 border-t border-border/60 pt-4 text-right">
                          <h4 className="text-sm font-bold text-foreground">{testimonial.name}</h4>
                          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{testimonial.role}</p>
                        </div>
                      </div>

                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden sm:block">
                <CarouselPrevious className="-left-14 border-border hover:bg-primary hover:text-white" />
                <CarouselNext className="-right-14 border-border hover:bg-primary hover:text-white" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}

