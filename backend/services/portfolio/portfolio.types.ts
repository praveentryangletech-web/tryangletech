import { PortfolioCategory } from '@/app/data/portfolioData';

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  image: string;
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
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type CreatePortfolioInput = Partial<Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>>;
export type UpdatePortfolioInput = Partial<PortfolioItem>;
