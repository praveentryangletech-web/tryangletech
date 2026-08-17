/**
 * Centralized Backend Error Formatter
 */
export function formatBackendError(error: any): { message: string; statusCode: number } {
  console.error('[Backend Error]:', error);

  // Prisma specific error codes
  if (error?.code === 'P2002') {
    return {
      message: 'A record with this unique value already exists.',
      statusCode: 409,
    };
  }

  if (error?.code === 'P2025') {
    return {
      message: 'Record not found.',
      statusCode: 404,
    };
  }

  return {
    message: error?.message || 'Internal server error occurred.',
    statusCode: 500,
  };
}
