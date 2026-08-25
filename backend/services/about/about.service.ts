import { db } from '@/backend/db/client';
import { Metadata } from 'next';
import { AboutContentDTO } from './about.types';
import { DEFAULT_ABOUT_CONTENT } from './about.defaults';
import { ensureAllDatabaseIndexes } from '@/backend/db/indexing';

interface CachedEntry<T> {
  data: T;
  timestamp: number;
  etag: string;
}

class AboutCacheManager {
  private cache: Map<string, CachedEntry<any>> = new Map();
  private defaultTTL: number = process.env.NODE_ENV === 'production' ? 2000 : 5000; // 2s in live production, 5s in local development

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): CachedEntry<T> {
    const etag = `W/"about-${Date.now()}-${Math.random().toString(36).substring(2, 9)}"`;
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

export const aboutCache = new AboutCacheManager();

let isAboutTableEnsured = false;

export const aboutService = {
  /**
   * Non-blocking background table initialization for unified PageContent
   */
  ensureTable(): void {
    if (isAboutTableEnsured) return;
    isAboutTableEnsured = true;

    (async () => {
      try {
        await db.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS "PageContent" (
            "slug" TEXT PRIMARY KEY,
            "pageType" TEXT NOT NULL DEFAULT 'ABOUT_PAGE',
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
        await ensureAllDatabaseIndexes();
      } catch (e) {
        console.warn('[AboutService] Background PageContent table verification notice:', e);
      }
    })();
  },

  /**
   * Retrieve dynamic About page content with sub-millisecond in-memory cache and resilient DB fallback
   */
  async getAboutContent(): Promise<AboutContentDTO> {
    const cacheKey = 'about_content_main';
    const cached = aboutCache.get<AboutContentDTO>(cacheKey);
    if (cached) {
      return { ...cached.data, etag: cached.etag };
    }

    try {
      const rows: any[] = await Promise.race([
        db.$queryRawUnsafe<any[]>(`
          SELECT * FROM "PageContent" 
          WHERE "slug" = 'about_main' OR "pageType" = 'ABOUT_PAGE'
          LIMIT 1
        `),
        new Promise<any[]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout (8000ms)')), 8000)),
      ]);

      if (rows && rows.length > 0) {
        const row = rows[0];

        // Parse individual section JSON objects with fallback to DEFAULT_ABOUT_CONTENT
        const heroObj = row.hero ? (typeof row.hero === 'string' ? JSON.parse(row.hero) : row.hero) : DEFAULT_ABOUT_CONTENT.hero;
        const specialityObj = row.services ? (typeof row.services === 'string' ? JSON.parse(row.services) : row.services) : DEFAULT_ABOUT_CONTENT.speciality;
        const missionVisionObj = row.about ? (typeof row.about === 'string' ? JSON.parse(row.about) : row.about) : DEFAULT_ABOUT_CONTENT.missionVision;
        const whyChooseUsObj = row.whyChooseUs ? (typeof row.whyChooseUs === 'string' ? JSON.parse(row.whyChooseUs) : row.whyChooseUs) : DEFAULT_ABOUT_CONTENT.whyChooseUs;
        const processObj = row.howWeWork ? (typeof row.howWeWork === 'string' ? JSON.parse(row.howWeWork) : row.howWeWork) : DEFAULT_ABOUT_CONTENT.process;
        const ctaBannerObj = row.ctaBanner ? (typeof row.ctaBanner === 'string' ? JSON.parse(row.ctaBanner) : row.ctaBanner) : DEFAULT_ABOUT_CONTENT.ctaBanner;
        const faqSectionObj = row.faqs ? (typeof row.faqs === 'string' ? JSON.parse(row.faqs) : row.faqs) : DEFAULT_ABOUT_CONTENT.faqSection;

        const content: AboutContentDTO = {
          id: 'about_main_v1',
          hero: heroObj,
          speciality: specialityObj,
          missionVision: missionVisionObj,
          whyChooseUs: whyChooseUsObj,
          process: processObj,
          ctaBanner: ctaBannerObj,
          faqSection: Array.isArray(faqSectionObj) ? { ...DEFAULT_ABOUT_CONTENT.faqSection, faqs: faqSectionObj } : faqSectionObj,
          metaTitle: row.metaTitle || DEFAULT_ABOUT_CONTENT.metaTitle,
          metaDescription: row.metaDescription || DEFAULT_ABOUT_CONTENT.metaDescription,
          keywords: Array.isArray(row.keywords) && row.keywords.length > 0 ? row.keywords : DEFAULT_ABOUT_CONTENT.keywords,
          canonicalUrl: row.canonicalUrl || DEFAULT_ABOUT_CONTENT.canonicalUrl,
          isPublished: row.isPublished !== undefined ? Boolean(row.isPublished) : true,
          updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
        };

        const entry = aboutCache.set(cacheKey, content);
        return { ...content, etag: entry.etag };
      }
    } catch (err) {
      console.warn('[AboutService] getAboutContent DB fallback:', err);
    }

    // Use a short 5-second transient fallback TTL so next request retries live DB
    const fallbackEntry = aboutCache.set(cacheKey, DEFAULT_ABOUT_CONTENT, 5000);
    return { ...DEFAULT_ABOUT_CONTENT, etag: fallbackEntry.etag };
  },

  /**
   * Update full or partial dynamic About page content in unified PageContent table
   */
  async updateAboutContent(payload: Partial<AboutContentDTO>): Promise<AboutContentDTO> {
    this.ensureTable();

    const current = await this.getAboutContent();

    const updatedHero = payload.hero ? payload.hero : current.hero;
    const updatedSpeciality = payload.speciality ? payload.speciality : current.speciality;
    const updatedMissionVision = payload.missionVision ? payload.missionVision : current.missionVision;
    const updatedWhyChooseUs = payload.whyChooseUs ? payload.whyChooseUs : current.whyChooseUs;
    const updatedProcess = payload.process ? payload.process : current.process;
    const updatedCtaBanner = payload.ctaBanner ? payload.ctaBanner : current.ctaBanner;
    const updatedFaqSection = payload.faqSection ? payload.faqSection : current.faqSection;
    const updatedMetaTitle = payload.metaTitle !== undefined ? payload.metaTitle : current.metaTitle;
    const updatedMetaDescription = payload.metaDescription !== undefined ? payload.metaDescription : current.metaDescription;
    const updatedKeywords = Array.isArray(payload.keywords) ? payload.keywords : current.keywords;
    const updatedIsPublished = payload.isPublished !== undefined ? Boolean(payload.isPublished) : (current.isPublished ?? true);

    await db.$executeRawUnsafe(
      `
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
        "ctaBanner",
        "faqs",
        "metaTitle",
        "metaDescription",
        "keywords",
        "isPublished",
        "updatedAt"
      )
      VALUES (
        'about_main',
        'ABOUT_PAGE',
        'India',
        'Global',
        $1::jsonb,
        $2::jsonb,
        $3::jsonb,
        $4::jsonb,
        $5::jsonb,
        $6::jsonb,
        $7::jsonb,
        $8,
        $9,
        $10::text[],
        $11,
        NOW()
      )
      ON CONFLICT ("slug") DO UPDATE SET
        "hero" = EXCLUDED."hero",
        "services" = EXCLUDED."services",
        "about" = EXCLUDED."about",
        "whyChooseUs" = EXCLUDED."whyChooseUs",
        "howWeWork" = EXCLUDED."howWeWork",
        "ctaBanner" = EXCLUDED."ctaBanner",
        "faqs" = EXCLUDED."faqs",
        "metaTitle" = EXCLUDED."metaTitle",
        "metaDescription" = EXCLUDED."metaDescription",
        "keywords" = EXCLUDED."keywords",
        "isPublished" = EXCLUDED."isPublished",
        "updatedAt" = NOW()
    `,
      JSON.stringify(updatedHero),
      JSON.stringify(updatedSpeciality),
      JSON.stringify(updatedMissionVision),
      JSON.stringify(updatedWhyChooseUs),
      JSON.stringify(updatedProcess),
      JSON.stringify(updatedCtaBanner),
      JSON.stringify(updatedFaqSection),
      updatedMetaTitle,
      updatedMetaDescription,
      updatedKeywords,
      updatedIsPublished
    );

    aboutCache.clear();

    const savedContent: AboutContentDTO = {
      id: 'about_main_v1',
      hero: updatedHero,
      speciality: updatedSpeciality,
      missionVision: updatedMissionVision,
      whyChooseUs: updatedWhyChooseUs,
      process: updatedProcess,
      ctaBanner: updatedCtaBanner,
      faqSection: updatedFaqSection,
      metaTitle: updatedMetaTitle,
      metaDescription: updatedMetaDescription,
      keywords: updatedKeywords,
      canonicalUrl: DEFAULT_ABOUT_CONTENT.canonicalUrl,
      isPublished: updatedIsPublished,
      updatedAt: new Date().toISOString(),
    };

    const entry = aboutCache.set('about_content_main', savedContent);
    return { ...savedContent, etag: entry.etag };
  },

  /**
   * Generate Next.js Dynamic Metadata for About page
   */
  generateAboutMetadata(content: AboutContentDTO): Metadata {
    const pageUrl = content.canonicalUrl || 'https://tryangletech.com/about';

    return {
      title: content.metaTitle,
      description: content.metaDescription,
      keywords: content.keywords,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: content.metaTitle,
        description: content.metaDescription,
        url: pageUrl,
        siteName: 'TryangleTech',
        type: 'website',
        locale: 'en_US',
        images: [
          {
            url: content.hero.bannerImage || '/about-assets/6915cd620829878f7ea58178_taskopiya-about-banner.webp',
            width: 1200,
            height: 630,
            alt: content.hero.bannerImageAlt || 'About TryangleTech - IT & Software Engineering',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: content.metaTitle,
        description: content.metaDescription,
        images: [content.hero.bannerImage || '/about-assets/6915cd620829878f7ea58178_taskopiya-about-banner.webp'],
      },
    };
  },

  /**
   * Generate JSON-LD Schema (AboutPage + Organization + FAQPage) for SEO and AEO Search Bots
   */
  generateAboutSchema(content: AboutContentDTO) {
    const pageUrl = content.canonicalUrl || 'https://tryangletech.com/about';
    const faqs = content.faqSection?.faqs || [];

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: content.metaTitle,
          description: content.metaDescription,
          mainEntity: {
            '@type': 'Organization',
            name: 'TryangleTech',
            url: 'https://tryangletech.com',
            foundingDate: '2018',
            numberOfEmployees: '15-50',
            knowsAbout: [
              'Full Stack Web Development',
              'Next.js & React Frameworks',
              'Mobile App Engineering',
              'Enterprise Software',
              'UI/UX Design Systems',
              'Search Engine Optimization',
            ],
          },
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        },
      ],
    };
  },
};

export default aboutService;
