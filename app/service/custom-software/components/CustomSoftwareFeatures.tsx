'use client';
import React from 'react';
import Image from "next/image";

export default function CustomSoftwareFeatures() {
  return (
    <section className="rt-feaures-v2 rt-position-relative">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-feaures-v2-top rt-desktop-text-center">
          <div data-w-id="bd033fda-a78c-9194-d2d6-f701cfebaa63" className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">our development process</div>
          </div>
          <h2 data-w-id="bd033fda-a78c-9194-d2d6-f701cfebaa66" className="rt-gap-off">
            A structured approach to building{" "}
            <span className="rt-color-periwinkle-gray">great software</span>
          </h2>
        </div>
        <div className="rt-feaures-v2-wrapper">
          <div data-w-id="eb174494-37b0-c577-f775-a0aff8b2fae8" className="rt-feaures-v2-item rt-border-radius-medium rt-shadow">
            <div className="rt-feaures-v2-item-icon">
              <Image src="/service-2-assets/6916ec6339f890a80905a69b_Vector (33).svg" loading="lazy" alt="" width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="rt-text-style-h6">Discovery and Planning</div>
            <p className="rt-gap-off">First we sit down with you to understand what your business needs. Then we put together a clear plan so the whole team knows exactly what is being built and why.</p>
          </div>
          <div data-w-id="51a3f6a3-d1e9-e116-2ab6-7bbf62b0bfaf" className="rt-feaures-v2-item rt-border-radius-medium rt-shadow">
            <div className="rt-feaures-v2-item-icon">
              <Image src="/service-2-assets/6916ec635353353be914aafc_Vector (32).svg" loading="lazy" alt="" width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="rt-text-style-h6">Design and Development</div>
            <p className="rt-gap-off">Our designers and developers work as one team to bring your idea to life. The software we build looks good and works even better.</p>
          </div>
          <div data-w-id="0598657a-6564-d0cc-c595-dd3f3baae2ca" className="rt-feaures-v2-item rt-border-radius-medium rt-shadow">
            <div className="rt-feaures-v2-item-icon">
              <Image src="/service-2-assets/690c7b2508ab483ef4047387_Vector (28).svg" loading="lazy" alt="" width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="rt-text-style-h6">Testing and Launch Support</div>
            <p className="rt-gap-off">We check everything carefully before the software goes live. And once it does, we stay close and sort out any issues quickly so you are never left stuck.</p>
          </div>
        </div>
      </div>
      <div data-w-id="f7dfaa0b-0429-3472-8e08-cf86c14810bf" className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
        <div className="rt-section-overlay"></div>
      </div>
    </section>
  );
}
