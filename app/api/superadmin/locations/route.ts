import { NextResponse } from 'next/server';
import { geoService } from '@/backend/services/geo';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    const region = searchParams.get('region') || undefined;
    const search = searchParams.get('search') || undefined;

    // If pagination or filtering query params are present, return backend-paginated result
    if (searchParams.has('page') || searchParams.has('limit') || searchParams.has('region') || searchParams.has('search')) {
      const result = await geoService.getPaginatedLocations({ page, limit, region, search });
      return NextResponse.json({
        success: true,
        data: result.items,
        pagination: result.pagination,
        count: result.pagination.total,
      });
    }

    const data = await geoService.getAllLocations();
    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === 'duplicate') {
      if (!body.sourceSlug || !body.target?.city || !body.target?.slug) {
        return NextResponse.json(
          { success: false, error: 'sourceSlug, target.city, and target.slug are required for duplication.' },
          { status: 400 }
        );
      }
      const cloned = await geoService.duplicateLocation(body.sourceSlug, body.target);
      return NextResponse.json({
        success: true,
        message: `Successfully duplicated to "${cloned.city}" (${cloned.slug})!`,
        data: cloned,
      });
    }

    if (!body.slug || !body.city || !body.country) {
      return NextResponse.json(
        { success: false, error: 'City, Country, and Slug are required.' },
        { status: 400 }
      );
    }

    const saved = await geoService.saveLocation(body);
    return NextResponse.json({
      success: true,
      message: `Location "${saved.city}" saved successfully.`,
      data: saved,
    });
  } catch (error: any) {
    console.error('Error saving location:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save location' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  return POST(request);
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Location slug is required to delete.' },
        { status: 400 }
      );
    }

    const deleted = await geoService.deleteLocation(slug);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete location from database.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Location "${slug}" deleted successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete location' },
      { status: 500 }
    );
  }
}
