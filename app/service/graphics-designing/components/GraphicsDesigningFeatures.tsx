'use client';

import React from "react";
import ScrollTextReveal from "../../../common/ScrollTextReveal";

export default function GraphicsDesigningFeatures() {
  const designServices = [
    {
      title: "Logo Design",
      desc: "A memorable logo is the cornerstone of your brand. We craft distinctive, versatile logos along with complete brand guidelines, color systems, and scalable vector assets for digital and print.",
      points: [
        "Scalable Vector Files (AI, SVG, EPS, PDF)",
        "Comprehensive Brand Color & Typography System",
        "Full Commercial Ownership & Copyrights",
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path d="M2 17L12 22L22 17" />
          <path d="M2 12L12 17L22 12" />
        </svg>
      ),
    },
    {
      title: "Brochure Design",
      desc: "Communicate your brand's core message and offerings with expertly structured corporate brochures, bi-folds, tri-folds, and product catalogs designed to engage stakeholders and drive conversions.",
      points: [
        "Bi-Fold, Tri-Fold & Multi-Page Layouts",
        "CMYK Print-Ready 300 DPI Deliverables",
        "Interactive Digital PDFs for Web & Email",
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5V4.5C4 3.12 5.12 2 6.5 2H20V22H6.5C5.12 22 4 20.88 4 19.5Z" />
          <path d="M6 6H16" />
          <path d="M6 10H16" />
        </svg>
      ),
    },
    {
      title: "Visiting Card Design",
      desc: "Make an unforgettable first impression at every networking opportunity with premium business card designs tailored to reflect your executive stature and distinct corporate brand identity.",
      points: [
        "Custom Single & Double-Sided Layouts",
        "Spot UV, Foil Stamping & Emboss Ready",
        "Standard & Custom Die-Cut Dimensions",
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8" cy="11" r="2" />
          <line x1="13" y1="10" x2="18" y2="10" />
          <line x1="13" y1="13" x2="16" y2="13" />
        </svg>
      ),
    },
    {
      title: "Letterhead Design",
      desc: "Ensure your official business correspondence, proposals, invoices, and contracts project authority and trust with polished, cohesive corporate stationery suites and editable templates.",
      points: [
        "Editable Microsoft Word & Google Docs Formats",
        "High-Resolution Print-Ready Vector PDF Bleeds",
        "Matching Envelopes & Presentation Folders",
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      title: "Label Design",
      desc: "Make your retail products stand out on crowded shelves and online storefronts with striking, regulatory-compliant product labels, pouch packaging, bottle sleeves, and custom box artwork.",
      points: [
        "Retail-Ready Packaging & Pouch Graphics",
        "Barcode, Nutrition & Regulatory Compliance",
        "Realistic 3D Product Presentation Mockups",
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41L13.42 20.58C12.64 21.36 11.37 21.36 10.59 20.58L2 12V2H12L20.59 10.59C21.37 11.37 21.37 12.63 20.59 13.41Z" />
          <circle cx="7" cy="7" r="1.5" />
        </svg>
      ),
    },
    {
      title: "Hoarding Design",
      desc: "Capture massive attention across highways, airport transit hubs, and exhibition centers with large-format outdoor billboards, building wraps, and expo backdrops engineered for maximum impact.",
      points: [
        "Ultra-High-Resolution Large-Scale Vectors",
        "Highway Billboards, Unipoles & Bus Wraps",
        "Trade Show Booths & Expo Backdrop Displays",
      ],
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="rt-feaures-v2 rt-position-relative"
      style={{
        background: "transparent",
        paddingTop: "3rem",
        paddingBottom: "5.5rem",
      }}
    >
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Header */}
        <div className="rt-feaures-v2-top rt-desktop-text-center">
          <div className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">our design process</div>
          </div>
          <ScrollTextReveal
            text="A strategic approach to brilliant graphic design"
            align="center"
          />
        </div>

        {/* 6 Clean Webflow Cards with Rich Content & Key Deliverables */}
        <div
          className="rt-feaures-v2-wrapper"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.875rem",
          }}
        >
          {designServices.map((service, index) => (
            <div
              key={index}
              className="rt-feaures-v2-item rt-border-radius-medium rt-shadow"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  className="rt-feaures-v2-item-icon"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    color: "#1833fe",
                    marginBottom: "0.25rem",
                  }}
                >
                  {service.icon}
                </div>
                <div className="rt-text-style-h6" style={{ marginBottom: "0.5rem" }}>
                  {service.title}
                </div>
                <p className="rt-gap-off">
                  {service.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #edf2f7",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.45rem",
                }}
              >
                {service.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.85rem",
                      color: "#64748b",
                      lineHeight: "1.4",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1833fe"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
