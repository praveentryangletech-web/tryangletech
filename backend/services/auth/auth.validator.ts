import { hasSqlInjectionPattern } from '@/backend/utils/sqlSecurity';

// Strict Email Regex (RFC 5322 standard compliant, no SQL characters)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// In-Memory Rate Limiter for Login Attempts
interface RateLimitRecord {
  attempts: number;
  blockedUntil?: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const WINDOW_DURATION_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Rate limits login attempts per client IP or Email identifier
 */
export function checkLoginRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Check if currently locked out
  if (record.blockedUntil && record.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // If lockout expired, reset
  if (record.blockedUntil && record.blockedUntil <= now) {
    loginAttempts.delete(identifier);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  return {
    allowed: record.attempts < MAX_ATTEMPTS,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - record.attempts),
  };
}

/**
 * Records a failed login attempt for rate limiting
 */
export function recordFailedLogin(identifier: string): { locked: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier) || { attempts: 0 };

  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.blockedUntil = now + LOCKOUT_DURATION_MS;
    loginAttempts.set(identifier, record);
    return { locked: true, retryAfterSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000) };
  }

  loginAttempts.set(identifier, record);
  return { locked: false };
}

/**
 * Clears failed attempts upon successful login
 */
export function clearLoginAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

/**
 * Validates and sanitizes login input against injection and formatting rules
 */
export function validateLoginInput(body: any): {
  valid: boolean;
  email?: string;
  password?: string;
  error?: string;
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  const { email, password } = body;

  // 1. Presence check
  if (!email || typeof email !== 'string' || !email.trim()) {
    return { valid: false, error: 'Email address is required.' };
  }
  if (!password || typeof password !== 'string' || !password.trim()) {
    return { valid: false, error: 'Password is required.' };
  }

  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  // 2. Length limits (prevents memory DoS or ReDoS attacks)
  if (trimmedEmail.length > 120) {
    return { valid: false, error: 'Email address is too long (maximum 120 characters).' };
  }
  if (trimmedPassword.length > 128) {
    return { valid: false, error: 'Password is too long (maximum 128 characters).' };
  }

  // 3. SQL Injection pattern detection
  if (hasSqlInjectionPattern(trimmedEmail) || hasSqlInjectionPattern(trimmedPassword)) {
    return { valid: false, error: 'Malicious query syntax detected. Login attempt blocked.' };
  }

  // 4. Strict Email format check
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { valid: false, error: 'Please enter a valid email address format.' };
  }

  return {
    valid: true,
    email: trimmedEmail,
    password: trimmedPassword,
  };
}
