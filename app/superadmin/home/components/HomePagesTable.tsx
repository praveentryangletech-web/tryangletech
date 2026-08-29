'use client';

import React from 'react';
import Tooltip from '@/app/superadmin/components/Tooltip';
import CustomDropdown from '@/app/superadmin/components/CustomDropdown';
import { LocationItem, LocationSummaryItem, LocationRegion, DEFAULT_LOCATION_REGIONS } from '@/backend/services/geo/geo.types';

function formatPublishDateTime(dateVal?: string | Date): { dateStr: string; timeStr: string } {
  if (!dateVal) {
    return { dateStr: 'Aug 24, 2026', timeStr: '10:00 AM' };
  }
  try {
    const d = typeof dateVal === 'string' ? new Date(dateVal) : dateVal;
    if (isNaN(d.getTime())) return { dateStr: 'Aug 24, 2026', timeStr: '10:00 AM' };
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
    return { dateStr: 'Aug 24, 2026', timeStr: '10:00 AM' };
  }
}

interface HomePagesTableProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedRegionFilter: string;
  setSelectedRegionFilter: (val: string) => void;
  selectedStatusFilter?: 'all' | 'published' | 'draft';
  setSelectedStatusFilter?: (val: 'all' | 'published' | 'draft') => void;
  onToggleStatus?: (slug: string, isPublished: boolean) => void;
  togglingSlug?: string | null;
  locations: (LocationItem | LocationSummaryItem)[];
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
  onOpenEditLocation: (loc: LocationItem | LocationSummaryItem) => void;
  onOpenDuplicateModal: (source: { name: string; slug: string; region?: LocationRegion; country?: string }) => void;
  onSetDeletingLocation: (loc: LocationItem | LocationSummaryItem) => void;
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
  togglingSlug,
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

  // Dynamically compute all unique regions present in locations + default presets
  const dynamicRegions = React.useMemo(() => {
    const set = new Set<string>(DEFAULT_LOCATION_REGIONS);
    (locations || []).forEach((l) => {
      if (l.region && l.region.trim()) {
        set.add(l.region.trim());
      }
    });
    return Array.from(set);
  }, [locations]);

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
            padding: '0.85rem 1.25rem 0.5rem 1.25rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Search Input on Left */}
          <div style={{ position: 'relative', width: '280px', minWidth: '220px' }}>
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94A3B8',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by city, slug, country or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                onClick={() => setSearchQuery('')}
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

          {/* Right Action Controls: Status Filter Tabs & Create Clone Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Publication Status Filter Tabs */}
            {setSelectedStatusFilter && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '38px',
                  padding: '3px',
                  borderRadius: '8px',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  gap: '2px',
                  boxSizing: 'border-box',
                }}
              >
                {[
                  { key: 'all', label: 'All' },
                  { key: 'published', label: '● Published' },
                  { key: 'draft', label: '● Drafts' },
                ].map(({ key, label }) => {
                  const isActive = (selectedStatusFilter || 'all') === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedStatusFilter(key as any)}
                      style={{
                        height: '32px',
                        padding: '0 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                        color: isActive
                          ? key === 'published'
                            ? '#16A34A'
                            : key === 'draft'
                            ? '#D97706'
                            : 'var(--dark-indigo, #1a0b54)'
                          : '#64748B',
                        fontSize: '0.75rem',
                        fontWeight: isActive ? 800 : 600,
                        cursor: 'pointer',
                        boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.15s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
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
                justifyContent: 'center',
                gap: '6px',
                backgroundColor: 'var(--brand-blue, #1833fe)',
                color: '#FFFFFF',
                height: '38px',
                padding: '0 1.25rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
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
            padding: '0 1.25rem 0.65rem 1.25rem',
            overflowX: 'auto',
            overflowY: 'hidden',
            minWidth: 0,
          }}
        >
          {['All', ...dynamicRegions].map((reg) => {
            const isActive = selectedRegionFilter === reg;
            return (
              <Tooltip key={reg} text={reg === 'All' ? 'Show all location pages' : `Filter by ${reg} region`} position="top">
                <button
                  type="button"
                  onClick={() => setSelectedRegionFilter(reg)}
                  style={{
                    height: '32px',
                    padding: '0 14px',
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
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
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
              <th style={{ width: '26%', padding: '0.65rem 0.4rem 0.65rem 1.25rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                PAGE NAME & IDENTITY
              </th>
              <th style={{ width: '18%', padding: '0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                URL ROUTE
              </th>
              <th style={{ width: '13%', padding: '0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                REGION / COUNTRY
              </th>
              <th style={{ width: '11%', padding: '0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                STATUS
              </th>
              <th style={{ width: '16%', padding: '0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                PUBLISH DATE/TIME
              </th>
              <th style={{ width: '16%', padding: '0.65rem 1.25rem 0.65rem 0.4rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 1. PRIMARY MAIN HOMEPAGE ROW */}
            {showMainRow && (
              <tr className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#F0FDF4' }}>
                <td style={{ padding: '0.55rem 0.4rem 0.55rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534', flexShrink: 0 }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.85rem' }}>
                        Main Homepage
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 600 }}>
                        Default Core Site
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '0.55rem 0.4rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '6px' }}>
                    /
                  </span>
                </td>
                <td style={{ padding: '0.55rem 0.4rem', fontSize: '0.825rem', color: '#334155', fontWeight: 600 }}>
                  Primary Root
                </td>
                <td style={{ padding: '0.55rem 0.4rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '12px', fontSize: '0.725rem', fontWeight: 700, backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' }}>
                    ● Live Default
                  </span>
                </td>
                <td style={{ padding: '0.55rem 0.4rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                      Permanent Core
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 600 }}>
                      Live Synchronized
                    </span>
                  </div>
                </td>
                <td style={{ padding: '0.55rem 1.25rem 0.55rem 0.4rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
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
              Array.from({ length: itemsPerPage || 6 }).map((_, idx) => (
                <tr key={`skeleton-${idx}`} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <td style={{ padding: '0.55rem 0.4rem 0.55rem 1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div className="rt-skeleton-box" style={{ height: '16px', width: `${90 + (idx % 3) * 25}px`, borderRadius: '4px' }} />
                      <div className="rt-skeleton-box" style={{ height: '12px', width: '70px', borderRadius: '3px' }} />
                    </div>
                  </td>
                  <td style={{ padding: '0.55rem 0.4rem' }}>
                    <div className="rt-skeleton-box" style={{ height: '22px', width: '130px', borderRadius: '6px' }} />
                  </td>
                  <td style={{ padding: '0.55rem 0.4rem' }}>
                    <div className="rt-skeleton-box" style={{ height: '16px', width: '85px', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '0.55rem 0.4rem' }}>
                    <div className="rt-skeleton-box" style={{ height: '24px', width: '75px', borderRadius: '12px' }} />
                  </td>
                  <td style={{ padding: '0.55rem 0.4rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div className="rt-skeleton-box" style={{ height: '14px', width: '80px', borderRadius: '3px' }} />
                      <div className="rt-skeleton-box" style={{ height: '11px', width: '55px', borderRadius: '3px' }} />
                    </div>
                  </td>
                  <td style={{ padding: '0.55rem 1.25rem 0.55rem 0.4rem', textAlign: 'center' }}>
                    <div className="rt-skeleton-box" style={{ height: '30px', width: '140px', borderRadius: '7px', margin: '0 auto' }} />
                  </td>
                </tr>
              ))
            ) : locations.length === 0 && !showMainRow ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.875rem' }}>
                  No matching location pages found.
                </td>
              </tr>
            ) : (
              locations.map((loc) => {
                const isPub = loc.isPublished !== false;
                const dateInfo = formatPublishDateTime(loc.createdAt || loc.updatedAt);
                return (
                  <tr key={loc.slug} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    <td style={{ padding: '0.55rem 0.4rem 0.55rem 1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.85rem' }}>
                          {loc.city}
                        </span>
                        {loc.popular && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '1px 5px', borderRadius: '4px', backgroundColor: '#FEF3C7', color: '#B45309' }}>
                            ★ POPULAR
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                        {loc.state ? `${loc.state} • ` : ''}
                        <span style={{ color: 'var(--brand-blue, #1833fe)', fontWeight: 600 }}>{loc.region}</span>
                      </div>
                    </td>

                    <td style={{ padding: '0.55rem 0.4rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #DBEAFE', display: 'inline-block' }}>
                        /{loc.slug}
                      </span>
                    </td>

                    <td style={{ padding: '0.55rem 0.4rem' }}>
                      <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#334155' }}>{loc.country}</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 5px', borderRadius: '4px', marginLeft: '6px', fontWeight: 600 }}>
                        {loc.countryCode}
                      </span>
                    </td>

                    <td style={{ padding: '0.55rem 0.4rem' }}>
                      {onToggleStatus ? (
                        <Tooltip text={isPub ? 'Click to make this page a Draft (Hidden from public)' : 'Click to Publish this page Live'} position="top">
                          <button
                            type="button"
                            disabled={togglingSlug === loc.slug}
                            onClick={() => onToggleStatus(loc.slug, !isPub)}
                            className="admin-status-toggle-btn"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '3px 10px',
                              borderRadius: '12px',
                              fontSize: '0.725rem',
                              fontWeight: 800,
                              backgroundColor: isPub ? '#DCFCE7' : '#FEF3C7',
                              color: isPub ? '#15803D' : '#B45309',
                              border: `1.5px solid ${isPub ? '#86EFAC' : '#FCD34D'}`,
                              cursor: togglingSlug === loc.slug ? 'wait' : 'pointer',
                              boxShadow: isPub ? '0 1px 3px rgba(22, 163, 74, 0.12)' : '0 1px 3px rgba(217, 119, 6, 0.12)',
                              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                              transform: togglingSlug === loc.slug ? 'scale(0.96)' : 'scale(1)',
                              opacity: togglingSlug === loc.slug ? 0.7 : 1,
                            }}
                            onMouseDown={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.90)';
                            }}
                            onMouseUp={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget as HTMLButtonElement;
                              el.style.transform = 'scale(1.05)';
                              el.style.boxShadow = isPub ? '0 3px 10px rgba(22, 163, 74, 0.25)' : '0 3px 10px rgba(217, 119, 6, 0.25)';
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget as HTMLButtonElement;
                              el.style.transform = 'scale(1)';
                              el.style.boxShadow = isPub ? '0 1px 3px rgba(22, 163, 74, 0.12)' : '0 1px 3px rgba(217, 119, 6, 0.12)';
                            }}
                          >
                            {togglingSlug === loc.slug ? (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-spin">
                                <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                              </svg>
                            ) : (
                              <span style={{ fontSize: '0.65rem', animation: isPub ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none' }}>●</span>
                            )}
                            <span>{togglingSlug === loc.slug ? 'Updating...' : isPub ? 'Published' : 'Draft'}</span>
                          </button>
                        </Tooltip>
                      ) : (
                        <span
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
                          }}
                        >
                          <span>●</span>
                          <span>{isPub ? 'Published' : 'Draft'}</span>
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '0.55rem 0.4rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                          {dateInfo.dateStr}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600 }}>
                          {dateInfo.timeStr}
                        </span>
                      </div>
                    </td>

                  <td style={{ padding: '0.55rem 1.25rem 0.55rem 0.4rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Tooltip text="View live location page" position="top">
                        <a
                          href={`/${loc.slug}`}
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
          padding: '0.65rem 1.25rem',
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
