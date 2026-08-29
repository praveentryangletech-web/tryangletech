import { NextRequest } from 'next/server';
import { newsletterService } from '@/backend/services/newsletter';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { formatBackendError } from '@/backend/utils/errorHandler';
import { enforceRateLimit } from '@/backend/utils/rateLimiter';

export async function POST(req: NextRequest) {
  // Enforce anti-spam rate limit: max 5 newsletter subscriptions per 10 minutes per IP
  const rateLimitError = enforceRateLimit(req, 'newsletter_sub', 5, 10 * 60 * 1000);
  if (rateLimitError) return rateLimitError;

  try {
    const body = await req.json();
    const subscriber = await newsletterService.subscribe(body.email);

    return successResponse(
      { id: subscriber.id, email: subscriber.email },
      'You have been subscribed successfully!',
      200
    );
  } catch (error: any) {
    const { message, statusCode } = formatBackendError(error);
    return errorResponse(message, statusCode);
  }
}
