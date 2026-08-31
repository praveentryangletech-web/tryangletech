'use client';

import React from 'react';
import Link from 'next/link';
import Tooltip from '@/app/superadmin/components/Tooltip';
import CustomDropdown from '@/app/superadmin/components/CustomDropdown';
import { ServicePageSummaryItem, ServicesPaginationInfo } from '@/backend/services/services/services.types';

interface ServicesPagesTableProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (val: string) => void;
  categories: string[];
  services: ServicePageSummaryItem[];
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: ((page: number) => void) | React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: (val: number) => void;
  pagination: ServicesPaginationInfo;
  onOpenEditMain: () => void;
  onOpenEditService?: (service: ServicePageSummaryItem | string) => void;
  onToggleStatus?: (slug: string, isPublished: boolean) => Promise<boolean> | void;
  togglingSlug?: string | null;
  successMessage?: string;
  errorMessage?: string;
}

function formatDate(dateVal?: string | Date): { dateStr: string; timeStr: string } {
  if (!dateVal) return { dateStr: 'Aug 27, 2026', timeStr: '10:00 AM' };
  try {
    const d = typeof dateVal === 'string' ? new Date(dateVal) : dateVal;
    if (isNaN(d.getTime())) return { dateStr: 'Aug 27, 2026', timeStr: '10:00 AM' };
    const dateStr = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return { dateStr, timeStr };
  } catch {
    return { dateStr: 'Aug 27, 2026', timeStr: '10:00 AM' };
  }
}

