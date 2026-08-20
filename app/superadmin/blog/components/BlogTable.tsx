'use client';

import React from 'react';
import SafeImage from '@/app/common/SafeImage';
import { BlogPostItem } from '@/backend/services/blog';
import Tooltip from '../../components/Tooltip';
import CustomDropdown from '../../components/CustomDropdown';
import { useBlog } from '../../context/BlogContext';
import BlogCategoryManageModal from './BlogCategoryManageModal';

/**
 * Props for BlogTable component defining modal trigger callbacks
 */
interface BlogTableProps {
  onEditPost: (post: BlogPostItem) => void;
  onDeletePost: (post: BlogPostItem) => void;
  onAddNewPost: () => void;
  onSelectPost?: (post: BlogPostItem) => void;
}

/**
 * BlogTable Component
 * 
 * Renders the 100% exact copy of Superadmin portfolio UI connected directly
 * to server-side blog API querying, category filtering, and pagination.
 */
export default function BlogTable({
  onSelectPost,
  onEditPost,
  onDeletePost,
  onAddNewPost,
}: BlogTableProps) {
  // Server-side state & metadata from BlogContext
  const {
    postsList,
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
    togglePostStatus,
    categories: dynamicCategories,
    categoriesData,
    isLoadingCategories,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    addCategory,
    deleteCategory,
  } = useBlog();

  const categories = React.useMemo(() => ['ALL', ...(dynamicCategories || [])], [dynamicCategories]);

  // Derive pagination bounds from the API response
  const totalItems = pagination?.total ?? postsList.length;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? page;
  const itemsPerPage = pagination?.limit ?? limit;

  const startIndex = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min((currentPage - 1) * itemsPerPage + postsList.length, totalItems);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 75px)', minHeight: 0, backgroundColor: 'transparent' }}>
      {/* 1. FIXED TOP TOOLBAR & CATEGORY FILTER CHIPS */}
      <div style={{ flexShrink: 0 }}>
        {/* Search Input on Left, Actions on Right */}
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
              placeholder="Search articles by title, author, content, tags..."
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

          {/* Action Buttons: Manage Categories & Add New Article */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Tooltip text="View, add, or delete dynamic categories" position="left">
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

            {/* "+ Add New Article" Primary Action Button with Tooltip */}
            <Tooltip text="Create and publish a new blog article" position="left">
              <button
                onClick={onAddNewPost}
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
                <span>Add New Article</span>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Category Filter Chips (Scrollable with hidden scrollbar) */}
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
          {isLoadingCategories ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {[55, 120, 100, 130, 115, 95, 110, 80].map((width, idx) => (
                <div
                  key={idx}
                  className="agy-skeleton"
                  style={{
                    width: `${width}px`,
                    height: '29px',
                    borderRadius: '8px',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          ) : (
            categories.map((cat) => (
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
                    flexShrink: 0,
                  }}
                >
                  {cat}
                </button>
              </Tooltip>
            ))
          )}
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
              <th style={{ width: '28%', padding: '0.85rem 0.75rem 0.85rem 2rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                ARTICLE
              </th>
              <th style={{ width: '15%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                CATEGORY
              </th>
              <th style={{ width: '16%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                AUTHOR / ROLE
              </th>
              <th style={{ width: '14%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                DATE & TIME
              </th>
              <th style={{ width: '10%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                STATUS
              </th>
              <th style={{ width: '19%', padding: '0.85rem 2rem 0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={`skeleton-${idx}`} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  {/* Article Column Skeleton */}
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

                  {/* Author / Role Column Skeleton */}
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <div className="skeleton-shimmer" style={{ height: '12px', width: '80%' }} />
                      <div className="skeleton-shimmer" style={{ height: '9px', width: '55%' }} />
                    </div>
                  </td>

                  {/* Read Time Column Skeleton */}
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '14px', width: '60px', borderRadius: '4px' }} />
                  </td>

                  {/* Status Column Skeleton */}
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '18px', width: '55px', borderRadius: '12px' }} />
                  </td>

                  {/* Actions Column Skeleton */}
                  <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <div className="skeleton-shimmer" style={{ height: '26px', width: '88px', borderRadius: '6px' }} />
                      <div className="skeleton-shimmer" style={{ height: '26px', width: '28px', borderRadius: '6px' }} />
                      <div className="skeleton-shimmer" style={{ height: '26px', width: '28px', borderRadius: '6px' }} />
                    </div>
                  </td>
                </tr>
              ))
            ) : postsList.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
                  No blog articles found matching your search.
                </td>
              </tr>
            ) : (
              postsList.map((item) => (
                <tr key={item.slug || item.id} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  {/* Article Column */}
                  <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem', overflow: 'hidden' }}>
                    <div
                      onClick={() => onEditPost(item)}
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
                        {item.coverImage ? (
                          <SafeImage
                            src={item.coverImage}
                            fallbackSrc="/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png"
                            alt={item.title}
                            fill
                            sizes="42px"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                              <path d="M18 14h-8" />
                              <path d="M15 18h-5" />
                              <path d="M10 6h8v4h-8V6Z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div style={{ minWidth: 0, overflow: 'hidden' }}>
                        <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.excerpt || item.content?.slice(0, 80)}
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

                  {/* Author / Role Column */}
                  <td style={{ padding: '0.75rem 0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <div style={{ color: '#334155', fontSize: '0.825rem', fontWeight: 700 }}>
                      {item.authorName || <span style={{ color: '#94A3B8', fontWeight: 500 }}>TryangleTech Team</span>}
                    </div>
                    {item.authorRole && (
                      <div style={{ color: '#64748B', fontSize: '0.725rem', fontWeight: 500, marginTop: '2px' }}>
                        {item.authorRole}
                      </div>
                    )}
                  </td>

                  {/* Publish Date & Time Column */}
                  <td style={{ padding: '0.75rem 0.5rem', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '0.8rem', color: '#1E293B', fontWeight: 600 }}>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '29 Oct 2025'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>
                      {item.publishedAt && item.publishedAt.includes('T')
                        ? new Date(item.publishedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                        : item.readTime || '5 min read'}
                    </div>
                  </td>

                  {/* Status Badge (Click to toggle Draft / Live directly) */}
                  <td style={{ padding: '0.75rem 0.5rem', whiteSpace: 'nowrap' }}>
                    <Tooltip text={`Click to change status to ${item.published ? 'Draft' : 'Live'}`} position="top">
                      <button
                        type="button"
                        onClick={() => togglePostStatus(item)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          backgroundColor: item.published ? '#ECFDF5' : '#FEF3C7',
                          color: item.published ? '#059669' : '#D97706',
                          border: `1px solid ${item.published ? '#A7F3D0' : '#FDE68A'}`,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          outline: 'none',
                        }}
                      >
                        <span>{item.published ? '● Live' : '○ Draft'}</span>
                      </button>
                    </Tooltip>
                  </td>

                  {/* Actions Column: Direct Live Link, Edit, and Delete */}
                  <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {/* Direct Link to Public Blog Post */}
                      <Tooltip text="View live public article page" position="top">
                        <a
                          href={`/blog/${item.slug}`}
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

                      {/* Edit Article Button with Standard SVG Pencil */}
                      <Tooltip text="Edit article in full-page editor" position="top">
                        <button
                          onClick={() => onEditPost(item)}
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

                      {/* Delete Article Button with Standard SVG Trash Can */}
                      <Tooltip text="Permanently delete article" position="top">
                        <button
                          onClick={() => onDeletePost(item)}
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
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{totalItems}</strong> articles
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
              disabled={!pagination?.hasPrevPage || currentPage <= 1}
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
              disabled={!pagination?.hasNextPage || currentPage >= totalPages || totalPages === 0}
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

      {/* Dynamic Category Management Modal */}
      <BlogCategoryManageModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categoriesData}
        isLoading={isLoadingCategories}
        onAddCategory={addCategory}
        onDeleteCategory={deleteCategory}
      />
    </div>
  );
}
