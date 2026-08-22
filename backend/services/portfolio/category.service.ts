import { Prisma } from '@prisma/client';
import db from '@/backend/db/client';
import { portfolioCache } from './portfolio.service';
import { generateSlug } from './portfolio.utils';

export const DEFAULT_PORTFOLIO_CATEGORY = 'General';
export const DEFAULT_BLOG_CATEGORY = 'General';
export const DEFAULT_CATEGORY = 'General';

export interface PortfolioCategoryItem {
  id: string;
  name: string;
  slug: string;
  type: string;
  order: number;
  projectCount: number;
  postCount: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  etag: string;
}

class CategoryCacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTtlMs = 60 * 1000; // 1 minute

  public generateEtag(data: any): string {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return `"${Math.abs(hash).toString(36)}-${str.length.toString(36)}"`;
  }

  public get<T>(key: string): CacheEntry<T> | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry as CacheEntry<T>;
  }

  public set<T>(key: string, data: T, ttlMs = this.defaultTtlMs): CacheEntry<T> {
    const etag = this.generateEtag(data);
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + ttlMs,
      etag,
    };
    this.cache.set(key, entry);
    return entry;
  }

  public clear(): void {
    this.cache.clear();
  }
}

const categoryCache = new CategoryCacheManager();

let isCategoryTableEnsured = false;
const seededTypes = new Set<string>();

