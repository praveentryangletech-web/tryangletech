'use client';
"use client";
import Link from "next/link";
import React, { useEffect, useRef } from 'react';

import Image from "next/image";

export default function ServiceAbout() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <>
      <section className="rt-about-v4 rt-overflow-hidden" ref={sectionRef}>
        <style>{`

          .stagger-grid > div:nth-child(1) { transition-delay: 0.1s; }
          .stagger-grid > div:nth-child(2) { transition-delay: 0.2s; }
          .stagger-grid > div:nth-child(3) { transition-delay: 0.3s; }
          .stagger-grid > div:nth-child(4) { transition-delay: 0.4s; }
        `}</style>
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-about-v4-contanner rt-overflow-hidden" style={{ paddingLeft: '8%', paddingRight: '8%' }}>
              <div className="rt-about-v4-main" style={{ display: 'flex', width: '100%', gap: '6%' }}>
                <div
                  data-w-id="70c45100-f145-3c18-c43c-49629dffa554"
                  className="rt-about-v4-left rt-position-relative" style={{ flex: 1 }}>
                  <div className="rt-about-v4-box-samll rt-tab-display-none"></div>
                  <div
                    data-w-id="70c45100-f145-3c18-c43c-49629dffa555"
                    className="rt-position-relative rt-4">
                    <Image
                      src="/Home2_files/69254371136c64c2548fd85e_taskopiya-home-two-project-over.webp"
                      loading="lazy"
                      alt="taskopiya-home-two-project-over"
                      style={{ width: '100%', height: 'auto' }}
                     width={800} height={800} />
                    <div className="rt-about-v4-left-line rt-tab-display-none">
                      <Image
                        src="/Home2_files/6912cb4109692fed844d1f39_taskopia-home-two-who-3.webp"
                        loading="lazy"
                        alt="taskopia-home-two-who-3"
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                  </div>
                  <div
                    data-w-id="b033537f-357f-c026-0852-3db8a224feb4"
                    className="rt-about-v4-left-small-image rt-border-radius-medium rt-overflow-hidden">
                    <Image
                      src="/Home2_files/6912cb4228402e3879fa5f10_taskopia-home-two-who.webp"
                      loading="lazy"
                      alt="taskopia-home-two-who"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div className="rt-about-v4-right" style={{ flex: 1 }}>
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="70c45100-f145-3c18-c43c-49629dffa55a"
                      className="rt-sub-text">
                      Key Highlights
                    </div>
                  </div>
                  <div className="rt-heading-para-gap">
                    <h2
                      data-w-id="70c45100-f145-3c18-c43c-49629dffa55d"
                      className="rt-gap-off rt-text-color-white">
                      Stay focused, minimize delays, maximize results
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-10 my-8 stagger-grid">
                    {/* Collaboration Block */}
                    <div className="flex flex-col items-start reveal-on-scroll">
                      <div className="">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#eb3612ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="12" width="6" height="8" rx="1"></rect>
                          <rect x="9" y="8" width="6" height="12" rx="1"></rect>
                          <rect x="15" y="4" width="6" height="16" rx="1"></rect>
                        </svg>
                      </div>
                      <div className="rt-text-style-h6 mb-0 pb-0  rt-text-color-white ">
                        Collaboration
                      </div>
                      <p className="rt-gap-off rt-color-pale-periwinkle">
                        Enhance team productivity with seamless collaboration
                      </p>
                    </div>

                    {/* Innovation Block */}
                    <div className="flex flex-col items-start reveal-on-scroll">
                      <div className="">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#eb3612ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 12 12 17 22 12"></polyline>
                          <polyline points="2 17 12 22 22 17"></polyline>
                        </svg>
                      </div>
                      <div className="rt-text-style-h6 mb-0 pb-0  rt-text-color-white ">
                        Innovation
                      </div>
                      <p className="rt-gap-off rt-color-pale-periwinkle">
                        Drive progress with innovative task management solutions
                      </p>
                    </div>

                    {/* Efficiency Block (Row 2) */}
                    <div className="flex flex-col items-start reveal-on-scroll">
                      <div className="">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#eb3612ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      <div className="rt-text-style-h6 mb-0 pb-0  rt-text-color-white ">
                        Efficiency
                      </div>
                      <p className="rt-gap-off rt-color-pale-periwinkle">
                        Streamline your workflow and get more done in less time.
                      </p>
                    </div>

                    {/* Security Block (Row 2) */}
                    <div className="flex flex-col items-start reveal-on-scroll">
                      <div className="">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#eb3612ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                      <div className="rt-text-style-h6 mb-0 pb-0  rt-text-color-white ">
                        Security
                      </div>
                      <p className="rt-gap-off rt-color-pale-periwinkle">
                        Keep your data protected with enterprise-grade security.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="70c45100-f145-3c18-c43c-49629dffa573"
                    className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                    <Link
                      data-wf--rt-border-button--variant="base"
                      data-w-id="9067a903-cf07-9614-de57-af0aba677203"
                      href="/contact"
                      className="rt-button-body rt-nav-btn w-inline-block">
                      <div className="rt-button-text rt-btn-color-nav">
                        &nbsp;Get started today
                      </div>
                      <div className="rt-button-body-overlay rt-nav-overlay"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
    </>
  );
}
