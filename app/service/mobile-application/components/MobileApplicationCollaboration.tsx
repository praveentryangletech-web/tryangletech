'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const SA = '/service3-assets';

export default function MobileApplicationCollaboration() {
  return (
    <>
      <section className="rt-collaboration-v1 rt-top-gap rt-position-relative">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-collaboration-v1-main">
              <div className="rt-collaboration-v1-right rt-service-v1">
                <div className="rt-collaboration-v1-right-top rt-service-v1">
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289d6"
                    className="rt-collaboration-v1-right-two">
                    <Image
                      src="/service-3-assets/68f21b3af8e5e0af23ce678d_taskopia-Collaboration-two.webp"
                      loading="lazy"
                      alt="taskopia-Collaboration-two"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289d8"
                    className="rt-collaboration-v1-right-one rt-overflow-hidden rt-shadow">
                    <Image
                      src="/service-3-assets/690462c104fe7d75a4299d62_Taskopia-service-three-happy.png"
                      loading="lazy"
                      alt="Taskopia-service-three-happy"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289da"
                  className="rt-collaboration-v1-right-bottom rt-service-v1 rt-shadow rt-overflow-hidden">
                  <Image
                    src="/service-3-assets/690462025b3a67e962bf187e_Taskopia-service-happy-two.png"
                    loading="lazy"
                    width={466}
                    alt="
Taskopia-service-happy-two
"
                   height={800} />
                </div>
                <div className="rt-collaboration-v1-right-bg rt-service-v1"></div>
              </div>
              <div className="rt-collaboration-left">
                <div
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289de"
                  className="rt-sub-gap">
                  <div className="rt-sub-text rt-sub-gredient">
                    Development Partnership
                  </div>
                </div>
                <div
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289e1"
                  className="rt-heading-para-gap">
                  <h2 className="rt-gap-off">
                    One team to build and{" "}
                    <span className="rt-color-periwinkle-gray">
                      launch your app
                    </span>
                  </h2>
                </div>
                <p
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289e6"
                  className="rt-gap-off">
                  Bring your idea to life with a team that makes building an app simple and fast.
                </p>
                <div className="rt-collaboration-left-inner">
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289e9"
                    className="rt-collaboration-left-item">
                    <div className="rt-collaboration-left-icon">
                      <Image
                        src="/service-3-assets/6916ed30eddd8192431b095e_specialiti-icon-1 (1).svg"
                        loading="lazy"
                        alt=""
                        className="rt-height-auto"
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Clear Updates
                      </div>
                      <p className="rt-gap-off">
                        We keep you in the loop the whole time so you always know what is happening.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289f1"
                    className="rt-about-v1-right-line rt-why-choose-v1-line"></div>
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289f2"
                    className="rt-collaboration-left-item">
                    <div className="rt-collaboration-left-icon">
                      <Image
                        src="/service-3-assets/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg"
                        loading="lazy"
                        alt=""
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Ready to Launch Fast
                      </div>
                      <p className="rt-gap-off">
                        We work quickly to make sure your app is ready exactly when you need it.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289fa"
                  className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                  <Link
                    data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                    href="/contact"
                    className="rt-button-body w-inline-block">
                    <div className="rt-button-text">Start building</div>
                    <div className="rt-button-body-overlay"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            data-w-id="f2aff3b2-cea7-6f9d-a44b-1ba65f4ef71a"
            className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
            <div className="rt-section-overlay"></div>
          </div>
        </section>
    </>
  );
}
