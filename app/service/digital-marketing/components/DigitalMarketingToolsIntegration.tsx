"use client";
import React, { useEffect, useRef } from "react";

import Image from "next/image";

export default function DigitalMarketingToolsIntegration() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            // Optional: stop observing once it has animated
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

  return (
    <section className="rt-tools-icon-v1" ref={sectionRef}>
      <style>{`

        /* Stagger the delays for the logos in each row to create a wave effect */
        .rt-integration-top > div:nth-child(1) .reveal-on-scroll { transition-delay: 0.1s; }
        .rt-integration-top > div:nth-child(2) .reveal-on-scroll { transition-delay: 0.2s; }
        .rt-integration-top > div:nth-child(3) .reveal-on-scroll { transition-delay: 0.3s; }
        .rt-integration-top > div:nth-child(4) .reveal-on-scroll { transition-delay: 0.4s; }
        .rt-integration-top > div:nth-child(5) .reveal-on-scroll { transition-delay: 0.5s; }
        .rt-integration-top > div:nth-child(6) .reveal-on-scroll { transition-delay: 0.6s; }
        .rt-integration-top > div:nth-child(7) .reveal-on-scroll { transition-delay: 0.7s; }
      `}</style>
      <div className="w-layout-blockcontainer rt-container-extra-large w-container mt-[5rem]">
        <div className="rt-tools-icon-main rt-overflow-hidden rt-position-relative">
          <div className="rt-tools-icon-container rt-change">
            <div
              data-w-id="94ab69a2-10a8-48fd-4bee-648edaa97316"
              className="rt-tools-iconheading rt-heading-bottom-gap reveal-on-scroll"
            >
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">marketing stack</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                We work with the tools{" "}
                <span className="rt-color-periwinkle-gray">
                  your business already uses
                </span>
              </h2>
            </div>
            <div className="w-layout-vflex rt-integration-main-v2 rt-margin-auto">
              {/* Row 1 — 7 tools */}
              <div className="rt-integration-top">
                {/* Google Ads */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d09c" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 36.5L18 18l4.5 7.8L16.5 36.5H7.5z" fill="#FBBC04"/><path d="M29.5 36.5H40.5L29.5 18 24 27.8 29.5 36.5z" fill="#4285F4"/><path d="M18 18l11.5 0L24 8.5 18 18z" fill="#34A853"/></svg>
                  </div>
                </div>
                {/* Meta Ads */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d09e" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="meta-g1" x1="6" y1="24" x2="20" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#0064E1"/><stop offset="1" stopColor="#0064E1" stopOpacity="0"/></linearGradient><linearGradient id="meta-g2" x1="6" y1="30" x2="20" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#0064E1"/><stop offset="1" stopColor="#0080FF"/></linearGradient></defs><path d="M6 23c0-4 2.2-8.5 5.5-8.5 2 0 3.5 1.2 5.5 4.5l5 8.5c2.8 4.8 5.5 7.5 9 7.5 2 0 3.8-.8 5.3-2.3" stroke="#0081FB" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M6 23c0 5 2.5 12 8 12 3 0 5.5-2 8-6" stroke="url(#meta-g2)" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M36.3 32.2C39.5 28.5 42 22.5 42 18c0-3-1.2-3.5-2.5-3.5-1.8 0-3.8 1.5-5.5 4.5l-5 8.5" stroke="#0081FB" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
                  </div>
                </div>
                {/* Google Analytics */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a0" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="10" width="8" height="28" rx="4" fill="#F9AB00"/><rect x="20" y="22" width="8" height="16" rx="4" fill="#E37400" opacity="0.8"/><circle cx="13" cy="35" r="4" fill="#E37400"/></svg>
                  </div>
                </div>
                {/* Mailchimp */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a2" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><ellipse cx="24" cy="22" rx="14" ry="12" fill="#FFE01B"/><path d="M16 22c0-2 1.5-4 4-5l8 0c2.5 1 4 3 4 5 0 4-3.6 8-8 8s-8-4-8-8z" fill="#241C15"/><circle cx="20" cy="21" r="1.5" fill="#fff"/><circle cx="28" cy="21" r="1.5" fill="#fff"/><path d="M21 26c1 1.5 5 1.5 6 0" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/><path d="M35 16c1-2 4-4 4-4s-1 3-2 5" stroke="#241C15" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  </div>
                </div>
                {/* HubSpot */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a4" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="33" cy="14" r="5" fill="#FF7A59"/><path d="M33 19v6" stroke="#FF7A59" strokeWidth="3" strokeLinecap="round"/><path d="M20 30a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" fill="#FF7A59"/><path d="M20 30h-8" stroke="#FF7A59" strokeWidth="3" strokeLinecap="round"/><path d="M12 24l-4-4" stroke="#FF7A59" strokeWidth="3" strokeLinecap="round"/><path d="M12 36l-4 4" stroke="#FF7A59" strokeWidth="3" strokeLinecap="round"/></svg>
                  </div>
                </div>
                {/* SEMrush */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a6" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><path d="M24 8C15.2 8 8 15.2 8 24s7.2 16 16 16 16-7.2 16-16S32.8 8 24 8z" fill="#FF642D"/><path d="M16 24h16M24 16v16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><circle cx="24" cy="24" r="4" fill="#fff"/></svg>
                  </div>
                </div>
                {/* Canva */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a8" className="rt-itegration-logo rt-last reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="16" fill="#7D2AE7"/><path d="M18 30c0-5 2.5-10 6-10s6 5 6 10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/><circle cx="18" cy="30" r="2.5" fill="#fff"/><circle cx="30" cy="30" r="2.5" fill="#fff"/></svg>
                  </div>
                </div>
              </div>
              {/* Row 2 — 4 tools */}
              <div className="rt-integration-top rt-bottom">
                {/* LinkedIn Ads */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0ab" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="36" height="36" rx="6" fill="#0A66C2"/><rect x="13" y="20" width="5" height="15" rx="1" fill="#fff"/><circle cx="15.5" cy="15.5" r="2.5" fill="#fff"/><path d="M23 20h5v3s1-3 5-3 5 3 5 6v9h-5v-8c0-1.5-1-2.5-2.5-2.5S28 27.5 28 29v6h-5V20z" fill="#fff"/></svg>
                  </div>
                </div>
                {/* Google Search Console */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0ad" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="12" stroke="#4285F4" strokeWidth="3" fill="none"/><path d="M31 31l8 8" stroke="#34A853" strokeWidth="3" strokeLinecap="round"/><path d="M16 22h12" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round"/><path d="M22 16v12" stroke="#FBBC04" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </div>
                </div>
                {/* WordPress */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0af" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="17" fill="#21759B"/><path d="M9 24c0 7.2 4.2 13.5 10.2 16.5L10.5 18A14.9 14.9 0 0 0 9 24zm25.5-1.5c0-2.2-.8-3.7-1.5-4.9-1-1.5-1.8-2.8-1.8-4.3 0-1.7 1.3-3.3 3.1-3.3l.2.01A14.97 14.97 0 0 0 24 9C19.2 9 15 11.4 12.5 15.1l1 .02c1.7 0 4.3-.2 4.3-.2.9-.05 1 1.2.1 1.3 0 0-.9.1-1.8.15l5.8 17.2 3.5-10.4-2.5-6.8c-.9-.05-1.7-.15-1.7-.15-.9-.05-.8-1.35.1-1.3 0 0 2.7.2 4.3.2 1.7 0 4.3-.2 4.3-.2.9-.05 1 1.2.1 1.3l-1.7.15 5.7 17 1.6-5.2c.7-2.2 1.2-3.8 1.2-5.2zM24.4 25.5l-4.7 13.7a15 15 0 0 0 9.2-.2l-.1-.2-4.4-13.3zm12.9-8.5a15 15 0 0 1 .2 2.3c0 2.3-.4 4.8-1.7 8L31 39c4.4-2.6 7-7.3 7-12.5a15 15 0 0 0-.7-4.5z" fill="#fff"/></svg>
                  </div>
                </div>
                {/* Ahrefs */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0b1" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="17" fill="#FF7043"/><text x="24" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff" fontFamily="Arial,sans-serif">Ahrefs</text></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rt-tools-icon-overlay">
            <Image
              src="/Home3_files/690adbc5bfed3c0fa7e49213_Vector 1530.webp"
              loading="lazy"
              alt="taskopia-home-two-overlay-integration"
             width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
