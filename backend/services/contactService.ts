import db from '@/backend/db/client';
import { isValidEmail, isValidPhone, sanitizeText } from '@/backend/validators';

export interface CreateContactDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  subjects?: string[] | string;
}

export const contactService = {
  /**
   * Validate and create a new contact submission in PostgreSQL
   */
  async createSubmission(payload: CreateContactDTO) {
    const firstName = sanitizeText(payload.firstName);
    const lastName = sanitizeText(payload.lastName);
    const phone = sanitizeText(payload.phone);
    const email = sanitizeText(payload.email).toLowerCase();
    const message = sanitizeText(payload.message);

    if (!firstName) {
      throw new Error('First name is required.');
    }

    if (!lastName) {
      throw new Error('Last name is required.');
    }

    if (!email || !isValidEmail(email)) {
      throw new Error('A valid email address is required.');
    }

    if (!phone || !isValidPhone(phone)) {
      throw new Error('A valid phone number is required.');
    }

    if (!message) {
      throw new Error('Message cannot be empty.');
    }

    // Normalize subjects
    let subjectsList: string[] = [];
    if (Array.isArray(payload.subjects)) {
      subjectsList = payload.subjects.map(sanitizeText).filter(Boolean);
    } else if (typeof payload.subjects === 'string' && payload.subjects.trim()) {
      subjectsList = [payload.subjects.trim()];
    }

    // Save to PostgreSQL
    const record = await db.contactSubmission.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        message,
        subjects: subjectsList,
        status: 'NEW',
      },
    });

    return record;
  },

  /**
   * Fetch recent contact submissions (for admin portal / review)
   */
  async getSubmissions(limit: number = 50) {
    const safeLimit = Math.min(Math.max(limit, 1), 100);
    return await db.contactSubmission.findMany({
      take: safeLimit,
      orderBy: { createdAt: 'desc' },
    });
  },
};
