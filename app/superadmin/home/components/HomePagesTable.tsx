'use client';

import React from 'react';
import Tooltip from '@/app/superadmin/components/Tooltip';
import CustomDropdown from '@/app/superadmin/components/CustomDropdown';
import { LocationItem, LocationRegion } from '@/backend/services/geo/geo.types';

const REGION_OPTIONS: LocationRegion[] = [
  'Gujarat',
  'India Metros',
  'Middle East',
  'USA & Canada',
  'Europe & UK',
  'Global Hubs',
];

interface HomePagesTableProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedRegionFilter: string;
  setSelectedRegionFilter: (val: string) => void;
  selectedStatusFilter?: 'all' | 'published' | 'draft';
  setSelectedStatusFilter?: (val: 'all' | 'published' | 'draft') => void;
  onToggleStatus?: (slug: string, isPublished: boolean) => void;
  locations: LocationItem[];
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: (val: number) => void;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  onOpenEditMain: () => void;
  onOpenEditLocation: (loc: LocationItem) => void;
  onOpenDuplicateModal: (source: { name: string; slug: string; region?: LocationRegion; country?: string }) => void;
  onSetDeletingLocation: (loc: LocationItem) => void;
  successMessage?: string;
  errorMessage?: string;
}

export default function HomePagesTable({
  searchQuery,
  setSearchQuery,
  selectedRegionFilter,
  setSelectedRegionFilter,
  selectedStatusFilter = 'all',
  setSelectedStatusFilter,
  onToggleStatus,
  locations,
  isLoading,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  pagination,
  onOpenEditMain,
  onOpenEditLocation,
  onOpenDuplicateModal,
  onSetDeletingLocation,
  successMessage,
  errorMessage,
}: HomePagesTableProps) {
  const showMainRow = currentPage === 1 && selectedRegionFilter === 'All' && selectedStatusFilter !== 'draft' && !searchQuery;
  const totalLocations = pagination.total;
  const totalPages = pagination.totalPages || 1;
  const startIndex = totalLocations > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, totalLocations);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 75px)', minHeight: 0, backgroundColor: 'transparent' }}>
      {/* 1. TOP TOOLBAR */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.25rem 2rem 0.75rem 2rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Search Input on Left */}
          <div style={{ position: 'relative', width: '360px', maxWidth: '100%' }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by city, slug, country, or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.65rem 1.15rem 0.65rem 2.4rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                width: '100%',
                boxSizing: 'border-box',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                fontFamily: 'inherit',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            />
          </div>

          {/* Action Buttons & Status Selector on Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {setSelectedStatusFilter && (
              <div style={{ display: 'inline-flex', padding: '3px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1' }}>
                {(['all', 'published', 'draft'] as const).map((st) => {
                  const isActive = selectedStatusFilter === st;
                  const label = st === 'all' ? 'All' : st === 'published' ? '● Published' : '● Drafts';
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        setSelectedStatusFilter(st);
                        setCurrentPage(1);
                      }}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: isActive ? (st === 'published' ? '#DCFCE7' : st === 'draft' ? '#FEF3C7' : 'var(--dark-indigo, #1a0b54)') : 'transparent',
                        color: isActive ? (st === 'published' ? '#15803D' : st === 'draft' ? '#B45309' : '#FFFFFF') : '#64748B',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={() => onOpenDuplicateModal({ name: 'Main Homepage', slug: 'main' })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--brand-blue, #1833fe)',
                color: '#FFFFFF',
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>+</span>
              <span>Create Location Clone</span>
            </button>
          </div>
        </div>

        {/* Region Filter Chips */}
        <div
          className="no-scrollbar"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            gap: '8px',
            padding: '0 2rem 1rem 2rem',
            overflowX: 'auto',
            overflowY: 'hidden',
            minWidth: 0,
          }}
        >
          {['All', ...REGION_OPTIONS].map((reg) => {
            const isActive = selectedRegionFilter === reg;
            return (
              <Tooltip key={reg} text={reg === 'All' ? 'Show all location pages' : `Filter by ${reg} region`} position="top">
                <button
                  type="button"
                  onClick={() => setSelectedRegionFilter(reg)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--dark-indigo, #1a0b54)' : '#E2E8F0',
                    backgroundColor: isActive ? 'var(--dark-indigo, #1a0b54)' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#64748B',
                    fontSize: '0.775rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {reg}
                </button>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div style={{ margin: '0 2rem 1rem 2rem', padding: '10px 16px', backgroundColor: '#ECFDF5', border: '1px solid #34D399', color: '#065F46', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 600 }}>
          ✓ {successMessage}
        </div>
      )}
      {errorMessage && (
        <div style={{ margin: '0 2rem 1rem 2rem', padding: '10px 16px', backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#991B1B', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 600 }}>
          ⚠ {errorMessage}
        </div>
      )}

      {/* 2. SCROLLABLE TBODY CONTAINER WITH STICKY THEAD */}
      <div
        className="admin-scroll-area"
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'auto',
          width: '100%',
          minHeight: 0,
        }}
      >
        <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', textAlign: 'left' }}>
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
              <th style={{ width: '28%', padding: '0.85rem 0.75rem 0.85rem 2rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                PAGE NAME & IDENTITY
              </th>
              <th style={{ width: '22%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                URL ROUTE
              </th>
              <th style={{ width: '18%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                REGION / COUNTRY
              </th>
              <th style={{ width: '14%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                STATUS
              </th>
              <th style={{ width: '18%', padding: '0.85rem 2rem 0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 1. PRIMARY MAIN HOMEPAGE ROW */}
            {showMainRow && (
              <tr className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#F0FDF4' }}>
                <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.875rem' }}>
                        Main Homepage
                      </div>
                      <div style={{ fontSize: '0.725rem', color: '#166534', fontWeight: 600 }}>
                        Default Core Site
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '6px' }}>
                    /
                  </span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.825rem', color: '#334155', fontWeight: 600 }}>
                  Primary Root
                </td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '12px', fontSize: '0.725rem', fontWeight: 700, backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' }}>
                    ● Live Default
                  </span>
                </td>
                <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Tooltip text="View live homepage in new tab" position="top">
                      <a
                        href="/"
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
                      </a>
                    </Tooltip>

                    <Tooltip text="Edit Main Homepage in CMS editor" position="top">
                      <button
                        type="button"
                        onClick={onOpenEditMain}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          color: '#475569',
                          height: '30px',
                          width: '30px',
                          padding: 0,
                          borderRadius: '7px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </Tooltip>

                    <Tooltip text="Duplicate homepage into a new location clone" position="top">
                      <button
                        type="button"
                        onClick={() => onOpenDuplicateModal({ name: 'Main Homepage', slug: 'main' })}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          color: '#475569',
                          height: '30px',
                          width: '30px',
                          padding: 0,
                          borderRadius: '7px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                    </Tooltip>

                    <Tooltip text="Default Core Site cannot be deleted" position="top">
                      <div
                        style={{
                          height: '30px',
                          width: '30px',
                          borderRadius: '7px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#CBD5E1',
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            )}

            {/* 2. PROGRAMMATIC GEO CLONE ROWS */}
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={`skeleton-${idx}`} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '18px', width: '120px', borderRadius: '6px' }} />
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '18px', width: '100px', borderRadius: '6px' }} />
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '18px', width: '90px', borderRadius: '6px' }} />
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '18px', width: '60px', borderRadius: '12px' }} />
                  </td>
                  <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right' }}>
                    <div className="skeleton-shimmer" style={{ height: '28px', width: '140px', borderRadius: '6px', marginLeft: 'auto' }} />
                  </td>
                </tr>
              ))
            ) : locations.length === 0 && !showMainRow ? (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.875rem' }}>
                  No matching location pages found.
                </td>
              </tr>
            ) : (
              locations.map((loc) => {
                const isPub = loc.isPublished !== false;
                return (
                  <tr key={loc.slug} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.875rem' }}>
                          {loc.city}
                        </span>
                        {loc.popular && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '1px 5px', borderRadius: '4px', backgroundColor: '#FEF3C7', color: '#B45309' }}>
                            ★ POPULAR
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: '#64748B' }}>
                        {loc.state ? `${loc.state} • ` : ''}
                        <span style={{ color: 'var(--brand-blue, #1833fe)', fontWeight: 600 }}>{loc.region}</span>
                      </div>
                    </td>

                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #DBEAFE', display: 'inline-block' }}>
                        /location/{loc.slug}
                      </span>
                    </td>

                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#334155' }}>{loc.country}</span>
                      <span style={{ fontSize: '0.725rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: 600 }}>
                        {loc.countryCode}
                      </span>
                    </td>

                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {onToggleStatus ? (
                        <Tooltip text={isPub ? 'Click to make this page a Draft (Hidden)' : 'Click to Publish this page Live'} position="top">
                          <button
                            type="button"
                            onClick={() => onToggleStatus(loc.slug, !isPub)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '3px 10px',
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
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            backgroundColor: isPub ? '#DCFCE7' : '#FEF3C7',
                            color: isPub ? '#15803D' : '#B45309',
                            border: `1px solid ${isPub ? '#BBF7D0' : '#FDE68A'}`,
                          }}
                        >
                          <span>●</span>
                          <span>{isPub ? 'Published' : 'Draft'}</span>
                        </span>
                      )}
                    </td>

                  <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Tooltip text="View live location page" position="top">
                        <a
                          href={`/location/${loc.slug}`}
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
                        </a>
                      </Tooltip>

                      <Tooltip text="Edit location in CMS editor" position="top">
                        <button
                          type="button"
                          onClick={() => onOpenEditLocation(loc)}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569',
                            height: '30px',
                            width: '30px',
                            padding: 0,
                            borderRadius: '7px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </Tooltip>

                      <Tooltip text="Duplicate / clone page" position="top">
                        <button
                          type="button"
                          onClick={() => onOpenDuplicateModal({ name: loc.city, slug: loc.slug, region: loc.region, country: loc.country })}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569',
                            height: '30px',
                            width: '30px',
                            padding: 0,
                            borderRadius: '7px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        </button>
                      </Tooltip>

                      <Tooltip text="Permanently delete location" position="top">
                        <button
                          type="button"
                          onClick={() => onSetDeletingLocation(loc)}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #FECACA',
                            color: '#DC2626',
                            height: '30px',
                            width: '30px',
                            padding: 0,
                            borderRadius: '7px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
          </tbody>
        </table>
      </div>

      {/* 3. TFOOTER PAGINATION BAR */}
      <div
        style={{
          flexShrink: 0,
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          padding: '0.85rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Left: Entries Info & Rows Per Page */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span>
            Showing <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{startIndex}</strong> to{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{endIndex}</strong> of{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{totalLocations}</strong> location pages
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
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: currentPage === 1 ? '#F8FAFC' : '#FFFFFF',
                color: currentPage === 1 ? '#CBD5E1' : '#334155',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.775rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
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
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: currentPage === pageNum ? 'var(--dark-indigo, #1a0b54)' : '#E2E8F0',
                  backgroundColor: currentPage === pageNum ? 'var(--dark-indigo, #1a0b54)' : '#FFFFFF',
                  color: currentPage === pageNum ? '#FFFFFF' : '#475569',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: currentPage === totalPages || totalPages === 0 ? '#F8FAFC' : '#FFFFFF',
                color: currentPage === totalPages || totalPages === 0 ? '#CBD5E1' : '#334155',
                cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
                fontSize: '0.775rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
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
