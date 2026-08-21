import { NextRequest, NextResponse } from 'next/server';
import portfolioService from '@/backend/services/portfolio/portfolio.service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const force = searchParams.get('force') === 'true';

    const result = await portfolioService.syncAllStaticProjectsToDB(force);
    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.synced}/${result.total} static projects to PostgreSQL DB.`,
      synced: result.synced,
      total: result.total,
      errors: result.errors,
    });
  } catch (err: any) {
    console.error('[API /api/portfolio/sync GET] Error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to sync projects to database' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const force = Boolean(body.force);

    const result = await portfolioService.syncAllStaticProjectsToDB(force);
    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.synced}/${result.total} static projects to PostgreSQL DB.`,
      data: result,
    });
  } catch (err: any) {
    console.error('[API /api/portfolio/sync POST] Error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to sync projects to database' },
      { status: 500 }
    );
  }
}
