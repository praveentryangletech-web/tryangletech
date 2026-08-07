'use client';
import Link from "next/link";
import Image from "next/image";

import React, { useEffect, useRef } from 'react';

export default function ServiceMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If intersecting or already scrolled past (above viewport)
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
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
    <div ref={sectionRef}>
      <div className="rt-hero-v2-wrapper">
        <section
          data-w-id="d3f5d731-f45f-6040-b304-e8f46b7cbf87"
          className="rt-hero-v2 rt-position-relative">
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-hero-v2-top rt-desktop-text-center">
              <div
                data-w-id="494ef8ba-faf0-3127-98fb-da43bfc087b6"
                className="rt-small-btn-wrap rt-hero-v1-small rt-hero-v2-smal-btn">
                <div className="rt-small-btn-main rt-tab-display-none">
                  <div className="rt-small-btn-text">Workflow</div>
                  <div className="rt-btn-arrow-v2 rt-hero-v1-small">
                    <Image
                      src="/Home2_files/6904842a6f63d7e69353dc60_Vector 503 (1).svg"
                      loading="lazy"
                      alt="small icon"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
              <div
                data-w-id="5b8f464a-495c-fe16-e18c-e31f826403e8"
                className="rt-hero-v1-top-sub">
                <div className="rt-overflow-hidden">
                  <div className="w-layout-hflex rt-hero-v2-client-img-wrap">
                    <div
                      data-w-id="5b8f464a-495c-fe16-e18c-e31f826403eb"
                      className="rt-hero-v2-client-image rt-overflow-hidden rt-sub-image">
                      <Image
                        width={62}
                        height={47}
                        alt="Kloudera-home-two-hero-image"
                        src="/Home2_files/690499e17ce0c344a20ecda1_kloudera-home-two-hero-image.webp"
                        loading="lazy"
                      />
                    </div>
                    <div
                      data-w-id="5b8f464a-495c-fe16-e18c-e31f826403ed"
                      className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left rt-sub-image">
                      <Image
                        width={60}
                        height={79}
                        alt="Kloudera-home-two-hero-image"
                        src="/Home2_files/690499e17ce0c344a20ecda2_kloudera-home-two-hero-image.webp"
                        loading="lazy"
                      />
                    </div>
                    <div
                      data-w-id="5b8f464a-495c-fe16-e18c-e31f826403ef"
                      className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left rt-sub-image">
                      <Image
                        width={60}
                        height={79}
                        alt="Kloudera-home-two-hero-image"
                        src="/Home2_files/690499e17ce0c344a20ecda3_kloudera-home-two-hero-image.webp"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div className="rt-overflow-hidden">
                  <div
                    data-w-id="5b8f464a-495c-fe16-e18c-e31f826403f2"
                    className="rt-sub-text rt-sub-gredient">
                    Task management
                  </div>
                </div>
              </div>
              <div className="rt-hero-heading-gap">
                <h1
                  data-w-id="5b8f464a-495c-fe16-e18c-e31f826403f5"
                  className="rt-gap-off">
                  Boost productivity with smarter task tools for teams
                </h1>
              </div>
              <p
                data-w-id="5b8f464a-495c-fe16-e18c-e31f826403f7"
                className="rt-padding-hero-v2 rt-gap-off">
                Achieve more with intelligent task tools that streamline
                workflows and maximize team productivity every day.
              </p>
              <div
                data-w-id="5b8f464a-495c-fe16-e18c-e31f826403f9"
                className="w-layout-hflex rt-hero-v7-button-wrap">
                <Link
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href="/contact"
                  className="rt-button-body w-inline-block">
                  <div className="rt-button-text">Get started today</div>
                  <div className="rt-button-body-overlay"></div>
                </Link>
                <Link
                  data-wf--rt-border-button--variant="base"
                  data-w-id="9067a903-cf07-9614-de57-af0aba677203"
                  href="/pricing"
                  className="rt-button-body rt-nav-btn w-inline-block">
                  <div className="rt-button-text rt-btn-color-nav">
                    View pricing
                  </div>
                  <div className="rt-button-body-overlay rt-nav-overlay"></div>
                </Link>
              </div>
              <div
                data-w-id="e614267b-345c-6f68-39fe-7fe900653232"
                className="rt-pricing-itop-samll-text rt-hero-v2-top-gap">
                <div className="rt-pricing-samll-text">
                  <div>
                    <Image
                      src="/Home2_files/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-color-dark-indigo">
                    Streamlined workflows
                  </div>
                </div>
                <div className="rt-pricing-samll-text">
                  <div>
                    <Image
                      src="/Home2_files/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-color-dark-indigo">
                    Enhance collaboration
                  </div>
                </div>
                <div className="rt-pricing-samll-text">
                  <div>
                    <Image
                      src="/Home2_files/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-color-dark-indigo">
                    Achieve goals faster
                  </div>
                </div>
              </div>
            </div>
            <div className="rt-hero-v2-content rt-features-v2-main" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div className="rt-hero-v2-card-1 rt-features-v2-left rt-1 rt-border-radius-l transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '500px' }}>
                <div className="rt-features-v2-left-image">
                  <div className="rt-features-v2-image-one reveal-on-scroll">
                    <Image
                      src="/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp"
                      loading="lazy"
                      alt="Taskopia-features-home-v3-1"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-two rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '100ms' }}>
                    <Image
                      src="/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp"
                      loading="lazy"
                      alt="Taskopia-features-home-v3-2"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-three rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '200ms' }}>
                    <Image
                      src="/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp"
                      loading="lazy"
                      alt="Taskopia-features-home-v3-3"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div className="rt-features-v2-left-text-box reveal-on-scroll" style={{ animationDelay: '300ms' }}>
                  <div className="rt-text-style-h5">Custom Software Development</div>
                  <p className="rt-gap-off">
                    We build tailored software solutions designed specifically to meet your unique business challenges, streamlining your operations and driving growth.
                  </p>
                  <a
                    href="/service/custom-software"
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
              <div className="rt-hero-v2-card-2 rt-features-v2-left rt-2 rt-border-radius-l transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '680px' }}>
                <div className="rt-features-v2-right-image">
                  <div className="rt-position-relative rt-features-inner-image">
                    <div className="rt-features-v2-icon rt-tab-display-none reveal-on-scroll">
                      <Image
                        src="/Home3_files/690dad352e3eaaf91d055fe5_Taskopia-features-home-v3-icon.webp"
                        loading="lazy"
                        alt="Taskopia-features-home-v3-icon"
                        width={800} height={900} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-features-v2-line">
                      <Image
                        src="/Home3_files/690dad3509f6f587288a12d7_Taskopia-features-home-v3-7.webp"
                        loading="lazy"
                        alt="Taskopia-features-home-v3-7"
                        width={800} height={900} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-features-v2-image-four rt-position-relative reveal-on-scroll" style={{ animationDelay: '100ms' }}>
                      <Image
                        src="/Home3_files/690dad35e28b189c556cc11e_Taskopia-features-home-v3-right.webp"
                        loading="lazy"
                        alt="
            Taskopia-features-home-v3-right
            "
                        className="rt-shadow"
                        width={800} height={900} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-features-v2-image-five rt-position-relative reveal-on-scroll" style={{ animationDelay: '200ms' }}>
                      <Image
                        src="/Home3_files/690dad35e3ae72cf7cacc7f0_Taskopia-features-home-v3-5.webp"
                        loading="lazy"
                        alt="Taskopia-features-home-v3-5"
                        className="rt-shadow"
                        width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                  </div>
                </div>
                <div className="rt-features-v2-left-text-box reveal-on-scroll" style={{ animationDelay: '300ms' }}>
                  <div className="rt-text-style-h5">
                    Web Development
                  </div>
                  <p className="rt-gap-off">
                    Create a powerful online presence with our responsive, high-performance web development services. We craft engaging websites that captivate your audience.
                  </p>
                  <a
                    href="/service/web-development"
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
              <div className="rt-hero-v2-card-3 rt-features-v2-left rt-1 rt-border-radius-l transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '500px' }}>
                <div className="rt-features-v2-left-image">
                  <div className="rt-features-v2-image-one reveal-on-scroll">
                    <Image
                      src="/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp"
                      loading="lazy"
                      alt="Taskopia-features-home-v3-1"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-two rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '100ms' }}>
                    <Image
                      src="/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp"
                      loading="lazy"
                      alt="Taskopia-features-home-v3-2"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-three rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '200ms' }}>
                    <Image
                      src="/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp"
                      loading="lazy"
                      alt="Taskopia-features-home-v3-3"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div className="rt-features-v2-left-text-box reveal-on-scroll" style={{ animationDelay: '300ms' }}>
                  <div className="rt-text-style-h5">Mobile Application</div>
                  <p className="rt-gap-off">
                    Reach your customers on the go with intuitive, user-friendly mobile applications for iOS and Android. We turn your app ideas into reality.
                  </p>
                  <a
                    href="/service/mobile-application"
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
            </div>
          </div>
          <div className="rt-landing-absolute-imgae-two rt-tab-display-none">
            <Image
              width={101}
              height={118}
              alt=""
              src="/Home2_files/6911b9467f26f096826792ff_Kloudera-landing-hero-icon.svg"
              loading="lazy"
            />
          </div>
        </section>
      </div>
      <style>{`
        .no-bg-pseudo::before, .no-bg-pseudo::after {
          display: none !important;
          background: none !important;
        }
      `}</style>
      <div className="rt-hero-v2-wrapper no-bg-pseudo" style={{  paddingBottom: '0' }}>
        <section className="rt-hero-v2 rt-position-relative no-bg-pseudo bg-gradient-to-b from-[#f4f7fe] to-white" style={{ paddingTop: '30px', paddingBottom: '50px',backgroundImage: 'none' }}>
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-hero-v2-content rt-features-v2-main" style={{ alignItems: 'stretch', flexWrap: 'wrap', marginBottom: '0' }}>
              <div className="rt-features-v2-left rt-2 rt-border-radius-l transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '380px', flex: '0 0 100%', maxWidth: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="rt-features-v2-left-image" style={{ flex: '1' }}>
                  <div className="rt-features-v2-image-one reveal-on-scroll">
                    <Image
                      src="/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp"
                      loading="lazy"
                      alt="Taskopia-features-home-v3-1"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-two rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '100ms' }}>
                    <Image
                      src="/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp"
                      loading="lazy"
                      alt="Taskopia-features-home-v3-2"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-three rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '200ms' }}>
                    <Image
                      src="/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp"
                      loading="lazy"
                      alt="Taskopia-features-home-v3-3"
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div className="rt-features-v2-left-text-box reveal-on-scroll" style={{ animationDelay: '300ms', flex: '1', paddingLeft: '4rem' }}>
                  <div className="rt-text-style-h5">Graphics Designing</div>
                  <p className="rt-gap-off">
                    Elevate your brand with stunning visual designs. Our creative team delivers eye-catching graphics, logos, and UI/UX designs that leave a lasting impression.
                  </p>
                  <a
                    href="/service/graphics-designing"
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
              <div className="rt-features-v2-left rt-1 rt-border-radius-l transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '500px', flex: 1, maxWidth: '100%' }}>
                <div className="rt-features-v2-left-image">
                  <div className="rt-features-v2-image-one reveal-on-scroll">
                    <Image
                      src="/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-two rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '100ms' }}>
                    <Image
                      src="/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-three rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '200ms' }}>
                    <Image
                      src="/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div className="rt-features-v2-left-text-box reveal-on-scroll" style={{ animationDelay: '300ms' }}>
                  <div className="rt-text-style-h5">Digital Marketing</div>
                  <p className="rt-gap-off">
                    Boost your online visibility and drive conversions. We offer comprehensive digital marketing strategies tailored to your business goals.
                  </p>
                  <a
                    href="/service/digital-marketing"
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
              <div className="rt-features-v2-left rt-1 rt-border-radius-l transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '500px', flex: 1, maxWidth: '100%' }}>
                <div className="rt-features-v2-left-image">
                  <div className="rt-features-v2-image-one reveal-on-scroll">
                    <Image
                      src="/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-two rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '100ms' }}>
                    <Image
                      src="/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-features-v2-image-three rt-border-radius-medium rt-shadow reveal-on-scroll" style={{ animationDelay: '200ms' }}>
                    <Image
                      src="/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div className="rt-features-v2-left-text-box reveal-on-scroll" style={{ animationDelay: '300ms' }}>
                  <div className="rt-text-style-h5">Search Engine Optimization</div>
                  <p className="rt-gap-off">
                    Rank higher, drive organic traffic, and outpace your competition. We implement data-driven SEO strategies that deliver measurable, long-term results.
                  </p>
                  <a
                    href="/service/seo"
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
            </div>
          </div>
        </section>
      </div>
      <div className="rt-marquee-v2 rt-hero-v5-marquee">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-text-marquee-wrapper rt-overflow-hidden">
            <div className="rt-text-marquee-train">
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27127d946b9cb9fdcbce_logo.svg"
                  loading="lazy"
                  width={100}
                  alt=""
                  height={40}
                  style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef271276a33d103013fa46_Group 1597884750.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
            </div>
            {/* <div className="rt-text-marquee-train">
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27127d946b9cb9fdcbce_logo.svg"
                  loading="lazy"
                  width={100}
                  alt=""
                  height={40}
                  style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef271276a33d103013fa46_Group 1597884750.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
            </div>
            <div className="rt-text-marquee-train">
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27127d946b9cb9fdcbce_logo.svg"
                  loading="lazy"
                  width={100}
                  alt=""
                  height={40}
                  style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef271276a33d103013fa46_Group 1597884750.svg"
                  loading="lazy"
                  alt=""
                  width={200} height={80} style={{ height: "30px", width: "auto" }} />
              </div>
            </div> */}
          </div>
        </div>
        <div className="rt-marquee-bottom-line"></div>
      </div>

    </div>
  );
}
