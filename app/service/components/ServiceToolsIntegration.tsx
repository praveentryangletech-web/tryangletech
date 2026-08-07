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
                  <img
                    alt="React"
                    src="/tech-icons/react.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <img
                    alt="Next.js"
                    src="/tech-icons/nextjs.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <img
                    alt="PHP"
                    src="/tech-icons/php.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <img
                    alt="AWS"
                    src="/tech-icons/aws.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <img
                    alt="Docker"
                    src="/tech-icons/docker.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <img
                    alt="Laravel"
                    src="/tech-icons/laravel.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <img
                    alt="Tailwind CSS"
                    src="/tech-icons/tailwind.svg"
                    loading="lazy"
                    className="rt-itegration-logo rt-last reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              <div className="rt-integration-top rt-bottom">
                <div>
                  <img
                    alt="Figma"
                    src="/tech-icons/figma.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <img
                    alt="Google Ads"
                    src="/tech-icons/google-ads.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <img
                    alt="Razorpay"
                    src="/tech-icons/razorpay.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <img
                    alt="Meta"
                    src="/tech-icons/meta.svg"
                    loading="lazy"
                    className="rt-itegration-logo reveal-on-scroll"
                    style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
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
