import { NextResponse } from 'next/server';
import { aboutService } from '@/backend/services/about';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    let data;
    try {
      data = await aboutService.getAboutContent();
    } catch (dbErr) {
      console.warn('[SuperadminAbout] DB error, using default fallback:', dbErr);
      data = DEFAULT_ABOUT_CONTENT;
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = await aboutService.updateAboutContent(body);

    return NextResponse.json({
      success: true,
      message: 'About page content updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating about content:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update about content' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return PUT(request);
}
