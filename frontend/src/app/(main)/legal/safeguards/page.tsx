import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, CheckSquare, AlertTriangle, UserMinus, ShieldAlert } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Accountability & Safeguards | InsightU',
  description: 'Understand the automated peer moderation mechanics, weighted validation system, and global purge thresholds that keep InsightU safe and authentic.',
};

export default function SafeguardsPage() {
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
              <ShieldAlert className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Content Accountability & Safeguards</h1>
              <p className="text-muted-foreground mt-1">Last Updated: October 2023</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-10">
            <p className="text-muted-foreground leading-relaxed text-lg">
              To guarantee that the institutional intelligence shared across InsightU remains authentic, actionable, and entirely free of malicious sabotage, our platform deploys a stringent, automated peer moderation engine. This page explicitly details the underlying trust mechanics and algorithmic thresholds that mathematically enforce community standards.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center text-foreground border-b border-border pb-3">
                <CheckSquare className="w-6 h-6 mr-3 text-primary" />
                Section 1: Weighted Validation System
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Our crowdsourced consensus operates on an immutable, ledger-based validation architecture. Every piece of campus intelligence submitted to the platform receives continuous, public scrutiny via validation votes—explicitly logged as 'VALID' or 'INVALID' interactions by other authenticated students reading the feed.
                </p>
                <p>
                  To prevent coordinated manipulation and ensure that seasoned voices have the appropriate impact, this system is heavily weighted by user roles. A generic student profile interacting with a post contributes a standard base modifier to its net confidence score. However, if a user holding a confirmed <strong>VERIFIED_SENIOR</strong> credential validates or invalidates a post, our engine instantly injects a double-weighted score modification into the tracking ledger. This mechanism guarantees that proven institutional veterans possess the mathematical authority necessary to swiftly amplify factual data and suppress misleading guidance.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center text-foreground border-b border-border pb-3">
                <AlertTriangle className="w-6 h-6 mr-3 text-primary" />
                Section 2: The -5 Global Purge Threshold
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  InsightU does not rely solely on slow, manual administrative reviews to maintain its ecosystem. We utilize an automated execution script that acts instantly when communal consensus dictates that a post is definitively false, toxic, or academically compromising.
                </p>
                
                <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 my-6">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle className="font-bold tracking-wide text-base">CRITICAL EXECUTION PROTOCOL</AlertTitle>
                  <AlertDescription className="text-destructive/90 leading-relaxed mt-2 text-sm">
                    If any intelligence post's aggregate net confidence rating drops below an absolute mathematical threshold of <strong>-5</strong>, our backend engine natively intercepts the state transition. The post's visibility flag is automatically toggled to 'FLAGGED', instantaneously decoupling and removing the entity from all active client API queries, caching layers, and search indexes platform-wide.
                  </AlertDescription>
                </Alert>

                <p>
                  This zero-tolerance quarantine prevents harmful or inaccurate institutional guidance from misleading first-generation students while an administrative manual review is scheduled to permanently resolve the ticket.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center text-foreground border-b border-border pb-3">
                <UserMinus className="w-6 h-6 mr-3 text-primary" />
                Section 3: Author Reliability Degradation
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Accountability on InsightU extends beyond individual posts; it is permanently tied to the author's global profile. Every user is assigned a dynamic Reliability Score that tracks their historical contribution quality.
                </p>
                <p>
                  Submitting false metadata, fabricating campus timelines, or attempting to distribute academic violations carries severe long-term penalties. Whenever an author's post is flagged or heavily invalidated by the community, their global credibility scoring profile mathematically degrades into negative tiers. Dropping into these restricted brackets automatically triggers algorithmic rate limits, silencing the offending user's future publishing permissions and stripping away their capability to cast validation votes on other logs until their standing is manually rehabilitated.
                </p>
              </div>
            </section>

          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>By publishing intelligence on InsightU, you accept the authority of our automated moderation mechanics and peer-verification ledger.</p>
        </div>
      </div>
    </div>
  );
}

