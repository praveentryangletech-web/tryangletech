'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { HomeContentDTO } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

export interface HomeContextType {
  content: HomeContentDTO;
  isLoading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

// In-memory client cache for 0ms transitions
let cachedHomeContent: HomeContentDTO | null = null;

export function HomeProvider({
  children,
  initialContent,
}: {
  children: ReactNode;
  initialContent?: HomeContentDTO;
}) {
  const [content, setContent] = useState<HomeContentDTO>(() => {
    if (initialContent) {
      cachedHomeContent = initialContent;
      return initialContent;
    }
    return cachedHomeContent || DEFAULT_HOME_CONTENT;
  });

  const [isLoading, setIsLoading] = useState<boolean>(!initialContent && !cachedHomeContent);
  const [error, setError] = useState<string | null>(null);

  const fetchHomeContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/home', {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`Home API responded with status ${res.status}`);
      const json = await res.json();
      if (json.success && json.data) {
        setContent(json.data);
        cachedHomeContent = json.data;
      }
    } catch (err: any) {
      console.warn('[HomeContext] Failed to fetch live home content:', err);
      setError(err?.message || 'Failed to load home content');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialContent) {
      cachedHomeContent = initialContent;
      setContent(initialContent);
      setIsLoading(false);
      return;
    }

    if (!cachedHomeContent) {
      fetchHomeContent();
    }
  }, [initialContent, fetchHomeContent]);

  const value = useMemo<HomeContextType>(
    () => ({
      content,
      isLoading,
      error,
      refreshContent: fetchHomeContent,
    }),
    [content, isLoading, error, fetchHomeContent]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHomeContent(): HomeContextType {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContent must be used within a HomeProvider');
  }
  return context;
}

export const useHome = useHomeContent;
