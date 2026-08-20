import { hasSqlInjectionPattern, sanitizeSqlString } from '@/backend/utils/sqlSecurity';
import { PortfolioQueryParams } from './portfolio.types';

const ALLOWED_SORT_FIELDS = ['order', 'createdAt', 'title'] as const;
const ALLOWED_SORT_ORDERS = ['asc', 'desc'] as const;

export const sanitizeSearchString = sanitizeSqlString;

/**
 * Safely parses, validates, and sanitizes query parameters for public & admin Portfolio GET requests
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
  
  // 1. Check for malicious SQL Injection signatures across all string params
  const rawValues = [params.category, params.search, params.slug, params.sortBy, params.sortOrder];
  for (const val of rawValues) {
    if (val && hasSqlInjectionPattern(val)) {
      return { 
        valid: false, 
        data: {}, 
        error: 'Malicious query syntax detected. Request rejected for security.' 
      };
    }
  }

  // 2. Validate & Parse Page
  let page = 1;
  if (params.page !== undefined && params.page !== null && params.page !== '') {
    const parsedPage = parseInt(params.page, 10);
    if (isNaN(parsedPage) || parsedPage < 1) {
      return { valid: false, data: {}, error: 'Query parameter "page" must be a positive integer >= 1.' };
    }
    page = parsedPage;
  }

  // 3. Validate & Parse Limit (Rate limiting / DoS prevention: max 50 items per query)
  let limit = 10;
  if (params.limit !== undefined && params.limit !== null && params.limit !== '') {
    const parsedLimit = parseInt(params.limit, 10);
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      return { valid: false, data: {}, error: 'Query parameter "limit" must be a positive integer between 1 and 50.' };
    }
    limit = Math.min(Math.max(parsedLimit, 1), 50); // Clamp strictly between 1 and 50
  }

  // 4. Validate Category Filter dynamically
  let category: string | undefined = undefined;
  if (params.category && params.category.trim()) {
    const rawCategory = params.category.trim();
    if (rawCategory.toUpperCase() !== 'ALL') {
      category = sanitizeSearchString(rawCategory);
    }
  }

  // 5. Sanitize Search String
  const search = sanitizeSearchString(params.search);

  // 6. Validate Sort Field (Strict Whitelist protection)
  let sortBy: 'order' | 'createdAt' | 'title' = 'order';
  if (params.sortBy) {
    const lowerSort = params.sortBy.toLowerCase();
    if (ALLOWED_SORT_FIELDS.includes(lowerSort as any)) {
      sortBy = lowerSort as any;
    }
  }

  // 7. Validate Sort Order (Strict Whitelist protection)
  let sortOrder: 'asc' | 'desc' = 'asc';
  if (params.sortOrder) {
    const lowerOrder = params.sortOrder.toLowerCase();
    if (ALLOWED_SORT_ORDERS.includes(lowerOrder as any)) {
      sortOrder = lowerOrder as any;
    }
  }

  // 8. Validate Slug (Strict Alphanumeric and hyphen only)
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