export const portfolioCategoryService = {
  /**
   * Auto-creates the PortfolioCategory table in PostgreSQL if missing.
   */
  async ensureTableExists(): Promise<void> {
    if (isCategoryTableEnsured) return;
    isCategoryTableEnsured = true;
    try {
      await db.$executeRaw`
        CREATE TABLE IF NOT EXISTS "PortfolioCategory" (
          "id" TEXT PRIMARY KEY,
          "name" TEXT NOT NULL,
          "slug" TEXT NOT NULL,
          "type" TEXT NOT NULL DEFAULT 'PORTFOLIO',
          "order" INTEGER DEFAULT 0,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
    } catch (err) {
      console.warn('[DB Category] ensureTableExists notice:', err);
    }
  },

  /**
   * Ensures the protected default 'General' category exists for the given type (PORTFOLIO, BLOG, etc.).
   */
  async seedIfEmpty(type: string = 'PORTFOLIO'): Promise<void> {
    const normalizedType = (type || 'PORTFOLIO').toUpperCase().trim();
    if (seededTypes.has(normalizedType)) return;
    seededTypes.add(normalizedType);

    try {
      await this.ensureTableExists();

      const defaultSlug = generateSlug(DEFAULT_CATEGORY);
      const defaultId = `cat_default_${normalizedType.toLowerCase()}_${defaultSlug}`;

      await db.$executeRaw`
        INSERT INTO "PortfolioCategory" ("id", "name", "slug", "type", "order", "createdAt", "updatedAt")
        VALUES (${defaultId}, ${DEFAULT_CATEGORY}, ${defaultSlug}, ${normalizedType}, 999, NOW(), NOW())
        ON CONFLICT DO NOTHING
      `;
    } catch (err) {
      console.warn(`[DB Category] seed default 'General' (${type}) notice:`, err);
    }
  },

  /**
   * Get all active categories filtered by type (e.g. 'PORTFOLIO' or 'BLOG')
   */
  async getAllCategories(type: string = 'PORTFOLIO'): Promise<PortfolioCategoryItem[] & { etag?: string }> {
    const normalizedType = (type || 'PORTFOLIO').toUpperCase().trim();
    const cacheKey = `all_categories_${normalizedType.toLowerCase()}`;

    // 1. Instant Cache Hit (< 0.1ms)
    const cached = categoryCache.get<PortfolioCategoryItem[]>(cacheKey);
    if (cached) {
      const items = [...cached.data] as PortfolioCategoryItem[] & { etag?: string };
      items.etag = cached.etag;
      return items;
    }

    try {
      this.seedIfEmpty(normalizedType);

      // Parallelize categories and counts queries in a single roundtrip with 2.5s timeout
      const [categoryRows, countRows] = await Promise.race([
        Promise.all([
          db.$queryRaw<any[]>`
            SELECT * FROM "PortfolioCategory" 
            WHERE "type" = ${normalizedType} 
            ORDER BY "order" ASC, "createdAt" ASC
          `,
          normalizedType === 'BLOG'
            ? db.$queryRaw<Array<{ category: string; count: bigint | number }>>`
                SELECT "category", COUNT(*)::int as count FROM "BlogPost" GROUP BY "category"
              `.catch(() => [])
            : db.$queryRaw<Array<{ category: string; count: bigint | number }>>`
                SELECT "category", COUNT(*)::int as count FROM "PortfolioProject" GROUP BY "category"
              `.catch(() => []),
        ]),
        new Promise<[any[], any[]]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout (2500ms)')), 2500)),
      ]);

      // Fetch entity counts (Portfolio projects or Blog posts)
      let countsMap: Record<string, number> = {};
      if (countRows && Array.isArray(countRows)) {
        countRows.forEach((r: any) => {
          if (r.category) countsMap[r.category.toLowerCase().trim()] = Number(r.count || 0);
        });
      }

      const items: PortfolioCategoryItem[] = (categoryRows || []).map((r: any) => {
        const nameClean = (r.name || '').toLowerCase().trim();
        const isDefault = nameClean === DEFAULT_CATEGORY.toLowerCase();
        const count = countsMap[nameClean] || 0;
        return {
          id: r.id,
          name: r.name,
          slug: r.slug,
          type: r.type || normalizedType,
          order: Number(r.order || 0),
          projectCount: count,
          postCount: count,
          isDefault,
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
          updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
        };
      });

      const entry = categoryCache.set(cacheKey, items);
      const result = [...items] as PortfolioCategoryItem[] & { etag?: string };
      result.etag = entry.etag;
      return result;
    } catch (err) {
      console.error(`[DB Category] getAllCategories (${type}) fallback:`, err);
      // Clean dynamic fallback with protected 'General'
      return [
        {
          id: `cat_default_${normalizedType.toLowerCase()}_general`,
          name: DEFAULT_CATEGORY,
          slug: generateSlug(DEFAULT_CATEGORY),
          type: normalizedType,
          order: 0,
          projectCount: 0,
          postCount: 0,
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ] as PortfolioCategoryItem[] & { etag?: string };
    }
  },

  /**
   * Create a new category for a given type (PORTFOLIO, BLOG, etc.)
   */
  async createCategory(name: string, type: string = 'PORTFOLIO'): Promise<PortfolioCategoryItem> {
    await this.ensureTableExists();

    const cleanName = name.trim();
    if (!cleanName) {
      throw new Error('Category name cannot be empty.');
    }

    const normalizedType = (type || 'PORTFOLIO').toUpperCase().trim();

    // 1. Pre-check if category already exists for this type (case-insensitive)
    try {
      const existing = await db.$queryRaw<any[]>`
        SELECT * FROM "PortfolioCategory" 
        WHERE LOWER("name") = ${cleanName.toLowerCase()} AND "type" = ${normalizedType}
        LIMIT 1
      `;
      if (existing && Array.isArray(existing) && existing.length > 0) {
        throw new Error(`Category "${cleanName}" already exists.`);
      }
    } catch (err: any) {
      if (err.message && err.message.includes('already exists')) {
        throw err;
      }
    }

    const slug = generateSlug(cleanName);
    const id = `cat_${normalizedType.toLowerCase()}_${Date.now()}_${slug}`;

    // Get max order for this type
    const maxOrderRows = await db.$queryRaw<Array<{ max_order: number | null }>>`
      SELECT MAX("order") as max_order FROM "PortfolioCategory" WHERE "type" = ${normalizedType}
    `;
    const nextOrder = (maxOrderRows[0]?.max_order ?? -1) + 1;

    try {
      await db.$executeRaw`
        INSERT INTO "PortfolioCategory" ("id", "name", "slug", "type", "order", "createdAt", "updatedAt")
        VALUES (${id}, ${cleanName}, ${slug}, ${normalizedType}, ${nextOrder}, NOW(), NOW())
      `;
    } catch (err: any) {
      const errMsg = String(err?.message || '');
      if (
        err?.code === 'P2002' ||
        err?.code === '23505' ||
        errMsg.includes('23505') ||
        errMsg.includes('already exists') ||
        errMsg.includes('unique') ||
        errMsg.includes('duplicate')
      ) {
        throw new Error(`Category "${cleanName}" already exists.`);
      }
      throw new Error(`Failed to create category "${cleanName}".`);
    }

    categoryCache.clear();
    portfolioCache.clear();

    return {
      id,
      name: cleanName,
      slug,
      type: normalizedType,
      order: nextOrder,
      projectCount: 0,
      postCount: 0,
      isDefault: cleanName.toLowerCase() === DEFAULT_CATEGORY.toLowerCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Delete category by ID or name for a given type.
   * Protects the default category ('General') and automatically reassigns
   * any orphaned projects / posts to 'General'.
   */
  async deleteCategory(idOrName: string, type: string = 'PORTFOLIO'): Promise<{ success: boolean; deletedName: string; reassignedCount: number }> {
    if (!idOrName || !idOrName.trim()) {
      throw new Error('Category identifier is required.');
    }

    const normalizedType = (type || 'PORTFOLIO').toUpperCase().trim();
    const trimmed = idOrName.trim();

    if (trimmed.toLowerCase() === DEFAULT_CATEGORY.toLowerCase()) {
      throw new Error(`The default "${DEFAULT_CATEGORY}" category is protected and cannot be deleted.`);
    }

    await this.seedIfEmpty(normalizedType);

    // Query category by id, name, or slug for this specific type
    const target = await db.$queryRaw<any[]>`
      SELECT * FROM "PortfolioCategory" 
      WHERE ("id" = ${trimmed} OR LOWER("name") = LOWER(${trimmed}) OR LOWER("slug") = LOWER(${trimmed}))
        AND "type" = ${normalizedType}
      LIMIT 1
    `;

    const categoryName = target && target.length > 0 ? target[0].name : trimmed;
    const categoryId = target && target.length > 0 ? target[0].id : null;

    if (categoryName.toLowerCase() === DEFAULT_CATEGORY.toLowerCase()) {
      throw new Error(`The default "${DEFAULT_CATEGORY}" category is protected and cannot be deleted.`);
    }

    // Automatically reassign orphaned records to default 'General'
    let reassignedCount = 0;
    try {
      if (normalizedType === 'BLOG') {
        const updatePosts = await db.$executeRaw`
          UPDATE "BlogPost"
          SET "category" = ${DEFAULT_CATEGORY},
              "updatedAt" = NOW()
          WHERE LOWER("category") = LOWER(${categoryName})
        `;
        reassignedCount = Number(updatePosts || 0);
      } else {
        const updateProjects = await db.$executeRaw`
          UPDATE "PortfolioProject"
          SET "category" = ${DEFAULT_CATEGORY},
              "updatedAt" = NOW()
          WHERE LOWER("category") = LOWER(${categoryName})
        `;
        reassignedCount = Number(updateProjects || 0);
      }
    } catch (err) {
      console.warn('[DB Category] item reassignment notice:', err);
    }

    // Delete category from DB table
    if (categoryId) {
      await db.$executeRaw`
        DELETE FROM "PortfolioCategory" WHERE "id" = ${categoryId}
      `;
    } else {
      await db.$executeRaw`
        DELETE FROM "PortfolioCategory" WHERE LOWER("name") = LOWER(${categoryName}) AND "type" = ${normalizedType}
      `;
    }

    // Clear caches
    categoryCache.clear();
    portfolioCache.clear();

    return {
      success: true,
      deletedName: categoryName,
      reassignedCount,
    };
  },
};

export default portfolioCategoryService;
