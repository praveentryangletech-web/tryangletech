import { NextRequest, NextResponse } from 'next/server';
import { servicesService } from '@/backend/services/services';
import { DEFAULT_SERVICE_MAIN_CONTENT } from '@/backend/services/services/services.defaults';
import { requireSuperadmin } from '@/backend/utils/authGuard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    let data;
    try {
      data = await servicesService.getServiceMainContent();
    } catch (dbErr) {
      console.warn('[SuperadminServicesMain] DB error, using default fallback:', dbErr);
      data = DEFAULT_SERVICE_MAIN_CONTENT;
    }
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch main services data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authError = requireSuperadmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const updated = await servicesService.updateServiceMainContent(body);

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Services content updated live successfully.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update services content' },
      { status: 500 }
    );
  }
}
