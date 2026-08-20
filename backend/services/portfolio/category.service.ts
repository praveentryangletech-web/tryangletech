import { Prisma } from '@prisma/client';
import db from '@/backend/db/client';
import { PORTFOLIO_CATEGORIES } from '@/app/data/portfolioData';
import { portfolioCache } from './portfolio.service';
import { generateSlug } from './portfolio.utils';

export const DEFAULT_PORTFOLIO_CATEGORY = 'General';

export interface PortfolioCategoryItem {
  id: string;
  name: string;
  slug: string;
  order: number;
  projectCount: number;
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
let isCategoriesSeeded = false;

export const portfolioCategoryService = {
  /**
   * Auto-creates the PortfolioCategory table in PostgreSQL if missing.
   */
  async ensureTableExists(): Promise<void> {
    if (isCategoryTableEnsured) return;
    try {
      await db.$executeRaw`
        CREATE TABLE IF NOT EXISTS "PortfolioCategory" (
          "id" TEXT PRIMARY KEY,
          "name" TEXT UNIQUE NOT NULL,
          "slug" TEXT UNIQUE NOT NULL,
          "order" INTEGER DEFAULT 0,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
      isCategoryTableEnsured = true;
    } catch (err) {
      console.warn('[DB Category] ensureTableExists notice:', err);
    }
  },

  /**
   * Seed default 6 categories + 1 protected default category ("General") if missing.
   */
  async seedIfEmpty(): Promise<void> {
    if (isCategoriesSeeded) return;
    isCategoriesSeeded = true;

    try {
      await this.ensureTableExists();

      const seedList = [...PORTFOLIO_CATEGORIES];
      if (!seedList.includes(DEFAULT_PORTFOLIO_CATEGORY as any)) {
        seedList.push(DEFAULT_PORTFOLIO_CATEGORY as any);
      }

      for (let i = 0; i < seedList.length; i++) {
        const name = seedList[i];
        const slug = generateSlug(name);
        const id = `cat_${i + 1}_${slug}`;

        await db.$executeRaw`
          INSERT INTO "PortfolioCategory" ("id", "name", "slug", "order", "createdAt", "updatedAt")
          VALUES (${id}, ${name}, ${slug}, ${i}, NOW(), NOW())
          ON CONFLICT ("name") DO NOTHING
        `;
      }
    } catch (err) {
      console.warn('[DB Category] seedIfEmpty notice:', err);
    }
  },

  /**
   * Get all active categories with project counts
   */
  async getAllCategories(): Promise<PortfolioCategoryItem[] & { etag?: string }> {
    const cacheKey = 'all_categories';
    const cached = categoryCache.get<PortfolioCategoryItem[]>(cacheKey);
    if (cached) {
      const items = [...cached.data] as PortfolioCategoryItem[] & { etag?: string };
      items.etag = cached.etag;
      return items;
    }

    try {
      await this.seedIfEmpty();

      // Fetch categories
      const categoryRows = await db.$queryRaw<any[]>`
        SELECT * FROM "PortfolioCategory" ORDER BY "order" ASC, "createdAt" ASC
      `;

      // Fetch project counts grouped by category
      let countsMap: Record<string, number> = {};
      try {
        const countRows = await db.$queryRaw<Array<{ category: string; count: bigint | number }>>`
          SELECT "category", COUNT(*)::int as count FROM "PortfolioProject" GROUP BY "category"
        `;
        if (countRows && Array.isArray(countRows)) {
          countRows.forEach((r) => {
            if (r.category) {
              const clean = r.category.toLowerCase().trim();
              countsMap[clean] = Number(r.count || 0);
            }
          });
        }
      } catch (err) {
        console.warn('[DB Category] count query notice:', err);
      }

      const items: PortfolioCategoryItem[] = categoryRows.map((r) => {
        const nameClean = (r.name || '').toLowerCase().trim();
        const isDefault = nameClean === DEFAULT_PORTFOLIO_CATEGORY.toLowerCase();
        return {
          id: r.id,
          name: r.name,
          slug: r.slug,
          order: r.order ?? 0,
          projectCount: countsMap[nameClean] ?? 0,
          isDefault,
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
          updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
        };
      });

      const entry = categoryCache.set(cacheKey, items);
      const result = items as PortfolioCategoryItem[] & { etag?: string };
      result.etag = entry.etag;
      return result;
    } catch (err) {
      console.error('[DB Category] getAllCategories fallback:', err);
      // Static fallback
      const fallbackList = [...PORTFOLIO_CATEGORIES, DEFAULT_PORTFOLIO_CATEGORY];
      const fallbackItems: PortfolioCategoryItem[] = fallbackList.map((name, idx) => ({
        id: `cat_${idx + 1}`,
        name,
        slug: generateSlug(name),
        order: idx,
        projectCount: 0,
        isDefault: name.toLowerCase() === DEFAULT_PORTFOLIO_CATEGORY.toLowerCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      const result = fallbackItems as PortfolioCategoryItem[] & { etag?: string };
      result.etag = categoryCache.generateEtag(fallbackItems);
      return result;
    }
  },

  /**
   * Create a new category
   */
  async createCategory(name: string): Promise<PortfolioCategoryItem> {
    const trimmedName = name.trim();
    if (!trimmedName) {
      throw new Error('Category name is required.');
    }
    if (trimmedName.length > 60) {
      throw new Error('Category name cannot exceed 60 characters.');
    }

    await this.ensureTableExists();

    const slug = generateSlug(trimmedName);
    const id = `cat_${Date.now()}_${slug}`;

    // Check if category already exists (case-insensitive)
    const existing = await db.$queryRaw<any[]>`
      SELECT "id", "name" FROM "PortfolioCategory" 
      WHERE LOWER("name") = LOWER(${trimmedName}) OR LOWER("slug") = LOWER(${slug})
      LIMIT 1
    `;

    if (existing && existing.length > 0) {
      throw new Error(`Category "${trimmedName}" already exists.`);
    }

    // Determine next order
    let nextOrder = 0;
    try {
      const orderRows = await db.$queryRaw<Array<{ max_order: number }>>`
        SELECT COALESCE(MAX("order"), -1) as max_order FROM "PortfolioCategory"
      `;
      nextOrder = Number(orderRows[0]?.max_order ?? -1) + 1;
    } catch {
      nextOrder = Date.now();
    }

    await db.$executeRaw`
      INSERT INTO "PortfolioCategory" ("id", "name", "slug", "order", "createdAt", "updatedAt")
      VALUES (${id}, ${trimmedName}, ${slug}, ${nextOrder}, NOW(), NOW())
    `;

    // Clear caches
    categoryCache.clear();
    portfolioCache.clear();

    return {
      id,
      name: trimmedName,
      slug,
      order: nextOrder,
      projectCount: 0,
      isDefault: trimmedName.toLowerCase() === DEFAULT_PORTFOLIO_CATEGORY.toLowerCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Delete category by ID or name.
   * Protects the default category ('General') and automatically reassigns
   * any orphaned projects to 'General'.
   */
  async deleteCategory(idOrName: string): Promise<{ success: boolean; deletedName: string; reassignedCount: number }> {
    if (!idOrName || !idOrName.trim()) {
      throw new Error('Category identifier is required.');
    }

    const trimmed = idOrName.trim();
    await this.ensureTableExists();

    const target = await db.$queryRaw<any[]>`
      SELECT * FROM "PortfolioCategory" 
      WHERE "id" = ${trimmed} OR LOWER("name") = LOWER(${trimmed}) OR "slug" = ${trimmed}
      LIMIT 1
    `;

    if (!target || target.length === 0) {
      throw new Error('Category not found.');
    }

    const categoryRecord = target[0];

    // Protection check: Cannot delete default category
    if (categoryRecord.name.toLowerCase() === DEFAULT_PORTFOLIO_CATEGORY.toLowerCase()) {
      throw new Error(`The default "${DEFAULT_PORTFOLIO_CATEGORY}" category is protected and cannot be deleted.`);
    }

    // Automatically reassign any projects in this category to default 'General'
    let reassignedCount = 0;
    try {
      // Ensure 'General' category exists first
      await this.seedIfEmpty();

      const updateRes = await db.$executeRaw`
        UPDATE "PortfolioProject"
        SET "category" = ${DEFAULT_PORTFOLIO_CATEGORY},
            "updatedAt" = NOW()
        WHERE LOWER("category") = LOWER(${categoryRecord.name})
      `;
      reassignedCount = Number(updateRes || 0);
    } catch (err) {
      console.warn('[DB Category] project reassignment notice:', err);
    }

    // Delete category
    await db.$executeRaw`
      DELETE FROM "PortfolioCategory" WHERE "id" = ${categoryRecord.id}
    `;

    // Clear caches
    categoryCache.clear();
    portfolioCache.clear();

    return {
      success: true,
      deletedName: categoryRecord.name,
      reassignedCount,
    };
  },
};

export default portfolioCategoryService;
