'use client';

import React from "react";
import ScrollTextReveal from "../../../common/ScrollTextReveal";

export default function GraphicsDesigningFeatures() {
  const designServices = [
    {
      title: "Logo Design",
      desc: "A great logo is the foundation of your brand. We create distinctive, versatile logos that leave a lasting mark across all media.",
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
      desc: "Communicate your brand's message effectively with beautifully crafted, print-ready corporate brochures that command attention.",
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
      desc: "Leave a memorable first impression with premium business card designs tailored to your unique professional brand identity.",
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
      desc: "Ensure your official communications look polished, trustworthy, and consistent with custom-designed corporate stationery.",
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
      desc: "Make your products stand out on retail shelves and digital catalogs with creative, high-impact label and packaging designs.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.59 13.41L13.42 20.58C12.64 21.36 11.37 21.36 10.59 20.58L2 12V2H12L20.59 10.59C21.37 11.37 21.37 12.63 20.59 13.41Z" />
          <circle cx="7" cy="7" r="1.5" />
        </svg>
      ),
    },
    {
      title: "Hoarding Design",
      desc: "Grab attention on a massive scale with high-visibility outdoor hoarding, billboard, and transit banners that drive brand recall.",
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

        {/* 6 Clean Webflow Cards without Icon/Card Background Fill */}
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
            >
              <div
                className="rt-feaures-v2-item-icon"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  color: "#1833fe",
                }}
              >
                {service.icon}
              </div>
              <div className="rt-text-style-h6">{service.title}</div>
              <p className="rt-gap-off">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
