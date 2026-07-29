"use client";
import React, { useEffect, useRef, useState, useMemo } from 'react';

const projects = [
  { title: "Fintech Dashboard", category: "Web App", image: "/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp" },
  { title: "E-Commerce Mobile", category: "Mobile App", image: "/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp" },
  { title: "HealthTech Portal", category: "Web Platform", image: "/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp" },
  { title: "AI Marketing Tool", category: "SaaS", image: "/Home3_files/690dad35e28b189c556cc11e_Taskopia-features-home-v3-right.webp" },
  { title: "Smart CRM", category: "Enterprise App", image: "/Home3_files/690dad35e3ae72cf7cacc7f0_Taskopia-features-home-v3-5.webp" },
  { title: "Logistics Tracker", category: "Mobile App", image: "/Home2_files/69254371136c64c2548fd85e_taskopiya-home-two-project-over.webp" },
];

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
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
        .filter-btn {
          padding: 8px 20px;
          border-radius: 100px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f8f8f8;
          color: #555;
          border: 1px solid transparent;
        }
        .filter-btn.active {
          background: #000;
          color: #fff;
        }
        .filter-btn:hover:not(.active) {
          background: #eee;
        }
        
        /* Internal Card Hover Animations */
        .portfolio-card-hover .rt-blog-image {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portfolio-card-hover:hover .rt-blog-image {
          transform: scale(1.08);
        }
        .portfolio-card-hover .arrow-icon {
          transition: transform 0.3s ease;
        }
        .portfolio-card-hover:hover .arrow-icon {
          transform: translateX(5px);
        }
      `}</style>
      
      <div className="rt-blog-three-main w-layout-blockcontainer rt-container-main w-container">
        {/* Quick Filter Section */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="rt-blog-three-all w-dyn-list" style={{ display: 'block' }}>
          <div role="list" className="rt-blog-v3-card-main w-dyn-items" key={activeFilter}>
            {filteredProjects.map((project, idx) => (
              <div key={`${activeFilter}-${project.title}`} role="listitem" className="w-dyn-item reveal-on-scroll" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <a href="#" className="rt-blog-v3-card rt-border-radius-medium w-inline-block portfolio-card-hover">
                  <div className="rt-blog-v3-card-top-part rt-border-radius-medium rt-overflow-hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: '#f8f8f8' }}>
                    <img className="rt-auto-fit rt-desktop-image-full-width rt-blog-image" src={project.image} alt={project.title} style={{ objectFit: 'contain', width: '100%', height: '250px' }} loading="lazy" />
                  </div>
                  <div className="rt-blog-v3-card-bottom-part">
                    <div className="w-layout-hflex rt-blog-v3-publish-date">
                      <div className="rt-sub-text rt-sub-gredient" style={{ fontSize: '12px' }}>{project.category.toUpperCase()}</div>
                    </div>
                    <div className="rt-text-style-h6">{project.title}</div>
                    <div style={{ marginTop: '1rem' }}>
                      <div className="rt-features-v2-small-link w-inline-block">
                        <div className="rt-button-text rt-color-vivid-blue">View Case Study</div>
                        <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img className="arrow-icon" src="/Home3_files/690d9fbfe8207af12de2d5dd_Vector 1553.svg" loading="lazy" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
