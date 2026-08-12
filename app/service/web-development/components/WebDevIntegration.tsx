'use client';

import React, { useState } from 'react';

import Image from "next/image";

const SA = '/service3-assets';

export default function WebDevIntegration() {
  return (
    <>
      <section className="rt-feaures-v3" style={{paddingBottom : 0}}>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-heading-bottom-gap">
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">capabilities</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Everything we handle when we build your website
              </h2>
            </div>
            <div
              data-w-id="39796240-811f-2c26-9bfd-5147a107259b"
              className="rt-feaures-v3-wrapper">
              <div className="w-layout-vflex rt-benefits-v3-card one">
                <div className="rt-benefits-icon">
                  <Image
                    width={38}
                    height={38}
                    alt="databaseicon-1"
                    src="/service-1-assets/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg"
                    loading="lazy"
                   />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">
                    Frontend Development
                  </div>
                  <p className="rt-gap-off">
                     We build the part of your website that people see and interact with, making it smooth and easy to use.
                  </p>
                </div>
              </div>
              <div className="w-layout-vflex rt-benefits-v3-card two">
                <div className="rt-benefits-icon">
                  <Image
                    width={38}
                    height={38}
                    alt=""
                    src="/service-1-assets/6916ec635353353be914aafc_Vector (32).svg"
                    loading="lazy"
                   />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">
                    Backend Architecture
                  </div>
                  <p className="rt-gap-off">
                     We build the server side of your website so data is stored, processed, and delivered the right way.
                  </p>
                </div>
              </div>
              <div className="w-layout-vflex rt-benefits-v3-card three">
                <div className="rt-benefits-icon">
                  <Image
                    width={38}
                    height={38}
                    alt=""
                    src="/service-1-assets/6916ec6339f890a80905a69b_Vector (33).svg"
                    loading="lazy"
                   />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">Database Design</div>
                  <p className="rt-gap-off">
                    We organize your website data so it stays secure and is always easy to find.
                  </p>
                </div>
              </div>
              <div
                id="w-node-a0cae04c-8306-b7a7-0e60-094cf24d2c51-cd6c3914"
                className="w-layout-vflex rt-benefits-v3-card four">
                <div className="rt-benefits-icon">
                  <Image
                    width={38}
                    height={38}
                    alt=""
                    src="/service-1-assets/690c7b2508ab483ef4047387_Vector (28).svg"
                    loading="lazy"
                   />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">E-commerce Solutions</div>
                   <p className="rt-gap-off">
                     We build WooCommerce and custom online stores that make it easy to sell products, manage orders, and grow without extra hassle.
                   </p>
                </div>
              </div>
              <div className="w-layout-vflex rt-benefits-v3-card five">
                <div className="rt-benefits-icon">
                  <Image
                    width={38}
                    height={38}
                    alt=""
                    src="/service-1-assets/6916ef876682eed2b2fd5911_Vector (34).svg"
                    loading="lazy"
                   />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">API Integrations</div>
                  <p className="rt-gap-off">
                    We link your website to other apps and tools to help your business run more smoothly.
                  </p>
                </div>
              </div>
              <div className="w-layout-vflex rt-benefits-v3-card six">
                <div className="rt-benefits-icon">
                  <Image
                    width={38}
                    height={38}
                    alt=""
                    src="/service-1-assets/6916f00db3051e5aed09bd3f_Group 2085663576.svg"
                    loading="lazy"
                    className="rt-width-auto"
                   />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">
                    Performance Tuning
                  </div>
                  <p className="rt-gap-off">
                     We make sure your website loads quickly so your visitors do not have to wait.
                  </p>
                </div>
              </div>
              <div className="rt-benefits-dot rt-tab-display-none">
                <div className="rt-box-1 one"></div>
                <div className="rt-box-1"></div>
                <div className="rt-box-1"></div>
                <div className="rt-box-1 two"></div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
