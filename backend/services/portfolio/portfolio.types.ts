import { PortfolioCategory } from '@/app/data/portfolioData';

export interface PortfolioSummaryItem {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  imageAlt?: string;
  description?: string;
  client?: string;
  duration?: string;
  role?: string;
  liveUrl?: string;
  technologies?: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItem extends PortfolioSummaryItem {
  images?: string[];
  imageAlts?: string[];
  content?: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  metaTitle?: string;
  metaDescription?: string;
  aeoSummary?: string;
  keywords?: string[];
  geoRegion?: string;
  canonicalUrl?: string;
  faqs?: Array<{ question: string; answer: string; q?: string; a?: string }>;
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
  full?: boolean;
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
  items: (PortfolioItem | PortfolioSummaryItem)[];
  pagination: PaginationMeta;
  filters: {
    category?: string;
    search?: string;
    sortBy: string;
    sortOrder: string;
  };
}
