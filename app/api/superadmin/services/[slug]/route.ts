import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { servicesService } from '@/backend/services/services';
import { DEFAULT_WEB_DEV_CONTENT } from '@/backend/services/services/services.defaults';
import { requireSuperadmin } from '@/backend/utils/authGuard';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const { slug } = await params;
    let data;
    try {
      data = await servicesService.getSubServiceContent(slug);
    } catch (dbErr) {
      console.warn(`[SuperadminSubServiceAPI] DB fallback for ${slug}:`, dbErr);
      data = DEFAULT_WEB_DEV_CONTENT;
    }

    return successResponse(data, 'Sub-service data retrieved successfully.');
  } catch (error: any) {
    console.error('GET /api/superadmin/services/[slug] error:', error);
    return errorResponse(error?.message || 'Failed to fetch sub-service data', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const { slug } = await params;
    const body = await request.json();
    const cleanSlug = slug.replace(/^service-/, '');
    const updated = await servicesService.updateSubServiceContent(cleanSlug, body);

    try {
      revalidatePath(`/service/${cleanSlug}`, 'page');
      revalidatePath('/service', 'page');
      revalidatePath('/', 'page');
    } catch {}

    return successResponse(updated, 'Service content updated live successfully.');
  } catch (error: any) {
    console.error('PUT /api/superadmin/services/[slug] error:', error);
    return errorResponse(error?.message || 'Failed to update service content', 500);
  }
}
