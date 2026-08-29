import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { geoService } from '@/backend/services/geo';
import { requireSuperadmin } from '@/backend/utils/authGuard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);

    // If slug or id query param is present, fetch the single full detailed record for editing
    const slug = searchParams.get('slug') || searchParams.get('id');
    if (slug) {
      const location = await geoService.getLocationBySlug(slug, true);
      if (!location) {
        return NextResponse.json({ success: false, error: 'Location not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        data: location,
      });
    }
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    const region = searchParams.get('region') || undefined;
    const search = searchParams.get('search') || undefined;
    const status = (searchParams.get('status') as 'all' | 'published' | 'draft') || 'all';

    // If pagination or filtering query params are present, return backend-paginated result
    if (searchParams.has('page') || searchParams.has('limit') || searchParams.has('region') || searchParams.has('search') || searchParams.has('status')) {
      const result = await geoService.getPaginatedLocations({ page, limit, region, search, status, includeDrafts: true });
      return NextResponse.json(
        {
          success: true,
          data: result.items,
          pagination: result.pagination,
          count: result.pagination.total,
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        }
      );
    }

    const data = await geoService.getAllLocations(true);
    return NextResponse.json(
      {
        success: true,
        data,
        count: data.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    if (body.action === 'toggle-status') {
      if (!body.slug) {
        return NextResponse.json({ success: false, error: 'Location slug is required.' }, { status: 400 });
      }
      const isPublished = Boolean(body.isPublished);
      const updated = await geoService.toggleLocationStatus(body.slug, isPublished);

      try {
        revalidatePath('/', 'page');
        revalidatePath('/[slug]', 'page');
        revalidatePath(`/${body.slug}`, 'page');
      } catch {}

      return NextResponse.json({
        success: true,
        message: `Location "${body.slug}" is now ${isPublished ? 'Live / Published' : 'Draft (Not Public)'}.`,
        data: updated,
      });
    }

    if (body.action === 'duplicate') {
      if (!body.sourceSlug || !body.target?.city || !body.target?.slug) {
        return NextResponse.json(
          { success: false, error: 'sourceSlug, target.city, and target.slug are required for duplication.' },
          { status: 400 }
        );
      }
      const cloned = await geoService.duplicateLocation(body.sourceSlug, body.target);

      try {
        revalidatePath('/', 'page');
        revalidatePath('/[slug]', 'page');
        revalidatePath(`/${cloned.slug}`, 'page');
      } catch {}

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

    try {
      revalidatePath('/', 'page');
      revalidatePath('/[slug]', 'page');
      revalidatePath(`/${saved.slug}`, 'page');
    } catch {}

    return NextResponse.json({
      success: true,
      message: `Location "${saved.city}" saved successfully as ${saved.isPublished ? 'Published' : 'Draft'}.`,
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

export async function PATCH(request: NextRequest) {
  return POST(request);
}

export async function PUT(request: NextRequest) {
  return POST(request);
}

export async function DELETE(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

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
