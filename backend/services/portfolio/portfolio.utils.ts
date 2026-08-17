/**
 * Generate a clean URL-friendly slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Format string array as PostgreSQL array literal
 */
export function formatPostgresArray(arr: string[]): string {
  if (!Array.isArray(arr)) return '{}';
  const escaped = arr.map((item) => `"${item.replace(/"/g, '\\"')}"`).join(',');
  return `{${escaped}}`;
}
