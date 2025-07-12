'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { verifySessionToken } from '../lib/auth';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fonction pour définir un cookie
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;samesite=lax`;
}

// Fonction pour supprimer un cookie
function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier le token au chargement
  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');

    if (storedToken) {
      // Vérifier la validité du token côté client
      const userData = verifySessionToken(storedToken);
      if (userData) {
        setToken(storedToken);
        setUser(userData);
        // S'assurer que le cookie est également défini
        setCookie('auth-token', storedToken, 7);
      } else {
        localStorage.removeItem('auth-token');
        deleteCookie('auth-token');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        
        // Stocker dans localStorage ET cookie
        localStorage.setItem('auth-token', data.token);
        setCookie('auth-token', data.token, 7); // 7 jours
        
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Erreur de connexion' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth-token');
    deleteCookie('auth-token');
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 