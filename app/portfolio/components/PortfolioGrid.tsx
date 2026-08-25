"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import SafeImage from '@/app/common/SafeImage';
import { Project } from '../../data/portfolioData';
import { PortfolioProvider, usePortfolio, DEFAULT_PORTFOLIO_CATEGORIES } from '@/app/context/PortfolioContext';

export const DEFAULT_CATEGORIES = DEFAULT_PORTFOLIO_CATEGORIES;

interface PortfolioGridProps {
  limit?: number;
  hideFilter?: boolean;
  categoryFilter?: string[];
  initialProjects?: Project[];
  initialCategories?: string[];
}

function PortfolioGridContent({ limit, hideFilter, categoryFilter }: { limit?: number; hideFilter?: boolean; categoryFilter?: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const filterWrapRef = useRef<HTMLDivElement>(null);

  const {
    projectsList,
    categoriesList,
    isCategoriesLoading,
    activeFilter,
    setActiveFilter,
    page,
    setPage,
    hasNextPage,
    isInitialLoading,
    isLoadingMore,
    totalCount,
    fetchProjects,
  } = usePortfolio();

  // Handle category tab change
  const handleFilterClick = (cat: string) => {
    setActiveFilter(cat);
    setPage(1);
    fetchProjects(1, cat, limit || 9, false);
  };

  // Filter projects by categoryFilter prop if provided
  const displayedProjects = React.useMemo(() => {
    if (!categoryFilter || categoryFilter.length === 0) {
      return projectsList;
    }
    return projectsList.filter((p) => {
      const pCat = (p.category || '').toLowerCase();
      return categoryFilter.some((cf) => cf.toLowerCase() === pCat || pCat.includes(cf.toLowerCase()));
    });
  }, [projectsList, categoryFilter]);

  // Infinite Scroll IntersectionObserver (only on full portfolio page when limit is not constrained)
  useEffect(() => {
    if (limit || !hasNextPage || isLoadingMore || isInitialLoading) return;

    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoadingMore && !isInitialLoading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProjects(nextPage, activeFilter, 9, true);
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(currentSentinel);
    return () => {
      observer.disconnect();
    };
  }, [limit, hasNextPage, isLoadingMore, isInitialLoading, page, activeFilter, fetchProjects, setPage]);

  // Display categories (respecting categoryFilter prop if specified)
  const displayCategories = React.useMemo(() => {
    if (categoryFilter && categoryFilter.length > 0) {
      return ['All', ...categoryFilter];
    }
    return categoriesList;
  }, [categoriesList, categoryFilter]);

  return (
    <div ref={sectionRef} className="rt-portfolio-section" style={{ position: 'relative', width: '100%' }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        
        {/* Category Filter Pills (with skeleton loading support) */}
        {!hideFilter && (
          <div 
            ref={filterWrapRef}
            className="rt-portfolio-filters-wrapper"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            {isCategoriesLoading && (!categoriesList || categoriesList.length === 0) ? (
              ['All', 'Business Website', 'E-Commerce', 'Landing Website', 'Mobile Application', 'Custom Software', 'Graphic Design'].map((cat, i) => (
                <div
                  key={`cat-skel-${cat}`}
                  className="rt-skeleton-box"
                  style={{
                    width: i === 0 ? '70px' : `${110 + (i % 3) * 20}px`,
                    height: '42px',
                    borderRadius: '2rem',
                  }}
                />
              ))
            ) : (
              displayCategories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleFilterClick(cat)}
                    style={{
                      padding: '0.6rem 1.4rem',
                      borderRadius: '2rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      border: '1px solid',
                      borderColor: isActive ? 'var(--brand-blue, #1833fe)' : '#E2E8F0',
                      backgroundColor: isActive ? 'var(--brand-blue, #1833fe)' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isActive ? '0 4px 12px rgba(24, 51, 254, 0.25)' : 'none',
                    }}
                    className="rt-filter-btn"
                  >
                    {cat}
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* Dynamic Cards Grid Area (ONLY THIS PART LOADS) */}
        {isInitialLoading ? (
          <div style={{ width: '100%' }}>
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {Array.from({ length: limit || 3 }).map((_, idx) => (
                <div 
                  key={`skeleton-${idx}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '1.75rem',
                    padding: '1.25rem',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Large Rounded Image Skeleton */}
                  <div 
                    className="rt-skeleton-box" 
                    style={{ 
                      width: '100%', 
                      height: '240px', 
                      borderRadius: '1.25rem',
                    }} 
                  />
                  {/* Rounded Text Skeleton Pills */}
                  <div style={{ paddingTop: '1.25rem', paddingBottom: '0.5rem' }}>
                    <div 
                      className="rt-skeleton-box" 
                      style={{ 
                        width: '35%', 
                        height: '16px', 
                        borderRadius: '9999px', 
                        marginBottom: '0.85rem' 
                      }} 
                    />
                    <div 
                      className="rt-skeleton-box" 
                      style={{ 
                        width: '85%', 
                        height: '20px', 
                        borderRadius: '9999px', 
                        marginBottom: '0.85rem' 
                      }} 
                    />
                    <div 
                      className="rt-skeleton-box" 
                      style={{ 
                        width: '60%', 
                        height: '14px', 
                        borderRadius: '9999px' 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : displayedProjects.length > 0 ? (
          <div style={{ width: '100%' }}>
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {displayedProjects.slice(0, limit || displayedProjects.length).map((project, idx) => (
                <div 
                  key={project.id || idx}
                  className="rt-portfolio-card-wrap"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '1.75rem',
                    padding: '1.25rem',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Link 
                    href={`/portfolio/${project.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    {/* Fixed Image Wrapper matching Skeleton Proportions */}
                    <div 
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '240px',
                        borderRadius: '1.25rem',
                        overflow: 'hidden',
                        backgroundColor: '#F8FAFC',
                      }}
                    >
                      <SafeImage
                        src={project.image || '/portfolio/placeholder.webp'}
                        alt={project.title}
                        fill
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                    </div>

                    {/* Card Content Area */}
                    <div 
                      style={{
                        paddingTop: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        {/* Category & Year */}
                        <div 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem',
                          }}
                        >
                          <span 
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              color: '#1833FE',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              backgroundColor: '#EFF6FF',
                              padding: '3px 9px',
                              borderRadius: '6px',
                              border: '1px solid #DBEAFE',
                            }}
                          >
                            {project.category}
                          </span>
                          {(project.duration || project.year) && (
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                              {project.duration || project.year}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 
                          style={{
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            lineHeight: '1.4',
                            color: '#0F172A',
                            marginBottom: '0.5rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {project.title}
                        </h3>

                        {/* Description */}
                        {project.description && (
                          <p 
                            style={{
                              fontSize: '0.875rem',
                              color: '#64748B',
                              lineHeight: '1.5',
                              margin: 0,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {project.description}
                          </p>
                        )}
                      </div>

                      {/* View Case Study Action Link */}
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          paddingTop: '1.25rem',
                          marginTop: 'auto',
                          fontSize: '0.825rem',
                          fontWeight: 700,
                          color: '#1833FE',
                        }}
                      >
                        <span>View Case Study</span>
                        <span 
                          style={{
                            fontSize: '1.1rem',
                            lineHeight: 1,
                            transition: 'transform 0.3s ease',
                          }}
                          className="pf-arrow-icon"
                        >
                          ›
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748B' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark-indigo, #1a0b54)' }}>No projects found</div>
            <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>There are currently no case studies available in the {activeFilter} category.</p>
          </div>
        )}

        {/* Infinite Scroll Sentinel & Loading Indicator */}
        {!limit && !isInitialLoading && (
          hasNextPage ? (
            <div ref={sentinelRef} style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2.5rem' }}>
              {isLoadingMore && <div className="pf-spinner" />}
            </div>
          ) : (
            displayedProjects.length > 0 && (
              <div style={{ textAlign: 'center', fontSize: '13px', color: '#94A3B8', padding: '2.5rem 0', fontWeight: 600 }}>
                ✓ All {totalCount} case studies loaded
              </div>
            )
          )
        )}

      </div>
    </div>
  );
}

export default function PortfolioGrid({
  limit,
  hideFilter,
  categoryFilter,
  initialProjects,
  initialCategories,
}: PortfolioGridProps) {
  return (
    <PortfolioProvider
      initialProjects={initialProjects}
      initialCategories={initialCategories}
      initialLimit={limit || 9}
    >
      <PortfolioGridContent
        limit={limit}
        hideFilter={hideFilter}
        categoryFilter={categoryFilter}
      />
    </PortfolioProvider>
  );
}
