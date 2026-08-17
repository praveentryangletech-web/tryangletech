import { healthService } from '@/backend/services/healthService';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const health = await healthService.checkHealth();
    return successResponse(health);
  } catch (error: any) {
    return errorResponse(
      error?.message || 'Database health check failed. Check DATABASE_URL in .env.local',
      503
    );
  }
}
