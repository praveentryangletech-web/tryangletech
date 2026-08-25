'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { AboutContentDTO } from '@/backend/services/about/about.types';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';

export interface PublicAboutContextType {
  content: AboutContentDTO;
  isLoading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

const AboutContext = createContext<PublicAboutContextType | undefined>(undefined);

// In-memory SWR client cache
let clientCachedAbout: AboutContentDTO | null = null;

export function AboutProvider({
  children,
  initialContent,
}: {
  children: ReactNode;
  initialContent?: AboutContentDTO;
}) {
  const [content, setContent] = useState<AboutContentDTO>(() => {
    if (initialContent) {
      clientCachedAbout = initialContent;
      return initialContent;
    }
    return clientCachedAbout || (DEFAULT_ABOUT_CONTENT as AboutContentDTO);
  });

  const [isLoading, setIsLoading] = useState<boolean>(!initialContent && !clientCachedAbout);
  const [error, setError] = useState<string | null>(null);

  const fetchAboutContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/about', {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`About API responded with status ${res.status}`);
      const json = await res.json();
      if (json.success && json.data) {
        setContent(json.data);
        clientCachedAbout = json.data;
      }
    } catch (err: any) {
      console.warn('[AboutContext] Failed to fetch live about content:', err);
      setError(err?.message || 'Failed to load about content');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync / refresh if no initial content was provided
  useEffect(() => {
    if (!initialContent && !clientCachedAbout) {
      fetchAboutContent();
    }
  }, [initialContent, fetchAboutContent]);

  const value = useMemo<PublicAboutContextType>(
    () => ({
      content,
      isLoading,
      error,
      refreshContent: fetchAboutContent,
    }),
    [content, isLoading, error, fetchAboutContent]
  );

  return <AboutContext.Provider value={value}>{children}</AboutContext.Provider>;
}

export function useAboutContent(): PublicAboutContextType {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error('useAboutContent must be used within an AboutProvider');
  }
  return context;
}
