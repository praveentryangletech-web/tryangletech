export type InquiryStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'ARCHIVED';

export interface CreateContactInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  subjects?: string[];
}

export interface ContactSubmissionDTO {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  subjects: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
