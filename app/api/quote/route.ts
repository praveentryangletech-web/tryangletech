import { NextRequest } from 'next/server';
import { quoteService } from '@/backend/services/quoteService';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { formatBackendError } from '@/backend/utils/errorHandler';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const quote = await quoteService.createQuote(body);

    return successResponse(
      { id: quote.id },
      'Thank you! Your quote request has been submitted.',
      201
    );
  } catch (error: any) {
    const { message, statusCode } = formatBackendError(error);
    return errorResponse(message, statusCode);
  }
}

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    const configuredKey = process.env.ADMIN_API_KEY;

    if (configuredKey && adminKey !== configuredKey) {
      return errorResponse('Unauthorized.', 401);
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const quotes = await quoteService.getQuotes(limit);
    return successResponse(quotes);
  } catch (error: any) {
    const { message, statusCode } = formatBackendError(error);
    return errorResponse(message, statusCode);
  }
}
