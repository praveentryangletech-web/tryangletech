import { Metadata } from 'next';
import { db } from '@/backend/db/client';
import { LocationItem, LocationSummaryItem, LocationQueryParams, PaginatedLocationResult } from './geo.types';
import { getBaseUrl } from '@/backend/utils/siteUrl';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';
import { ensureAllDatabaseIndexes } from '@/backend/db/indexing';

interface CachedGeoEntry<T> {
  data: T;
  timestamp: number;
}

class GeoCacheManager {
  private cache = new Map<string, CachedGeoEntry<any>>();
  private readonly defaultTTL = process.env.NODE_ENV === 'production' ? 2000 : 5000; // 2s in live production, 5s in local development

  set<T>(key: string, data: T, ttlMs: number = this.defaultTTL): void {
    this.cache.set(key, { data, timestamp: Date.now() + ttlMs });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.timestamp) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const geoCache = new GeoCacheManager();

let isPageContentTableEnsured = false;

export const geoService = {
  /**
   * Non-blocking background table initialization and legacy migration for PageContent
   */
  ensureTable(): void {
    // Schema and indexes are pre-configured in PostgreSQL
  },

  /**
   * Retrieve all supported locations from unified PageContent (DB is the source of truth)
   */
  async getAllLocations(includeDrafts = false): Promise<LocationItem[]> {
    const cacheKey = `geo_all_locations_${includeDrafts ? 'all' : 'published'}`;
    const cached = geoCache.get<LocationItem[]>(cacheKey);
    if (cached) return cached;

    try {
      const rows = await Promise.race([
        includeDrafts
          ? db.$queryRaw<any[]>`SELECT * FROM "PageContent" WHERE "pageType" = 'LOCATION_CLONE' ORDER BY "city" ASC`
          : db.$queryRaw<any[]>`SELECT * FROM "PageContent" WHERE "pageType" = 'LOCATION_CLONE' AND "isPublished" = true ORDER BY "city" ASC`,
        new Promise<any[]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), process.env.NODE_ENV === 'production' ? 5000 : 8000)),
      ]);

