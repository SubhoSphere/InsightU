'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useAppDispatch } from '@/store/store';
import { setCredentials } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to sign in. Please verify your credentials.');
      }

      dispatch(setCredentials({
        user: data.data.user,
        token: data.data.token,
      }));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground text-sm">Log in to start exploring the campus intelligence network.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-semibold text-foreground">Email</Label>
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="font-semibold text-foreground">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Input your password"
            className="h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all rounded-md"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="rounded border-input text-primary focus:ring-primary h-4 w-4" />
            <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">Remember Me</Label>
          </div>
          <Link 
            href="/forgot-password" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading} 
          className="w-full h-12 mt-6 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link href="/signup" className="text-foreground hover:underline font-semibold transition-colors">
          Sign up here
        </Link>
      </div>
    </div>
  );
}
