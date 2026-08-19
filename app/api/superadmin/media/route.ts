import { NextRequest, NextResponse } from 'next/server';
import mediaService from '@/backend/services/media/media.service';
import { requireSuperadmin } from '@/backend/utils/authGuard';

export const dynamic = 'force-dynamic';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'image/avif',
  'image/x-icon',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * GET /api/superadmin/media
 * Lists all assets (Requires Superadmin)
 */
export async function GET(req: NextRequest) {
  const authError = requireSuperadmin(req);
  if (authError) return authError;

  try {
    const mediaList = await mediaService.listAssets();

    return NextResponse.json({
      success: true,
      data: mediaList,
      count: mediaList.length,
    });
  } catch (err: any) {
    console.error('[Media API GET error]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to list media assets.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/superadmin/media
 * Stores uploaded image file (Requires Superadmin)
 */
export async function POST(req: NextRequest) {
  const authError = requireSuperadmin(req);
  if (authError) return authError;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in form data.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds maximum allowed limit of 10MB.' },
        { status: 400 }
      );
    }

    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported file type. Only images (PNG, JPG, WebP, SVG, GIF, AVIF) are allowed.' },
        { status: 400 }
      );
    }

    const customName =
      (formData.get('customName') as string | null) ||
      (formData.get('filename') as string | null) ||
      undefined;

    const overwrite = formData.get('overwrite') === 'true';

    const savedAsset = await mediaService.saveAsset(file, customName, overwrite);

    return NextResponse.json({
      success: true,
      message: 'Asset uploaded and stored successfully.',
      url: savedAsset.url,
      filename: savedAsset.filename,
      size: savedAsset.size,
    });
  } catch (err: any) {
    console.error('[Media API POST error]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to store image in assets.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/superadmin/media
 * Deletes an asset from disk and Supabase PostgreSQL (Requires Superadmin)
 */
export async function DELETE(req: NextRequest) {
  const authError = requireSuperadmin(req);
  if (authError) return authError;

  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    const target = body.filename || body.path || body.url;
    if (!target || typeof target !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Filename or path is required for deletion.' },
        { status: 400 }
      );
    }

    await mediaService.deleteAsset(target);

    return NextResponse.json({
      success: true,
      message: `Asset "${target}" deleted successfully.`,
      filename: target,
    });
  } catch (err: any) {
    console.error('[Media API DELETE error]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to delete asset.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/superadmin/media
 * Renames an image in storage AND cascades the rename to all database portfolio projects (Requires Superadmin)
 */
export async function PATCH(req: NextRequest) {
  const authError = requireSuperadmin(req);
  if (authError) return authError;

  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
    }

    const { oldFilename, newFilename } = body;
    if (!oldFilename || !newFilename) {
      return NextResponse.json(
        { success: false, error: 'Both oldFilename and newFilename are required.' },
        { status: 400 }
      );
    }

    const { filename: cleanNewName, affectedCount } = await mediaService.renameAsset(
      oldFilename,
      newFilename
    );

    const oldUrl = `/portfolio/${oldFilename}`;
    const newUrl = `/portfolio/${cleanNewName}`;

    return NextResponse.json({
      success: true,
      message: `Asset successfully renamed to "${cleanNewName}" and cascaded across ${affectedCount} project(s).`,
      filename: cleanNewName,
      oldUrl,
      newUrl,
      affectedProjects: affectedCount,
    });
  } catch (err: any) {
    console.error('[Media API PATCH error]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to rename asset.' },
      { status: 500 }
    );
  }
}
