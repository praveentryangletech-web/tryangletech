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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid #e1e6f4", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ height: "6px", width: "55%", background: "linear-gradient(90deg, #1833fe, #6366f1)", borderRadius: "3px", marginBottom: "6px" }} />
            <div style={{ height: "4px", width: "85%", background: "#cbd5e1", borderRadius: "2px", marginBottom: "4px" }} />
            <div style={{ height: "4px", width: "70%", background: "#e2e8f0", borderRadius: "2px", marginBottom: "8px" }} />
            <div className="rt-pill-hover" style={{ display: "inline-block", background: "rgba(24, 51, 254, 0.08)", color: "#1833fe", fontSize: "9.5px", fontWeight: 700, padding: "3px 8px", borderRadius: "5px" }}>
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid #e1e6f4", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ height: "6px", width: "75%", background: "linear-gradient(90deg, #1833fe, #3b82f6)", borderRadius: "3px", marginBottom: "6px" }} />
            <div style={{ height: "4px", width: "90%", background: "#cbd5e1", borderRadius: "2px", marginBottom: "8px" }} />
            <div className="rt-btn-hover" style={{ background: "linear-gradient(135deg, #1833fe, #3b82f6)", color: "#ffffff", fontSize: "9.5px", fontWeight: 700, padding: "5px 10px", borderRadius: "5px", textAlign: "center", boxShadow: "0 2px 8px rgba(24, 51, 254, 0.25)" }}>
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="9" y1="6" x2="9.01" y2="6" />
          <line x1="15" y1="6" x2="15.01" y2="6" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid #e1e6f4", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", gap: "5px", marginBottom: "6px" }}>
              <div style={{ flex: 1, height: "18px", background: "#f1f5f9", borderRadius: "3px" }} />
              <div style={{ flex: 1, height: "18px", background: "#f1f5f9", borderRadius: "3px" }} />
            </div>
            <div style={{ height: "5px", width: "65%", background: "linear-gradient(90deg, #1833fe, #6366f1)", borderRadius: "2.5px", marginBottom: "4px" }} />
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid #e1e6f4", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <div style={{ height: "5px", width: "45%", background: "linear-gradient(90deg, #1833fe, #3b82f6)", borderRadius: "2.5px" }} />
              <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#1833fe" }}>$299.00</span>
            </div>
            <div className="rt-btn-hover" style={{ background: "linear-gradient(135deg, #1833fe, #3b82f6)", color: "#fff", fontSize: "9.5px", fontWeight: 700, padding: "5px 10px", borderRadius: "5px", textAlign: "center", boxShadow: "0 2px 8px rgba(24, 51, 254, 0.25)" }}>
              Instant Cart &amp; Checkout
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="rt-speciality rt-overflow-hidden"
      style={{
        padding: "52px 0 44px 0",
        background: "linear-gradient(180deg, #ffffff 0%, #f9fbff 50%, #ffffff 100%)",
        position: "relative",
      }}
    >
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header */}
        <div className="rt-tools-iconheading rt-speciality-heading rt-heading-bottom-gap reveal-on-scroll" style={{ margin: "0 auto 36px auto", textAlign: "center" }}>
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

        {/* 4 Cards Grid with Consistent Project Theme */}
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
              className="rt-speciality-item rt-border-radius-medium rt-shadow rt-consistent-card reveal-on-scroll"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "24px 20px 20px 20px",
                background: "#ffffff",
                borderRadius: "20px",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.04)",
                border: "1px solid #e1e6f4",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                gap: "18px",
                transitionDelay: `${idx * 0.1}s`,
              }}
            >
              {/* Top Accent Gradient Bar matching Brand Blue */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3.5px",
                  background: "linear-gradient(90deg, #1833fe, #6366f1)",
                }}
              />

              {/* Card Top: Consistent Brand Icon Box, Title, Description */}
              <div className="rt-speciality-item-top" style={{ gap: "0px" }}>
                <div
                  className="rt-consistent-icon-box"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(24, 51, 254, 0.08) 0%, rgba(99, 102, 241, 0.14) 100%)",
                    border: "1px solid rgba(24, 51, 254, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                    boxShadow: "0 2px 8px rgba(24, 51, 254, 0.04)",
                    transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  {item.icon}
                </div>
                <div className="rt-text-style-h6" style={{ fontSize: "19px", fontWeight: 700, color: "#0f172a", marginBottom: "8px", lineHeight: "1.3" }}>
                  {item.title}
                </div>
                <p className="rt-gap-off" style={{ color: "#556987", fontSize: "13.5px", lineHeight: "1.5" }}>
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

      {/* Styles: Native Reveal & Consistent Card Hover Physics */}
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

        /* ── CONSISTENT CARD HOVER TRANSITIONS ── */

        .rt-consistent-card {
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                      opacity 0.8s ease-out !important;
          will-change: transform, box-shadow, opacity;
        }

        /* 1. Card Elevation & Brand Blue Glow */
        .rt-consistent-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(24, 51, 254, 0.3) !important;
          box-shadow: 0px 20px 45px -10px rgba(24, 51, 254, 0.14), 0 0 0 1px rgba(24, 51, 254, 0.10) !important;
        }

        /* 2. Brand Icon Box Float */
        .rt-consistent-card:hover .rt-consistent-icon-box {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 6px 16px rgba(24, 51, 254, 0.18);
          background: linear-gradient(135deg, rgba(24, 51, 254, 0.14) 0%, rgba(99, 102, 241, 0.22) 100%) !important;
        }

        /* 3. Title Highlight */
        .rt-consistent-card:hover .rt-text-style-h6 {
          color: #1833fe !important;
        }

        /* 4. Mockup Canvas Glide */
        .rt-mockup-wrapper {
          transition: background-color 0.65s ease, border-color 0.65s ease, box-shadow 0.65s ease !important;
        }
        .rt-consistent-card:hover .rt-mockup-wrapper {
          box-shadow: 0 6px 18px rgba(24, 51, 254, 0.06);
          border-color: rgba(24, 51, 254, 0.22) !important;
        }

        .rt-mockup-base {
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.65s ease !important;
        }
        .rt-consistent-card:hover .rt-mockup-base {
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.05) !important;
        }

        /* 5. Button & Pill Micro-transitions */
        .rt-btn-hover {
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease !important;
        }
        .rt-consistent-card:hover .rt-btn-hover {
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
