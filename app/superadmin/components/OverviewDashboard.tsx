'use client';

import React from 'react';
import Link from 'next/link';
import { Inquiry } from '../data/mockData';

interface OverviewProps {
  inquiries: Inquiry[];
  onSelectInquiry: (inquiry: Inquiry) => void;
}

export default function OverviewDashboard({ inquiries, onSelectInquiry }: OverviewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.75rem 2rem' }}>
      {/* 3 Stat KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
        {/* Total Inquiries */}
        <div className="admin-white-card" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 700 }}>Total Inquiries</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', marginTop: '0.3rem', lineHeight: 1.1 }}>
            {inquiries.length}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '0.4rem', fontSize: '0.775rem', color: '#10B981', fontWeight: 700 }}>
            <span>↑ 18%</span>
            <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs last month</span>
          </div>
        </div>

        {/* Portfolio Projects */}
        <Link href="/superadmin/portfolio" style={{ textDecoration: 'none', display: 'block' }}>
          <div className="admin-white-card" style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 700 }}>Portfolio Projects</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803D' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--vivid-blue, #4f46e5)', marginTop: '0.3rem', lineHeight: 1.1 }}>
              24
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '0.4rem', fontSize: '0.775rem', color: '#15803D', fontWeight: 700 }}>
              <span>⚡ 6 Core Categories</span>
              <span style={{ color: '#94A3B8', fontWeight: 400 }}>· View All →</span>
            </div>
          </div>
        </Link>

        {/* Database Health */}
        <div className="admin-white-card" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 700 }}>Database Health</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981', marginTop: '0.45rem', lineHeight: 1.1 }}>
            Operational
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '0.4rem', fontSize: '0.775rem', color: '#64748B', fontWeight: 600 }}>
            <span>PostgreSQL (Supabase)</span>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Compact Recent Leads & Service Demand */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Recent Contact Leads */}
        <div className="admin-white-card" style={{ padding: '1.35rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              Recent Contact Leads
            </h3>
            <Link
              href="/superadmin/inquiries"
              style={{
                color: 'var(--vivid-blue, #4f46e5)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}>
              View All Leads →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {inquiries.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectInquiry(item)}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #EDF2F7',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.95rem' }}>
                      {item.firstName} {item.lastName}
                    </span>
                    <span
                      style={{
                        fontSize: '0.675rem',
                        padding: '2px 7px',
                        borderRadius: '100px',
                        fontWeight: 800,
                        backgroundColor: item.status === 'NEW' ? '#DCFCE7' : '#EEF2FF',
                        color: item.status === 'NEW' ? '#15803D' : '#4338CA',
                      }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
                    {item.email} • {item.phone}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: '#334155', marginTop: '4px', maxWidth: '540px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    "{item.message}"
                  </div>
                </div>
                <span style={{ color: 'var(--vivid-blue, #4f46e5)', fontSize: '1.2rem', fontWeight: 700 }}>›</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Demand Progress */}
        <div className="admin-white-card" style={{ padding: '1.35rem 1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
            Service Demand
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Web Development', pct: 45, color: '#4F46E5' },
              { name: 'Custom Software', pct: 28, color: '#0284C7' },
              { name: 'Mobile Application', pct: 18, color: '#7C3AED' },
              { name: 'Graphics Designing', pct: 9, color: '#059669' },
            ].map((srv) => (
              <div key={srv.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 700, color: '#334155' }}>{srv.name}</span>
                  <span style={{ fontWeight: 800, color: srv.color }}>{srv.pct}%</span>
                </div>
                <div style={{ height: '7px', backgroundColor: '#EDF2F7', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ width: `${srv.pct}%`, height: '100%', backgroundColor: srv.color, borderRadius: '100px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
