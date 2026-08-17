import db from '@/backend/db/client';
import { isValidEmail, sanitizeText } from '@/backend/validators';

export const newsletterService = {
  /**
   * Subscribe an email to the newsletter
   */
  async subscribe(email: string) {
    const cleanEmail = sanitizeText(email).toLowerCase();

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      throw new Error('A valid email address is required.');
    }

    const subscriber = await db.newsletterSubscriber.upsert({
      where: { email: cleanEmail },
      update: { status: 'ACTIVE' },
      create: {
        email: cleanEmail,
        status: 'ACTIVE',
      },
    });

    return subscriber;
  },

  /**
   * Retrieve all active newsletter subscribers
   */
  async getSubscribers(limit: number = 100) {
    return await db.newsletterSubscriber.findMany({
      where: { status: 'ACTIVE' },
      take: Math.min(limit, 500),
      orderBy: { createdAt: 'desc' },
    });
  },
};
