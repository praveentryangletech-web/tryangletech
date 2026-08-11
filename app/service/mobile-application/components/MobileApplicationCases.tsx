'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const SA = '/service3-assets';

export default function MobileApplicationCases() {
  return (
    <>
      <section className="rt-cases">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="w-layout-hflex rt-cases-main">
              <div className="w-layout-vflex rt-cases-right-part">
                <div className="w-layout-vflex rt-cases-heading-wrap rt-overflow-hidden">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401e1"
                      className="rt-sub-text rt-sub-gredient">
                      why choose us
                    </div>
                  </div>
                  <div className="rt-heading-para-gap">
                    <h2
                      data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401e3"
                      className="rt-gap-off">
                      Fast apps delivered with{" "}
                      <span className="rt-color-periwinkle-gray">
                        zero stress
                      </span>
                    </h2>
                  </div>
                  <div
                    data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401e7"
                    className="rt-cases-para-wrap rt-gap-large">
                    <p className="rt-gap-off">
                      Our team works hard to save you time and build a great app without any technical problems getting in the way.
                    </p>
                  </div>
                  <div
                    data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401ea"
                    className="rt-button-para-gap">
                      <Link
                      data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                      href="/contact"
                      className="rt-button-body w-inline-block">
                      <div className="rt-button-text">Explore benefits</div>
                      <div className="rt-button-body-overlay"></div>
                    </Link>
                  </div>
                </div>
                <div
                  data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401f0"
                  className="w-layout-grid rt-cases-box-main rt-position-relative">
                  <div
                    id="w-node-cd8e4bfe-5169-9342-1cbb-40d6510401f1-0687f4f0"
                    data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401f1"
                    className="w-layout-vflex rt-cases-box-wrap">
                    <div>
                      <Image
                        src="/service-3-assets/6916ef876682eed2b2fd5911_Vector (34).svg"
                        loading="lazy"
                        alt=""
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="w-layout-vflex rt-cases-box-text-wrap">
                      <div className="rt-text-style-h6">
                        Fast and smooth
                      </div>
                      <p className="rt-gap-off">
                        Your app will load quickly and run without crashing so your users stay happy.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401f8"
                    className="w-layout-vflex rt-cases-box-wrap rt-left-padding">
                    <div>
                      <Image
                        src="/service-3-assets/6916f00db3051e5aed09bd3f_Group 2085663576.svg"
                        loading="lazy"
                        alt=""
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="w-layout-vflex rt-cases-box-text-wrap rt-full-width">
                      <div className="rt-text-style-h6">
                        Works with your tools
                      </div>
                      <p className="rt-gap-off">
                        We easily connect your new app to the systems and databases you already use.
                      </p>
                    </div>
                  </div>
                  <div className="rt-cades-absolute-line"></div>
                </div>
              </div>
              <div
                data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401d6"
                className="rt-cases-left-part">
                <div
                  data-w-id="8503912d-a933-f4c4-ce1c-498a3e0e7655"
                  className="rt-cases-left-main">
                  <Image
                    src="/service-3-assets/6904b11c6b4ad8773a03a11c_taskopia-service-three-why-choose (1).png"
                    loading="lazy"
                    alt="taskopia-service-three-why-choose (1)"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-cases-v2-left-overlay">
                  <Image
                    src="/service-3-assets/6904b11c9c86bd80ff185a4b_Mask group (4).png"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div
                  data-w-id="004aed41-8599-003c-e25f-67cb5124ad03"
                  className="rt-cases-left-overlay-2">
                  <Image
                    src="/service-3-assets/6904b2880d8bf1cf10e7ab48_taskopia-service-three-why-choose-two.png"
                    loading="lazy"
                    alt="taskopia-service-three-why-choose-two"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div
                  data-w-id="b39041d9-95f1-3e94-cc77-0b326d8cf6d8"
                  className="rt-small-btn-main rt-cases-small">
                  <Image
                    src="/service-3-assets/69087acd988708b2bfcb37de_Group 2085662995.webp"
                    loading="lazy"
                    alt=" taskopia-workflow"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
