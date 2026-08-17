'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSuperadmin } from '../context/SuperadminContext';
import apiClient from '../utils/apiClient';

export default function SuperadminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useSuperadmin();

  const handleLogout = async () => {
    await logout();
    router.push('/superadmin/login');
  };

  const navItems = [
    {
      label: 'Overview',
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
    },
    {
      label: 'Contact Leads',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      ),
      href: '/superadmin/inquiries',
      active: pathname === '/superadmin/inquiries',
    },
    {
      label: 'Portfolio',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      href: '/superadmin/portfolio',
      active: pathname === '/superadmin/portfolio',
    },
  ];

  return (
    <aside
      style={{
        width: '280px',
        height: '100vh',
        flexShrink: 0,
        borderRight: '1px solid #e1e6f4',
        backgroundColor: '#ffffff',
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
            }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#6366F1' }} />
            Superadmin Control
          </div>
        </div>

        {/* Sidebar Nav Links with Standard SVG Icons */}
        <nav style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', opacity: item.active ? 1 : 0.85 }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* User Profile & Actions Bottom */}
      <div style={{ borderTop: '1px solid #edf2f7', paddingTop: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4F46E5, #38BDF8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
            }}>
            TT
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              Praveen Gupta
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Super Administrator</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
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
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>View Site</span>
          </Link>
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
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
