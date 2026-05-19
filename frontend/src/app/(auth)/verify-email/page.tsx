'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

function VerifyEmailContent() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    if (!email) {
      setError('Email address is missing. Please try signing up again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Verification failed. Please check your code.');
      }

      setSuccess(true);
      
      setTimeout(() => {
        router.push('/');
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during verification.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Check Your Email</h1>
        <p className="text-muted-foreground text-sm">
          We sent a 6-digit verification code to <br />
          <span className="font-semibold text-foreground">{email || 'your email'}</span>
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm font-medium flex flex-col items-center">
          <CheckCircle2 className="h-6 w-6 mb-2" />
          Email verified successfully! Redirecting to home...
        </div>
      )}

      {!success && (
        <form onSubmit={handleVerify} className="space-y-8">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            disabled={isLoading}
          >
            <InputOTPGroup className="gap-2 sm:gap-3 w-full justify-between">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot 
                  key={i} 
                  index={i} 
                  className="w-12 h-14 text-xl bg-background border-input focus-visible:ring-1 focus-visible:ring-primary rounded-md" 
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <Button 
            type="submit" 
            disabled={isLoading || otp.length !== 6} 
            className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Account'
            )}
          </Button>
        </form>
      )}

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Didn't receive the email?{' '}
        <button 
          type="button"
          disabled={isLoading || success || resendLoading}
          className="text-foreground hover:underline font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={async () => {
            if (!email) {
              setError('Email address is missing.');
              return;
            }
            setResendLoading(true);
            setResendSuccess(false);
            setError(null);
            try {
              const res = await fetch('http://localhost:5000/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.message || data.error || 'Failed to resend code.');
              setResendSuccess(true);
              setTimeout(() => setResendSuccess(false), 5000);
            } catch (err: any) {
              setError(err.message || 'Failed to resend verification code.');
            } finally {
              setResendLoading(false);
            }
          }}
        >
          {resendLoading ? 'Sending...' : resendSuccess ? 'Code sent!' : 'Click to resend'}
        </button>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground font-medium">Loading secure environment...</p>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
