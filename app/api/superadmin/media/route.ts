import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const PORTFOLIO_DIR = path.join(process.cwd(), 'public', 'portfolio');
const ALLOWED_EXTENSIONS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.avif']);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Sanitize filename to ensure safe alphanumeric naming with no path traversal
 */
function sanitizeFilename(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase();
  const nameWithoutExt = path.basename(originalName, ext);
  const cleanName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const safeBase = cleanName || 'portfolio-asset';
  return `${safeBase}-${Date.now()}${ext}`;
}

/**
 * Ensure public/portfolio directory exists
 */
async function ensureDirectoryExists(): Promise<void> {
  try {
    await fs.access(PORTFOLIO_DIR);
  } catch {
    await fs.mkdir(PORTFOLIO_DIR, { recursive: true });
  }
}

/**
 * GET /api/superadmin/media
 * Lists all assets present in public/portfolio with metadata
 */
export async function GET() {
  try {
    await ensureDirectoryExists();
    const files = await fs.readdir(PORTFOLIO_DIR);
    
    const mediaList = await Promise.all(
      files
        .filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return ALLOWED_EXTENSIONS.has(ext);
        })
        .map(async (file) => {
          const filePath = path.join(PORTFOLIO_DIR, file);
          const stats = await fs.stat(filePath);
          return {
            filename: file,
            url: `/portfolio/${file}`,
            size: stats.size,
            updatedAt: stats.mtime.toISOString(),
          };
        })
    );

    // Sort newest first
    mediaList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

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
 * Directly stores uploaded image file into public/portfolio
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDirectoryExists();

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
        { success: false, error: `File exceeds maximum allowed size of 10MB (${(file.size / 1024 / 1024).toFixed(2)}MB).` },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file extension "${ext}". Supported formats: ${Array.from(ALLOWED_EXTENSIONS).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Generate safe unique filename
    const safeFilename = sanitizeFilename(file.name);
    const targetFilePath = path.join(PORTFOLIO_DIR, safeFilename);

    // Convert file to Buffer and write directly to disk
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(targetFilePath, buffer);

    const publicUrl = `/portfolio/${safeFilename}`;

    return NextResponse.json({
      success: true,
      message: 'Asset uploaded and stored in public/portfolio successfully.',
      url: publicUrl,
      filename: safeFilename,
      size: file.size,
    });
  } catch (err: any) {
    console.error('[Media API POST error]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to store image in public assets.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/superadmin/media
 * Directly deletes an asset from public/portfolio
 */
export async function DELETE(req: NextRequest) {
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

    // Extract raw base filename and strictly prevent path traversal
    const baseFilename = path.basename(target);
    const resolvedPath = path.resolve(PORTFOLIO_DIR, baseFilename);

    // Security check: Must reside within PORTFOLIO_DIR
    if (!resolvedPath.startsWith(PORTFOLIO_DIR)) {
      return NextResponse.json(
        { success: false, error: 'Security violation: Unauthorized path access.' },
        { status: 403 }
      );
    }

    // Check if file exists
    try {
      await fs.access(resolvedPath);
    } catch {
      return NextResponse.json(
        { success: false, error: `File "${baseFilename}" does not exist in public/portfolio.` },
        { status: 404 }
      );
    }

    // Remove file from disk
    await fs.unlink(resolvedPath);

    return NextResponse.json({
      success: true,
      message: `Asset "${baseFilename}" permanently deleted from public/portfolio.`,
      filename: baseFilename,
    });
  } catch (err: any) {
    console.error('[Media API DELETE error]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to delete asset from disk.' },
      { status: 500 }
    );
  }
}
