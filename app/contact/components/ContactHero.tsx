'use client';

import React from 'react';

import Image from "next/image";

const CA = '/contact-assets';

export default function ContactHero() {
  return (
    <>
          <section
            data-w-id="bfaf7311-da51-950a-1d57-7a0beac913ae"
            className="rt-hero-v9">
            <div className="w-layout-blockcontainer rt-container w-container">
              <div className="w-layout-hflex rt-hero-v9-heading-main">
                <div className="w-layout-vflex rt-hero-v9-heading-wrap rt-desktop-text-center rt-position-relative">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="bfaf7311-da51-950a-1d57-7a0beac913b2"
                      className="rt-sub-text rt-sub-gredient">
                      Contact with us
                    </div>
                  </div>
                  <div className="rt-hero-heading-gap">
                    <h1
                      data-w-id="bfaf7311-da51-950a-1d57-7a0beac913b4"
                      className="rt-gap-off">
                      Stay connected with seamless task management support
                    </h1>
                  </div>
                  <div
                    data-w-id="bfaf7311-da51-950a-1d57-7a0beac913b8"
                    className="rt-hero-v9-para-wrap">
                    <p className="rt-gap-off">
                      Stay connected with seamless task management support
                      ensures your team never feels stuck. With real-time
                      communication, quick response assistance.
                    </p>
                  </div>
                  <div
                    data-w-id="298ba08c-7cb0-240a-1ae7-4aa7d990a6d3"
                    className="rt-small-btn-wrap rt-hero-v1-small rt-blog-2">
                    <div className="rt-small-btn-main rt-color-change">
                      <div className="rt-small-btn-text">Workflow</div>
                      <div className="rt-btn-arrow-v2 rt-hero-v1-small">
                        <Image
                          src={`${CA}/69203b6151156495054eacd7_Vector 503 (2).svg`}
                          loading="lazy"
                          alt=""
                         width={800} height={800} style={{ width: "100%", height: "auto" }} />
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
