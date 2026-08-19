import { NextRequest, NextResponse } from 'next/server';
import mediaService from '@/backend/services/media/media.service';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const rawParams = await params;
    const rawFilename = rawParams?.filename;
    if (!rawFilename) {
      return new NextResponse('Filename missing', { status: 400 });
    }

    const filename = decodeURIComponent(rawFilename);

    const asset = await mediaService.getAssetBuffer(filename);
    if (!asset) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    return new NextResponse(new Uint8Array(asset.buffer), {
      status: 200,
      headers: {
        'Content-Type': asset.mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err: any) {
    console.error('[Media Serve GET error]:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
