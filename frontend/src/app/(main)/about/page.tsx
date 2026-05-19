'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  BookOpen, 
  Heart,
  Globe,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const TEAM_MEMBERS = [
  {
    name: 'Marvin McKinney',
    role: 'Founder & Lead Architect',
    bio: 'Senior advisor focused on building systems that bridge the institutional knowledge gap.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin'
  },
  {
    name: 'Esther Howard',
    role: 'Community Lead',
    bio: 'Consensus coordinator, ensuring student voice and verification protocols remain bulletproof.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther'
  },
  {
    name: 'Albert Flores',
    role: 'Platform Engineering',
    bio: 'Specialist in dynamic frontend interfaces and premium, high-speed user experiences.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Albert'
  }
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Sovereign Verification',
    desc: 'We enforce advanced peer consensus. Rumors are filtered out; only verified facts from accredited seniors guide our community.'
  },
  {
    icon: Users,
    title: 'Inclusivity First',
    desc: 'Empowering first-generation and underrepresented students by making the "hidden curriculum" of campus life open to all.'
  },
  {
    icon: Sparkles,
    title: 'Actionable Clarity',
    desc: 'No clutter. Only highly indexed, reliable details on classes, career opportunities, and campus navigation.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 selection:bg-primary/20 selection:text-primary">
      {/* Background Decorator Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_0.5px,transparent_0.5px),linear-gradient(to_bottom,var(--border)_0.5px,transparent_0.5px)] opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ===== HEADER SEGMENT ===== */}
        <section className="text-center space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-md px-4 py-1.5 text-xs font-mono tracking-widest text-primary uppercase">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Our Mission
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            Bridging the <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Campus Intelligence Gap</span>
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            InsightU is a sovereign, crowd-sourced intelligence network built to arm every student with verified, peer-validated knowledge of college life.
          </p>
        </section>

        {/* ===== CORE VISION / STORY ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <BookOpen size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground uppercase">The Story Behind InsightU</h2>
            </div>
            
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Every year, thousands of students step onto campus without the legacy advantages that others enjoy. They face the "hidden curriculum"—informal rules, course strategies, and career routes that are rarely published but highly critical.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              InsightU was founded to level the playing field. By connecting first-generation freshers directly with accredited senior advisors and securing submissions with peer consensus verification, we turn raw campus intelligence into institutional clarity.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Heart size={16} className="text-destructive fill-destructive/10" />
                <span>Student Driven</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Globe size={16} className="text-primary" />
                <span>Campus Scaled</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Award size={16} className="text-amber-500" />
                <span>100% Verified</span>
              </div>
            </div>
          </div>

          <div className="relative group rounded-3xl overflow-hidden border border-border bg-card/40 backdrop-blur-md p-8 shadow-sm flex flex-col justify-between aspect-video">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-xs font-mono text-primary uppercase tracking-widest">Core Statement</div>
            <p className="text-lg sm:text-xl font-medium italic text-foreground leading-relaxed mt-4">
              "We believe that a student's background should never dictate their potential on campus. True intelligence belongs to the collective student body."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                IU
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground">InsightU Founders</span>
                <span className="text-[10px] text-muted-foreground font-mono uppercase">University Coalition</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== VALUE PROPOSITION / PILLARS ===== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">Our Operating Pillars</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">The principles that secure trust, accuracy, and peer-consensus in everything we host.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <div key={i} className="bg-card/40 backdrop-blur-md border border-border p-6 rounded-2xl shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{val.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-mono">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== TEAM SECTION ===== */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">Meet Our Builders</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">A team of dedicated college seniors and platform architects working for structural campus equality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="bg-card/40 backdrop-blur-md border border-border p-6 rounded-2xl shadow-sm flex flex-col items-center text-center group hover:scale-[1.02] hover:border-primary/30 transition-all duration-300">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-primary/20 mb-4 shadow-md">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                <span className="text-[10px] text-primary font-mono uppercase tracking-wider mt-1">{member.role}</span>
                <p className="text-xs text-muted-foreground mt-3 font-mono leading-relaxed px-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CALL TO ACTION ===== */}
        <section className="relative rounded-3xl overflow-hidden border border-border bg-card/30 backdrop-blur-xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground uppercase">
            Ready to Shape the Campus Narrative?
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            Join thousands of active freshers unlocking verified intelligence, or register as a senior contributor today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/signup"
              className={cn(buttonVariants({ size: 'lg' }), "rounded-full font-bold uppercase tracking-wider text-xs px-8 h-12 shadow-md hover:scale-105 transition-all")}
            >
              Get Started
            </Link>
            <Link
              href="/dashboard/share"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), "rounded-full font-bold uppercase tracking-wider text-xs px-8 h-12 hover:scale-105 transition-all border-border")}
            >
              Share Intelligence
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
