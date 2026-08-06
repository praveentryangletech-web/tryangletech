'use client';

import React, { useState } from 'react';

import Image from "next/image";
export default function WebDevFAQ() {

  return (
    <>
      <section className="rt-tools-icon-v1">
        <div className="w-layout-blockcontainer rt-container-extra-large w-container">
          <div className="rt-tools-icon-main rt-overflow-hidden rt-position-relative">
            <div className="rt-tools-icon-container">
              <div className="rt-tools-iconheading rt-heading-bottom-gap">
                <div
                  data-w-id="129f78ad-f271-7836-05de-3984f045f43c"
                  className="rt-sub-gap">
                  <div className="rt-sub-text rt-sub-gredient">
                    Tech Stack
                  </div>
                </div>
                <h2
                  data-w-id="129f78ad-f271-7836-05de-3984f045f43f"
                  className="rt-gap-off rt-desktop-text-center">
                  We build with industry-leading modern technologies
                </h2>
              </div>
              <div
                data-w-id="129f78ad-f271-7836-05de-3984f045f443"
                className="w-layout-hflex rt-tools-icon-wrapper">
                <div className="w-layout-vflex rt-tools-icon one">
                  <div className="rt-tools-icon-image">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                      loading="lazy"
                      alt="React.js"
                      style={{ width: "90px", height: "90px", objectFit: "contain", padding: "10px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div className="w-layout-vflex rt-tools-icon-text">
                    <div className="rt-small-name">React.js</div>
                    <div className="rt-tools-icon-text-box">
                      <div className="rt-tag">Frontend Library</div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-vflex rt-tools-icon two">
                  <div className="rt-tools-icon-image">
                    <img
                      alt="Next.js"
                      src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                      loading="lazy"
                      style={{ width: "90px", height: "90px", objectFit: "contain", padding: "20px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div className="w-layout-vflex rt-tools-icon-text">
                    <div className="rt-small-name">Next.js</div>
                    <div className="rt-tools-icon-text-box">
                      <div className="rt-tag">React Framework</div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-vflex rt-tools-icon one">
                  <div className="rt-tools-icon-image">
                    <img
                      alt="PHP"
                      src="https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
                      loading="lazy"
                      style={{ width: "90px", height: "90px", objectFit: "contain", padding: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div className="w-layout-vflex rt-tools-icon-text">
                    <div className="rt-small-name">PHP</div>
                    <div className="rt-tools-icon-text-box">
                      <div className="rt-tag">Backend Language</div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-vflex rt-tools-icon two">
                  <div className="rt-tools-icon-image">
                    <img
                      alt="Tailwind CSS"
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                      loading="lazy"
                      style={{ width: "90px", height: "90px", objectFit: "contain", padding: "20px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div className="w-layout-vflex rt-tools-icon-text">
                    <div className="rt-small-name">Tailwind CSS</div>
                    <div className="rt-tools-icon-text-box">
                      <div className="rt-tag">Styling Framework</div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-vflex rt-tools-icon one">
                  <div className="rt-tools-icon-image">
                    <img
                      alt="PostgreSQL"
                      src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
                      loading="lazy"
                      style={{ width: "90px", height: "90px", objectFit: "contain", padding: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div className="w-layout-vflex rt-tools-icon-text">
                    <div className="rt-small-name">PostgreSQL</div>
                    <div className="rt-tools-icon-text-box">
                      <div className="rt-tag">Relational Database</div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-vflex rt-tools-icon two">
                  <div className="rt-tools-icon-image">
                    <img
                      alt="AWS"
                      src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                      loading="lazy"
                      style={{ width: "90px", height: "90px", objectFit: "contain", padding: "20px", boxSizing: "border-box" }}
                    />
                  </div>

                  <div className="w-layout-vflex rt-tools-icon-text">
                    <div className="rt-small-name">AWS</div>
                    <div className="rt-tools-icon-text-box">
                      <div className="rt-tag">Cloud Infrastructure</div>
                    </div>
                  </div>
                </div>
                <div className="w-layout-vflex rt-tools-icon one">
                  <div className="rt-tools-icon-image">
                    <img
                      alt="Docker"
                      src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg"
                      loading="lazy"
                      style={{ width: "90px", height: "90px", objectFit: "contain", padding: "15px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div className="w-layout-vflex rt-tools-icon-text">
                    <div className="rt-small-name">Docker</div>
                    <div className="rt-tools-icon-text-box">
                      <div className="rt-tag">Containerization</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rt-tools-icon-overlay">
              <Image
                src="/service-1-assets/690adbc5bfed3c0fa7e49213_Vector 1530.webp"
                loading="lazy"
                alt="taskopia-home-two-overlay-integration"
                width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
