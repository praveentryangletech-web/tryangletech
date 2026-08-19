import { NextRequest, NextResponse } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

class MemoryRateLimiter {
  private store = new Map<string, RateLimitRecord>();
  private cleanupIntervalMs = 60 * 1000; // 1 minute cleanup interval
  private lastCleanup = Date.now();

  private performCleanup(): void {
    const now = Date.now();
    if (now - this.lastCleanup < this.cleanupIntervalMs) return;
    this.lastCleanup = now;

    for (const [key, record] of this.store.entries()) {
      if (record.resetAt <= now) {
        this.store.delete(key);
      }
    }
  }

  public check(
    key: string,
    limit: number = 10,
    windowMs: number = 60 * 1000
  ): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
    this.performCleanup();

    const now = Date.now();
    const existing = this.store.get(key);

    if (!existing || existing.resetAt <= now) {
      this.store.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });
      return {
        allowed: true,
        remaining: limit - 1,
        retryAfterSeconds: 0,
      };
    }

    if (existing.count >= limit) {
      const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds,
      };
    }

    existing.count += 1;
    return {
      allowed: true,
      remaining: Math.max(0, limit - existing.count),
      retryAfterSeconds: 0,
    };
  }

  public reset(key: string): void {
    this.store.delete(key);
  }
}

export const rateLimiter = new MemoryRateLimiter();

/**
 * Extract client IP from NextRequest safely
 */
export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Convenience helper to enforce rate limit on an API route.
 * Returns a 429 Too Many Requests response if rate limit is exceeded, or null if allowed.
 */
export function enforceRateLimit(
  req: NextRequest,
  prefix: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000 // 10 minutes
): NextResponse | null {
  const ip = getClientIp(req);
  const key = `${prefix}:${ip}`;
  const result = rateLimiter.check(key, limit, windowMs);

  if (!result.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many requests. Please wait ${result.retryAfterSeconds} seconds before submitting again.`,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(result.retryAfterSeconds),
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  return null;
}
