'use client';
import React, { useEffect, useRef } from 'react';
import Image from "next/image";

const A = '/about-assets';

export default function CustomSoftwareFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  // Native Scroll Reveal Observer
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
    <section ref={sectionRef} className="rt-process-section" style={{ position: 'relative', padding: '60px 0 40px 0' }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header */}
        <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap reveal-on-scroll">
          <div data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdeb" className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">our development process</div>
          </div>
          <h2 data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdee" className="rt-gap-off rt-desktop-text-center">
            Deliver projects on time through{" "}
            <span className="rt-color-periwinkle-gray">streamlined execution</span>
          </h2>
          <p style={{ maxWidth: "680px", margin: "14px auto 0 auto", color: "#64748b", fontSize: "15px", lineHeight: "1.6", textAlign: "center" }}>
            From in-depth requirement analysis and scalable architecture design to agile sprints, automated testing, and zero-downtime cloud launch.
          </p>
        </div>

        {/* Stepped Process Cascade Layout */}
        <div className="rt-process-main rt-position-relative reveal-on-scroll">
          {/* Step Columns with Dashed Line Guides */}
          <div className="rt-process-wrapper">
            {[
              { wid1: 'baf8e5e7-49ac-4f7f-ad09-58deaac1a659', wid2: '55254470-bac2-0dd8-dd5a-5cfe717a3c25', label: 'Discover', cls: 'one' },
              { wid1: 'e48fada5-0185-92fe-c33e-d6a7c98377b3', wid2: 'e48fada5-0185-92fe-c33e-d6a7c98377b6', label: 'Design & Develop', cls: 'two' },
              { wid1: '0d8e4976-b51c-d283-cc1a-5a60ed5dc1f7', wid2: '0d8e4976-b51c-d283-cc1a-5a60ed5dc1fa', label: 'Launch & Support', cls: 'three' },
            ].map(({ wid1, wid2, label, cls }) => (
              <div key={cls} className="rt-process-item">
                <div data-w-id={wid1} className="rt-process-text">
                  <div style={{ fontWeight: 600, color: "#475569" }}>{label}</div>
                </div>
                <div data-w-id={wid2} className="rt-process-item-line-main">
                  <div className={`rt-process-item-line ${cls}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Staggered Process Detail Boxes */}
          <div className="rt-process-item-overlay rt-overflow-hidden">
            {/* Step 1: Discover & Planning (Orange Card) */}
            <div
              data-w-id="fe26f0d6-37c8-3685-a177-c8bb05fdb9ca"
              className="rt-process-box rt-1 rt-interactive-process-box"
              style={{ cursor: "pointer" }}
            >
              <div className="rt-icon-no" style={{ marginTop: "2px" }}>
                <Image src={`${A}/690c7b256a26b771ea0562fb_Vector (27).svg`} loading="lazy" alt="" width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-process-text-gap">
                <div className="rt-text-style-h6 rt-text-color-white" style={{ fontSize: "18px", fontWeight: 700 }}>
                  Requirement gathering &amp; Architecture
                </div>
                <p className="rt-gap-off rt-text-color-white" style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.95 }}>
                  We understand your business goals, target audience, technical specifications, and database scope to build the right foundation.
                </p>
              </div>
            </div>

            {/* Step 2: Design & Development (Frosted Card) */}
            <div
              data-w-id="9a59051b-7eac-c0f0-0d70-0d14e85112ac"
              className="rt-process-box rt-2 rt-interactive-process-box"
              style={{ cursor: "pointer" }}
            >
              <div className="rt-icon-no" style={{ marginTop: "2px" }}>
                <Image src={`${A}/690c7b2508ab483ef4047387_Vector (28).svg`} loading="lazy" alt="" width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-process-text-gap">
                <div className="rt-text-style-h6" style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                  Design &amp; Agile Development
                </div>
                <p className="rt-gap-off" style={{ fontSize: "14px", lineHeight: "1.6", color: "#64748b" }}>
                  Our team crafts intuitive UI/UX designs and builds robust, scalable frontend and backend systems tailored to your workflows.
                </p>
              </div>
            </div>

            {/* Step 3: Launch & Support (Blue Card) */}
            <div
              data-w-id="6b5c6d36-e516-7ca4-cea7-722942bbc918"
              className="rt-process-box rt-3 rt-interactive-process-box"
              style={{ cursor: "pointer" }}
            >
              <div className="rt-icon-no" style={{ marginTop: "2px" }}>
                <Image src={`${A}/6914525ddeeb169b19ad1aa4_Vector (29).svg`} loading="lazy" alt="" width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-process-text-gap">
                <div className="rt-text-style-h6 rt-text-color-white" style={{ fontSize: "18px", fontWeight: 700 }}>
                  Quality Testing &amp; Launch Support
                </div>
                <p className="rt-gap-off rt-text-color-white" style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.95 }}>
                  We perform thorough automated testing, deploy your project to cloud infrastructure, and provide dedicated ongoing support post-launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-w-id="f7dfaa0b-0429-3472-8e08-cf86c14810bf" className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
        <div className="rt-section-overlay"></div>
      </div>

      {/* Smooth hover styles */}
      <style>{`
        .rt-interactive-process-box {
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease !important;
        }
        .rt-interactive-process-box:hover {
          transform: translateY(-5px) scale(1.01);
        }
        .rt-process-box.rt-1:hover {
          box-shadow: 1.25rem 1.5rem 3.5rem rgba(248, 89, 54, 0.45) !important;
        }
        .rt-process-box.rt-2:hover {
          box-shadow: 1.25rem 1.5rem 3.5rem rgba(24, 51, 254, 0.12) !important;
          border-color: rgba(24, 51, 254, 0.3) !important;
        }
        .rt-process-box.rt-3:hover {
          box-shadow: 1.25rem 1.5rem 3.5rem rgba(60, 161, 255, 0.45) !important;
        }
      `}</style>
    </section>
  );
}
