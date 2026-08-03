"use client";
import React, { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { projects } from '../../data/portfolioData';

// Map each project to a fixed author avatar using existing public assets
const authorAvatars: Record<string, string> = {
  "fintech-dashboard":  "/service-2-assets/6900857a13043eba725f30ef_kloudera-home-one-testimonial-client-image.webp",
  "ecommerce-mobile":   "/service-2-assets/6900857a13043eba725f30f0_kloudera-home-one-testimonila-client-image.webp",
  "healthtech-portal":  "/service-2-assets/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp",
  "ai-marketing-tool":  "/service-2-assets/6900857a13043eba725f30ef_kloudera-home-one-testimonial-client-image.webp",
  "smart-crm":          "/service-2-assets/6900857a13043eba725f30f0_kloudera-home-one-testimonila-client-image.webp",
  "logistics-tracker":  "/service-2-assets/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp",
};

export default function PortfolioGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  // Scroll-reveal: re-observe every time filter changes
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

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");

    // Delay slightly so Next.js finishes layout before we measure positions
    const timer = setTimeout(() => {
      elements?.forEach((el) => {
        el.classList.remove("animate-fade-in-up");
        // If element is already in viewport (e.g. after client-side navigation),
        // reveal it immediately — don't wait for IntersectionObserver
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
  }, [activeFilter]);

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
          font-weight: 500;
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

        /* ── Image zoom on hover (matches BLOG3 Webflow animation) ── */
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

        /* ── Force left align on card bottom — override Webflow centering ── */
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
      `}</style>

      <div className="w-layout-blockcontainer rt-container-main w-container">

        {/* Filter pills */}
        <div className="pf-filter-wrap">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`pf-filter-btn${activeFilter === cat ? " active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card grid — identical HTML structure to BLOG3.html */}
        <div style={{ display: 'block' }} className="rt-blog-three-all w-dyn-list">
          <div
            role="list"
            className="rt-blog-v3-card-main w-dyn-items pf-grid"
            key={activeFilter}
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={`${activeFilter}-${project.slug}`}
                role="listitem"
                className="w-dyn-item reveal-on-scroll"
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                {/* Same anchor + card as BLOG3 */}
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="rt-blog-v3-card rt-border-radius-medium w-inline-block"
                >
                  {/* Top image — same class as template */}
                  <div className="rt-blog-v3-card-top-part rt-border-radius-medium rt-overflow-hidden">
                    <Image
                      className="rt-auto-fit rt-desktop-image-full-width rt-blog-image"
                      src={project.image}
                      alt={project.title}
                      width={410}
                      height={290}
                      loading="lazy"
                      style={{ height: '220px' }}
                    />
                  </div>

                  {/* Bottom content — same classes as BLOG3 */}
                  <div className="rt-blog-v3-card-bottom-part">

                    {/* Publish date row — shows category instead */}
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

                    {/* View Case Study link */}
                    <div className="w-layout-hflex rt-blog-v2-author-details" style={{ alignItems: 'center', justifyContent: 'flex-start', gap: '6px', paddingTop: '0.9375rem' }}>
                      <span className="rt-button-text rt-color-vivid-blue" style={{ fontWeight: 600, fontSize: '14px' }}>
                        View Case Study
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'start',
                        color: 'var(--vivid-blue, #1833fe)',
                        fontSize: '16px',
                        fontWeight: 600,
                        lineHeight: 1,
                        transition: 'transform 0.3s ease',
                      }} className="pf-arrow-icon">›</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
