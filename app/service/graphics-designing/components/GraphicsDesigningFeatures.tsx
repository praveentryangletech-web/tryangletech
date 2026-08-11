'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function GraphicsDesigningFeatures() {
  return (
    <>
        <section className="rt-feaures-v2 rt-position-relative">
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
                className="rt-feaures-v2-item rt-border-radius-medium rt-shadow">
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
                className="rt-feaures-v2-item rt-border-radius-medium rt-shadow">
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
                className="rt-feaures-v2-item rt-border-radius-medium rt-shadow">
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
            <div className="rt-section-overlay"></div>
          </div>
        </section>
    </>
  );
}
