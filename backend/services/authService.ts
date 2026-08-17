import crypto from 'crypto';
import db from '@/backend/db/client';

const DEFAULT_EMAIL = 'admin@tryangletech.com';
const DEFAULT_PASSWORD = 'tryangle_secure_admin_2026';
const JWT_SECRET = process.env.SUPERADMIN_JWT_SECRET || 'tryangle_jwt_superadmin_secret_key_88492019';

export interface AdminUserDTO {
  email: string;
  name: string;
  role: string;
}

interface AdminUserRecord {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

/**
 * Hash password using crypto scrypt with random salt
 */
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Verify password against stored hash (or fallback plain text for initial seed)
 */
function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;

  // Support salt:hash format
  if (storedHash.includes(':')) {
    const [salt, key] = storedHash.split(':');
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  }

  // Plain text fallback
  return password === storedHash;
}

export const authService = {
  /**
   * Ensure default Superadmin exists in Supabase PostgreSQL database using Prisma
   */
  async ensureSuperadminExists() {
    try {
      const email = (process.env.SUPERADMIN_EMAIL || DEFAULT_EMAIL).trim().toLowerCase();
      const rawPassword = (process.env.SUPERADMIN_PASSWORD || DEFAULT_PASSWORD).trim();

      // 1. Try standard Prisma ORM model delegate
      if (typeof (db as any).adminUser?.findUnique === 'function') {
        const existing = await (db as any).adminUser.findUnique({
          where: { email },
        });

        if (!existing) {
          await (db as any).adminUser.create({
            data: {
              id: crypto.randomUUID(),
              email,
              password: hashPassword(rawPassword),
              name: 'Praveen Gupta',
              role: 'SUPERADMIN',
            },
          });
          console.log(`[Prisma Auth] Superadmin account seeded in PostgreSQL for: ${email}`);
        }
      } else {
        // 2. Direct Prisma raw query fallback
        const rows = await db.$queryRaw<AdminUserRecord[]>`
          SELECT "id", "email", "password", "name", "role" 
          FROM "AdminUser" 
          WHERE LOWER("email") = LOWER(${email}) 
          LIMIT 1
        `;

        if (!rows || rows.length === 0) {
          const id = crypto.randomUUID();
          const hashedPassword = hashPassword(rawPassword);
          await db.$executeRaw`
            INSERT INTO "AdminUser" ("id", "email", "password", "name", "role", "createdAt", "updatedAt")
            VALUES (${id}, ${email}, ${hashedPassword}, 'Praveen Gupta', 'SUPERADMIN', NOW(), NOW())
          `;
          console.log(`[Prisma Auth] Superadmin account seeded in PostgreSQL for: ${email}`);
        }
      }
    } catch (err) {
      console.error('[Prisma Auth] ensureSuperadminExists warning:', err);
    }
  },

  /**
   * Validate Superadmin login credentials directly against PostgreSQL database
   */
  async validateCredentials(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: AdminUserDTO; error?: string }> {
    const inputEmail = email?.trim().toLowerCase();
    const inputPassword = password?.trim();

    if (!inputEmail || !inputPassword) {
      return { success: false, error: 'Email and password are required.' };
    }

    try {
      // 1. Ensure superadmin record is initialized from .env if table is empty
      await this.ensureSuperadminExists();

      let user: AdminUserRecord | null = null;

      // 2. Query admin user from Supabase PostgreSQL
      if (typeof (db as any).adminUser?.findUnique === 'function') {
        user = await (db as any).adminUser.findUnique({
          where: { email: inputEmail },
        });
      } else {
        const rows = await db.$queryRaw<AdminUserRecord[]>`
          SELECT "id", "email", "password", "name", "role" 
          FROM "AdminUser" 
          WHERE LOWER("email") = LOWER(${inputEmail}) 
          LIMIT 1
        `;
        user = rows && rows.length > 0 ? rows[0] : null;
      }

      if (!user) {
        return { success: false, error: 'Invalid email address or password.' };
      }

      // 3. Verify hashed password from DB
      const isPasswordValid = verifyPassword(inputPassword, user.password);

      if (!isPasswordValid) {
        return { success: false, error: 'Invalid email address or password.' };
      }

      // 4. If password was stored in plain text, auto-upgrade to scrypt hash in DB
      if (!user.password.includes(':')) {
        try {
          const newHash = hashPassword(inputPassword);
          if (typeof (db as any).adminUser?.update === 'function') {
            await (db as any).adminUser.update({
              where: { id: user.id },
              data: { password: newHash },
            });
          } else {
            await db.$executeRaw`
              UPDATE "AdminUser" 
              SET "password" = ${newHash}, "updatedAt" = NOW() 
              WHERE "id" = ${user.id}
            `;
          }
        } catch {
          // Non-blocking hash upgrade
        }
      }

      return {
        success: true,
        user: {
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error: any) {
      console.error('[Prisma Auth] validateCredentials error:', error);
      return { success: false, error: 'Database authentication error. Please try again.' };
    }
  },

  /**
   * Create a signed JWT session token
   */
  createSessionToken(user: AdminUserDTO): string {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const now = Math.floor(Date.now() / 1000);
    const payload = Buffer.from(
      JSON.stringify({
        sub: user.email,
        name: user.name,
        role: user.role,
        iat: now,
        exp: now + 60 * 60 * 24 * 7, // 7 days session
      })
    ).toString('base64url');

    const signature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    return `${header}.${payload}.${signature}`;
  },

  /**
   * Verify session token and return user payload
   */
  verifySessionToken(token: string): { valid: boolean; user?: AdminUserDTO } {
    if (!token || typeof token !== 'string') {
      return { valid: false };
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false };
    }

    const [header, payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return { valid: false };
    }

    try {
      const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
      const now = Math.floor(Date.now() / 1000);

      if (decodedPayload.exp && decodedPayload.exp < now) {
        return { valid: false };
      }

      return {
        valid: true,
        user: {
          email: decodedPayload.sub,
          name: decodedPayload.name,
          role: decodedPayload.role,
        },
      };
    } catch {
      return { valid: false };
    }
  },
};
