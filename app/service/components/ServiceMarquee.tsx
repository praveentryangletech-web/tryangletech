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
    <>
      <div className="rt-hero-v2-wrapper" ref={sectionRef}>
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
            {/* <div className="rt-hero-v2-content" style={{ alignItems: 'flex-end' }}>
              <div
                data-w-id="11d58063-9804-40c1-9e7d-d67bfd38af74"
                className="rt-hero-v2-card-v1">
                <Image
                  src="/Home2_files/691432fc2dbfd7373d92627c_taskopia-home-two-hero-left.webp"
                  loading="lazy"
                  alt="taskopia-home-two-hero-left"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto' }}
                  className="rt-shadow rt-border-radius-medium rt-border-line"
                />
              </div>
              <div
                data-w-id="dcecf02b-225d-a6bb-a12c-4ac9b21d3821"
                className="rt-hero-v2-card-2">
                <Image
                  src="/Home2_files/6912c4bdaae7aed5d10b828e_taskopia-hero-v2-2.webp"
                  loading="lazy"
                  alt="taskopia-hero-v2-2"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto' }}
                  className="rt-shadow rt-border-radius-medium rt-border-line"
                />
              </div>
              <div
                data-w-id="8c510f67-e449-acf5-7671-3a4a269a89b7"
                className="rt-hero-v2-card-v3">
                <Image
                  src="/Home2_files/69144db3d5bfa45112b0ac9f_taskopia-home-two-hero-right-2.webp"
                  loading="lazy"
                  alt="taskopia-home-two-hero-right-2"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto' }}
                  className="rt-shadow rt-border-radius-medium rt-border-line"
                />
              </div>
            </div> */}
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
                  <div className="rt-text-style-h5">Smart task assignment</div>
                  <p className="rt-gap-off">
                    Easily assign tasks to the right people with clear priorities
                    and timelines, improving accountability and ensuring a smoother
                    project flow.
                  </p>
                  <a
                    href="https://taskopia.webflow.io/about"
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
                    Smart workflows and automation
                  </div>
                  <p className="rt-gap-off">
                    Automate key workflows to reduce manual effort, cut errors, and
                    keep your team aligned, helping every project move faster and
                    more smoothly.
                  </p>
                  <a
                    href="https://taskopia.webflow.io/about"
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
                  <div className="rt-text-style-h5">Smart task assignment</div>
                  <p className="rt-gap-off">
                    Easily assign tasks to the right people with clear priorities
                    and timelines, improving accountability and ensuring a smoother
                    project flow.
                  </p>
                  <a
                    href="https://taskopia.webflow.io/about"
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
              <div className="rt-features-v2-left rt-border-radius-l transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '380px', flex: '0 0 100%', maxWidth: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
                  <div className="rt-text-style-h5">Smart task assignment</div>
                  <p className="rt-gap-off">
                    Easily assign tasks to the right people with clear priorities
                    and timelines, improving accountability and ensuring a smoother
                    project flow.
                  </p>
                  <a
                    href="https://taskopia.webflow.io/about"
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
              <div className="rt-features-v2-left rt-border-radius-l transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '500px', flex: 1, maxWidth: '100%' }}>
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
                  <div className="rt-text-style-h5">Customizable reporting</div>
                  <p className="rt-gap-off">
                    Generate detailed reports tailored to your team's specific KPIs.
                  </p>
                  <a
                    href="https://taskopia.webflow.io/about"
                    className="rt-features-v2-small-link w-inline-block"
                  >
                    <div className="rt-button-text rt-color-vivid-blue">
                      View more
                    </div>
                  </a>
                </div>
              </div>
              <div className="rt-features-v2-left rt-border-radius-l transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '500px', flex: 1, maxWidth: '100%' }}>
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
                  <div className="rt-text-style-h5">Seamless integration</div>
                  <p className="rt-gap-off">
                    Connect smoothly with all the tools your team already relies on.
                  </p>
                  <a
                    href="https://taskopia.webflow.io/about"
                    className="rt-features-v2-small-link w-inline-block"
                  >
                    <div className="rt-button-text rt-color-vivid-blue">
                      View more
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
      <div
        data-w-id="bb2028c0-8868-4d90-ae7b-80ecef8e422a"
        className="rt-marquee-v2 rt-hero-v5-marquee">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-text-marquee-wrapper rt-overflow-hidden">
            <div className="rt-text-marquee-train">
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27127d946b9cb9fdcbce_logo.svg"
                  loading="lazy"
                  width={100}
                  alt=""
                  height={800} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef271276a33d103013fa46_Group 1597884750.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
            <div className="rt-text-marquee-train">
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27127d946b9cb9fdcbce_logo.svg"
                  loading="lazy"
                  width={100}
                  alt=""
                  height={800} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef271276a33d103013fa46_Group 1597884750.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
            <div className="rt-text-marquee-train">
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27127d946b9cb9fdcbce_logo.svg"
                  loading="lazy"
                  width={100}
                  alt=""
                  height={800} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-text-marquee-iteme">
                <Image
                  src="/Home2_files/68ef271276a33d103013fa46_Group 1597884750.svg"
                  loading="lazy"
                  alt=""
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="rt-marquee-bottom-line"></div>
      </div>

    </>
  );
}
