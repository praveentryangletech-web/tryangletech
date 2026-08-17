import db from '@/backend/db/client';
import { CreateContactInput, ContactSubmissionDTO, InquiryStatus } from './contact.types';
import { validateContactInput } from './contact.validator';

export const contactService = {
  /**
   * Create a new contact submission from the public website contact form
   */
  async createSubmission(input: CreateContactInput): Promise<ContactSubmissionDTO> {
    const validation = validateContactInput(input);
    if (!validation.valid) {
      throw new Error(validation.error || 'Invalid contact submission data.');
    }

    const created = await (db as any).contactSubmission.create({
      data: {
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        phone: input.phone.trim(),
        email: input.email.trim().toLowerCase(),
        message: input.message.trim(),
        subjects: Array.isArray(input.subjects) ? input.subjects : [],
        status: 'NEW',
      },
    });

    return {
      id: created.id,
      firstName: created.firstName,
      lastName: created.lastName,
      phone: created.phone,
      email: created.email,
      message: created.message,
      subjects: created.subjects,
      status: created.status,
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
    };
  },

  /**
   * Fetch recent contact leads for Superadmin
   */
  async getSubmissions(limit = 50): Promise<ContactSubmissionDTO[]> {
    const list = await (db as any).contactSubmission.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return list.map((item: any) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      email: item.email,
      message: item.message,
      subjects: item.subjects,
      status: item.status,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));
  },

  /**
   * Update submission status in PostgreSQL (e.g. NEW -> CONTACTED -> IN_PROGRESS -> ARCHIVED)
   */
  async updateStatus(id: string, status: InquiryStatus): Promise<ContactSubmissionDTO> {
    const updated = await (db as any).contactSubmission.update({
      where: { id },
      data: { status },
    });

    return {
      id: updated.id,
      firstName: updated.firstName,
      lastName: updated.lastName,
      phone: updated.phone,
      email: updated.email,
      message: updated.message,
      subjects: updated.subjects,
      status: updated.status,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    };
  },
};

export default contactService;
