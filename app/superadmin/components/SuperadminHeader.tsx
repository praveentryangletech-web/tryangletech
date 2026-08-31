'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ROUTE_TITLES: Record<string, string> = {
  '/superadmin': 'Executive Analytics Overview',
  '/superadmin/home': 'Home & Locations CMS',
  '/superadmin/about': 'About Page CMS',
  '/superadmin/services': 'Services CMS',
  '/superadmin/services/main': 'Main Services Overview CMS',
  '/superadmin/services/web-development': 'Website & Web Application Development CMS',
  '/superadmin/services/custom-software': 'Custom Software & Enterprise Solutions CMS',
  '/superadmin/services/mobile-application': 'iOS & Android Mobile App Development CMS',
  '/superadmin/services/graphics-designing': 'Graphics Designing & UI/UX Experience CMS',
  '/superadmin/services/digital-marketing': 'Digital Marketing & Growth Strategy CMS',
  '/superadmin/inquiries': 'Contact Form Leads & Inquiries',
  '/superadmin/portfolio': 'Portfolio Projects & Case Studies',
  '/superadmin/portfolio/editor': 'Portfolio Project Editor',
  '/superadmin/blog': 'Blog & Articles CMS',
  '/superadmin/blog/editor': 'Blog Article Editor',
  '/superadmin/assets': 'Asset Management',
};

export default function SuperadminHeader() {
  const pathname = usePathname();

  let currentTitle = ROUTE_TITLES[pathname];
  let backRoute: { label: string; href: string } | null = null;

  if (pathname === '/superadmin/portfolio/editor') {
    backRoute = { label: 'Back to Portfolio', href: '/superadmin/portfolio' };
  } else if (pathname === '/superadmin/blog/editor') {
    backRoute = { label: 'Back to Blog', href: '/superadmin/blog' };
  } else if (pathname.startsWith('/superadmin/services/') && pathname !== '/superadmin/services') {
    backRoute = { label: 'Back to All Services', href: '/superadmin/services' };
    if (!currentTitle) {
      const slug = pathname.replace('/superadmin/services/', '');
      currentTitle = `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} CMS`;
    }
  }

  if (!currentTitle) {
    currentTitle = pathname.startsWith('/superadmin/portfolio/editor') ? 'Portfolio Project Editor' :
      pathname.startsWith('/superadmin/blog/editor') ? 'Blog Article Editor' : 'Control Center';
  }

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
      {/* Left: Dynamic Page Title / Breadcrumb */}
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

      {/* Right: Contextual Back Button */}
      {backRoute && (
        <div>
          <Link
            href={backRoute.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 14px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>{backRoute.label}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
