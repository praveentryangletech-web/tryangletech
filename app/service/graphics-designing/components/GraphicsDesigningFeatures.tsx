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
            <div className="rt-feaures-v2-wrapper">
              <div
                data-w-id="eb174494-37b0-c577-f775-a0aff8b2fae8"
                className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium">
                <div className="rt-feaures-v2-item-icon">
                  <Image
                    src="/service-2-assets/6916ec6339f890a80905a69b_Vector (33).svg"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-text-style-h6">Logo &amp; Brand Identity</div>
                <p className="rt-gap-off">
                  A great logo is the foundation of your brand. We create distinctive, versatile logos and full brand kits that leave a lasting mark.
                </p>
              </div>
              <div
                data-w-id="51a3f6a3-d1e9-e116-2ab6-7bbf62b0bfaf"
                className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium">
                <div className="rt-feaures-v2-item-icon">
                  <Image
                    src="/service-2-assets/6916ec635353353be914aafc_Vector (32).svg"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-text-style-h6">Marketing &amp; Print Design</div>
                <p className="rt-gap-off">
                  From brochures and flyers to banners and presentations — we create print-ready marketing materials that command attention.
                </p>
              </div>
              <div
                data-w-id="0598657a-6564-d0cc-c595-dd3f3baae2ca"
                className="rt-feaures-v2-item rt-border-radius-medium rt-shadow graphics-card-premium">
                <div className="rt-feaures-v2-item-icon">
                  <Image
                    src="/service-2-assets/690c7b2508ab483ef4047387_Vector (28).svg"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-text-style-h6">Social Media &amp; Digital Design</div>
                <p className="rt-gap-off">
                  Scroll-stopping social media posts, ad creatives, and digital banners crafted to boost engagement and drive clicks.
                </p>
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
