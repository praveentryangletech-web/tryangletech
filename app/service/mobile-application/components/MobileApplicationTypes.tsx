'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function MobileApplicationTypes() {
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

  const mobileAppTypes = [
    {
      id: "Type-01",
      title: "Native iOS & Android Apps",
      description:
        "High-performance platform-exclusive apps engineered in Swift and Kotlin for maximum frame rates, 120Hz fluid animations, and deep device hardware integration.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="20" x="5" y="2" rx="3" />
          <path d="M12 18h.01" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid #e1e6f4", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", border: "1px solid #e8edf7" }}>
            {/* Phone Top Status */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }}></span>
                <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#0f172a" }}>Swift &amp; Kotlin</span>
              </div>
              <span style={{ fontSize: "9px", fontWeight: "700", color: "#1833fe", background: "rgba(24, 51, 254, 0.08)", padding: "2px 6px", borderRadius: "4px" }}>
                120 FPS
              </span>
            </div>

            {/* Platform Segmented Badge */}
            <div style={{ display: "flex", gap: "6px", background: "#f1f5f9", padding: "3px", borderRadius: "6px", marginBottom: "8px" }}>
              <div style={{ flex: 1, background: "#ffffff", textAlign: "center", padding: "3px 0", borderRadius: "4px", fontSize: "9.5px", fontWeight: "700", color: "#0f172a", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                 iOS 18
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "3px 0", borderRadius: "4px", fontSize: "9.5px", fontWeight: "600", color: "#64748b" }}>
                🤖 Android 15
              </div>
            </div>

            {/* Telemetry Metric Pill */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "9px", color: "#64748b" }}>
              <span>Hardware Acceleration</span>
              <span style={{ fontWeight: "700", color: "#22c55e" }}>Active</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "Type-02",
      title: "Cross-Platform Mobile Apps",
      description:
        "Single-codebase efficiency with native-grade performance across both iOS and Android, drastically reducing time-to-market and ongoing maintenance overhead.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid #e1e6f4", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", border: "1px solid #e8edf7" }}>
            {/* Framework Sync Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#0f172a" }}>Flutter &amp; React Native</span>
              <span style={{ fontSize: "9px", fontWeight: "700", color: "#7c3aed", background: "rgba(124, 58, 237, 0.08)", padding: "2px 6px", borderRadius: "4px" }}>
                95% Shared Code
              </span>
            </div>

            {/* Dual Deploy Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 8px", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0", marginBottom: "8px" }}>
              <span style={{ fontSize: "9.5px", fontWeight: "600", color: "#334155" }}>App Store + Play Store</span>
              <span style={{ fontSize: "9px", fontWeight: "700", color: "#1833fe" }}>Live Sync ✓</span>
            </div>

            {/* Launch CTA */}
            <div className="rt-btn-hover" style={{ background: "linear-gradient(135deg, #1833fe, #4f46e5)", color: "#ffffff", fontSize: "9.5px", fontWeight: 700, padding: "5px 10px", borderRadius: "6px", textAlign: "center", boxShadow: "0 2px 8px rgba(24, 51, 254, 0.25)" }}>
              ⚡ Unified Release Build
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "Type-03",
      title: "Enterprise & Business Apps",
      description:
        "Mission-critical mobile solutions for enterprise field teams, CRM/ERP workflows, offline-first data synchronization, and role-based security access.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid #e1e6f4", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", border: "1px solid #e8edf7" }}>
            {/* Enterprise Security Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#0f172a" }}>SAP &amp; ERP Portal</span>
              </div>
              <span style={{ fontSize: "9px", fontWeight: "700", color: "#059669", background: "rgba(5, 150, 105, 0.08)", padding: "2px 6px", borderRadius: "4px" }}>
                AES-256
              </span>
            </div>

            {/* Live Sync Status */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 8px", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1833fe" }}></span>
                <span style={{ fontSize: "9px", color: "#475569", fontWeight: "600" }}>Offline-First DB Sync</span>
              </div>
              <span style={{ fontSize: "9px", fontWeight: "700", color: "#0f172a" }}>100% Synced</span>
            </div>

            {/* Compliance Badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "9px", color: "#64748b" }}>
              <span>Role-Based Access (SSO)</span>
              <span style={{ fontWeight: "700", color: "#1833fe" }}>SOC2 Ready</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "Type-04",
      title: "E-Commerce & On-Demand Apps",
      description:
        "Frictionless shopping and delivery experiences with 1-tap Apple Pay and Google Pay checkouts, live GPS order tracking, and push engagement.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
        </svg>
      ),
      mockup: (
        <div className="rt-mockup-wrapper" style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "14px", padding: "12px", border: "1px solid #e1e6f4", overflow: "hidden" }}>
          <div className="rt-mockup-base" style={{ background: "#ffffff", borderRadius: "10px", padding: "10px 12px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", border: "1px solid #e8edf7" }}>
            {/* Live Order & Price */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F85936", display: "inline-block", boxShadow: "0 0 6px #F85936" }}></span>
                <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#0f172a" }}>Driver En Route</span>
              </div>
              <span style={{ fontSize: "9px", fontWeight: "700", color: "#c2410c", background: "rgba(248, 89, 54, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                3 min away
              </span>
            </div>

            {/* Item and Price */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0", marginBottom: "8px" }}>
              <span style={{ fontSize: "9.5px", fontWeight: "600", color: "#334155" }}>Cart Total</span>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#1833fe" }}>$189.00</span>
            </div>

            {/* Apple Pay Button */}
            <div className="rt-btn-hover" style={{ background: "#0f172a", color: "#ffffff", fontSize: "9.5px", fontWeight: 700, padding: "5px 10px", borderRadius: "6px", textAlign: "center", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              <span>Pay</span>
              <span style={{ opacity: 0.6 }}>•</span>
              <span>1-Tap Checkout</span>
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
        paddingTop: "40px",
        paddingBottom: "30px",
      }}
    >
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header */}
        <div className="rt-tools-iconheading rt-speciality-heading rt-heading-bottom-gap reveal-on-scroll" style={{ margin: "0 auto 36px auto", textAlign: "center" }}>
          <div className="rt-sub-gap" style={{ justifyContent: "center", marginBottom: "6px" }}>
            <div className="rt-sub-text rt-sub-gredient">mobile app types</div>
          </div>
          <h2 className="rt-gap-off rt-desktop-text-center" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: "1.25" }}>
            Unveiling the Variety in Mobile App Types We Build
          </h2>
          <p style={{ maxWidth: "640px", margin: "10px auto 0 auto", color: "#64748b", fontSize: "14.5px", lineHeight: "1.5" }}>
            From high-performance native iOS &amp; Android flagships to cross-platform frameworks, enterprise workflows, and e-commerce apps.
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
          {mobileAppTypes.map((item, idx) => (
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

              {/* Card Top: Brand Icon Box, Title, Description */}
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
