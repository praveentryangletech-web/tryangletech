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
                        Apps built for businesses of all sizes
                      </h2>
                    </div>
                    <p
                      data-w-id="b0ab4ba8-5be6-3c27-98c6-724a3e3820db"
                      className="rt-gap-off rt-color-pale-periwinkle">
                      We build mobile apps designed specifically for your business so they work well and give your users a great experience.
                    </p>
                  </div>
                  <div
                    data-w-id="ff7f24cb-57e0-c93d-b0a4-9eba6d3e1a72"
                    className="rt-about-v1-right-line rt-why-choose-v1-line"></div>
                  <div className="rt-our-service-right-inner">
                    <div data-w-id="ecf91cbc-a037-faed-e91f-a12afbd7b4dd">
                      <Image
                        src="/service-3-assets/6916b330bfe76dda628cf5ac_specialiti-icon-1.svg"
                        loading="lazy"
                        alt="specialiti-icon-1"
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-our-service-right-icon">
                      <div
                        data-w-id="51e73edd-cd94-a54d-7eed-7768bb6cc864"
                        className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap">
                        iPhone and Android Apps
                      </div>
                      <p
                        data-w-id="15cfac48-955b-b56a-6e2a-fa56be3f619c"
                        className="rt-gap-off rt-color-pale-periwinkle">
                        We can build your app so it works perfectly on every type of phone your customers use.
                      </p>
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
