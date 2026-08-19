import { NextRequest, NextResponse } from 'next/server';
import { contactService } from '@/backend/services/contact';
import { requireSuperadmin } from '@/backend/utils/authGuard';
import { enforceRateLimit } from '@/backend/utils/rateLimiter';
import { validateInteger } from '@/backend/utils/sqlSecurity';

export const dynamic = 'force-dynamic';

/**
 * POST /api/contact
 * Public Contact Form Submission (Protected with anti-spam rate limiting)
 */
export async function POST(req: NextRequest) {
  // Enforce rate limiting: max 5 submissions per 10 minutes per IP
  const rateLimitError = enforceRateLimit(req, 'contact_submission', 5, 10 * 60 * 1000);
  if (rateLimitError) return rateLimitError;

  try {
    const body = await req.json();
    const submission = await contactService.createSubmission(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your submission has been received.',
        id: submission.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API /api/contact error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to submit contact form.',
      },
      { status: 400 }
    );
  }
}

/**
 * GET /api/contact
 * List contact submissions (Requires Superadmin)
 */
export async function GET(req: NextRequest) {
  const authError = requireSuperadmin(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const limit = validateInteger(searchParams.get('limit'), 50, 1, 500);

    const submissions = await contactService.getSubmissions(limit);

    return NextResponse.json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error: any) {
    console.error('API /api/contact GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve inquiries.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/contact
 * Update inquiry status (Requires Superadmin)
 */
export async function PATCH(req: NextRequest) {
  const authError = requireSuperadmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID and status are required.' },
        { status: 400 }
      );
    }

    const updated = await contactService.updateStatus(id, status);

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: updated,
    });
  } catch (error: any) {
    console.error('API /api/contact PATCH error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update submission status.' },
      { status: 500 }
    );
  }
}
