import { hasSqlInjectionPattern, sanitizeSqlString } from '@/backend/utils/sqlSecurity';
import { BlogQueryParams } from './blog.types';

export const sanitizeSearchString = sanitizeSqlString;

export function generateBlogSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Safely parses, validates, and sanitizes query parameters for public & admin Blog GET requests
 */
export function validateBlogQueryParams(params: {
  page?: string | null;
  limit?: string | null;
  category?: string | null;
  search?: string | null;
  status?: string | null;
  sortBy?: string | null;
  sortOrder?: string | null;
  slug?: string | null;
}): { valid: boolean; data: BlogQueryParams; error?: string } {
  // 1. Check for malicious SQL Injection signatures across all string params
  const rawValues = [params.category, params.search, params.slug, params.status, params.sortBy, params.sortOrder];
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

  // 3. Validate & Parse Limit
  let limit = 10;
  if (params.limit !== undefined && params.limit !== null && params.limit !== '') {
    const parsedLimit = parseInt(params.limit, 10);
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      return { valid: false, data: {}, error: 'Query parameter "limit" must be a positive integer between 1 and 100.' };
    }
    limit = Math.min(Math.max(parsedLimit, 1), 100);
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

  // 6. Status filter
  let status: 'all' | 'published' | 'draft' = 'all';
  if (params.status) {
    const lowerStatus = params.status.toLowerCase();
    if (['all', 'published', 'draft'].includes(lowerStatus)) {
      status = lowerStatus as any;
    }
  }

  // 7. Validate Sort Field (Default: publishedAt DESC for newest articles first)
  const allowedSorts = ['publishedAt', 'createdAt', 'title', 'viewsCount', 'order'];
  let sortBy: 'order' | 'createdAt' | 'publishedAt' | 'title' | 'viewsCount' = 'publishedAt';
  if (params.sortBy && allowedSorts.includes(params.sortBy)) {
    sortBy = params.sortBy as any;
  }

  // 8. Validate Sort Order
  let sortOrder: 'asc' | 'desc' = 'desc';
  if (params.sortOrder && ['asc', 'desc'].includes(params.sortOrder.toLowerCase())) {
    sortOrder = params.sortOrder.toLowerCase() as any;
  }

  // 9. Validate Slug
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
      status,
      sortBy,
      sortOrder,
      slug,
    },
  };
}
