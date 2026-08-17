import { NextResponse } from 'next/server';

/**
 * Standardized API Success Response
 */
export function successResponse<T>(data?: T, message?: string, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      ...(message && { message }),
      ...(data !== undefined && { data }),
    },
    { status }
  );
}

/**
 * Standardized API Error Response
 */
export function errorResponse(error: string | Error, status: number = 400) {
  const errorMessage = typeof error === 'string' ? error : error?.message || 'An unexpected error occurred.';
  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
    },
    { status }
  );
}
