import { db } from '@/backend/db/client';
import { Metadata } from 'next';
import {
  ServiceMainContentDTO,
  ServicePageSummaryItem,
  ServicesListResponse,
  ServicesListFilterOptions,
  WebDevContentDTO,
  MobileAppContentDTO,
  CustomSoftwareContentDTO,
} from './services.types';
import {
  DEFAULT_SERVICE_MAIN_CONTENT,
  DEFAULT_SERVICES_LIST,
  DEFAULT_WEB_DEV_CONTENT,
  DEFAULT_MOBILE_APP_CONTENT,
  DEFAULT_CUSTOM_SOFTWARE_CONTENT,
} from './services.defaults';


interface CachedEntry<T> {
  data: T;
  timestamp: number;
  etag: string;
}

class ServicesCacheManager {
  private cache: Map<string, CachedEntry<any>> = new Map();
  private defaultTTL: number = process.env.NODE_ENV === 'production' ? 2000 : 5000;

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): CachedEntry<T> {
    const etag = `W/"services-${Date.now()}-${Math.random().toString(36).substring(2, 9)}"`;
    const entry: CachedEntry<T> = {
      data,
      timestamp: Date.now() + ttl,
      etag,
    };
    this.cache.set(key, entry);
    return entry;
  }

  get<T>(key: string): CachedEntry<T> | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.timestamp) {
      this.cache.delete(key);
      return null;
    }
    return entry;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const servicesCache = new ServicesCacheManager();

let isServicesTableEnsured = false;

