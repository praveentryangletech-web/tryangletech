import { Metadata } from 'next';
import { db } from '@/backend/db/client';
import { LocationItem, LocationQueryParams, PaginatedLocationResult } from './geo.types';
import { LOCATIONS_REGISTRY } from './geo.data';

interface CachedGeoEntry<T> {
  data: T;
  timestamp: number;
}

class GeoCacheManager {
  private cache = new Map<string, CachedGeoEntry<any>>();
  private readonly defaultTTL = 10 * 60 * 1000; // 10 minutes in-memory cache

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

        // Migrate legacy GeoLocation table if exists
        await db.$executeRawUnsafe(`
          DO $$
          BEGIN
            IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'GeoLocation') THEN
              INSERT INTO "PageContent" (
                "slug", "pageType", "city", "state", "country", "countryCode", "region", "regionCode",
                "postalCode", "latitude", "longitude", "popular", "metaTitle", "metaDescription",
                "keywords", "faqs", "isPublished", "createdAt", "updatedAt"
              )
              SELECT
                "slug", 'LOCATION_CLONE', "city", "state", "country", "countryCode", "region", "regionCode",
                "postalCode", "latitude", "longitude", "popular", "metaTitle", "metaDescription",
                "keywords", "faqs", "isPublished", "createdAt", "updatedAt"
              FROM "GeoLocation"
              ON CONFLICT ("slug") DO NOTHING;
            END IF;
          END $$;
        `);
      } catch (err) {
        console.warn('[GeoService] ensureTable notice:', err);
      }
    })().catch(() => {});
  },

  /**
   * Retrieve all supported locations from unified PageContent (with static registry merge)
   */
  async getAllLocations(): Promise<LocationItem[]> {
    const cacheKey = 'geo_all_locations';
    const cached = geoCache.get<LocationItem[]>(cacheKey);
    if (cached) return cached;

    this.ensureTable();

    try {
      const rows = await Promise.race([
        db.$queryRaw<any[]>`SELECT * FROM "PageContent" WHERE "pageType" = 'LOCATION_CLONE' AND "isPublished" = true ORDER BY "city" ASC`,
        new Promise<any[]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout (2500ms)')), 2500)),
      ]);

      if (rows && rows.length > 0) {
        const dbLocations: LocationItem[] = rows.map((r) => {
          const heroObj = r.hero ? (typeof r.hero === 'string' ? JSON.parse(r.hero) : r.hero) : null;
          const aboutObj = r.about ? (typeof r.about === 'string' ? JSON.parse(r.about) : r.about) : null;

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
            headlineTitle: heroObj?.headline ? heroObj.headline.replace(new RegExp(r.city || '', 'gi'), '').trim() : 'We build websites, apps and custom software for businesses in',
            headlineHighlight: r.city || r.slug,
            subheadline: heroObj?.subheadline || 'From high-converting web applications to custom ERP software, we build scalable digital systems tailored for modern businesses.',
            aboutText: aboutObj?.description || `Serving clients in ${r.city || r.slug} with cutting-edge engineering, enterprise-grade architectures, and bespoke software solutions designed to accelerate growth.`,
            metaTitle: r.metaTitle || `Web Development & Custom Software in ${r.city || r.slug} | TryangleTech`,
            metaDescription: r.metaDescription || `Top web development and software company serving ${r.city || r.slug}. 350+ projects delivered.`,
            keywords: Array.isArray(r.keywords) ? r.keywords : [],
            faqs: r.faqs ? (typeof r.faqs === 'string' ? JSON.parse(r.faqs) : r.faqs) : [],
          };
        });

        // Merge any defaults that aren't yet in DB
        const mergedMap = new Map<string, LocationItem>();
        LOCATIONS_REGISTRY.forEach((loc) => mergedMap.set(loc.slug.toLowerCase(), loc));
        dbLocations.forEach((loc) => mergedMap.set(loc.slug.toLowerCase(), loc));

        const result = Array.from(mergedMap.values());
        geoCache.set(cacheKey, result);
        return result;
      }
    } catch (err) {
      console.warn('[GeoService] getAllLocations fallback to static registry:', err);
    }

    geoCache.set(cacheKey, LOCATIONS_REGISTRY);
    return LOCATIONS_REGISTRY;
  },

  /**
   * Backend-Side Paginated Location Query with search & region filtering
   */
  async getPaginatedLocations(params: LocationQueryParams = {}): Promise<PaginatedLocationResult> {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params.limit) || 8));
    const offset = (page - 1) * limit;
    const region = params.region && params.region !== 'All' ? params.region.trim() : undefined;
    const search = params.search ? params.search.trim().toLowerCase() : undefined;

    // Retrieve full merged location dataset
    const allLocations = await this.getAllLocations();

    let filtered = allLocations;
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
    return all.filter((loc) => loc.popular);
  },

  /**
   * Retrieve location by slug (case-insensitive)
   */
  async getLocationBySlug(slug: string): Promise<LocationItem | null> {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();

    const cacheKey = `geo_loc_${cleanSlug}`;
    const cached = geoCache.get<LocationItem>(cacheKey);
    if (cached) return cached;

    this.ensureTable();

    try {
      const rows = await Promise.race([
        db.$queryRaw<any[]>`SELECT * FROM "PageContent" WHERE LOWER("slug") = ${cleanSlug} AND "isPublished" = true LIMIT 1`,
        new Promise<any[]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout (2500ms)')), 2500)),
      ]);

      if (rows && rows.length > 0) {
        const r = rows[0];
        const heroObj = r.hero ? (typeof r.hero === 'string' ? JSON.parse(r.hero) : r.hero) : null;
        const aboutObj = r.about ? (typeof r.about === 'string' ? JSON.parse(r.about) : r.about) : null;

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
          headlineTitle: heroObj?.headline ? heroObj.headline.replace(new RegExp(r.city || '', 'gi'), '').trim() : 'We build websites, apps and custom software for businesses in',
          headlineHighlight: r.city || r.slug,
          subheadline: heroObj?.subheadline || 'From high-converting web applications to custom ERP software, we build scalable digital systems tailored for modern businesses.',
          aboutText: aboutObj?.description || `Serving clients in ${r.city || r.slug} with cutting-edge engineering, enterprise-grade architectures, and bespoke software solutions designed to accelerate growth.`,
          metaTitle: r.metaTitle || `Web Development & Custom Software in ${r.city || r.slug} | TryangleTech`,
          metaDescription: r.metaDescription || `Top web development and software company serving ${r.city || r.slug}. 350+ projects delivered.`,
          keywords: Array.isArray(r.keywords) ? r.keywords : [],
          faqs: r.faqs ? (typeof r.faqs === 'string' ? JSON.parse(r.faqs) : r.faqs) : [],
        };

        geoCache.set(cacheKey, loc);
        return loc;
      }
    } catch (err) {
      console.warn(`[GeoService] getLocationBySlug('${cleanSlug}') DB fallback:`, err);
    }

    // Static registry fallback
    const fallback = LOCATIONS_REGISTRY.find((l) => l.slug.toLowerCase() === cleanSlug) || null;
    if (fallback) {
      geoCache.set(cacheKey, fallback);
    }
    return fallback;
  },

  /**
   * Save or Update a Location Page in unified PageContent
   */
  async saveLocation(location: Partial<LocationItem> & { slug: string; city: string }): Promise<LocationItem> {
    this.ensureTable();

    const cleanSlug = location.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    const existing = await this.getLocationBySlug(cleanSlug);

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

    const headlineTitle = location.headlineTitle?.trim() || existing?.headlineTitle || 'We build websites, apps and custom software for businesses in';
    const headlineHighlight = location.headlineHighlight?.trim() || existing?.headlineHighlight || city;
    const subheadline = location.subheadline?.trim() || existing?.subheadline || 'From high-converting web applications to custom ERP software, we build scalable digital systems tailored for modern businesses.';
    const aboutText = location.aboutText?.trim() || existing?.aboutText || `Serving clients in ${city} with cutting-edge engineering, enterprise-grade architectures, and bespoke software solutions designed to accelerate growth.`;

    const metaTitle = location.metaTitle?.trim() || existing?.metaTitle || `Web Development & Custom Software Company in ${city} | TryangleTech`;
    const metaDescription = location.metaDescription?.trim() || existing?.metaDescription || `Top-rated IT & Web Development company in ${city}. We build custom websites, iOS/Android mobile apps, and custom software systems with 350+ delivered projects.`;
    const keywords = Array.isArray(location.keywords) ? location.keywords : (existing?.keywords || [city, 'web development', 'custom software', 'mobile app development']);
    const faqs = Array.isArray(location.faqs) ? location.faqs : (existing?.faqs || []);

    const heroJson = {
      headline: `${headlineTitle} ${headlineHighlight}`,
      subheadline: subheadline,
      subBadgeText: `SERVING ${city.toUpperCase()}`,
      ctaText: 'Start Your Project',
      ctaLink: '/contact',
    };

    const aboutJson = {
      headingText: `Empowering Businesses Across ${city}`,
      headingHighlight: `${city} & Global Markets`,
      description: aboutText,
    };

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
        $14,
        $15,
        $16::text[],
        $17::jsonb,
        true,
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
        "metaTitle" = EXCLUDED."metaTitle",
        "metaDescription" = EXCLUDED."metaDescription",
        "keywords" = EXCLUDED."keywords",
        "faqs" = EXCLUDED."faqs",
        "isPublished" = true,
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
      metaTitle,
      metaDescription,
      keywords,
      JSON.stringify(faqs)
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
      headlineTitle,
      headlineHighlight,
      subheadline,
      aboutText,
      metaTitle,
      metaDescription,
      keywords,
      faqs,
    };
  },

  /**
   * Clone / Duplicate an existing PageContent row into a new target city/slug
   */
  async duplicateLocation(
    sourceSlug: string,
    target: { city: string; slug: string; region?: any; country?: string }
  ): Promise<LocationItem> {
    const cleanTargetSlug = target.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    const targetCity = target.city.trim();

    // 1. Fetch Source
    let sourceLoc = await this.getLocationBySlug(sourceSlug);
    if (!sourceLoc) {
      sourceLoc = LOCATIONS_REGISTRY[0];
    }

    const region = target.region || sourceLoc.region || 'Gujarat';
    const country = target.country || sourceLoc.country || 'India';
    const countryCode = country.toLowerCase() === 'india' ? 'IN' : sourceLoc.countryCode || 'IN';
    const regionCode = countryCode === 'IN' ? `IN-${targetCity.slice(0, 2).toUpperCase()}` : sourceLoc.regionCode;

    // 2. Generate customized parameters for new location
    const newLocationPayload: Partial<LocationItem> & { slug: string; city: string } = {
      slug: cleanTargetSlug,
      city: targetCity,
      state: targetCity,
      country: country,
      countryCode: countryCode,
      region: region,
      regionCode: regionCode,
      coordinates: sourceLoc.coordinates || { latitude: 23.0225, longitude: 72.5714 },
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
    };

    return await this.saveLocation(newLocationPayload);
  },

  /**
   * Delete a location page from PageContent
   */
  async deleteLocation(slug: string): Promise<boolean> {
    if (!slug) return false;
    const cleanSlug = slug.toLowerCase().trim();

    this.ensureTable();

    try {
      await db.$executeRawUnsafe(`DELETE FROM "PageContent" WHERE LOWER("slug") = $1`, cleanSlug);
      geoCache.clear();
      return true;
    } catch (err) {
      console.warn(`[GeoService] deleteLocation('${cleanSlug}') error:`, err);
      return false;
    }
  },

  /**
   * Generate Next.js Dynamic Metadata for location page
   */
  generateGeoMetadata(location: LocationItem): Metadata {
    const locationName = `${location.city}, ${location.state ? location.state + ', ' : ''}${location.country}`;
    const pageUrl = `https://tryangletech.com/location/${location.slug}`;
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
    const pageUrl = `https://tryangletech.com/location/${location.slug}`;
    const lat = location.coordinates?.latitude || 23.0225;
    const lng = location.coordinates?.longitude || 72.5714;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LocalBusiness', 'ProfessionalService', 'ITServices'],
          '@id': `${pageUrl}/#localbusiness`,
          name: `TryangleTech - ${location.city}`,
          legalName: 'TryangleTech Solutions',
          url: pageUrl,
          logo: 'https://tryangletech.com/icon.png',
          image: 'https://tryangletech.com/portfolio/vh-accounting.webp',
          description: location.metaDescription,
          telephone: '+91-90338-78806',
          email: 'info.tryangletech@gmail.com',
          priceRange: '$$',
          currenciesAccepted: 'INR, USD, EUR, GBP, AED, CAD, AUD',
          paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI, Wire Transfer, PayPal',
          address: {
            '@type': 'PostalAddress',
            addressLocality: location.city,
            addressRegion: location.state || location.region,
            addressCountry: location.countryCode || 'IN',
            postalCode: location.postalCode || '380015',
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
              item: 'https://tryangletech.com',
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
