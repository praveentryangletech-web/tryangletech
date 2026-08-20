'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import apiClient, { PaginationMeta } from '../utils/apiClient';
import { BlogPostItem } from '@/backend/services/blog';
import { BLOG_POSTS as staticBlogPosts } from '@/app/blog/data';
import { PortfolioCategoryItem, DEFAULT_PORTFOLIO_CATEGORY } from '@/backend/services/portfolio/category.service';

/**
 * Blog Context Interface defining the global state and API mutation functions
 * available to all Superadmin Blog components.
 */
interface BlogContextType {
  postsList: BlogPostItem[];
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (search: string) => void;
  pagination: PaginationMeta;
  selectedPost: BlogPostItem | null;
  setSelectedPost: (post: BlogPostItem | null) => void;
  editingPost: BlogPostItem | null;
  setEditingPost: (post: BlogPostItem | null) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  deletingPost: BlogPostItem | null;
  setDeletingPost: (post: BlogPostItem | null) => void;
  fetchBlog: () => Promise<void>;
  savePost: (postData: Partial<BlogPostItem>) => Promise<void>;
  deletePost: (postIdOrSlug: string) => Promise<void>;
  togglePostStatus: (post: BlogPostItem) => Promise<void>;

  // Dynamic Category Management (Synced across Portfolio and Blog)
  categoriesData: PortfolioCategoryItem[];
  categories: string[];
  isLoadingCategories: boolean;
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (open: boolean) => void;
  fetchCategories: () => Promise<void>;
  addCategory: (name: string) => Promise<void>;
  deleteCategory: (idOrName: string) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const initialStaticPosts: BlogPostItem[] = staticBlogPosts.map((p, idx) => {
  const parsedDate = p.date ? new Date(p.date).toISOString() : new Date(2025, 9, 29 - idx).toISOString();
  return {
    id: p.id || String(idx + 1),
    slug: p.slug,
    title: p.title,
    category: p.category,
    excerpt: p.title,
    content: '',
    coverImage: p.image,
    images: p.images || (p.image ? [p.image] : []),
    authorName: 'TryangleTech Team',
    authorRole: 'Editorial Team',
    readTime: '5 min read',
    published: true,
    publishedAt: parsedDate,
    createdAt: parsedDate,
    updatedAt: parsedDate,
  };
});

/**
 * BlogProvider Component
 * 
 * Manages server-side blog querying, pagination metadata, search debouncing,
 * category filtering, dynamic category management, and CRUD operations against PostgreSQL.
 */
export function BlogProvider({ children }: { children: ReactNode }) {
  const [postsList, setPostsList] = useState<BlogPostItem[]>(initialStaticPosts.slice(0, 8));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Dynamic Categories state initialized with protected 'General' default
  const [categoriesData, setCategoriesData] = useState<PortfolioCategoryItem[]>([
    {
      id: 'cat_default_blog_general',
      name: DEFAULT_PORTFOLIO_CATEGORY,
      slug: 'general',
      type: 'BLOG',
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
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const [pagination, setPagination] = useState<PaginationMeta>({
    total: initialStaticPosts.length,
    page: 1,
    limit: 8,
    totalPages: Math.ceil(initialStaticPosts.length / 8) || 1,
    hasNextPage: initialStaticPosts.length > 8,
    hasPrevPage: false,
  });

  // Modal dialog states
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [deletingPost, setDeletingPost] = useState<BlogPostItem | null>(null);

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
   * Fetch live dynamic categories from /api/blog/categories (shared table with type='BLOG')
   */
  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    try {
      const res = await apiClient.get<PortfolioCategoryItem[]>('/api/blog/categories', { useCache: false });
      if (res.success && Array.isArray(res.data)) {
        setCategoriesData(res.data);
        setCategories(res.data.map((c) => c.name));
      }
    } catch (err) {
      console.warn('Failed to load dynamic categories, using fallback:', err);
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
   * Status Filter Handler
   */
  const handleSetStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
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
   * Page Size Handler
   */
  const handleSetLimit = useCallback((l: number) => {
    setLimit(l);
    setPage(1);
  }, []);

  /**
   * Fetch Live Paginated Blog API
   */
  const fetchBlog = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string | number> = {
        page,
        limit,
        sortBy: 'publishedAt',
        sortOrder: 'desc',
      };

      if (categoryFilter && categoryFilter !== 'ALL') {
        params.category = categoryFilter;
      }

      if (statusFilter && statusFilter !== 'all') {
        params.status = statusFilter;
      }

      if (debouncedSearch && debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      const res = await apiClient.get<BlogPostItem[]>('/api/blog', { params });
      if (res.success && Array.isArray(res.data)) {
        setPostsList(res.data);
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
      console.warn('Failed to load live blog from API, using fallback:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, categoryFilter, statusFilter, debouncedSearch]);

  /**
   * Auto-Fetch Effect
   */
  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  /**
   * Add a new category (direct in-memory update with zero redundant GET fetches)
   */
  const addCategory = useCallback(async (name: string) => {
    const res = await apiClient.post<PortfolioCategoryItem>('/api/blog/categories', { name });
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
   * Delete a category (with immediate optimistic UI removal and rollback protection)
   */
  const deleteCategory = useCallback(async (idOrName: string) => {
    const prevCategories = [...categories];
    const prevData = [...categoriesData];

    // Optimistic UI update
    setCategories((prev) => prev.filter((c) => c !== idOrName && c.toLowerCase() !== idOrName.toLowerCase()));
    setCategoriesData((prev) => prev.filter((c) => c.id !== idOrName && c.name.toLowerCase() !== idOrName.toLowerCase()));

    try {
      const res = await apiClient.delete<{ success: boolean; deletedName: string }>(
        `/api/blog/categories?id=${encodeURIComponent(idOrName)}&name=${encodeURIComponent(idOrName)}`
      );
      if (!res.success) {
        throw new Error(res.error || 'Failed to delete category.');
      }
      await fetchBlog();
    } catch (err) {
      // Rollback on error
      setCategories(prevCategories);
      setCategoriesData(prevData);
      throw err;
    }
  }, [categories, categoriesData, fetchBlog]);

  /**
   * Toggle Published Status Handler (with instant optimistic UI update)
   */
  const togglePostStatus = useCallback(async (post: BlogPostItem) => {
    const newStatus = !post.published;
    
    // 1. Optimistic immediate UI reflection (0ms latency)
    setPostsList((prev) =>
      prev.map((item) =>
        item.id === post.id ? { ...item, published: newStatus } : item
      )
    );

    try {
      const res = await apiClient.patch('/api/blog', {
        id: post.id,
        published: newStatus,
      });

      if (!res.success) {
        // Rollback on error
        setPostsList((prev) =>
          prev.map((item) =>
            item.id === post.id ? { ...item, published: post.published } : item
          )
        );
        throw new Error(res.error || 'Failed to update article status.');
      }

      // Sync fresh data from database
      await fetchBlog();
    } catch (err: any) {
      console.error('Failed to toggle article status:', err);
      await fetchBlog();
    }
  }, [fetchBlog]);

  /**
   * Save (Create or Update) Post Handler
   */
  const savePost = useCallback(async (postData: Partial<BlogPostItem>) => {
    if (editingPost) {
      const postId = editingPost.id;
      if (!postId) {
        throw new Error('Article ID is required to update this article.');
      }

      // Optimistic update
      setPostsList((prev) =>
        prev.map((item) =>
          item.id === postId ? { ...item, ...postData } : item
        )
      );

      const res = await apiClient.patch('/api/blog', { id: postId, ...postData });
      if (!res.success) {
        throw new Error(res.error || 'Failed to update article in database.');
      }
    } else {
      const res = await apiClient.post<BlogPostItem>('/api/blog', postData);
      if (!res.success) {
        throw new Error(res.error || 'Failed to create article in database.');
      }
    }

    await fetchBlog();
    setIsEditModalOpen(false);
    setEditingPost(null);
  }, [editingPost, fetchBlog]);

  /**
   * Delete Post Handler
   */
  const deletePost = useCallback(async (postIdOrSlug: string) => {
    // Optimistic removal
    setPostsList((prev) => prev.filter((item) => item.id !== postIdOrSlug && item.slug !== postIdOrSlug));

    const res = await apiClient.delete(`/api/blog?id=${encodeURIComponent(postIdOrSlug)}`);
    if (!res.success) {
      throw new Error(res.error || 'Failed to delete article.');
    }

    await fetchBlog();
    setDeletingPost(null);
  }, [fetchBlog]);

  const contextValue = useMemo(
    () => ({
      postsList,
      isLoading,
      page,
      setPage,
      limit,
      setLimit: handleSetLimit,
      categoryFilter,
      setCategoryFilter: handleSetCategoryFilter,
      statusFilter,
      setStatusFilter: handleSetStatusFilter,
      searchQuery,
      setSearchQuery: handleSetSearchQuery,
      pagination,
      selectedPost,
      setSelectedPost,
      editingPost,
      setEditingPost,
      isEditModalOpen,
      setIsEditModalOpen,
      deletingPost,
      setDeletingPost,
      fetchBlog,
      savePost,
      deletePost,
      togglePostStatus,

      // Dynamic categories
      categoriesData,
      categories,
      isLoadingCategories,
      isCategoryModalOpen,
      setIsCategoryModalOpen,
      fetchCategories,
      addCategory,
      deleteCategory,
    }),
    [
      postsList,
      isLoading,
      page,
      limit,
      handleSetLimit,
      categoryFilter,
      handleSetCategoryFilter,
      statusFilter,
      handleSetStatusFilter,
      searchQuery,
      handleSetSearchQuery,
      pagination,
      selectedPost,
      editingPost,
      isEditModalOpen,
      deletingPost,
      fetchBlog,
      savePost,
      deletePost,
      togglePostStatus,
      categoriesData,
      categories,
      isLoadingCategories,
      isCategoryModalOpen,
      fetchCategories,
      addCategory,
      deleteCategory,
    ]
  );

  return (
    <BlogContext.Provider value={contextValue}>
      {children}
    </BlogContext.Provider>
  );
}

/**
 * useBlog Custom Hook
 */
export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}

export default BlogContext;
