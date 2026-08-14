'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
      bgImage: "/services/mobile/card-native.jpg",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="20" x="5" y="2" rx="3" />
          <path d="M12 18h.01" />
        </svg>
      ),
    },
    {
      id: "Type-02",
      title: "Cross-Platform Mobile Apps",
      description:
        "Single-codebase efficiency with native-grade performance across both iOS and Android, drastically reducing time-to-market and ongoing maintenance overhead.",
      bgImage: "/services/mobile/card-cross.jpg",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: "Type-03",
      title: "Enterprise & Business Apps",
      description:
        "Mission-critical mobile solutions for enterprise field teams, CRM/ERP workflows, offline-first data synchronization, and role-based security access.",
      bgImage: "/services/mobile/card-enterprise.webp",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: "Type-04",
      title: "E-Commerce & On-Demand Apps",
      description:
        "Frictionless shopping and delivery experiences with 1-tap Apple Pay and Google Pay checkouts, live GPS order tracking, and push engagement.",
      bgImage: "/services/mobile/card-ecommerce.webp",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="rt-speciality rt-overflow-hidden"
      style={{
        paddingTop: "70px",
        paddingBottom: "65px",
        background: "linear-gradient(180deg, #edf2fe 0%, #f6f8fe 50%, #eff3fe 100%)",
        borderTop: "1px solid #e2e8f6",
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          .mobile-type-card {
            background: #ffffff;
            border: 1px solid #e1e6f4;
            border-radius: 1.25rem;
            padding: 2.2rem 2rem 2.2rem 2rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
            transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        box-shadow 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        border-color 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        background 0.65s cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            overflow: hidden;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 1rem;
            min-height: 290px;
            cursor: pointer;
            will-change: transform, box-shadow;
          }

          /* Top Accent Gradient Bar matching Brand Blue */
          .mobile-type-card-topbar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3.5px;
            background: linear-gradient(90deg, #1833fe, #6366f1);
            z-index: 4;
          }

          /* Integrated Brand Artwork Background */
          .mobile-card-bg-art {
            position: absolute;
            right: -15px;
            bottom: -20px;
            width: 175px;
            height: 175px;
            opacity: 0.55;
            transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
                        opacity 0.65s ease;
            pointer-events: none;
            z-index: 1;
            border-radius: 1rem;
            overflow: hidden;
            mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%);
            -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%);
          }

          /* Pure White Light-Sheen Sweep */
          .mobile-type-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: -120%;
            width: 60%;
            height: 100%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.6) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: skewX(-25deg);
            transition: all 1.1s cubic-bezier(0.22, 1, 0.36, 1);
            z-index: 3;
            pointer-events: none;
          }

          /* Ultra-Light, Subtle Hover State */
          .mobile-type-card:hover {
            transform: translateY(-8px) scale(1.015);
            background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
            border-color: #dbeafe;
            box-shadow: 0 18px 40px -10px rgba(24, 51, 254, 0.08);
          }

          .mobile-type-card:hover .mobile-card-bg-art {
            transform: scale(1.12) rotate(-3deg);
            opacity: 0.85;
          }

          .mobile-type-card:hover::before {
            left: 140%;
          }

          /* Icon Box Transition: Soft Light Pastel Tint */
          .mobile-card-icon-box {
            width: 50px;
            height: 50px;
            border-radius: 14px;
            background: #f4f7ff;
            border: 1px solid #e8edfa;
            color: #1833fe;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 2;
            transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        background 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        border-color 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        color 0.5s ease,
                        box-shadow 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .mobile-type-card:hover .mobile-card-icon-box {
            transform: scale(1.08) translateY(-2px);
            background: #eef2ff;
            border-color: #c7d2fe;
            color: #1833fe;
            box-shadow: 0 6px 16px rgba(24, 51, 254, 0.08);
          }

          /* Content Layer */
          .mobile-card-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            max-width: 84%;
          }

          /* Title Color Transition */
          .mobile-card-title {
            font-size: 1.22rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
            line-height: 1.3;
            transition: color 0.5s ease;
          }

          .mobile-type-card:hover .mobile-card-title {
            color: #1833fe;
          }
        `
      }} />

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

        {/* 4 Cards Grid with TryangleTech Brand Flow Artworks & Smooth Transitions */}
        <div
          className="rt-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {mobileAppTypes.map((item, idx) => (
            <div
              key={item.id}
              className="rt-speciality-item mobile-type-card reveal-on-scroll"
              style={{
                transitionDelay: `${idx * 0.08}s`,
              }}
            >
              {/* Top Accent Gradient Bar */}
              <div className="mobile-type-card-topbar" />

              {/* TryangleTech Brand Flow Background Artwork */}
              <div className="mobile-card-bg-art">
                <Image
                  src={item.bgImage}
                  alt={item.title}
                  width={220}
                  height={220}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Brand Icon Box */}
              <div className="mobile-card-icon-box">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="mobile-card-content">
                <div className="mobile-card-title">
                  {item.title}
                </div>
                <p
                  className="rt-gap-off"
                  style={{
                    color: "#64748b",
                    fontSize: "0.90rem",
                    lineHeight: "1.55",
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
