'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your registered email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to initiate password reset.');
      }

      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Forgot Password?</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email address and we'll send you a 6-digit code to securely reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleForgotPassword} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-semibold text-foreground">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Input your email"
            className="h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all rounded-md"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading || !email} 
          className="w-full h-12 mt-6 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Send Reset Code'
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <Link 
          href="/login" 
          className="inline-flex items-center text-foreground hover:underline font-semibold transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );
}
