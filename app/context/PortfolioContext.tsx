'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Project, projects as staticProjects } from '@/app/data/portfolioData';

export const DEFAULT_PORTFOLIO_CATEGORIES = [
  "All",
  "Business Website",
  "E-Commerce",
  "Landing Website",
  "Mobile Application",
  "Custom Software",
  "Graphic Design",
];

export interface PortfolioContextType {
  projectsList: Project[];
  categoriesList: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  page: number;
  setPage: (page: number) => void;
  hasNextPage: boolean;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  totalCount: number;
  fetchProjects: (pageNum: number, category: string, limit?: number, isAppend?: boolean) => Promise<void>;
  loadMore: (limit?: number) => Promise<void>;
  refreshProjects: (limit?: number) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// In-memory SWR client cache for 0ms transitions
const clientMemoryCache = new Map<string, { items: Project[]; total: number; hasNextPage: boolean }>();

export function PortfolioProvider({
  children,
  initialProjects,
  initialCategories,
  initialLimit = 9,
}: {
  children: ReactNode;
  initialProjects?: Project[];
  initialCategories?: string[];
  initialLimit?: number;
}) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [categoriesList, setCategoriesList] = useState<string[]>(() => {
    if (initialCategories && initialCategories.length > 0) return initialCategories;
    return DEFAULT_PORTFOLIO_CATEGORIES;
  });

  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    if (initialProjects && initialProjects.length > 0) return initialProjects;
    return staticProjects;
  });

  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(() => {
    if (initialProjects && initialProjects.length > 0) return initialProjects.length;
    return staticProjects.length;
  });

  // Fetch dynamic categories on mount
  useEffect(() => {
    async function loadDynamicCategories() {
      try {
        const res = await fetch('/api/portfolio/categories', {
          headers: { 'Accept': 'application/json' },
        });
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const fetchedNames = json.data.map((c: any) => c.name).filter(Boolean);
          const defaultNames = DEFAULT_PORTFOLIO_CATEGORIES.filter((c) => c !== 'All');
          const merged = Array.from(new Set(['All', ...defaultNames, ...fetchedNames]));
          setCategoriesList(merged);
        }
      } catch {
        // Fallback to defaults
      }
    }
    loadDynamicCategories();
  }, []);

  const fetchProjects = useCallback(
    async (pageNum: number, category: string, limit: number = initialLimit, isAppend = false) => {
      const cacheKey = `${category}:${pageNum}:${limit}`;

      // 1. Instant Cache Hit (0ms transition)
      if (!isAppend && clientMemoryCache.has(cacheKey)) {
        const cached = clientMemoryCache.get(cacheKey)!;
        setProjectsList(cached.items);
        setHasNextPage(cached.hasNextPage);
        setTotalCount(cached.total);
        return;
      }

      if (isAppend) {
        setIsLoadingMore(true);
      } else {
        setIsInitialLoading(true);
      }

      try {
        const queryParams = new URLSearchParams({
          page: String(pageNum),
          limit: String(limit),
        });
        if (category && category !== 'All') {
          queryParams.append('category', category);
        }

        const res = await fetch(`/api/portfolio?${queryParams.toString()}`, {
          headers: { 'Accept': 'application/json' },
        });
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const fetchedItems: Project[] = json.data;
          const pagination = json.pagination || {};
          const nextAvailable = pagination.hasNextPage ?? (fetchedItems.length >= limit);
          const total = pagination.total ?? fetchedItems.length;

          setProjectsList((prev) => {
            const nextList = isAppend ? [...prev, ...fetchedItems] : fetchedItems;
            return nextList;
          });
          setHasNextPage(nextAvailable);
          setTotalCount(total);

          // Update client cache
          clientMemoryCache.set(cacheKey, {
            items: fetchedItems,
            total,
            hasNextPage: nextAvailable,
          });
        }
      } catch (err) {
        console.warn('[PortfolioContext] Failed to load projects:', err);
      } finally {
        setIsInitialLoading(false);
        setIsLoadingMore(false);
      }
    },
    [initialLimit]
  );

  const loadMore = useCallback(
    async (limit: number = initialLimit) => {
      if (isLoadingMore || !hasNextPage) return;
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchProjects(nextPage, activeFilter, limit, true);
    },
    [isLoadingMore, hasNextPage, page, activeFilter, fetchProjects, initialLimit]
  );

  const refreshProjects = useCallback(
    async (limit: number = initialLimit) => {
      setPage(1);
      await fetchProjects(1, activeFilter, limit, false);
    },
    [activeFilter, fetchProjects, initialLimit]
  );

  const value = useMemo<PortfolioContextType>(
    () => ({
      projectsList,
      categoriesList,
      activeFilter,
      setActiveFilter,
      page,
      setPage,
      hasNextPage,
      isInitialLoading,
      isLoadingMore,
      totalCount,
      fetchProjects,
      loadMore,
      refreshProjects,
    }),
    [
      projectsList,
      categoriesList,
      activeFilter,
      page,
      hasNextPage,
      isInitialLoading,
      isLoadingMore,
      totalCount,
      fetchProjects,
      loadMore,
      refreshProjects,
    ]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioContextType {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
