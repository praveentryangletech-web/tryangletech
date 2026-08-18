/**
 * TryangleTech Frontend CRUD API Helper Client
 * 
 * Features:
 * 1. Default Headers: 'Content-Type: application/json', 'Accept: application/json'
 * 2. Admin Security Headers: 'x-admin-key' and 'Authorization: Bearer <token>'
 * 3. Client-Side SWR Micro-Cache (< 1ms instant UI transitions)
 * 4. Automatic Cache Purging on data mutations (POST, PATCH, PUT, DELETE)
 * 5. HTTP ETag & 304 Not Modified support
 * 6. Consistent JSON & error parsing for all HTTP operations
 */

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || process.env.ADMIN_API_KEY || '';

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  pagination?: PaginationMeta;
  count?: number;
  message?: string;
  error?: string;
  status: number;
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: any;
  params?: Record<string, string | number | boolean | undefined>;
  skipAuth?: boolean;
  useCache?: boolean;
  cacheTtlMs?: number;
}

interface ClientCacheEntry<T> {
  response: ApiResponse<T>;
  expiresAt: number;
  etag?: string;
}

class ApiClient {
  private clientCache = new Map<string, ClientCacheEntry<any>>();
  private defaultCacheTtl = 30 * 1000; // 30 seconds

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      const user = localStorage.getItem('superadmin_user');
      if (user) {
        const parsed = JSON.parse(user);
        return parsed.token || null;
      }
    } catch {
      // Fallback
    }
    return null;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const baseUrl = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    if (!params || Object.keys(params).length === 0) return baseUrl;

    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        query.append(key, String(val));
      }
    });

    const queryString = query.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  /**
   * Purge client-side memory cache (called automatically on POST/PATCH/PUT/DELETE)
   */
  public clearCache(endpointPrefix?: string): void {
    if (!endpointPrefix) {
      this.clientCache.clear();
      return;
    }
    for (const key of this.clientCache.keys()) {
      if (key.includes(endpointPrefix)) {
        this.clientCache.delete(key);
      }
    }
  }

  private async request<T = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { body, params, headers = {}, skipAuth = false, useCache = false, cacheTtlMs = this.defaultCacheTtl, ...restOptions } = options;

    const url = this.buildUrl(endpoint, params);

    // 1. Client Memory Cache Check (GET requests only)
    if (method === 'GET' && useCache) {
      const cached = this.clientCache.get(url);
      if (cached && cached.expiresAt > Date.now()) {
        return cached.response;
      }
    }

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Auto-attach security token & admin key
    if (!skipAuth) {
      if (ADMIN_API_KEY) {
        defaultHeaders['x-admin-key'] = ADMIN_API_KEY;
      }
      const token = this.getAuthToken();
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    // Attach ETag if cached
    const cachedEntry = this.clientCache.get(url);
    if (method === 'GET' && cachedEntry?.etag) {
      defaultHeaders['If-None-Match'] = cachedEntry.etag;
    }

    const mergedHeaders = {
      ...defaultHeaders,
      ...(headers as Record<string, string>),
    };

    const config: RequestInit = {
      method,
      headers: mergedHeaders,
      credentials: 'include',
      ...restOptions,
    };

    if (body !== undefined && method !== 'GET') {
      config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    try {
      const res = await fetch(url, config);

      // Handle HTTP 304 Not Modified
      if (res.status === 304 && cachedEntry) {
        return cachedEntry.response;
      }

      let data: any = null;

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = text ? { message: text } : {};
      }

      if (!res.ok) {
        return {
          success: false,
          error: data?.error || data?.message || `Request failed with status ${res.status}`,
          status: res.status,
          data: data?.data,
        };
      }

      const responseObj: ApiResponse<T> = {
        success: data?.success ?? true,
        data: data?.data ?? data,
        pagination: data?.pagination,
        count: data?.count,
        message: data?.message,
        status: res.status,
      };

      // Store in client micro-cache for fast repeat navigation
      if (method === 'GET' && useCache) {
        const etag = res.headers.get('etag') || undefined;
        this.clientCache.set(url, {
          response: responseObj,
          expiresAt: Date.now() + cacheTtlMs,
          etag,
        });
      }

      // Auto-purge cache on mutation
      if (method !== 'GET') {
        const baseEndpoint = endpoint.split('?')[0];
        this.clearCache(baseEndpoint);
      }

      return responseObj;
    } catch (err: any) {
      console.error(`[ApiClient ${method}] ${url} Error:`, err);
      return {
        success: false,
        error: err?.message || 'Network error. Please check your connection.',
        status: 0,
      };
    }
  }

  /**
   * GET Request (Read with optional micro-caching)
   */
  async get<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET', { useCache: true, ...options });
  }

  /**
   * POST Request (Create with automatic cache clearing)
   */
  async post<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', { ...options, body });
  }

  /**
   * PATCH Request (Partial Update with automatic cache clearing)
   */
  async patch<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', { ...options, body });
  }

  /**
   * PUT Request (Full Replace/Update with automatic cache clearing)
   */
  async put<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', { ...options, body });
  }

  /**
   * DELETE Request (Delete with automatic cache clearing)
   */
  async delete<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', options);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
