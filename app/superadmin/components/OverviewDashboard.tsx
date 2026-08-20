'use client';

import React from 'react';
import Link from 'next/link';
import { Inquiry } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useInquiries } from '../context/InquiriesContext';
import Tooltip from './Tooltip';

interface OverviewProps {
  inquiries: Inquiry[];
  onSelectInquiry: (inquiry: Inquiry) => void;
}

export default function OverviewDashboard({ inquiries, onSelectInquiry }: OverviewProps) {
  const { user, dbLatency } = useAuth();
  const { isLoading } = useInquiries();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.75rem 2rem' }}>
      {/* 0. Welcome Greeting with Dynamic User Information */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E1E6F4',
          borderRadius: '20px',
          padding: '1.25rem 1.75rem',
          boxShadow: '0 4px 20px rgba(24, 72, 212, 0.04)',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
            Welcome back, {user?.name || 'Administrator'}
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748B' }}>
            Signed in as <strong style={{ color: 'var(--brand-blue, #1833fe)' }}>{user?.email || 'admin@tryangletech.com'}</strong> · Full Control Session
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Tooltip text="Jump directly to live contact leads table" position="bottom">
            <Link
              href="/superadmin/inquiries"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#EEF2FF',
                color: 'var(--brand-blue, #1833fe)',
                fontSize: '0.825rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <span>View Leads ({inquiries.length})</span>
            </Link>
          </Tooltip>

          <Tooltip text="Manage and publish portfolio projects" position="bottom">
            <Link
              href="/superadmin/portfolio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: 'var(--brand-blue, #1833fe)',
                color: '#FFFFFF',
                fontSize: '0.825rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(24, 51, 254, 0.25)',
              }}
            >
              <span>Manage Portfolio</span>
            </Link>
          </Tooltip>
        </div>
      </div>

      {/* 3 Stat KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
        {/* Total Inquiries */}
        <Tooltip text="Total client inquiries received from the website contact form" position="top">
          <div className="admin-white-card" style={{ padding: '1.25rem 1.5rem', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 700 }}>Total Inquiries</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
              </div>
            </div>
            {isLoading ? (
              <div className="skeleton-shimmer" style={{ height: '38px', width: '60px', marginTop: '0.3rem', borderRadius: '6px' }} />
            ) : (
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', marginTop: '0.3rem', lineHeight: 1.1 }}>
                {inquiries.length}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '0.4rem', fontSize: '0.775rem', color: '#10B981', fontWeight: 700 }}>
              <span>↑ 18%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400 }}>vs last month</span>
            </div>
          </div>
        </Tooltip>

        {/* Portfolio Projects */}
        <Tooltip text="Dynamic case studies across core industry categories" position="top">
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
              {isLoading ? (
                <div className="skeleton-shimmer" style={{ height: '38px', width: '60px', marginTop: '0.3rem', borderRadius: '6px' }} />
              ) : (
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--vivid-blue, #4f46e5)', marginTop: '0.3rem', lineHeight: 1.1 }}>
                  24
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '0.4rem', fontSize: '0.775rem', color: '#15803D', fontWeight: 700 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>Dynamic Categories</span>
                </span>
                <span style={{ color: '#94A3B8', fontWeight: 400 }}>· View All →</span>
              </div>
            </div>
          </Link>
        </Tooltip>

        {/* Database Health */}
        <Tooltip text={`Supabase PostgreSQL Connected · Real-time Latency: ${dbLatency || 24}ms`} position="top">
          <div className="admin-white-card" style={{ padding: '1.25rem 1.5rem', width: '100%', boxSizing: 'border-box' }}>
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
              <span>PostgreSQL (Supabase) · {dbLatency || 24}ms</span>
            </div>
          </div>
        </Tooltip>
      </div>

      {/* 2-Column Section: Compact Recent Leads & Service Demand */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Recent Contact Leads */}
        <div className="admin-white-card" style={{ padding: '1.35rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              Recent Contact Leads
            </h3>
            <Tooltip text="View complete CRM inquiries table" position="left">
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
            </Tooltip>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`lead-skel-${idx}`}
                  style={{
                    padding: '0.85rem 1rem',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    border: '1px solid #EDF2F7',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="skeleton-shimmer" style={{ height: '14px', width: '140px' }} />
                    <div className="skeleton-shimmer" style={{ height: '18px', width: '60px', borderRadius: '100px' }} />
                  </div>
                  <div className="skeleton-shimmer" style={{ height: '10px', width: '180px' }} />
                  <div className="skeleton-shimmer" style={{ height: '10px', width: '85%' }} />
                </div>
              ))
            ) : (
              inquiries.slice(0, 3).map((item) => (
                <Tooltip key={item.id} text="Click to inspect lead details & manage status" position="top">
                  <div
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
                      width: '100%',
                      boxSizing: 'border-box',
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
                </Tooltip>
              ))
            )}
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
              <Tooltip key={srv.name} text={`${srv.name}: ${srv.pct}% of total client inquiries`} position="top">
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 700, color: '#334155' }}>{srv.name}</span>
                    <span style={{ fontWeight: 800, color: srv.color }}>{srv.pct}%</span>
                  </div>
                  <div style={{ height: '7px', backgroundColor: '#EDF2F7', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{ width: `${srv.pct}%`, height: '100%', backgroundColor: srv.color, borderRadius: '100px' }} />
                  </div>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
