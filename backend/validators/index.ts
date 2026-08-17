/**
 * Backend Validation Utilities
 */

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  return phone.trim().length >= 6;
}

export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text.trim();
}
