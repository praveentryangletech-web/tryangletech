'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SuperadminSidebar from './SuperadminSidebar';
import SuperadminHeader from './SuperadminHeader';
import { SuperadminProvider, useSuperadmin } from '../context/SuperadminContext';

function SuperadminContentGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAuthChecking } = useSuperadmin();

  useEffect(() => {
    if (isAuthChecking) return;

    // 1. If user is NOT authenticated and trying to view any secure dashboard route -> Force Redirect to Login
    if (!isAuthenticated && pathname !== '/superadmin/login') {
      router.replace('/superadmin/login');
    }

    // 2. If user IS authenticated and trying to access the login page -> Redirect to Overview Dashboard
    if (isAuthenticated && pathname === '/superadmin/login') {
      router.replace('/superadmin');
    }
  }, [isAuthenticated, isAuthChecking, pathname, router]);

  // Loading state while verifying authentication session
  if (isAuthChecking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f4ff',
          fontFamily: 'var(--_fonts---font-family--inter, Inter, sans-serif)',
          gap: '1.25rem',
        }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            border: '3.5px solid #e2e8f0',
            borderTopColor: '#1833fe',
            borderRadius: '50%',
            animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--dark-indigo, #1a0b54)' }}>
            TryangleTech Control Center
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
            Verifying secure session...
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `,
          }}
        />
      </div>
    );
  }

  // If not authenticated and on a protected route, prevent rendering protected UI before redirect completes
  if (!isAuthenticated && pathname !== '/superadmin/login') {
    return null;
  }

  // Render standalone layout for login page
  if (pathname === '/superadmin/login') {
    return <>{children}</>;
  }

  // Protected Superadmin Shell Layout with Sidebar & Header
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#f0f4ff',
        color: 'var(--dark-indigo, #1a0b54)',
        fontFamily: 'var(--_fonts---font-family--inter, Inter, sans-serif)',
      }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .admin-sidebar-link {
              transition: all 0.2s ease;
            }
            .admin-sidebar-link:hover:not(.active) {
              background-color: #f1f5f9 !important;
              color: var(--dark-indigo, #1a0b54) !important;
            }
            .admin-white-card {
              background-color: #ffffff;
              border: 1px solid #e1e6f4;
              border-radius: 20px;
              box-shadow: 0 10px 30px rgba(24, 72, 212, 0.06);
              transition: transform 0.25s ease, box-shadow 0.25s ease;
            }
            .admin-white-card:hover {
              box-shadow: 0 16px 36px rgba(24, 72, 212, 0.1);
            }
            .admin-row-hover {
              transition: background-color 0.15s ease;
            }
            .admin-row-hover:hover {
              background-color: rgba(255, 255, 255, 0.6);
            }
            /* Custom sleek scrollbar */
            .admin-scroll-area::-webkit-scrollbar {
              width: 8px;
            }
            .admin-scroll-area::-webkit-scrollbar-track {
              background: transparent;
            }
            .admin-scroll-area::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 10px;
            }
            .admin-scroll-area::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
          `,
        }}
      />

      {/* 1. FIXED LEFT SIDEBAR */}
      <SuperadminSidebar />

      {/* 2. MAIN COLUMN WITH STICKY HEADER & SCROLLABLE BODY */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          minWidth: 0,
          overflow: 'hidden',
        }}>
        <SuperadminHeader />

        <main
          className="admin-scroll-area"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 0,
            backgroundColor: '#f0f4ff',
          }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function SuperadminShell({ children }: { children: React.ReactNode }) {
  return (
    <SuperadminProvider>
      <SuperadminContentGuard>{children}</SuperadminContentGuard>
    </SuperadminProvider>
  );
}
