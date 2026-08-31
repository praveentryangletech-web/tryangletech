import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { servicesService } from '@/backend/services/services';
import { DEFAULT_SERVICE_MAIN_CONTENT } from '@/backend/services/services/services.defaults';
import { requireSuperadmin } from '@/backend/utils/authGuard';
import { successResponse, paginatedResponse, errorResponse } from '@/backend/utils/apiResponse';

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
      return successResponse(data, 'Main services content retrieved successfully.');
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

    return paginatedResponse(
      result.items,
      result.pagination,
      { categories: result.categories },
      'Services list retrieved successfully.'
    );
  } catch (error: any) {
    console.error('GET /api/superadmin/services error:', error);
    return errorResponse(error?.message || 'Failed to fetch services data', 500);
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

    return successResponse(updated, 'Services content updated live successfully.');
  } catch (error: any) {
    console.error('PUT /api/superadmin/services error:', error);
    return errorResponse(error?.message || 'Failed to update services content', 500);
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const { slug, isPublished } = await request.json();
    if (!slug) {
      return errorResponse('Slug is required for status update.', 400);
    }

    const success = await servicesService.toggleServiceStatus(slug, isPublished);
    if (!success) {
      return errorResponse('Failed to update publication status.', 500);
    }

    return successResponse({ slug, isPublished }, 'Service publication status updated live.');
  } catch (error: any) {
    console.error('PATCH /api/superadmin/services error:', error);
    return errorResponse(error?.message || 'Failed to patch service status', 500);
  }
}
