'use client';

import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F7F4] dark:bg-zinc-950 text-[#1C1E1A] dark:text-[#F3F4F6] flex flex-col justify-center items-center px-6 text-center select-none">

      {/* 404 Header Text */}
      <h1 className="text-[120px] sm:text-[140px] font-light tracking-tight leading-none text-[#2A2E26] dark:text-[#E4E6E1]">
        404
      </h1>

      {/* Main Error Callout */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#2A2E26] dark:text-[#E4E6E1] mt-4 tracking-tight">
        Oops... Something went wrong.
      </h2>

      {/* Detailed Assistive Paragraph */}
      <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xs sm:max-w-md mx-auto font-sans font-medium">
        We can't find the page you're looking for.
      </p>

      {/* Replicated High Contrast Gold Button */}
      <div className="mt-8">
        <Link href="/" className={buttonVariants({
          variant: "default",
          className: "text-black font-semibold text-xs sm:text-sm px-6 py-3 cursor-pointer uppercase tracking-wider"
        })}>
          Back to home
        </Link>
      </div>

    </div>
  );
}
