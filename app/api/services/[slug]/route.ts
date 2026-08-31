import { NextRequest } from 'next/server';
import { servicesService } from '@/backend/services/services';
import { DEFAULT_WEB_DEV_CONTENT } from '@/backend/services/services/services.defaults';
import { successResponse, errorResponse, notModifiedResponse } from '@/backend/utils/apiResponse';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const clientEtag = request.headers.get('if-none-match');

    let data;
    try {
      data = await servicesService.getSubServiceContent(slug);
    } catch (dbErr) {
      console.warn(`[PublicSubServiceAPI] DB fallback for ${slug}:`, dbErr);
      data = DEFAULT_WEB_DEV_CONTENT;
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
    console.error('GET /api/services/[slug] error:', error);
    return errorResponse(error?.message || 'Failed to fetch sub-service content', 500);
  }
}
