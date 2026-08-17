import { NextRequest, NextResponse } from 'next/server';
import { contactService } from '@/backend/services/contactService';

export async function POST(req: NextRequest) {
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

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    const configuredKey = process.env.ADMIN_API_KEY || process.env.NEXT_PUBLIC_ADMIN_API_KEY;

    if (configuredKey && adminKey !== configuredKey) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

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

export async function PATCH(req: NextRequest) {
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
