export function validateSubscriberEmail(email: string): { valid: boolean; error?: string } {
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }
  return { valid: true };
}
