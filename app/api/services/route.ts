import { NextRequest, NextResponse } from 'next/server';
import { servicesService } from '@/backend/services/services';
import { DEFAULT_SERVICE_MAIN_CONTENT } from '@/backend/services/services/services.defaults';

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
    if (clientEtag && clientEtag === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
        headers: {
          'ETag': etag,
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
