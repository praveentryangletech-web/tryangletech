'use client';

import { usePathname } from 'next/navigation';

const ROUTE_TITLES: Record<string, string> = {
  '/superadmin': 'Executive Analytics Overview',
  '/superadmin/home': 'Home & Locations CMS',
  '/superadmin/about': 'About Page CMS',
  '/superadmin/inquiries': 'Contact Form Leads & Inquiries',
  '/superadmin/portfolio': 'Portfolio Projects & Case Studies',
  '/superadmin/portfolio/editor': 'Portfolio Project Editor',
  '/superadmin/blog': 'Blog & Articles CMS',
  '/superadmin/blog/editor': 'Blog Article Editor',
  '/superadmin/assets': 'Asset Management',
};

export default function SuperadminHeader() {
  const pathname = usePathname();
  const currentTitle = ROUTE_TITLES[pathname] || 
    (pathname.startsWith('/superadmin/portfolio/editor') ? 'Portfolio Project Editor' :
     pathname.startsWith('/superadmin/blog/editor') ? 'Blog Article Editor' : 'Control Center');

  return (
    <header
      style={{
        height: '75px',
        flexShrink: 0,
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 100,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.02)',
      }}>
      {/* Breadcrumb / Dynamic Page Title */}
      <div>
        <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          TRYANGLETECH CONTROL CENTER
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
            {currentTitle}
          </span>
          {pathname === '/superadmin/assets' && (
            <span
              style={{
                backgroundColor: '#EFF6FF',
                color: '#1833FE',
                border: '1px solid #BFDBFE',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.725rem',
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
            >
              /public/portfolio
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
