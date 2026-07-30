"use client";
import React, { useEffect, useRef, useState, useMemo } from 'react';

import Link from 'next/link';
import { projects } from '../../data/portfolioData';

export default function PortfolioGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

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
      { threshold: 0.1 }
    );



    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    // Reset classes for animation re-trigger
    elements?.forEach((el) => {
      el.classList.remove("animate-fade-in-up");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <section className="rt-blog-v3-main-wrapper" ref={sectionRef} style={{ paddingBottom: '120px' }}>
      <style>{`

        .filter-btn {
          padding: 10px 24px;
          border-radius: 100px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: #f4f5f7;
          color: #666;
          border: 1px solid transparent;
          backdrop-filter: blur(10px);
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #fff;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.2);
        }
        .filter-btn:hover:not(.active) {
          background: #e2e8f0;
          color: #0f172a;
          transform: translateY(-2px);
        }
        
        @keyframes filterFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .filter-btn-animate {
          animation: filterFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        /* Internal Card Hover Animations */
        .portfolio-card-hover {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .portfolio-card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: rgba(0, 0, 0, 0.1);
        }
        .portfolio-card-hover .rt-blog-v3-card-top-part {
          background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%) !important;
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
          position: relative;
        }
        .portfolio-card-hover .rt-blog-v3-card-top-part::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.02), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .portfolio-card-hover:hover .rt-blog-v3-card-top-part::after {
          opacity: 1;
        }
        .portfolio-card-hover .rt-blog-image {
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portfolio-card-hover:hover .rt-blog-image {
          transform: scale(1.08) rotate(1deg);
        }
        .portfolio-card-hover .arrow-icon {
          transition: transform 0.3s ease;
        }
        .portfolio-card-hover:hover .arrow-icon {
          transform: translateX(6px);
        }
        .portfolio-card-hover .rt-blog-v3-card-bottom-part {
          padding: 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1140px;
          margin: 0 auto;
        }
        @media (max-width: 991px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }
        @media (max-width: 767px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="rt-blog-three-main w-layout-blockcontainer rt-container-main w-container">
        {/* Quick Filter Section */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '50px' }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-btn filter-btn-animate ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="rt-blog-three-all w-dyn-list" style={{ display: 'block' }}>
          <div role="list" className="rt-blog-v3-card-main w-dyn-items portfolio-grid" key={activeFilter}>
            {filteredProjects.map((project, idx) => (
              <div key={`${activeFilter}-${project.title}`} role="listitem" className="w-dyn-item reveal-on-scroll" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <Link href={`/portfolio/${project.slug}`} className="rt-blog-v3-card rt-border-radius-medium w-inline-block portfolio-card-hover">
                  <div className="rt-blog-v3-card-top-part rt-border-radius-medium rt-overflow-hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', height: '260px' }}>
                    <img className="rt-auto-fit rt-desktop-image-full-width rt-blog-image" src={project.image} alt={project.title} style={{ objectFit: 'contain', width: '100%', height: '100%', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} loading="lazy" />
                  </div>
                  <div className="rt-blog-v3-card-bottom-part">
                    <div className="w-layout-hflex rt-blog-v3-publish-date" style={{ marginBottom: '12px' }}>
                      <div className="rt-sub-text rt-sub-gredient" style={{ fontSize: '12px', letterSpacing: '1px', fontWeight: 600 }}>{project.category.toUpperCase()}</div>
                    </div>
                    <div className="rt-text-style-h5" style={{ marginBottom: '16px', fontWeight: 600, color: '#0f172a' }}>{project.title}</div>
                    <div style={{ marginTop: 'auto' }}>
                      <div className="rt-features-v2-small-link w-inline-block" style={{ padding: '8px 0' }}>
                        <div className="rt-button-text rt-color-vivid-blue" style={{ fontWeight: 500 }}>View Case Study</div>
                        <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '8px' }}>
                          <img className="arrow-icon" src="/Home3_files/690d9fbfe8207af12de2d5dd_Vector 1553.svg" loading="lazy" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
