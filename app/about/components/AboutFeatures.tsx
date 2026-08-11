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
                <div className="rt-sub-text rt-sub-gredient">our core purpose</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Driven by a clear <span className="rt-color-periwinkle-gray">mission and vision</span>
              </h2>
            </div>

            <div className="rt-features-v1-wrapper">
              {/* Feature 1 — Progress tracking */}
              <div data-w-id="7332a125-a796-723b-e9c9-e16e2936f971" className="rt-features-v1-left rt-border-radius-l">
                <div className="rt-features-v1-inner-heading">
                  <div className="rt-small-sub-gap"><div className="rt-sub-text rt-sub-small">OUR MISSION</div></div>
                  <div className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap">Empowering your digital transformation</div>
                  <p className="rt-color-pale-periwinkle rt-gap-off" style={{ marginBottom: '1rem' }}>Our mission is to bridge the gap between complex business challenges and intuitive digital solutions. We strive to provide Ahmedabad and the world with top-tier IT services.</p>
                  <p className="rt-color-pale-periwinkle rt-gap-off" style={{ marginBottom: '1rem' }}>We focus on delivering high-quality, scalable web and mobile applications that drive real growth, prioritizing clean code, user-centric design, and measurable results.</p>
                 {/*  <p className="rt-color-pale-periwinkle rt-gap-off">By partnering closely with our clients, we ensure every project isn't just delivered on time, but actually transforms the way they do business.</p>
                  */}
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '1rem', lineHeight: '1.6' }}>
                    <li className="rt-color-pale-periwinkle">Delivering user-centric software solutions</li>
                    <li className="rt-color-pale-periwinkle">Maintaining 100% transparency in our processes</li>
                    <li className="rt-color-pale-periwinkle">Driving measurable, long-term business growth</li>
                  </ul>
                </div>
                <div style={{ transform: 'scale(0.65)', transformOrigin: 'bottom center', marginTop: '-8rem' }}>
                  <div data-w-id="62508c73-e31b-0068-13cd-79c365633cb0" className="rt-features-v1-inner-image">
                    <Image src={`${A}/690c408d17e948acfd9dd61a_taskopia-%20about-features-1.webp`} loading="lazy" alt="about-features-1"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    <div className="rt-features-v1-inner-image-over">
                      <div data-w-id="bcfd77a1-c414-9dba-e50b-0935c10eca41" className="rt-features-v1-inner-image-inner">
                        <Image src={`${A}/690c411f1386eb9e04e8adb7_Mask%20group%20(9).webp`} loading="lazy" alt="line-animation" className="rt-image-min-width"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 — Collaboration */}
              <div data-w-id="56f1b25a-061c-3e82-d0b8-df0f60b657fd" className="rt-features-v1-left rt-border-radius-l rt-right">
                <div className="rt-features-v1-inner-heading">
                  <div className="rt-small-sub-gap"><div className="rt-sub-text rt-sub-small">OUR VISION</div></div>
                  <div className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap">Shaping the future of technology</div>
                  <p className="rt-color-pale-periwinkle rt-gap-off" style={{ marginBottom: '1rem' }}>We envision a future where businesses of all sizes have access to enterprise-grade technology without the overwhelming complexity or hidden costs.</p>
               
                  <p className="rt-color-pale-periwinkle rt-gap-off" style={{ marginBottom: '1rem' }}>Tryangletech aims to be the leading IT partner recognized for innovation, transparency, and an unwavering commitment to our clients' long-term success.</p>
                  {/*   <p className="rt-color-pale-periwinkle rt-gap-off">We don't just want to build software; we want to build lasting digital ecosystems that empower our partners to thrive in an ever-evolving digital landscape.</p>
                  */}
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '1rem', lineHeight: '1.6' }}>
                    <li className="rt-color-pale-periwinkle">Pioneering innovative digital ecosystems</li>
                    <li className="rt-color-pale-periwinkle">Democratizing enterprise-grade technologies</li>
                    <li className="rt-color-pale-periwinkle">Fostering lasting partnerships built on trust</li>
                  </ul>
                </div>
                <div style={{ transform: 'scale(0.65)', transformOrigin: 'bottom center', marginTop: '-10rem' }}>
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
          </div>
        </section>
    </>
  );
}
