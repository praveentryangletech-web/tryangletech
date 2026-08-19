"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from "next/image";
import SafeImage from '@/app/common/SafeImage';
import { Project, projects as staticProjects } from '../../data/portfolioData';

const categories = [
  "All",
  "Business Website", 
  "E-Commerce",
  "Landing Website",
  "Mobile Application",
  "Custom Software",
  "Graphic Design"
];

interface PortfolioGridProps {
  limit?: number;
  hideFilter?: boolean;
  categoryFilter?: string[];
}

// Client-side in-memory SWR cache for 0ms instantaneous UI feedback
const clientMemoryCache = new Map<string, { items: Project[]; total: number; hasNextPage: boolean }>();

export default function PortfolioGrid({ limit, hideFilter, categoryFilter }: PortfolioGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  
  // API Data & Pagination States
  const [projectsList, setProjectsList] = useState<Project[]>(staticProjects);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(staticProjects.length);

  // Fetch projects from public GET /api/portfolio endpoint with instant cache
  const fetchProjects = useCallback(async (pageNum: number, category: string, isAppend = false) => {
    const cacheKey = `${category}:${pageNum}:${limit || 9}`;
    
    // 1. Instant Cache Hit (0ms transition)
    if (!isAppend && clientMemoryCache.has(cacheKey)) {
      const cached = clientMemoryCache.get(cacheKey)!;
      setProjectsList(cached.items);
      setHasNextPage(cached.hasNextPage);
      setTotalCount(cached.total);
      setIsInitialLoading(false);
      return;
    }

    if (isAppend) {
      setIsLoadingMore(true);
    } else {
      setIsInitialLoading(true);
    }

    try {
      const params = new URLSearchParams();
      params.set('page', pageNum.toString());
      params.set('limit', (limit || 9).toString());
      
      if (category && category !== 'All') {
        params.set('category', category);
      }

      const res = await fetch(`/api/portfolio?${params.toString()}`, {
        // Use browser cache + edge caching for fast millisecond delivery
        headers: { 'Accept': 'application/json' },
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const nextHasPage = json.pagination ? Boolean(json.pagination.hasNextPage) : false;
        const total = json.pagination?.total || json.data.length;

        if (isAppend) {
          setProjectsList(prev => [...prev, ...json.data]);
        } else {
          setProjectsList(json.data);
          // Store in client cache for 0ms switching
          clientMemoryCache.set(cacheKey, { items: json.data, total, hasNextPage: nextHasPage });
        }

        setHasNextPage(nextHasPage);
        setTotalCount(total);
      }
    } catch (err) {
      console.warn('API fetch warning, using static fallback:', err);
      let filtered = staticProjects;
      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      setProjectsList(filtered.slice(0, (limit || 9) * pageNum));
      setHasNextPage(filtered.length > (limit || 9) * pageNum);
    } finally {
      setIsInitialLoading(false);
      setIsLoadingMore(false);
    }
  }, [limit]);

  // Handle Category Filter changes -> Reset to Page 1 and fetch
  const handleCategoryChange = (category: string) => {
    if (activeFilter === category) return;
    setActiveFilter(category);
    setPage(1);
    setHasNextPage(true);
    fetchProjects(1, category, false);
  };

  // Initial mount fetch
  useEffect(() => {
    fetchProjects(1, activeFilter, false);
  }, [fetchProjects, activeFilter]);

  // Scroll reveal animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll:not(.animate-fade-in-up)");

    const timer = setTimeout(() => {
      elements?.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("animate-fade-in-up");
        } else {
          observer.observe(el);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [projectsList, activeFilter]);

  // Infinite Scroll Trigger using IntersectionObserver
  useEffect(() => {
    if (limit) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && !isInitialLoading && hasNextPage) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProjects(nextPage, activeFilter, true);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoadingMore, isInitialLoading, hasNextPage, page, activeFilter, fetchProjects, limit]);

  return (
    <div ref={sectionRef}>
      <style>{`
        /* ── Filter Buttons ── */
        .pf-filter-wrap {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          padding-bottom: 3rem;
        }
        .pf-filter-btn {
          padding: 9px 22px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid #e1e6f4;
          background: #fff;
          color: #6b7280;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .pf-filter-btn.active {
          background: var(--dark-indigo, #1a0b54);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(26,11,84,0.25);
        }
        .pf-filter-btn:hover:not(.active) {
          background: #f1f5f9;
          color: var(--dark-indigo, #1a0b54);
          border-color: #d3d3f4;
          transform: translateY(-2px);
        }

        /* ── Image zoom on hover ── */
        .rt-blog-v3-card .rt-blog-image {
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
          width: 100%;
          object-fit: cover;
        }
        .rt-blog-v3-card:hover .rt-blog-image {
          transform: scale(1.08);
        }

        /* ── Card lift on hover ── */
        .rt-blog-v3-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rt-blog-v3-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 28px 50px rgba(24, 72, 212, 0.14) !important;
        }

        /* ── Force left align on card bottom ── */
        .rt-blog-v3-card .rt-blog-v3-card-bottom-part {
          text-align: left !important;
          align-items: flex-start !important;
          width: 100% !important;
        }
        .rt-blog-v3-card .rt-blog-v2-author-details {
          justify-content: flex-start !important;
          align-items: center !important;
          width: 100% !important;
        }
        .rt-blog-v3-card:hover .pf-arrow-icon {
          transform: translateX(4px);
        }
        .pf-grid {
          grid-template-columns: 1fr 1fr !important;
        }
        @media (min-width: 992px) {
          .pf-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .pf-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── Shimmer Animation for Skeletons ── */
        @keyframes pfShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .pf-skeleton-box {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: pfShimmer 1.5s infinite;
          border-radius: 12px;
        }

        /* ── Loading Spinner ── */
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        .pf-spinner {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid #e5e7eb;
          border-top-color: var(--brand-blue, #1833fe);
          animation: spin 0.7s linear infinite;
          margin: 0 auto;
        }
      `}</style>

      <div className="w-layout-blockcontainer rt-container-main w-container">

        {/* Category Filter Chips */}
        {!hideFilter && (
          <div className="pf-filter-wrap">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`pf-filter-btn${activeFilter === cat ? " active" : ""}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Initial Loading Skeleton State */}
        {isInitialLoading && (
          <div className="rt-blog-v3-card-main w-dyn-items pf-grid" style={{ display: 'grid', gap: '2rem' }}>
            {[1, 2, 3, 4, 5, 6].map((sk) => (
              <div key={sk} style={{ borderRadius: '20px', border: '1px solid #E2E8F0', padding: '16px', backgroundColor: '#FFFFFF' }}>
                <div className="pf-skeleton-box" style={{ height: '220px', width: '100%', marginBottom: '16px' }} />
                <div className="pf-skeleton-box" style={{ height: '18px', width: '35%', marginBottom: '12px' }} />
                <div className="pf-skeleton-box" style={{ height: '24px', width: '80%', marginBottom: '16px' }} />
                <div className="pf-skeleton-box" style={{ height: '14px', width: '45%' }} />
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Card Grid */}
        {!isInitialLoading && (
          <div style={{ display: 'block' }} className="rt-blog-three-all w-dyn-list">
            <div
              role="list"
              className="rt-blog-v3-card-main w-dyn-items pf-grid"
              key={activeFilter}
            >
              {projectsList.map((project, idx) => (
                <div
                  key={`${activeFilter}-${project.slug}-${idx}`}
                  role="listitem"
                  className="w-dyn-item reveal-on-scroll"
                  style={{ transitionDelay: `${(idx % 6) * 0.08}s` }}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="rt-blog-v3-card rt-border-radius-medium w-inline-block"
                  >
                    {/* Top Image */}
                    <div className="rt-blog-v3-card-top-part rt-border-radius-medium rt-overflow-hidden">
                      <SafeImage
                        className="rt-auto-fit rt-desktop-image-full-width rt-blog-image"
                        src={project.image}
                        fallbackSrc="/portfolio/vh-accounting.webp"
                        alt={project.title}
                        width={410}
                        height={290}
                        loading="lazy"
                        style={{ height: '220px' }}
                      />
                    </div>

                    {/* Bottom Content */}
                    <div className="rt-blog-v3-card-bottom-part">
                      {/* Category Label */}
                      <div className="w-layout-hflex rt-blog-v3-publish-date">
                        <div className="w-layout-vflex">
                          <Image
                            width={15}
                            height={16}
                            alt=""
                            src="/blog-assets/691702072672e09d875c245f_calendar-check.svg"
                            loading="lazy"
                          />
                        </div>
                        <div>{project.category}</div>
                      </div>

                      {/* Title */}
                      <div className="rt-text-style-h6">{project.title}</div>

                      {/* View Case Study Link */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '6px', paddingTop: '0.9375rem' }}>
                        <span className="rt-button-text rt-color-vivid-blue" style={{ margin: 0 }}>
                          View Case Study
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'start',
                            color: 'var(--vivid-blue, #1833fe)',
                            fontSize: '16px',
                            fontWeight: 600,
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
        )}

        {/* Empty State */}
        {!isInitialLoading && projectsList.length === 0 && (
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
            projectsList.length > 0 && (
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
