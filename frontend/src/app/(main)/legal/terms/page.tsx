import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Scale, ShieldAlert, GraduationCap, Copyright } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Terms of Service | InsightU',
  description: 'Read the Terms of Service for InsightU. Learn about our community guidelines, academic honesty policies, and crowdsourced data integrity standards.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className={cn(
            buttonVariants({ variant: "ghost" }), 
            "mb-8 hover:bg-card/40 text-muted-foreground hover:text-foreground transition-all flex items-center w-fit"
          )}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-12 shadow-xl">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-inner">
              <Scale className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Terms of Service</h1>
              <p className="text-muted-foreground mt-1">Last Updated: October 2023</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-10">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Welcome to InsightU. By accessing or using our platform, you agree to be bound by these Terms of Service. Our mission is to bridge the knowledge gap for first-generation college students by crowdsourcing the "invisible curriculum" of higher education. To maintain the integrity and safety of this ecosystem, all users must strictly adhere to the following community standards and legal obligations.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center text-foreground border-b border-border pb-3">
                <ShieldAlert className="w-6 h-6 mr-3 text-primary" />
                Section 1: Crowdsourced Data Integrity
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  InsightU relies on the collective accuracy of its user base to demystify complex institutional processes. You agree that any campus intelligence, institutional logs, or navigational advice you post will be authentic, firsthand, and verified to the best of your knowledge.
                </p>
                <p>
                  Fabricating academic updates, pipeline avenues, internship timelines, or administrative deadlines is strictly prohibited. Users found intentionally polluting the crowd-sourced data pool with false or malicious information will have their Senior privileges revoked and their accounts permanently terminated. The platform’s algorithm weighs your Reliability Score heavily; maintaining absolute honesty is required to interact with the broader community feed.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center text-foreground border-b border-border pb-3">
                <GraduationCap className="w-6 h-6 mr-3 text-primary" />
                Section 2: Academic Honesty
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  The fundamental purpose of InsightU is to unlock the "invisible curriculum"—the unwritten rules of college survival, including understanding administrative structures, decoding financial aid prerequisites, and mastering degree planning.
                </p>
                <p>
                  Our platform is <strong>explicitly not a cheating service</strong>. Under no circumstances may InsightU be utilized to share examination leaks, solicit or distribute direct homework solutions, coordinate unauthorized academic collaboration, or otherwise compromise the academic integrity policies of any university. Any posts containing direct academic solutions or testing material will be immediately purged, and the offending user will be banned and potentially reported to their corresponding institution.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center text-foreground border-b border-border pb-3">
                <Copyright className="w-6 h-6 mr-3 text-primary" />
                Section 3: Intellectual Property
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  By submitting, posting, or displaying content on or through InsightU, you retain all ownership rights to your original public logs, advice, and shared intelligence. We do not claim ownership over the localized campus data you independently author.
                </p>
                <p>
                  However, by actively submitting content to our crowdsourced feeds, you grant InsightU a worldwide, non-exclusive, perpetual, royalty-free, and fully sublicensable license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content across any media or distribution methods. This license allows us to aggregate your intelligence into overarching guides, utilize your posts to calculate global reliability metrics, and continually host your insights to benefit future generations of incoming students.
                </p>
              </div>
            </section>

          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>By continuing to use InsightU, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
        </div>
      </div>
    </div>
  );
}

