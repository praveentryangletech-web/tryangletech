import { NextRequest, NextResponse } from 'next/server';

// -------------------------------------------------------------
// 1. MEMORY STORE FOR GLOBAL API RATE LIMITING
// -------------------------------------------------------------
interface IpHit {
  count: number;
  resetAt: number;
}

const globalRateLimitStore = new Map<string, IpHit>();
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_MINUTE = 100; // 100 API calls per minute per IP

let lastCleanup = Date.now();
function cleanupExpiredRateLimits() {
  const now = Date.now();
  if (now - lastCleanup < 30 * 1000) return;
  lastCleanup = now;
  for (const [ip, record] of globalRateLimitStore.entries()) {
    if (record.resetAt <= now) {
      globalRateLimitStore.delete(ip);
    }
  }
}

// -------------------------------------------------------------
// 2. SEARCH BOT DETECTION (NEVER REDIRECT GOOGLEBOT FOR SEO SAFETY)
// -------------------------------------------------------------
const BOT_PATTERNS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'baiduspider',
  'duckduckbot',
  'slurp',
  'twitterbot',
  'facebookexternalhit',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'pinterest',
  'slackbot',
  'chatgpt-user',
  'gptbot',
  'claudebot',
  'perplexitybot',
  'anthropic-ai',
  'applebot',
];

function isSearchBot(userAgent?: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some((bot) => ua.includes(bot));
}

// -------------------------------------------------------------
// 3. KNOWN PUBLISHED LOCATION SLUGS (UPDATED AT RUNTIME)
// -------------------------------------------------------------
const DEFAULT_KNOWN_SLUGS = new Set([
  'varanasi',
  'dubai',
  'mumbai',
  'pune',
  'surat',
  'london',
  'new-york',
  'toronto',
  'sydney',
  'singapore',
  'ahmedabad',
]);

let cachedSlugs = new Set<string>(DEFAULT_KNOWN_SLUGS);
let lastSlugsFetch = 0;
const SLUGS_CACHE_TTL = 2 * 60 * 1000; // Refresh published slugs every 2 minutes

async function getActiveLocationSlugs(origin: string): Promise<Set<string>> {
  const now = Date.now();
  if (now - lastSlugsFetch < SLUGS_CACHE_TTL && cachedSlugs.size > 0) {
    return cachedSlugs;
  }

  try {
    const res = await fetch(`${origin}/api/geo/slugs`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.slugs) && data.slugs.length > 0) {
        cachedSlugs = new Set(data.slugs.map((s: string) => s.toLowerCase().trim()));
        lastSlugsFetch = now;
      }
    }
  } catch {
    // Fallback to memory cache
  }

  return cachedSlugs;
}

// -------------------------------------------------------------
// 4. MAIN NEXT.JS 16 PROXY FUNCTION
// -------------------------------------------------------------
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ===========================================================
  // A. API RATE LIMITING (/api/*)
  // ===========================================================
  if (pathname.startsWith('/api')) {
    cleanupExpiredRateLimits();

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

  // ===========================================================
  // B. SMART GEO-IP LOCATION ROUTING ON ROOT HOMEPAGE (/)
  // ===========================================================
  if (pathname === '/') {
    const searchParams = request.nextUrl.searchParams;

    // 1. Check if visitor explicitly requested the global site
    const globalQuery = searchParams.get('global');
    const geoQuery = searchParams.get('geo');
    const cookieOverride = request.cookies.get('geo_override')?.value;

    if (globalQuery === 'true' || geoQuery === 'none' || cookieOverride === 'global') {
      const res = NextResponse.next();
      if (globalQuery === 'true') {
        res.cookies.set('geo_override', 'global', { path: '/', maxAge: 60 * 60 * 24 * 30 }); // 30 days
      }
      return res;
    }

    // 2. SEO Protection: Never redirect search bots (Googlebot, Bingbot, etc.)
    const userAgent = request.headers.get('user-agent');
    if (isSearchBot(userAgent)) {
      return NextResponse.next();
    }

    // 3. Extract visitor location (Query override for testing OR Vercel/Cloudflare headers)
    let detectedCity = geoQuery || '';

    if (!detectedCity) {
      detectedCity =
        request.headers.get('x-vercel-ip-city') ||
        request.headers.get('cf-ipcity') ||
        request.headers.get('x-geo-city') ||
        '';
    }

    if (detectedCity) {
      const detectedSlug = detectedCity
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (detectedSlug) {
        // 4. Match against active published location pages
        const activeSlugs = await getActiveLocationSlugs(request.nextUrl.origin);

        if (activeSlugs.has(detectedSlug)) {
          // Route visitor smoothly to their localized city page
          const redirectUrl = new URL(`/${detectedSlug}`, request.url);
          const response = NextResponse.redirect(redirectUrl, { status: 307 });
          response.cookies.set('geo_detected', detectedSlug, { path: '/', maxAge: 60 * 60 * 24 });
          return response;
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/api/:path*'],
};
