'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SafeImage from '@/app/common/SafeImage';
import { Project, PORTFOLIO_CATEGORIES } from '../../../data/portfolioData';
import Tooltip from '../../components/Tooltip';
import CustomDropdown from '../../components/CustomDropdown';
import { usePortfolio } from '../../context/PortfolioContext';

/**
 * Props for PortfolioTable component defining modal trigger callbacks
 */
interface PortfolioTableProps {
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  onAddNewProject: () => void;
  onSelectProject?: (project: Project) => void;
}

/**
 * PortfolioTable Component
 * 
 * Renders the 100% original Superadmin portfolio UI connected directly
 * to server-side API querying and pagination.
 * 
 * @param {PortfolioTableProps} props - Action callbacks
 */
export default function PortfolioTable({
  onSelectProject,
  onEditProject,
  onDeleteProject,
  onAddNewProject,
}: PortfolioTableProps) {
  // Server-side state & metadata from PortfolioContext
  const {
    projectsList,
    isLoading,
    page,
    setPage,
    limit,
    setLimit,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    pagination,
    categories: dynamicCategories,
    setIsCategoryModalOpen,
  } = usePortfolio();

  const categories = ['ALL', ...(dynamicCategories || [])];

  // Derive pagination bounds from the API response
  const totalItems = pagination?.total ?? projectsList.length;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? page;
  const itemsPerPage = pagination?.limit ?? limit;

  const startIndex = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min((currentPage - 1) * itemsPerPage + projectsList.length, totalItems);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 75px)', minHeight: 0, backgroundColor: 'transparent' }}>
      {/* 1. FIXED TOP TOOLBAR & CATEGORY FILTER CHIPS */}
      <div style={{ flexShrink: 0 }}>
        {/* Search Input on Left, Action Buttons on Right */}
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
              placeholder="Search portfolio by title, client, tech stack..."
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
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            />
          </div>

          {/* Action Buttons: Manage Categories & Add New Project */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Tooltip text="View, add, or delete dynamic portfolio categories" position="left">
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  padding: '0.65rem 1.15rem',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <span>Manage Categories</span>
              </button>
            </Tooltip>

            {/* "+ Add New Project" Primary Action Button with Tooltip */}
            <Tooltip text="Create and publish a new portfolio case study" position="left">
              <button
                onClick={onAddNewProject}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--brand-blue, #1833fe)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.35rem',
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
                <span>Add New Project</span>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Category Filter Chips (Left) & Quick Manage Pill (Right) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '0 2rem 1rem 2rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Left Side: Filter Chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {categories.map((cat) => (
              <Tooltip key={cat} text={cat === 'ALL' ? 'Show all categories' : `Filter by ${cat}`} position="top">
                <button
                  onClick={() => setCategoryFilter(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: categoryFilter === cat ? 'var(--dark-indigo, #1a0b54)' : '#E2E8F0',
                    backgroundColor: categoryFilter === cat ? 'var(--dark-indigo, #1a0b54)' : '#FFFFFF',
                    color: categoryFilter === cat ? '#FFFFFF' : '#64748B',
                    fontSize: '0.775rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat}
                </button>
              </Tooltip>
            ))}
          </div>

          {/* Right Side: Quick Add/Manage Categories Pill */}
          <div style={{ marginLeft: 'auto' }}>
            <Tooltip text="Add new category or delete existing categories" position="top">
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  border: '1.5px dashed #94A3B8',
                  backgroundColor: '#F8FAFC',
                  color: 'var(--brand-blue, #1833fe)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>+</span>
                <span>Manage Categories</span>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

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
              <th style={{ width: '25%', padding: '0.85rem 0.75rem 0.85rem 2rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                PROJECT
              </th>
              <th style={{ width: '14%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                CATEGORY
              </th>
              <th style={{ width: '17%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                CLIENT / ROLE
              </th>
              <th style={{ width: '16%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                TECH STACK
              </th>
              <th style={{ width: '11%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                LIVE DEMO
              </th>
              <th style={{ width: '17%', padding: '0.85rem 2rem 0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={`skeleton-${idx}`} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  {/* Project Column Skeleton */}
                  <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="skeleton-shimmer" style={{ width: '42px', height: '34px', borderRadius: '6px', flexShrink: 0 }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', overflow: 'hidden' }}>
                        <div className="skeleton-shimmer" style={{ height: '13px', width: `${60 + (idx % 3) * 15}%` }} />
                        <div className="skeleton-shimmer" style={{ height: '9px', width: '85%' }} />
                      </div>
                    </div>
                  </td>

                  {/* Category Column Skeleton */}
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '20px', width: '90px', borderRadius: '6px' }} />
                  </td>

                  {/* Client / Role Column Skeleton */}
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <div className="skeleton-shimmer" style={{ height: '12px', width: '80%' }} />
                      <div className="skeleton-shimmer" style={{ height: '9px', width: '55%' }} />
                    </div>
                  </td>

                  {/* Tech Stack Column Skeleton */}
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div className="skeleton-shimmer" style={{ height: '16px', width: '40px', borderRadius: '4px' }} />
                      <div className="skeleton-shimmer" style={{ height: '16px', width: '45px', borderRadius: '4px' }} />
                    </div>
                  </td>

                  {/* Live Demo Column Skeleton */}
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '13px', width: '55px' }} />
                  </td>

                  {/* Actions Column Skeleton */}
                  <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <div className="skeleton-shimmer" style={{ height: '26px', width: '88px', borderRadius: '6px' }} />
                      <div className="skeleton-shimmer" style={{ height: '26px', width: '28px', borderRadius: '6px' }} />
                      <div className="skeleton-shimmer" style={{ height: '26px', width: '28px', borderRadius: '6px' }} />
                      <div className="skeleton-shimmer" style={{ height: '26px', width: '28px', borderRadius: '6px' }} />
                    </div>
                  </td>
                </tr>
              ))
            ) : projectsList.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
                  No portfolio projects found matching your search.
                </td>
              </tr>
            ) : (
              projectsList.map((item) => (
                <tr key={item.slug || (item as any).id} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  {/* Project Column */}
                  <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem', overflow: 'hidden' }}>
                    <div
                      onClick={() => onEditProject(item)}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '34px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          backgroundColor: '#F1F5F9',
                          position: 'relative',
                          flexShrink: 0,
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        {item.image ? (
                          <SafeImage
                            src={item.image}
                            fallbackSrc="/portfolio/vh-accounting.webp"
                            alt={item.title}
                            fill
                            sizes="42px"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                              <line x1="8" y1="21" x2="16" y2="21" />
                              <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div style={{ minWidth: 0, overflow: 'hidden' }}>
                        <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category Column */}
                  <td style={{ padding: '0.75rem 0.5rem', whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        backgroundColor: '#F1F5F9',
                        color: 'var(--dark-indigo, #1a0b54)',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      {item.category}
                    </span>
                  </td>

                  {/* Client / Role Column */}
                  <td style={{ padding: '0.75rem 0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <div style={{ color: '#334155', fontSize: '0.825rem', fontWeight: 700 }}>
                      {item.client || <span style={{ color: '#94A3B8', fontWeight: 500 }}>Internal Project</span>}
                    </div>
                    {item.role && (
                      <div style={{ color: '#64748B', fontSize: '0.725rem', fontWeight: 500, marginTop: '2px' }}>
                        {item.role}
                      </div>
                    )}
                  </td>

                  {/* Tech Stack Chips */}
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {item.technologies && item.technologies.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          style={{
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            color: '#475569',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.675rem',
                            fontWeight: 600,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {item.technologies && item.technologies.length > 2 && (
                        <span style={{ fontSize: '0.675rem', color: '#94A3B8', fontWeight: 600 }}>
                          +{item.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Live Demo Link with Tooltip */}
                  <td style={{ padding: '0.75rem 0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.liveUrl ? (
                      <Tooltip text={`Open live client website: ${item.liveUrl}`} position="top">
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--brand-blue, #1833fe)',
                            fontWeight: 700,
                            fontSize: '0.775rem',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          Live Site ↗
                        </a>
                      </Tooltip>
                    ) : (
                      <span style={{ fontSize: '0.725rem', color: '#94A3B8' }}>Case Study</span>
                    )}
                  </td>

                  {/* Actions Column: Direct Live Link, Edit, and Delete */}
                  <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {/* Direct Link to Public Case Study Page */}
                      <Tooltip text="View public case study page in new tab" position="top">
                        <a
                          href={`/portfolio/${item.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: '#EFF6FF',
                            color: 'var(--brand-blue, #1833fe)',
                            border: '1px solid #BFDBFE',
                            height: '30px',
                            padding: '0 10px',
                            borderRadius: '7px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                            gap: '5px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          <span>View Live</span>
                        </a>
                      </Tooltip>

                      {/* Edit Project Button with Standard SVG Pencil */}
                      <Tooltip text="Edit case study in full-page editor" position="top">
                        <button
                          onClick={() => onEditProject(item)}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569',
                            height: '30px',
                            width: '30px',
                            padding: 0,
                            borderRadius: '7px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </Tooltip>

                      {/* Delete Project Button with Standard SVG Trash Can */}
                      <Tooltip text="Permanently delete project" position="top">
                        <button
                          onClick={() => onDeleteProject(item)}
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
                            boxSizing: 'border-box',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              ))
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
        {/* Left: Summary & Rows per Page Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.825rem', color: '#64748B' }}>
          <span>
            Showing <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{startIndex}</strong> to{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{endIndex}</strong> of{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{totalItems}</strong> projects
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.775rem' }}>Rows per page:</span>
            <CustomDropdown<number>
              value={itemsPerPage}
              options={[5, 8, 10, 20]}
              onChange={(val) => setLimit(Number(val))}
              direction="up"
            />
          </div>
        </div>

        {/* Right: Page Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Tooltip text="Go to previous page" position="top">
            <button
              disabled={!pagination.hasPrevPage || currentPage <= 1}
              onClick={() => setPage(Math.max(currentPage - 1, 1))}
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


          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
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
              disabled={!pagination.hasNextPage || currentPage >= totalPages || totalPages === 0}
              onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
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
