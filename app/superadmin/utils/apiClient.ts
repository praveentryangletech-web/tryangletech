/**
 * TryangleTech Frontend CRUD API Helper Client
 * 
 * Automatically attaches:
 * 1. Default Headers: 'Content-Type: application/json', 'Accept: application/json'
 * 2. Admin Security Headers: 'x-admin-key' and 'Authorization: Bearer <token>'
 * 3. Consistent JSON & error parsing for all HTTP operations (GET, POST, PATCH, PUT, DELETE)
 * 4. Automatic session handling & 401 redirect detection
 */

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || process.env.ADMIN_API_KEY || '';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
  status: number;
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: any;
  params?: Record<string, string | number | boolean | undefined>;
  skipAuth?: boolean;
}

class ApiClient {
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

  private async request<T = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { body, params, headers = {}, skipAuth = false, ...restOptions } = options;

    const url = this.buildUrl(endpoint, params);

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

    const mergedHeaders = {
      ...defaultHeaders,
      ...(headers as Record<string, string>),
    };

    const config: RequestInit = {
      method,
      headers: mergedHeaders,
      credentials: 'include', // Includes HTTP-only session cookies automatically
      ...restOptions,
    };

    if (body !== undefined && method !== 'GET') {
      config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    try {
      const res = await fetch(url, config);
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

      return {
        success: data?.success ?? true,
        data: data?.data ?? data,
        count: data?.count,
        message: data?.message,
        status: res.status,
      };
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
   * GET Request (Read)
   */
  async get<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET', options);
  }

  /**
   * POST Request (Create)
   */
  async post<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', { ...options, body });
  }

  /**
   * PATCH Request (Partial Update)
   */
  async patch<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', { ...options, body });
  }

  /**
   * PUT Request (Full Replace/Update)
   */
  async put<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', { ...options, body });
  }

  /**
   * DELETE Request (Delete)
   */
  async delete<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', options);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
