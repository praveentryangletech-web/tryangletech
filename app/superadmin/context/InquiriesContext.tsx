'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import apiClient from '../utils/apiClient';
import { Inquiry, INITIAL_INQUIRIES } from '../data/mockData';

interface InquiriesContextType {
  inquiries: Inquiry[];
  selectedInquiry: Inquiry | null;
  setSelectedInquiry: (inquiry: Inquiry | null) => void;
  updateInquiryStatus: (id: string, newStatus: Inquiry['status']) => Promise<void>;
  fetchInquiries: () => Promise<void>;
  isLoading: boolean;
  stats: {
    totalInquiries: number;
    newInquiriesCount: number;
  };
}

const InquiriesContext = createContext<InquiriesContextType | undefined>(undefined);

export function InquiriesProvider({ children }: { children: ReactNode }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch inquiries from database
  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get<Inquiry[]>('/api/contact');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setInquiries(res.data);
      }
    } catch (err) {
      console.warn('Failed to load live inquiries, using fallback data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Update lead CRM status with optimistic UI + DB persistence
  const updateInquiryStatus = async (id: string, newStatus: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    const res = await apiClient.patch('/api/contact', { id, status: newStatus });
    if (!res.success) {
      console.error('Failed to persist status change to database:', res.error);
    }
  };

  const newInquiriesCount = inquiries.filter((i) => i.status === 'NEW').length;

  return (
    <InquiriesContext.Provider
      value={{
        inquiries,
        selectedInquiry,
        setSelectedInquiry,
        updateInquiryStatus,
        fetchInquiries,
        isLoading,
        stats: {
          totalInquiries: inquiries.length,
          newInquiriesCount: newInquiriesCount || inquiries.length,
        },
      }}
    >
      {children}
    </InquiriesContext.Provider>
  );
}

export function useInquiries() {
  const context = useContext(InquiriesContext);
  if (!context) {
    throw new Error('useInquiries must be used within an InquiriesProvider');
  }
  return context;
}
