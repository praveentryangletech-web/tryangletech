'use client';

import React from "react";
import Image from "next/image";

export default function GraphicsDesigningFeatures() {
  const designServices = [
    {
      title: "Logo Design",
      desc: "A great logo is the foundation of your brand. We create distinctive, versatile logos that leave a lasting mark across all media.",
      bgImage: "/services/graphics/card-logo.jpg",
      icon: (
        <svg className="service-card-svg" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Brochure Design",
      desc: "Communicate your brand's message effectively with beautifully crafted, print-ready corporate brochures that command attention.",
      bgImage: "/services/graphics/card-brochure.jpg",
      icon: (
        <svg className="service-card-svg" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5V4.5C4 3.12 5.12 2 6.5 2H20V22H6.5C5.12 22 4 20.88 4 19.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6H16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 10H16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Visiting Card Design",
      desc: "Leave a memorable first impression with premium business card designs tailored to your unique professional brand identity.",
      bgImage: "/services/graphics/card-visiting.jpg",
      icon: (
        <svg className="service-card-svg" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="11" r="2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="13" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="13" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Letterhead Design",
      desc: "Ensure your official communications look polished, trustworthy, and consistent with custom-designed corporate stationery.",
      bgImage: "/services/graphics/card-letterhead.jpg",
      icon: (
        <svg className="service-card-svg" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Label Design",
      desc: "Make your products stand out on retail shelves and digital catalogs with creative, high-impact label and packaging designs.",
      bgImage: "/services/graphics/card-packaging.jpg",
      icon: (
        <svg className="service-card-svg" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.59 13.41L13.42 20.58C12.64 21.36 11.37 21.36 10.59 20.58L2 12V2H12L20.59 10.59C21.37 11.37 21.37 12.63 20.59 13.41Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Hoarding Design",
      desc: "Grab attention on a massive scale with high-visibility outdoor hoarding, billboard, and transit banners that drive brand recall.",
      bgImage: "/services/graphics/card-hoarding.jpg",
      icon: (
        <svg className="service-card-svg" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="7" y1="15" x2="7" y2="21" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="17" y1="15" x2="17" y2="21" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="4" y1="21" x2="20" y2="21" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="rt-feaures-v2 rt-position-relative"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f6f8fe 50%, #eff3fe 100%)",
        paddingTop: "5rem",
        paddingBottom: "5.5rem",
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          .graphics-card-premium {
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
            gap: 1rem;
            min-height: 260px;
            max-width: none;
            cursor: pointer;
            will-change: transform, box-shadow;
          }

          /* Integrated Brand Artwork Background */
          .graphics-card-bg-art {
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
          .graphics-card-premium::before {
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
          .graphics-card-premium:hover {
            transform: translateY(-8px) scale(1.015);
            background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
            border-color: #dbeafe;
            box-shadow: 0 18px 40px -10px rgba(24, 51, 254, 0.08);
          }

          .graphics-card-premium:hover .graphics-card-bg-art {
            transform: scale(1.12) rotate(-3deg);
            opacity: 0.85;
          }

          .graphics-card-premium:hover::before {
            left: 140%;
          }

          /* Icon Box Transition: Soft Light Pastel Tint */
          .graphics-card-premium .service-icon-box {
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

          .graphics-card-premium:hover .service-icon-box {
            transform: scale(1.08) translateY(-2px);
            background: #eef2ff;
            border-color: #c7d2fe;
            color: #1833fe;
            box-shadow: 0 6px 16px rgba(24, 51, 254, 0.08);
          }

          /* Content Layer */
          .graphics-card-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            max-width: 82%;
          }

          /* Title Color Transition */
          .graphics-card-premium .service-card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
            transition: color 0.5s ease;
          }

          .graphics-card-premium:hover .service-card-title {
            color: #1833fe;
          }
        `
      }} />

      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Header */}
        <div className="rt-feaures-v2-top rt-desktop-text-center" style={{ marginBottom: "3rem" }}>
          <div className="rt-sub-gap" style={{ justifyContent: "center", marginBottom: "0.5rem" }}>
            <div className="rt-sub-text rt-sub-gredient">our design process</div>
          </div>
          <h2 className="rt-gap-off">
            A strategic approach to brilliant{" "}
            <span className="rt-color-periwinkle-gray">graphic design</span>
          </h2>
        </div>

        {/* 6 Clean White Cards with TryangleTech Brand Flow Artworks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.875rem",
          }}
        >
          {designServices.map((service, index) => (
            <div
              key={index}
              className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium"
            >
              {/* TryangleTech Bespoke Brand Flow Background Artwork */}
              <div className="graphics-card-bg-art">
                <Image
                  src={service.bgImage}
                  alt={service.title}
                  width={220}
                  height={220}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Icon Container */}
              <div className="service-icon-box">
                {service.icon}
              </div>

              {/* Text Content */}
              <div className="graphics-card-content">
                <div className="rt-text-style-h6 service-card-title">
                  {service.title}
                </div>
                <p
                  className="rt-gap-off"
                  style={{
                    color: "#64748b",
                    fontSize: "0.92rem",
                    lineHeight: "1.55",
                    margin: 0,
                  }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
