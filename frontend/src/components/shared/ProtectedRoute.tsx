'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '../../store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('FRESHER' | 'VERIFIED_SENIOR')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only runs auth checks after hydration on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isLoading) return;

    if (!isAuthenticated) {
      // Redirect to login, preserving the attempted URL
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Role-based authorization gate
    if (allowedRoles && allowedRoles.length > 0 && user) {
      if (!allowedRoles.includes(user.role)) {
        // Block access and redirect gracefully
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, router, pathname, isMounted]);

  // While checking auth status or waiting for hydration, show nothing to prevent flashes
  if (!isMounted || isLoading) {
    return null;
  }

  // Prevent render if unauthorized
  if (!isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
