import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { servicesService } from '@/backend/services/services';
import { DEFAULT_SERVICE_MAIN_CONTENT } from '@/backend/services/services/services.defaults';
import { requireSuperadmin } from '@/backend/utils/authGuard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // Detail fetch for single service
    if (slug === 'main' || slug === 'service-main') {
      let data;
      try {
        data = await servicesService.getServiceMainContent();
      } catch (dbErr) {
        console.warn('[SuperadminServices] DB error, using default fallback:', dbErr);
        data = DEFAULT_SERVICE_MAIN_CONTENT;
      }
      return NextResponse.json({
        success: true,
        data,
      });
    }

    // 100% Database-Driven Paginated List
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    const search = searchParams.get('search') || '';
    const status = (searchParams.get('status') as 'all' | 'published' | 'draft') || 'all';
    const category = searchParams.get('category') || 'All';

    const result = await servicesService.getServicesPagesList({
      page,
      limit,
      search,
      status,
      category,
    });

    return NextResponse.json({
      success: true,
      data: result.items,
      pagination: result.pagination,
      categories: result.categories,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch services data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const updated = await servicesService.updateServiceMainContent(body);

    try {
      revalidatePath('/service', 'page');
      revalidatePath('/', 'page');
    } catch {}

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Services content updated live successfully.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update services content' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const { slug, isPublished } = await request.json();
    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
    }

    const success = await servicesService.toggleServiceStatus(slug, isPublished);
    return NextResponse.json({
      success,
      message: success ? 'Service publication status updated live.' : 'Failed to update status.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to patch service status' },
      { status: 500 }
    );
  }
}
