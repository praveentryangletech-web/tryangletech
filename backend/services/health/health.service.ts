import db from '@/backend/db/client';
import { HealthCheckResult } from './health.types';

export const healthService = {
  /**
   * Check database connection and latency against PostgreSQL
   */
  async checkHealth(): Promise<HealthCheckResult> {
    const start = Date.now();
    await db.$queryRaw`SELECT 1 as health_check`;
    const latencyMs = Date.now() - start;

    return {
      status: 'healthy',
      database: 'connected',
      latencyMs,
      timestamp: new Date().toISOString(),
    };
  },
};

export default healthService;
