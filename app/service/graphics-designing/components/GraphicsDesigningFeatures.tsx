'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function GraphicsDesigningFeatures() {
  return (
    <>
        <section className="rt-feaures-v2 rt-position-relative">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes animatedGradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .graphics-card-premium {
              background: linear-gradient(135deg, #eff6ff, #faf5ff, #fff1f2, #eff6ff);
              background-size: 300% 300%;
              animation: animatedGradient 8s ease infinite;
              border: 1px solid rgba(255, 255, 255, 0.8);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
              overflow: hidden;
              z-index: 1;
            }
            .graphics-card-premium::before {
              content: "";
              position: absolute;
              top: 0; left: -100%; width: 50%; height: 100%;
              background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
              transform: skewX(-25deg);
              transition: all 0.75s ease;
              z-index: 2;
              pointer-events: none;
            }
            .graphics-card-premium:hover {
              transform: translateY(-12px) scale(1.02);
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
              border-color: rgba(255, 255, 255, 1);
            }
            .graphics-card-premium:hover::before {
              left: 125%;
            }
            .graphics-card-premium .rt-feaures-v2-item-icon {
              transition: transform 0.4s ease, filter 0.4s ease;
            }
            .graphics-card-premium:hover .rt-feaures-v2-item-icon {
              transform: scale(1.15) translateY(-5px);
              filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
            }
          `}} />
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-feaures-v2-top rt-desktop-text-center">
              <div
                data-w-id="bd033fda-a78c-9194-d2d6-f701cfebaa63"
                className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">
                  our design process
                </div>
              </div>
              <h2
                data-w-id="bd033fda-a78c-9194-d2d6-f701cfebaa66"
                className="rt-gap-off">
                A strategic approach to brilliant{" "}
                <span className="rt-color-periwinkle-gray">
                  graphic design
                </span>
              </h2>
            </div>
            <div className="rt-feaures-v2-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              {/* Logo Design */}
              <div className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium">
                <div className="rt-feaures-v2-item-icon">
                  <Image src="/service-2-assets/6916ec6339f890a80905a69b_Vector (33).svg" loading="lazy" alt="Logo" width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-text-style-h6">Logo Design</div>
                <p className="rt-gap-off">A great logo is the foundation of your brand. We create distinctive, versatile logos that leave a lasting mark.</p>
              </div>

              {/* Brochure Design */}
              <div className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium">
                <div className="rt-feaures-v2-item-icon">
                  <Image src="/service-2-assets/6916ec635353353be914aafc_Vector (32).svg" loading="lazy" alt="Brochure" width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-text-style-h6">Brochure Design</div>
                <p className="rt-gap-off">Communicate your brand's message effectively with beautifully crafted, print-ready brochures that command attention.</p>
              </div>

              {/* Visiting Card Design */}
              <div className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium">
                <div className="rt-feaures-v2-item-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="12" r="2" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="11" x2="18" y2="11" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="14" x2="16" y2="14" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="rt-text-style-h6">Visiting Card Design</div>
                <p className="rt-gap-off">Leave a memorable first impression with premium business card designs tailored to your unique professional identity.</p>
              </div>

              {/* Letterhead Design */}
              <div className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium">
                <div className="rt-feaures-v2-item-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="10" y1="9" x2="8" y2="9" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="rt-text-style-h6">Letterhead Design</div>
                <p className="rt-gap-off">Ensure your official communications look polished and consistent with custom-designed letterheads.</p>
              </div>

              {/* Label Design */}
              <div className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium">
                <div className="rt-feaures-v2-item-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="7" y1="7" x2="7.01" y2="7" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="rt-text-style-h6">Label Design</div>
                <p className="rt-gap-off">Make your products stand out on the shelves with eye-catching, creative label and packaging designs.</p>
              </div>

              {/* Hoarding Design */}
              <div className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium">
                <div className="rt-feaures-v2-item-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="10" rx="1" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="7" y1="15" x2="7" y2="21" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="17" y1="15" x2="17" y2="21" stroke="#1833FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="rt-text-style-h6">Hoarding Design</div>
                <p className="rt-gap-off">Grab attention on a massive scale with impactful outdoor hoarding and billboard designs that drive engagement.</p>
              </div>
            </div>
          </div>
          <div
            data-w-id="f7dfaa0b-0429-3472-8e08-cf86c14810bf"
            className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
          </div>
        </section>
    </>
  );
}
