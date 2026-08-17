'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import SuperadminSidebar from './SuperadminSidebar';
import SuperadminHeader from './SuperadminHeader';
import { SuperadminProvider } from '../context/SuperadminContext';

export default function SuperadminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If on login screen, render without sidebar and top header
  if (pathname === '/superadmin/login') {
    return <>{children}</>;
  }

  return (
    <SuperadminProvider>
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
    </SuperadminProvider>
  );
}
