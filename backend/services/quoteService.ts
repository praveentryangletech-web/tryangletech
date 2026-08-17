import db from '@/backend/db/client';
import { isValidEmail, isValidPhone, sanitizeText } from '@/backend/validators';

export interface CreateQuoteDTO {
  clientName: string;
  email: string;
  phone?: string;
  serviceType: string;
  budget?: string;
  details: string;
}

export const quoteService = {
  /**
   * Create a new custom service quote request
   */
  async createQuote(payload: CreateQuoteDTO) {
    const clientName = sanitizeText(payload.clientName);
    const email = sanitizeText(payload.email).toLowerCase();
    const phone = payload.phone ? sanitizeText(payload.phone) : undefined;
    const serviceType = sanitizeText(payload.serviceType);
    const budget = payload.budget ? sanitizeText(payload.budget) : undefined;
    const details = sanitizeText(payload.details);

    if (!clientName) {
      throw new Error('Your name is required.');
    }

    if (!email || !isValidEmail(email)) {
      throw new Error('A valid email address is required.');
    }

    if (phone && !isValidPhone(phone)) {
      throw new Error('A valid phone number is required.');
    }

    if (!serviceType) {
      throw new Error('Please select a service type.');
    }

    if (!details) {
      throw new Error('Project details are required.');
    }

    const quote = await db.quoteRequest.create({
      data: {
        clientName,
        email,
        phone,
        serviceType,
        budget,
        details,
        status: 'PENDING',
      },
    });

    return quote;
  },

  /**
   * Retrieve quote requests
   */
  async getQuotes(limit: number = 50) {
    return await db.quoteRequest.findMany({
      take: Math.min(limit, 100),
      orderBy: { createdAt: 'desc' },
    });
  },
};