function parseJsonSafe<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  if (typeof val === 'string') {
    try {
      return JSON.parse(val) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

// Initial DB seeding records for all 6 service pages
const SEED_SERVICES_PAGES = [
  {
    slug: 'service-main',
    pageType: 'SERVICE_MAIN',
    city: 'Main Services Overview',
    region: 'Core Service Hub',
    postalCode: '/service',
    isPublished: true,
  },
  {
    slug: 'service-web-development',
    pageType: 'SERVICE_SUB',
    city: 'Website & Web Application Development',
    region: 'Engineering & Web',
    postalCode: '/service/web-development',
    isPublished: true,
  },
  {
    slug: 'service-custom-software',
    pageType: 'SERVICE_SUB',
    city: 'Custom Software & Enterprise Solutions',
    region: 'Enterprise Engineering',
    postalCode: '/service/custom-software',
    isPublished: true,
  },
  {
    slug: 'service-mobile-application',
    pageType: 'SERVICE_SUB',
    city: 'iOS & Android Mobile App Development',
    region: 'Mobile Applications',
    postalCode: '/service/mobile-application',
    isPublished: true,
  },
  {
    slug: 'service-graphics-designing',
    pageType: 'SERVICE_SUB',
    city: 'Graphics Designing & UI/UX Experience',
    region: 'Design & Visuals',
    postalCode: '/service/graphics-designing',
    isPublished: true,
  },
  {
    slug: 'service-digital-marketing',
    pageType: 'SERVICE_SUB',
    city: 'Digital Marketing & Growth Engineering',
    region: 'Marketing & SEO',
    postalCode: '/service/digital-marketing',
    isPublished: true,
  },
];

export const servicesService = {
  /**
   * Non-blocking background table verification and DB record seeding
   */
  ensureTable(): void {
    if (isServicesTableEnsured) return;
    isServicesTableEnsured = true;

    (async () => {
      try {
        await db.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS "PageContent" (
            "slug" TEXT PRIMARY KEY,
            "pageType" TEXT NOT NULL DEFAULT 'SERVICE_MAIN',
            "city" TEXT,
            "state" TEXT,
            "country" TEXT NOT NULL DEFAULT 'India',
            "countryCode" TEXT NOT NULL DEFAULT 'IN',
            "region" TEXT NOT NULL DEFAULT 'Global',
            "regionCode" TEXT NOT NULL DEFAULT 'IN-GJ',
            "postalCode" TEXT,
            "latitude" DOUBLE PRECISION DEFAULT 23.0225,
            "longitude" DOUBLE PRECISION DEFAULT 72.5714,
            "popular" BOOLEAN NOT NULL DEFAULT false,
            "hero" JSONB,
            "services" JSONB,
            "about" JSONB,
            "whyChooseUs" JSONB,
            "howWeWork" JSONB,
            "techStack" JSONB,
            "testimonials" JSONB,
            "ctaBanner" JSONB,
            "metaTitle" TEXT,
            "metaDescription" TEXT,
            "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
            "faqs" JSONB,
            "isPublished" BOOLEAN NOT NULL DEFAULT true,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
        `);

        // Seed all default service pages into DB if missing
        for (const item of SEED_SERVICES_PAGES) {
          if (item.slug === 'service-main') {
            await db.$executeRawUnsafe(
              `
              INSERT INTO "PageContent" (
                "slug", "pageType", "city", "region", "postalCode", "hero", "services", "about", "techStack", "faqs", "testimonials", "metaTitle", "metaDescription", "keywords", "isPublished", "createdAt", "updatedAt"
              ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, $12, $13, $14::text[], $15, NOW(), NOW())
              ON CONFLICT ("slug") DO NOTHING;
            `,
              item.slug,
              item.pageType,
              item.city,
              item.region,
              item.postalCode,
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.hero),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.servicesList),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.highlights),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.tools),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.faqs),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.testimonials),
              DEFAULT_SERVICE_MAIN_CONTENT.metaTitle,
              DEFAULT_SERVICE_MAIN_CONTENT.metaDescription,
              DEFAULT_SERVICE_MAIN_CONTENT.keywords,
              item.isPublished
            );
          } else if (item.slug === 'service-mobile-application') {
            await db.$executeRawUnsafe(
              `
              INSERT INTO "PageContent" (
                "slug", "pageType", "city", "region", "postalCode", "hero", "about", "services", "whyChooseUs", "howWeWork", "techStack", "testimonials", "faqs", "metaTitle", "metaDescription", "keywords", "isPublished", "createdAt", "updatedAt"
              ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, $12::jsonb, $13::jsonb, $14, $15, $16::text[], $17, NOW(), NOW())
              ON CONFLICT ("slug") DO NOTHING;
            `,
              item.slug,
              item.pageType,
              item.city,
              item.region,
              item.postalCode,
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.hero),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.process),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.types),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.advantage),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.features),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.engineering),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.testimonials),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.faqs),
              DEFAULT_MOBILE_APP_CONTENT.metaTitle,
              DEFAULT_MOBILE_APP_CONTENT.metaDescription,
              DEFAULT_MOBILE_APP_CONTENT.keywords,
              item.isPublished
            );
          } else if (item.slug === 'service-web-development') {
            await db.$executeRawUnsafe(
              `
              INSERT INTO "PageContent" (
                "slug", "pageType", "city", "region", "postalCode", "hero", "about", "services", "techStack", "faqs", "metaTitle", "metaDescription", "keywords", "isPublished", "createdAt", "updatedAt"
              ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11, $12, $13::text[], $14, NOW(), NOW())
              ON CONFLICT ("slug") DO NOTHING;
            `,
              item.slug,
              item.pageType,
              item.city,
              item.region,
              item.postalCode,
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.hero),
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.speciality),
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.types),
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.techStack),
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.faqs),
              DEFAULT_WEB_DEV_CONTENT.metaTitle,
              DEFAULT_WEB_DEV_CONTENT.metaDescription,
              DEFAULT_WEB_DEV_CONTENT.keywords,
              item.isPublished
            );
          } else {
            await db.$executeRawUnsafe(
              `
              INSERT INTO "PageContent" (
                "slug", "pageType", "city", "region", "postalCode", "metaTitle", "isPublished", "createdAt", "updatedAt"
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
              ON CONFLICT ("slug") DO NOTHING;
            `,
              item.slug,
              item.pageType,
              item.city,
              item.region,
              item.postalCode,
              item.city,
              item.isPublished
            );
          }
        }

      } catch (e) {
        console.warn('[ServicesService] Background PageContent table verification notice:', e);
      }
    })();
  },

  /**
   * 100% Database-Driven Paginated Services List with Search & Filtering
   */
  async getServicesPagesList(options: ServicesListFilterOptions = {}): Promise<ServicesListResponse> {
    this.ensureTable();

    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.max(1, Math.min(50, Number(options.limit) || 8));
    const offset = (page - 1) * limit;
    const search = options.search ? options.search.trim() : '';
    const status = options.status || 'all';
    const category = options.category && options.category !== 'All' ? options.category.trim() : '';

    try {
      // Build dynamic SQL conditions
      const conditions: string[] = [`"pageType" IN ('SERVICE_MAIN', 'SERVICE_SUB')`];
      const params: any[] = [];
      let paramIdx = 1;

      if (search) {
        conditions.push(`("city" ILIKE $${paramIdx} OR "slug" ILIKE $${paramIdx} OR "postalCode" ILIKE $${paramIdx} OR "region" ILIKE $${paramIdx})`);
        params.push(`%${search}%`);
        paramIdx++;
      }

      if (category) {
        conditions.push(`"region" = $${paramIdx}`);
        params.push(category);
        paramIdx++;
      }

      if (status === 'published') {
        conditions.push(`"isPublished" = true`);
      } else if (status === 'draft') {
        conditions.push(`"isPublished" = false`);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      // 1. Total Count Query
      const countResult = await db.$queryRawUnsafe<any[]>(
        `SELECT COUNT(*)::int AS total FROM "PageContent" ${whereClause}`,
        ...params
      );
      const total = countResult && countResult.length > 0 ? Number(countResult[0].total) : 0;

      // 2. Paginated Items Query
      const itemsResult = await db.$queryRawUnsafe<any[]>(
        `
        SELECT "slug", "city" AS "name", "postalCode" AS "route", "region" AS "category", "pageType", "isPublished", "updatedAt"
        FROM "PageContent"
        ${whereClause}
        ORDER BY CASE WHEN "pageType" = 'SERVICE_MAIN' THEN 0 ELSE 1 END, "createdAt" ASC
        LIMIT $${paramIdx} OFFSET $${paramIdx + 1}
      `,
        ...params,
        limit,
        offset
      );

      // 3. Unique Categories Query
      const categoriesResult = await db.$queryRaw<any[]>`
        SELECT DISTINCT "region" AS category
        FROM "PageContent"
        WHERE "pageType" IN ('SERVICE_MAIN', 'SERVICE_SUB') AND "region" IS NOT NULL
        ORDER BY category ASC
      `;
      const categories = ['All', ...categoriesResult.map((r) => r.category).filter(Boolean)];

      // Map rows to DTOs
      const items: ServicePageSummaryItem[] = (itemsResult || []).map((row) => ({
        id: row.slug,
        slug: row.slug.replace(/^service-/, ''),
        name: row.name || row.slug,
        route: row.route || `/service/${row.slug.replace(/^service-/, '')}`,
        category: row.category || 'Engineering & Web',
        isMainPage: row.pageType === 'SERVICE_MAIN' || row.slug === 'service-main',
        isPublished: row.isPublished ?? true,
        updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
      }));

      const totalPages = Math.ceil(total / limit) || 1;

      return {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        categories,
      };
    } catch (err) {
      console.warn('[ServicesService] Database query fallback for services list:', err);
      // Fallback in case of DB connection error
      const filtered = DEFAULT_SERVICES_LIST.filter((item) => {
        const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
        const matchCat = !category || item.category === category;
        const matchStat = status === 'all' || (status === 'published' && item.isPublished) || (status === 'draft' && !item.isPublished);
        return matchSearch && matchCat && matchStat;
      });

      const total = filtered.length;
      const paginated = filtered.slice(offset, offset + limit);
      const totalPages = Math.ceil(total / limit) || 1;

      return {
        items: paginated,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        categories: ['All', 'Core Service Hub', 'Engineering & Web', 'Enterprise Engineering', 'Mobile Applications', 'Design & Visuals', 'Marketing & SEO'],
      };
    }
  },

  /**
   * Toggle publication status of any service page directly in DB
   */
  async toggleServiceStatus(slug: string, isPublished: boolean): Promise<boolean> {
    this.ensureTable();
    try {
      const cleanSlug = slug.startsWith('service-') ? slug : `service-${slug}`;
      await db.$executeRawUnsafe(
        `UPDATE "PageContent" SET "isPublished" = $1, "updatedAt" = NOW() WHERE "slug" = $2 OR "slug" = $3`,
        isPublished,
        cleanSlug,
        slug
      );
      servicesCache.clear();
      return true;
    } catch (e) {
      console.warn('[ServicesService] Error toggling status in DB:', e);
      return false;
    }
  },

  /**
   * Retrieve dynamic Main Service Page content with resilient caching from DB
   */
  async getServiceMainContent(): Promise<ServiceMainContentDTO> {
    const cacheKey = 'service_content_main';
    const cached = servicesCache.get<ServiceMainContentDTO>(cacheKey);
    if (cached) {
      return cached.data;
    }

    this.ensureTable();

    try {
      const rows = await db.$queryRaw<any[]>`
        SELECT * FROM "PageContent"
        WHERE "slug" = 'service-main'
        LIMIT 1
      `;

      if (!rows || rows.length === 0) {
        // Seed default record in background
        (async () => {
          try {
            await db.$executeRawUnsafe(
              `
              INSERT INTO "PageContent" (
                "slug", "pageType", "city", "region", "postalCode", "hero", "services", "about", "techStack", "faqs", "testimonials", "metaTitle", "metaDescription", "keywords", "isPublished", "createdAt", "updatedAt"
              ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, $12, $13, $14::text[], $15, NOW(), NOW())
              ON CONFLICT ("slug") DO NOTHING;
            `,
              'service-main',
              'SERVICE_MAIN',
              'Main Services Overview',
              'Core Service Hub',
              '/service',
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.hero),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.servicesList),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.highlights),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.tools),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.faqs),
              JSON.stringify(DEFAULT_SERVICE_MAIN_CONTENT.testimonials),
              DEFAULT_SERVICE_MAIN_CONTENT.metaTitle,
              DEFAULT_SERVICE_MAIN_CONTENT.metaDescription,
              DEFAULT_SERVICE_MAIN_CONTENT.keywords,
              true
            );
          } catch (e) {
            console.warn('[ServicesService] Notice during initial seeding:', e);
          }
        })();

        servicesCache.set(cacheKey, DEFAULT_SERVICE_MAIN_CONTENT);
        return DEFAULT_SERVICE_MAIN_CONTENT;
      }

      const row = rows[0];

      const dto: ServiceMainContentDTO = {
        id: row.slug || 'service-main',
        hero: parseJsonSafe(row.hero, DEFAULT_SERVICE_MAIN_CONTENT.hero),
        servicesList: parseJsonSafe(row.services, DEFAULT_SERVICE_MAIN_CONTENT.servicesList),
        highlights: parseJsonSafe(row.about, DEFAULT_SERVICE_MAIN_CONTENT.highlights),
        tools: parseJsonSafe(row.techStack, DEFAULT_SERVICE_MAIN_CONTENT.tools),
        faqs: parseJsonSafe(row.faqs, DEFAULT_SERVICE_MAIN_CONTENT.faqs),
        testimonials: parseJsonSafe(row.testimonials, DEFAULT_SERVICE_MAIN_CONTENT.testimonials),
        metaTitle: row.metaTitle || DEFAULT_SERVICE_MAIN_CONTENT.metaTitle,
        metaDescription: row.metaDescription || DEFAULT_SERVICE_MAIN_CONTENT.metaDescription,
        keywords: Array.isArray(row.keywords) && row.keywords.length > 0 ? row.keywords : DEFAULT_SERVICE_MAIN_CONTENT.keywords,
        canonicalUrl: DEFAULT_SERVICE_MAIN_CONTENT.canonicalUrl,
        isPublished: row.isPublished ?? true,
        updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
      };

      servicesCache.set(cacheKey, dto);
      return dto;
    } catch (err) {
      console.warn('[ServicesService] Falling back to default service main content:', err);
      return DEFAULT_SERVICE_MAIN_CONTENT;
    }
  },

  /**
   * Update Main Service Page content in Supabase PostgreSQL
   */
  async updateServiceMainContent(payload: Partial<ServiceMainContentDTO>): Promise<ServiceMainContentDTO> {
    this.ensureTable();

    const current = await this.getServiceMainContent();

    const updatedHero = payload.hero !== undefined ? payload.hero : current.hero;
    const updatedServicesList = payload.servicesList !== undefined ? payload.servicesList : current.servicesList;
    const updatedHighlights = payload.highlights !== undefined ? payload.highlights : current.highlights;
    const updatedTools = payload.tools !== undefined ? payload.tools : current.tools;
    const updatedFaqs = payload.faqs !== undefined ? payload.faqs : current.faqs;
    const updatedTestimonials = payload.testimonials !== undefined ? payload.testimonials : current.testimonials;
    const updatedMetaTitle = payload.metaTitle !== undefined ? payload.metaTitle : current.metaTitle;
    const updatedMetaDescription = payload.metaDescription !== undefined ? payload.metaDescription : current.metaDescription;
    const updatedKeywords = payload.keywords !== undefined ? payload.keywords : current.keywords;
    const updatedIsPublished = payload.isPublished !== undefined ? payload.isPublished : current.isPublished;

    try {
      await db.$executeRawUnsafe(
        `
        INSERT INTO "PageContent" (
          "slug", "pageType", "city", "region", "postalCode", "hero", "services", "about", "techStack", "faqs", "testimonials", "metaTitle", "metaDescription", "keywords", "isPublished", "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, $12, $13, $14::text[], $15, NOW()
        )
        ON CONFLICT ("slug") DO UPDATE SET
          "hero" = EXCLUDED."hero",
          "services" = EXCLUDED."services",
          "about" = EXCLUDED."about",
          "techStack" = EXCLUDED."techStack",
          "faqs" = EXCLUDED."faqs",
          "testimonials" = EXCLUDED."testimonials",
          "metaTitle" = EXCLUDED."metaTitle",
          "metaDescription" = EXCLUDED."metaDescription",
          "keywords" = EXCLUDED."keywords",
          "isPublished" = EXCLUDED."isPublished",
          "updatedAt" = NOW();
      `,
        'service-main',
        'SERVICE_MAIN',
        'Main Services Overview',
        'Core Service Hub',
        '/service',
        JSON.stringify(updatedHero),
        JSON.stringify(updatedServicesList),
        JSON.stringify(updatedHighlights),
        JSON.stringify(updatedTools),
        JSON.stringify(updatedFaqs),
        JSON.stringify(updatedTestimonials),
        updatedMetaTitle,
        updatedMetaDescription,
        updatedKeywords,
        updatedIsPublished
      );
    } catch (e) {
      console.warn('[ServicesService] Error updating PageContent in DB:', e);
    }

    // Invalidate micro-cache
    servicesCache.clear();

    return {
      id: 'service-main',
      hero: updatedHero,
      servicesList: updatedServicesList,
      highlights: updatedHighlights,
      tools: updatedTools,
      faqs: updatedFaqs,
      testimonials: updatedTestimonials,
      metaTitle: updatedMetaTitle,
      metaDescription: updatedMetaDescription,
      keywords: updatedKeywords,
      canonicalUrl: DEFAULT_SERVICE_MAIN_CONTENT.canonicalUrl,
      isPublished: updatedIsPublished,
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Generate dynamic SEO metadata for Next.js
   */
  async generateMetadata(): Promise<Metadata> {
    const data = await this.getServiceMainContent();
    const title = data.metaTitle || DEFAULT_SERVICE_MAIN_CONTENT.metaTitle;
    const description = data.metaDescription || DEFAULT_SERVICE_MAIN_CONTENT.metaDescription;
    const keywords = data.keywords || DEFAULT_SERVICE_MAIN_CONTENT.keywords;
    const canonical = data.canonicalUrl || 'https://tryangletech.com/service';

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'TryangleTech',
        type: 'website',
        images: [
          {
            url: '/logo.png',
            width: 1200,
            height: 630,
            alt: 'TryangleTech Digital Services',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/logo.png'],
      },
    };
  },

  /**
   * Retrieve dynamic Web Development Sub-Service Page content with resilient caching
   */
  async getWebDevContent(): Promise<WebDevContentDTO> {
    const cacheKey = 'sub_service_content_web_development';
    const cached = servicesCache.get<WebDevContentDTO>(cacheKey);
    if (cached) {
      return cached.data;
    }

    this.ensureTable();

    try {
      const rows = await db.$queryRaw<any[]>`
        SELECT * FROM "PageContent"
        WHERE "slug" = 'service-web-development' OR "slug" = 'web-development'
        LIMIT 1
      `;

      if (!rows || rows.length === 0) {
        // Seed default record in background
        (async () => {
          try {
            await db.$executeRawUnsafe(
              `
              INSERT INTO "PageContent" (
                "slug", "pageType", "city", "region", "postalCode", "hero", "about", "services", "techStack", "faqs", "metaTitle", "metaDescription", "keywords", "isPublished", "createdAt", "updatedAt"
              ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11, $12, $13::text[], $14, NOW(), NOW())
              ON CONFLICT ("slug") DO NOTHING;
            `,
              'service-web-development',
              'SERVICE_SUB',
              'Website & Web Application Development',
              'Engineering & Web',
              '/service/web-development',
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.hero),
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.speciality),
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.types),
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.techStack),
              JSON.stringify(DEFAULT_WEB_DEV_CONTENT.faqs),
              DEFAULT_WEB_DEV_CONTENT.metaTitle,
              DEFAULT_WEB_DEV_CONTENT.metaDescription,
              DEFAULT_WEB_DEV_CONTENT.keywords,
              true
            );
          } catch (e) {
            console.warn('[ServicesService] Notice during initial web-dev seeding:', e);
          }
        })();

        servicesCache.set(cacheKey, DEFAULT_WEB_DEV_CONTENT);
        return DEFAULT_WEB_DEV_CONTENT;
      }

function sanitizeWebDevDto(dto: WebDevContentDTO): WebDevContentDTO {
  if (!dto || !dto.types || !Array.isArray(dto.types.cards)) return dto;

  const sanitizedCards = dto.types.cards.map((c) => {
    let img = c.image || '';
    let smallImg = c.smallImage || '';

    // Auto-heal legacy broken image hash paths to verified asset files
    if (img.includes('6912f62cf1b1aa86d88c42b8')) {
      img = '/Home2_files/6912f62ced71f28b5ad5a83d_taskopia-benefits-home-two-3.webp';
    } else if (img.includes('6912f62ce8b4d830b0ad3374')) {
      img = '/Home2_files/6912f62c90ad4e05a87a0932_taskopia-benefits-home-two-4.webp';
    } else if (img.includes('6912f62c1cfeb4f85e4ae225')) {
      img = '/Home2_files/6912f62d672935141c7f8c81_taskopia-benefits-home-two-5.webp';
    }

    if (smallImg.includes('6912f62c64b4c79ca33cb2be')) {
      smallImg = '/Home2_files/6912f62c4093ef3c309029b2_Group 2085663571.webp';
    } else if (smallImg.includes('6912f62c5b367128f70fa464')) {
      smallImg = '/Home2_files/6912f62c37804ce44caffa0e_Group 2085663152.webp';
    } else if (smallImg.includes('6912f62c0bcaadfa08a4f910') || smallImg.includes('6912f62ccbead75494a37233')) {
      smallImg = '';
    }

    return {
      ...c,
      image: img,
      smallImage: smallImg,
    };
  });

  return {
    ...dto,
    types: {
      ...dto.types,
      cards: sanitizedCards,
    },
  };
}

      const row = rows[0];

      const rawDto: WebDevContentDTO = {
        id: row.slug || 'service-web-development',
        slug: 'web-development',
        hero: parseJsonSafe(row.hero, DEFAULT_WEB_DEV_CONTENT.hero),
        speciality: parseJsonSafe(row.about, DEFAULT_WEB_DEV_CONTENT.speciality),
        types: parseJsonSafe(row.services, DEFAULT_WEB_DEV_CONTENT.types),
        techStack: parseJsonSafe(row.techStack, DEFAULT_WEB_DEV_CONTENT.techStack),
        faqs: parseJsonSafe(row.faqs, DEFAULT_WEB_DEV_CONTENT.faqs),
        metaTitle: row.metaTitle || DEFAULT_WEB_DEV_CONTENT.metaTitle,
        metaDescription: row.metaDescription || DEFAULT_WEB_DEV_CONTENT.metaDescription,
        keywords: Array.isArray(row.keywords) && row.keywords.length > 0 ? row.keywords : DEFAULT_WEB_DEV_CONTENT.keywords,
        canonicalUrl: DEFAULT_WEB_DEV_CONTENT.canonicalUrl,
        isPublished: row.isPublished ?? true,
        updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
      };

      const dto = sanitizeWebDevDto(rawDto);
      servicesCache.set(cacheKey, dto);
      return dto;
    } catch (err) {
      console.warn('[ServicesService] Falling back to default web-dev content:', err);
      return DEFAULT_WEB_DEV_CONTENT;
    }
  },

  /**
   * Update Web Development Sub-Service Page content in Supabase PostgreSQL
   */
  async updateWebDevContent(payload: Partial<WebDevContentDTO>): Promise<WebDevContentDTO> {
    this.ensureTable();

    const current = await this.getWebDevContent();

    const updatedHero = payload.hero !== undefined ? payload.hero : current.hero;
    const updatedSpeciality = payload.speciality !== undefined ? payload.speciality : current.speciality;
    const updatedTypes = payload.types !== undefined ? payload.types : current.types;
    const updatedTechStack = payload.techStack !== undefined ? payload.techStack : current.techStack;
    const updatedFaqs = payload.faqs !== undefined ? payload.faqs : current.faqs;
    const updatedMetaTitle = payload.metaTitle !== undefined ? payload.metaTitle : current.metaTitle;
    const updatedMetaDescription = payload.metaDescription !== undefined ? payload.metaDescription : current.metaDescription;
    const updatedKeywords = payload.keywords !== undefined ? payload.keywords : current.keywords;
    const updatedIsPublished = payload.isPublished !== undefined ? payload.isPublished : current.isPublished;

    try {
      await db.$executeRawUnsafe(
        `
        INSERT INTO "PageContent" (
          "slug", "pageType", "city", "region", "postalCode", "hero", "about", "services", "techStack", "faqs", "metaTitle", "metaDescription", "keywords", "isPublished", "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11, $12, $13::text[], $14, NOW()
        )
        ON CONFLICT ("slug") DO UPDATE SET
          "hero" = EXCLUDED."hero",
          "about" = EXCLUDED."about",
          "services" = EXCLUDED."services",
          "techStack" = EXCLUDED."techStack",
          "faqs" = EXCLUDED."faqs",
          "metaTitle" = EXCLUDED."metaTitle",
          "metaDescription" = EXCLUDED."metaDescription",
          "keywords" = EXCLUDED."keywords",
          "isPublished" = EXCLUDED."isPublished",
          "updatedAt" = NOW();
      `,
        'service-web-development',
        'SERVICE_SUB',
        'Website & Web Application Development',
        'Engineering & Web',
        '/service/web-development',
        JSON.stringify(updatedHero),
        JSON.stringify(updatedSpeciality),
        JSON.stringify(updatedTypes),
        JSON.stringify(updatedTechStack),
        JSON.stringify(updatedFaqs),
        updatedMetaTitle,
        updatedMetaDescription,
        updatedKeywords,
        updatedIsPublished
      );
    } catch (e) {
      console.warn('[ServicesService] Error updating WebDev PageContent in DB:', e);
    }

    // Invalidate micro-cache
    servicesCache.clear();

    return {
      id: 'service-web-development',
      slug: 'web-development',
      hero: updatedHero,
      speciality: updatedSpeciality,
      types: updatedTypes,
      techStack: updatedTechStack,
      faqs: updatedFaqs,
      metaTitle: updatedMetaTitle,
      metaDescription: updatedMetaDescription,
      keywords: updatedKeywords,
      canonicalUrl: DEFAULT_WEB_DEV_CONTENT.canonicalUrl,
      isPublished: updatedIsPublished,
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Retrieve dynamic Mobile Application Sub-Service Page content with resilient caching
   */
  async getMobileAppContent(): Promise<MobileAppContentDTO> {
    const cacheKey = 'sub_service_content_mobile_application';
    const cached = servicesCache.get<MobileAppContentDTO>(cacheKey);
    if (cached) {
      return cached.data;
    }

    this.ensureTable();

    try {
      const rows = await db.$queryRaw<any[]>`
        SELECT * FROM "PageContent"
        WHERE "slug" = 'service-mobile-application' OR "slug" = 'mobile-application'
        LIMIT 1
      `;

      if (!rows || rows.length === 0) {
        // Seed default record in background
        (async () => {
          try {
            await db.$executeRawUnsafe(
              `
              INSERT INTO "PageContent" (
                "slug", "pageType", "city", "region", "postalCode", "hero", "about", "services", "whyChooseUs", "howWeWork", "techStack", "testimonials", "faqs", "metaTitle", "metaDescription", "keywords", "isPublished", "createdAt", "updatedAt"
              ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, $12::jsonb, $13::jsonb, $14, $15, $16::text[], $17, NOW(), NOW())
              ON CONFLICT ("slug") DO NOTHING;
            `,
              'service-mobile-application',
              'SERVICE_SUB',
              'iOS & Android Mobile App Development',
              'Mobile Applications',
              '/service/mobile-application',
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.hero),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.process),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.types),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.advantage),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.features),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.engineering),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.testimonials),
              JSON.stringify(DEFAULT_MOBILE_APP_CONTENT.faqs),
              DEFAULT_MOBILE_APP_CONTENT.metaTitle,
              DEFAULT_MOBILE_APP_CONTENT.metaDescription,
              DEFAULT_MOBILE_APP_CONTENT.keywords,
              true
            );
          } catch (e) {
            console.warn('[ServicesService] Notice during initial mobile-app seeding:', e);
          }
        })();

        servicesCache.set(cacheKey, DEFAULT_MOBILE_APP_CONTENT);
        return DEFAULT_MOBILE_APP_CONTENT;
      }

      const row = rows[0];

      const dto: MobileAppContentDTO = {
        id: row.slug || 'service-mobile-application',
        slug: 'mobile-application',
        hero: parseJsonSafe(row.hero, DEFAULT_MOBILE_APP_CONTENT.hero),
        process: parseJsonSafe(row.about, DEFAULT_MOBILE_APP_CONTENT.process),
        types: parseJsonSafe(row.services, DEFAULT_MOBILE_APP_CONTENT.types),
        advantage: parseJsonSafe(row.whyChooseUs, DEFAULT_MOBILE_APP_CONTENT.advantage),
        features: parseJsonSafe(row.howWeWork, DEFAULT_MOBILE_APP_CONTENT.features),
        engineering: parseJsonSafe(row.techStack, DEFAULT_MOBILE_APP_CONTENT.engineering),
        testimonials: parseJsonSafe(row.testimonials, DEFAULT_MOBILE_APP_CONTENT.testimonials),
        faqs: parseJsonSafe(row.faqs, DEFAULT_MOBILE_APP_CONTENT.faqs),
        metaTitle: row.metaTitle || DEFAULT_MOBILE_APP_CONTENT.metaTitle,
        metaDescription: row.metaDescription || DEFAULT_MOBILE_APP_CONTENT.metaDescription,
        keywords: Array.isArray(row.keywords) && row.keywords.length > 0 ? row.keywords : DEFAULT_MOBILE_APP_CONTENT.keywords,
        canonicalUrl: DEFAULT_MOBILE_APP_CONTENT.canonicalUrl,
        ogImage: DEFAULT_MOBILE_APP_CONTENT.ogImage,
        ogImageAlt: DEFAULT_MOBILE_APP_CONTENT.ogImageAlt,
        isPublished: row.isPublished ?? true,
        updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
      };

      servicesCache.set(cacheKey, dto);
      return dto;
    } catch (err) {
      console.warn('[ServicesService] Falling back to default mobile-app content:', err);
      return DEFAULT_MOBILE_APP_CONTENT;
    }
  },

  /**
   * Update Mobile Application Sub-Service Page content in Supabase PostgreSQL
   */
  async updateMobileAppContent(payload: Partial<MobileAppContentDTO>): Promise<MobileAppContentDTO> {
    this.ensureTable();

    const current = await this.getMobileAppContent();

    const updatedHero = payload.hero !== undefined ? payload.hero : current.hero;
    const updatedProcess = payload.process !== undefined ? payload.process : current.process;
    const updatedTypes = payload.types !== undefined ? payload.types : current.types;
    const updatedAdvantage = payload.advantage !== undefined ? payload.advantage : current.advantage;
    const updatedFeatures = payload.features !== undefined ? payload.features : current.features;
    const updatedEngineering = payload.engineering !== undefined ? payload.engineering : current.engineering;
    const updatedTestimonials = payload.testimonials !== undefined ? payload.testimonials : current.testimonials;
    const updatedFaqs = payload.faqs !== undefined ? payload.faqs : current.faqs;
    const updatedMetaTitle = payload.metaTitle !== undefined ? payload.metaTitle : current.metaTitle;
    const updatedMetaDescription = payload.metaDescription !== undefined ? payload.metaDescription : current.metaDescription;
    const updatedKeywords = payload.keywords !== undefined ? payload.keywords : current.keywords;
    const updatedIsPublished = payload.isPublished !== undefined ? payload.isPublished : current.isPublished;

    try {
      await db.$executeRawUnsafe(
        `
        INSERT INTO "PageContent" (
          "slug", "pageType", "city", "region", "postalCode", "hero", "about", "services", "whyChooseUs", "howWeWork", "techStack", "testimonials", "faqs", "metaTitle", "metaDescription", "keywords", "isPublished", "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, $12::jsonb, $13::jsonb, $14, $15, $16::text[], $17, NOW()
        )
        ON CONFLICT ("slug") DO UPDATE SET
          "hero" = EXCLUDED."hero",
          "about" = EXCLUDED."about",
          "services" = EXCLUDED."services",
          "whyChooseUs" = EXCLUDED."whyChooseUs",
          "howWeWork" = EXCLUDED."howWeWork",
          "techStack" = EXCLUDED."techStack",
          "testimonials" = EXCLUDED."testimonials",
          "faqs" = EXCLUDED."faqs",
          "metaTitle" = EXCLUDED."metaTitle",
          "metaDescription" = EXCLUDED."metaDescription",
          "keywords" = EXCLUDED."keywords",
          "isPublished" = EXCLUDED."isPublished",
          "updatedAt" = NOW();
      `,
        'service-mobile-application',
        'SERVICE_SUB',
        'iOS & Android Mobile App Development',
        'Mobile Applications',
        '/service/mobile-application',
        JSON.stringify(updatedHero),
        JSON.stringify(updatedProcess),
        JSON.stringify(updatedTypes),
        JSON.stringify(updatedAdvantage),
        JSON.stringify(updatedFeatures),
        JSON.stringify(updatedEngineering),
        JSON.stringify(updatedTestimonials),
        JSON.stringify(updatedFaqs),
        updatedMetaTitle,
        updatedMetaDescription,
        updatedKeywords,
        updatedIsPublished
      );
    } catch (e) {
      console.warn('[ServicesService] Error updating MobileApp PageContent in DB:', e);
    }

    // Invalidate micro-cache
    servicesCache.clear();

    return {
      id: 'service-mobile-application',
      slug: 'mobile-application',
      hero: updatedHero,
      process: updatedProcess,
      types: updatedTypes,
      advantage: updatedAdvantage,
      features: updatedFeatures,
      engineering: updatedEngineering,
      testimonials: updatedTestimonials,
      faqs: updatedFaqs,
      metaTitle: updatedMetaTitle,
      metaDescription: updatedMetaDescription,
      keywords: updatedKeywords,
      canonicalUrl: DEFAULT_MOBILE_APP_CONTENT.canonicalUrl,
      ogImage: DEFAULT_MOBILE_APP_CONTENT.ogImage,
      ogImageAlt: DEFAULT_MOBILE_APP_CONTENT.ogImageAlt,
      isPublished: updatedIsPublished,
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Dynamic metadata for Mobile Application Sub-Service Page
   */
  async generateMobileAppMetadata(): Promise<Metadata> {
    const data = await this.getMobileAppContent();
    const title = data.metaTitle || DEFAULT_MOBILE_APP_CONTENT.metaTitle;
    const description = data.metaDescription || DEFAULT_MOBILE_APP_CONTENT.metaDescription;
    const keywords = data.keywords || DEFAULT_MOBILE_APP_CONTENT.keywords;
    const canonical = data.canonicalUrl || 'https://tryangletech.com/service/mobile-application';
    const ogImgUrl = data.ogImage || '/logo.png';
    const ogImgAlt = data.ogImageAlt || title;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'TryangleTech',
        type: 'website',
        locale: 'en_US',
        images: [
          {
            url: ogImgUrl,
            width: 1200,
            height: 630,
            alt: ogImgAlt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImgUrl],
      },
      other: {
        'geo.region': 'IN-GJ',
        'geo.placename': 'Ahmedabad',
        'geo.position': '23.0225;72.5714',
        'ICBM': '23.0225, 72.5714',
        'rating': 'general',
        'revisit-after': '7 days',
      },
    };
  },

  /**
   * Retrieve dynamic Custom Software Sub-Service Page content with resilient caching
   */
  async getCustomSoftwareContent(): Promise<CustomSoftwareContentDTO> {
    const cacheKey = 'sub_service_content_custom_software';
    const cached = servicesCache.get<CustomSoftwareContentDTO>(cacheKey);
    if (cached) {
      return cached.data;
    }

    this.ensureTable();

    try {
      const rows = await db.$queryRaw<any[]>`
        SELECT * FROM "PageContent"
        WHERE "slug" = 'service-custom-software' OR "slug" = 'custom-software'
        LIMIT 1
      `;

      if (!rows || rows.length === 0) {
        // Seed default record in background
        (async () => {
          try {
            await db.$executeRawUnsafe(
              `
              INSERT INTO "PageContent" (
                "slug", "pageType", "city", "region", "postalCode", "hero", "services", "about", "whyChooseUs", "howWeWork", "testimonials", "faqs", "metaTitle", "metaDescription", "keywords", "isPublished", "createdAt", "updatedAt"
              ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, $12::jsonb, $13, $14, $15::text[], $16, NOW(), NOW())
              ON CONFLICT ("slug") DO NOTHING;
            `,
              'service-custom-software',
              'SERVICE_SUB',
              'Custom Software & Enterprise Solutions',
              'Enterprise Engineering',
              '/service/custom-software',
              JSON.stringify(DEFAULT_CUSTOM_SOFTWARE_CONTENT.hero),
              JSON.stringify(DEFAULT_CUSTOM_SOFTWARE_CONTENT.services),
              JSON.stringify(DEFAULT_CUSTOM_SOFTWARE_CONTENT.stats),
              JSON.stringify(DEFAULT_CUSTOM_SOFTWARE_CONTENT.about),
              JSON.stringify(DEFAULT_CUSTOM_SOFTWARE_CONTENT.process),
              JSON.stringify(DEFAULT_CUSTOM_SOFTWARE_CONTENT.testimonials),
              JSON.stringify(DEFAULT_CUSTOM_SOFTWARE_CONTENT.faqs),
              DEFAULT_CUSTOM_SOFTWARE_CONTENT.metaTitle,
              DEFAULT_CUSTOM_SOFTWARE_CONTENT.metaDescription,
              DEFAULT_CUSTOM_SOFTWARE_CONTENT.keywords,
              true
            );
          } catch (e) {
            console.warn('[ServicesService] Notice during initial custom-software seeding:', e);
          }
        })();

        servicesCache.set(cacheKey, DEFAULT_CUSTOM_SOFTWARE_CONTENT);
        return DEFAULT_CUSTOM_SOFTWARE_CONTENT;
      }

      const row = rows[0];

      const dto: CustomSoftwareContentDTO = {
        id: row.slug || 'service-custom-software',
        slug: 'custom-software',
        hero: parseJsonSafe(row.hero, DEFAULT_CUSTOM_SOFTWARE_CONTENT.hero),
        services: parseJsonSafe(row.services, DEFAULT_CUSTOM_SOFTWARE_CONTENT.services),
        stats: parseJsonSafe(row.about, DEFAULT_CUSTOM_SOFTWARE_CONTENT.stats),
        about: parseJsonSafe(row.whyChooseUs, DEFAULT_CUSTOM_SOFTWARE_CONTENT.about),
        process: parseJsonSafe(row.howWeWork, DEFAULT_CUSTOM_SOFTWARE_CONTENT.process),
        testimonials: parseJsonSafe(row.testimonials, DEFAULT_CUSTOM_SOFTWARE_CONTENT.testimonials),
        faqs: parseJsonSafe(row.faqs, DEFAULT_CUSTOM_SOFTWARE_CONTENT.faqs),
        metaTitle: row.metaTitle || DEFAULT_CUSTOM_SOFTWARE_CONTENT.metaTitle,
        metaDescription: row.metaDescription || DEFAULT_CUSTOM_SOFTWARE_CONTENT.metaDescription,
        keywords: Array.isArray(row.keywords) && row.keywords.length > 0 ? row.keywords : DEFAULT_CUSTOM_SOFTWARE_CONTENT.keywords,
        canonicalUrl: DEFAULT_CUSTOM_SOFTWARE_CONTENT.canonicalUrl,
        ogImage: DEFAULT_CUSTOM_SOFTWARE_CONTENT.ogImage,
        ogImageAlt: DEFAULT_CUSTOM_SOFTWARE_CONTENT.ogImageAlt,
        isPublished: row.isPublished ?? true,
        updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
      };

      servicesCache.set(cacheKey, dto);
      return dto;
    } catch (err) {
      console.warn('[ServicesService] Falling back to default custom software content:', err);
      return DEFAULT_CUSTOM_SOFTWARE_CONTENT;
    }
  },

  /**
   * Update Custom Software Sub-Service Page content in Supabase PostgreSQL
   */
  async updateCustomSoftwareContent(payload: Partial<CustomSoftwareContentDTO>): Promise<CustomSoftwareContentDTO> {
    this.ensureTable();

    const current = await this.getCustomSoftwareContent();

    const updatedHero = payload.hero !== undefined ? payload.hero : current.hero;
    const updatedServices = payload.services !== undefined ? payload.services : current.services;
    const updatedStats = payload.stats !== undefined ? payload.stats : current.stats;
    const updatedAbout = payload.about !== undefined ? payload.about : current.about;
    const updatedProcess = payload.process !== undefined ? payload.process : current.process;
    const updatedTestimonials = payload.testimonials !== undefined ? payload.testimonials : current.testimonials;
    const updatedFaqs = payload.faqs !== undefined ? payload.faqs : current.faqs;
    const updatedMetaTitle = payload.metaTitle !== undefined ? payload.metaTitle : current.metaTitle;
    const updatedMetaDescription = payload.metaDescription !== undefined ? payload.metaDescription : current.metaDescription;
    const updatedKeywords = payload.keywords !== undefined ? payload.keywords : current.keywords;
    const updatedIsPublished = payload.isPublished !== undefined ? payload.isPublished : current.isPublished;

    try {
      await db.$executeRawUnsafe(
        `
        INSERT INTO "PageContent" (
          "slug", "pageType", "city", "region", "postalCode", "hero", "services", "about", "whyChooseUs", "howWeWork", "testimonials", "faqs", "metaTitle", "metaDescription", "keywords", "isPublished", "updatedAt"
        ) VALUES (
          $1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, $12::jsonb, $13, $14, $15::text[], $16, NOW()
        )
        ON CONFLICT ("slug") DO UPDATE SET
          "hero" = EXCLUDED."hero",
          "services" = EXCLUDED."services",
          "about" = EXCLUDED."about",
          "whyChooseUs" = EXCLUDED."whyChooseUs",
          "howWeWork" = EXCLUDED."howWeWork",
          "testimonials" = EXCLUDED."testimonials",
          "faqs" = EXCLUDED."faqs",
          "metaTitle" = EXCLUDED."metaTitle",
          "metaDescription" = EXCLUDED."metaDescription",
          "keywords" = EXCLUDED."keywords",
          "isPublished" = EXCLUDED."isPublished",
          "updatedAt" = NOW();
      `,
        'service-custom-software',
        'SERVICE_SUB',
        'Custom Software & Enterprise Solutions',
        'Enterprise Engineering',
        '/service/custom-software',
        JSON.stringify(updatedHero),
        JSON.stringify(updatedServices),
        JSON.stringify(updatedStats),
        JSON.stringify(updatedAbout),
        JSON.stringify(updatedProcess),
        JSON.stringify(updatedTestimonials),
        JSON.stringify(updatedFaqs),
        updatedMetaTitle,
        updatedMetaDescription,
        updatedKeywords,
        updatedIsPublished
      );
    } catch (e) {
      console.warn('[ServicesService] Error updating Custom Software PageContent in DB:', e);
    }

    // Invalidate micro-cache
    servicesCache.clear();

    return {
      id: 'service-custom-software',
      slug: 'custom-software',
      hero: updatedHero,
      services: updatedServices,
      stats: updatedStats,
      about: updatedAbout,
      process: updatedProcess,
      testimonials: updatedTestimonials,
      faqs: updatedFaqs,
      metaTitle: updatedMetaTitle,
      metaDescription: updatedMetaDescription,
      keywords: updatedKeywords,
      canonicalUrl: DEFAULT_CUSTOM_SOFTWARE_CONTENT.canonicalUrl,
      ogImage: DEFAULT_CUSTOM_SOFTWARE_CONTENT.ogImage,
      ogImageAlt: DEFAULT_CUSTOM_SOFTWARE_CONTENT.ogImageAlt,
      isPublished: updatedIsPublished,
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Dynamic metadata for Custom Software Sub-Service Page
   */
  async generateCustomSoftwareMetadata(): Promise<Metadata> {
    const data = await this.getCustomSoftwareContent();
    const title = data.metaTitle || DEFAULT_CUSTOM_SOFTWARE_CONTENT.metaTitle;
    const description = data.metaDescription || DEFAULT_CUSTOM_SOFTWARE_CONTENT.metaDescription;
    const keywords = data.keywords || DEFAULT_CUSTOM_SOFTWARE_CONTENT.keywords;
    const canonical = data.canonicalUrl || 'https://tryangletech.com/service/custom-software';
    const ogImgUrl = data.ogImage || '/logo.png';
    const ogImgAlt = data.ogImageAlt || title;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'TryangleTech',
        type: 'website',
        locale: 'en_US',
        images: [
          {
            url: ogImgUrl,
            width: 1200,
            height: 630,
            alt: ogImgAlt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImgUrl],
      },
      other: {
        'geo.region': 'IN-GJ',
        'geo.placename': 'Ahmedabad',
        'geo.position': '23.0225;72.5714',
        'ICBM': '23.0225, 72.5714',
        'rating': 'general',
        'revisit-after': '7 days',
      },
    };
  },

  /**
   * Generic getSubServiceContent router
   */
  async getSubServiceContent(slug: string): Promise<any> {
    const cleanSlug = slug.replace(/^service-/, '');
    if (cleanSlug === 'custom-software') {
      return this.getCustomSoftwareContent();
    }
    if (cleanSlug === 'mobile-application') {
      return this.getMobileAppContent();
    }
    if (cleanSlug === 'web-development') {
      return this.getWebDevContent();
    }
    return this.getWebDevContent();
  },

  /**
   * Generic updateSubServiceContent router
   */
  async updateSubServiceContent(slug: string, payload: any): Promise<any> {
    const cleanSlug = slug.replace(/^service-/, '');
    if (cleanSlug === 'custom-software') {
      return this.updateCustomSoftwareContent(payload);
    }
    if (cleanSlug === 'mobile-application') {
      return this.updateMobileAppContent(payload);
    }
    if (cleanSlug === 'web-development') {
      return this.updateWebDevContent(payload);
    }
    return this.updateWebDevContent(payload);
  },

  /**
   * Dynamic metadata for Web Development Sub-Service Page
   */
  async generateWebDevMetadata(): Promise<Metadata> {
    const data = await this.getWebDevContent();
    const title = data.metaTitle || DEFAULT_WEB_DEV_CONTENT.metaTitle;
    const description = data.metaDescription || DEFAULT_WEB_DEV_CONTENT.metaDescription;
    const keywords = data.keywords || DEFAULT_WEB_DEV_CONTENT.keywords;
    const canonical = data.canonicalUrl || 'https://tryangletech.com/service/web-development';
    const ogImgUrl = data.ogImage || '/logo.png';
    const ogImgAlt = data.ogImageAlt || title;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'TryangleTech',
        type: 'website',
        locale: 'en_US',
        images: [
          {
            url: ogImgUrl,
            width: 1200,
            height: 630,
            alt: ogImgAlt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImgUrl],
      },
      other: {
        'geo.region': 'IN-GJ',
        'geo.placename': 'Ahmedabad',
        'geo.position': '23.0225;72.5714',
        'ICBM': '23.0225, 72.5714',
        'rating': 'general',
        'revisit-after': '7 days',
      },
    };
  },
};

