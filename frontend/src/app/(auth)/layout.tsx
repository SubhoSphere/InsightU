import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Panel - Hero Section */}
      <div className="relative hidden lg:flex flex-col justify-between w-1/2 p-12 overflow-hidden bg-slate-950">
        <Image
          src="/images/auth-bg.png"
          alt="InsightU College Network"
          fill
          className="object-cover opacity-80 mix-blend-overlay"
          priority
        />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/90" />
        
        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">IU</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">InsightU</span>
          </Link>
          <Link href="/" className="flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Website
          </Link>
        </div>

        {/* Bottom Hero Text */}
        <div className="relative z-10 max-w-lg mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Connect Smarter.<br />
            Learn Faster.<br />
            Discover Anywhere.
          </h1>
          <p className="text-lg text-slate-300 font-medium">
            The exclusive intelligence platform bridging the gap for first-generation college students. Your campus feed, powered by verified seniors.
          </p>
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
