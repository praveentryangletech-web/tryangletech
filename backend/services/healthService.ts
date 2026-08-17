import db from '@/backend/db/client';

export const healthService = {
  /**
   * Perform database connection healthcheck
   */
  async checkHealth() {
    const startTime = Date.now();
    await db.$queryRaw`SELECT 1 as health_check`;
    const latencyMs = Date.now() - startTime;

    return {
      status: 'healthy',
      database: 'connected',
      engine: 'PostgreSQL (Supabase)',
      latencyMs,
      timestamp: new Date().toISOString(),
    };
  },
};
