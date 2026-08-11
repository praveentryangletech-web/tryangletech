"use client";
import React, { useEffect, useRef } from "react";

import Image from "next/image";

export default function DigitalMarketingFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="rt-features-v2" ref={sectionRef}>
      <style>{`

      `}</style>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-tools-iconheading rt-choose-v4-heading rt-heading-bottom-gap">
          <div className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">our services</div>
          </div>
          <h2 className="rt-gap-off rt-desktop-text-center">
            Powerful services that fuel{" "}
            <span className="rt-color-periwinkle-gray">real business growth</span>
          </h2>
        </div>
        <div className="rt-features-v2-main">
          <div className="rt-features-v2-left rt-1 rt-border-radius-l">
            <div className="rt-features-v2-left-image">
              <div className="rt-features-v2-image-one reveal-on-scroll">
                <Image
                  src="/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp"
                  loading="lazy"
                  alt="Taskopia-features-home-v3-1"
                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-features-v2-image-two rt-border-radius-medium rt-shadow reveal-on-scroll">
                <Image
                  src="/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp"
                  loading="lazy"
                  alt="Taskopia-features-home-v3-2"
                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-features-v2-image-three rt-border-radius-medium rt-shadow reveal-on-scroll">
                <Image
                  src="/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp"
                  loading="lazy"
                  alt="Taskopia-features-home-v3-3"
                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
            <div className="rt-features-v2-left-text-box">
              <div className="rt-text-style-h5">Search Engine Optimization</div>
              <p className="rt-gap-off">
                Rank on page 1 and stay there. Our technical SEO, content optimization, and link-building expertise delivers sustainable, long-term organic traffic that compounds over time.
              </p>
              <a
                href="/contact"
                className="rt-features-v2-small-link w-inline-block"
              >
                <div className="rt-button-text rt-color-vivid-blue">
                  View more
                </div>
                <div>
                  <Image
                    src="/Home3_files/690d9fbfe8207af12de2d5dd_Vector 1553.svg"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </a>
            </div>
          </div>
          <div className="rt-features-v2-left rt-2 rt-border-radius-l">
            <div className="rt-features-v2-right-image">
              <div className="rt-position-relative rt-features-inner-image">
                <div className="rt-features-v2-icon rt-tab-display-none reveal-on-scroll">
                  <Image
                    src="/Home3_files/690dad352e3eaaf91d055fe5_Taskopia-features-home-v3-icon.webp"
                    loading="lazy"
                    alt="Taskopia-features-home-v3-icon"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-features-v2-line">
                  <Image
                    src="/Home3_files/690dad3509f6f587288a12d7_Taskopia-features-home-v3-7.webp"
                    loading="lazy"
                    alt="Taskopia-features-home-v3-7"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-features-v2-image-four rt-position-relative reveal-on-scroll">
                  <Image
                    src="/Home3_files/690dad35e28b189c556cc11e_Taskopia-features-home-v3-right.webp"
                    loading="lazy"
                    alt="
Taskopia-features-home-v3-right
"
                    className="rt-shadow"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-features-v2-image-five rt-position-relative reveal-on-scroll">
                  <Image
                    src="/Home3_files/690dad35e3ae72cf7cacc7f0_Taskopia-features-home-v3-5.webp"
                    loading="lazy"
                    alt="Taskopia-features-home-v3-5"
                    className="rt-shadow"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </div>
            </div>
            <div className="rt-features-v2-left-text-box">
              <div className="rt-text-style-h5">
                Performance-Driven PPC & Paid Ads
              </div>
              <p className="rt-gap-off">
                Stop burning ad budget. Our team builds and continuously optimizes campaigns that bring in high-intent leads at the lowest possible cost-per-acquisition.
              </p>
              <a
                href="/contact"
                className="rt-features-v2-small-link w-inline-block"
              >
                <div className="rt-button-text rt-color-vivid-blue">
                  View more
                </div>
                <div>
                  <Image
                    src="/Home3_files/690d9fbfe8207af12de2d5dd_Vector 1553.svg"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </a>
            </div>
          </div>
          {/* <div className="rt-features-v2-left rt-2 rt-border-radius-l">
            <div className="rt-features-v2-right-image">
              <div className="rt-position-relative rt-features-inner-image">
                <div className="rt-features-v2-icon rt-tab-display-none reveal-on-scroll">
                  <Image
                    src="/Home3_files/690dad352e3eaaf91d055fe5_Taskopia-features-home-v3-icon.webp"
                    loading="lazy"
                    alt="Taskopia-features-home-v3-icon"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-features-v2-line">
                  <Image
                    src="/Home3_files/690dad3509f6f587288a12d7_Taskopia-features-home-v3-7.webp"
                    loading="lazy"
                    alt="Taskopia-features-home-v3-7"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-features-v2-image-four rt-position-relative reveal-on-scroll">
                  <Image
                    src="/Home3_files/690dad35e28b189c556cc11e_Taskopia-features-home-v3-right.webp"
                    loading="lazy"
                    alt="
Taskopia-features-home-v3-right
"
                    className="rt-shadow"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-features-v2-image-five rt-position-relative reveal-on-scroll">
                  <Image
                    src="/Home3_files/690dad35e3ae72cf7cacc7f0_Taskopia-features-home-v3-5.webp"
                    loading="lazy"
                    alt="Taskopia-features-home-v3-5"
                    className="rt-shadow"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </div>
            </div>
            <div className="rt-features-v2-left-text-box">
              <div className="rt-text-style-h5">
                Smart workflows and automation
              </div>
              <p className="rt-gap-off">
                Automate key workflows to reduce manual effort, cut errors, and
                keep your team aligned, helping every project move faster and
                more smoothly.
              </p>
              <a
                data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                href="/about"
                className="rt-features-v2-small-link w-inline-block"
              >
                <div className="rt-button-text rt-color-vivid-blue">
                  View more
                </div>
                <div>
                  <Image
                    src="/Home3_files/690d9fbfe8207af12de2d5dd_Vector 1553.svg"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
