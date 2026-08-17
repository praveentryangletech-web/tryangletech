import db from '@/backend/db/client';
import { SubscriberDTO, SubscribeInput } from './newsletter.types';
import { validateSubscriberEmail } from './newsletter.validator';

export const newsletterService = {
  /**
   * Subscribe an email address to the newsletter
   */
  async subscribe(input: SubscribeInput): Promise<SubscriberDTO> {
    const validation = validateSubscriberEmail(input.email);
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid email address.');
    }

    const email = input.email.trim().toLowerCase();

    const existing = await (db as any).newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.status === 'UNSUBSCRIBED') {
        const updated = await (db as any).newsletterSubscriber.update({
          where: { email },
          data: { status: 'ACTIVE' },
        });
        return {
          id: updated.id,
          email: updated.email,
          status: updated.status,
          createdAt: updated.createdAt.toISOString(),
        };
      }
      return {
        id: existing.id,
        email: existing.email,
        status: existing.status,
        createdAt: existing.createdAt.toISOString(),
      };
    }

    const created = await (db as any).newsletterSubscriber.create({
      data: {
        email,
        status: 'ACTIVE',
      },
    });

    return {
      id: created.id,
      email: created.email,
      status: created.status,
      createdAt: created.createdAt.toISOString(),
    };
  },
};

export default newsletterService;
