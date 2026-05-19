'use client';

import React from 'react';
import Link from 'next/link';
import {
  Clock,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Globe,
  Users,
  Award,
  Sparkles,
  BookMarked,
  Mail,
  ShieldCheck,
  ArrowRight,
  GitBranch,
  Link2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary relative overflow-hidden pb-16">

      {/* Dynamic Grid Coordinates Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_0.5px,transparent_0.5px),linear-gradient(to_bottom,var(--border)_0.5px,transparent_0.5px)] opacity-[0.08] pointer-events-none" />

      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-28">

        {/* Section 1: Vision Hero */}
        <section className="text-center flex flex-col justify-center items-center h-screen space-y-6 max-w-4xl mx-auto">
          {/* Monospace Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-md px-4 py-1.5 text-xs font-mono tracking-widest text-primary uppercase">
            <Sparkles size={12} className="text-primary animate-pulse" />
            Our Mission & Directive
          </div>

          {/* Massive Storytelling Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] uppercase text-foreground">
            Democratizing institutional knowledge for <span className="text-primary">first-generation</span> students.
          </h1>

          {/* Vision Paragraph */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-sans font-medium">
            InsightU is a peer-verified academic pulse designed to tear down the unwritten barriers of higher education. We build dynamic fact networks, democratize placement secrets, and verify campus details so no student is left in the dark.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="p-4 bg-card/40 backdrop-blur-md border border-border rounded-2xl text-center">
              <span className="block text-2xl font-extrabold text-foreground font-sans">100%</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-1">Open Access</span>
            </div>
            <div className="p-4 bg-card/40 backdrop-blur-md border border-border rounded-2xl text-center">
              <span className="block text-2xl font-extrabold text-primary font-sans">Peer</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-1">Verified Data</span>
            </div>
            <div className="p-4 bg-card/40 backdrop-blur-md border border-border rounded-2xl text-center">
              <span className="block text-2xl font-extrabold text-foreground font-sans">Real-time</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-1">Nudge engine</span>
            </div>
            <div className="p-4 bg-card/40 backdrop-blur-md border border-border rounded-2xl text-center">
              <span className="block text-2xl font-extrabold text-primary font-sans">Zero</span>
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-1">Siloed Data</span>
            </div>
          </div>
        </section>

        {/* Section 2: The Invisible Curriculum Grid */}
        <section className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-[10px] font-bold text-primary uppercase font-mono tracking-widest">Informational Blindspots</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-foreground">
              Mapping The "Invisible Curriculum"
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Higher education is crowded with unwritten rules. Here are the specific silos our platform targets and resolves.
            </p>
          </div>

          {/* Grid of Glassmorphic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Card 1: Placements */}
            <div className="bg-card/40 backdrop-blur-md border border-border rounded-[28px] p-6 sm:p-8 hover:border-primary/40 hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shadow-sm">
                  <Clock size={22} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
                  Hidden Placement Timelines
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Off-campus recruitment calendars, application windows, and critical coding rounds are often shared within closed circles. InsightU structures these tracks openly.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/40 flex items-center text-xs font-mono text-primary font-bold group-hover:translate-x-1 transition-transform duration-300">
                Resolving Timelines <ArrowRight size={12} className="ml-1" />
              </div>
            </div>

            {/* Card 2: Faculty Preferences */}
            <div className="bg-card/40 backdrop-blur-md border border-border rounded-[28px] p-6 sm:p-8 hover:border-primary/40 hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center shadow-sm">
                  <BookOpen size={22} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
                  Professor Grading Style Guides
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every examiner has subjective unwritten guidelines on marks distribution and presentation shortcuts. Peers share cheatsheets detailing these custom styles to bypass setbacks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/40 flex items-center text-xs font-mono text-primary font-bold group-hover:translate-x-1 transition-transform duration-300">
                Academic Cheatsheets <ArrowRight size={12} className="ml-1" />
              </div>
            </div>

            {/* Card 3: Administrative Bottlenecks */}
            <div className="bg-card/40 backdrop-blur-md border border-border rounded-[28px] p-6 sm:p-8 hover:border-primary/40 hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shadow-sm">
                  <AlertTriangle size={22} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
                  Opaque Registration Systems
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Navigating prerequisite codes, lab slot allocations, and elective validation is highly confusing for first-generation students. Our guide matrices map steps clearly.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/40 flex items-center text-xs font-mono text-primary font-bold group-hover:translate-x-1 transition-transform duration-300">
                Navigating Steps <ArrowRight size={12} className="ml-1" />
              </div>
            </div>

            {/* Card 4: Hidden Scholarships */}
            <div className="bg-card/40 backdrop-blur-md border border-border rounded-[28px] p-6 sm:p-8 hover:border-primary/40 hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-sm">
                  <Award size={22} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
                  Unadvertised Financial Awards
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Local foundations, emergency textbook grants, and travel stipend opportunities are rarely publicized. InsightU structures peer-verified funding directories dynamically.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/40 flex items-center text-xs font-mono text-primary font-bold group-hover:translate-x-1 transition-transform duration-300">
                Unlocking Grants <ArrowRight size={12} className="ml-1" />
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: The Mechanical Pillars */}
        <section className="space-y-12 bg-secondary/30 border-y border-border py-16 px-6 sm:px-12 rounded-[32px] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-[10px] font-bold text-primary uppercase font-mono tracking-widest">Platform Core Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-foreground">
              Our Mechanical Pillars
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              How we construct technology to secure absolute trust and real-time accuracy across crowdsourced knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
            {/* Pillar A */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-foreground">
                  Decentralized Peer Consensus
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Seniors post checklists, placement files, or study material. The campus student body atomically votes on validity. Verified files get boosted, while false updates are suppressed immediately.
                </p>
              </div>
            </div>

            {/* Pillar B */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Activity size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-foreground">
                  Automated Timeline Nudge Engine
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No more missed forms. Our predictive campus signal script listens to shared calendar markers. If an elective request, exam seating, or scholarship closes in under 48 hours, it nudges your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Team Profile Grid */}
        <section className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-[10px] font-bold text-primary uppercase font-mono tracking-widest font-semibold">Creators Behind CodeSpark</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-foreground">
              Meet Team CodeSpark
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              We are a branch of designers, developers, and writers dedicating code to empower first-generation students.
            </p>
          </div>

          {/* Clean Profile Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {/* Creator 1 */}
            <div className="bg-card/40 border border-border rounded-[24px] p-6 text-center hover:border-primary/30 hover:shadow-sm transition-all duration-300 flex flex-col justify-between items-center group">
              <div className="space-y-4">
                {/* Image Avatar Container */}
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto ring-4 ring-background shadow-md relative">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193501/member1_qz0d02.jpg"
                    alt="Subhabrata Saha"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    Subhabrata Saha
                  </h4>
                  <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider mt-0.5">
                    Lead Systems Architect
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Engineered the decentralized peer validation consensus algorithms.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link href="https://github.com" className="w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193980/github_oztvl3.png"
                    alt="GitHub"
                    className="w-6 h-6 object-contain opacity-80 dark:invert group-hover:opacity-100 transition-opacity"
                  />
                </Link>
                <Link href="https://linkedin.com" className="w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193980/linkedin_vwk7cd.png"
                    alt="LinkedIn"
                    className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
                <Link href="https://github.com" className="w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193980/web_p9n1v6.png"
                    alt="Website"
                    className="w-6 h-6 object-contain opacity-80 dark:invert group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </div>
            </div>

            {/* Creator 2 */}
            <div className="bg-card/40 border border-border rounded-[24px] p-6 text-center hover:border-primary/30 hover:shadow-sm transition-all duration-300 flex flex-col justify-between items-center group">
              <div className="space-y-4">
                {/* Image Avatar Container */}
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto ring-4 ring-background shadow-md relative">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193500/member3_wtyp5z.jpg"
                    alt="Ananya Roy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    Ananya Roy
                  </h4>
                  <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider mt-0.5">
                    Lead UI/UX Engineer
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Designed the beautiful Bento Grid catalog and primary interactive coordinates.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link href="https://github.com" className="w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193980/github_oztvl3.png"
                    alt="GitHub"
                    className="w-6 h-6 object-contain opacity-80 dark:invert group-hover:opacity-100 transition-opacity"
                  />
                </Link>
                <Link href="https://linkedin.com" className="w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193980/linkedin_vwk7cd.png"
                    alt="LinkedIn"
                    className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </div>
            </div>

            {/* Creator 3 */}
            <div className="bg-card/40 border border-border rounded-[24px] p-6 text-center hover:border-primary/30 hover:shadow-sm transition-all duration-300 flex flex-col justify-between items-center group">
              <div className="space-y-4">
                {/* Image Avatar Container */}
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto ring-4 ring-background shadow-md relative">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193500/member2_mzr66v.jpg"
                    alt="Vikram Aditya"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    Vikram Aditya
                  </h4>
                  <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider mt-0.5">
                    Database schema lead
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Developed transactional polling frameworks and data pipelines.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link href="https://github.com" className="w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193980/github_oztvl3.png"
                    alt="GitHub"
                    className="w-6 h-6 object-contain opacity-80 dark:invert group-hover:opacity-100 transition-opacity"
                  />
                </Link>
                <Link href="https://linkedin.com" className="w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193980/linkedin_vwk7cd.png"
                    alt="LinkedIn"
                    className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </div>
            </div>

            {/* Creator 4 */}
            <div className="bg-card/40 border border-border rounded-[24px] p-6 text-center hover:border-primary/30 hover:shadow-sm transition-all duration-300 flex flex-col justify-between items-center group">
              <div className="space-y-4">
                {/* Image Avatar Container */}
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto ring-4 ring-background shadow-md relative">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193500/member4_gdch6v.jpg"
                    alt="Riya Sen"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    Riya Sen
                  </h4>
                  <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider mt-0.5">
                    Product Strategist
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Aligned features to secure first-generation student requirements perfectly.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link href="https://github.com" className="w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193980/github_oztvl3.png"
                    alt="GitHub"
                    className="w-6 h-6 object-contain opacity-80 dark:invert group-hover:opacity-100 transition-opacity"
                  />
                </Link>
                <Link href="https://linkedin.com" className="w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors">
                  <img
                    src="https://res.cloudinary.com/drfodwc7q/image/upload/v1779193980/linkedin_vwk7cd.png"
                    alt="LinkedIn"
                    className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Section 5: Dynamic Join CTA */}
        <section className="bg-primary text-primary-foreground p-8 sm:p-12 rounded-[28px] text-center space-y-6 shadow-xl relative overflow-hidden">
          {/* Accent Glow inside colored CTA card */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-[#9EFF2B] bg-white/10 px-3 py-1 rounded-full">
              Get Started
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Ready to unlock your branch's potential?
            </h3>
            <p className="text-xs sm:text-sm text-primary-foreground/90 font-medium font-sans">
              Verify your college email, link up with seniors, and access thousands of vetted guides and unwritten tracks instantly.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <Button className="bg-white text-primary hover:bg-[#9EFF2B] hover:text-black font-extrabold transition-all duration-300">
                  Register Profile
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold transition-all duration-300">
                  Explore Intel Feed
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
