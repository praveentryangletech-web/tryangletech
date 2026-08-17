'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Inquiry,
  Quote,
  Subscriber,
  INITIAL_INQUIRIES,
  INITIAL_QUOTES,
  INITIAL_SUBSCRIBERS,
} from '../data/mockData';

interface SuperadminContextType {
  inquiries: Inquiry[];
  quotes: Quote[];
  selectedInquiry: Inquiry | null;
  setSelectedInquiry: (inquiry: Inquiry | null) => void;
  updateInquiryStatus: (id: string, newStatus: Inquiry['status']) => Promise<void>;
  refreshData: () => Promise<void>;
  isLoading: boolean;
  dbLatency: number;
  stats: {
    totalInquiries: number;
    newInquiriesCount: number;
    totalQuotes: number;
  };
}

const SuperadminContext = createContext<SuperadminContextType | undefined>(undefined);

export function SuperadminProvider({ children }: { children: ReactNode }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [quotes, setQuotes] = useState<Quote[]>(INITIAL_QUOTES);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dbLatency, setDbLatency] = useState<number>(24);

  // Fetch live health & inquiries from backend if available
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Health check
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        const healthData = await healthRes.json();
        if (healthData.success && healthData.data?.latencyMs) {
          setDbLatency(healthData.data.latencyMs);
        }
      }

      // 2. Fetch live inquiries if API is ready
      const contactRes = await fetch('/api/contact', {
        headers: { 'x-admin-key': 'tryangle-superadmin-secret-2026' },
      });
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        if (contactData.success && Array.isArray(contactData.data) && contactData.data.length > 0) {
          const mapped: Inquiry[] = contactData.data.map((item: any) => ({
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
      }
    } catch (err) {
      console.warn('Backend sync in fallback mode:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Update lead status in context and on selected lead
  const updateInquiryStatus = async (id: string, newStatus: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const newInquiriesCount = inquiries.filter((i) => i.status === 'NEW').length;

  const value: SuperadminContextType = {
    inquiries,
    quotes,
    selectedInquiry,
    setSelectedInquiry,
    updateInquiryStatus,
    refreshData,
    isLoading,
    dbLatency,
    stats: {
      totalInquiries: inquiries.length,
      newInquiriesCount: newInquiriesCount || inquiries.length,
      totalQuotes: quotes.length,
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
