/**
 * Centralized Base URL Resolver
 * Dynamically resolves the base URL from environment variables, Vercel deployments, or fallback.
 */
export function getBaseUrl(): string {
  // 1. Explicitly configured custom domain or testing domain
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // 2. Vercel Production Environment auto-injected URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/+$/, '');
  }

  // 3. Vercel Preview / Branch Deployment auto-injected URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
  }

  // 4. Default fallback for Vercel deployment before custom domain attachment
  return 'https://tryangletech.vercel.app';
}

export default getBaseUrl;
