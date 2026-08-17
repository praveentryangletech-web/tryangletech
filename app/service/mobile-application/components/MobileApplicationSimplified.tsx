'use client';

import React, { useState } from 'react';
import Image from "next/image";
import ScrollTextReveal from '../../../common/ScrollTextReveal';

const SA = '/service3-assets';

export default function MobileApplicationSimplified() {
  return (
    <>
      <section className="rt-simplified" style={{ paddingBottom: "3.5rem" }}>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-simplified-top rt-desktop-text-center rt-heading-bottom-gap">
              <div
                data-w-id="d32a2ace-49d2-24b0-6caf-89ca61419702"
                className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">
                  development process
                </div>
              </div>
              <ScrollTextReveal
                text="How we build your mobile app from start to finish"
                align="center"
              />
            </div>
            <div className="w-layout-grid rt-simplified-wrapper">
              <div
                data-w-id="06b87898-4f2c-d6fb-f75a-492f3e7822fe"
                className="w-layout-vflex rt-simplified-card">
                <div className="rt-simplified-card-top-part rt-border-radius-medium rt-shadow">
                  <Image
                    className="rt-image-scale"
                    src="/service-3-assets/69086c48e8613e3b874ea6f9_taskopia-service-three-image-simplified.webp"
                    width={370}
                    height={209}
                    alt="taskopia-service-three-image-simplified"
                    data-w-id="06b87898-4f2c-d6fb-f75a-492f3e782300"
                    loading="lazy"
                   />
                </div>
                <div className="w-layout-vflex rt-simplified-card-bottom-part">
                  <div className="rt-text-style-h6">
                    Intuitive UX/UI Design
                  </div>
                  <p className="rt-gap-off">
                    We craft human-centric, aesthetically stunning mobile interfaces that keep users engaged and delighted.
                  </p>
                </div>
              </div>
              <div
                data-w-id="210cc947-d79f-f5d0-ef5e-ac7987d3db20"
                className="w-layout-vflex rt-simplified-card">
                <div className="rt-simplified-card-top-part rt-border-radius-medium rt-shadow">
                  <Image
                    className="rt-image-scale"
                    src="/service-3-assets/69086d605e01e0ce0ecb4b9f_taskopia-service-three-image-simplified-8.webp"
                    width={370}
                    height={209}
                    alt="taskopia-service-three-image-simplified-8"
                    data-w-id="210cc947-d79f-f5d0-ef5e-ac7987d3db22"
                    loading="lazy"
                   />
                  <div
                    data-w-id="35a3418c-007f-e286-2fac-1448d7ccf163"
                    className="rt-simplified-card-top-innar">
                    <Image
                      src="/service-3-assets/69086dd1a451e7aadfd1b02b_Mask group (5).webp"
                      loading="lazy"
                      data-w-id="bf832279-7882-71e9-77f0-dfcaa36b2a14"
                      alt="Mask group (5)"
                      className="rt-image-scale"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div className="w-layout-vflex rt-simplified-card-bottom-part rt-3">
                  <div className="rt-text-style-h6">
                    Transparent Communication
                  </div>
                  <p className="rt-gap-off">
                    Direct access to your dedicated engineering team with regular milestone updates and on-time delivery.
                  </p>
                </div>
              </div>
              <div
                data-w-id="210cc947-d79f-f5d0-ef5e-ac7987d3dad5"
                className="w-layout-vflex rt-simplified-card">
                <div className="rt-simplified-card-top-part rt-border-radius-medium rt-shadow">
                  <Image
                    src="/service-3-assets/69086a437e0f8dd43b0a2a94_taskopia-service-three-image-simplified-6.webp"
                    loading="lazy"
                    data-w-id="31f55def-c002-725b-ac24-4fb3c902009b"
                    alt="taskopia-service-three-image-simplified-6"
                    className="rt-image-scale"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="w-layout-vflex rt-simplified-card-bottom-part rt-2">
                  <div className="rt-text-style-h6">
                    Robust Architecture &amp; Security
                  </div>
                  <p className="rt-gap-off">
                    Engineered with scalable backend pipelines, encrypted databases, and rock-solid codebases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
