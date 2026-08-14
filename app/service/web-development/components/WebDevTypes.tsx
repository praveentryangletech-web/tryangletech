'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function WebDevTypes() {
  const [activeTab, setActiveTab] = useState<"services" | "types">("services");

  const coreServices = [
    {
      id: "Service-01",
      title: "Web Designing & UI/UX",
      description:
        "Modern, user-centric interfaces engineered to reflect your brand identity with responsive design, intuitive navigation, and high engagement on every device.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" />
        </svg>
      ),
      mockup: (
        <div style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "16px", padding: "16px", border: "1px solid rgba(24, 51, 254, 0.08)" }}>
          {/* Main Top Mockup Card */}
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1833fe" }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: "6px", width: "80%", background: "#cbd5e1", borderRadius: "3px", marginBottom: "6px" }} />
                <div style={{ height: "5px", width: "55%", background: "#e2e8f0", borderRadius: "2.5px" }} />
              </div>
            </div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>Responsive UI &amp; Brand Systems</div>
          </div>

          {/* Floating Angled Pill Notification */}
          <div
            style={{
              background: "linear-gradient(135deg, #1833fe, #6366f1)",
              borderRadius: "10px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 8px 20px rgba(24, 51, 254, 0.25)",
              transform: "rotate(-2deg)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", fontWeight: "bold" }}>
                ✓
              </div>
              <div>
                <div style={{ color: "#ffffff", fontSize: "12px", fontWeight: 700 }}>Mobile-First Layout</div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "10px" }}>Figma to Pixel-Perfect Code</div>
              </div>
            </div>
            <span style={{ color: "#ffffff", fontSize: "10px", fontWeight: 600, background: "rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: "100px" }}>Active</span>
          </div>
        </div>
      ),
    },
    {
      id: "Service-02",
      title: "Web Development Service",
      description:
        "Robust, scalable custom websites and full-stack web applications built with clean code, secure backend architectures, high performance, and ultra-fast page speeds.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      mockup: (
        <div style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "16px", padding: "16px", border: "1px solid rgba(24, 51, 254, 0.08)" }}>
          {/* Main Top Mockup Card with timestamps */}
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#e2e8f0" }} />
                <div style={{ height: "6px", width: "70px", background: "#cbd5e1", borderRadius: "3px" }} />
              </div>
              <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>02:10</span>
            </div>
            <div style={{ height: "5px", width: "100%", background: "#f1f5f9", borderRadius: "2.5px" }} />
          </div>

          {/* Floating Blue Gradient Message */}
          <div
            style={{
              background: "linear-gradient(135deg, #1833fe, #3b82f6)",
              borderRadius: "10px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 8px 20px rgba(24, 51, 254, 0.25)",
              transform: "rotate(1.5deg)",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: "bold" }}>
                ⚡
              </div>
              <div>
                <div style={{ color: "#ffffff", fontSize: "12px", fontWeight: 700 }}>Next.js &amp; Clean APIs</div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "10px" }}>99+ Core Web Vitals Score</div>
              </div>
            </div>
            <span style={{ color: "#ffffff", fontSize: "10px", fontWeight: 600, background: "rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: "100px" }}>Fast</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#e2e8f0" }} />
              <div style={{ height: "5px", width: "80px", background: "#e2e8f0", borderRadius: "2.5px" }} />
            </div>
            <span style={{ fontSize: "10px", color: "#94a3b8" }}>03:18</span>
          </div>
        </div>
      ),
    },
    {
      id: "Service-03",
      title: "E-Commerce Solutions",
      description:
        "High-converting digital storefronts with seamless checkout funnels, secure payment gateway integrations, catalog management, and automated order workflows.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      mockup: (
        <div style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "16px", padding: "16px", border: "1px solid rgba(24, 51, 254, 0.08)" }}>
          {/* Main Top Mockup Card with User Items & Checkmarks */}
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)", marginBottom: "12px" }}>
            {[
              { name: "Payment Gateways", color: "#1833fe" },
              { name: "Live Inventory Sync", color: "#6366f1" },
              { name: "Instant Checkout", color: "#10b981" },
            ].map((row, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: idx === 2 ? 0 : "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: row.color, opacity: 0.8 }} />
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#334155" }}>{row.name}</span>
                </div>
                <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", fontSize: "9px", fontWeight: "bold" }}>
                  ✓
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA / Notification Bar */}
          <div
            style={{
              background: "linear-gradient(135deg, #ef5645, #ffaf5e)",
              borderRadius: "10px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 6px 16px rgba(239, 86, 69, 0.25)",
            }}
          >
            <span style={{ color: "#ffffff", fontSize: "12px", fontWeight: 700 }}>High Conversion Funnels</span>
            <span style={{ color: "#ffffff", fontSize: "10px", fontWeight: 600, background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "100px" }}>+99.8%</span>
          </div>
        </div>
      ),
    },
  ];

  const websiteTypes = [
    {
      id: "Type-01",
      title: "Personal Websites & Blogs",
      description:
        "Personal branding platforms and content hubs where creators, consultants, and professionals share insights, publish articles, and build an engaged audience.",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      mockup: (
        <div style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "16px", padding: "16px", border: "1px solid rgba(24, 51, 254, 0.08)" }}>
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ height: "7px", width: "60%", background: "#6366f1", borderRadius: "3.5px", marginBottom: "8px" }} />
            <div style={{ height: "5px", width: "90%", background: "#cbd5e1", borderRadius: "2.5px", marginBottom: "5px" }} />
            <div style={{ height: "5px", width: "75%", background: "#e2e8f0", borderRadius: "2.5px", marginBottom: "12px" }} />
            <div style={{ display: "inline-block", background: "rgba(99,102,241,0.1)", color: "#6366f1", fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px" }}>
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
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
      mockup: (
        <div style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "16px", padding: "16px", border: "1px solid rgba(24, 51, 254, 0.08)" }}>
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ height: "8px", width: "80%", background: "#1833fe", borderRadius: "4px", marginBottom: "8px" }} />
            <div style={{ height: "5px", width: "95%", background: "#cbd5e1", borderRadius: "2.5px", marginBottom: "12px" }} />
            <div style={{ background: "#1833fe", color: "#ffffff", fontSize: "10px", fontWeight: 700, padding: "5px 12px", borderRadius: "6px", textAlign: "center" }}>
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
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="9" y1="6" x2="9.01" y2="6" />
          <line x1="15" y1="6" x2="15.01" y2="6" />
          <line x1="9" y1="10" x2="9.01" y2="10" />
          <line x1="15" y1="10" x2="15.01" y2="10" />
        </svg>
      ),
      mockup: (
        <div style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "16px", padding: "16px", border: "1px solid rgba(24, 51, 254, 0.08)" }}>
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
              <div style={{ flex: 1, height: "24px", background: "#f1f5f9", borderRadius: "4px" }} />
              <div style={{ flex: 1, height: "24px", background: "#f1f5f9", borderRadius: "4px" }} />
            </div>
            <div style={{ height: "6px", width: "70%", background: "#4f46e5", borderRadius: "3px", marginBottom: "6px" }} />
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600 }}>Company Portals &amp; Portfolios</div>
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
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
        </svg>
      ),
      mockup: (
        <div style={{ position: "relative", width: "100%", background: "#f8faff", borderRadius: "16px", padding: "16px", border: "1px solid rgba(24, 51, 254, 0.08)" }}>
          <div style={{ background: "#ffffff", borderRadius: "12px", padding: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ height: "7px", width: "50%", background: "#0ea5e9", borderRadius: "3.5px" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#10b981" }}>$299.00</span>
            </div>
            <div style={{ background: "linear-gradient(135deg, #1833fe, #0ea5e9)", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "5px 12px", borderRadius: "6px", textAlign: "center" }}>
              Instant Cart &amp; Checkout
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentCards = activeTab === "services" ? coreServices : websiteTypes;

  return (
    <section className="rt-speciality rt-overflow-hidden" style={{ padding: "80px 0 60px 0" }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header */}
        <div className="rt-tools-iconheading rt-speciality-heading rt-heading-bottom-gap" style={{ margin: "0 auto 36px auto", textAlign: "center" }}>
          <div className="rt-sub-gap" style={{ justifyContent: "center" }}>
            <div className="rt-sub-text rt-sub-gredient">solutions &amp; website types</div>
          </div>
          <h2 className="rt-gap-off rt-desktop-text-center">
            Websites engineered for performance, conversion, and growth
          </h2>
          <p style={{ maxWidth: "680px", margin: "14px auto 0 auto", color: "#64748b", fontSize: "15px", lineHeight: "1.6" }}>
            Explore our core web development services and tailored website formats built to bring in customers.
          </p>
        </div>

        {/* Tab Filter Pills */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "42px" }}>
          <button
            onClick={() => setActiveTab("services")}
            style={{
              padding: "10px 24px",
              borderRadius: "100px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              border: activeTab === "services" ? "1px solid #1833fe" : "1px solid rgba(0,0,0,0.08)",
              background: activeTab === "services" ? "#1833fe" : "#ffffff",
              color: activeTab === "services" ? "#ffffff" : "#475569",
              boxShadow: activeTab === "services" ? "0 4px 14px rgba(24,51,254,0.2)" : "0 2px 6px rgba(0,0,0,0.02)",
              transition: "all 0.25s ease",
            }}
          >
            Core Services (3)
          </button>
          <button
            onClick={() => setActiveTab("types")}
            style={{
              padding: "10px 24px",
              borderRadius: "100px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              border: activeTab === "types" ? "1px solid #1833fe" : "1px solid rgba(0,0,0,0.08)",
              background: activeTab === "types" ? "#1833fe" : "#ffffff",
              color: activeTab === "types" ? "#ffffff" : "#475569",
              boxShadow: activeTab === "types" ? "0 4px 14px rgba(24,51,254,0.2)" : "0 2px 6px rgba(0,0,0,0.02)",
              transition: "all 0.25s ease",
            }}
          >
            Website Categories (4)
          </button>
        </div>

        {/* Cards Grid matching rt-speciality-wrapper */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: activeTab === "services" ? "repeat(auto-fit, minmax(320px, 1fr))" : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {currentCards.map((item) => (
            <div
              key={item.id}
              className="rt-speciality-item rt-border-radius-medium rt-shadow"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "36px 30px",
                background: "#ffffff",
                borderRadius: "24px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
              }}
            >
              {/* Card Top: Benefits Icon, Title, Description */}
              <div className="rt-speciality-item-top" style={{ marginBottom: "24px" }}>
                <div className="rt-benefits-icon" style={{ marginBottom: "18px" }}>
                  {item.icon}
                </div>
                <div className="rt-text-style-h6" style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                  {item.title}
                </div>
                <p className="rt-gap-off" style={{ color: "#64748b", fontSize: "14.5px", lineHeight: "1.6" }}>
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: Interactive Visual Mockup */}
              <div className="rt-speciality-item-bottom">
                {item.mockup}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Styling */}
      <style>{`
        .rt-speciality-item:hover {
          transform: translateY(-6px);
          border-color: rgba(24, 51, 254, 0.3) !important;
          box-shadow: 0px 20px 40px -10px rgba(24, 51, 254, 0.12) !important;
        }
      `}</style>
    </section>
  );
}
