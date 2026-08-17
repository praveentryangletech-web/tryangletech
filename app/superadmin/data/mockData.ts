export interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subjects: string[];
  message: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'ARCHIVED';
  notes?: string;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  status: 'ACTIVE' | 'UNSUBSCRIBED';
  createdAt: string;
}

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'lead-1',
    firstName: 'Aarav',
    lastName: 'Patel',
    email: 'aarav.patel@techcorp.in',
    phone: '+91 98765 43210',
    subjects: ['General inquiry', 'Pricing, technical support'],
    message: 'We are looking to build a high-performance B2B SaaS platform for our supply chain logistics in Ahmedabad. Would love to schedule a consultation this week.',
    status: 'NEW',
    notes: 'Follow up on WhatsApp with portfolio PDF.',
    createdAt: '2026-08-17T10:30:00Z',
  },
  {
    id: 'lead-2',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya@zenithdesigns.com',
    phone: '+91 98220 11223',
    subjects: ['Feedback'],
    message: 'Loved your recent portfolio work for the hospitality branding! We need complete brand identity and interactive web application redesign.',
    status: 'CONTACTED',
    notes: 'Sent initial discovery questionnaire.',
    createdAt: '2026-08-16T15:45:00Z',
  },
  {
    id: 'lead-3',
    firstName: 'Vikram',
    lastName: 'Mehta',
    email: 'vmehta@omniindustries.com',
    phone: '+91 97110 88990',
    subjects: ['Pricing, technical support', 'Other'],
    message: 'Need an iOS & Android mobile application with real-time tracking and offline mode. What would be the estimated timeline and budget?',
    status: 'NEW',
    notes: '',
    createdAt: '2026-08-16T09:15:00Z',
  },
  {
    id: 'lead-4',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sjenkins@globalventures.io',
    phone: '+1 (415) 890-1234',
    subjects: ['General inquiry'],
    message: 'Exploring offshore software development partner for our custom ERP integration.',
    status: 'IN_PROGRESS',
    notes: 'Zoom call booked for Wednesday.',
    createdAt: '2026-08-15T18:20:00Z',
  },
];

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: 'sub-1', email: 'director@innovate.co', status: 'ACTIVE', createdAt: '2026-08-17T07:15:00Z' },
  { id: 'sub-2', email: 'techlead@startupgrowth.in', status: 'ACTIVE', createdAt: '2026-08-16T19:00:00Z' },
  { id: 'sub-3', email: 'marketing@vertexagency.com', status: 'ACTIVE', createdAt: '2026-08-16T12:30:00Z' },
  { id: 'sub-4', email: 'ceo@quantumventures.org', status: 'ACTIVE', createdAt: '2026-08-15T09:40:00Z' },
];
