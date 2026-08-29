import { NextResponse } from 'next/server';
import { geoService } from '@/backend/services/geo';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // 1 minute cache

/**
 * GET /api/geo/slugs
 * Lightweight endpoint returning published location slugs for Geo-IP matching
 */
export async function GET() {
  try {
    const locations = await geoService.getAllLocations(false);
    const slugs = locations.map((l) => l.slug.toLowerCase().trim());

    return NextResponse.json(
      {
        success: true,
        slugs,
        count: slugs.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        slugs: [],
        error: err?.message || 'Failed to fetch location slugs',
      },
      { status: 500 }
    );
  }
}
