import { NextRequest, NextResponse } from 'next/server';
import { 
  authService, 
  validateLoginInput, 
  checkLoginRateLimit, 
  recordFailedLogin, 
  clearLoginAttempts 
} from '@/backend/services/auth';

export const dynamic = 'force-dynamic';

/**
 * POST /api/superadmin/auth
 * Hardened Superadmin Login Endpoint with:
 *  - SQL Injection Detection & Neutralization
 *  - Rate Limiting (5 failed attempts -> 15 min lockout)
 *  - Parameterized Database Query Execution
 *  - Constant-time password hashing & verification
 *  - Secure HttpOnly session cookie creation
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Extract client IP for rate limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    // 2. Validate input and check for SQL injection patterns
    const validation = validateLoginInput(body);
    if (!validation.valid || !validation.email || !validation.password) {
      return NextResponse.json(
        { success: false, error: validation.error || 'Invalid credentials provided.' },
        { status: 400 }
      );
    }

    const { email, password } = validation;
    const rateLimitKey = `${clientIp}:${email}`;

    // 3. Check rate limiting bounds
    const rateLimit = checkLoginRateLimit(rateLimitKey);
    if (!rateLimit.allowed) {
      const minutes = Math.ceil((rateLimit.retryAfterSeconds || 900) / 60);
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Account temporarily locked for security. Please retry in ${minutes} minutes.`,
        },
        { 
          status: 429,
          headers: {
            'Retry-After': (rateLimit.retryAfterSeconds || 900).toString(),
          }
        }
      );
    }

    // 4. Validate credentials against PostgreSQL via parameterized query
    const result = await authService.validateCredentials(email, password);

    if (!result.success || !result.user) {
      // Record failed attempt
      const failRecord = recordFailedLogin(rateLimitKey);
      
      if (failRecord.locked) {
        return NextResponse.json(
          {
            success: false,
            error: 'Maximum login attempts exceeded. Your IP is locked for 15 minutes.',
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Invalid email or password.',
        },
        { status: 401 }
      );
    }

    // 5. Successful Login -> Clear any rate-limiting strikes
    clearLoginAttempts(rateLimitKey);

    // 6. Generate cryptographic HMAC-SHA256 session token
    const token = authService.createSessionToken(result.user);

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: result.user,
    });

    // 7. Set secure HTTP-only cookie
    response.cookies.set('superadmin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Superadmin Auth Login Error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/superadmin/auth
 * Session Verification Endpoint
 */
export async function GET(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get('superadmin_session')?.value;
    const headerToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || req.headers.get('x-admin-token');
    const token = cookieToken || headerToken;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const verification = authService.verifySessionToken(token);

    if (!verification.valid || !verification.user) {
      return NextResponse.json({ authenticated: false, error: 'Session expired.' }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: verification.user,
    });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

/**
 * DELETE /api/superadmin/auth
 * Superadmin Logout Endpoint
 */
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.delete('superadmin_session');
  return response;
}
