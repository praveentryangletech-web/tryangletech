import { NextRequest, NextResponse } from 'next/server';
import { homeService } from '@/backend/services/home';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';
import { requireSuperadmin } from '@/backend/utils/authGuard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const clientEtag = request.headers.get('if-none-match');
    let data;
    try {
      data = await homeService.getHomeContent();
    } catch (dbErr) {
      console.warn('[SuperadminHome] DB error, using default fallback:', dbErr);
      data = DEFAULT_HOME_CONTENT;
    }

    const etag = (data as any)?.etag || '';
    if (clientEtag && clientEtag === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': 'private, max-age=30, stale-while-revalidate=120',
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
          'Cache-Control': 'private, max-age=30, stale-while-revalidate=120',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch home content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const updated = await homeService.updateHomeContent(body);

    return NextResponse.json({
      success: true,
      message: 'Home content updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating home content:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update home content' },
      { status: 500 }
    );
  }
}
