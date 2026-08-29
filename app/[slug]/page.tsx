import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import HomeMain from '@/app/home/home-main';
import { geoService } from '@/backend/services/geo';
import { homeService } from '@/backend/services/home';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

interface LocationPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    preview?: string;
  }>;
}

const RESERVED_SLUGS = new Set([
  'about',
  'portfolio',
  'service',
  'services',
  'blog',
  'contact',
  'superadmin',
  'api',
  'admin',
  'location',
  'locations',
  'sitemap.xml',
  'robots.txt',
  'llms.txt',
  'llms-full.txt',
  'favicon.ico',
  'icon.png',
]);

/**
 * Generate Location-Specific SEO, GEO, and OpenGraph Metadata dynamically from Database
 */
export async function generateMetadata({ params, searchParams }: LocationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.toLowerCase()?.trim();
  if (!slug || RESERVED_SLUGS.has(slug)) {
    return {
      title: 'Page Not Found | TryangleTech',
    };
  }

  const sParams = searchParams ? await searchParams : {};
  const isPreview = sParams?.preview === 'true';
  const location = await geoService.getLocationBySlug(slug, isPreview);

  if (!location) {
    return {
      title: 'Page Not Found | TryangleTech',
    };
  }

  return geoService.generateGeoMetadata(location);
}

/**
 * Direct Dynamic Root Route (e.g. /dubai, /mumbai, /london, /san-francisco)
 */
export default async function DirectLocationPage({ params, searchParams }: LocationPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.toLowerCase()?.trim();
  if (!slug || RESERVED_SLUGS.has(slug)) {
    notFound();
  }

  const sParams = searchParams ? await searchParams : {};
  const isPreview = sParams?.preview === 'true';
  const location = await geoService.getLocationBySlug(slug, isPreview);

  // If the location does NOT exist in the database (PageContent table), return 404
  if (!location) {
    notFound();
  }

  let homeData;
  try {
    homeData = await homeService.getHomeContent();
  } catch (err) {
    homeData = undefined;
  }

  const jsonLdSchema = geoService.generateGeoSchema(location);

  return (
    <>
      {/* Draft Preview Indicator Banner for Admin */}
      {location.isPublished === false && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 99999,
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            textAlign: 'center',
            padding: '10px 16px',
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.02em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          🔒 PREVIEW MODE: This location page is currently a private DRAFT and is not public or indexed by search engines.
        </div>
      )}

      {/* High-Intent LocalBusiness + FAQPage + Speakable AEO Schema */}
      <Script
        id={`geo-schema-${location.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />

      {/* Identical Interactive Home Layout with Dynamic Geo Text Interactivity */}
      <HomeMain geo={location} initialContent={homeData} />
    </>
  );
}
