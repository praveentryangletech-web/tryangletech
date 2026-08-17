'use client';

import { usePathname } from 'next/navigation';

const ROUTE_TITLES: Record<string, string> = {
  '/superadmin': 'Executive Analytics Overview',
  '/superadmin/inquiries': 'Contact Form Leads & Inquiries',
  '/superadmin/quotes': 'Custom Project Quote Requests',
  '/superadmin/settings': 'Database & System Configuration',
};

export default function SuperadminHeader() {
  const pathname = usePathname();
  const currentTitle = ROUTE_TITLES[pathname] || 'Control Center';

  return (
    <header
      style={{
        height: '75px',
        flexShrink: 0,
        borderBottom: '1px solid #e1e6f4',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        zIndex: 100,
        boxShadow: '0 2px 12px rgba(24, 72, 212, 0.04)',
      }}>
      {/* Breadcrumb / Dynamic Page Title */}
      <div>
        <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          TRYANGLETECH PORTAL
        </div>
        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          {currentTitle}
        </div>
      </div>
    </header>
  );
}
