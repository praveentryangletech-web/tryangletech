/**
 * Shared SQL / Query Injection Security Utilities
 */

// Common SQL Injection signatures to detect and block immediately
export const SQL_INJECTION_PATTERNS = [
  /(\b(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|EXECUTE|DECLARE|CAST)\b)/i,
  /(--|;|\/\*|\*\/)/,
  /(\b(OR|AND)\b\s+(['"]?\w+['"]?\s*=\s*['"]?\w+['"]?|1\s*=\s*1|0\s*=\s*0))/i,
  /(\b(WAITFOR\s+DELAY|PG_SLEEP|BENCHMARK|SLEEP)\b)/i,
  /(\b(HEX|UNHEX|CHAR|CHR|CONCAT|GROUP_CONCAT)\s*\()/i,
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
