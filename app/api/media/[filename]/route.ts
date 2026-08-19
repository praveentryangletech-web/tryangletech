import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import mediaService from '@/backend/services/media/media.service';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const rawParams = await params;
    const rawFilename = rawParams?.filename;
    if (!rawFilename) {
      return new NextResponse('Filename missing', { status: 400 });
    }

    // Path traversal defense: extract base filename only
    const cleanFilename = path.basename(decodeURIComponent(rawFilename));
    if (!cleanFilename || cleanFilename === '.' || cleanFilename.includes('..')) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    const asset = await mediaService.getAssetBuffer(cleanFilename);
    if (!asset) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    // Generate deterministic ETag based on length and filename
    const etag = `W/"${asset.buffer.length.toString(36)}-${cleanFilename}"`;
    const clientEtag = req.headers.get('if-none-match');

    // Return HTTP 304 Not Modified if browser/CDN has a matching cached asset
    if (clientEtag && clientEtag === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    return new NextResponse(new Uint8Array(asset.buffer), {
      status: 200,
      headers: {
        'Content-Type': asset.mimeType,
        'ETag': etag,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err: any) {
    console.error('[Media Serve GET error]:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
