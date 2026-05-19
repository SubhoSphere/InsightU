'use client';

import React, { useState } from 'react';
import {
  Loader2,
  CheckCircle2,
  Phone,
  MapPin,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { useAppSelector } from '@/store/store';
import { Button } from '@/components/ui/button';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 py-5 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
          {question}
        </span>
        <div className="flex-shrink-0 ml-4 w-6 h-6 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 transition-transform duration-300">
          <span className="text-sm font-bold leading-none select-none">
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mt-3' : 'max-h-0'}`}>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function SupportPage() {
  const { user } = useAppSelector((state) => state.auth);

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock server transaction
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);

    // Reset form
    setCategory('');
    setPhone('');
    setDescription('');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 flex items-center justify-center bg-[#F7F7F4] dark:bg-zinc-950 text-[#1C1E1A] dark:text-[#F3F4F6]">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 text-center shadow-sm rounded-none">
          <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Request Logged</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
            Thank you for reaching out. Your request has been successfully filed. Our campus support team will get back to you at <span className="font-semibold text-zinc-900 dark:text-zinc-100">{email}</span> within 24-48 hours.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="w-full bg-[#F5C20A] hover:bg-[#E5B509] text-black font-semibold text-sm rounded-none py-3 transition-colors uppercase tracking-wider"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#1C1E1A] dark:text-[#F3F4F6] pt-32 pb-24 selection:bg-primary/20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-24">

        {/* SECTION 2: Get In Touch (Mockup 2 Reference) */}
        <section className="space-y-12">

          {/* Dynamic Section Header */}
          <h2 className="text-4xl sm:text-5xl font-black text-[#2A2E26] dark:text-[#E4E6E1] tracking-tight">
            Get in touch
          </h2>

          <div className="grid md:grid-cols-12 gap-16 items-start">

            {/* Left Side: Contact Form Column */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-8">

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Send a Message
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
                  Have a question, data appeal, or verification anomaly? File a ticket directly with our coordination team.
                </p>
              </div>

              {/* Form Input fields formatted with sleek bottom borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">

                {/* Full Name */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="form-name" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-transparent border-0 border-b border-zinc-300 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-0 rounded-none w-full px-0 py-2.5 text-sm placeholder-zinc-300 dark:placeholder-zinc-700 outline-none transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="form-email" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-transparent border-0 border-b border-zinc-300 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-0 rounded-none w-full px-0 py-2.5 text-sm placeholder-zinc-300 dark:placeholder-zinc-700 outline-none transition-colors"
                  />
                </div>

                {/* Category Selection Dropdown */}
                <div className="flex flex-col space-y-1 relative">
                  <label htmlFor="form-category" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Interested In
                  </label>
                  <div className="relative">
                    <select
                      id="form-category"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="appearance-none bg-transparent border-0 border-b border-zinc-300 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-0 rounded-none w-full px-0 py-3 text-sm text-zinc-700 dark:text-zinc-300 outline-none transition-colors cursor-pointer"
                    >
                      <option value="" disabled className="dark:bg-zinc-900">Select a category</option>
                      <option value="bug" className="dark:bg-zinc-900">Bug Report</option>
                      <option value="inaccuracy" className="dark:bg-zinc-900">Data Appeal</option>
                      <option value="verification" className="dark:bg-zinc-900">Senior Verification</option>
                      <option value="general" className="dark:bg-zinc-900">General Inquiry</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="form-phone" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    id="form-phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="bg-transparent border-0 border-b border-zinc-300 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-0 rounded-none w-full px-0 py-2.5 text-sm placeholder-zinc-300 dark:placeholder-zinc-700 outline-none transition-colors"
                  />
                </div>

              </div>

              {/* Message Description */}
              <div className="flex flex-col space-y-1 pt-4">
                <label htmlFor="form-desc" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="form-desc"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us what you need help with..."
                  rows={4}
                  className="bg-transparent border-0 border-b border-zinc-300 dark:border-zinc-800 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-0 rounded-none w-full px-0 py-2.5 text-sm placeholder-zinc-300 dark:placeholder-zinc-700 outline-none resize-none transition-colors"
                />
              </div>

              {/* Submit Trigger - Replicated rectangular arrow button on bottom right */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-black font-semibold text-sm px-7 py-3 rounded-none flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white dark:text-black" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>→</span>
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Vertical Divider Border */}
            <div className="hidden md:block md:col-span-1 w-px bg-zinc-200 dark:bg-zinc-800 h-96 self-center justify-self-center" />

            {/* Right Side: Quick Info Details Panel */}
            <div className="md:col-span-4 space-y-10">

              {/* Call Us */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Call Us
                </h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-xs">
                  Connect with peer coordinators for real-time guidance during standard university working hours.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <Phone size={14} className="fill-orange-500/10" />
                  </div>
                  <a href="tel:2353251251" className="text-xs font-bold text-orange-500 hover:underline">
                    (235) 325-1251
                  </a>
                </div>
              </div>

              {/* Visit Us */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Visit Us
                </h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-xs">
                  Locate our active advisor desk inside the Innovation & Engineering central library workspace.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <MapPin size={14} />
                  </div>
                  <span className="text-xs font-bold text-orange-500">
                    1234 Divi St. #100, San Francisco, CA
                  </span>
                </div>
              </div>

              {/* Live Chat */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Live Chat
                </h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-xs">
                  Chat directly with active senior mentors in your specific branch feed.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <MessageSquare size={14} />
                  </div>
                  <button className="text-xs font-bold text-orange-500 hover:underline cursor-pointer">
                    Start Chat
                  </button>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* SECTION 1: Frequently Asked Questions (Mockup 1 Reference) */}
        <section className="grid md:grid-cols-12 gap-12 items-start">

          {/* Left Title Column (12 cols grid, uses 5 for title) */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-bold font-mono tracking-widest text-zinc-400 uppercase">
              FAQ
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 leading-[1.1] tracking-tight">
              Frequently<br />
              asked<br />
              questions.
            </h1>
          </div>

          {/* Right Accordion Column (uses 7 for accordions) */}
          <div className="md:col-span-7 space-y-2">
            <FAQItem
              question="How does peer consensus verify campus files?"
              answer="InsightU secures absolute reliability by cross-verifying student uploads against our crowdsourced senior advisor base and tracking real-time reliability rating metrics."
            />
            <FAQItem
              question="What constitutes a Senior Guide credential?"
              answer="Senior status is verified using institutional credentials, curriculum ratings, and peer ratings to protect forum segmentation feeds from inaccuracy."
            />
            <FAQItem
              question="How do I appeal a reliability index score?"
              answer="If your score fell due to flagging parameters, please submit an appeal ticket below with attached syllabus materials for moderation."
            />
            <FAQItem
              question="Are student-uploaded materials anonymous?"
              answer="Yes. To secure absolute transparency and sovereign intelligence, all student identities remain protected under our core security protocol."
            />
            <FAQItem
              question="How do I request support for a new branch?"
              answer="Select 'General Inquiry' from our dropdown menu below and list your branch department details. Our advisors will configure your isolated feed within 24 hours."
            />
          </div>

        </section>

      </div>
    </div>
  );
}
