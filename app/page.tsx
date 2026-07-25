"use client";
import React, { useEffect } from 'react';
import Navbar from './common/Navbar';
import Herosection from '@/app/home/components/Hero';
import OurBenifit from '@/app/home/components/Benefits';
import About from '@/app/home/components/about';
export default function ExactClonePage() {
  useEffect(() => {
    const triggerWebflow = () => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.add('w-mod-ix');

        if ((window as any).Webflow) {
          const w = (window as any).Webflow;
          try {
            w.ready();
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('scroll'));
          } catch (e) {
            console.error("Webflow ready trigger error:", e);
          }
        }
      }
    };

    const timer = setTimeout(triggerWebflow, 300);

    // Native Scroll Reveal Animation Engine (IntersectionObserver)
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
          target.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    });

    const animatedElements = document.querySelectorAll('[data-w-id]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />

      <main>
      <Herosection/>
        
       <OurBenifit/>
       <About/>
     
        <section className="rt-why-choose-v1">
          <div
            className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-why-choose-v1-wrapper">
              <div className="rt-why-choose-v1-content">
                <div className="rt-testimonials-v1-top rt-heading-bottom-gap">
                  <div
                    data-w-id="657bd2a2-86bd-d868-77e3-fda88540fe8e"
                    style={{ "opacity": "0" }}
                    className="rt-sub-gap">
                    <div className="rt-sub-text rt-sub-gredient">why choose us</div>
                  </div>
                  <div
                    data-w-id="07416d34-f69b-c50c-b2bc-d9952d15faca"
                    style={{ "opacity": "0" }}>
                    <h2 className="rt-gap-off">
                      Stay productive with smarter
                      <span className="rt-color-periwinkle-gray"
                      >task management</span
                      >
                    </h2>
                  </div>
                </div>
                <div className="rt-why-choose-v1-main rt-overflow-hidden">
                  <div className="rt-why-choose-v1-left">
                    <div
                      data-w-id="cac76f96-8396-311e-6048-5de6986cd688"
                      className="rt-why-choose-v1-left-item"
                      style={{ "opacity": "0" }}>
                      <div className="rt-why-choose-v1-icon">
                        <img
                          src="/Taskopia_files/6916ef876682eed2b2fd5911_Vector (34).svg"
                          loading="lazy"
                          width="18.5"
                          height="100"
                          alt=""
                          className="rt-why-choose-icon" />
                      </div>
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Custom workflows
                      </div>
                      <p className="rt-gap-off">
                        Adapt the platform to match the way your team works.
                      </p>
                    </div>
                    <div
                      data-w-id="d1090583-b79b-0169-8445-2f4f2a34b09c"
                      className="rt-about-v1-right-line rt-why-choose-v1-line"
                      style={{ "width": "0%" }}></div>
                    <div
                      data-w-id="f3ef8d6b-3999-964f-e18a-fb715340ebb2"
                      className="rt-why-choose-v1-left-item"
                      style={{ "opacity": "0" }}>
                      <div className="rt-why-choose-v1-icon">
                        <img
                          src="/Taskopia_files/6916f00db3051e5aed09bd3f_Group 2085663576.svg"
                          loading="lazy"
                          width="100"
                          height="100"
                          alt=""
                          className="rt-why-choose-icon" />
                      </div>
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        On-time delivery
                      </div>
                      <p className="rt-gap-off">
                        Never miss a deadline again with smart reminders, progress
                        tracking, and visual dashboards.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="9ec697c3-d7e6-12f5-7ab9-a71d0a578b6a"
                    style={{ "opacity": "0" }}
                    className="rt-why-choose-v1-center">
                    <img
                      src="/Taskopia_files/691ecfdec4425f741cb80fc8_tasopiya-home-one-hande.webp"
                      loading="lazy"
                      alt="" />
                  </div>
                  <div className="rt-why-choose-v1-left">
                    <div
                      data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf7c"
                      className="rt-why-choose-v1-left-item"
                      style={{ "opacity": "0" }}>
                      <div className="rt-why-choose-v1-icon">
                        <img
                          src="/Taskopia_files/6916ec635353353be914aafc_Vector (32).svg"
                          loading="lazy"
                          width="18.5"
                          height="100"
                          alt=""
                          className="rt-why-choose-icon" />
                      </div>
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        All-in-one platform
                      </div>
                      <p className="rt-gap-off">
                        Manage projects, tasks, files, and communication in one
                        centralized hub.
                      </p>
                    </div>
                    <div
                      data-w-id="0637a1b1-677c-853f-04eb-0a234d569018"
                      className="rt-about-v1-right-line rt-why-choose-v1-line"
                      style={{ "width": "0%" }}></div>
                    <div
                      data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf84"
                      className="rt-why-choose-v1-left-item"
                      style={{ "opacity": "0" }}>
                      <div className="rt-why-choose-v1-icon">
                        <img
                          src="/Taskopia_files/6916ec6339f890a80905a69b_Vector (33).svg"
                          loading="lazy"
                          width="100"
                          height="100"
                          alt=""
                          className="rt-why-choose-icon" />
                      </div>
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Smarter collaboration
                      </div>
                      <p className="rt-gap-off">
                        Assign tasks, share updates, and stay connected in real
                        time. With seamless communication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="rt-collaboration-v1 rt-overflow-hidden">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-collaboration-v1-main">
              <div className="rt-collaboration-left">
                <div className="rt-sub-gap">
                  <div
                    data-w-id="f68a08f7-0700-c3c7-7ea2-119bf4408740"
                    style={{ "opacity": "0" }}
                    className="rt-sub-text rt-sub-gredient">
                    Collaboration Section
                  </div>
                </div>
                <div className="rt-heading-para-gap">
                  <h2
                    data-w-id="fa389f03-d668-fc21-92b7-625895f0f1cd"
                    style={{ "opacity": "0" }}
                    className="rt-gap-off">
                    One platform to connect, collaborate
                    <span className="rt-color-periwinkle-gray">and deliver</span>
                  </h2>
                </div>
                <p
                  data-w-id="01cd9f60-c08f-a44e-7306-8a24c776e67e"
                  style={{ "opacity": "0" }}
                  className="rt-gap-off">
                  Bring your team, tasks, and tools together in one spaceâ€”making
                  collaboration seamless and project delivery faster than ever.
                </p>
                <div className="rt-collaboration-left-inner">
                  <div
                    data-w-id="756057e3-d2c7-74cf-9fc4-d890fe38f192"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-left-item">
                    <div className="rt-collaboration-left-icon">
                      <img
                        src="/Taskopia_files/6916ed30eddd8192431b095e_specialiti-icon-1 (1).svg"
                        loading="lazy"
                        alt="" />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Seamless teamwork
                      </div>
                      <p className="rt-gap-off">
                        Unify communication, tasks, and files in one space to keep
                        your team aligned and projects moving forward
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="e928092d-3b4d-c194-2dee-623c2c3a4898"
                    className="rt-about-v1-right-line rt-why-choose-v1-line"
                    style={{ "width": "0%" }}></div>
                  <div
                    data-w-id="7bbb7d70-219f-6add-8d17-19c31521a7bc"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-left-item">
                    <div className="rt-collaboration-left-icon">
                      <img
                        src="/Taskopia_files/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg"
                        loading="lazy"
                        alt="" />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Faster project delivery
                      </div>
                      <p>
                        Track progress, set clear deadlines, and streamline
                        workflows to ensure every project is delivered on time.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                  <a
                    data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                    href="https://taskopia.webflow.io/contact"
                    className="rt-button-body w-inline-block"
                  ><div className="rt-button-text">Get started today</div>
                    <div
                      className="rt-button-body-overlay"
                      style={{ "transform": "translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div
                    ></a>
                </div>
              </div>
              <div className="rt-collaboration-v1-right">
                <div className="rt-collaboration-v1-right-top">
                  <div
                    data-w-id="ae8cc4e1-ef96-bdcf-a4f1-2f55a386306b"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-v1-right-one">
                    <img
                      src="/Taskopia_files/68f21b4dc6a06a6abe39c79b_taskopia-Collaboration-one.webp"
                      loading="lazy"
                      alt="taskopia-Collaboration-one" />
                  </div>
                  <div
                    data-w-id="6e37c1de-f32a-f8b2-a948-1302911adaed"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-v1-right-two">
                    <img
                      src="/Taskopia_files/68f21b3af8e5e0af23ce678d_taskopia-Collaboration-two.webp"
                      loading="lazy"
                      alt="taskopia-Collaboration-two" />
                  </div>
                </div>
                <div
                  data-w-id="5f4e3a0f-8628-ed34-e438-68eb6dc94db3"
                  style={{ "opacity": "0" }}
                  className="rt-collaboration-v1-right-bottom">
                  <img
                    src="/Taskopia_files/68f21b3a3b734d2430609672_taskopia-Collaboration-three.webp"
                    loading="lazy"
                    width="466"
                    sizes="(max-width: 479px) 100vw, 466px"
                    alt="taskopia-Collaboration-three"
                    srcSet="
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f21b3a3b734d2430609672_taskopia-Collaboration-three-p-500.webp 500w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f21b3a3b734d2430609672_taskopia-Collaboration-three-p-800.webp 800w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f21b3a3b734d2430609672_taskopia-Collaboration-three.webp       932w
                  " />
                </div>
                <div className="rt-collaboration-v1-right-bg"></div>
              </div>
            </div>
          </div>
        </section>
        <section className="rt-integration-v1 rt-overflow-hidden">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-our-benefits-heading rt-heading-bottom-gap">
              <div
                data-w-id="938155cb-3e23-0427-eb61-f0e0e334e534"
                style={{ "opacity": "0" }}
                className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">integration</div>
              </div>
              <h2
                data-w-id="938155cb-3e23-0427-eb61-f0e0e334e537"
                style={{ "opacity": "0" }}
                className="rt-gap-off rt-desktop-text-center">
                Seamless teamwork, smarter tasks,
                <span className="rt-color-periwinkle-gray">better outcomes</span>
              </h2>
            </div>
            <div
              data-w-id="9f1e9f9b-80b7-3274-d862-dfd856e9ef3b"
              className="rt-integration-v1-wrap">
              <div
                style={{ "transform": "translate3d(0px, 0px, 0px) scale3d(0.4, 0.4, 1)\n                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}
                className="rt-integration-v1-logo">
                <div className="rt-width-full">
                  <img
                    src="/Taskopia_files/69142f6f3f26d48453053172_taskopia-home-one-integration-icone.svg"
                    loading="lazy"
                    width="100"
                    height="100"
                    alt="taskopia-home-one-integration-icone"
                    className="rt-height-auto" />
                </div>
              </div>
              <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-1">
                <div>
                  <img
                    src="/Taskopia_files/68f23486208c840a16db162e_taskopia-integration-icon-1.svg"
                    loading="lazy"
                    width="18.5"
                    alt="taskopia-integration-icon-1" />
                </div>
              </div>
              <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-2">
                <div>
                  <img
                    src="/Taskopia_files/68f23486c96e19be1a0fd550_taskopia-integration-icon-3.svg"
                    loading="lazy"
                    width="18.5"
                    alt="taskopia-integration-icon-3" />
                </div>
              </div>
              <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-3">
                <div>
                  <img
                    src="/Taskopia_files/68f2348699aef274cbcbee3e_taskopia-integration-icon-2.svg"
                    loading="lazy"
                    width="18.5"
                    alt="taskopia-integration-icon-2" />
                </div>
              </div>
              <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-4">
                <div>
                  <img
                    src="/Taskopia_files/68f23486208c840a16db162e_taskopia-integration-icon-1.svg"
                    loading="lazy"
                    width="18.5"
                    alt="taskopia-integration-icon-1" />
                </div>
              </div>
              <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-5">
                <div>
                  <img
                    src="/Taskopia_files/68f23486b959a4ffa7a97ffd_taskopia-integration-icon-4.svg"
                    loading="lazy"
                    width="18.5"
                    alt="taskopia-integration-icon-4" />
                </div>
              </div>
              <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-6">
                <div>
                  <img
                    src="/Taskopia_files/68f234862949c40075dc6633_taskopia-integration-icon-5.svg"
                    loading="lazy"
                    width="18.5"
                    alt="taskopia-integration-icon-5" />
                </div>
              </div>
              <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-7">
                <div>
                  <img
                    src="/Taskopia_files/68f234867a335089a7a018ec_taskopia-integration-icon-6.svg"
                    loading="lazy"
                    width="18.5"
                    alt="taskopia-integration-icon-6" />
                </div>
              </div>
              <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-8">
                <div>
                  <img
                    src="/Taskopia_files/68f2348662af5d1784a5246b_taskopia-integration-icon-7.svg"
                    loading="lazy"
                    width="18.5"
                    alt="taskopia-integration-icon-7" />
                </div>
              </div>
              <div
                className="rt-integration-v1-line-1 rt-overflow-hidden"
                style={{ "width": "0%" }}>
                <div className="rt-right">
                  <img
                    src="/Taskopia_files/68f23486e9eb825f40892060_taskopia-integration-line-left.png"
                    loading="lazy"
                    width="455"
                    sizes="(max-width: 479px) 100vw, 455px"
                    alt="taskopia-integration-line-left"
                    srcSet="
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486e9eb825f40892060_taskopia-integration-line-left-p-500.png 500w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486e9eb825f40892060_taskopia-integration-line-left-p-800.png 800w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486e9eb825f40892060_taskopia-integration-line-left.png       910w
                  "
                    className="rt-integration-v1-line-right" />
                </div>
              </div>
              <div
                className="w-layout-hflex rt-integration-v1-line-2 rt-overflow-hidden"
                style={{ "width": "0%" }}>
                <div className="rt-left rt-overflow-hidden">
                  <img
                    src="/Taskopia_files/68f23486248de9bce386d338_taskopia-integration-line-right.png"
                    loading="lazy"
                    width="455.5"
                    sizes="(max-width: 479px) 100vw, 456px"
                    alt="taskopia-integration-line-right"
                    srcSet="
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486248de9bce386d338_taskopia-integration-line-right-p-500.png 500w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486248de9bce386d338_taskopia-integration-line-right-p-800.png 800w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486248de9bce386d338_taskopia-integration-line-right.png       911w
                  "
                    className="rt-integration-v1-line-right" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="rt-testimonials-v1">
          <div
            className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-testimonials-v1-contanner rt-overflow-hidden">
              <div className="rt-testimonials-v1-container rt-position-relative">
                <div className="rt-testimonials-v1-top rt-heading-bottom-gap">
                  <div
                    data-w-id="a23714eb-edfa-8381-582b-b2a0c38b7431"
                    style={{ "opacity": "0" }}
                    className="rt-sub-gap">
                    <div className="rt-sub-text">our testimonials</div>
                  </div>
                  <div className="rt-overflow-hidden">
                    <h2
                      data-w-id="a23714eb-edfa-8381-582b-b2a0c38b7434"
                      style={{ "opacity": "0" }}
                      className="rt-gap-off rt-text-color-white">
                      Customer experiences that speak for themselves
                    </h2>
                  </div>
                </div>
                <div
                  data-w-id="18db17a4-29e4-c882-80c4-267603e436cb"
                  className="rt-marquee-v1-animation rt-overflow-hidden">
                  <div className="rt-testimonials-v1-content" style={{}}>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="9e833be6-6d9a-d568-8dd2-d8afc0feccec"
                        style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <img
                              src="/Taskopia_files/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp"
                              loading="lazy"
                              alt="
taskopia-testimonials-author-v1
" />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <img
                                  src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1" />
                              </div>
                            </div>
                            <div>
                              <div
                                style={{ "color": "rgb(255, 255, 255)" }}
                                className="rt-small-name rt-text-color-white">
                                Jonathan Keller<br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div
                            className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                            style={{ "color": "rgb(255, 255, 255)" }}>
                            â€œGood sales growthâ€
                          </div>
                          <p
                            style={{ "color": "rgb(178, 181, 187)" }}
                            className="rt-color-pale-periwinkle">
                            â€œThis tool transformed how our team works! Tasks are
                            organized, deadlines are clear, and collaboration is
                            smoother than ever. Productivity has never been this
                            high.â€
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="e50bdbcc-c9b9-cd03-fb94-1590517d3d79"
                        style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <img
                              src="/Taskopia_files/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v2" />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <img
                                  src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1" />
                              </div>
                            </div>
                            <div>
                              <div
                                style={{ "color": "rgb(255, 255, 255)" }}
                                className="rt-small-name rt-text-color-white">
                                Rebecca Lin
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div
                            className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                            style={{ "color": "rgb(255, 255, 255)" }}>
                            â€œFaster supportâ€
                          </div>
                          <p
                            style={{ "color": "rgb(178, 181, 187)" }}
                            className="rt-color-pale-periwinkle">
                            â€œAn absolute game-changer for project management. We
                            can track progress in real-time, avoid delays, and
                            deliver projects on schedule with less stress.â€
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="7e2b90dd-704d-b912-2008-7bbd45fa02ee"
                        style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <img
                              src="/Taskopia_files/68f2056835f743b2678916ad_taskopia-testimonials-author-v3.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v3" />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <img
                                  src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1" />
                              </div>
                            </div>
                            <div>
                              <div
                                style={{ "color": "rgb(255, 255, 255)" }}
                                className="rt-small-name rt-text-color-white">
                                Mark Wilson
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div
                            className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                            style={{ "color": "rgb(255, 255, 255)" }}>
                            â€œSmooth workflowâ€
                          </div>
                          <p
                            style={{ "color": "rgb(178, 181, 187)" }}
                            className="rt-color-pale-periwinkle">
                            â€œSimple, intuitive, and powerfulâ€”our team now
                            manages tasks without confusion. It keeps everyone
                            aligned and helps us achieve more in less time.â€
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rt-testimonials-v1-content" style={{}}>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="48f20dfa-b378-d7ab-bf3c-71188ca41842"
                        style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <img
                              src="/Taskopia_files/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp"
                              loading="lazy"
                              alt="
taskopia-testimonials-author-v1
" />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <img
                                  src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1" />
                              </div>
                            </div>
                            <div>
                              <div
                                style={{ "color": "rgb(255, 255, 255)" }}
                                className="rt-small-name rt-text-color-white">
                                Jonathan Keller<br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div
                            className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                            style={{ "color": "rgb(255, 255, 255)" }}>
                            â€œGood sales growthâ€
                          </div>
                          <p
                            style={{ "color": "rgb(178, 181, 187)" }}
                            className="rt-color-pale-periwinkle">
                            â€œThis tool transformed how our team works! Tasks are
                            organized, deadlines are clear, and collaboration is
                            smoother than ever. Productivity has never been this
                            high.â€
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="48f20dfa-b378-d7ab-bf3c-71188ca41854"
                        style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <img
                              src="/Taskopia_files/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v2" />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <img
                                  src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1" />
                              </div>
                            </div>
                            <div>
                              <div
                                style={{ "color": "rgb(255, 255, 255)" }}
                                className="rt-small-name rt-text-color-white">
                                Rebecca Lin
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div
                            className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                            style={{ "color": "rgb(255, 255, 255)" }}>
                            â€œFaster supportâ€
                          </div>
                          <p
                            style={{ "color": "rgb(178, 181, 187)" }}
                            className="rt-color-pale-periwinkle">
                            â€œAn absolute game-changer for project management. We
                            can track progress in real-time, avoid delays, and
                            deliver projects on schedule with less stress.â€
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="48f20dfa-b378-d7ab-bf3c-71188ca41865"
                        style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <img
                              src="/Taskopia_files/68f2056835f743b2678916ad_taskopia-testimonials-author-v3.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v3" />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <img
                                  src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1" />
                              </div>
                            </div>
                            <div>
                              <div
                                style={{ "color": "rgb(255, 255, 255)" }}
                                className="rt-small-name rt-text-color-white">
                                Mark Wilson
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div
                            className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                            style={{ "color": "rgb(255, 255, 255)" }}>
                            â€œSmooth workflowâ€
                          </div>
                          <p
                            style={{ "color": "rgb(178, 181, 187)" }}
                            className="rt-color-pale-periwinkle">
                            â€œSimple, intuitive, and powerfulâ€”our team now
                            manages tasks without confusion. It keeps everyone
                            aligned and helps us achieve more in less time.â€
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rt-testimonials-v1-content" style={{}}>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="0e0d7164-cc33-b3dc-839f-76cb328f3605"
                        style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <img
                              src="/Taskopia_files/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp"
                              loading="lazy"
                              alt="
taskopia-testimonials-author-v1
" />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <img
                                  src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1" />
                              </div>
                            </div>
                            <div>
                              <div
                                style={{ "color": "rgb(255, 255, 255)" }}
                                className="rt-small-name rt-text-color-white">
                                Jonathan Keller<br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div
                            className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                            style={{ "color": "rgb(255, 255, 255)" }}>
                            â€œGood sales growthâ€
                          </div>
                          <p
                            style={{ "color": "rgb(178, 181, 187)" }}
                            className="rt-color-pale-periwinkle">
                            â€œThis tool transformed how our team works! Tasks are
                            organized, deadlines are clear, and collaboration is
                            smoother than ever. Productivity has never been this
                            high.â€
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="0e0d7164-cc33-b3dc-839f-76cb328f3617"
                        style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <img
                              src="/Taskopia_files/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v2" />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <img
                                  src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1" />
                              </div>
                            </div>
                            <div>
                              <div
                                style={{ "color": "rgb(255, 255, 255)" }}
                                className="rt-small-name rt-text-color-white">
                                Rebecca Lin
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div
                            className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                            style={{ "color": "rgb(255, 255, 255)" }}>
                            â€œFaster supportâ€
                          </div>
                          <p
                            style={{ "color": "rgb(178, 181, 187)" }}
                            className="rt-color-pale-periwinkle">
                            â€œAn absolute game-changer for project management. We
                            can track progress in real-time, avoid delays, and
                            deliver projects on schedule with less stress.â€
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="0e0d7164-cc33-b3dc-839f-76cb328f3628"
                        style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <img
                              src="/Taskopia_files/68f2056835f743b2678916ad_taskopia-testimonials-author-v3.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v3" />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <img
                                  src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1" />
                              </div>
                            </div>
                            <div>
                              <div
                                style={{ "color": "rgb(255, 255, 255)" }}
                                className="rt-small-name rt-text-color-white">
                                Mark Wilson
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div
                            className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                            style={{ "color": "rgb(255, 255, 255)" }}>
                            â€œSmooth workflowâ€
                          </div>
                          <p
                            style={{ "color": "rgb(178, 181, 187)" }}
                            className="rt-color-pale-periwinkle">
                            â€œSimple, intuitive, and powerfulâ€”our team now
                            manages tasks without confusion. It keeps everyone
                            aligned and helps us achieve more in less time.â€
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rt-testimonials-overlay"></div>
                </div>
              </div>
              <div className="rt-testimonials-v1-overlay"></div>
            </div>
          </div>
        </section>
        <section className="rt-faq">
          <div className="w-layout-blockcontainer rt-faq-container w-container">
            <div className="rt-faq-content-main">
              <div className="w-layout-hflex rt-faq-heading-main">
                <div
                  className="w-layout-vflex rt-faq-heading-wrap rt-desktop-text-center">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde2d"
                      className="rt-sub-text rt-sub-gredient"
                      style={{ "opacity": "0" }}>
                      Frequently asked questions
                    </div>
                  </div>
                  <h2
                    data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde2f"
                    className="rt-no-margin"
                    style={{ "opacity": "0" }}>
                    Everything you want to know
                    <span className="rt-color-periwinkle-gray"
                    >explained clearly</span
                    >
                  </h2>
                </div>
              </div>
              <div
                data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde33"
                className="rt-faq-main rt-margin-auto"
                style={{ "opacity": "0" }}>
                <div
                  data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde34"
                  className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag rt-top-gap-of"
                  style={{ "backgroundColor": "rgba(0, 0, 0, 0)" }}>
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap">
                      <div className="rt-text-style-h6">
                        What is AI automation, and how does it work ?
                      </div>
                    </div>
                    <div className="rt-faq-right-part">
                      <div className="rt-faq-minus"></div>
                      <div
                        className="rt-faq-plus"
                        style={{ "transform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div>
                    </div>
                  </div>
                  <div
                    className="rt-faq-bottom-part rt-overflow-hidden"
                    style={{ "height": "0px" }}>
                    <div className="rt-faq-para-wrap">
                      <p className="rt-gap-off">
                        AI automation uses artificial intelligence to perform
                        repetitive tasks, analyze data, and optimize processes,
                        enabling businesses to save time, reduce errors, and make
                        smarter, faster decisions efficiently.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde42"
                  className="w-layout-vflex rt-faq-dropdown-wrap"
                  style={{ "backgroundColor": "rgba(0, 0, 0, 0)" }}>
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap">
                      <div className="rt-text-style-h6">
                        What types of tasks can be automated with AI ?
                      </div>
                    </div>
                    <div className="rt-faq-right-part">
                      <div className="rt-faq-minus"></div>
                      <div
                        className="rt-faq-plus"
                        style={{ "transform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div>
                    </div>
                  </div>
                  <div
                    className="rt-faq-bottom-part rt-overflow-hidden"
                    style={{ "height": "0px" }}>
                    <div className="rt-faq-para-wrap">
                      <p className="rt-no-margin">
                        AI can automate repetitive tasks like data entry, customer
                        support, report generation, inventory management, and
                        workflow optimization, allowing teams to focus on
                        strategic, high-value activities and business growth.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde50"
                  className="w-layout-vflex rt-faq-dropdown-wrap"
                  style={{ "backgroundColor": "rgba(0, 0, 0, 0)" }}>
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap">
                      <div className="rt-text-style-h6">
                        Is AI automation suitable for small businesses ?
                      </div>
                    </div>
                    <div className="rt-faq-right-part">
                      <div className="rt-faq-minus"></div>
                      <div
                        className="rt-faq-plus"
                        style={{ "transform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div>
                    </div>
                  </div>
                  <div
                    className="rt-faq-bottom-part rt-overflow-hidden"
                    style={{ "height": "0px" }}>
                    <div className="rt-faq-para-wrap">
                      <p className="rt-gap-off">
                        Yes, AI automation is ideal for small businesses. It
                        streamlines operations, reduces manual work, improves
                        efficiency, and provides actionable insights, helping
                        smaller teams compete and grow effectively.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde5e"
                  className="w-layout-vflex rt-faq-dropdown-wrap"
                  style={{ "backgroundColor": "rgba(0, 0, 0, 0)" }}>
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap">
                      <div className="rt-text-style-h6">
                        What industries benefit the most from AI automation?
                      </div>
                    </div>
                    <div className="rt-faq-right-part">
                      <div className="rt-faq-minus"></div>
                      <div
                        className="rt-faq-plus"
                        style={{ "transform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div>
                    </div>
                  </div>
                  <div
                    className="rt-faq-bottom-part rt-overflow-hidden"
                    style={{ "height": "0px" }}>
                    <div className="rt-faq-para-wrap">
                      <p className="rt-gap-off">
                        Industries like finance, healthcare, retail,
                        manufacturing, and logistics benefit greatly from AI
                        automation. It streamlines operations, reduces errors,
                        enhances customer service, and drives efficiency across
                        diverse business sectors.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde6c"
                  className="w-layout-vflex rt-faq-dropdown-wrap"
                  style={{ "backgroundColor": "rgba(0, 0, 0, 0)" }}>
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap">
                      <div className="rt-text-style-h6">
                        Can AI automation integrate with my existing tools?
                      </div>
                    </div>
                    <div className="rt-faq-right-part">
                      <div className="rt-faq-minus"></div>
                      <div
                        className="rt-faq-plus"
                        style={{ "transform": "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div>
                    </div>
                  </div>
                  <div
                    className="rt-faq-bottom-part rt-overflow-hidden"
                    style={{ "height": "0px" }}>
                    <div className="rt-faq-para-wrap">
                      <p className="rt-gap-off">
                        Absolutely. AI automation seamlessly integrates with your
                        existing tools and platforms, allowing workflows to
                        connect effortlessly, enhancing productivity, reducing
                        manual effort, and ensuring a smooth transition without
                        disrupting current operations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <section
        data-wf--rt-footer-v1--variant="white-version"
        className="rt-footer rt-color-change w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0 rt-position-relative">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div
            data-w-id="e6ec5761-f4fc-4af6-536f-a4c3f63a640a"
            className="rt-footer-wrap rt-position-relative">
            <div
              className="w-layout-grid rt-footer-link-grid w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
              <div
                id="w-node-e6ec5761-f4fc-4af6-536f-a4c3f63a640c-fe735dda"
                className="w-layout-vflex rt-footer-link-wrap">
                <div
                  className="rt-small-name rt-text-color-white w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                  Need help?
                </div>
                <div className="w-layout-vflex rt-footer-link-box rt-change">
                  <div
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                    <div
                      className="rt-text-color-white rt-color-change w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                      Call us directly
                    </div>
                    <a
                      href="tel:8884567890"
                      className="rt-text-color-white rt-bark w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0 rt-footer-link"
                    >(888) 456 7890</a
                    >
                  </div>
                  <div>
                    <div
                      className="rt-text-color-white rt-color-change w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                      Email us directly
                    </div>
                    <a
                      href="mailto:info@example.com"
                      className="rt-text-color-white rt-emil rt-color-blue w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0 rt-footer-link"
                    >info@example.com</a
                    >
                  </div>
                </div>
              </div>
              <div className="w-layout-vflex rt-footer-link-wrap">
                <div
                  className="rt-small-name rt-text-color-white w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                  Quick links
                </div>
                <div className="w-layout-vflex rt-footer-link-box">
                  <a
                    href="https://taskopia.webflow.io/home-one"
                    aria-current="page"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0 w--current"
                  >Home</a
                  ><a
                    href="https://taskopia.webflow.io/about"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                  >About </a
                  ><a
                    href="https://taskopia.webflow.io/blog-one"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                  >Blog</a
                  ><a
                    href="https://taskopia.webflow.io/service-one"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                  >Service</a
                  ><a
                    href="https://taskopia.webflow.io/pricing"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                  >Pricing</a
                  >
                </div>
              </div>
              <div className="w-layout-vflex rt-footer-link-wrap rt-border-none">
                <div
                  className="rt-small-name rt-text-color-white w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                  Utilities
                </div>
                <div className="w-layout-vflex rt-footer-link-box">
                  <a
                    href="https://taskopia.webflow.io/license"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                  >License</a
                  ><a
                    href="https://taskopia.webflow.io/style-guide"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                  >Style guide</a
                  ><a
                    href="https://taskopia.webflow.io/401"
                    target="_blank"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                  >Password protected</a
                  ><a
                    href="https://taskopia.webflow.io/404"
                    target="_blank"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                  >404</a
                  ><a
                    href="https://taskopia.webflow.io/changelog"
                    className="rt-footer-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                  >Changelog</a
                  >
                </div>
              </div>
              <div
                id="w-node-e6ec5761-f4fc-4af6-536f-a4c3f63a6430-fe735dda"
                className="w-layout-vflex rt-footer-link-main">
                <div className="w-layout-vflex rt-footer-text-wrap">
                  <div
                    className="rt-small-name rt-text-color-white w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                    Get in touch
                  </div>
                  <p
                    className="rt-color-pale-periwinkle w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0 rt-gap-off rt-gap">
                    <span
                      className="rt-text-color-white rt-bark w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
                    >Letâ€™s discuss your next project</span
                    >â€”connect with our team today for tailored solutions.
                  </p>
                </div>
                <div
                  className="rt-black-footer w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                  <a
                    data-w-id="c8a9123b-e737-6c41-a0a9-96ac3b2f975c"
                    href="tel:8884567890"
                    className="rt-button-body w-inline-block"
                  ><div
                    className="rt-button-text rt-blue-white"
                    style={{ "color": "rgb(255, 255, 255)" }}>
                      Schedule a call
                    </div>
                    <div
                      className="rt-button-body-overlay rt-blue-white"
                      style={{ "transform": "translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div
                    ></a>
                </div>
                <div
                  className="rt-white-footer w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                  <a
                    data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                    href="tel:8884567890"
                    className="rt-button-body w-inline-block"
                  ><div className="rt-button-text">Schedule a call</div>
                    <div
                      className="rt-button-body-overlay"
                      style={{ "transform": "translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div
                    ></a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-layout-hflex rt-footer-bottom-part">
            <a
              href="/"
              className="rt-navbar-logo rt-position-relative w-nav-brand"
            ><img
                width="191"
                height="40"
                alt=""
                src="/Taskopia_files/69269a3ea5e20bf6f3f40183_top logo.svg"
                loading="lazy" />
              <div className="rt-link-discernible">link<br />â€</div></a
            >
            <p
              className="rt-no-margin rt-color-pale-periwinkle w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0 rt-mobile-text-center">
              Designed by{" "}<a
                href="https://www.radianttemplates.com/"
                className="rt-bottom-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
              >Radiant Templates</a
              >, Powered by{" "}<a
                href="https://webflow.com/"
                className="rt-bottom-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"
              >Webflow</a
              >
            </p>
            <div className="rt-social-media">
              <div
                className="rt-color-pale-periwinkle w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0">
                Social media :
              </div>
              <a
                href="https://dribbble.com/"
                className="rt-sicial-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0 rt-position-relative rt-overflow-hidden w-inline-block"
              ><div className="rt-social-media-link">
                  <img
                    src="/Taskopia_files/6914525ddeeb169b19ad1aa4_Vector (29).svg"
                    loading="lazy"
                    alt=""
                    className="rt-nivert w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0" />
                </div>
                <div className="rt-link-discernible">link<br />â€</div></a
              ><a
                href="https://www.instagram.com/"
                className="rt-sicial-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0 rt-position-relative rt-overflow-hidden w-inline-block"
              ><div className="rt-social-media-link">
                  <img
                    src="/Taskopia_files/6914525d5095fa32d625e19c_Vector (30).svg"
                    loading="lazy"
                    alt=""
                    className="rt-nivert w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0" />
                </div>
                <div className="rt-link-discernible">link<br />â€</div></a
              ><a
                href="https://www.pinterest.com/"
                className="rt-sicial-link w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0 rt-position-relative rt-overflow-hidden w-inline-block"
              ><div className="rt-social-media-link">
                  <img
                    src="/Taskopia_files/6914525d8e53e345a9c4d809_Vector (31).svg"
                    loading="lazy"
                    alt=""
                    className="rt-nivert w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0" />
                </div>
                <div className="rt-link-discernible">link<br /></div></a
              >
            </div>
          </div>
        </div>
        <div
          className="rt-footer-bottom-line w-variant-4e53b383-59ff-12b8-0d77-36138c3c95c0"></div>
      </section>
    </>
  );
}
