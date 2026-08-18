import fs from 'fs/promises';
import path from 'path';
import { db } from '@/backend/db/client';
import portfolioService from '@/backend/services/portfolio/portfolio.service';

const PORTFOLIO_DIR = path.join(process.cwd(), 'public', 'portfolio');
const ALLOWED_EXTENSIONS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.avif']);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface MediaItem {
  filename: string;
  url: string;
  size: number;
  updatedAt: string;
  source: 'disk' | 'database';
}

class MediaService {
  private tableInitialized = false;

  /**
   * Automatically ensure MediaAsset table exists in Supabase PostgreSQL
   */
  private async ensureTable(): Promise<void> {
    if (this.tableInitialized) return;
    try {
      await db.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "MediaAsset" (
          "id" TEXT PRIMARY KEY,
          "filename" TEXT UNIQUE NOT NULL,
          "mimeType" TEXT NOT NULL,
          "size" INTEGER NOT NULL,
          "data" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS "idx_mediaasset_filename" ON "MediaAsset" ("filename");
      `);
      this.tableInitialized = true;
    } catch (err) {
      console.warn('[MediaService] Error ensuring MediaAsset table:', err);
    }
  }

  /**
   * Determine MIME type from file extension
   */
  public getMimeType(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
      case '.webp':
        return 'image/webp';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.svg':
        return 'image/svg+xml';
      case '.gif':
        return 'image/gif';
      case '.avif':
        return 'image/avif';
      default:
        return 'application/octet-stream';
    }
  }

  /**
   * Clean and sanitize target filename
   */
  public sanitizeFilename(originalName: string, customName?: string): string {
    const ext = path.extname(originalName).toLowerCase();
    const rawBase = customName && customName.trim() ? customName.trim() : originalName;
    const rawWithoutExt = path.extname(rawBase) ? path.basename(rawBase, path.extname(rawBase)) : rawBase;

    const cleanName = rawWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const safeBase = cleanName || 'portfolio-asset';
    return `${safeBase}${ext}`;
  }

  /**
   * List all media assets (merging static public/portfolio assets and PostgreSQL database-backed assets)
   */
  public async listAssets(): Promise<MediaItem[]> {
    await this.ensureTable();
    const assetMap = new Map<string, MediaItem>();

    // 1. Read files from disk if available
    try {
      const files = await fs.readdir(PORTFOLIO_DIR);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (ALLOWED_EXTENSIONS.has(ext)) {
          try {
            const filePath = path.join(PORTFOLIO_DIR, file);
            const stats = await fs.stat(filePath);
            assetMap.set(file, {
              filename: file,
              url: `/portfolio/${file}`,
              size: stats.size,
              updatedAt: stats.mtime.toISOString(),
              source: 'disk',
            });
          } catch {
            // Skip unreadable files
          }
        }
      }
    } catch {
      // Ignored if directory cannot be read
    }

    // 2. Query database-stored assets
    try {
      const dbAssets: any[] = await db.$queryRawUnsafe(`
        SELECT "filename", "size", "updatedAt" FROM "MediaAsset" ORDER BY "updatedAt" DESC
      `);

      for (const item of dbAssets) {
        if (!assetMap.has(item.filename)) {
          assetMap.set(item.filename, {
            filename: item.filename,
            url: `/portfolio/${item.filename}`,
            size: item.size,
            updatedAt: new Date(item.updatedAt).toISOString(),
            source: 'database',
          });
        }
      }
    } catch (err) {
      console.warn('[MediaService] DB query assets failed:', err);
    }

    const result = Array.from(assetMap.values());
    result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return result;
  }

  /**
   * Save an uploaded file: saves to disk when writable, and saves to Supabase PostgreSQL database
   */
  public async saveAsset(
    file: File,
    customName?: string,
    overwrite: boolean = false
  ): Promise<{ filename: string; url: string; size: number }> {
    await this.ensureTable();

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File exceeds maximum allowed size of 10MB (${(file.size / 1024 / 1024).toFixed(2)}MB).`);
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      throw new Error(`Unsupported file extension "${ext}". Supported: ${Array.from(ALLOWED_EXTENSIONS).join(', ')}`);
    }

    let targetFilename = this.sanitizeFilename(file.name, customName);

    // If overwrite is false, generate unique filename if already exists
    if (!overwrite) {
      const existing = await this.assetExists(targetFilename);
      if (existing) {
        let counter = 1;
        const baseName = path.basename(targetFilename, ext);
        while (true) {
          const testName = `${baseName}-${counter}${ext}`;
          const exists = await this.assetExists(testName);
          if (!exists) {
            targetFilename = testName;
            break;
          }
          counter++;
        }
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    const mimeType = this.getMimeType(targetFilename);

    // 1. Try to write to disk (for Localhost / persistent environments)
    try {
      try {
        await fs.access(PORTFOLIO_DIR);
      } catch {
        await fs.mkdir(PORTFOLIO_DIR, { recursive: true });
      }
      const targetFilePath = path.join(PORTFOLIO_DIR, targetFilename);
      await fs.writeFile(targetFilePath, buffer);
    } catch (diskErr: any) {
      console.log('[MediaService] Disk write not available (Vercel Serverless environment), saving to database only:', diskErr?.message);
    }

    // 2. Save/Upsert into PostgreSQL database
    const id = `media_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    await db.$executeRawUnsafe(
      `
      INSERT INTO "MediaAsset" ("id", "filename", "mimeType", "size", "data", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, NOW())
      ON CONFLICT ("filename") DO UPDATE SET
        "size" = EXCLUDED."size",
        "mimeType" = EXCLUDED."mimeType",
        "data" = EXCLUDED."data",
        "updatedAt" = NOW()
    `,
      id,
      targetFilename,
      mimeType,
      file.size,
      base64Data
    );

    return {
      filename: targetFilename,
      url: `/portfolio/${targetFilename}`,
      size: file.size,
    };
  }

  /**
   * Check if an asset exists on disk or in database
   */
  public async assetExists(filename: string): Promise<boolean> {
    // Check disk
    try {
      await fs.access(path.join(PORTFOLIO_DIR, filename));
      return true;
    } catch {
      // Check database
      try {
        const rows: any[] = await db.$queryRawUnsafe(
          `SELECT 1 FROM "MediaAsset" WHERE "filename" = $1 LIMIT 1`,
          filename
        );
        return rows.length > 0;
      } catch {
        return false;
      }
    }
  }

  /**
   * Get raw Buffer and MIME type of an asset (serving from disk or decoding from DB)
   */
  public async getAssetBuffer(filename: string): Promise<{ buffer: Buffer; mimeType: string } | null> {
    const cleanFilename = path.basename(filename);

    // 1. Try disk
    try {
      const diskPath = path.join(PORTFOLIO_DIR, cleanFilename);
      const buffer = await fs.readFile(diskPath);
      return {
        buffer,
        mimeType: this.getMimeType(cleanFilename),
      };
    } catch {
      // 2. Try database
      await this.ensureTable();
      try {
        const rows: any[] = await db.$queryRawUnsafe(
          `SELECT "data", "mimeType" FROM "MediaAsset" WHERE "filename" = $1 LIMIT 1`,
          cleanFilename
        );
        if (rows.length > 0 && rows[0].data) {
          const buffer = Buffer.from(rows[0].data, 'base64');
          return {
            buffer,
            mimeType: rows[0].mimeType || this.getMimeType(cleanFilename),
          };
        }
      } catch (err) {
        console.warn('[MediaService] DB get asset failed:', err);
      }
    }

    return null;
  }

  /**
   * Delete an asset from disk and database
   */
  public async deleteAsset(filename: string): Promise<void> {
    await this.ensureTable();
    const cleanFilename = path.basename(filename);

    // 1. Delete from disk
    try {
      const diskPath = path.join(PORTFOLIO_DIR, cleanFilename);
      await fs.unlink(diskPath);
    } catch {
      // Disk deletion ignored
    }

    // 2. Delete from database
    try {
      await db.$executeRawUnsafe(`DELETE FROM "MediaAsset" WHERE "filename" = $1`, cleanFilename);
    } catch (err) {
      console.warn('[MediaService] DB delete asset error:', err);
    }
  }

  /**
   * Rename an asset and cascade rename everywhere across database projects
   */
  public async renameAsset(oldFilename: string, newFilenameInput: string): Promise<{ filename: string; affectedCount: number }> {
    await this.ensureTable();
    const oldBase = path.basename(oldFilename);
    const cleanNewName = this.sanitizeFilename(oldBase, newFilenameInput);

    if (oldBase === cleanNewName) {
      return { filename: cleanNewName, affectedCount: 0 };
    }

    // 1. Rename on disk
    try {
      const oldPath = path.join(PORTFOLIO_DIR, oldBase);
      const newPath = path.join(PORTFOLIO_DIR, cleanNewName);
      await fs.rename(oldPath, newPath);
    } catch {
      // Disk rename ignored on read-only environments
    }

    // 2. Rename in database MediaAsset table
    try {
      const mimeType = this.getMimeType(cleanNewName);
      await db.$executeRawUnsafe(
        `UPDATE "MediaAsset" SET "filename" = $1, "mimeType" = $2, "updatedAt" = NOW() WHERE "filename" = $3`,
        cleanNewName,
        mimeType,
        oldBase
      );
    } catch (err) {
      console.warn('[MediaService] DB rename asset error:', err);
    }

    // 3. Cascade rename across all portfolio projects in Supabase
    const oldUrl = `/portfolio/${oldBase}`;
    const newUrl = `/portfolio/${cleanNewName}`;
    const { affectedCount } = await portfolioService.cascadeRenameImage(oldUrl, newUrl);

    return {
      filename: cleanNewName,
      affectedCount,
    };
  }
}

export const mediaService = new MediaService();
export default mediaService;
