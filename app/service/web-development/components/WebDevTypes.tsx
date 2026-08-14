'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function WebDevTypes() {
  const sectionRef = useRef<HTMLElement>(null);

  // Native Project Scroll & On-Load Reveal Observer
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
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const websiteTypes = [
    {
      id: "Type-01",
      title: "Personal Websites & Blogs",
      description:
        "Personal branding platforms and content hubs where creators, consultants, and professionals share insights, publish articles, and build an engaged audience.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid rgba(24, 51, 254, 0.08)", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ height: "6px", width: "55%", background: "#6366f1", borderRadius: "3px", marginBottom: "6px" }} />
            <div style={{ height: "4px", width: "85%", background: "#cbd5e1", borderRadius: "2px", marginBottom: "4px" }} />
            <div style={{ height: "4px", width: "70%", background: "#e2e8f0", borderRadius: "2px", marginBottom: "8px" }} />
            <div className="rt-pill-hover" style={{ display: "inline-block", background: "rgba(99,102,241,0.1)", color: "#6366f1", fontSize: "9.5px", fontWeight: 700, padding: "3px 8px", borderRadius: "5px" }}>
              Articles &amp; Newsletters
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "Type-02",
      title: "Landing Page Websites",
      description:
        "High-impact, single-purpose web pages engineered to promote a specific product, service, or marketing campaign with maximum lead generation rates.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid rgba(24, 51, 254, 0.08)", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ height: "6px", width: "75%", background: "#1833fe", borderRadius: "3px", marginBottom: "6px" }} />
            <div style={{ height: "4px", width: "90%", background: "#cbd5e1", borderRadius: "2px", marginBottom: "8px" }} />
            <div className="rt-btn-hover" style={{ background: "#1833fe", color: "#ffffff", fontSize: "9.5px", fontWeight: 700, padding: "5px 10px", borderRadius: "5px", textAlign: "center" }}>
              ⚡ Get Started Today
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "Type-03",
      title: "Business & Corporate Websites",
      description:
        "Comprehensive web presences for companies and organizations that establish market authority, showcase services, and capture high-value commercial leads.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="9" y1="6" x2="9.01" y2="6" />
          <line x1="15" y1="6" x2="15.01" y2="6" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid rgba(24, 51, 254, 0.08)", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", gap: "5px", marginBottom: "6px" }}>
              <div style={{ flex: 1, height: "18px", background: "#f1f5f9", borderRadius: "3px" }} />
              <div style={{ flex: 1, height: "18px", background: "#f1f5f9", borderRadius: "3px" }} />
            </div>
            <div style={{ height: "5px", width: "65%", background: "#4f46e5", borderRadius: "2.5px", marginBottom: "4px" }} />
            <div style={{ fontSize: "9.5px", color: "#64748b", fontWeight: 600 }}>Portals &amp; Portfolios</div>
          </div>
        </div>
      ),
    },
    {
      id: "Type-04",
      title: "E-Commerce Websites",
      description:
        "Scalable online stores with frictionless product catalogs, multi-currency payment checkout, automated stock tracking, and complete order management.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid rgba(24, 51, 254, 0.08)", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <div style={{ height: "5px", width: "45%", background: "#0ea5e9", borderRadius: "2.5px" }} />
              <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#10b981" }}>$299.00</span>
            </div>
            <div className="rt-btn-hover" style={{ background: "linear-gradient(135deg, #1833fe, #0ea5e9)", color: "#fff", fontSize: "9.5px", fontWeight: 700, padding: "5px 10px", borderRadius: "5px", textAlign: "center" }}>
              Instant Cart &amp; Checkout
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="rt-speciality rt-overflow-hidden" style={{ padding: "48px 0 40px 0" }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header with reduced margin */}
        <div className="rt-tools-iconheading rt-speciality-heading rt-heading-bottom-gap reveal-on-scroll" style={{ margin: "0 auto 32px auto", textAlign: "center" }}>
          <div className="rt-sub-gap" style={{ justifyContent: "center", marginBottom: "6px" }}>
            <div className="rt-sub-text rt-sub-gredient">website types</div>
          </div>
          <h2 className="rt-gap-off rt-desktop-text-center" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: "1.25" }}>
            Unveiling the Variety in Website Types We Build
          </h2>
          <p style={{ maxWidth: "640px", margin: "10px auto 0 auto", color: "#64748b", fontSize: "14.5px", lineHeight: "1.5" }}>
            From high-conversion landing pages to full-scale corporate platforms and e-commerce stores, we craft solutions tailored to your goals.
          </p>
        </div>

        {/* 4 Cards Grid with Tight, Balanced Spacing */}
        <div
          className="rt-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {websiteTypes.map((item, idx) => (
            <div
              key={item.id}
              className="rt-speciality-item rt-border-radius-medium rt-shadow rt-interactive-card reveal-on-scroll"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "24px 20px 20px 20px",
                background: "#ffffff",
                borderRadius: "20px",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                cursor: "pointer",
                gap: "18px",
                transitionDelay: `${idx * 0.1}s`,
              }}
            >
              {/* Card Top: Benefits Icon, Title, Description */}
              <div className="rt-speciality-item-top" style={{ gap: "0px" }}>
                <div className="rt-benefits-icon" style={{ marginBottom: "12px" }}>
                  {item.icon}
                </div>
                <div className="rt-text-style-h6" style={{ fontSize: "19px", fontWeight: 700, color: "#0f172a", marginBottom: "8px", lineHeight: "1.3" }}>
                  {item.title}
                </div>
                <p className="rt-gap-off" style={{ color: "#64748b", fontSize: "13.5px", lineHeight: "1.5" }}>
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: Interactive Visual Mockup */}
              <div className="rt-speciality-item-bottom" style={{ marginTop: "auto" }}>
                {item.mockup}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles: Native Reveal & Smooth Hover */}
      <style>{`
        /* Staggered Native Reveal Delays */
        .rt-cards-grid > .reveal-on-scroll:nth-child(1) { transition-delay: 0.1s; }
        .rt-cards-grid > .reveal-on-scroll:nth-child(2) { transition-delay: 0.2s; }
        .rt-cards-grid > .reveal-on-scroll:nth-child(3) { transition-delay: 0.3s; }
        .rt-cards-grid > .reveal-on-scroll:nth-child(4) { transition-delay: 0.4s; }

        /* Continuous Floating Idle Motion */
        .rt-floating-element {
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.65s cubic-bezier(0.25, 1, 0.5, 1) !important;
        }

        /* ── SMOOTH GRADUAL HOVER TRANSITIONS ── */

        .rt-interactive-card {
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      opacity 0.8s ease-out !important;
          will-change: transform, box-shadow, opacity;
        }

        /* 1. Card Elevation & Soft Glow */
        .rt-interactive-card:hover {
          transform: translateY(-5px) !important;
          border-color: rgba(24, 51, 254, 0.28) !important;
          box-shadow: 0px 16px 36px -8px rgba(24, 51, 254, 0.12), 0 0 0 1px rgba(24, 51, 254, 0.10) !important;
        }

        /* 2. Top Icon Gentle Float */
        .rt-benefits-icon {
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.6s ease !important;
        }
        .rt-interactive-card:hover .rt-benefits-icon {
          transform: scale(1.08) translateY(-2px);
          filter: drop-shadow(0 4px 12px rgba(24, 51, 254, 0.18));
        }

        /* 3. Title Smooth Color Fade */
        .rt-text-style-h6 {
          transition: color 0.5s ease !important;
        }
        .rt-interactive-card:hover .rt-text-style-h6 {
          color: #1833fe !important;
        }

        /* 4. Mockup Container Gradual Soft Tint */
        .rt-mockup-wrapper {
          transition: background-color 0.65s ease, border-color 0.65s ease, box-shadow 0.65s ease !important;
        }
        .rt-interactive-card:hover .rt-mockup-wrapper {
          border-color: rgba(24, 51, 254, 0.2) !important;
          background: #f4f7ff !important;
          box-shadow: 0 6px 18px rgba(24, 51, 254, 0.05);
        }

        /* 5. Base Mockup Card Gentle Glide */
        .rt-mockup-base {
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.65s ease !important;
        }
        .rt-interactive-card:hover .rt-mockup-base {
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.05) !important;
        }

        /* 6. Button & Pill Micro-transitions */
        .rt-btn-hover {
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease, background-color 0.5s ease !important;
        }
        .rt-interactive-card:hover .rt-btn-hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(24, 51, 254, 0.25);
        }

        .rt-pill-hover {
          transition: background-color 0.5s ease, color 0.5s ease !important;
        }
        .rt-interactive-card:hover .rt-pill-hover {
          background: #6366f1 !important;
          color: #ffffff !important;
        }
      `}</style>
    </section>
  );
}
