import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import HomeMain from '@/app/home/home-main';
import { geoService } from '@/backend/services/geo';
import { homeService } from '@/backend/services/home';
import { LocationItem } from '@/backend/services/geo/geo.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

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

/**
 * Dynamically format any URL slug into a clean Title Case city name
 */
function formatCityFromSlug(slug: string): string {
  if (!slug) return 'Ahmedabad';
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Generate Location-Specific SEO, GEO, and OpenGraph Metadata dynamically
 */
export async function generateMetadata({ params, searchParams }: LocationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.toLowerCase()?.trim();
  if (!slug) {
    return {};
  }
  const cityName = formatCityFromSlug(slug);

  const sParams = searchParams ? await searchParams : {};
  const isPreview = sParams?.preview === 'true';
  const location = await geoService.getLocationBySlug(slug, isPreview);

  if (location) {
    return geoService.generateGeoMetadata(location);
  }

  // Purely dynamic fallback metadata synthesized from requested slug
  const title = `Web Development & Custom Software in ${cityName} | TryangleTech`;
  const description = `Top-rated IT, Mobile App and Web Development company serving ${cityName}. We build custom websites, iOS/Android apps, and scalable software with 350+ delivered projects.`;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      `${cityName.toLowerCase()} web development`,
      `software company in ${cityName.toLowerCase()}`,
      `app developers ${cityName.toLowerCase()}`,
      `${cityName.toLowerCase()} IT services`,
      'TryangleTech',
    ],
    alternates: {
      canonical: `https://tryangletech.com/location/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://tryangletech.com/location/${slug}`,
      siteName: 'TryangleTech',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: '/portfolio/vh-accounting.webp',
          width: 1200,
          height: 630,
          alt: `TryangleTech Software Solutions in ${cityName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/portfolio/vh-accounting.webp'],
    },
  };
}

/**
 * Location-Targeted Programmatic Home Page Clone
 */
export default async function LocationPage({ params, searchParams }: LocationPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.toLowerCase()?.trim();
  if (!slug) {
    notFound();
  }
  const cityName = formatCityFromSlug(slug);

  const sParams = searchParams ? await searchParams : {};
  const isPreview = sParams?.preview === 'true';
  let location = await geoService.getLocationBySlug(slug, isPreview);

  let homeData;
  try {
    homeData = await homeService.getHomeContent();
  } catch (err) {
    homeData = undefined;
  }

  // Pure dynamic location structure synthesized strictly from database homeData & requested slug
  if (!location) {
    location = {
      slug,
      city: cityName,
      country: (homeData as any)?.country || 'India',
      countryCode: (homeData as any)?.countryCode || 'IN',
      region: (homeData as any)?.region || 'Global',
      regionCode: (homeData as any)?.regionCode || 'IN-GJ',
      coordinates: (homeData as any)?.coordinates || { latitude: 23.0225, longitude: 72.5714 },
      popular: false,
      isPublished: true,
      headlineTitle: 'We build websites, apps and custom software for businesses in',
      headlineHighlight: cityName,
      subheadline: homeData?.hero?.subheadline || `From high-converting web applications to custom ERP software, we build scalable digital systems for businesses in ${cityName}.`,
      aboutText: homeData?.about?.description || `Serving clients in ${cityName} with cutting-edge engineering, enterprise-grade architectures, and bespoke software solutions designed to accelerate growth.`,
      metaTitle: `Web Development & Custom Software in ${cityName} | TryangleTech`,
      metaDescription: `Top-rated IT, Mobile App and Web Development company serving ${cityName}. We build custom websites, iOS/Android apps, and scalable software with 350+ delivered projects.`,
      keywords: [`${cityName.toLowerCase()} web development`, `software company in ${cityName.toLowerCase()}`],
      faqs: homeData?.faqs || [
        {
          q: `Do you provide software consultations for businesses in ${cityName}?`,
          a: `Yes! We work with clients across ${cityName} providing strategic software consulting, high-touch communication, and milestone-driven delivery.`,
        },
      ],
      hero: {
        ...(homeData?.hero || DEFAULT_HOME_CONTENT.hero),
        headline: `We build websites, apps and custom software for businesses in ${cityName}`,
        subheadline: homeData?.hero?.subheadline || `From high-converting web applications to custom ERP software, we build scalable digital systems for businesses in ${cityName}.`,
        subBadgeText: `SERVING ${cityName.toUpperCase()}`,
      },
    } as LocationItem;
  }

  const jsonLdSchema = geoService.generateGeoSchema(location);

  return (
    <>
      {/* Draft Preview Indicator Banner for Admin */}
      {location.isPublished === false && (
        <div style={{ position: 'sticky', top: 0, zIndex: 99999, backgroundColor: '#D97706', color: '#FFFFFF', textAlign: 'center', padding: '10px 16px', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.02em', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
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
