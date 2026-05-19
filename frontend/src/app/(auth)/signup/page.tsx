'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, GraduationCap, Briefcase, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setLoading } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [role, setRole] = useState<'FRESHER' | 'VERIFIED_SENIOR'>('FRESHER');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const handleNext = () => {
    setError(null);
    if (step === 1 && !role) {
      setError('Please select a role to continue.');
      return;
    }
    if (step === 2 && (!name || !email)) {
      setError('Please provide your name and email.');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword || !collegeId) {
      setError('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    dispatch(setLoading(true));
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, collegeId, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Registration failed. Please try again.');
      }

      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during signup.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full flex flex-col justify-center min-h-[calc(100vh-8rem)] lg:min-h-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account!</h1>
        <p className="text-muted-foreground text-sm">Sign up to join the exclusive campus intelligence network.</p>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mt-6">
          <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={step === 3 ? handleSignup : (e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
        
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <Label className="font-semibold text-foreground text-base">I am joining as a...</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('FRESHER')}
                className={`flex flex-col items-center justify-center py-8 rounded-xl border-2 transition-all ${
                  role === 'FRESHER'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-input bg-background text-muted-foreground hover:bg-accent'
                }`}
              >
                <GraduationCap className="h-10 w-10 mb-3" />
                <span className="text-base font-semibold">Fresher</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('VERIFIED_SENIOR')}
                className={`flex flex-col items-center justify-center py-8 rounded-xl border-2 transition-all ${
                  role === 'VERIFIED_SENIOR'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-input bg-background text-muted-foreground hover:bg-accent'
                }`}
              >
                <Briefcase className="h-10 w-10 mb-3" />
                <span className="text-base font-semibold">Senior</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold text-foreground">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Input your full name"
                className="h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all rounded-md"
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
                placeholder="Input your college email"
                className="h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all rounded-md"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <Label htmlFor="collegeId" className="font-semibold text-foreground">College ID / Reg. No.</Label>
              <Input
                id="collegeId"
                type="text"
                required
                autoFocus
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                placeholder="e.g. 2024CS001"
                className="h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-semibold text-foreground">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all rounded-md"
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-2">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline"
              onClick={handleBack}
              className="h-12 px-6 rounded-full border-input hover:bg-accent transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full transition-all flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : step < 3 ? (
              <>
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              'Complete Sign Up'
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-foreground hover:underline font-semibold transition-colors">
          Log in here
        </Link>
      </div>
    </div>
  );
}
