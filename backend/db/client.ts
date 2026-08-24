import { PrismaClient } from '@prisma/client';

// Global connection caching for Next.js development hot-reloading
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Ensure robust connection pooling parameters for build & runtime concurrency
function getDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  if (!url.includes('connection_limit') && !url.includes('pool_timeout')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}connection_limit=10&pool_timeout=20`;
  }
  return url;
}

const dbUrl = getDatabaseUrl();

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = db;
}

export default db;
