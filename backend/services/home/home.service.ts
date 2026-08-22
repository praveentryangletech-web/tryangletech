import { db } from '@/backend/db/client';
import { HomeContentDTO } from './home.types';
import { DEFAULT_HOME_CONTENT } from './home.defaults';

interface CachedEntry<T> {
  data: T;
  etag: string;
  timestamp: number;
}

class HomeCacheManager {
  private cache = new Map<string, CachedEntry<any>>();
  private readonly defaultTTL = 10 * 60 * 1000; // 10 minutes in-memory cache

  set<T>(key: string, data: T, ttlMs: number = this.defaultTTL): CachedEntry<T> {
    const etag = `W/"home-${Date.now()}-${Math.random().toString(36).slice(2, 7)}"`;
    const entry: CachedEntry<T> = { data, etag, timestamp: Date.now() + ttlMs };
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

export const homeCache = new HomeCacheManager();

let isPageContentTableEnsured = false;

export const homeService = {
  /**
   * Non-blocking background table initialization for unified PageContent
   */
  ensureTable(): void {
    if (isPageContentTableEnsured) return;
    isPageContentTableEnsured = true;

    (async () => {
      try {
        await db.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS "PageContent" (
            "slug" TEXT PRIMARY KEY,
            "pageType" TEXT NOT NULL DEFAULT 'LOCATION_CLONE',
            "city" TEXT,
            "state" TEXT,
            "country" TEXT NOT NULL DEFAULT 'India',
            "countryCode" TEXT NOT NULL DEFAULT 'IN',
            "region" TEXT NOT NULL DEFAULT 'Gujarat',
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

        await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "idx_pagecontent_type_pub" ON "PageContent" ("pageType", "isPublished");`);
        await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "idx_pagecontent_reg_pub" ON "PageContent" ("region", "isPublished");`);

        // Migrate legacy HomeContent if exists
        await db.$executeRawUnsafe(`
          DO $$
          BEGIN
            IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'HomeContent') THEN
              INSERT INTO "PageContent" ("slug", "pageType", "hero", "services", "about", "whyChooseUs", "howWeWork", "techStack", "testimonials", "ctaBanner", "updatedAt")
              SELECT 'main', 'HOME_CORE', "hero", "services", "about", "whyChooseUs", "howWeWork", "techStack", "testimonials", "ctaBanner", "updatedAt"
              FROM "HomeContent" WHERE "id" = 'home_main_v1'
              ON CONFLICT ("slug") DO NOTHING;
            END IF;
          END $$;
        `);
      } catch (err) {
        console.warn('[HomeService] ensureTable notice:', err);
      }
    })().catch(() => {});
  },

  /**
   * Fetch full dynamic Home page content from unified PageContent with fail-fast 2.5s timeout
   */
  async getHomeContent(): Promise<HomeContentDTO & { etag?: string }> {
    const cacheKey = 'home_content_main';
    const cached = homeCache.get<HomeContentDTO>(cacheKey);
    if (cached) {
      return { ...cached.data, etag: cached.etag };
    }

    this.ensureTable();

    try {
      const rows = await Promise.race([
        db.$queryRaw<any[]>`SELECT * FROM "PageContent" WHERE "slug" = 'main' LIMIT 1`,
        new Promise<any[]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout (2500ms)')), 2500)),
      ]);

      if (rows && rows.length > 0) {
        const row = rows[0];
        const content: HomeContentDTO = {
          id: 'home_main_v1',
          hero: row.hero ? (typeof row.hero === 'string' ? JSON.parse(row.hero) : row.hero) : DEFAULT_HOME_CONTENT.hero,
          services: row.services ? (typeof row.services === 'string' ? JSON.parse(row.services) : row.services) : DEFAULT_HOME_CONTENT.services,
          about: row.about ? (typeof row.about === 'string' ? JSON.parse(row.about) : row.about) : DEFAULT_HOME_CONTENT.about,
          whyChooseUs: row.whyChooseUs ? (typeof row.whyChooseUs === 'string' ? JSON.parse(row.whyChooseUs) : row.whyChooseUs) : DEFAULT_HOME_CONTENT.whyChooseUs,
          howWeWork: row.howWeWork ? (typeof row.howWeWork === 'string' ? JSON.parse(row.howWeWork) : row.howWeWork) : DEFAULT_HOME_CONTENT.howWeWork,
          techStack: row.techStack ? (typeof row.techStack === 'string' ? JSON.parse(row.techStack) : row.techStack) : DEFAULT_HOME_CONTENT.techStack,
          testimonials: row.testimonials ? (typeof row.testimonials === 'string' ? JSON.parse(row.testimonials) : row.testimonials) : DEFAULT_HOME_CONTENT.testimonials,
          ctaBanner: row.ctaBanner ? (typeof row.ctaBanner === 'string' ? JSON.parse(row.ctaBanner) : row.ctaBanner) : DEFAULT_HOME_CONTENT.ctaBanner,
          metaTitle: row.metaTitle || 'TryangleTech | Web, App & Custom Software Development in Ahmedabad',
          metaDescription: row.metaDescription || "Ahmedabad's leading IT team building high-performance websites, iOS/Android apps, and custom software. 350+ projects delivered.",
          keywords: Array.isArray(row.keywords) ? row.keywords : ['Web Development Ahmedabad', 'Custom Software Ahmedabad', 'Mobile App Development', 'Next.js Developers'],
          faqs: row.faqs ? (typeof row.faqs === 'string' ? JSON.parse(row.faqs) : row.faqs) : [
            {
              q: 'Why hire TryangleTech for web and custom software development?',
              a: 'We are an Ahmedabad-based IT team with 7+ years of track record, delivering 350+ projects. You get direct senior engineer communication, transparent pricing, and zero technical jargon.',
            },
            {
              q: 'What technologies and frameworks do you specialize in?',
              a: 'We specialize in Next.js, React, Node.js, Python, TypeScript, Flutter, React Native, PostgreSQL, and AWS Cloud architectures.',
            },
          ],
          updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
        };

        const entry = homeCache.set(cacheKey, content);
        return { ...content, etag: entry.etag };
      }
    } catch (err) {
      console.warn('[HomeService] getHomeContent DB fallback:', err);
    }

    const fallbackEntry = homeCache.set(cacheKey, DEFAULT_HOME_CONTENT);
    return { ...DEFAULT_HOME_CONTENT, etag: fallbackEntry.etag };
  },

  /**
   * Update full or partial dynamic Home page content in unified PageContent table
   */
  async updateHomeContent(payload: Partial<HomeContentDTO>): Promise<HomeContentDTO> {
    this.ensureTable();

    // First get current state to merge
    const current = await this.getHomeContent();

    const updatedHero = payload.hero ? payload.hero : current.hero;
    const updatedServices = payload.services ? payload.services : current.services;
    const updatedAbout = payload.about ? payload.about : current.about;
    const updatedWhyChooseUs = payload.whyChooseUs ? payload.whyChooseUs : current.whyChooseUs;
    const updatedHowWeWork = payload.howWeWork ? payload.howWeWork : current.howWeWork;
    const updatedTechStack = payload.techStack ? payload.techStack : current.techStack;
    const updatedTestimonials = payload.testimonials ? payload.testimonials : current.testimonials;
    const updatedCtaBanner = payload.ctaBanner ? payload.ctaBanner : current.ctaBanner;
    const updatedMetaTitle = payload.metaTitle !== undefined ? payload.metaTitle : (current.metaTitle || 'TryangleTech | Web, App & Custom Software Development in Ahmedabad');
    const updatedMetaDescription = payload.metaDescription !== undefined ? payload.metaDescription : (current.metaDescription || "Ahmedabad's leading IT team building high-performance websites, iOS/Android apps, and custom software. 350+ projects delivered.");
    const updatedKeywords = Array.isArray(payload.keywords) ? payload.keywords : (current.keywords || ['Web Development Ahmedabad', 'Custom Software Ahmedabad']);
    const updatedFaqs = Array.isArray(payload.faqs) ? payload.faqs : (current.faqs || []);

    await db.$executeRawUnsafe(`
      INSERT INTO "PageContent" (
        "slug",
        "pageType",
        "country",
        "region",
        "hero",
        "services",
        "about",
        "whyChooseUs",
        "howWeWork",
        "techStack",
        "testimonials",
        "ctaBanner",
        "metaTitle",
        "metaDescription",
        "keywords",
        "faqs",
        "isPublished",
        "updatedAt"
      )
      VALUES (
        'main',
        'HOME_CORE',
        'India',
        'Global',
        $1::jsonb,
        $2::jsonb,
        $3::jsonb,
        $4::jsonb,
        $5::jsonb,
        $6::jsonb,
        $7::jsonb,
        $8::jsonb,
        $9,
        $10,
        $11::text[],
        $12::jsonb,
        true,
        NOW()
      )
      ON CONFLICT ("slug") DO UPDATE SET
        "hero" = EXCLUDED."hero",
        "services" = EXCLUDED."services",
        "about" = EXCLUDED."about",
        "whyChooseUs" = EXCLUDED."whyChooseUs",
        "howWeWork" = EXCLUDED."howWeWork",
        "techStack" = EXCLUDED."techStack",
        "testimonials" = EXCLUDED."testimonials",
        "ctaBanner" = EXCLUDED."ctaBanner",
        "metaTitle" = EXCLUDED."metaTitle",
        "metaDescription" = EXCLUDED."metaDescription",
        "keywords" = EXCLUDED."keywords",
        "faqs" = EXCLUDED."faqs",
        "updatedAt" = NOW()
    `,
      JSON.stringify(updatedHero),
      JSON.stringify(updatedServices),
      JSON.stringify(updatedAbout),
      JSON.stringify(updatedWhyChooseUs),
      JSON.stringify(updatedHowWeWork),
      JSON.stringify(updatedTechStack),
      JSON.stringify(updatedTestimonials),
      JSON.stringify(updatedCtaBanner),
      updatedMetaTitle,
      updatedMetaDescription,
      updatedKeywords,
      JSON.stringify(updatedFaqs)
    );

    const updatedDTO: HomeContentDTO = {
      id: 'home_main_v1',
      hero: updatedHero,
      services: updatedServices,
      about: updatedAbout,
      whyChooseUs: updatedWhyChooseUs,
      howWeWork: updatedHowWeWork,
      techStack: updatedTechStack,
      testimonials: updatedTestimonials,
      ctaBanner: updatedCtaBanner,
      metaTitle: updatedMetaTitle,
      metaDescription: updatedMetaDescription,
      keywords: updatedKeywords,
      faqs: updatedFaqs,
      updatedAt: new Date().toISOString(),
    };

    homeCache.set('home_content_main', updatedDTO);
    return updatedDTO;
  },
};

export default homeService;
