'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { BlogPostItem } from '@/backend/services/blog';

export interface BlogContextType {
  posts: BlogPostItem[];
  latestPosts: BlogPostItem[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  fetchLatestPosts: (limit?: number) => Promise<BlogPostItem[]>;
  refreshPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// In-memory client cache
let cachedBlogPosts: BlogPostItem[] | null = null;
let cachedLatestPosts: BlogPostItem[] | null = null;

export function BlogProvider({
  children,
  initialPosts,
  initialLimit = 4,
}: {
  children: ReactNode;
  initialPosts?: BlogPostItem[];
  initialLimit?: number;
}) {
  const [posts, setPosts] = useState<BlogPostItem[]>(() => {
    if (initialPosts && initialPosts.length > 0) return initialPosts;
    if (cachedBlogPosts && cachedBlogPosts.length > 0) return cachedBlogPosts;
    return [];
  });

  const [latestPosts, setLatestPosts] = useState<BlogPostItem[]>(() => {
    if (cachedLatestPosts && cachedLatestPosts.length > 0) return cachedLatestPosts;
    if (initialPosts && initialPosts.length > 0) return initialPosts.slice(0, initialLimit);
    return [];
  });

  const [categories, setCategories] = useState<string[]>(['All']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(!initialPosts || initialPosts.length === 0);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestPosts = useCallback(async (limit: number = initialLimit): Promise<BlogPostItem[]> => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/blog?limit=${limit}&status=published&sortBy=publishedAt&sortOrder=desc`, {
        headers: { 'Accept': 'application/json' },
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const topPosts = json.data.slice(0, limit);
        setLatestPosts(topPosts);
        cachedLatestPosts = topPosts;
        return topPosts;
      }
      return [];
    } catch (err: any) {
      console.warn('[BlogContext] Failed to fetch latest posts:', err);
      setError(err?.message || 'Failed to fetch latest blog articles');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [initialLimit]);

  const refreshPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/blog?status=published&sortBy=publishedAt&sortOrder=desc', {
        headers: { 'Accept': 'application/json' },
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setPosts(json.data);
        cachedBlogPosts = json.data;
        const top4 = json.data.slice(0, initialLimit);
        setLatestPosts(top4);
        cachedLatestPosts = top4;
      }
    } catch (err: any) {
      console.warn('[BlogContext] Failed to refresh posts:', err);
      setError(err?.message || 'Failed to refresh blog posts');
    } finally {
      setIsLoading(false);
    }
  }, [initialLimit]);

  useEffect(() => {
    fetchLatestPosts(initialLimit);
  }, [fetchLatestPosts, initialLimit]);

  const value = useMemo<BlogContextType>(
    () => ({
      posts,
      latestPosts,
      categories,
      isLoading,
      error,
      activeCategory,
      setActiveCategory,
      fetchLatestPosts,
      refreshPosts,
    }),
    [posts, latestPosts, categories, isLoading, error, activeCategory, fetchLatestPosts, refreshPosts]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlog(): BlogContextType {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
