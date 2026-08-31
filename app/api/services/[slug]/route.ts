import { NextRequest, NextResponse } from 'next/server';
import { servicesService } from '@/backend/services/services';
import { DEFAULT_WEB_DEV_CONTENT } from '@/backend/services/services/services.defaults';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    let data;
    try {
      data = await servicesService.getSubServiceContent(slug);
    } catch (dbErr) {
      console.warn(`[PublicSubServiceAPI] DB fallback for ${slug}:`, dbErr);
      data = DEFAULT_WEB_DEV_CONTENT;
    }

    const etag = (data as any)?.etag || '';

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
      { success: false, error: error.message || 'Failed to fetch sub-service content' },
      { status: 500 }
    );
  }
}
