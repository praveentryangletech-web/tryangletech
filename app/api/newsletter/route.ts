import { NextRequest } from 'next/server';
import { newsletterService } from '@/backend/services/newsletter';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { formatBackendError } from '@/backend/utils/errorHandler';

export async function POST(req: NextRequest) {
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
