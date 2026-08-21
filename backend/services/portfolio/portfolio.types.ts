import { PortfolioCategory } from '@/app/data/portfolioData';

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  imageAlt?: string;
  images?: string[];
  imageAlts?: string[];
  description: string;
  client?: string;
  duration?: string;
  role?: string;
  liveUrl?: string;
  content?: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  technologies: string[];
  metaTitle?: string;
  metaDescription?: string;
  aeoSummary?: string;
  keywords?: string[];
  geoRegion?: string;
  canonicalUrl?: string;
  faqs?: Array<{ question: string; answer: string; q?: string; a?: string }>;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type CreatePortfolioInput = Partial<Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>>;
export type UpdatePortfolioInput = Partial<PortfolioItem>;

export interface PortfolioQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: 'order' | 'createdAt' | 'title';
  sortOrder?: 'asc' | 'desc';
  slug?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedPortfolioResult {
  items: PortfolioItem[];
  pagination: PaginationMeta;
  filters: {
    category?: string;
    search?: string;
    sortBy: string;
    sortOrder: string;
  };
}
