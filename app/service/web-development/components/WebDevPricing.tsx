'use client';
import Link from "next/link";

import React, { useState } from 'react';

import Image from "next/image";

const SA = '/service3-assets';

export default function WebDevPricing() {
  return (
    <>
      <style>{`
        .rt-service-v3-samll-para {
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
          opacity: 1 !important;
        }
      `}</style>
      <section className="rt-services-v3 rt-position-relative">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-method-main">
              <div className="rt-service-tab">
                <div className="rt-tab-main-content">
                  <div className="w-tab-pane w--tab-active">
                    <div className="rt-services-v3-main">
                      <div className="rt-services-v3-left">
                        <div
                          data-w-id="3662b99c-c917-15b5-2038-aa05d7432b36"
                          className="rt-sub-gap">
                          <div className="rt-sub-text rt-sub-gredient">
                            our services
                          </div>
                        </div>
                        <div className="rt-heading-para-gap">
                          <h2
                            data-w-id="3662b99c-c917-15b5-2038-aa05d7432b3a"
                            className="rt-gap-off">
                            Modern web development for your digital growth
                          </h2>
                        </div>
                        <p
                          data-w-id="3662b99c-c917-15b5-2038-aa05d7432b3c"
                          className="rt-gap-off rt-services-v3-para">
                          Our web development services help you establish a strong online presence, engage your audience, and drive conversions effortlessly. Whether it's a custom-built platform, a WordPress site, or an online store, we combine modern tech stacks, custom integrations, and clean design to build something that actually works for your business - not just something that looks good in a demo. We've delivered 350+ web projects for businesses across Ahmedabad and beyond, and every one comes with support after launch, not just a handover.
                        </p>
                        <div
                          data-w-id="3662b99c-c917-15b5-2038-aa05d7432b3e"
                          className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                          <Link
                            data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                            href="/contact"
                            className="rt-button-body w-inline-block">
                            <div className="rt-button-text">
                              Contact us today
                            </div>
                            <div className="rt-button-body-overlay"></div>
                          </Link>
                        </div>
                        <div style={{ display: 'flex', gap: '28px', marginTop: '24px', flexWrap: 'wrap' }}>
                          {[
                            { value: '350+', label: 'Projects delivered' },
                            { value: '7+', label: 'Years experience' },
                            { value: '100%', label: 'Support after launch' },
                          ].map((stat) => (
                            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontSize: '22px', fontWeight: 700, color: '#1833fe', lineHeight: 1.1 }}>{stat.value}</span>
                              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rt-services-v3-right rt-overflow-hidden">
                        <div
                          data-w-id="3662b99c-c917-15b5-2038-aa05d7432b42"
                          className="rt-services-v3-right-one rt-shadow">
                          <Image
                            alt="taskopia-service-two-smarter"
                            src="/service-1-assets/6909f9d928bb4346dc5c9aea_taskopia-service-two-smarter.webp"
                            loading="lazy"
                           width={800} height={800} style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div
                          data-w-id="3662b99c-c917-15b5-2038-aa05d7432b44"
                          className="rt-services-v3-right-two">
                          <Image
                            alt="taskopia-service-two-smarter-2"
                            src="/service-1-assets/6909f9d9332080fa830347e9_taskopia-service-two-smarter-2.webp"
                            loading="lazy"
                           width={800} height={800} style={{ width: "100%", height: "auto" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            data-w-id="ec94592a-1f27-fd64-862e-cc1d436d9e6d"
            className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
            <div className="rt-section-overlay"></div>
          </div>
        </section>
    </>
  );
}
