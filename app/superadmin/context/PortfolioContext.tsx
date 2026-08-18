'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import apiClient, { PaginationMeta } from '../utils/apiClient';
import { Project, projects as staticProjects } from '../../data/portfolioData';

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
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

/**
 * PortfolioProvider Component
 * 
 * Manages server-side portfolio querying, pagination metadata, search debouncing,
 * category filtering, and CRUD operations (Create, Read, Update, Delete) against PostgreSQL.
 * 
 * @param {ReactNode} children - Child components wrapped within this provider context
 */
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projectsList, setProjectsList] = useState<Project[]>(staticProjects.slice(0, 8));
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
   * 
   * Delays executing the backend search query by 300ms to prevent spamming
   * the database API on every single keystroke.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  /**
   * Category Filter Handler
   * 
   * Updates the selected category filter and automatically resets pagination to page 1.
   * 
   * @param {string} cat - The category name (e.g. 'Business Website', 'E-Commerce', or 'ALL')
   */
  const handleSetCategoryFilter = useCallback((cat: string) => {
    setCategoryFilter(cat);
    setPage(1);
  }, []);

  /**
   * Search Query Handler
   * 
   * Updates the current search term and automatically resets pagination to page 1.
   * 
   * @param {string} q - The search query string
   */
  const handleSetSearchQuery = useCallback((q: string) => {
    setSearchQuery(q);
    setPage(1);
  }, []);

  /**
   * Page Size / Rows-per-Page Handler
   * 
   * Sets how many items to return per page (e.g. 5, 8, 10, 20) and resets to page 1.
   * 
   * @param {number} l - Limit number of items per page
   */
  const handleSetLimit = useCallback((l: number) => {
    setLimit(l);
    setPage(1);
  }, []);

  /**
   * Fetch Live Paginated Portfolio API
   * 
   * Sends a GET request to `/api/portfolio?page=...&limit=...&category=...&search=...`
   * with current filter parameters and updates the project list & pagination state.
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
   * 
   * Automatically executes `fetchPortfolio` whenever page, limit, category, or search changes.
   */
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  /**
   * Save (Create or Update) Project Handler
   * 
   * Submits a POST request (for new projects) or PATCH request (for existing projects)
   * to `/api/portfolio` and refreshes the live data table.
   * 
   * @param {Partial<Project>} projectData - The form fields and media URLs to persist
   */
  const saveProject = async (projectData: Partial<Project>) => {
    if (editingProject) {
      const targetId = (editingProject as any).id || editingProject.slug;

      const res = await apiClient.patch('/api/portfolio', { id: targetId, ...projectData });
      if (!res.success) {
        throw new Error(res.error || 'Failed to update project in database.');
      }
    } else {
      const res = await apiClient.post<Project>('/api/portfolio', projectData);
      if (!res.success) {
        throw new Error(res.error || 'Failed to create project in database.');
      }
    }

    // Refresh current page & total count from database
    fetchPortfolio();
  };

  /**
   * Delete Project Handler
   * 
   * Submits a DELETE request to `/api/portfolio?id=...` to remove a project record permanently
   * from Supabase PostgreSQL and re-queries the updated page.
   * 
   * @param {string} projectIdOrSlug - ID or Slug of the project to remove
   */
  const deleteProject = async (projectIdOrSlug: string) => {
    const res = await apiClient.delete('/api/portfolio', { params: { id: projectIdOrSlug } });
    if (!res.success) {
      throw new Error(res.error || 'Failed to delete project from database.');
    }

    fetchPortfolio();
  };

  return (
    <PortfolioContext.Provider
      value={{
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
        fetchPortfolio,
        saveProject,
        deleteProject,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

/**
 * usePortfolio Custom Hook
 * 
 * Access the Portfolio Context state and action handlers from any child component.
 * 
 * @returns {PortfolioContextType} The portfolio state, active query filters, and mutation handlers
 */
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
