import { NextResponse } from 'next/server';
import { homeService } from '@/backend/services/home';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    let data;
    try {
      data = await homeService.getHomeContent();
    } catch (dbErr) {
      console.warn('[SuperadminHome] DB error, using default fallback:', dbErr);
      data = DEFAULT_HOME_CONTENT;
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch home content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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
