import { NextRequest } from 'next/server';
import { servicesService } from '@/backend/services/services';
import { DEFAULT_SERVICE_MAIN_CONTENT } from '@/backend/services/services/services.defaults';
import { successResponse, errorResponse, notModifiedResponse } from '@/backend/utils/apiResponse';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const clientEtag = request.headers.get('if-none-match');
    let data;
    try {
      data = await servicesService.getServiceMainContent();
    } catch (dbErr) {
      console.warn('[PublicServicesAPI] DB fallback to defaults:', dbErr);
      data = DEFAULT_SERVICE_MAIN_CONTENT;
    }

    const etag = (data as any)?.etag || '';

    // 1. Check HTTP 304 Not Modified cache hit
    if (clientEtag && etag && clientEtag === etag) {
      return notModifiedResponse(etag, 'public, max-age=60, stale-while-revalidate=300');
    }

    // 2. Return standard success payload with cache headers
    return successResponse(
      data,
      undefined,
      200,
      {
        'ETag': etag,
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
      }
    );
  } catch (error: any) {
    console.error('GET /api/services error:', error);
    return errorResponse(error?.message || 'Failed to fetch services content', 500);
  }
}
