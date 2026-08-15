'use client';

import React, { useState } from 'react';

import Image from "next/image";

const SA = '/service3-assets';

export default function ServiceOneIntegration() {
  return (
    <>
      <section className="rt-feaures-v3" style={{paddingBottom : 0}}>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-heading-bottom-gap">
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">integration</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Streamline workflows, save time, enhance performance
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
                    Real-time progress tracking
                  </div>
                  <p className="rt-gap-off">
                    Monitor task status, deadlines, and team performance
                    instantly.
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
                    Automated task reminders
                  </div>
                  <p className="rt-gap-off">
                    Never miss deadlines with smart alerts and notifications.
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
                  <div className="rt-text-style-h6">Cross-platform access</div>
                  <p className="rt-gap-off">
                    Manage tasks anytime from desktop, mobile, or tablet.
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
                  <div className="rt-text-style-h6">Data-driven insights</div>
                  <p className="rt-gap-off">
                    Get detailed reports and analytics to improve productivity.
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
                  <div className="rt-text-style-h6">Customizable workflows</div>
                  <p className="rt-gap-off">
                    Adapt workflows to match project needs and team style.
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
                    Seamless team collaboration
                  </div>
                  <p className="rt-gap-off">
                    Share files, assign roles, and communicate within tasks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
