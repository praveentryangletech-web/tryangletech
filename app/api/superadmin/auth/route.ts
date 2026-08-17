import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/backend/services/authService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const result = await authService.validateCredentials(email, password);

    if (!result.success || !result.user) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Invalid email or password.',
        },
        { status: 401 }
      );
    }

    const token = authService.createSessionToken(result.user);

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: result.user,
    });

    // Set secure HTTP-only cookie
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

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.delete('superadmin_session');
  return response;
}
