import React from 'react';

import Image from "next/image";

const A = '/about-assets';

export default function AboutFeatures() {
  return (
    <>
        {/* ── FEATURES ── */}
        <section className="rt-features-v1">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap">
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">our features</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Delivering digital excellence through <span className="rt-color-periwinkle-gray">expert IT solutions</span>
              </h2>
            </div>

            <div className="rt-features-v1-wrapper">
              {/* Feature 1 — Progress tracking */}
              <div data-w-id="7332a125-a796-723b-e9c9-e16e2936f971" className="rt-features-v1-left rt-border-radius-l">
                <div className="rt-features-v1-inner-heading">
                  <div className="rt-small-sub-gap"><div className="rt-sub-text rt-sub-small">WEB DEVELOPMENT</div></div>
                  <div className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap">Custom websites that perform</div>
                  <p className="rt-color-pale-periwinkle rt-gap-off">From custom builds to WordPress and e-commerce, we craft fast, responsive websites that engage your audience and deliver real business results.</p>
                </div>
                <div data-w-id="62508c73-e31b-0068-13cd-79c365633cb0" className="rt-features-v1-inner-image">
                  <Image src={`${A}/690c408d17e948acfd9dd61a_taskopia-%20about-features-1.webp`} loading="lazy" alt="about-features-1"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  <div className="rt-features-v1-inner-image-over">
                    <div data-w-id="bcfd77a1-c414-9dba-e50b-0935c10eca41" className="rt-features-v1-inner-image-inner">
                      <Image src={`${A}/690c411f1386eb9e04e8adb7_Mask%20group%20(9).webp`} loading="lazy" alt="line-animation" className="rt-image-min-width"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 — Collaboration */}
              <div data-w-id="56f1b25a-061c-3e82-d0b8-df0f60b657fd" className="rt-features-v1-left rt-border-radius-l rt-right">
                <div className="rt-features-v1-inner-heading">
                  <div className="rt-small-sub-gap"><div className="rt-sub-text rt-sub-small">MOBILE & SOFTWARE</div></div>
                  <div className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap">Apps and software built to scale</div>
                  <p className="rt-color-pale-periwinkle rt-gap-off">iOS and Android apps, custom software, and scalable digital solutions — built around your business goals and delivered on time.</p>
                </div>
                <div className="rt-features-v1-inner-image-2">
                  <div data-w-id="7a0ae718-492b-9c68-43b4-75a267c14680" className="rt-features-v1-right-image-one">
                    <Image src={`${A}/690c465f3c3aa6146c8e184d_Group%202147225572.png`} loading="lazy" alt="collaboration"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div data-w-id="cf38d222-3eb1-22c6-4716-782e02464715" className="rt-features-v1-right-image">
                    <Image src={`${A}/690c408c3798540bf3f8932b_taskopia-%20about-features-3.webp`} loading="lazy" alt="about-features-3"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
