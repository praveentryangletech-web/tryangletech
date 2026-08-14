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
                {/* Google Analytics */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a0" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="10" width="8" height="28" rx="4" fill="#F9AB00"/><rect x="20" y="22" width="8" height="16" rx="4" fill="#E37400" opacity="0.8"/><circle cx="13" cy="35" r="4" fill="#E37400"/></svg>
                  </div>
                </div>
                {/* Meta Ads */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d09e" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="meta-g1" x1="6" y1="24" x2="20" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#0064E1"/><stop offset="1" stopColor="#0064E1" stopOpacity="0"/></linearGradient><linearGradient id="meta-g2" x1="6" y1="30" x2="20" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#0064E1"/><stop offset="1" stopColor="#0080FF"/></linearGradient></defs><path d="M6 23c0-4 2.2-8.5 5.5-8.5 2 0 3.5 1.2 5.5 4.5l5 8.5c2.8 4.8 5.5 7.5 9 7.5 2 0 3.8-.8 5.3-2.3" stroke="#0081FB" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M6 23c0 5 2.5 12 8 12 3 0 5.5-2 8-6" stroke="url(#meta-g2)" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M36.3 32.2C39.5 28.5 42 22.5 42 18c0-3-1.2-3.5-2.5-3.5-1.8 0-3.8 1.5-5.5 4.5l-5 8.5" stroke="#0081FB" strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
                  </div>
                </div>
                {/* SEO (Search Console) */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0ad" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="12" stroke="#4285F4" strokeWidth="3" fill="none"/><path d="M31 31l8 8" stroke="#34A853" strokeWidth="3" strokeLinecap="round"/><path d="M16 22h12" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round"/><path d="M22 16v12" stroke="#FBBC04" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </div>
                </div>
              </div>
              {/* Row 2 — 3 tools */}
              <div className="rt-integration-top rt-bottom">
                {/* LinkedIn */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0ab" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="36" height="36" rx="6" fill="#0A66C2"/><rect x="13" y="20" width="5" height="15" rx="1" fill="#fff"/><circle cx="15.5" cy="15.5" r="2.5" fill="#fff"/><path d="M23 20h5v3s1-3 5-3 5 3 5 6v9h-5v-8c0-1.5-1-2.5-2.5-2.5S28 27.5 28 29v6h-5V20z" fill="#fff"/></svg>
                  </div>
                </div>
                {/* Facebook */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0af" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="6" width="36" height="36" rx="8" fill="#1877F2"/>
                      <path d="M29 38V24.5h4.5l.7-5.2h-5.2v-3.3c0-1.5.4-2.5 2.6-2.5H34V9c-.5-.1-2.1-.2-4-.2-4 0-6.7 2.4-6.7 6.9v3.6H19v5.2h4.3V38H29z" fill="#ffffff"/>
                    </svg>
                  </div>
                </div>
                {/* Instagram */}
                <div>
                  <div data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a8" className="rt-itegration-logo reveal-on-scroll" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:129, height:132 }}>
                    <svg viewBox="0 0 48 48" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="ig-grad" x1="10" y1="38" x2="38" y2="10" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#f09433"/>
                          <stop offset="0.25" stopColor="#e6683c"/>
                          <stop offset="0.5" stopColor="#dc2743"/>
                          <stop offset="0.75" stopColor="#cc2366"/>
                          <stop offset="1" stopColor="#bc1888"/>
                        </linearGradient>
                      </defs>
                      <path d="M24 10.3c4.4 0 4.9.02 6.6.1 4.5.2 6.5 2.3 6.7 6.7.08 1.7.1 2.2.1 6.6s-.02 4.9-.1 6.6c-.2 4.4-2.3 6.5-6.7 6.7-1.7.08-2.2.1-6.6.1s-4.9-.02-6.6-.1c-4.4-.2-6.5-2.3-6.7-6.7-.08-1.7-.1-2.2-.1-6.6s.02-4.9.1-6.6c.2-4.4 2.3-6.5 6.7-6.7 1.7-.08 2.2-.1 6.6-.1m0-3.3c-4.5 0-5.1.02-6.9.1-6 .2-9.3 3.5-9.6 9.6-.08 1.8-.1 2.4-.1 6.9s.02 5.1.1 6.9c.2 6 3.5 9.3 9.6 9.6 1.8.08 2.4.1 6.9.1s5.1-.02 6.9-.1c6-.2 9.3-3.5 9.6-9.6.08-1.8.1-2.4.1-6.9s-.02-5.1-.1-6.9c-.2-6-3.5-9.3-9.6-9.6-1.8-.08-2.4-.1-6.9-.1zm0 8.7c-4.6 0-8.4 3.8-8.4 8.4s3.8 8.4 8.4 8.4 8.4-3.8 8.4-8.4-3.8-8.4-8.4-8.4zm0 13.8c-3 0-5.4-2.4-5.4-5.4s2.4-5.4 5.4-5.4 5.4 2.4 5.4 5.4-2.4 5.4-5.4 5.4zm8.8-16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="url(#ig-grad)"/>
                    </svg>
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
