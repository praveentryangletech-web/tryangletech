import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/backend/services/auth/auth.utils';
import { AdminUserDTO } from '@/backend/services/auth/auth.types';

export interface AuthResult {
  authenticated: boolean;
  user?: AdminUserDTO;
  error?: string;
}

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

/**
 * Validate Superadmin authentication from HTTP request
 * Checks:
 * 1. HMAC-SHA256 session cookie ('superadmin_session')
 * 2. Authorization Bearer header ('Authorization: Bearer <jwt_token>')
 * 3. Administrative security key header ('x-admin-key')
 */
export function verifySuperadminAuth(req: NextRequest): AuthResult {
  // 1. Check administrative security key (Service-to-Service / CLI)
  const headerKey = req.headers.get('x-admin-key');
  if (ADMIN_API_KEY && headerKey && headerKey === ADMIN_API_KEY) {
    return {
      authenticated: true,
      user: {
        id: 'admin_api_key_system',
        email: 'system@tryangletech.com',
        name: 'System Admin (API Key)',
        role: 'SUPERADMIN',
      },
    };
  }

  // 2. Check Authorization Bearer Token
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const verification = verifySessionToken(token);
    if (verification.valid && verification.user) {
      return {
        authenticated: true,
        user: verification.user,
      };
    }
  }

  // 3. Check HttpOnly Session Cookie
  const cookieToken = req.cookies.get('superadmin_session')?.value;
  if (cookieToken) {
    const verification = verifySessionToken(cookieToken);
    if (verification.valid && verification.user) {
      return {
        authenticated: true,
        user: verification.user,
      };
    }
  }

  return {
    authenticated: false,
    error: 'Unauthorized: Valid Superadmin credentials or session token required.',
  };
}

/**
 * Guard helper that returns a 401 Unauthorized NextResponse if the caller is not an authenticated Superadmin.
 * Returns null if authenticated, allowing the handler to proceed.
 */
export function requireSuperadmin(req: NextRequest): NextResponse | null {
  const auth = verifySuperadminAuth(req);
  if (!auth.authenticated) {
    return NextResponse.json(
      {
        success: false,
        error: auth.error || 'Unauthorized. Superadmin access required.',
      },
      {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Bearer realm="Superadmin Control Center"',
        },
      }
    );
  }
  return null;
}
