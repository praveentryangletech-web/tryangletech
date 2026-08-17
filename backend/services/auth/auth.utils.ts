import crypto from 'crypto';
import { AdminUserDTO, SessionTokenPayload } from './auth.types';

const JWT_SECRET = process.env.SUPERADMIN_JWT_SECRET || 'tryangle_jwt_superadmin_secret_key_88492019';

/**
 * Hash password using crypto scrypt with random 16-byte salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

/**
 * Verify password against stored hash (or fallback plain text for initial seed)
 */
export function verifyPassword(password: string, storedHash: string): boolean {
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

/**
 * Create a signed JWT session token (7-day validity)
 */
export function createSessionToken(user: AdminUserDTO): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({
      sub: user.email,
      name: user.name,
      role: user.role,
      iat: now,
      exp: now + 60 * 60 * 24 * 7,
    })
  ).toString('base64url');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

/**
 * Verify session token and return user payload
 */
export function verifySessionToken(token: string): { valid: boolean; user?: AdminUserDTO } {
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
    const decodedPayload: SessionTokenPayload = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf-8')
    );
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
}
