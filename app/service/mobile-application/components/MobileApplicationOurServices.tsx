'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const SA = '/service3-assets';

export default function MobileApplicationOurServices() {
  return (
    <>
      <section className="rt-our-services-v1">
          <div className="rt-our-service-bg rt-overflow-hidden">
            <div className="w-layout-blockcontainer rt-container-main w-container">
              <div className="rt-our-service-main">
                <div className="rt-our-service-left rt-border-radius-l">
                  <div
                    data-w-id="4528b803-2d5d-5c7d-d6ff-d1755664fb4c"
                    className="rt-text-style-h6 rt-text-color-white">
                    Mobile app portfolio
                  </div>
                  <div
                    data-w-id="ff0184b4-6762-c757-cca5-2cc31e232758"
                    className="rt-our-service-left-image-one">
                    <Image
                      src="/service-3-assets/690843d741469dfe6381c86e_taskopia-service-one-our-image.webp"
                      loading="lazy"
                      alt="taskopia-service-one-our-image"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="w-layout-vflex rt-choose-us-marquee-main">
                    <div
                      data-w-id="ed4ebf30-cbfb-5c24-fd0e-9bd7078cfb64"
                      className="rt-choose-us-marquee rt-overflow-hidden">
                      <div className="rt-marquee-item">
                        <Image
                          alt="taskopia-service-one-our-image-two"
                          src="/service-3-assets/690843d6663a57301c359099_taskopia-service-one-our-image-two.webp"
                          loading="lazy"
                         width={800} height={800} style={{ width: "100%", height: "auto" }} />
                      </div>
                      <div className="rt-marquee-item">
                        <Image
                          alt="taskopia-service-one-our-image-two"
                          src="/service-3-assets/690843d6663a57301c359099_taskopia-service-one-our-image-two.webp"
                          loading="lazy"
                         width={800} height={800} style={{ width: "100%", height: "auto" }} />
                      </div>
                      <div className="rt-marquee-item">
                        <Image
                          alt="taskopia-service-one-our-image-two"
                          src="/service-3-assets/690843d6663a57301c359099_taskopia-service-one-our-image-two.webp"
                          loading="lazy"
                         width={800} height={800} style={{ width: "100%", height: "auto" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rt-our-service-right">
                  <div>
                    <div className="rt-sub-gap">
                      <div
                        data-w-id="46267b11-3534-1c87-dbbb-42e400ef381e"
                        className="rt-sub-text">
                        why choose us
                      </div>
                    </div>
                    <div className="rt-heading-para-gap">
                      <h2
                        data-w-id="0874d457-f036-2926-f3c8-80010962016e"
                        className="rt-gap-off rt-text-color-white">
                        Scalable apps built for high-growth businesses
                      </h2>
                    </div>
                    <p
                      data-w-id="b0ab4ba8-5be6-3c27-98c6-724a3e3820db"
                      className="rt-gap-off rt-color-pale-periwinkle">
                      We engineer high-performance mobile applications tailored to your business logic, ensuring flawless user experiences and long-term scalability.
                    </p>
                  </div>
                  <div
                    data-w-id="ff7f24cb-57e0-c93d-b0a4-9eba6d3e1a72"
                    className="rt-about-v1-right-line rt-why-choose-v1-line"></div>
                  <div className="rt-our-service-right-inner">
                    <div style={{ display: "flex", flexDirection: "row", gap: "24px", alignItems: "flex-start" }}>
                      {/* iOS Block */}
                      <div style={{ flex: 1 }}>
                        <div data-w-id="ecf91cbc-a037-faed-e91f-a12afbd7b4dd" style={{ marginBottom: "16px" }}>
                          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#F85936" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                            <path d="M10 2c1 .5 2 2 2 5" />
                          </svg>
                        </div>
                        <div className="rt-our-service-right-icon">
                          <div
                            data-w-id="51e73edd-cd94-a54d-7eed-7768bb6cc864"
                            className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap" style={{ fontSize: "18px" }}>
                            Native iOS
                          </div>
                          <p
                            data-w-id="15cfac48-955b-b56a-6e2a-fa56be3f619c"
                            className="rt-gap-off rt-color-pale-periwinkle" style={{ fontSize: "14px" }}>
                            High-performance Apple applications built with Swift.
                          </p>
                        </div>
                      </div>

                      {/* Android Block */}
                      <div style={{ flex: 1 }}>
                        <div data-w-id="ecf91cbc-a037-faed-e91f-a12afbd7b4dd" style={{ marginBottom: "16px" }}>
                          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#F85936" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 11.5A6.5 6.5 0 0 0 6 11.5v2h12v-2Z" />
                            <rect x="6" y="13.5" width="12" height="6" />
                            <path d="M8 11.5L7 9" />
                            <path d="M16 11.5L17 9" />
                            <path d="M6 15H4v-2h2" />
                            <path d="M18 15h2v-2h-2" />
                            <path d="M9 19.5v2h2v-2" />
                            <path d="M13 19.5v2h2v-2" />
                          </svg>
                        </div>
                        <div className="rt-our-service-right-icon">
                          <div
                            data-w-id="51e73edd-cd94-a54d-7eed-7768bb6cc864"
                            className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap" style={{ fontSize: "18px" }}>
                            Native Android
                          </div>
                          <p
                            data-w-id="15cfac48-955b-b56a-6e2a-fa56be3f619c"
                            className="rt-gap-off rt-color-pale-periwinkle" style={{ fontSize: "14px" }}>
                            Scalable Google applications tailored for Android.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      data-w-id="33b12b78-8729-722c-56a6-c9b1a508f1b5"
                      className="rt-button-para-gap">
                      <Link
                        data-wf--rt-white-button--variant="base"
                        data-w-id="0405d357-f0f5-aac8-4042-22ceb6fb3cbf"
                        href="/portfolio"
                        className="rt-button-body rt-bg-color w-inline-block">
                        <div className="rt-button-text rt-btn-color">
                          Explore our portfolio
                        </div>
                        <div className="rt-button-body-overlay rt-color-blue rt-color-change"></div>
                      </Link>
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
