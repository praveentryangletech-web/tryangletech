import { CreateContactInput } from './contact.types';

export function validateContactInput(data: CreateContactInput): { valid: boolean; error?: string } {
  if (!data.firstName || !data.firstName.trim()) {
    return { valid: false, error: 'First name is required.' };
  }
  if (!data.lastName || !data.lastName.trim()) {
    return { valid: false, error: 'Last name is required.' };
  }
  if (!data.email || !data.email.trim()) {
    return { valid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  if (!data.phone || !data.phone.trim()) {
    return { valid: false, error: 'Phone number is required.' };
  }
  if (!data.message || !data.message.trim()) {
    return { valid: false, error: 'Message cannot be empty.' };
  }
  return { valid: true };
}
