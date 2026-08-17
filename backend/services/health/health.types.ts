export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  database: 'connected' | 'disconnected';
  latencyMs: number;
  timestamp: string;
}
