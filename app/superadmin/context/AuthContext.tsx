'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../utils/apiClient';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isAuthChecking: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: AdminUser }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  dbLatency: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dbLatency, setDbLatency] = useState<number>(24);

  // Verify Authentication & Session on mount
  useEffect(() => {
    const verifySession = async () => {
      setIsAuthChecking(true);
      try {
        const authRes = await apiClient.get('/api/superadmin/auth', { skipAuth: false });
        if (authRes.success && authRes.data?.authenticated) {
          const authUser = authRes.data.user;
          setUser(authUser);
          setIsAuthenticated(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem('superadmin_auth', 'true');
            localStorage.setItem('superadmin_user', JSON.stringify(authUser));
          }
          return;
        }

        // Fallback check from localStorage
        if (typeof window !== 'undefined') {
          const storedAuth = localStorage.getItem('superadmin_auth');
          const storedUser = localStorage.getItem('superadmin_user');
          if (storedAuth === 'true' && storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
            return;
          }
        }

        setUser(null);
        setIsAuthenticated(false);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecking(false);
      }
    };

    verifySession();
  }, []);

  // Centralized Login Action
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await apiClient.post('/api/superadmin/auth', {
        email: email.trim(),
        password: password.trim(),
      });

      if (res.success) {
        const loggedUser: AdminUser = res.data?.user || res.data || {
          email,
          name: 'Super Administrator',
          role: 'SUPERADMIN',
        };

        setUser(loggedUser);
        setIsAuthenticated(true);

        if (typeof window !== 'undefined') {
          localStorage.setItem('superadmin_auth', 'true');
          localStorage.setItem('superadmin_user', JSON.stringify(loggedUser));
        }

        return { success: true, user: loggedUser };
      } else {
        return { success: false, error: res.error || 'Invalid credentials' };
      }
    } catch {
      return { success: false, error: 'Authentication service unavailable' };
    } finally {
      setIsLoading(false);
    }
  };

  // Centralized Logout Action
  const logout = async () => {
    try {
      await apiClient.delete('/api/superadmin/auth');
    } catch {
      // Proceed with client cleanup
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('superadmin_auth');
        localStorage.removeItem('superadmin_user');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthChecking,
        login,
        logout,
        isLoading,
        dbLatency,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
