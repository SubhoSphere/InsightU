'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

function ResetPasswordContent() {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email context is missing. Please initiate the reset process again.');
      return;
    }
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit reset code.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please verify your new password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to reset password. The token might be expired.');
      }

      setSuccess(true);
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Reset Password</h1>
        <p className="text-muted-foreground text-sm">
          Enter the 6-digit code sent to <br />
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
          Password reset successfully! Redirecting to login...
        </div>
      )}

      {!success && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="space-y-2">
            <Label className="font-semibold text-foreground">Verification Code</Label>
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
          </div>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="font-semibold text-foreground">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Input new password"
                className="h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-semibold text-foreground">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all rounded-md"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || otp.length !== 6 || !newPassword || !confirmPassword} 
            className="w-full h-12 mt-6 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating Security...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground font-medium">Securing connection...</p>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
