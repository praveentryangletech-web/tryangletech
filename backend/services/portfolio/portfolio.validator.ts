import { PORTFOLIO_CATEGORIES } from '@/app/data/portfolioData';
import { PortfolioQueryParams } from './portfolio.types';

const ALLOWED_SORT_FIELDS = ['order', 'createdAt', 'title'] as const;
const ALLOWED_SORT_ORDERS = ['asc', 'desc'] as const;

/**
 * Sanitizes input string to prevent XSS / malicious control characters
 */
export function sanitizeSearchString(input?: string | null): string | undefined {
  if (!input) return undefined;
  // Trim, remove control characters and dangerous symbols, clamp to 100 characters max
  const cleaned = input
    .trim()
    .replace(/[<>'"`;\\]/g, '') // remove HTML/SQL control characters
    .slice(0, 100);
  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Safely parses and validates query parameters for public Portfolio GET requests
 */
export function validatePortfolioQueryParams(params: {
  page?: string | null;
  limit?: string | null;
  category?: string | null;
  search?: string | null;
  sortBy?: string | null;
  sortOrder?: string | null;
  slug?: string | null;
}): { valid: boolean; data: PortfolioQueryParams; error?: string } {
  // 1. Validate & Parse Page
  let page = 1;
  if (params.page !== undefined && params.page !== null && params.page !== '') {
    const parsedPage = parseInt(params.page, 10);
    if (isNaN(parsedPage) || parsedPage < 1) {
      return { valid: false, data: {}, error: 'Query parameter "page" must be a positive integer >= 1.' };
    }
    page = parsedPage;
  }

  // 2. Validate & Parse Limit (Rate limiting / DoS prevention: max 50 items per query)
  let limit = 10;
  if (params.limit !== undefined && params.limit !== null && params.limit !== '') {
    const parsedLimit = parseInt(params.limit, 10);
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      return { valid: false, data: {}, error: 'Query parameter "limit" must be a positive integer between 1 and 50.' };
    }
    limit = Math.min(Math.max(parsedLimit, 1), 50); // Clamp between 1 and 50
  }

  // 3. Validate Category Filter
  let category: string | undefined = undefined;
  if (params.category && params.category.trim()) {
    const rawCategory = params.category.trim();
    if (rawCategory.toUpperCase() !== 'ALL') {
      const matched = PORTFOLIO_CATEGORIES.find(
        (c) => c.toLowerCase() === rawCategory.toLowerCase()
      );
      category = matched || sanitizeSearchString(rawCategory);
    }
  }

  // 4. Validate Search String
  const search = sanitizeSearchString(params.search);

  // 5. Validate Sort Field (Whitelist protection)
  let sortBy: 'order' | 'createdAt' | 'title' = 'order';
  if (params.sortBy) {
    const lowerSort = params.sortBy.toLowerCase();
    if (ALLOWED_SORT_FIELDS.includes(lowerSort as any)) {
      sortBy = lowerSort as any;
    }
  }

  // 6. Validate Sort Order (Whitelist protection)
  let sortOrder: 'asc' | 'desc' = 'asc';
  if (params.sortOrder) {
    const lowerOrder = params.sortOrder.toLowerCase();
    if (ALLOWED_SORT_ORDERS.includes(lowerOrder as any)) {
      sortOrder = lowerOrder as any;
    }
  }

  // 7. Validate Slug (Alphanumeric and hyphen only)
  let slug: string | undefined = undefined;
  if (params.slug && params.slug.trim()) {
    slug = params.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '').slice(0, 100);
  }

  return {
    valid: true,
    data: {
      page,
      limit,
      category,
      search,
      sortBy,
      sortOrder,
      slug,
    },
  };
}
