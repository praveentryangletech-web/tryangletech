import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import HomeMain from '@/app/home/home-main';
import { geoService } from '@/backend/services/geo';

interface LocationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Pre-render all supported commercial hubs for instant CDN serving
 */
export async function generateStaticParams() {
  const locations = await geoService.getAllLocations();
  return locations.map((loc) => ({
    slug: loc.slug,
  }));
}

/**
 * Generate Location-Specific SEO, GEO, and OpenGraph Metadata
 */
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = await geoService.getLocationBySlug(slug);

  if (!location) {
    return {
      title: 'Location Not Found | TryangleTech',
      description: 'The requested technology service location could not be found.',
    };
  }

  return geoService.generateGeoMetadata(location);
}

/**
 * Location-Targeted Programmatic Home Page Clone
 */
export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = await geoService.getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const jsonLdSchema = geoService.generateGeoSchema(location);

  return (
    <>
      {/* High-Intent LocalBusiness + FAQPage + Speakable AEO Schema */}
      <Script
        id={`geo-schema-${location.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />

      {/* Identical Interactive Home Layout with Dynamic Geo Text Interactivity */}
      <HomeMain geo={location} />
    </>
  );
}
