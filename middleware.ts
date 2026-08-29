import { NextRequest, NextResponse } from 'next/server';

interface IpHit {
  count: number;
  resetAt: number;
}

// Memory store for Global API rate limiting
const globalRateLimitStore = new Map<string, IpHit>();
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_MINUTE = 100; // 100 API calls per minute per IP

/**
 * Clean up expired entries every 30 seconds
 */
let lastCleanup = Date.now();
function cleanupExpired() {
  const now = Date.now();
  if (now - lastCleanup < 30 * 1000) return;
  lastCleanup = now;
  for (const [ip, record] of globalRateLimitStore.entries()) {
    if (record.resetAt <= now) {
      globalRateLimitStore.delete(ip);
    }
  }
}

/**
 * Global Edge API Rate Limiting Middleware
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only apply rate limiting to /api/* routes
  if (!pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  cleanupExpired();

  // Extract client IP safely
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

  const now = Date.now();
  const record = globalRateLimitStore.get(ip);

  if (!record || record.resetAt <= now) {
    globalRateLimitStore.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return NextResponse.next();
  }

  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    const retryAfter = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: 'Too many API requests. Please slow down and try again shortly.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(MAX_REQUESTS_PER_MINUTE),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(record.resetAt / 1000)),
        },
      }
    );
  }

  record.count += 1;
  const remaining = Math.max(0, MAX_REQUESTS_PER_MINUTE - record.count);

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS_PER_MINUTE));
  response.headers.set('X-RateLimit-Remaining', String(remaining));
  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
