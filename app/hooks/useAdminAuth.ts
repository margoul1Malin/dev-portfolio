'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAdminAuth() {
  const { user, isAuthenticated, isLoading, logout: authLogout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    } else if (!isLoading && isAuthenticated && user?.role !== 'admin') {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  const logout = () => {
    authLogout();
    router.push('/auth/login');
  };

  return {
    isAuthenticated: isAuthenticated && user?.role === 'admin',
    isLoading,
    user,
    logout,
    authChecked: !isLoading
  };
} 