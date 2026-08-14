'use client';
import React, { useEffect, useRef } from 'react';

export default function CustomSoftwareFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  // Native Scroll Reveal Observer matching About page animation timing
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      id: "step-1",
      column: "Discovery",
      stepNum: "01",
      title: "Requirement Gathering & Scoping",
      desc: "We analyze your business workflows, user edge cases, and technical prerequisites to establish a solid roadmap.",
      bg: "linear-gradient(135deg, #ff5e3a 0%, #ff7a45 100%)",
      color: "#ffffff",
      descColor: "rgba(255, 255, 255, 0.92)",
      shadow: "0 10px 28px rgba(255, 94, 58, 0.28)",
      topOffset: "4%",
      leftOffset: "0%",
      border: "none",
      delay: "0.15s",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
    {
      id: "step-2",
      column: "Architecture",
      stepNum: "02",
      title: "System Architecture & UI/UX",
      desc: "Interactive Figma wireframes, database schema modeling, and robust API microservice architecture designs.",
      bg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      color: "#ffffff",
      descColor: "rgba(255, 255, 255, 0.92)",
      shadow: "0 10px 28px rgba(99, 102, 241, 0.28)",
      topOffset: "28%",
      leftOffset: "24%",
      border: "none",
      delay: "0.30s",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
    },
    {
      id: "step-3",
      column: "Development",
      stepNum: "03",
      title: "Agile Full-Stack Engineering",
      desc: "Clean code delivery across frontend and backend using modern stacks with weekly demo sprint milestones.",
      bg: "#ffffff",
      color: "#0f172a",
      descColor: "#64748b",
      shadow: "0 10px 28px rgba(0, 0, 0, 0.06)",
      topOffset: "52%",
      leftOffset: "48%",
      border: "1px solid #d4dcf9",
      delay: "0.45s",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: "step-4",
      column: "Launch & Support",
      stepNum: "04",
      title: "Automated QA & Cloud Launch",
      desc: "Automated security audits, zero-downtime CI/CD deployment, performance tuning, and ongoing SLA maintenance.",
      bg: "linear-gradient(135deg, #1833fe 0%, #0ea5e9 100%)",
      color: "#ffffff",
      descColor: "rgba(255, 255, 255, 0.92)",
      shadow: "0 10px 28px rgba(24, 51, 254, 0.28)",
      topOffset: "76%",
      leftOffset: "68%",
      border: "none",
      delay: "0.60s",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="rt-process-section" style={{ position: "relative", padding: "40px 0 30px 0" }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header */}
        <div className="rt-tools-iconheading rt-features-v1-top rt-heading-entry" style={{ textAlign: "center", margin: "0 auto 28px auto" }}>
          <div className="rt-sub-gap" style={{ justifyContent: "center", marginBottom: "6px" }}>
            <div className="rt-sub-text rt-sub-gredient">our development process</div>
          </div>
          <h2 className="rt-gap-off rt-desktop-text-center" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: "1.25" }}>
            Deliver projects on time through{" "}
            <span className="rt-color-periwinkle-gray">streamlined execution</span>
          </h2>
          <p style={{ maxWidth: "660px", margin: "8px auto 0 auto", color: "#64748b", fontSize: "14.5px", lineHeight: "1.5" }}>
            A disciplined 4-stage engineering lifecycle designed for speed, stability, and full transparency.
          </p>
        </div>

        {/* Compact Stepped Process Cascade Canvas */}
        <div className="rt-compact-process-canvas">
          {/* Top Column Labels & Continuous Vertical Dashed Grid Lines */}
          <div className="rt-columns-track">
            {steps.map((s, idx) => (
              <div key={s.id} className="rt-column-item">
                <div className="rt-col-header">
                  <span className="rt-col-badge">{s.stepNum}</span>
                  <span className="rt-col-title">{s.column}</span>
                </div>
                {/* Full-height continuous dashed line track */}
                <div className="rt-dashed-line-track">
                  <div className={`rt-dashed-line line-${idx + 1}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Cascading Floating Step Cards */}
          <div className="rt-cascade-overlay">
            {steps.map((s) => (
              <div
                key={s.id}
                className="rt-custom-process-card"
                style={{
                  top: s.topOffset,
                  left: s.leftOffset,
                  background: s.bg,
                  boxShadow: s.shadow,
                  border: s.border,
                  transitionDelay: s.delay,
                }}
              >
                <div className="rt-card-icon-pill">{s.icon}</div>
                <div className="rt-card-text-group">
                  <div className="rt-card-title" style={{ color: s.color }}>
                    {s.title}
                  </div>
                  <p className="rt-card-desc" style={{ color: s.descColor }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Styles with Native Continuous Dashed Line Flow */}
      <style>{`
        .rt-compact-process-canvas {
          position: relative;
          width: 100%;
          min-height: 490px;
          margin-top: 10px;
        }

        /* Heading Reveal */
        .rt-heading-entry {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .is-inview .rt-heading-entry {
          opacity: 1;
          transform: translateY(0);
        }

        /* 4 Column Grid */
        .rt-columns-track {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative;
          width: 100%;
          height: 100%;
        }

        .rt-column-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          height: 100%;
        }

        .rt-col-header {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-bottom: 12px;
          z-index: 2;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .is-inview .rt-col-header {
          opacity: 1;
          transform: translateY(0);
        }

        .rt-col-badge {
          font-size: 11px;
          font-weight: 700;
          color: #1833fe;
          background: rgba(24, 51, 254, 0.08);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .rt-col-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #475569;
        }

        /* Continuous Dashed Guidelines matching About page */
        .rt-dashed-line-track {
          position: relative;
          width: 100%;
          height: 450px;
          display: flex;
          align-items: flex-start;
        }

        .rt-dashed-line {
          width: 1px;
          border-left: 1.5px dashed rgba(173, 180, 216, 0.85);
          border-right: none;
          height: 100%;
          margin-left: 12px;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-inview .rt-dashed-line {
          transform: scaleY(1);
        }

        .rt-dashed-line.line-1 { transition-delay: 0.10s; }
        .rt-dashed-line.line-2 { transition-delay: 0.20s; }
        .rt-dashed-line.line-3 { transition-delay: 0.30s; }
        .rt-dashed-line.line-4 { transition-delay: 0.40s; }

        /* Floating Cards Overlay */
        .rt-cascade-overlay {
          position: absolute;
          inset: 38px 0 0 0;
          pointer-events: auto;
        }

        /* Card Entry Animation matching About Page Flow */
        .rt-custom-process-card {
          position: absolute;
          max-width: 350px;
          width: 88%;
          padding: 16px 20px;
          border-radius: 16px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(30px) scale(0.96);
          transition: transform 0.75s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.45s ease,
                      opacity 0.75s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform, opacity, box-shadow;
          z-index: 5;
        }

        .is-inview .rt-custom-process-card {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .rt-custom-process-card:hover {
          transform: translateY(-5px) scale(1.02) !important;
          z-index: 10;
        }

        .rt-card-icon-pill {
          width: 36px;
          height: 36px;
          min-width: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          transition: transform 0.4s ease;
        }
        .rt-custom-process-card:hover .rt-card-icon-pill {
          transform: scale(1.1);
        }

        .rt-custom-process-card:nth-child(3) .rt-card-icon-pill {
          background: rgba(24, 51, 254, 0.08);
        }

        .rt-card-text-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rt-card-title {
          font-size: 15px;
          font-weight: 700;
          line-height: 1.3;
        }

        .rt-card-desc {
          font-size: 12.8px;
          line-height: 1.45;
          margin: 0;
        }

        /* ── Mobile / Tablet Responsive Fallback ── */
        @media (max-width: 991px) {
          .rt-compact-process-canvas {
            min-height: auto;
          }
          .rt-columns-track {
            display: none;
          }
          .rt-cascade-overlay {
            position: static;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .rt-custom-process-card {
            position: static !important;
            max-width: 100% !important;
            width: 100% !important;
            inset: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
