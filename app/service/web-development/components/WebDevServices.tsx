'use client';
import Link from "next/link";

import React, { useState } from 'react';

import Image from "next/image";

const SA = '/service3-assets';

export default function WebDevServices() {
  return (
    <>
      <section className="rt-why-choose-v2 rt-position-relative">
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-why-choose-v2-contanner">
              <div className="rt-why-choose-v2-container">
                <div className="rt-why-choose-v2-left">
                  <div data-w-id="a157f48e-ba73-8122-adde-8033c6a3150f">
                    <Image
                      src="/service-1-assets/690b2a90bfbee5f2f093be43_Group 2147225571.webp"
                      loading="lazy"
                      alt="taskopia-sarvise-v1-real-time"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-why-choose-v2-left-img-wrap">
                    <div
                      data-w-id="4b26b30d-7856-b7b9-e78d-9d12b65b48f7"
                      className="rt-why-choose-v2-left-img-one">
                      <Image
                        src="/service-1-assets/690b2a4b5a7c4a8e93179bfa_taskopia-service-one-choose-two.webp"
                        loading="lazy"
                        alt="taskopia-service-one-choose-two"
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div
                      data-w-id="d54bbf07-7adf-ef17-cba9-4c8591822d3c"
                      className="rt-why-choose-v2-left-img-two">
                      <Image
                        src="/service-1-assets/690b2a4bb24f0436882287df_taskopia-service-one-choose-one.webp"
                        loading="lazy"
                        alt="taskopia-service-one-choose-one"
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                  </div>
                </div>
                <div className="rt-why-choose-v2-right">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="f811abe4-4f70-55fe-7128-7a1d75f4745a"
                      className="rt-sub-text">
                      why choose us
                    </div>
                  </div>
                  <div className="rt-heading-para-gap rt-why-choose-v2-heading">
                    <h2
                      data-w-id="f811abe4-4f70-55fe-7128-7a1d75f4745c"
                      className="rt-gap-off rt-text-color-white">
                      We build websites that help your business grow online and make a real impression on your visitors
                    </h2>
                  </div>
                  <div
                    data-w-id="f811abe4-4f70-55fe-7128-7a1d75f47460"
                    className="rt-goal-para-wrap">
                    <p className="rt-gap-off rt-color-pale-periwinkle">
                      Good web development is not just about looks. It is about making sure your website works well, loads fast, and actually helps people find you and contact you.
                    </p>
                  </div>
                  <div className="w-layout-vflex rt-goal-box-main rt-gap-medium">
                    <div
                      data-w-id="f811abe4-4f70-55fe-7128-7a1d75f47464"
                      className="w-layout-hflex rt-goal-box-wrap rt-bottom-padding">
                      <div className="rt-goal-icon">
                        <Image
                          width={35}
                          height={37}
                          alt="
specialiti-icon-3
"
                          src="/service-1-assets/6916b3308963a64636496151_specialiti-icon-3.svg"
                          loading="lazy"
                          className="rt-height-auto"
                         />
                      </div>
                      <div className="w-layout-vflex rt-goal-box-text-wrap">
                        <div className="rt-text-style-h6 rt-text-color-white">
                          Custom Development
                        </div>
                        <p className="rt-gap-off rt-color-pale-periwinkle">
                           We handle everything from small business sites to large web platforms. Every project is built specifically for how you work.
                        </p>
                      </div>
                    </div>
                    <div
                      data-w-id="f811abe4-4f70-55fe-7128-7a1d75f4746c"
                      className="w-layout-hflex rt-goal-box-wrap">
                      <div className="rt-goal-icon">
                        <Image
                          width={35}
                          height={37}
                          alt="specialiti-icon-1"
                          src="/service-1-assets/6916b330bfe76dda628cf5ac_specialiti-icon-1.svg"
                          loading="lazy"
                          className="rt-height-auto"
                         />
                      </div>
                      <div className="w-layout-vflex rt-goal-box-text-wrap">
                        <div className="rt-text-style-h6 rt-text-color-white">
                          Ongoing Support
                        </div>
                        <p className="rt-gap-off rt-color-pale-periwinkle">
                           We do not disappear after launch. We keep your site updated, secure, and running well so you can focus on your business.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-id="f811abe4-4f70-55fe-7128-7a1d75f47474"
                    className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                    <Link
                      data-wf--rt-white-button--variant="base"
                      data-w-id="0405d357-f0f5-aac8-4042-22ceb6fb3cbf"
                      href="/portfolio"
                      className="rt-button-body rt-bg-color w-inline-block">
                      <div className="rt-button-text rt-btn-color">
                        View Our Work
                      </div>
                      <div className="rt-button-body-overlay rt-color-blue rt-color-change"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
