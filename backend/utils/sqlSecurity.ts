/**
 * Shared SQL / Query Injection Security Utilities
 */

// Common SQL Injection signatures to detect and block immediately
export const SQL_INJECTION_PATTERNS = [
  /(\b(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|EXECUTE|DECLARE|CAST|TRUNCATE)\b)/i,
  /(--|;|\/\*|\*\/)/,
  /(\b(OR|AND)\b\s+(['"]?\w+['"]?\s*=\s*['"]?\w+['"]?|1\s*=\s*1|0\s*=\s*0))/i,
  /(\b(WAITFOR\s+DELAY|PG_SLEEP|BENCHMARK|SLEEP)\b)/i,
  /(\b(HEX|UNHEX|CHAR|CHR|CONCAT|GROUP_CONCAT|LOAD_FILE|INTO\s+OUTFILE)\s*\()/i,
];

/**
 * Checks if a string contains known SQL injection patterns
 */
export function hasSqlInjectionPattern(input?: string | null): boolean {
  if (!input) return false;
  return SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Strips dangerous HTML/SQL control and wildcard characters
 */
export function sanitizeSqlString(input?: string | null, maxLength = 100): string | undefined {
  if (!input) return undefined;
  
  const cleaned = input
    .trim()
    .replace(/[<>'"`;\\%_]/g, '')
    .slice(0, maxLength);
    
  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Sanitize search input to prevent wildcard regex or LIKE amplification attacks
 */
export function sanitizeSearchTerm(input?: string | null, maxLength = 80): string | undefined {
  if (!input) return undefined;
  
  // Remove SQL injection keywords and strip dangerous characters
  const trimmed = input.trim();
  if (hasSqlInjectionPattern(trimmed)) {
    return undefined;
  }

  const cleaned = trimmed
    .replace(/[;'"\\]/g, '')
    .slice(0, maxLength);

  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Whitelist sanitizer for SQL order/sort column names
 */
export function validateSortColumn(
  column: string | undefined | null,
  allowedColumns: string[],
  defaultColumn: string
): string {
  if (!column) return defaultColumn;
  const clean = column.trim();
  if (allowedColumns.includes(clean)) {
    return clean;
  }
  return defaultColumn;
}

/**
 * Strict integer validator with bounds checking for pagination (page, limit, offset)
 */
export function validateInteger(
  val: any,
  defaultVal: number,
  min: number = 1,
  max: number = 1000
): number {
  if (val === undefined || val === null || val === '') return defaultVal;
  const parsed = parseInt(String(val), 10);
  if (isNaN(parsed)) return defaultVal;
  return Math.min(Math.max(parsed, min), max);
}
