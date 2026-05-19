import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Shield, Database, Key, MailCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Privacy Policy | InsightU',
  description: 'Learn how InsightU securely handles your personal data, from institutional isolation in MongoDB to strict domain verification for college emails.',
};

export default function PrivacyPolicyPage() {
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
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Privacy Policy</h1>
              <p className="text-muted-foreground mt-1">Last Updated: October 2023</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-10">
            <p className="text-muted-foreground leading-relaxed text-lg">
              At InsightU, we believe that data privacy is a fundamental right, especially when navigating the complexities of higher education. This Privacy Policy outlines exactly how we capture, process, and secure the minimal personal data required to keep our campus intelligence platform authentic and trustworthy.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center text-foreground border-b border-border pb-3">
                <Database className="w-6 h-6 mr-3 text-primary" />
                Section 1: Institutional Isolation via MongoDB
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  To ensure that intelligence feeds remain highly relevant and strictly bound to individual university populations, InsightU utilizes advanced multi-tenant collection filtering within a secure MongoDB database architecture.
                </p>
                <p>
                  This means your localized data, logs, and interactions are mathematically partitioned and isolated from other institutions. We leverage this architecture not only to guarantee rapid query performance but also to ensure absolute structural separation, meaning a data query for one university's pipeline cannot inadvertently leak into another's.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center text-foreground border-b border-border pb-3">
                <Key className="w-6 h-6 mr-3 text-primary" />
                Section 2: Client Session LocalStorage Persistence
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  We prioritize a seamless user experience while maintaining stringent security protocols regarding your active session. When you authenticate with InsightU, your session is sustained entirely on the client side via your browser's LocalStorage.
                </p>
                <p>
                  This is achieved by storing heavily encrypted JSON Web Tokens (JWT bearer tokens) that confirm your identity and role. Because this persistence layer lives on your device, you have complete control over it. When you explicitly trigger the logout mechanism, all local tokens are instantly and permanently expunged from your browser, completely severing your authenticated connection to our backend services.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center text-foreground border-b border-border pb-3">
                <MailCheck className="w-6 h-6 mr-3 text-primary" />
                Section 3: Strict Domain Verification
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  The cornerstone of our crowdsourced trust model is the requirement that users possess valid institutional email addresses. We capture this email solely to perform strict domain validation.
                </p>
                <p>
                  This process restricts registration loops and guarantees that only authenticated, verified members of a specific campus community can access or contribute to its corresponding intelligence feed. <strong>Your email address is never rented, shared with third-party data brokers, or targeted for external communications.</strong> It exists within our ecosystem solely as a cryptographic trust anchor to protect the integrity of the platform.
                </p>
              </div>
            </section>

          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>If you have any questions regarding how your data is handled, please submit a ticket via our Support Center.</p>
        </div>
      </div>
    </div>
  );
}

