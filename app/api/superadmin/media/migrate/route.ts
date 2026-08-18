import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import mediaService from '@/backend/services/media/media.service';

export const dynamic = 'force-dynamic';

const PORTFOLIO_DIR = path.join(process.cwd(), 'public', 'portfolio');
const ALLOWED_EXTENSIONS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.avif']);

/**
 * POST /api/superadmin/media/migrate
 * Migrates all local public/portfolio files into Cloudinary
 */
export async function POST() {
  try {
    if (!mediaService.isCloudinaryConfigured) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing from environment variables.',
        },
        { status: 400 }
      );
    }

    const files = await fs.readdir(PORTFOLIO_DIR);
    const results: { filename: string; status: 'uploaded' | 'failed'; url?: string; error?: string }[] = [];

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (ALLOWED_EXTENSIONS.has(ext)) {
        try {
          const filePath = path.join(PORTFOLIO_DIR, file);
          const fileBuffer = await fs.readFile(filePath);
          const blob = new Blob([new Uint8Array(fileBuffer)], { type: mediaService.getMimeType(file) });
          const fileObj = new File([blob], file, { type: mediaService.getMimeType(file) });

          const saved = await mediaService.saveAsset(fileObj, path.basename(file, ext), true);
          results.push({ filename: file, status: 'uploaded', url: saved.url });
        } catch (err: any) {
          results.push({ filename: file, status: 'failed', error: err?.message || 'Upload error' });
        }
      }
    }

    const successful = results.filter((r) => r.status === 'uploaded').length;
    const failed = results.filter((r) => r.status === 'failed').length;

    return NextResponse.json({
      success: true,
      message: `Migration completed: ${successful} image(s) uploaded to Cloudinary, ${failed} failed.`,
      total: results.length,
      successful,
      failed,
      results,
    });
  } catch (err: any) {
    console.error('[Media Migrate API error]:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Migration process failed.' },
      { status: 500 }
    );
  }
}
