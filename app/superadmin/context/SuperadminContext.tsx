'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import apiClient from '../utils/apiClient';
import {
  Inquiry,
  INITIAL_INQUIRIES,
} from '../data/mockData';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}

interface SuperadminContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isAuthChecking: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: AdminUser }>;
  logout: () => Promise<void>;
  inquiries: Inquiry[];
  selectedInquiry: Inquiry | null;
  setSelectedInquiry: (inquiry: Inquiry | null) => void;
  updateInquiryStatus: (id: string, newStatus: Inquiry['status']) => Promise<void>;
  refreshData: () => Promise<void>;
  isLoading: boolean;
  dbLatency: number;
  stats: {
    totalInquiries: number;
    newInquiriesCount: number;
  };
}

const SuperadminContext = createContext<SuperadminContextType | undefined>(undefined);

export function SuperadminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dbLatency, setDbLatency] = useState<number>(24);

  // 1. Verify Authentication & Session on mount
  useEffect(() => {
    const verifySession = async () => {
      setIsAuthChecking(true);
      try {
        // First check backend session API
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

        // Not authenticated
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

  // 2. Centralized Login API Action
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
          name: 'Praveen Gupta',
          role: 'SUPERADMIN',
        };

        setUser(loggedUser);
        setIsAuthenticated(true);

        if (typeof window !== 'undefined') {
          localStorage.setItem('superadmin_auth', 'true');
          localStorage.setItem('superadmin_user', JSON.stringify(loggedUser));
        }

        // Fetch fresh inquiries upon successful login
        refreshData();

        return { success: true, user: loggedUser };
      } else {
        return { success: false, error: res.error || 'Invalid credentials.' };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Network authentication error.' };
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Centralized Logout API Action
  const logout = async () => {
    try {
      await apiClient.delete('/api/superadmin/auth');
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('superadmin_auth');
        localStorage.removeItem('superadmin_user');
      }
    }
  };

  // 4. Fetch live health & inquiries from backend
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Health check via apiClient
      const healthRes = await apiClient.get('/api/health');
      if (healthRes.success && healthRes.data?.latencyMs) {
        setDbLatency(healthRes.data.latencyMs);
      }

      // 2. Fetch live inquiries via apiClient
      const contactRes = await apiClient.get('/api/contact');
      if (contactRes.success && Array.isArray(contactRes.data) && contactRes.data.length > 0) {
        const mapped: Inquiry[] = contactRes.data.map((item: any) => ({
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          phone: item.phone || '',
          subjects: item.subjects || [],
          message: item.message,
          status: item.status || 'NEW',
          notes: item.notes || '',
          createdAt: item.createdAt,
        }));
        setInquiries(mapped);
      }
    } catch (err) {
      console.warn('Backend sync in fallback mode:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated, refreshData]);

  // 5. Update lead status in context and persist in Supabase PostgreSQL via apiClient.patch
  const updateInquiryStatus = async (id: string, newStatus: Inquiry['status']) => {
    // Optimistic UI update
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    // Live database mutation via apiClient
    const res = await apiClient.patch('/api/contact', { id, status: newStatus });
    if (!res.success) {
      console.error('Failed to persist status change to PostgreSQL:', res.error);
    }
  };

  const newInquiriesCount = inquiries.filter((i) => i.status === 'NEW').length;

  const value: SuperadminContextType = {
    user,
    isAuthenticated,
    isAuthChecking,
    login,
    logout,
    inquiries,
    selectedInquiry,
    setSelectedInquiry,
    updateInquiryStatus,
    refreshData,
    isLoading,
    dbLatency,
    stats: {
      totalInquiries: inquiries.length,
      newInquiriesCount: newInquiriesCount || inquiries.length,
    },
  };

  return <SuperadminContext.Provider value={value}>{children}</SuperadminContext.Provider>;
}

export function useSuperadmin() {
  const context = useContext(SuperadminContext);
  if (!context) {
    throw new Error('useSuperadmin must be used within a SuperadminProvider');
  }
  return context;
}
