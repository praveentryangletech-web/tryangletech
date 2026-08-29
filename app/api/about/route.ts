import { NextResponse } from 'next/server';
import { aboutService } from '@/backend/services/about';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const clientEtag = request.headers.get('if-none-match');
    let data;
    try {
      data = await aboutService.getAboutContent();
    } catch (dbErr) {
      console.warn('[AboutAPI] DB error, using default fallback:', dbErr);
      data = { ...DEFAULT_ABOUT_CONTENT, etag: 'W/"fallback-about"' };
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
    console.error('Error fetching About page content:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}
