'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Tooltip from './Tooltip';

export default function SuperadminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/superadmin/login');
  };

  // Compute initials dynamically from logged in admin user
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'SA';

  const navItems = [
    {
      label: 'Overview',
      tooltip: 'Executive Analytics & KPIs',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
      href: '/superadmin',
      active: pathname === '/superadmin',
    },{
      label: 'Portfolio',
      tooltip: 'Case Studies CMS & Live Demo Links',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      href: '/superadmin/portfolio',
      active: pathname === '/superadmin/portfolio',
    },
    {
      label: 'Contact Leads',
      tooltip: 'Client Inquiries & CRM Leads',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      ),
      href: '/superadmin/inquiries',
      active: pathname === '/superadmin/inquiries',
    },
    
  ];

  return (
    <aside
      style={{
        width: '280px',
        height: '100vh',
        flexShrink: 0,
        borderRight: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.75rem 1.25rem',
        boxSizing: 'border-box',
        zIndex: 50,
        boxShadow: '4px 0 20px rgba(24, 72, 212, 0.03)',
      }}>
      <div>
        {/* Brand Logo & Superadmin Control Badge */}
        <div style={{ padding: '0 0.5rem 1.5rem', borderBottom: '1px solid #edf2f7' }}>
          <Link href="/superadmin" style={{ textDecoration: 'none', display: 'block' }}>
            <Image
              src="/logo.png"
              alt="TryangleTech"
              width={150}
              height={40}
              style={{ objectFit: 'contain', height: '36px', width: 'auto' }}
            />
          </Link>
          <Tooltip text="Authorized Administrator Control Session" position="right">
            <div
              style={{
                marginTop: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#EEF2FF',
                border: '1px solid #C7D2FE',
                color: '#4338CA',
                padding: '4px 10px',
                borderRadius: '100px',
                fontSize: '0.725rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'default',
              }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#6366F1' }} />
              Superadmin Control
            </div>
          </Tooltip>
        </div>

        {/* Sidebar Nav Links */}
        <nav style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar-link ${item.active ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                textDecoration: 'none',
                backgroundColor: item.active ? 'var(--dark-indigo, #1a0b54)' : 'transparent',
                color: item.active ? '#FFFFFF' : '#64748B',
                fontWeight: item.active ? 700 : 600,
                fontSize: '0.925rem',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease',
                boxShadow: item.active ? '0 4px 12px rgba(26, 11, 84, 0.2)' : 'none',
              }}>
              <span style={{ marginRight: '12px', display: 'flex', alignItems: 'center', color: item.active ? 'var(--electric-cyan, #00d2fe)' : '#64748B' }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Dynamic Logged In Admin Profile & Bottom Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
        {/* Dynamic Admin User Card with Tooltip */}
        <Tooltip text={`Signed in as ${user?.email || 'admin@tryangletech.com'}`} position="top">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 10px',
              backgroundColor: '#EEF2F6',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              cursor: 'default',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Initials Avatar Badge */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--vivid-blue, #4f46e5)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.8rem',
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name || 'Super Administrator'}
              </div>
              <div style={{ fontSize: '0.725rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'admin@tryangletech.com'}
              </div>
            </div>
          </div>
        </Tooltip>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Tooltip text="Open public website in a new tab" position="top">
            <Link
              href="/"
              target="_blank"
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: '8px',
                backgroundColor: '#F1F5F9',
                color: '#334155',
                fontSize: '0.775rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>View Site</span>
            </Link>
          </Tooltip>

          <Tooltip text="End current admin session and logout" position="top">
            <button
              onClick={handleLogout}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: '8px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                fontSize: '0.775rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </aside>
  );
}
