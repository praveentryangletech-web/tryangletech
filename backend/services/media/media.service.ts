import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { db } from '@/backend/db/client';
import portfolioService from '@/backend/services/portfolio/portfolio.service';

const PORTFOLIO_DIR = path.join(process.cwd(), 'public', 'portfolio');
const ALLOWED_EXTENSIONS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.avif']);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const CLOUDINARY_FOLDER = 'tryangletech/portfolio';

export type StorageDriver = 'cloudinary' | 'local' | 'database' | 'hybrid';

export interface MediaItem {
  filename: string;
  url: string;
  size: number;
  updatedAt: string;
  source: 'cloudinary' | 'disk' | 'database';
}

class MediaService {
  private tableInitialized = false;

  /**
   * Active media storage driver configured via environment variable MEDIA_STORAGE_DRIVER
   * Options: 'cloudinary' | 'local' | 'database' | 'hybrid' (default)
   */
  public get storageDriver(): StorageDriver {
    const raw = (process.env.MEDIA_STORAGE_DRIVER || 'hybrid').toLowerCase().trim();
    if (raw === 'cloudinary' || raw === 'local' || raw === 'database') {
      return raw;
    }
    return 'hybrid';
  }

  private get cloudName(): string {
    return process.env.CLOUDINARY_CLOUD_NAME || '';
  }

  private get apiKey(): string {
    return process.env.CLOUDINARY_API_KEY || '';
  }

  private get apiSecret(): string {
    return process.env.CLOUDINARY_API_SECRET || '';
  }

  public get isCloudinaryConfigured(): boolean {
    return Boolean(this.cloudName && this.apiKey && this.apiSecret);
  }

