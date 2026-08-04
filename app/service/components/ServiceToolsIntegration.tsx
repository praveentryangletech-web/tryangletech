"use client";
import React, { useEffect, useRef } from "react";

import Image from "next/image";

export default function ServiceToolsIntegration() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            // Optional: stop observing once it has animated
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
    <section className="rt-tools-icon-v1" ref={sectionRef}>
      <style>{`

        /* Stagger the delays for the logos in each row to create a wave effect */
        .rt-integration-top > div:nth-child(1) .reveal-on-scroll { transition-delay: 0.1s; }
        .rt-integration-top > div:nth-child(2) .reveal-on-scroll { transition-delay: 0.2s; }
        .rt-integration-top > div:nth-child(3) .reveal-on-scroll { transition-delay: 0.3s; }
        .rt-integration-top > div:nth-child(4) .reveal-on-scroll { transition-delay: 0.4s; }
        .rt-integration-top > div:nth-child(5) .reveal-on-scroll { transition-delay: 0.5s; }
        .rt-integration-top > div:nth-child(6) .reveal-on-scroll { transition-delay: 0.6s; }
        .rt-integration-top > div:nth-child(7) .reveal-on-scroll { transition-delay: 0.7s; }
        
        // .rt-tools-icon-v1 .rt-itegration-logo {
        //   box-shadow: none !important;
        // }

        .rt-tools-icon-main {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
      <div className="w-layout-blockcontainer rt-container-extra-large w-container mt-[5rem]">
        <div className="rt-tools-icon-main rt-overflow-hidden rt-position-relative">
          <div className="rt-tools-icon-container rt-change">
            <div
              data-w-id="94ab69a2-10a8-48fd-4bee-648edaa97316"
              className="rt-tools-iconheading rt-heading-bottom-gap reveal-on-scroll"
            >
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">integration</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Streamline workflows, save time,{" "}
                <span className="rt-color-periwinkle-gray">
                  enhance performance
                </span>
              </h2>
            </div>
            <div className="w-layout-vflex rt-integration-main-v2 rt-margin-auto">
              <div className="rt-integration-top">
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac02a_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d09c"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
                <div>
                  <Image
                    width={129}
                    height={131}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac02e_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d09e"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac02b_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a0"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac028_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a2"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac030_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a4"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac02c_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a6"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac02f_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0a8"
                    className="rt-itegration-logo rt-last reveal-on-scroll"
                  />
                </div>
              </div>
              <div className="rt-integration-top rt-bottom">
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac029_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0ab"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac027_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0ad"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac02d_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0af"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
                <div>
                  <Image
                    width={129}
                    height={132}
                    alt="Kloudera-service-one-integration-image"
                    src="/Home3_files/690d778d9a0ef2e561eac02b_kloudera-service-one-integration-image.svg"
                    loading="lazy"
                    data-w-id="da06afd4-a9e7-dcd2-7e61-7b4d50e9d0b1"
                    className="rt-itegration-logo reveal-on-scroll"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="rt-tools-icon-overlay">
            <Image
              src="/Home3_files/690adbc5bfed3c0fa7e49213_Vector 1530.webp"
              loading="lazy"
              alt="taskopia-home-two-overlay-integration"
              width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div> */}
        </div>
      </div>
    </section>
  );
}
