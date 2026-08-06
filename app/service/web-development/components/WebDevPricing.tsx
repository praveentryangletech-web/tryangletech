'use client';
import Link from "next/link";

import React, { useState } from 'react';

import Image from "next/image";

const SA = '/service3-assets';

export default function WebDevPricing() {
  return (
    <>
      <section className="rt-services-v3 rt-position-relative">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-method-main">
              <div
                data-current="Tab 1"
                data-easing="ease"
                data-duration-in="300"
                data-duration-out="100"
                className="rt-service-tab w-tabs">
                <div className="rt-method-menu w-tab-menu" role="tablist">
                  <Link
                    data-w-tab="Tab 1"
                    data-w-id="ba8dfab3-890a-365d-c624-bffed8cf0c87"
                    className="rt-tab-menu-link rt-position-relative w-inline-block w-tab-link w--current"
                    id="w-tabs-0-data-w-tab-0"
                    href="/service-one#w-tabs-0-data-w-pane-0"
                    role="tab"
                    aria-controls="w-tabs-0-data-w-pane-0"
                    aria-selected="true">
                    <div className="rt-tab-bottom-line rt-1"></div>
                    <div className="rt-color-vivid-blue">01</div>
                    <div className="rt-text-style-h6">
                      Custom Web Solutions
                    </div>
                    <div className="rt-service-v3-samll-para rt-overflow-hidden rt-1">
                      <p className="rt-gap-off">
                        We build tailored web applications and websites that perfectly align with your business goals.
                      </p>
                    </div>
                  </Link>
                  <Link
                    data-w-tab="Tab 2"
                    data-w-id="ba8dfab3-890a-365d-c624-bffed8cf0c8b"
                    className="rt-tab-menu-link rt-position-relative w-inline-block w-tab-link"
                    tabIndex={-1}
                    id="w-tabs-0-data-w-tab-1"
                    href="/service-one#w-tabs-0-data-w-pane-1"
                    role="tab"
                    aria-controls="w-tabs-0-data-w-pane-1"
                    aria-selected="false">
                    <div className="rt-tab-bottom-line rt-2"></div>
                    <div className="rt-color-vivid-blue">02</div>
                    <div className="rt-text-style-h6">
                      Responsive &amp; Scalable
                    </div>
                    <div className="rt-service-v3-samll-para rt-overflow-hidden rt-2">
                      <p className="rt-gap-off">
                        Ensure your platform looks great on any device and scales effortlessly as your traffic grows.
                      </p>
                    </div>
                  </Link>
                  <Link
                    data-w-tab="Tab 3"
                    data-w-id="ba8dfab3-890a-365d-c624-bffed8cf0c8f"
                    className="rt-tab-menu-link rt-position-relative w-inline-block w-tab-link"
                    tabIndex={-1}
                    id="w-tabs-0-data-w-tab-2"
                    href="/service-one#w-tabs-0-data-w-pane-2"
                    role="tab"
                    aria-controls="w-tabs-0-data-w-pane-2"
                    aria-selected="false">
                    <div className="rt-tab-bottom-line rt-3"></div>
                    <div className="rt-color-vivid-blue">03</div>
                    <div className="rt-text-style-h6">
                      High Performance &amp; Security
                    </div>
                    <div className="rt-service-v3-samll-para rt-overflow-hidden rt-3">
                      <p className="rt-gap-off">
                        Our web solutions are optimized for lightning-fast speeds and secured with robust protocols.
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="rt-tab-main-content w-tab-content">
                  <div
                    data-w-tab="Tab 1"
                    className="w-tab-pane w--tab-active"
                    id="w-tabs-0-data-w-pane-0"
                    role="tabpanel"
                    aria-labelledby="w-tabs-0-data-w-tab-0">
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
                          Our web development services help you establish a strong online presence, engage your audience, and drive conversions effortlessly. Stay ahead with modern tech stacks, custom integrations, and seamless user experiences.
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
                  <div
                    data-w-tab="Tab 2"
                    className="w-tab-pane"
                    id="w-tabs-0-data-w-pane-1"
                    role="tabpanel"
                    aria-labelledby="w-tabs-0-data-w-tab-1">
                    <div className="rt-services-v3-main">
                      <div className="rt-services-v3-left">
                        <div className="rt-sub-gap">
                          <div className="rt-sub-text rt-sub-gredient">
                            our services
                          </div>
                        </div>
                        <div className="rt-heading-para-gap">
                          <h2 className="rt-gap-off">
                            Modern web development for your digital growth
                          </h2>
                        </div>
                        <p className="rt-gap-off rt-services-v3-para">
                          Our web development services help you establish a strong online presence, engage your audience, and drive conversions effortlessly. Stay ahead with modern tech stacks, custom integrations, and seamless user experiences.
                        </p>
                        <div className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                          <Link
                            data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                            href="/contact"
                            className="rt-button-body w-inline-block">
                            <div className="rt-button-text">
                              Start free trial
                            </div>
                            <div className="rt-button-body-overlay"></div>
                          </Link>
                        </div>
                      </div>
                      <div className="rt-services-v3-right">
                        <div className="rt-services-v3-right-one rt-shadow">
                          <Image
                            alt="taskopia-service-two-smart-1"
                            src="/service-1-assets/69147a46b87412da5367dbc0_taskopia-service-two-smart-1.webp"
                            loading="lazy"
                           width={800} height={800} style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="rt-services-v3-right-two">
                          <Image
                            alt="taskopia-service-two-smarter-2"
                            src="/service-1-assets/6909f9d9332080fa830347e9_taskopia-service-two-smarter-2.webp"
                            loading="lazy"
                           width={800} height={800} style={{ width: "100%", height: "auto" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-tab="Tab 3"
                    className="w-tab-pane"
                    id="w-tabs-0-data-w-pane-2"
                    role="tabpanel"
                    aria-labelledby="w-tabs-0-data-w-tab-2">
                    <div className="rt-services-v3-main">
                      <div className="rt-services-v3-left">
                        <div className="rt-sub-gap">
                          <div className="rt-sub-text rt-sub-gredient">
                            our services
                          </div>
                        </div>
                        <div className="rt-heading-para-gap">
                          <h2 className="rt-gap-off">
                            Modern web development for your digital growth
                          </h2>
                        </div>
                        <p className="rt-gap-off rt-services-v3-para">
                          Our web development services help you establish a strong online presence, engage your audience, and drive conversions effortlessly. Stay ahead with modern tech stacks, custom integrations, and seamless user experiences.
                        </p>
                        <div className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                          <Link
                            data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                            href="/contact"
                            className="rt-button-body w-inline-block">
                            <div className="rt-button-text">
                              Start free trial
                            </div>
                            <div className="rt-button-body-overlay"></div>
                          </Link>
                        </div>
                      </div>
                      <div className="rt-services-v3-right">
                        <div className="rt-services-v3-right-one rt-shadow">
                          <Image
                            alt="taskopia-service-two-smart-2"
                            src="/service-1-assets/69147a46eac3a081312c6df0_taskopia-service-two-smart-2.webp"
                            loading="lazy"
                           width={800} height={800} style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="rt-services-v3-right-two">
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