      if (rows && Array.isArray(rows)) {
        const dbLocations: LocationItem[] = rows.map((r) => {
          const heroObj = r.hero ? (typeof r.hero === 'string' ? JSON.parse(r.hero) : r.hero) : null;
          const aboutObj = r.about ? (typeof r.about === 'string' ? JSON.parse(r.about) : r.about) : null;
          const servicesObj = r.services ? (typeof r.services === 'string' ? JSON.parse(r.services) : r.services) : null;
          const whyChooseUsObj = r.whyChooseUs ? (typeof r.whyChooseUs === 'string' ? JSON.parse(r.whyChooseUs) : r.whyChooseUs) : null;
          const howWeWorkObj = r.howWeWork ? (typeof r.howWeWork === 'string' ? JSON.parse(r.howWeWork) : r.howWeWork) : null;
          const testimonialsObj = r.testimonials ? (typeof r.testimonials === 'string' ? JSON.parse(r.testimonials) : r.testimonials) : null;
          const ctaBannerObj = r.ctaBanner ? (typeof r.ctaBanner === 'string' ? JSON.parse(r.ctaBanner) : r.ctaBanner) : null;

          return {
            slug: r.slug,
            city: r.city || r.slug,
            state: r.state || undefined,
            country: r.country || 'India',
            countryCode: r.countryCode || 'IN',
            region: (r.region as any) || 'Gujarat',
            regionCode: r.regionCode || 'IN-GJ',
            postalCode: r.postalCode || undefined,
            coordinates: {
              latitude: Number(r.latitude) || 23.0225,
              longitude: Number(r.longitude) || 72.5714,
            },
            popular: Boolean(r.popular),
            isPublished: r.isPublished !== undefined ? Boolean(r.isPublished) : true,
            headlineTitle: heroObj?.headline ? heroObj.headline.replace(new RegExp(r.city || '', 'gi'), '').trim() : 'We build websites, apps and custom software for businesses in',
            headlineHighlight: r.city || r.slug,
            subheadline: heroObj?.subheadline || 'From high-converting web applications to custom ERP software, we build scalable digital systems tailored for modern businesses.',
            aboutText: aboutObj?.description || `Serving clients in ${r.city || r.slug} with cutting-edge engineering, enterprise-grade architectures, and bespoke software solutions designed to accelerate growth.`,
            metaTitle: r.metaTitle || `Web Development & Custom Software in ${r.city || r.slug} | TryangleTech`,
            metaDescription: r.metaDescription || `Top web development and software company serving ${r.city || r.slug}. 350+ projects delivered.`,
            keywords: Array.isArray(r.keywords) ? r.keywords : [],
            faqs: r.faqs ? (typeof r.faqs === 'string' ? JSON.parse(r.faqs) : r.faqs) : [],
            hero: heroObj || undefined,
            services: Array.isArray(servicesObj) ? servicesObj : undefined,
            about: aboutObj || undefined,
            whyChooseUs: whyChooseUsObj || undefined,
            howWeWork: howWeWorkObj || undefined,
            testimonials: Array.isArray(testimonialsObj) ? testimonialsObj : undefined,
            ctaBanner: ctaBannerObj || undefined,
            createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : undefined,
            updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : undefined,
          };
        });

        geoCache.set(cacheKey, dbLocations);
        return dbLocations;
      }
    } catch (err) {
      console.warn('[GeoService] getAllLocations DB query error:', err);
    }

    geoCache.set(cacheKey, []);
    return [];
  },

  /**
   * Fetch all distinct active regions across PageContent
   */
  async getAllRegions(): Promise<string[]> {
    const cacheKey = 'geo_all_regions';
    const cached = geoCache.get<string[]>(cacheKey);
    if (cached) return cached;

    this.ensureTable();

    try {
      const rows = await db.$queryRaw<Array<{ region: string }>>`
        SELECT DISTINCT "region" FROM "PageContent" 
        WHERE "region" IS NOT NULL AND "region" != '' AND "pageType" = 'LOCATION_CLONE'
        ORDER BY "region" ASC
      `;

      const set = new Set<string>(['Gujarat', 'India Metros', 'Middle East', 'USA & Canada', 'Europe & UK', 'Global Hubs']);
      if (rows && Array.isArray(rows) && rows.length > 0) {
        rows.forEach((r) => {
          if (r.region && r.region.trim()) {
            set.add(r.region.trim());
          }
        });
      }

      const list = Array.from(set);
      geoCache.set(cacheKey, list, 5 * 60 * 1000);
      return list;
    } catch (err) {
      console.warn('[GeoService] getAllRegions DB fallback:', err);
      return ['Gujarat', 'India Metros', 'Middle East', 'USA & Canada', 'Europe & UK', 'Global Hubs'];
    }
  },

  /**
   * Retrieve lightweight location summaries for Superadmin tables & listings (excludes heavy JSON sections)
   */
  async getLocationSummaries(includeDrafts = true): Promise<LocationSummaryItem[]> {
    const cacheKey = `geo_summaries_${includeDrafts ? 'all' : 'published'}`;
    const cached = geoCache.get<LocationSummaryItem[]>(cacheKey);
    if (cached) return cached;

    try {
      const rows = await Promise.race([
        includeDrafts
          ? db.$queryRaw<any[]>`
              SELECT "slug", "city", "state", "country", "countryCode", "region", "regionCode", "postalCode", "latitude", "longitude", "popular", "isPublished", "metaTitle", "createdAt", "updatedAt"
              FROM "PageContent"
              WHERE "pageType" = 'LOCATION_CLONE'
              ORDER BY "city" ASC
            `
          : db.$queryRaw<any[]>`
              SELECT "slug", "city", "state", "country", "countryCode", "region", "regionCode", "postalCode", "latitude", "longitude", "popular", "isPublished", "metaTitle", "createdAt", "updatedAt"
              FROM "PageContent"
              WHERE "pageType" = 'LOCATION_CLONE' AND "isPublished" = true
              ORDER BY "city" ASC
            `,
        new Promise<any[]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), process.env.NODE_ENV === 'production' ? 5000 : 8000)),
      ]);

      if (rows && Array.isArray(rows)) {
        const summaries: LocationSummaryItem[] = rows.map((r) => ({
          slug: r.slug,
          city: r.city || r.slug,
          state: r.state || undefined,
          country: r.country || 'India',
          countryCode: r.countryCode || 'IN',
          region: (r.region as any) || 'Gujarat',
          regionCode: r.regionCode || 'IN-GJ',
          postalCode: r.postalCode || undefined,
          coordinates: {
            latitude: Number(r.latitude) || 23.0225,
            longitude: Number(r.longitude) || 72.5714,
          },
          popular: Boolean(r.popular),
          isPublished: r.isPublished !== undefined ? Boolean(r.isPublished) : true,
          metaTitle: r.metaTitle || undefined,
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : undefined,
          updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : undefined,
        }));

        geoCache.set(cacheKey, summaries);
        return summaries;
      }
    } catch (err) {
      console.warn('[GeoService] getLocationSummaries DB notice:', err);
    }

    geoCache.set(cacheKey, []);
    return [];
  },

  /**
   * Backend-Side Paginated Location Query with search, region, and publication status filtering
   */
  async getPaginatedLocations(params: LocationQueryParams = {}): Promise<PaginatedLocationResult> {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params.limit) || 8));
    const offset = (page - 1) * limit;
    const region = params.region && params.region !== 'All' ? params.region.trim() : undefined;
    const search = params.search ? params.search.trim().toLowerCase() : undefined;
    const status = params.status || (params.publishedOnly ? 'published' : 'all');
    const includeDrafts = params.includeDrafts !== undefined ? params.includeDrafts : true;

    // Retrieve lightweight summary dataset from PostgreSQL
    const allSummaries = await this.getLocationSummaries(includeDrafts);

    let filtered = allSummaries;
    if (status === 'published') {
      filtered = filtered.filter((l) => l.isPublished !== false);
    } else if (status === 'draft') {
      filtered = filtered.filter((l) => l.isPublished === false);
    }

    if (region) {
      filtered = filtered.filter((l) => l.region === region);
    }
    if (search) {
      filtered = filtered.filter((l) =>
        l.city.toLowerCase().includes(search) ||
        (l.state && l.state.toLowerCase().includes(search)) ||
        l.country.toLowerCase().includes(search) ||
        l.slug.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const paginatedItems = filtered.slice(offset, offset + limit);

    return {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  },

  /**
   * Retrieve popular/featured locations
   */
  async getPopularLocations(): Promise<LocationItem[]> {
    const all = await this.getAllLocations();
    return all.filter((loc) => loc.popular && loc.isPublished !== false);
  },

  /**
   * Retrieve location by slug (case-insensitive)
   */
  async getLocationBySlug(slug: string, includeDraft = false): Promise<LocationItem | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();

    const cacheKey = `geo_loc_${cleanSlug}_${includeDraft ? 'draft' : 'pub'}`;
    const cached = geoCache.get<LocationItem>(cacheKey);
    if (cached) return cached;

    try {
      const rows = await Promise.race([
        includeDraft
          ? db.$queryRaw<any[]>`SELECT * FROM "PageContent" WHERE LOWER("slug") = ${cleanSlug} LIMIT 1`
          : db.$queryRaw<any[]>`SELECT * FROM "PageContent" WHERE LOWER("slug") = ${cleanSlug} AND "isPublished" = true LIMIT 1`,
        new Promise<any[]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), process.env.NODE_ENV === 'production' ? 5000 : 8000)),
      ]);

      if (rows && rows.length > 0) {
        const r = rows[0];
        const heroObj = r.hero ? (typeof r.hero === 'string' ? JSON.parse(r.hero) : r.hero) : null;
        const aboutObj = r.about ? (typeof r.about === 'string' ? JSON.parse(r.about) : r.about) : null;
        const servicesObj = r.services ? (typeof r.services === 'string' ? JSON.parse(r.services) : r.services) : null;
        const whyChooseUsObj = r.whyChooseUs ? (typeof r.whyChooseUs === 'string' ? JSON.parse(r.whyChooseUs) : r.whyChooseUs) : null;
        const howWeWorkObj = r.howWeWork ? (typeof r.howWeWork === 'string' ? JSON.parse(r.howWeWork) : r.howWeWork) : null;
        const testimonialsObj = r.testimonials ? (typeof r.testimonials === 'string' ? JSON.parse(r.testimonials) : r.testimonials) : null;
        const ctaBannerObj = r.ctaBanner ? (typeof r.ctaBanner === 'string' ? JSON.parse(r.ctaBanner) : r.ctaBanner) : null;

        const loc: LocationItem = {
          slug: r.slug,
          city: r.city || r.slug,
          state: r.state || undefined,
          country: r.country || 'India',
          countryCode: r.countryCode || 'IN',
          region: (r.region as any) || 'Gujarat',
          regionCode: r.regionCode || 'IN-GJ',
          postalCode: r.postalCode || undefined,
          coordinates: {
            latitude: Number(r.latitude) || 23.0225,
            longitude: Number(r.longitude) || 72.5714,
          },
          popular: Boolean(r.popular),
          isPublished: r.isPublished !== undefined ? Boolean(r.isPublished) : true,
          headlineTitle: heroObj?.headline ? heroObj.headline.replace(new RegExp(r.city || '', 'gi'), '').trim() : 'We build websites, apps and custom software for businesses in',
          headlineHighlight: r.city || r.slug,
          subheadline: heroObj?.subheadline || 'From high-converting web applications to custom ERP software, we build scalable digital systems tailored for modern businesses.',
          aboutText: aboutObj?.description || `Serving clients in ${r.city || r.slug} with cutting-edge engineering, enterprise-grade architectures, and bespoke software solutions designed to accelerate growth.`,
          metaTitle: r.metaTitle || `Web Development & Custom Software in ${r.city || r.slug} | TryangleTech`,
          metaDescription: r.metaDescription || `Top web development and software company serving ${r.city || r.slug}. 350+ projects delivered.`,
          keywords: Array.isArray(r.keywords) ? r.keywords : [],
          faqs: r.faqs ? (typeof r.faqs === 'string' ? JSON.parse(r.faqs) : r.faqs) : [],
          hero: heroObj || undefined,
          services: Array.isArray(servicesObj) ? servicesObj : undefined,
          about: aboutObj || undefined,
          whyChooseUs: whyChooseUsObj || undefined,
          howWeWork: howWeWorkObj || undefined,
          testimonials: Array.isArray(testimonialsObj) ? testimonialsObj : undefined,
          ctaBanner: ctaBannerObj || undefined,
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : undefined,
          updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : undefined,
        };

        geoCache.set(cacheKey, loc);
        return loc;
      }
    } catch (err) {
      console.warn(`[GeoService] getLocationBySlug('${cleanSlug}') DB notice:`, err);
    }

    return null;
  },

  /**
   * Save or Update a Location Page in unified PageContent
   */
  async saveLocation(location: Partial<LocationItem> & { slug: string; city: string }): Promise<LocationItem> {
    this.ensureTable();

    const cleanSlug = location.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    const existing = await this.getLocationBySlug(cleanSlug, true);

    const city = location.city.trim();
    const state = location.state?.trim() || existing?.state || null;
    const country = location.country?.trim() || existing?.country || 'India';
    const countryCode = location.countryCode?.trim().toUpperCase() || existing?.countryCode || 'IN';
    const region = location.region || existing?.region || 'Gujarat';
    const regionCode = location.regionCode?.trim() || existing?.regionCode || 'IN-GJ';
    const postalCode = location.postalCode?.trim() || existing?.postalCode || null;
    const latitude = location.coordinates?.latitude ?? existing?.coordinates?.latitude ?? 23.0225;
    const longitude = location.coordinates?.longitude ?? existing?.coordinates?.longitude ?? 72.5714;
    const popular = location.popular !== undefined ? location.popular : (existing?.popular || false);
    const isPublished = location.isPublished !== undefined ? Boolean(location.isPublished) : (existing?.isPublished !== undefined ? Boolean(existing.isPublished) : true);

    const headlineTitle = location.headlineTitle?.trim() || existing?.headlineTitle || 'We build websites, apps and custom software for businesses in';
    const headlineHighlight = location.headlineHighlight?.trim() || existing?.headlineHighlight || city;
    const subheadline = location.subheadline?.trim() || existing?.subheadline || 'From high-converting web applications to custom ERP software, we build scalable digital systems tailored for modern businesses.';
    const aboutText = location.aboutText?.trim() || existing?.aboutText || `Serving clients in ${city} with cutting-edge engineering, enterprise-grade architectures, and bespoke software solutions designed to accelerate growth.`;

    const metaTitle = location.metaTitle?.trim() || existing?.metaTitle || `Web Development & Custom Software Company in ${city} | TryangleTech`;
    const metaDescription = location.metaDescription?.trim() || existing?.metaDescription || `Top-rated IT & Web Development company in ${city}. We build custom websites, iOS/Android mobile apps, and custom software systems with 350+ delivered projects.`;
    const keywords = Array.isArray(location.keywords) ? location.keywords : (existing?.keywords || [city, 'web development', 'custom software', 'mobile app development']);
    const faqs = Array.isArray(location.faqs) ? location.faqs : (existing?.faqs || []);

    const heroJson = {
      ...(existing?.hero || {}),
      ...(location.hero || {}),
      headline: location.hero?.headline || `${headlineTitle} ${headlineHighlight}`,
      subheadline: location.hero?.subheadline || subheadline,
      subBadgeText: location.hero?.subBadgeText || `SERVING ${city.toUpperCase()}`,
      ctaText: location.hero?.ctaText || 'Talk to us today',
      ctaLink: location.hero?.ctaLink || '/contact',
      dashboardImage: location.hero?.dashboardImage !== undefined ? location.hero.dashboardImage : (existing?.hero?.dashboardImage || ''),
      avatars: location.hero?.avatars || existing?.hero?.avatars || ['#38bdf8', '#3b82f6', '#a855f7'],
    };

    const aboutJson = {
      ...(existing?.about || {}),
      ...(location.about || {}),
      heading: location.about?.heading || `Empowering Businesses Across ${city}`,
      headingHighlight: location.about?.headingHighlight || `${city} & Global Markets`,
      description: location.about?.description || aboutText,
      image1: location.about?.image1 !== undefined ? location.about.image1 : (existing?.about?.image1 || ''),
      image2: location.about?.image2 !== undefined ? location.about.image2 : (existing?.about?.image2 || ''),
    };

    const servicesJson = location.services || existing?.services || null;
    const whyChooseUsJson = location.whyChooseUs || existing?.whyChooseUs || null;
    const howWeWorkJson = location.howWeWork || existing?.howWeWork || null;
    const testimonialsJson = location.testimonials || existing?.testimonials || null;
    const ctaBannerJson = location.ctaBanner || existing?.ctaBanner || null;

    await db.$executeRawUnsafe(`
      INSERT INTO "PageContent" (
        "slug",
        "pageType",
        "city",
        "state",
        "country",
        "countryCode",
        "region",
        "regionCode",
        "postalCode",
        "latitude",
        "longitude",
        "popular",
        "hero",
        "about",
        "services",
        "whyChooseUs",
        "howWeWork",
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
        $1,
        'LOCATION_CLONE',
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12::jsonb,
        $13::jsonb,
        $14::jsonb,
        $15::jsonb,
        $16::jsonb,
        $17::jsonb,
        $18::jsonb,
        $19,
        $20,
        $21::text[],
        $22::jsonb,
        $23,
        NOW()
      )
      ON CONFLICT ("slug") DO UPDATE SET
        "city" = EXCLUDED."city",
        "state" = EXCLUDED."state",
        "country" = EXCLUDED."country",
        "countryCode" = EXCLUDED."countryCode",
        "region" = EXCLUDED."region",
        "regionCode" = EXCLUDED."regionCode",
        "postalCode" = EXCLUDED."postalCode",
        "latitude" = EXCLUDED."latitude",
        "longitude" = EXCLUDED."longitude",
        "popular" = EXCLUDED."popular",
        "hero" = EXCLUDED."hero",
        "about" = EXCLUDED."about",
        "services" = EXCLUDED."services",
        "whyChooseUs" = EXCLUDED."whyChooseUs",
        "howWeWork" = EXCLUDED."howWeWork",
        "testimonials" = EXCLUDED."testimonials",
        "ctaBanner" = EXCLUDED."ctaBanner",
        "metaTitle" = EXCLUDED."metaTitle",
        "metaDescription" = EXCLUDED."metaDescription",
        "keywords" = EXCLUDED."keywords",
        "faqs" = EXCLUDED."faqs",
        "isPublished" = EXCLUDED."isPublished",
        "updatedAt" = NOW()
    `,
      cleanSlug,
      city,
      state,
      country,
      countryCode,
      region,
      regionCode,
      postalCode,
      latitude,
      longitude,
      popular,
      JSON.stringify(heroJson),
      JSON.stringify(aboutJson),
      servicesJson ? JSON.stringify(servicesJson) : null,
      whyChooseUsJson ? JSON.stringify(whyChooseUsJson) : null,
      howWeWorkJson ? JSON.stringify(howWeWorkJson) : null,
      testimonialsJson ? JSON.stringify(testimonialsJson) : null,
      ctaBannerJson ? JSON.stringify(ctaBannerJson) : null,
      metaTitle,
      metaDescription,
      keywords,
      JSON.stringify(faqs),
      isPublished
    );

    geoCache.clear();

    return {
      slug: cleanSlug,
      city,
      state: state || undefined,
      country,
      countryCode,
      region: region as any,
      regionCode,
      postalCode: postalCode || undefined,
      coordinates: { latitude, longitude },
      popular,
      isPublished,
      headlineTitle,
      headlineHighlight,
      subheadline,
      aboutText,
      metaTitle,
      metaDescription,
      keywords,
      faqs,
      hero: heroJson,
      services: servicesJson || undefined,
      about: aboutJson,
      whyChooseUs: whyChooseUsJson || undefined,
      howWeWork: howWeWorkJson || undefined,
      testimonials: testimonialsJson || undefined,
      ctaBanner: ctaBannerJson || undefined,
    };
  },

  /**
   * Clone / Duplicate an existing PageContent row into a new target city/slug
   */
  async duplicateLocation(
    sourceSlug: string,
    target: {
      city: string;
      slug: string;
      region?: any;
      country?: string;
      state?: string;
      postalCode?: string;
      coordinates?: { latitude: number; longitude: number };
      countryCode?: string;
      regionCode?: string;
    }
  ): Promise<LocationItem> {
    const cleanTargetSlug = target.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    const targetCity = target.city.trim();

    // 1. Fetch Source
    let sourceLoc = await this.getLocationBySlug(sourceSlug, true);
    if (!sourceLoc) {
      const all = await this.getAllLocations(true);
      sourceLoc = all[0] || null;
    }

    const region = target.region || sourceLoc?.region || 'Gujarat';
    const country = target.country || sourceLoc?.country || 'India';
    const countryCode = target.countryCode || (country.toLowerCase() === 'india' ? 'IN' : sourceLoc?.countryCode || 'IN');
    const state = target.state || targetCity;
    const regionCode = target.regionCode || (countryCode === 'IN' ? (state ? `IN-${state.slice(0, 2).toUpperCase()}` : `IN-${targetCity.slice(0, 2).toUpperCase()}`) : sourceLoc?.regionCode || 'IN-GJ');
    const coordinates = target.coordinates || sourceLoc?.coordinates || { latitude: 23.0225, longitude: 72.5714 };
    const postalCode = target.postalCode || sourceLoc?.postalCode || undefined;

    const baseHero = sourceLoc?.hero || DEFAULT_HOME_CONTENT.hero;
    const baseServices = sourceLoc?.services || DEFAULT_HOME_CONTENT.services;
    const baseAbout = sourceLoc?.about || DEFAULT_HOME_CONTENT.about;
    const baseWhyChooseUs = sourceLoc?.whyChooseUs || DEFAULT_HOME_CONTENT.whyChooseUs;
    const baseHowWeWork = sourceLoc?.howWeWork || DEFAULT_HOME_CONTENT.howWeWork;
    const baseTestimonials = sourceLoc?.testimonials || DEFAULT_HOME_CONTENT.testimonials;
    const baseCtaBanner = sourceLoc?.ctaBanner || DEFAULT_HOME_CONTENT.ctaBanner;

    // 2. Generate customized parameters for new location
    const newLocationPayload: Partial<LocationItem> & { slug: string; city: string } = {
      slug: cleanTargetSlug,
      city: targetCity,
      state: state,
      country: country,
      countryCode: countryCode,
      region: region,
      regionCode: regionCode,
      postalCode: postalCode,
      coordinates: coordinates,
      popular: false,
      headlineTitle: 'We build websites, apps and custom software for businesses in',
      headlineHighlight: targetCity,
      subheadline: `From high-converting web applications to custom ERP software, we build scalable digital systems for businesses in ${targetCity}.`,
      aboutText: `Serving clients in ${targetCity} with cutting-edge engineering, enterprise-grade architectures, and bespoke software solutions designed to accelerate growth.`,
      metaTitle: `Web Development & Custom Software Company in ${targetCity} | TryangleTech`,
      metaDescription: `Top-rated IT & Web Development company in ${targetCity}. We build custom websites, iOS/Android mobile apps, and custom software systems with 350+ delivered projects.`,
      keywords: [
        `${targetCity.toLowerCase()} web development`,
        `software company in ${targetCity.toLowerCase()}`,
        `app developers ${targetCity.toLowerCase()}`,
        `${targetCity.toLowerCase()} IT services`,
        'TryangleTech',
      ],
      faqs: [
        {
          q: `Do you provide on-site consultations for businesses in ${targetCity}?`,
          a: `Yes! We work with enterprise clients and startups across ${targetCity} providing strategic software consulting, high-touch communication, and milestone-driven delivery.`,
        },
        {
          q: `What software services does TryangleTech offer in ${targetCity}?`,
          a: `We build custom web applications, native & cross-platform mobile apps (Flutter, React Native, Swift), enterprise software, CRM/ERP integrations, and cloud architectures.`,
        },
      ],
      hero: {
        ...baseHero,
        headline: `We build websites, apps and custom software for businesses in ${targetCity}`,
        subBadgeText: `SERVING ${targetCity.toUpperCase()}`,
        subheadline: `From high-converting web applications to custom ERP software, we build scalable digital systems for businesses in ${targetCity}.`,
      },
      services: baseServices,
      about: {
        ...baseAbout,
        heading: `Empowering Businesses Across ${targetCity}`,
        headingHighlight: `${targetCity} & Global Markets`,
        description: `Serving clients in ${targetCity} with cutting-edge engineering, enterprise-grade architectures, and bespoke software solutions designed to accelerate growth.`,
      },
      whyChooseUs: baseWhyChooseUs,
      howWeWork: baseHowWeWork,
      testimonials: baseTestimonials,
      ctaBanner: baseCtaBanner,
    };

    return await this.saveLocation(newLocationPayload);
  },

  /**
   * Quick toggle between Published and Draft
   */
  async toggleLocationStatus(slug: string, isPublished: boolean): Promise<LocationItem | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    this.ensureTable();

    await db.$executeRawUnsafe(
      `UPDATE "PageContent" SET "isPublished" = $1, "updatedAt" = NOW() WHERE LOWER("slug") = $2`,
      isPublished,
      cleanSlug
    );
    geoCache.clear();
    return this.getLocationBySlug(cleanSlug, true);
  },

  /**
   * Delete a location page from PageContent
   */
  async deleteLocation(slug: string): Promise<boolean> {
    if (!slug) return false;
    const cleanSlug = slug.toLowerCase().trim().replace(/['"\\;]/g, '');

    try {
      // 1. Direct raw SQL deletion on PageContent
      try {
        await db.$executeRawUnsafe(`DELETE FROM "PageContent" WHERE LOWER("slug") = '${cleanSlug}' OR "slug" = '${cleanSlug}'`);
      } catch (sqlErr) {
        console.warn(`[GeoService] SQL raw delete error:`, sqlErr);
      }

      // 2. Clean up any related PageFAQ entries
      try {
        await db.$executeRawUnsafe(`DELETE FROM "PageFAQ" WHERE LOWER("pageId") = '${cleanSlug}'`);
      } catch {
        // ignore
      }

      // 3. Clear cache
      geoCache.clear();
      return true;
    } catch (err) {
      console.error(`[GeoService] deleteLocation error for '${cleanSlug}':`, err);
      geoCache.clear();
      return true;
    }
  },

  /**
   * Generate Next.js Dynamic Metadata for location page
   */
  generateGeoMetadata(location: LocationItem): Metadata {
    const baseUrl = getBaseUrl();
    const locationName = `${location.city}, ${location.state ? location.state + ', ' : ''}${location.country}`;
    const pageUrl = `${baseUrl}/${location.slug}`;
    const lat = location.coordinates?.latitude || 23.0225;
    const lng = location.coordinates?.longitude || 72.5714;

    return {
      title: {
        absolute: location.metaTitle,
      },
      description: location.metaDescription,
      keywords: location.keywords,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: location.metaTitle,
        description: location.metaDescription,
        url: pageUrl,
        siteName: 'TryangleTech',
        type: 'website',
        locale: 'en_US',
        images: [
          {
            url: '/portfolio/vh-accounting.webp',
            width: 1200,
            height: 630,
            alt: `TryangleTech Software Solutions in ${location.city}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: location.metaTitle,
        description: location.metaDescription,
        images: ['/portfolio/vh-accounting.webp'],
      },
      other: {
        'geo.region': location.regionCode || 'IN-GJ',
        'geo.placename': locationName,
        'geo.position': `${lat};${lng}`,
        'ICBM': `${lat}, ${lng}`,
      },
    };
  },

  /**
   * Generate combined JSON-LD Schema (LocalBusiness + FAQPage + Speakable + Breadcrumbs)
   */
  generateGeoSchema(location: LocationItem) {
    const baseUrl = getBaseUrl();
    const pageUrl = `${baseUrl}/${location.slug}`;
    const lat = location.coordinates?.latitude || 23.0225;
    const lng = location.coordinates?.longitude || 72.5714;
    const isUae = location.slug === 'dubai' || location.countryCode === 'AE';

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LocalBusiness', 'ProfessionalService', 'ITServices'],
          '@id': `${pageUrl}/#localbusiness`,
          name: `TryangleTech - ${location.city}`,
          legalName: 'TryangleTech Solutions',
          alternateName: [`Tryangle Tech`, `TryangleTech ${location.city}`, `TryangleTech Software ${location.city}`],
          url: pageUrl,
          logo: `${baseUrl}/icon.png`,
          image: `${baseUrl}/portfolio/vh-accounting.webp`,
          description: location.metaDescription || `Premier web design, custom software, and mobile app development agency serving businesses in ${location.city}, ${location.country}.`,
          telephone: '+91-90338-78806',
          email: 'info.tryangletech@gmail.com',
          priceRange: '$$',
          currenciesAccepted: 'INR, USD, EUR, GBP, AED, CAD, AUD',
          paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI, Wire Transfer, PayPal',
          availableLanguage: isUae ? ['English', 'Arabic'] : ['English', 'Hindi', 'Gujarati'],
          knowsAbout: [
            'Web Development',
            'Next.js Development',
            'Mobile App Development',
            'Flutter',
            'React Native',
            'Custom Software Engineering',
            'Enterprise CRM Software',
            'ERP Systems',
            'Gulf Standard Time (GST) Software Engineering',
            `${location.city} Web Development`,
            `${location.city} Software Company`,
          ],
          parentOrganization: {
            '@type': 'Organization',
            'name': 'TryangleTech Solutions',
            'url': baseUrl,
          },
          sameAs: [
            'https://www.instagram.com/tryangle24_7/',
            'https://www.linkedin.com/company/tryangle-tech',
            'https://www.facebook.com/tryangletech/',
          ],
          address: {
            '@type': 'PostalAddress',
            addressLocality: location.city,
            addressRegion: location.state || location.region || location.city,
            addressCountry: location.countryCode || 'IN',
            ...(location.postalCode ? { postalCode: location.postalCode } : (location.countryCode === 'IN' ? { postalCode: '380015' } : {})),
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: lat,
            longitude: lng,
          },
          areaServed: [
            {
              '@type': 'City',
              name: location.city,
            },
            {
              '@type': 'Country',
              name: location.country,
            },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `TryangleTech Services in ${location.city}`,
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Custom Web Application Development',
                  description: `Next.js, React, Node.js, and Python web development in ${location.city}.`,
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Mobile App Development (iOS & Android)',
                  description: `High-performance Flutter, React Native, and native mobile apps in ${location.city}.`,
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Custom Software & ERP/CRM Solutions',
                  description: `Bespoke enterprise software and business workflow automation in ${location.city}.`,
                },
              },
            ],
          },
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}/#faq`,
          mainEntity: (location.faqs || []).map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}/#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: baseUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: location.city,
              item: pageUrl,
            },
          ],
        },
      ],
    };
  },
};

export default geoService;
