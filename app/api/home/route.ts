import { NextResponse } from 'next/server';
import { homeService } from '@/backend/services/home';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const clientEtag = request.headers.get('if-none-match');
    let data;
    try {
      data = await homeService.getHomeContent();
    } catch (dbErr) {
      console.warn('HomeService DB error, using default:', dbErr);
      data = { ...DEFAULT_HOME_CONTENT, etag: 'W/"fallback-home"' };
    }

    if (clientEtag && data.etag && clientEtag === data.etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': data.etag,
          'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=300',
        },
      });
    }

    const response = NextResponse.json({
      success: true,
      data,
    });

    if (data.etag) {
      response.headers.set('ETag', data.etag);
    }
    response.headers.set(
      'Cache-Control',
      'public, max-age=30, s-maxage=60, stale-while-revalidate=300'
    );

    return response;
  } catch (error: any) {
    console.error('Error fetching Home page content:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch home content' },
      { status: 500 }
    );
  }
}
