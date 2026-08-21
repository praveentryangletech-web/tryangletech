'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import apiClient, { PaginationMeta } from '../utils/apiClient';
import { Project, projects as staticProjects } from '../../data/portfolioData';
import { PortfolioCategoryItem, DEFAULT_PORTFOLIO_CATEGORY } from '@/backend/services/portfolio/category.service';

/**
 * Portfolio Context Interface defining the global state and API mutation functions
 * available to all Superadmin Portfolio components.
 */
interface PortfolioContextType {
  projectsList: Project[];
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (search: string) => void;
  pagination: PaginationMeta;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  deletingProject: Project | null;
  setDeletingProject: (project: Project | null) => void;
  fetchPortfolio: () => Promise<void>;
  saveProject: (projectData: Partial<Project>) => Promise<void>;
  deleteProject: (projectIdOrSlug: string) => Promise<void>;

  // Dynamic Category Management
  categoriesData: PortfolioCategoryItem[];
  categories: string[];
  isLoadingCategories: boolean;
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (open: boolean) => void;
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (idOrName: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

/**
 * PortfolioProvider Component
 * 
 * Manages server-side portfolio querying, pagination metadata, search debouncing,
 * category filtering, dynamic category management, and CRUD operations against PostgreSQL.
 * 
 * @param {ReactNode} children - Child components wrapped within this provider context
 */
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projectsList, setProjectsList] = useState<Project[]>(staticProjects.slice(0, 8));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Dynamic Categories state initialized with protected 'General' default
  const [categoriesData, setCategoriesData] = useState<PortfolioCategoryItem[]>([
    {
      id: 'cat_default_general',
      name: DEFAULT_PORTFOLIO_CATEGORY,
      slug: 'general',
      type: 'PORTFOLIO',
      order: 0,
      projectCount: 0,
      postCount: 0,
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
  const [categories, setCategories] = useState<string[]>([DEFAULT_PORTFOLIO_CATEGORY]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  // Server-side Pagination & Filter states
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const [pagination, setPagination] = useState<PaginationMeta>({
    total: staticProjects.length,
    page: 1,
    limit: 8,
    totalPages: Math.ceil(staticProjects.length / 8) || 1,
    hasNextPage: staticProjects.length > 8,
    hasPrevPage: false,
  });

  // Modal dialog states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  /**
   * Search Query Debounce Effect
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  /**
   * Fetch live dynamic categories from /api/portfolio/categories
   */
  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    try {
      const res = await apiClient.get<PortfolioCategoryItem[]>('/api/portfolio/categories', { useCache: false });
      if (res.success && Array.isArray(res.data)) {
        setCategoriesData(res.data);
        setCategories(res.data.map((c) => c.name));
      }
    } catch (err) {
      console.warn('Failed to load dynamic categories, using default fallback:', err);
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /**
   * Category Filter Handler
   */
  const handleSetCategoryFilter = useCallback((cat: string) => {
    setCategoryFilter(cat);
    setPage(1);
  }, []);

  /**
   * Search Query Handler
   */
  const handleSetSearchQuery = useCallback((q: string) => {
    setSearchQuery(q);
    setPage(1);
  }, []);

  /**
   * Page Size / Rows-per-Page Handler
   */
  const handleSetLimit = useCallback((l: number) => {
    setLimit(l);
    setPage(1);
  }, []);

  /**
   * Fetch Live Paginated Portfolio API
   */
  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string | number> = {
        page,
        limit,
      };

      if (categoryFilter && categoryFilter !== 'ALL') {
        params.category = categoryFilter;
      }

      if (debouncedSearch && debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      const res = await apiClient.get<Project[]>('/api/portfolio', { params });
      if (res.success && Array.isArray(res.data)) {
        setProjectsList(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        } else {
          setPagination({
            total: res.data.length,
            page,
            limit,
            totalPages: Math.ceil(res.data.length / limit) || 1,
            hasNextPage: false,
            hasPrevPage: page > 1,
          });
        }
      }
    } catch (err) {
      console.warn('Failed to load live portfolio from API, using fallback:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, categoryFilter, debouncedSearch]);

  /**
   * Auto-Fetch Effect
   */
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  /**
   * Add a new category (direct in-memory update with zero redundant GET fetches)
   */
  const addCategory = useCallback(async (name: string) => {
    const res = await apiClient.post<PortfolioCategoryItem>('/api/portfolio/categories', { name });
    if (!res.success || !res.data) {
      throw new Error(res.error || 'Failed to add category.');
    }
    const newCat = res.data;
    setCategoriesData((prev) => {
      if (prev.some((c) => c.name.toLowerCase() === newCat.name.toLowerCase())) return prev;
      return [...prev, newCat];
    });
    setCategories((prev) => {
      if (prev.some((c) => c.toLowerCase() === newCat.name.toLowerCase())) return prev;
      return [...prev, newCat.name];
    });
  }, []);

  /**
   * Delete category by ID or Name (removes from UI once API responds successfully)
   */
  const deleteCategory = useCallback(async (idOrName: string) => {
    const res = await apiClient.delete('/api/portfolio/categories', {
      params: { id: idOrName, name: idOrName },
    });
    if (!res.success) {
      throw new Error(res.error || 'Failed to delete category.');
    }

    // Remove from in-memory state after successful API response
    setCategoriesData((prev) =>
      prev.filter(
        (c) =>
          c.id !== idOrName &&
          c.name.toLowerCase() !== idOrName.toLowerCase()
      )
    );
    setCategories((prev) =>
      prev.filter((c) => c.toLowerCase() !== idOrName.toLowerCase())
    );

    // If the currently filtered category was deleted, reset filter to 'ALL'
    if (categoryFilter.toLowerCase() === idOrName.toLowerCase()) {
      setCategoryFilter('ALL');
    }
    await fetchPortfolio();
  }, [categoryFilter, fetchPortfolio]);

  /**
   * Save (Create or Update) Project Handler
   */
  const saveProject = useCallback(async (projectData: Partial<Project> & { id?: string }) => {
    const targetId = projectData.id || (editingProject as any)?.id;
    if (targetId) {
      const res = await apiClient.patch('/api/portfolio', { ...projectData, id: String(targetId) });
      if (!res.success) {
        throw new Error(res.error || 'Failed to update project in database.');
      }
    } else {
      const res = await apiClient.post<Project>('/api/portfolio', projectData);
      if (!res.success) {
        throw new Error(res.error || 'Failed to create project in database.');
      }
    }

    // Refresh current page, total count, and category counts
    await fetchPortfolio();
    await fetchCategories();
  }, [editingProject, fetchPortfolio, fetchCategories]);

  /**
   * Delete Project Handler
   */
  const deleteProject = useCallback(async (projectId: string) => {
    if (!projectId) {
      throw new Error('Project ID is required to delete this project.');
    }

    // Optimistic removal from table
    setProjectsList((prev) => prev.filter((item: any) => item.id !== projectId && item.slug !== projectId));
    setPagination((prev) => ({
      ...prev,
      total: Math.max(prev.total - 1, 0),
      totalPages: Math.ceil(Math.max(prev.total - 1, 0) / limit) || 1,
    }));

    const res = await apiClient.delete('/api/portfolio', { params: { id: projectId } });
    if (!res.success) {
      throw new Error(res.error || 'Failed to delete project from database.');
    }

    setDeletingProject(null);
    await fetchPortfolio();
    await fetchCategories();
  }, [limit, fetchPortfolio, fetchCategories]);

  const contextValue = useMemo(
    () => ({
      projectsList,
      isLoading,
      page,
      setPage,
      limit,
      setLimit: handleSetLimit,
      categoryFilter,
      setCategoryFilter: handleSetCategoryFilter,
      searchQuery,
      setSearchQuery: handleSetSearchQuery,
      pagination,
      selectedProject,
      setSelectedProject,
      editingProject,
      setEditingProject,
      isEditModalOpen,
      setIsEditModalOpen,
      deletingProject,
      setDeletingProject,
      categories,
      categoriesData,
      isLoadingCategories,
      isCategoryModalOpen,
      setIsCategoryModalOpen,
      fetchCategories,
      addCategory,
      deleteCategory,
      fetchPortfolio,
      saveProject,
      deleteProject,
    }),
    [
      projectsList,
      isLoading,
      page,
      limit,
      handleSetLimit,
      categoryFilter,
      handleSetCategoryFilter,
      searchQuery,
      handleSetSearchQuery,
      pagination,
      selectedProject,
      editingProject,
      isEditModalOpen,
      deletingProject,
      categories,
      categoriesData,
      isLoadingCategories,
      isCategoryModalOpen,
      fetchCategories,
      addCategory,
      deleteCategory,
      fetchPortfolio,
      saveProject,
      deleteProject,
    ]
  );

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
}

/**
 * usePortfolio Custom Hook
 */
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