export default function ServicesPagesTable({
  searchQuery,
  setSearchQuery,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  categories,
  services,
  isLoading,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  pagination,
  onOpenEditMain,
  onOpenEditService,
  onToggleStatus,
  togglingSlug,
  successMessage,
  errorMessage,
}: ServicesPagesTableProps) {
  const total = pagination.total;
  const totalPages = pagination.totalPages || 1;
  const startIndex = total > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, total);

  const mainPage = services.find((s) => s.isMainPage);
  const subPages = services.filter((s) => !s.isMainPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 75px)', minHeight: 0, width: '100%', maxWidth: '100%', overflowX: 'hidden', backgroundColor: 'transparent', boxSizing: 'border-box' }}>
      {/* 1. TOP TOOLBAR & ACTION CONTROLS */}
      <div style={{ flexShrink: 0, width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.85rem 1.25rem 0.5rem 1.25rem',
            flexWrap: 'wrap',
            boxSizing: 'border-box',
          }}
        >
          {/* Search Input on Left */}
          <div style={{ position: 'relative', width: '300px', minWidth: '220px' }}>
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search services by title, category, or route..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                height: '38px',
                padding: '0 1rem 0 2.25rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '0.875rem',
                color: '#1E293B',
                outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                boxSizing: 'border-box',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontSize: '12px',
                  height: '24px',
                  width: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Controls: Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Tooltip text="Edit the Main Services Overview page (/service)" position="top">
              <Link
                href="/superadmin/services/main"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--brand-blue, #1833fe)',
                  color: '#FFFFFF',
                  height: '38px',
                  padding: '0 1.15rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxSizing: 'border-box',
                  textDecoration: 'none',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span>Edit Main Services</span>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div style={{ margin: '0 1.25rem 0.65rem 1.25rem', padding: '8px 14px', backgroundColor: '#ECFDF5', border: '1px solid #34D399', color: '#065F46', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 600 }}>
          ✓ {successMessage}
        </div>
      )}
      {errorMessage && (
        <div style={{ margin: '0 1.25rem 0.65rem 1.25rem', padding: '8px 14px', backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#991B1B', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 600 }}>
          ⚠ {errorMessage}
        </div>
      )}

      {/* 2. SCROLLABLE TBODY CONTAINER WITH STICKY THEAD */}
      <div
        className="admin-scroll-area"
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
        }}
      >
        <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', textAlign: 'left', boxSizing: 'border-box' }}>
          <thead
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              backgroundColor: '#F1F5F9',
              boxShadow: '0 1px 0 rgba(0, 0, 0, 0.12)',
            }}
          >
            <tr>
              <th style={{ width: '27%', padding: '0.65rem 0.4rem 0.65rem 1.25rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                SERVICE PAGE & IDENTITY
              </th>
              <th style={{ width: '19%', padding: '0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                URL ROUTE
              </th>
              <th style={{ width: '15%', padding: '0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                CATEGORY
              </th>
              <th style={{ width: '12%', padding: '0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                STATUS
              </th>
              <th style={{ width: '13%', padding: '0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                LAST UPDATED
              </th>
              <th style={{ width: '14%', padding: '0.65rem 1.25rem 0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: itemsPerPage || 6 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem 0.4rem 0.75rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="rt-skeleton-box" style={{ width: '34px', height: '34px', borderRadius: '8px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div className="rt-skeleton-box" style={{ width: '180px', height: '14px', borderRadius: '4px' }} />
                        <div className="rt-skeleton-box" style={{ width: '100px', height: '10px', borderRadius: '4px' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 0.4rem' }}>
                    <div className="rt-skeleton-box" style={{ width: '120px', height: '22px', borderRadius: '6px' }} />
                  </td>
                  <td style={{ padding: '0.75rem 0.4rem' }}>
                    <div className="rt-skeleton-box" style={{ width: '100px', height: '18px', borderRadius: '6px' }} />
                  </td>
                  <td style={{ padding: '0.75rem 0.4rem' }}>
                    <div className="rt-skeleton-box" style={{ width: '70px', height: '20px', borderRadius: '12px' }} />
                  </td>
                  <td style={{ padding: '0.75rem 0.4rem' }}>
                    <div className="rt-skeleton-box" style={{ width: '80px', height: '18px', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '0.75rem 1.25rem 0.75rem 0.4rem', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <div className="rt-skeleton-box" style={{ width: '50px', height: '30px', borderRadius: '7px' }} />
                      <div className="rt-skeleton-box" style={{ width: '50px', height: '30px', borderRadius: '7px' }} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <>
                {/* 1. PRIMARY MAIN SERVICES PAGE ROW */}
                {mainPage && (
                  <tr className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#F0FDF4' }}>
                    <td style={{ padding: '0.65rem 0.4rem 0.65rem 1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                          </svg>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>Main Services Overview</span>
                            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', backgroundColor: '#DCFCE7', color: '#166534', padding: '1px 6px', borderRadius: '4px' }}>
                              HUB
                            </span>
                          </div>
                          <div style={{ fontSize: '0.725rem', color: '#166534', fontWeight: 600 }}>
                            Core Services Landing Page & Overview Matrix
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem 0.4rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '6px' }}>
                        /service
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 0.4rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4338CA', backgroundColor: '#EEF2FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #C7D2FE' }}>
                        Core Hub
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 0.4rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '12px', fontSize: '0.725rem', fontWeight: 700, backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' }}>
                        ● Live Dynamic
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 0.4rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                          Permanent
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 600 }}>
                          Live Core
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem 1.25rem 0.65rem 0.4rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <Tooltip text="View live services page in new tab" position="top">
                          <Link
                            href="/service"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#EFF6FF',
                              color: 'var(--brand-blue, #1833fe)',
                              border: '1px solid #BFDBFE',
                              height: '30px',
                              padding: '0 8px',
                              borderRadius: '7px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            <span>View</span>
                          </Link>
                        </Tooltip>

                        <Tooltip text="Edit Main Services in CMS Editor" position="top">
                          <Link
                            href="/superadmin/services/main"
                            style={{
                              backgroundColor: 'var(--brand-blue, #1833fe)',
                              color: '#FFFFFF',
                              border: 'none',
                              height: '30px',
                              padding: '0 9px',
                              borderRadius: '7px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              boxShadow: '0 2px 6px rgba(24, 51, 254, 0.2)',
                              whiteSpace: 'nowrap',
                              textDecoration: 'none',
                              boxSizing: 'border-box',
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            <span>Edit CMS</span>
                          </Link>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                )}

                {/* 2. INDIVIDUAL SUB-SERVICE TYPE ROWS */}
                {subPages.map((sub) => {
                  const dateInfo = formatDate(sub.updatedAt);
                  const isPub = sub.isPublished !== false;
                  
                  let iconBg = '#EFF6FF';
                  let iconColor = '#1833FE';
                  let iconSvg = (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  );

                  if (sub.slug === 'custom-software') {
                    iconBg = '#F5F3FF';
                    iconColor = '#7C3AED';
                    iconSvg = (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="9" y="9" width="6" height="6" />
                        <line x1="9" y1="1" x2="9" y2="4" />
                        <line x1="15" y1="1" x2="15" y2="4" />
                        <line x1="9" y1="20" x2="9" y2="23" />
                        <line x1="15" y1="20" x2="15" y2="23" />
                        <line x1="20" y1="9" x2="23" y2="9" />
                        <line x1="20" y1="14" x2="23" y2="14" />
                        <line x1="1" y1="9" x2="4" y2="9" />
                        <line x1="1" y1="14" x2="4" y2="14" />
                      </svg>
                    );
                  } else if (sub.slug === 'mobile-application') {
                    iconBg = '#ECFDF5';
                    iconColor = '#059669';
                    iconSvg = (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                      </svg>
                    );
                  } else if (sub.slug === 'graphics-designing') {
                    iconBg = '#FFFBEB';
                    iconColor = '#D97706';
                    iconSvg = (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19l7-7 3 3-7 7-3-3z" />
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                        <path d="M2 2l7.586 7.586" />
                        <circle cx="11" cy="11" r="2" />
                      </svg>
                    );
                  } else if (sub.slug === 'digital-marketing') {
                    iconBg = '#FFF1F2';
                    iconColor = '#E11D48';
                    iconSvg = (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                      </svg>
                    );
                  }

                  return (
                    <tr key={sub.id} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                      <td style={{ padding: '0.65rem 0.4rem 0.65rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor, flexShrink: 0 }}>
                            {iconSvg}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.85rem' }}>
                              {sub.name}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 500 }}>
                              Service Detail Route
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.65rem 0.4rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #DBEAFE', display: 'inline-block' }}>
                          {sub.route}
                        </span>
                      </td>
                      <td style={{ padding: '0.65rem 0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', backgroundColor: '#F8FAFC', padding: '3px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                          {sub.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.65rem 0.4rem' }}>
                        {onToggleStatus ? (
                          <Tooltip text={isPub ? 'Click to make this page a Draft' : 'Click to Publish this page Live'} position="top">
                            <button
                              type="button"
                              disabled={togglingSlug === sub.id || togglingSlug === sub.slug}
                              onClick={() => onToggleStatus(sub.id || sub.slug, !isPub)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '0.725rem',
                                fontWeight: 700,
                                backgroundColor: isPub ? '#DCFCE7' : '#FEF3C7',
                                color: isPub ? '#15803D' : '#B45309',
                                border: `1px solid ${isPub ? '#BBF7D0' : '#FDE68A'}`,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <span>●</span>
                              <span>{isPub ? 'Published' : 'Draft'}</span>
                            </button>
                          </Tooltip>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '12px', fontSize: '0.725rem', fontWeight: 700, backgroundColor: isPub ? '#DCFCE7' : '#FEF3C7', color: isPub ? '#15803D' : '#B45309', border: `1px solid ${isPub ? '#BBF7D0' : '#FDE68A'}` }}>
                            <span>●</span>
                            <span>{isPub ? 'Published' : 'Draft'}</span>
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '0.65rem 0.4rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                            {dateInfo.dateStr}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600 }}>
                            {dateInfo.timeStr}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '0.65rem 1.25rem 0.65rem 0.4rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                          <Tooltip text={`View ${sub.name} page in new tab`} position="top">
                            <Link
                              href={sub.route}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: '#EFF6FF',
                                color: 'var(--brand-blue, #1833fe)',
                                border: '1px solid #BFDBFE',
                                height: '30px',
                                padding: '0 8px',
                                borderRadius: '7px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                              <span>View</span>
                            </Link>
                          </Tooltip>

                          <Tooltip text="Dynamic CMS editor for this specific service type" position="top">
                            <Link
                              href={`/superadmin/services/${sub.slug}`}
                              style={{
                                backgroundColor: '#FFFFFF',
                                color: 'var(--brand-blue, #1833fe)',
                                border: '1px solid #BFDBFE',
                                height: '30px',
                                padding: '0 8px',
                                borderRadius: '7px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                whiteSpace: 'nowrap',
                                textDecoration: 'none',
                                boxSizing: 'border-box',
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                              </svg>
                              <span>Edit</span>
                            </Link>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {services.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: '3rem 1rem', textAlign: 'center', color: '#64748B' }}>
                      <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🔍</div>
                      <div style={{ fontWeight: 700, color: '#1E293B' }}>No service pages found</div>
                      <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                        Try clearing your search query or adjusting status filters.
                      </div>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. TFOOTER PAGINATION BAR (100% Consistent with Home & Portfolio CMS) */}
      <div
        style={{
          flexShrink: 0,
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          padding: '0.65rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.825rem',
          color: '#64748B',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Entries Info & Rows Per Page */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span>
            Showing <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{startIndex}</strong> to{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{endIndex}</strong> of{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{total}</strong> service pages
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.775rem' }}>Rows per page:</span>
            <CustomDropdown<number>
              value={itemsPerPage}
              options={[5, 8, 10, 20]}
              onChange={(val) => {
                setItemsPerPage(Number(val));
                setCurrentPage(1);
              }}
              direction="up"
            />
          </div>
        </div>

        {/* Right: Page Navigation & Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Tooltip text="Go to previous page" position="top">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              style={{
                height: '30px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: currentPage === 1 ? '#F8FAFC' : '#FFFFFF',
                color: currentPage === 1 ? '#CBD5E1' : '#334155',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.775rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
            >
              <span>‹</span>
              <span>Prev</span>
            </button>
          </Tooltip>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                style={{
                  minWidth: '30px',
                  height: '30px',
                  padding: '0 8px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: currentPage === pageNum ? 'var(--dark-indigo, #1a0b54)' : '#E2E8F0',
                  backgroundColor: currentPage === pageNum ? 'var(--dark-indigo, #1a0b54)' : '#FFFFFF',
                  color: currentPage === pageNum ? '#FFFFFF' : '#475569',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  transition: 'all 0.15s ease',
                }}
              >
                {pageNum}
              </button>
            );
          })}

          <Tooltip text="Go to next page" position="top">
            <button
              type="button"
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              style={{
                height: '30px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: currentPage === totalPages || totalPages === 0 ? '#F8FAFC' : '#FFFFFF',
                color: currentPage === totalPages || totalPages === 0 ? '#CBD5E1' : '#334155',
                cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
                fontSize: '0.775rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Next</span>
              <span>›</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
