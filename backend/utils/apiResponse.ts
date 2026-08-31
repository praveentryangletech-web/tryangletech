import { NextResponse } from 'next/server';

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore?: boolean;
}

export interface ApiSuccessPayload<T> {
  success: true;
  message?: string;
  data?: T;
  pagination?: PaginationMeta;
  filters?: Record<string, any>;
  timestamp?: string;
}

export interface ApiErrorPayload {
  success: false;
  error: string;
  statusCode?: number;
  timestamp?: string;
}

/**
 * Standardized API Success Response
 */
export function successResponse<T>(
  data?: T,
  message?: string,
  status: number = 200,
  headers?: Record<string, string> | Headers
): NextResponse {
  const payload: ApiSuccessPayload<T> = {
    success: true,
    ...(message ? { message } : {}),
    ...(data !== undefined ? { data } : {}),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    status,
    headers: headers ? headers : undefined,
  });
}

/**
 * Standardized Paginated API Success Response
 */
export function paginatedResponse<T>(
  items: T[],
  pagination: PaginationMeta,
  filters?: Record<string, any>,
  message?: string,
  status: number = 200,
  headers?: Record<string, string> | Headers
): NextResponse {
  const payload: ApiSuccessPayload<T[]> = {
    success: true,
    data: items,
    pagination,
    ...(filters ? { filters } : {}),
    ...(message ? { message } : {}),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    status,
    headers: headers ? headers : undefined,
  });
}

/**
 * Standardized HTTP 304 Not Modified Response
 */
export function notModifiedResponse(
  etag?: string,
  cacheControl: string = 'public, max-age=60, stale-while-revalidate=300'
): NextResponse {
  return new NextResponse(null, {
    status: 304,
    headers: {
      ...(etag ? { ETag: etag } : {}),
      'Cache-Control': cacheControl,
    },
  });
}

/**
 * Standardized API Error Response
 */
export function errorResponse(
  error: string | Error,
  status: number = 400,
  headers?: Record<string, string> | Headers
): NextResponse {
  const errorMessage =
    typeof error === 'string' ? error : error?.message || 'An unexpected server error occurred.';

  const payload: ApiErrorPayload = {
    success: false,
    error: errorMessage,
    statusCode: status,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    status,
    headers: headers ? headers : undefined,
  });
}
