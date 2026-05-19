'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border relative z-10">
      {/* Subtle Grid Matrix Accent Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-16">

          {/* Brand Block */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center">
              <img src="/l_logo.png" alt="InsightU Logo" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-medium">
              A sovereign, peer-verified academic intelligence network. We inspire college students to collaborate, exchange facts, and navigate placement tracks with absolute clarity.
            </p>
          </div>

          {/* Column 1: Intelligence Hub */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono mb-6">
              Intelligence
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Placements Intel
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Academics Shortcuts
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Exam Cheatsheets
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Anonymous Pulse
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono mb-6">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Study Rooms
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  LAB Reservations
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Mentors Directory
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Campus Timeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Company */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono mb-6">
              Platform
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Privacy Schema
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Algorithm Terms
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary font-medium transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright alignment */}
        <div className="mt-16 pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} InsightU Intelligence Platform. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs font-mono text-muted-foreground">
            <span>Powered by Sovereign consensus algorithms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