  /**
   * Generates SHA-1 signature for Cloudinary API requests
   */
  private generateSignature(params: Record<string, any>): string {
    const sortedKeys = Object.keys(params).sort();
    const stringToSign = sortedKeys
      .map((key) => `${key}=${params[key]}`)
      .join('&') + this.apiSecret;

    return crypto.createHash('sha1').update(stringToSign).digest('hex');
  }

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
        )
      `);

      try {
        await db.$executeRawUnsafe(`
          CREATE INDEX IF NOT EXISTS "idx_mediaasset_filename" ON "MediaAsset" ("filename")
        `);
      } catch {
        // Index is non-blocking
      }

      this.tableInitialized = true;
    } catch (err) {
      console.warn('[MediaService] DB ensureTable warning:', err);
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
   * Uploads file buffer directly to Cloudinary via REST API
   */
  private async uploadToCloudinary(
    buffer: Buffer,
    filename: string,
    mimeType: string
  ): Promise<{ secure_url: string; public_id: string; bytes: number }> {
    if (!this.isCloudinaryConfigured) {
      throw new Error('Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured in environment variables.');
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const baseName = path.basename(filename, path.extname(filename));

    const signParams: Record<string, any> = {
      folder: CLOUDINARY_FOLDER,
      overwrite: 'true',
      public_id: baseName,
      timestamp: timestamp.toString(),
    };

    const signature = this.generateSignature(signParams);

    const formData = new FormData();
    const blob = new Blob([new Uint8Array(buffer)], { type: mimeType });
    formData.append('file', blob, filename);
    formData.append('api_key', this.apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('folder', CLOUDINARY_FOLDER);
    formData.append('public_id', baseName);
    formData.append('overwrite', 'true');

    const res = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error?.message || 'Cloudinary upload failed.');
    }

    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      bytes: data.bytes || buffer.length,
    };
  }

  /**
   * Delete asset from Cloudinary
   */
  private async deleteFromCloudinary(filenameOrPublicId: string): Promise<void> {
    if (!this.isCloudinaryConfigured) return;
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const baseName = path.basename(filenameOrPublicId, path.extname(filenameOrPublicId));
      const publicId = filenameOrPublicId.includes('/') ? filenameOrPublicId : `${CLOUDINARY_FOLDER}/${baseName}`;

      const signParams: Record<string, any> = {
        public_id: publicId,
        timestamp: timestamp.toString(),
      };

      const signature = this.generateSignature(signParams);

      const formData = new FormData();
      formData.append('public_id', publicId);
      formData.append('api_key', this.apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);

      await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/destroy`, {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.warn('[MediaService] Cloudinary destroy error:', err);
    }
  }

  /**
   * List all media assets based on configured MEDIA_STORAGE_DRIVER
   */
  public async listAssets(): Promise<MediaItem[]> {
    const driver = this.storageDriver;
    const assetMap = new Map<string, MediaItem>();

    // 1. Cloudinary Assets (if driver is 'cloudinary' or 'hybrid')
    if ((driver === 'cloudinary' || driver === 'hybrid') && this.isCloudinaryConfigured) {
      try {
        const authString = Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64');
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${this.cloudName}/resources/image/upload?prefix=${CLOUDINARY_FOLDER}&max_results=500`,
          {
            headers: {
              Authorization: `Basic ${authString}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (data.resources && Array.isArray(data.resources)) {
            for (const resItem of data.resources) {
              const rawPublicId = resItem.public_id || '';
              const filename = `${path.basename(rawPublicId)}.${resItem.format || 'png'}`;
              assetMap.set(filename, {
                filename,
                url: resItem.secure_url,
                size: resItem.bytes || 0,
                updatedAt: resItem.created_at || new Date().toISOString(),
                source: 'cloudinary',
              });
            }
          }
        }
      } catch (err) {
        console.warn('[MediaService] Cloudinary listing failed, fallback to local/db:', err);
      }
    }

    // 2. Local Disk Assets (public/portfolio)
    if (driver === 'local' || driver === 'hybrid' || driver === 'cloudinary' || driver === 'database') {
      try {
        const files = await fs.readdir(PORTFOLIO_DIR);
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (ALLOWED_EXTENSIONS.has(ext)) {
            try {
              const filePath = path.join(PORTFOLIO_DIR, file);
              const stats = await fs.stat(filePath);
              if (!assetMap.has(file)) {
                assetMap.set(file, {
                  filename: file,
                  url: `/portfolio/${file}`,
                  size: stats.size,
                  updatedAt: stats.mtime.toISOString(),
                  source: 'disk',
                });
              }
            } catch {
              // Skip unreadable files
            }
          }
        }
      } catch {
        // Disk read ignored if not available
      }
    }

    // 3. Database Assets (if driver is 'database' or 'hybrid')
    if (driver === 'database' || driver === 'hybrid') {
      await this.ensureTable();
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
    }

    const result = Array.from(assetMap.values());
    result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return result;
  }

  /**
   * Save an uploaded file based on active MEDIA_STORAGE_DRIVER ('cloudinary' | 'local' | 'database' | 'hybrid')
   */
  public async saveAsset(
    file: File,
    customName?: string,
    overwrite: boolean = false
  ): Promise<{ filename: string; url: string; size: number }> {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File exceeds maximum allowed size of 10MB (${(file.size / 1024 / 1024).toFixed(2)}MB).`);
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      throw new Error(`Unsupported file extension "${ext}". Supported: ${Array.from(ALLOWED_EXTENSIONS).join(', ')}`);
    }

    let targetFilename = this.sanitizeFilename(file.name, customName);

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
    const mimeType = this.getMimeType(targetFilename);
    const base64Data = buffer.toString('base64');
    const driver = this.storageDriver;

    // ----------------------------------------------------
    // MODE 1: CLOUDINARY EXCLUSIVE
    // ----------------------------------------------------
    if (driver === 'cloudinary') {
      if (!this.isCloudinaryConfigured) {
        throw new Error('MEDIA_STORAGE_DRIVER is set to "cloudinary", but CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET is missing.');
      }
      const cloudResult = await this.uploadToCloudinary(buffer, targetFilename, mimeType);
      
      // Dual-write to disk if writable (e.g. VPS)
      try {
        await fs.writeFile(path.join(PORTFOLIO_DIR, targetFilename), buffer);
      } catch {}

      return {
        filename: targetFilename,
        url: cloudResult.secure_url,
        size: file.size,
      };
    }

    // ----------------------------------------------------
    // MODE 2: LOCAL DISK EXCLUSIVE (Localhost / VPS)
    // ----------------------------------------------------
    if (driver === 'local') {
      try {
        try {
          await fs.access(PORTFOLIO_DIR);
        } catch {
          await fs.mkdir(PORTFOLIO_DIR, { recursive: true });
        }
        const targetFilePath = path.join(PORTFOLIO_DIR, targetFilename);
        await fs.writeFile(targetFilePath, buffer);

        return {
          filename: targetFilename,
          url: `/portfolio/${targetFilename}`,
          size: file.size,
        };
      } catch (err: any) {
        throw new Error(`Failed to write file to local disk (public/portfolio). If running on serverless (Vercel), set MEDIA_STORAGE_DRIVER="cloudinary" or "database" in .env. Details: ${err?.message}`);
      }
    }

    // ----------------------------------------------------
    // MODE 3: DATABASE EXCLUSIVE (Supabase PostgreSQL)
    // ----------------------------------------------------
    if (driver === 'database') {
      await this.ensureTable();
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

    // ----------------------------------------------------
    // MODE 4: HYBRID (Default & Recommended)
    // ----------------------------------------------------
    let finalUrl = `/portfolio/${targetFilename}`;

    // 1. Try Cloudinary if credentials exist
    if (this.isCloudinaryConfigured) {
      try {
        const cloudResult = await this.uploadToCloudinary(buffer, targetFilename, mimeType);
        if (cloudResult.secure_url) {
          finalUrl = cloudResult.secure_url;
        }
      } catch (cloudErr: any) {
        console.warn('[MediaService] Hybrid Cloudinary upload warning:', cloudErr?.message);
      }
    }

    // 2. Write to local disk if writable (Localhost & VPS)
    try {
      try {
        await fs.access(PORTFOLIO_DIR);
      } catch {
        await fs.mkdir(PORTFOLIO_DIR, { recursive: true });
      }
      const targetFilePath = path.join(PORTFOLIO_DIR, targetFilename);
      await fs.writeFile(targetFilePath, buffer);
    } catch {
      // Ignore read-only errors on serverless
    }

    // 3. Save to Supabase PostgreSQL database
    try {
      await this.ensureTable();
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
    } catch (dbErr) {
      console.warn('[MediaService] Hybrid DB save warning:', dbErr);
    }

    return {
      filename: targetFilename,
      url: finalUrl,
      size: file.size,
    };
  }

  /**
   * Check if an asset exists
   */
  public async assetExists(filename: string): Promise<boolean> {
    try {
      await fs.access(path.join(PORTFOLIO_DIR, filename));
      return true;
    } catch {
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
   * Get raw Buffer and MIME type of an asset
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
   * Delete an asset from Cloudinary, disk, and database
   */
  public async deleteAsset(filename: string): Promise<void> {
    const cleanFilename = path.basename(filename);

    // 1. Delete from Cloudinary
    if (this.isCloudinaryConfigured) {
      await this.deleteFromCloudinary(cleanFilename);
    }

    // 2. Delete from disk
    try {
      const diskPath = path.join(PORTFOLIO_DIR, cleanFilename);
      await fs.unlink(diskPath);
    } catch {
      // Disk deletion ignored
    }

    // 3. Delete from database
    try {
      await this.ensureTable();
      await db.$executeRawUnsafe(`DELETE FROM "MediaAsset" WHERE "filename" = $1`, cleanFilename);
    } catch (err) {
      console.warn('[MediaService] DB delete asset error:', err);
    }
  }

  /**
   * Rename an asset and cascade rename everywhere across database projects
   */
  public async renameAsset(oldFilename: string, newFilenameInput: string): Promise<{ filename: string; affectedCount: number }> {
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
      await this.ensureTable();
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
