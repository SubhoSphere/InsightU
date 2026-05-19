'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2, LifeBuoy, Mail, HelpCircle, FileText, ShieldCheck } from 'lucide-react';
import { useAppSelector } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function SupportPage() {
  const { user } = useAppSelector((state) => state.auth);

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  
  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock an async server transaction
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);
    
    // Reset form dynamically
    setCategory('');
    setDescription('');
  };

  if (isSuccess) {
    return (
      <div className="min-h-[calc(100vh-4rem)] pt-32 pb-16 px-4 flex items-center justify-center bg-background">
        <div className="max-w-md w-full bg-card/50 backdrop-blur-md border border-border rounded-2xl p-8 text-center shadow-xl">
          <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Request Submitted</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for reaching out. Your ticket has been logged in our system. Our support team will review your request and get back to you at <span className="font-semibold text-foreground">{email}</span> within 24-48 hours.
          </p>
          <Button onClick={() => setIsSuccess(false)} className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12">
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-32 pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center">
      
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          <LifeBuoy className="w-4 h-4 mr-2" />
          Support Center
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">How can we help?</h1>
        <p className="text-lg text-muted-foreground">
          Whether you found a bug, need to verify your Senior credentials, or just have a general question, our team is here for you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 w-full max-w-5xl items-start">
        
        {/* Left Side: FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center text-foreground">
            <HelpCircle className="w-6 h-6 mr-2 text-primary" />
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="w-full bg-card/50 backdrop-blur-sm border border-border rounded-xl px-4 py-2">
            <AccordionItem value="item-1" className="border-border">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">How long does Senior Role Verification take?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Role verification is a manual process to ensure platform integrity. Once you submit your request along with a valid institutional ID or document, our team typically verifies it within 48 hours.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-border">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">What happens if a post is reported for inaccuracy?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                If multiple users report a post, it is temporarily hidden from the feed while our moderation algorithm reviews the author's Reliability Score and the context of the report.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-border">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">Can I change my college branch later?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes, but branch changes require a manual verification ticket to prevent abuse of the platform's isolated feeds. Please select "General Inquiry" to request a change.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">I found a critical bug. What should I do?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Please select "Bug Report" from the dropdown on the right and provide as much detail as possible, including steps to reproduce the issue.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-secondary/30 rounded-xl p-6 border border-border mt-8">
            <h3 className="font-bold text-foreground mb-2 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-primary" />
              Direct Email
            </h3>
            <p className="text-sm text-muted-foreground">
              For urgent matters that cannot be handled via the ticket system, you can email our administrative team directly at <a href="mailto:support@InsightU.edu" className="text-primary hover:underline font-medium">support@InsightU.edu</a>.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          {/* Subtle gradient glow inside form */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl font-bold flex items-center text-foreground mb-6 relative z-10">
            <FileText className="w-6 h-6 mr-2 text-primary" />
            Submit a Ticket
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold text-foreground">Full Name</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-background border-input focus-visible:ring-1 focus-visible:ring-primary h-12 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-foreground">College Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your institutional email"
                className="bg-background border-input focus-visible:ring-1 focus-visible:ring-primary h-12 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="font-semibold text-foreground">Ticket Category</Label>
              <Select required value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full bg-background border-input focus:ring-1 focus:ring-primary h-12 transition-all">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="inaccuracy">Data Inaccuracy Appeal</SelectItem>
                  <SelectItem value="verification">Senior Role Verification</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {category === 'verification' && (
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-primary-foreground animate-in fade-in slide-in-from-top-2">
                <p className="font-semibold mb-1 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Verification Notice
                </p>
                <p className="text-primary/80">
                  To expedite your role verification, please clearly state your graduation year and current institutional standing below. Our team may request you to securely upload institutional documents via email after reviewing this ticket.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold text-foreground">Description</Label>
              <Textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your issue or request in detail..."
                className="min-h-[120px] bg-background border-input focus-visible:ring-1 focus-visible:ring-primary resize-none transition-all"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !category} 
              className="w-full h-12 mt-4 rounded-full bg-foreground hover:bg-foreground/90 text-background font-semibold transition-all shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                'Submit Ticket'
              )}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}

