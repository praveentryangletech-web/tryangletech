'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, PORTFOLIO_CATEGORIES, projects as staticProjects } from '../../../data/portfolioData';
import Tooltip from '../../components/Tooltip';

interface PortfolioTableProps {
  projectsList: Project[];
  isLoading: boolean;
  onSelectProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
  onAddNewProject: () => void;
}

export default function PortfolioTable({
  projectsList,
  isLoading,
  onSelectProject,
  onEditProject,
  onDeleteProject,
  onAddNewProject,
}: PortfolioTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const categories = ['ALL', ...PORTFOLIO_CATEGORIES];

  const currentList = projectsList && projectsList.length > 0 ? projectsList : staticProjects;

  const filteredProjects = currentList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.technologies && item.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory =
      categoryFilter === 'ALL' ||
      item.category.toLowerCase() === categoryFilter.toLowerCase() ||
      (categoryFilter === 'E-Commerce' && item.category.includes('E-Commerce')) ||
      (categoryFilter === 'Mobile Application' && item.category.includes('Mobile'));

    return matchesSearch && matchesCategory;
  });

  // Reset page to 1 when search query, filter, or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, itemsPerPage]);

  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 75px)', minHeight: 0, backgroundColor: 'transparent' }}>
      {/* 1. FIXED TOP TOOLBAR & CATEGORY FILTER CHIPS */}
      <div style={{ flexShrink: 0 }}>
        {/* Search Input on Left, "+ Add New Project" Action Button on Right */}
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
          <input
            type="text"
            placeholder="🔍 Search portfolio by title, client, tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.65rem 1.15rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              width: '360px',
              maxWidth: '100%',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
          />

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

        {/* Category Filter Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            padding: '0 2rem 1rem 2rem',
          }}
        >
          {categories.map((cat) => (
            <Tooltip key={cat} text={cat === 'ALL' ? 'Show all 6 core categories' : `Filter by ${cat}`} position="top">
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
              backgroundColor: '#f0f4ff',
              boxShadow: '0 1px 0 rgba(0, 0, 0, 0.12)',
            }}
          >
            <tr>
              <th style={{ width: '25%', padding: '0.85rem 0.75rem 0.85rem 2rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                PROJECT
              </th>
              <th style={{ width: '13%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                CATEGORY
              </th>
              <th style={{ width: '15%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                CLIENT / ROLE
              </th>
              <th style={{ width: '14%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                TECH STACK
              </th>
              <th style={{ width: '10%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                LIVE DEMO
              </th>
              <th style={{ width: '23%', padding: '0.85rem 2rem 0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
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
            ) : paginatedProjects.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
                  No portfolio projects found matching your search.
                </td>
              </tr>
            ) : (
              paginatedProjects.map((item) => (
                <tr key={item.slug || (item as any).id} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  {/* Project Column */}
                  <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="42px"
                            style={{ objectFit: 'cover' }}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                            💻
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
                  <td style={{ padding: '0.75rem 0.5rem', overflow: 'hidden' }}>
                    <span
                      style={{
                        backgroundColor: '#EEF2FF',
                        color: 'var(--brand-blue, #1833fe)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.category}
                    </span>
                  </td>

                  {/* Client & Role */}
                  <td style={{ padding: '0.75rem 0.5rem', overflow: 'hidden' }}>
                    <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.825rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.client || 'TryangleTech Client'}
                    </div>
                    <div style={{ fontSize: '0.725rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.role || 'Design & Dev'}
                    </div>
                  </td>

                  {/* Tech Stack Column */}
                  <td style={{ padding: '0.75rem 0.5rem', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', alignItems: 'center' }}>
                      {item.technologies && item.technologies.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: '#F1F5F9',
                            color: '#475569',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.675rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
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

                  {/* Actions Column: Standard Professional SVG Action Icons */}
                  <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      {/* View Details with SVG Eye Icon */}
                      <Tooltip text="View complete case study preview" position="top">
                        <button
                          onClick={() => onSelectProject(item)}
                          style={{
                            backgroundColor: 'var(--vivid-blue, #4f46e5)',
                            color: '#FFFFFF',
                            padding: '5px 9px',
                            borderRadius: '6px',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'opacity 0.15s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <span>View Details</span>
                        </button>
                      </Tooltip>

                      {/* Edit Project Button with Standard SVG Pencil */}
                      <Tooltip text="Edit project details and tech stack" position="top">
                        <button
                          onClick={() => onEditProject(item)}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569',
                            padding: '5px 7px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                            padding: '5px 7px',
                            borderRadius: '6px',
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

                      {/* Live Public Page Link with Standard SVG External Link */}
                      <Tooltip text="View public portfolio webpage" position="top">
                        <Link
                          href={`/portfolio/${item.slug}`}
                          target="_blank"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569',
                            padding: '5px 7px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </Link>
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
          backgroundColor: '#FFFFFF',
          padding: '0.85rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.03)',
        }}
      >
        {/* Left: Summary & Rows per Page Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.825rem', color: '#64748B' }}>
          <span>
            Showing <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{totalItems > 0 ? startIndex + 1 : 0}</strong> to{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{endIndex}</strong> of{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{totalItems}</strong> projects
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.775rem' }}>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.775rem',
                outline: 'none',
                backgroundColor: '#F8FAFC',
                fontWeight: 700,
                color: '#334155',
                cursor: 'pointer',
              }}
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Right: Page Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Tooltip text="Go to previous page" position="top">
            <button
              disabled={currentPage === 1}
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

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
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
              disabled={currentPage === totalPages || totalPages === 0}
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
