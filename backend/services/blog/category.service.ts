import {
  portfolioCategoryService,
  PortfolioCategoryItem,
  DEFAULT_PORTFOLIO_CATEGORY,
} from '@/backend/services/portfolio/category.service';

export const DEFAULT_BLOG_CATEGORY = DEFAULT_PORTFOLIO_CATEGORY;
export type BlogCategoryItem = PortfolioCategoryItem;

export const blogCategoryService = portfolioCategoryService;
export default blogCategoryService;
