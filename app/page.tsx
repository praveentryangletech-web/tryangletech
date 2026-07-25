"use client";
import React, { useEffect } from 'react';

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
      
    <div
      data-wf--rt-nav--variant="base"
      data-w-id="b07e93b6-139e-136c-8189-3251b36d9225"
      className="rt-top-nav rt-bg-color">
      <div
        data-w-id="b07e93b6-139e-136c-8189-3251b36d9226"
        data-animation="default"
        data-collapse="medium"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="rt-nav w-nav"
        style={{"willChange":"background","backgroundColor":"rgba(249, 251, 255, 0)"}}>
        <div
          className="w-layout-blockcontainer rt-container-nav rt-position-relative w-container">
          <div className="rt-navbar-wrapper rt-position-relative">
            <div className="rt-navbar-logo-wrap">
              <a
                href="/"
                className="rt-navbar-logo rt-position-relative w-nav-brand"
                aria-label="home"
                ><img
                  width="191"
                  height="40"
                  alt=""
                  src="/Taskopia_files/69269a3ea5e20bf6f3f40183_top logo.svg"
                  loading="lazy"
                  className="rt-auto-fit rt-desktop-image-full-width" />
                <div className="rt-link-discernible">link<br />â€</div></a
              >
            </div>
            <div className="w-layout-hflex rt-navbar-v1-menu-desktop">
              <div
                data-delay="300"
                data-hover="true"
                data-w-id="b07e93b6-139e-136c-8189-3251b36d922d"
                className="rt-navbar-dropdown w-dropdown"
                style={{}}>
                <div
                  className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                  id="w-dropdown-toggle-0"
                  aria-controls="w-dropdown-list-0"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  role="button"
                  tabIndex="0">
                  <div className="rt-menu-text">Home</div>
                  <div
                    className="rt-nav-menu-arrow-holder rt-position-relative"
                    style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}>
                    <img
                      width="10"
                      height="6"
                      alt="kloudera-home-one-navbar-dropdown-icon"
                      src="/Taskopia_files/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg"
                      loading="lazy" />
                  </div>
                </div>
                <nav
                  className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                  id="w-dropdown-list-0"
                  aria-labelledby="w-dropdown-toggle-0"
                  style={{"width":"100%","height":"0px"}}>
                  <a
                    href="/home-one"
                    aria-current="page"
                    className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link w--current"
                    tabIndex="0"
                    >Home one</a
                  ><a
                    href="/home-two"
                    className="rt-nav-menu-link w-dropdown-link"
                    tabIndex="0"
                    >Home two</a
                  ><a
                    href="/home-three"
                    className="rt-nav-menu-link rt-last w-dropdown-link"
                    tabIndex="0"
                    >Home three</a
                  >
                </nav>
              </div>
              <a
                href="/about"
                className="rt-navbar-dropdown-toggle w-inline-block"
                ><div className="rt-menu-text">About</div></a
              >
              <div
                data-delay="300"
                data-hover="true"
                data-w-id="b07e93b6-139e-136c-8189-3251b36d92ab"
                className="rt-navbar-dropdown w-dropdown"
                style={{}}>
                <div
                  className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                  id="w-dropdown-toggle-1"
                  aria-controls="w-dropdown-list-1"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  role="button"
                  tabIndex="0">
                  <div className="rt-menu-text">Service</div>
                  <div
                    className="rt-nav-menu-arrow-holder rt-position-relative"
                    style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}>
                    <img
                      width="10"
                      height="6"
                      alt="kloudera-home-one-navbar-dropdown-icon"
                      src="/Taskopia_files/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg"
                      loading="lazy" />
                  </div>
                </div>
                <nav
                  className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                  id="w-dropdown-list-1"
                  aria-labelledby="w-dropdown-toggle-1"
                  style={{"width":"100%","height":"0px"}}>
                  <a
                    href="https://taskopia.webflow.io/service-one"
                    className="rt-nav-menu-link rt-first w-dropdown-link"
                    tabIndex="0"
                    >Service one</a
                  ><a
                    href="https://taskopia.webflow.io/service-two"
                    className="rt-nav-menu-link w-dropdown-link"
                    tabIndex="0"
                    >Service two</a
                  ><a
                    href="https://taskopia.webflow.io/service-three"
                    className="rt-nav-menu-link rt-last w-dropdown-link"
                    tabIndex="0"
                    >Service three</a
                  >
                </nav>
              </div>
              <div
                data-delay="300"
                data-hover="true"
                data-w-id="b07e93b6-139e-136c-8189-3251b36d9247"
                className="rt-navber-dropdown rt-pages-dropdown w-dropdown"
                style={{}}>
                <div
                  className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                  id="w-dropdown-toggle-2"
                  aria-controls="w-dropdown-list-2"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  role="button"
                  tabIndex="0">
                  <div className="rt-menu-text">Pages</div>
                  <div
                    className="rt-nav-menu-arrow-holder rt-position-relative"
                    style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}>
                    <img
                      width="10"
                      height="6"
                      alt="kloudera-home-one-navbar-dropdown-icon"
                      src="/Taskopia_files/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg"
                      loading="lazy" />
                  </div>
                </div>
                <nav
                  className="rt-navbar-menu-dropdown rt-overflow-hidden rt-pages-menu w-dropdown-list"
                  id="w-dropdown-list-2"
                  aria-labelledby="w-dropdown-toggle-2"
                  style={{"width":"100%","height":"0px"}}>
                  <div className="w-layout-hflex rt-mega-menu-wrap">
                    <div className="w-layout-vflex rt-pages-menu-left">
                      <div className="w-layout-vflex rt-pages-menu-left-top">
                        <div>
                          <img
                            width="27"
                            height="39"
                            alt=""
                            src="/Taskopia_files/68ff54083b9a1440134bda1b_Vector 1557.svg"
                            loading="lazy"
                            className="rt-mega-menu-icon" />
                        </div>
                        <div className="rt-text-style-h6 rt-text-color-white">
                          Connect your favorite tools and apps seamlessly with
                          our AI agent
                        </div>
                      </div>
                      <div className="w-layout-hflex rt-pages-menu-left-button">
                        <a
                          data-wf--rt-border-button--variant="base"
                          data-w-id="9067a903-cf07-9614-de57-af0aba677203"
                          href="https://taskopia.webflow.io/service-one"
                          className="rt-button-body rt-nav-btn w-inline-block"
                          tabIndex="0"
                          ><div
                            className="rt-button-text rt-btn-color-nav"
                            style={{"color":"rgb(24, 51, 254)"}}>
                            See integrations
                          </div>
                          <div
                            className="rt-button-body-overlay rt-nav-overlay"
                            style={{"transform":"translate3d(0px, 100%, 0px)\n                                scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)\n                                rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div
                        ></a>
                      </div>
                    </div>
                    <div className="w-layout-hflex rt-pages-menu-wrap">
                      <div
                        className="w-layout-vflex rt-pages-menu-list-wrap border">
                        <a
                          href="https://taskopia.webflow.io/home-one"
                          data-w-id="b07e93b6-139e-136c-8189-3251b36d925d"
                          aria-current="page"
                          className="rt-pages-menu-link-wrap w-inline-block w--current"
                          tabIndex="0"
                          ><div className="w-layout-hflex rt-pages-menu-content">
                            <div>
                              <img
                                width="13"
                                height="14"
                                alt=""
                                src="/Taskopia_files/68ff46366a330717f35394ce_kloudera-mega-menu-icon.svg"
                                loading="lazy"
                                className="rt-pages-menu-icon" />
                            </div>
                            <div className="w-layout-vflex rt-pages-menu-link">
                              <div className="rt-nav-menu-link rt-padding-off">
                                Home page
                              </div>
                              <div
                                className="rt-pages-menu-small-text rt-text-medium">
                                Connect, collaborate and stay
                              </div>
                            </div>
                          </div>
                          <div>
                            <img
                              width="9"
                              height="8"
                              alt=""
                              src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                              loading="lazy"
                              className="rt-pages-menu-link-arrow" /></div></a
                        ><a
                          href="https://taskopia.webflow.io/about"
                          data-w-id="b07e93b6-139e-136c-8189-3251b36d9268"
                          className="rt-pages-menu-link-wrap w-inline-block"
                          tabIndex="0"
                          ><div className="w-layout-hflex rt-pages-menu-content">
                            <div>
                              <img
                                width="14"
                                height="14"
                                alt=""
                                src="/Taskopia_files/68ff46366a330717f35394d4_kloudera-mega-menu-icon.svg"
                                loading="lazy"
                                className="rt-pages-menu-icon" />
                            </div>
                            <div className="w-layout-vflex rt-pages-menu-link">
                              <div className="rt-nav-menu-link rt-padding-off">
                                About page
                              </div>
                              <div
                                className="rt-pages-menu-small-text rt-text-medium">
                                Learn about our story, mission
                              </div>
                            </div>
                          </div>
                          <div>
                            <img
                              width="9"
                              height="8"
                              alt=""
                              src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                              loading="lazy"
                              className="rt-pages-menu-link-arrow" /></div></a
                        ><a
                          href="https://taskopia.webflow.io/service-one"
                          data-w-id="b07e93b6-139e-136c-8189-3251b36d9273"
                          className="rt-pages-menu-link-wrap w-inline-block"
                          tabIndex="0"
                          ><div className="w-layout-hflex rt-pages-menu-content">
                            <div>
                              <img
                                width="14"
                                height="12"
                                alt=""
                                src="/Taskopia_files/68ff46366a330717f35394d3_kloudera-mega-menu-icon.svg"
                                loading="lazy"
                                className="rt-pages-menu-icon" />
                            </div>
                            <div className="w-layout-vflex rt-pages-menu-link">
                              <div className="rt-nav-menu-link rt-padding-off">
                                Service page
                              </div>
                              <div
                                className="rt-pages-menu-small-text rt-text-medium">
                                Explore our services effortlessly
                              </div>
                            </div>
                          </div>
                          <div>
                            <img
                              width="9"
                              height="8"
                              alt=""
                              src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                              loading="lazy"
                              className="rt-pages-menu-link-arrow" /></div></a
                        ><a
                          href="https://taskopia.webflow.io/blog-one"
                          data-w-id="b07e93b6-139e-136c-8189-3251b36d927e"
                          className="rt-pages-menu-link-wrap w-inline-block"
                          tabIndex="0"
                          ><div className="w-layout-hflex rt-pages-menu-content">
                            <div>
                              <img
                                width="14"
                                height="14"
                                alt=""
                                src="/Taskopia_files/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg"
                                loading="lazy"
                                className="rt-pages-menu-icon" />
                            </div>
                            <div className="w-layout-vflex rt-pages-menu-link">
                              <div className="rt-nav-menu-link rt-padding-off">
                                Blog page
                              </div>
                              <div
                                className="rt-pages-menu-small-text rt-text-medium">
                                Update the latest articles
                              </div>
                            </div>
                          </div>
                          <div>
                            <img
                              width="9"
                              height="8"
                              alt=""
                              src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                              loading="lazy"
                              className="rt-pages-menu-link-arrow" /></div
                        ></a>
                      </div>
                      <div className="w-layout-vflex rt-pages-menu-list-wrap">
                        <a
                          href="https://taskopia.webflow.io/contact"
                          data-w-id="b07e93b6-139e-136c-8189-3251b36d928a"
                          className="rt-pages-menu-link-wrap w-inline-block"
                          tabIndex="0"
                          ><div className="w-layout-hflex rt-pages-menu-content">
                            <div>
                              <img
                                width="13"
                                height="14"
                                alt=""
                                src="/Taskopia_files/68ff46366a330717f35394d2_kloudera-mega-menu-icon.svg"
                                loading="lazy"
                                className="rt-pages-menu-icon" />
                            </div>
                            <div className="w-layout-vflex rt-pages-menu-link">
                              <div className="rt-nav-menu-link rt-padding-off">
                                Contact page
                              </div>
                              <div
                                className="rt-pages-menu-small-text rt-text-medium">
                                Weâ€™re here to help you 24/7
                              </div>
                            </div>
                          </div>
                          <div>
                            <img
                              width="9"
                              height="8"
                              alt=""
                              src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                              loading="lazy"
                              className="rt-pages-menu-link-arrow" /></div></a
                        ><a
                          href="https://taskopia.webflow.io/pricing"
                          data-w-id="b07e93b6-139e-136c-8189-3251b36d9295"
                          className="rt-pages-menu-link-wrap w-inline-block"
                          tabIndex="0"
                          ><div className="w-layout-hflex rt-pages-menu-content">
                            <div>
                              <img
                                width="14"
                                height="14"
                                alt=""
                                src="/Taskopia_files/68ff46366a330717f35394c9_kloudera-mega-menu-icon.svg"
                                loading="lazy"
                                className="rt-pages-menu-icon" />
                            </div>
                            <div className="w-layout-vflex rt-pages-menu-link">
                              <div className="rt-nav-menu-link rt-padding-off">
                                Pricing page
                              </div>
                              <div
                                className="rt-pages-menu-small-text rt-text-medium">
                                Choose the option made for you
                              </div>
                            </div>
                          </div>
                          <div>
                            <img
                              width="9"
                              height="8"
                              alt=""
                              src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                              loading="lazy"
                              className="rt-pages-menu-link-arrow" /></div></a
                        ><a
                          href="https://taskopia.webflow.io/faq"
                          className="rt-pages-menu-link-wrap w-inline-block"
                          tabIndex="0"
                          ><div className="w-layout-hflex rt-pages-menu-content">
                            <div>
                              <img
                                width="14"
                                height="14"
                                alt=""
                                src="/Taskopia_files/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg"
                                loading="lazy"
                                className="rt-pages-menu-icon" />
                            </div>
                            <div className="w-layout-vflex rt-pages-menu-link">
                              <div className="rt-nav-menu-link rt-padding-off">
                                FAQ
                              </div>
                              <div
                                className="rt-pages-menu-small-text rt-text-medium">
                                Collaboration, trust, and shared goals
                              </div>
                            </div>
                          </div>
                          <div>
                            <img
                              width="9"
                              height="8"
                              alt=""
                              src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                              loading="lazy"
                              className="rt-pages-menu-link-arrow" /></div
                        ></a>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div
                data-delay="300"
                data-hover="true"
                data-w-id="b07e93b6-139e-136c-8189-3251b36d92b8"
                className="rt-navbar-dropdown w-dropdown"
                style={{}}>
                <div
                  className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                  id="w-dropdown-toggle-3"
                  aria-controls="w-dropdown-list-3"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  role="button"
                  tabIndex="0">
                  <div className="rt-menu-text">Blog</div>
                  <div
                    className="rt-nav-menu-arrow-holder rt-position-relative"
                    style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}>
                    <img
                      width="10"
                      height="6"
                      alt="kloudera-home-one-navbar-dropdown-icon"
                      src="/Taskopia_files/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg"
                      loading="lazy" />
                  </div>
                </div>
                <nav
                  className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                  id="w-dropdown-list-3"
                  aria-labelledby="w-dropdown-toggle-3"
                  style={{"width":"100%","height":"0px"}}>
                  <a
                    href="https://taskopia.webflow.io/blog-one"
                    className="rt-nav-menu-link rt-first w-dropdown-link"
                    tabIndex="0"
                    >Blog one</a
                  ><a
                    href="https://taskopia.webflow.io/blog-two"
                    className="rt-nav-menu-link w-dropdown-link"
                    tabIndex="0"
                    >Blog two</a
                  ><a
                    href="https://taskopia.webflow.io/blog-three"
                    className="rt-nav-menu-link w-dropdown-link"
                    tabIndex="0"
                    >Blog three</a
                  ><a
                    href="https://taskopia.webflow.io/blog-post/empowering-teams-through-structured-project-planning"
                    className="rt-nav-menu-link rt-last w-dropdown-link"
                    tabIndex="0"
                    >Blog post</a
                  >
                </nav>
              </div>
              <a
                href="https://taskopia.webflow.io/contact"
                className="rt-navbar-dropdown-toggle w-inline-block"
                ><div className="rt-menu-text">Contact</div></a
              >
            </div>
            <nav role="navigation" className="rt-navbar-v1-menu-mobile w-nav-menu">
              <div className="w-layout-vflex rt-mobile-menu-main">
                <div className="w-layout-vflex rt-mobile-menu-content-main">
                  <div className="rt-mobile-navbar">
                    <div
                      data-delay="300"
                      data-hover="true"
                      className="rt-navbar-dropdown w-dropdown"
                      style={{"maxWidth":"1750px"}}>
                      <div
                        className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                        id="w-dropdown-toggle-4"
                        aria-controls="w-dropdown-list-4"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        role="button"
                        tabIndex="0">
                        <div className="rt-menu-text">Home</div>
                        <div
                          className="rt-nav-menu-arrow-holder rt-position-relative">
                          <img
                            width="10"
                            height="6"
                            alt="kloudera-home-one-navbar-dropdown-icon"
                            src="/Taskopia_files/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg"
                            loading="lazy" />
                        </div>
                      </div>
                      <nav
                        className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                        id="w-dropdown-list-4"
                        aria-labelledby="w-dropdown-toggle-4">
                        <a
                          href="https://taskopia.webflow.io/home-one"
                          aria-current="page"
                          className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link w--current"
                          tabIndex="0"
                          >Home one</a
                        ><a
                          href="https://taskopia.webflow.io/home-two"
                          className="rt-nav-menu-link w-dropdown-link"
                          tabIndex="0"
                          >Home two</a
                        ><a
                          href="https://taskopia.webflow.io/home-three"
                          className="rt-nav-menu-link rt-last w-dropdown-link"
                          tabIndex="0"
                          >Home three</a
                        >
                      </nav>
                    </div>
                    <div
                      data-delay="300"
                      data-hover="true"
                      className="rt-navbar-dropdown w-dropdown"
                      style={{"maxWidth":"1750px"}}>
                      <div
                        className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                        id="w-dropdown-toggle-5"
                        aria-controls="w-dropdown-list-5"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        role="button"
                        tabIndex="0">
                        <div className="rt-menu-text">Service</div>
                        <div
                          className="rt-nav-menu-arrow-holder rt-position-relative">
                          <img
                            width="10"
                            height="6"
                            alt="kloudera-home-one-navbar-dropdown-icon"
                            src="/Taskopia_files/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg"
                            loading="lazy" />
                        </div>
                      </div>
                      <nav
                        className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                        id="w-dropdown-list-5"
                        aria-labelledby="w-dropdown-toggle-5">
                        <a
                          href="https://taskopia.webflow.io/service-one"
                          className="rt-nav-menu-link rt-first w-dropdown-link"
                          tabIndex="0"
                          >Service one</a
                        ><a
                          href="https://taskopia.webflow.io/service-two"
                          className="rt-nav-menu-link w-dropdown-link"
                          tabIndex="0"
                          >Service two</a
                        ><a
                          href="https://taskopia.webflow.io/service-three"
                          className="rt-nav-menu-link rt-last w-dropdown-link"
                          tabIndex="0"
                          >Service three</a
                        >
                      </nav>
                    </div>
                    <a
                      href="https://taskopia.webflow.io/about"
                      className="rt-navbar-dropdown-toggle w-inline-block"
                      ><div className="rt-menu-text">About</div></a
                    >
                    <div
                      data-delay="300"
                      data-hover="true"
                      className="rt-navbar-dropdown w-dropdown"
                      style={{"maxWidth":"1750px"}}>
                      <div
                        className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                        id="w-dropdown-toggle-6"
                        aria-controls="w-dropdown-list-6"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        role="button"
                        tabIndex="0">
                        <div className="rt-menu-text">Pages</div>
                        <div
                          className="rt-nav-menu-arrow-holder rt-position-relative">
                          <img
                            width="10"
                            height="6"
                            alt="kloudera-home-one-navbar-dropdown-icon"
                            src="/Taskopia_files/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg"
                            loading="lazy" />
                        </div>
                      </div>
                      <nav
                        className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                        id="w-dropdown-list-6"
                        aria-labelledby="w-dropdown-toggle-6">
                        <div
                          className="w-layout-hflex rt-pages-menu-wrap rt-padding">
                          <div
                            className="w-layout-vflex rt-pages-menu-list-wrap border">
                            <a
                              href="https://taskopia.webflow.io/home-one#"
                              data-w-id="b84e5def-8be0-c77c-84d1-4421928068bb"
                              className="rt-pages-menu-link-wrap w-inline-block"
                              tabIndex="0"
                              ><div
                                className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <img
                                    width="13"
                                    height="14"
                                    alt=""
                                    src="/Taskopia_files/68ff46366a330717f35394ce_kloudera-mega-menu-icon.svg"
                                    loading="lazy"
                                    className="rt-pages-menu-icon" />
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">
                                    Home page
                                  </div>
                                  <div
                                    className="rt-pages-menu-small-text rt-text-medium">
                                    Connect, collaborate and stay
                                  </div>
                                </div>
                              </div>
                              <div>
                                <img
                                  width="9"
                                  height="8"
                                  alt=""
                                  src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                                  loading="lazy"
                                  className="rt-pages-menu-link-arrow" /></div></a
                            ><a
                              href="https://taskopia.webflow.io/about"
                              data-w-id="b84e5def-8be0-c77c-84d1-4421928068c6"
                              className="rt-pages-menu-link-wrap w-inline-block"
                              tabIndex="0"
                              ><div
                                className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <img
                                    width="14"
                                    height="14"
                                    alt=""
                                    src="/Taskopia_files/68ff46366a330717f35394d4_kloudera-mega-menu-icon.svg"
                                    loading="lazy"
                                    className="rt-pages-menu-icon" />
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">
                                    About page
                                  </div>
                                  <div
                                    className="rt-pages-menu-small-text rt-text-medium">
                                    Learn about our story, mission
                                  </div>
                                </div>
                              </div>
                              <div>
                                <img
                                  width="9"
                                  height="8"
                                  alt=""
                                  src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                                  loading="lazy"
                                  className="rt-pages-menu-link-arrow" /></div></a
                            ><a
                              href="https://taskopia.webflow.io/service-one"
                              data-w-id="b84e5def-8be0-c77c-84d1-4421928068d1"
                              className="rt-pages-menu-link-wrap w-inline-block"
                              tabIndex="0"
                              ><div
                                className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <img
                                    width="14"
                                    height="12"
                                    alt=""
                                    src="/Taskopia_files/68ff46366a330717f35394d3_kloudera-mega-menu-icon.svg"
                                    loading="lazy"
                                    className="rt-pages-menu-icon" />
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">
                                    Service page
                                  </div>
                                  <div
                                    className="rt-pages-menu-small-text rt-text-medium">
                                    Explore our services effortlessly
                                  </div>
                                </div>
                              </div>
                              <div>
                                <img
                                  width="9"
                                  height="8"
                                  alt=""
                                  src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                                  loading="lazy"
                                  className="rt-pages-menu-link-arrow" /></div></a
                            ><a
                              href="https://taskopia.webflow.io/blog-one"
                              data-w-id="b84e5def-8be0-c77c-84d1-4421928068dc"
                              className="rt-pages-menu-link-wrap w-inline-block"
                              tabIndex="0"
                              ><div
                                className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <img
                                    width="14"
                                    height="14"
                                    alt=""
                                    src="/Taskopia_files/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg"
                                    loading="lazy"
                                    className="rt-pages-menu-icon" />
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">
                                    Blog page
                                  </div>
                                  <div
                                    className="rt-pages-menu-small-text rt-text-medium">
                                    Update the latest articles
                                  </div>
                                </div>
                              </div>
                              <div>
                                <img
                                  width="9"
                                  height="8"
                                  alt=""
                                  src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                                  loading="lazy"
                                  className="rt-pages-menu-link-arrow" /></div
                            ></a>
                          </div>
                          <div
                            className="w-layout-vflex rt-pages-menu-list-wrap rt-padding">
                            <a
                              href="https://taskopia.webflow.io/contact"
                              data-w-id="b84e5def-8be0-c77c-84d1-4421928068e8"
                              className="rt-pages-menu-link-wrap w-inline-block"
                              tabIndex="0"
                              ><div
                                className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <img
                                    width="13"
                                    height="14"
                                    alt=""
                                    src="/Taskopia_files/68ff46366a330717f35394d2_kloudera-mega-menu-icon.svg"
                                    loading="lazy"
                                    className="rt-pages-menu-icon" />
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">
                                    Contact page
                                  </div>
                                  <div
                                    className="rt-pages-menu-small-text rt-text-medium">
                                    Weâ€™re here to help you 24/7
                                  </div>
                                </div>
                              </div>
                              <div>
                                <img
                                  width="9"
                                  height="8"
                                  alt=""
                                  src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                                  loading="lazy"
                                  className="rt-pages-menu-link-arrow" /></div></a
                            ><a
                              href="https://taskopia.webflow.io/pricing"
                              data-w-id="b84e5def-8be0-c77c-84d1-4421928068f3"
                              className="rt-pages-menu-link-wrap w-inline-block"
                              tabIndex="0"
                              ><div
                                className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <img
                                    width="14"
                                    height="14"
                                    alt=""
                                    src="/Taskopia_files/68ff46366a330717f35394c9_kloudera-mega-menu-icon.svg"
                                    loading="lazy"
                                    className="rt-pages-menu-icon" />
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">
                                    Pricing page
                                  </div>
                                  <div
                                    className="rt-pages-menu-small-text rt-text-medium">
                                    Choose the option made for you
                                  </div>
                                </div>
                              </div>
                              <div>
                                <img
                                  width="9"
                                  height="8"
                                  alt=""
                                  src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                                  loading="lazy"
                                  className="rt-pages-menu-link-arrow" /></div></a
                            ><a
                              href="https://taskopia.webflow.io/faq"
                              className="rt-pages-menu-link-wrap w-inline-block"
                              tabIndex="0"
                              ><div
                                className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <img
                                    width="14"
                                    height="14"
                                    alt=""
                                    src="/Taskopia_files/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg"
                                    loading="lazy"
                                    className="rt-pages-menu-icon" />
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">
                                    FAQ
                                  </div>
                                  <div
                                    className="rt-pages-menu-small-text rt-text-medium">
                                    Collaboration, trust, and shared goals
                                  </div>
                                </div>
                              </div>
                              <div>
                                <img
                                  width="9"
                                  height="8"
                                  alt=""
                                  src="/Taskopia_files/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg"
                                  loading="lazy"
                                  className="rt-pages-menu-link-arrow" /></div
                            ></a>
                          </div>
                        </div>
                      </nav>
                    </div>
                    <div
                      data-delay="300"
                      data-hover="true"
                      className="rt-navbar-dropdown w-dropdown"
                      style={{"maxWidth":"1750px"}}>
                      <div
                        className="rt-navbar-dropdown-toggle shadow-varient-41 rt-bottom w-dropdown-toggle"
                        id="w-dropdown-toggle-7"
                        aria-controls="w-dropdown-list-7"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        role="button"
                        tabIndex="0">
                        <div className="rt-menu-text">Blog</div>
                        <div
                          className="rt-nav-menu-arrow-holder rt-position-relative">
                          <img
                            width="10"
                            height="6"
                            alt="kloudera-home-one-navbar-dropdown-icon"
                            src="/Taskopia_files/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg"
                            loading="lazy" />
                        </div>
                      </div>
                      <nav
                        className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                        id="w-dropdown-list-7"
                        aria-labelledby="w-dropdown-toggle-7">
                        <a
                          href="https://taskopia.webflow.io/blog-one"
                          className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link"
                          tabIndex="0"
                          >Blog one</a
                        ><a
                          href="https://taskopia.webflow.io/blog-two"
                          className="rt-nav-menu-link w-dropdown-link"
                          tabIndex="0"
                          >Blog two</a
                        ><a
                          href="https://taskopia.webflow.io/blog-three"
                          className="rt-nav-menu-link w-dropdown-link"
                          tabIndex="0"
                          >Blog three</a
                        ><a
                          href="https://taskopia.webflow.io/blog-post/empowering-teams-through-structured-project-planning"
                          className="rt-nav-menu-link shadow-varient-59 rt-last w-dropdown-link"
                          tabIndex="0"
                          >Blog post</a
                        >
                      </nav>
                    </div>
                    <a
                      href="https://taskopia.webflow.io/contact"
                      className="rt-navbar-dropdown-toggle rt-bottom w-inline-block"
                      ><div className="rt-menu-text">Contact</div></a
                    >
                  </div>
                  <div className="rt-mobile-menu-button-wrap">
                    <a
                      href="https://taskopia.webflow.io/sign-in"
                      target="_blank"
                      className="rt-button-v1-main rt-position-relative w-inline-block"
                      ><div className="rt-button-v1">
                        <div className="rt-button-text">Sign in</div>
                      </div>
                      <div className="rt-button-overlay"></div></a
                    ><a
                      href="https://taskopia.webflow.io/sign-up"
                      target="_blank"
                      className="rt-button-v1-main rt-position-relative background-white-5 w-inline-block"
                      ><div className="rt-button-v1 background-white-6">
                        <div className="rt-button-text rt-btn-color">Sign up</div>
                      </div>
                      <div className="rt-button-overlay background-white-8"></div
                    ></a>
                  </div>
                </div>
                <div className="w-layout-vflex rt-mobile-menu-bottom-part">
                  <div className="w-layout-vflex rt-mobile-menu-llink-main">
                    <div className="rt-text-style-h5">Follow us</div>
                    <div className="w-layout-hflex rt-social-link-wrap">
                      <a
                        href="https://www.instagram.com/"
                        className="rt-mega-menu-icon w-inline-block"
                        ><img
                          width="10"
                          height="18"
                          alt="Kloudera-team-icon"
                          src="/Taskopia_files/68ff46366a330717f35394cc_Kloudera-team-icon.svg"
                          loading="lazy" /></a
                      ><a
                        href="https://x.com/"
                        className="rt-mega-menu-icon w-inline-block"
                        ><img
                          width="14"
                          height="14"
                          alt=""
                          src="/Taskopia_files/68ff46366a330717f35394d6_kloudera-mega-menu-icon.svg"
                          loading="lazy" /></a
                      ><a
                        href="https://www.linkedin.com/"
                        className="rt-mega-menu-icon w-inline-block"
                        ><img
                          width="14"
                          height="15"
                          alt=""
                          src="/Taskopia_files/68ff46366a330717f35394d7_kloudera-mega-menu-icon.svg"
                          loading="lazy" /></a
                      ><a
                        href="https://www.facebook.com/"
                        className="rt-mega-menu-icon w-inline-block"
                        ><img
                          width="10"
                          height="18"
                          alt=""
                          src="/Taskopia_files/68ff46366a330717f35394d0_Kloudera-team-icon.svg"
                          loading="lazy"
                      /></a>
                    </div>
                  </div>
                  <div className="w-layout-vflex rt-mobile-menu-link-text-mian">
                    <a href="tel:8884567890" className="rt-text-style-h5"
                      >(888) 456 7890</a
                    ><a href="mailto:info@example.com" className="rt-text-style-h5"
                      >info@example.com<br
                    /></a>
                  </div>
                </div>
              </div>
            </nav>
            <div
              data-w-id="b07e93b6-139e-136c-8189-3251b36d939b"
              className="rt-menu-button-main w-nav-button"
              style={{"WebkitUserSelect":"text"}}
              aria-label="menu"
              role="button"
              tabIndex="0"
              aria-controls="w-nav-overlay-0"
              aria-haspopup="menu"
              aria-expanded="false">
              <div
                className="rt-menu-line rt-top-line"
                style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div>
              <div
                className="rt-menu-line rt-middle-line"
                style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div>
              <div
                className="rt-menu-line rt-bottom-line"
                style={{"width":"11px","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div>
            </div>
            <div
              className="w-layout-hflex rt-navbar-button-wrap rt-tab-display-none">
              <div className="rt-signin-wrap">
                <a
                  href="https://taskopia.webflow.io/sign-in"
                  target="_blank"
                  className="rt-menu-text rt-navbar-signin"
                  >Sign in</a
                >
              </div>
              <a
                data-wf--rt-border-button--variant="padding"
                data-w-id="9067a903-cf07-9614-de57-af0aba677203"
                href="https://taskopia.webflow.io/contact"
                className="rt-button-body rt-nav-btn w-variant-1b2d9ec2-3fdd-1f2f-c0ef-d11a45cf51a4 w-inline-block"
                ><div
                  className="rt-button-text rt-btn-color-nav"
                  style={{"color":"rgb(24, 51, 254)"}}>
                  Start free trial
                </div>
                <div
                  className="rt-button-body-overlay rt-nav-overlay"
                  style={{"transform":"translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                      rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div
              ></a>
            </div>
          </div>
        </div>
        <div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
      </div>
      <div
        className="rt-nav-shadows rt-opacite-on"
        style={{"willChange":"opacity","opacity":"0"}}></div>
    </div>
    <main>
      <div
        data-w-id="41edf69b-8081-d913-a5ae-b2e1fc472d6d"
        className="rt-hero-v1-wrapper">
        <section className="rt-hero-v1">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-hero-v1-top rt-position-relative">
              <div
                data-w-id="1bb7f8ea-2102-9ec6-ec01-b82b664fd3a3"
                style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
                className="rt-hero-v1-top-sub">
                <div className="rt-overflow-hidden">
                  <div className="w-layout-hflex rt-hero-v2-client-img-wrap">
                    <div
                      data-w-id="1bb7f8ea-2102-9ec6-ec01-b82b664fd3a6"
                      style={{"opacity":"0"}}
                      className="rt-hero-v2-client-image rt-overflow-hidden rt-sub-image">
                      <img
                        width="62"
                        height="47"
                        alt="Kloudera-home-two-hero-image"
                        src="/Taskopia_files/690499e17ce0c344a20ecda1_kloudera-home-two-hero-image.webp"
                        loading="lazy" />
                    </div>
                    <div
                      data-w-id="1bb7f8ea-2102-9ec6-ec01-b82b664fd3a8"
                      style={{"opacity":"0"}}
                      className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left rt-sub-image">
                      <img
                        width="59.5"
                        height="79"
                        alt="Kloudera-home-two-hero-image"
                        src="/Taskopia_files/690499e17ce0c344a20ecda2_kloudera-home-two-hero-image.webp"
                        loading="lazy" />
                    </div>
                    <div
                      data-w-id="1bb7f8ea-2102-9ec6-ec01-b82b664fd3aa"
                      style={{"opacity":"0"}}
                      className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left rt-sub-image">
                      <img
                        width="59.5"
                        height="79"
                        alt="Kloudera-home-two-hero-image"
                        src="/Taskopia_files/690499e17ce0c344a20ecda3_kloudera-home-two-hero-image.webp"
                        loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="rt-overflow-hidden">
                  <div
                    data-w-id="1bb7f8ea-2102-9ec6-ec01-b82b664fd3ad"
                    style={{"opacity":"0"}}
                    className="rt-sub-text rt-sub-gredient">
                    Task management
                  </div>
                </div>
              </div>
              <div className="rt-hero-heading-gap">
                <div className="rt-overflow-hidden">
                  <h1
                    data-w-id="06744b7e-7ec6-335a-be04-940831b89e5e"
                    style={{"opacity":"0"}}
                    className="rt-gap-off">
                    Simplify workflows, boost team productivity daily
                  </h1>
                </div>
              </div>
              <div className="rt-overflow-hidden">
                <p
                  data-w-id="1497d66d-9c00-ed45-6339-d76f8f3ac76c"
                  style={{"opacity":"0"}}
                  className="rt-hero-v1-top-padding rt-gap-off">
                  Our sales SaaS platform transforms raw data into actionable
                  strategies, helping your team identify opportunities, shorten
                  sales cycles, and maximize revenue.
                </p>
              </div>
              <div
                data-w-id="573d8b58-e477-bda2-3b16-571fb8963934"
                style={{"opacity":"0"}}
                className="rt-button-para-gap rt-overflow-hidden">
                <a
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href="https://taskopia.webflow.io/home-one#"
                  className="rt-button-body w-inline-block"
                  ><div className="rt-button-text">Get started today</div>
                  <div
                    className="rt-button-body-overlay"
                    style={{"transform":"translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div
                ></a>
              </div>
              <div
                data-w-id="8797da1e-594a-f957-cceb-2c4c7590d8d0"
                style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
                className="rt-small-btn-wrap rt-hero-v1-small">
                <div
                  className="rt-small-btn-main"
                  style={{"transform":"translate3d(3.888px, 6.5008px, 0px)\n                      scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                      skew(0deg, 0deg)","transformStyle":"preserve-3d","willChange":"transform"}}>
                  <div className="rt-small-btn-text">Workflow</div>
                  <div className="rt-btn-arrow-v2 rt-hero-v1-small">
                    <img
                      src="/Taskopia_files/6904842a6f63d7e69353dc60_Vector 503 (1).svg"
                      loading="lazy"
                      alt="small icon" />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{"transform":"translate3d(0px, 0%, 0px) scale3d(1, 1, 1)\n                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
              className="rt-hero-v1-bottom">
              <div className="rt-hero-v1-image rt-overflow-hidden">
                <img
                  src="/Taskopia_files/6915c8033293ed4e29e1f4ac_taskopia-hero-one-dashbord.avif"
                  loading="lazy"
                  alt="taskopia-hero-one-dashbord"
                  height="669" />
              </div>
              <div className="rt-hero-v1-icon-1 rt-icon-on" style={{"opacity":"1"}}>
                <img
                  src="/Taskopia_files/68ee3ab6b5f54ab84d4db94a_Group 2085663558.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-hero-v1-line-1">
                <div style={{"width":"100%"}} className="rt-hero-v1-line-animation">
                  <img
                    src="/Taskopia_files/68ee2bfe9c7b10140a71bd60_Vector 1519.webp"
                    loading="lazy"
                    width="427"
                    alt="taskopia-home-one-line-1"
                    className="rt-image-none rt-line-opacity" />
                </div>
              </div>
              <div className="rt-hero-v1-line-2">
                <div
                  className="rt-hero-v1-line-animation rt-two"
                  style={{"width":"100%"}}>
                  <img
                    src="/Taskopia_files/68ee2bfe85f7babff365e15f_Vector 1518.png"
                    loading="lazy"
                    width="427"
                    sizes="(max-width: 479px) 100vw, 427px"
                    alt="taskopia-home-one-line-2"
                    srcSet="
                      https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68ee2bfe85f7babff365e15f_Vector%201518-p-500.png 500w,
                      https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68ee2bfe85f7babff365e15f_Vector%201518-p-800.png 800w,
                      https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68ee2bfe85f7babff365e15f_Vector%201518.png       944w
                    "
                    className="rt-image-none rt-line-opacity" />
                </div>
              </div>
              <div className="rt-hero-v1-icon-2 rt-icon-on" style={{"opacity":"1"}}>
                <img
                  src="/Taskopia_files/68ee3ab6b92d21cdec042a92_Group 2085663559.svg"
                  loading="lazy"
                  alt="icon home page 2" />
              </div>
              <div className="rt-hero-v1-icon-3 rt-icon-on" style={{"opacity":"1"}}>
                <img
                  src="/Taskopia_files/68ee3ab607d07e6601123425_Group 2085663558 (1).svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-hero-v1-icon-4 rt-icon-on" style={{"opacity":"1"}}>
                <img
                  src="/Taskopia_files/68ee3ab6bb15da9c1d725533_Group 2085663559 (1).svg"
                  loading="lazy"
                  alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <section
        data-w-id="33bf6bb3-0554-1366-8305-2e53564f5f47"
        className="rt-hero-one rt-overflow-hidden rt-position-relative">
        <div className="rt-hero-left">
          <div className="rt-hero-left-main rt-v1-right rt-position-relative">
            <div
              data-w-id="0acd96ca-bfb3-bd5b-e440-e99d65cefba1"
              style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
              className="rt-hero-v1-top-sub rt-new-v1">
              <div className="rt-overflow-hidden">
                <div className="w-layout-hflex rt-hero-v2-client-img-wrap">
                  <div
                    data-w-id="0acd96ca-bfb3-bd5b-e440-e99d65cefba4"
                    style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
                    className="rt-hero-v2-client-image rt-overflow-hidden rt-sub-image">
                    <img
                      width="62"
                      height="47"
                      alt="Kloudera-home-two-hero-image"
                      src="/Taskopia_files/690499e17ce0c344a20ecda1_kloudera-home-two-hero-image.webp"
                      loading="lazy" />
                  </div>
                  <div
                    data-w-id="0acd96ca-bfb3-bd5b-e440-e99d65cefba6"
                    style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
                    className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left rt-sub-image">
                    <img
                      width="59.5"
                      height="79"
                      alt="Kloudera-home-two-hero-image"
                      src="/Taskopia_files/690499e17ce0c344a20ecda2_kloudera-home-two-hero-image.webp"
                      loading="lazy" />
                  </div>
                  <div
                    data-w-id="0acd96ca-bfb3-bd5b-e440-e99d65cefba8"
                    style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
                    className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left rt-sub-image">
                    <img
                      width="59.5"
                      height="79"
                      alt="Kloudera-home-two-hero-image"
                      src="/Taskopia_files/690499e17ce0c344a20ecda3_kloudera-home-two-hero-image.webp"
                      loading="lazy" />
                  </div>
                </div>
              </div>
              <div className="rt-overflow-hidden">
                <div className="rt-sub-text rt-sub-gredient">Task management</div>
              </div>
            </div>
            <div className="rt-hero-heading-gap rt-hero-v1-heading">
              <h1
                data-w-id="ef1f9141-e4bb-a298-b149-76d6978dacc2"
                style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
                className="rt-gap-off">
                Optimize workflows to elevate daily team performance
              </h1>
            </div>
            <div>
              <p
                data-w-id="1d876f18-26a3-336f-b6ab-3d690004f57b"
                style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
                className="rt-hero-v1-top-padding rt-gap-off">
                Our sales SaaS platform transforms raw data into actionable
                strategies, helping your team identify opportunities, shorten
                sales cycles, and maximize revenue.
              </p>
            </div>
            <div className="rt-overflow-hidden">
              <div
                data-w-id="33bf6bb3-0554-1366-8305-2e53564f5f56"
                style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                    rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
                className="rt-button-para-gap rt-hero-between">
                <a
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href="https://taskopia.webflow.io/contact"
                  className="rt-button-body w-inline-block"
                  ><div className="rt-button-text">Get started today</div>
                  <div
                    className="rt-button-body-overlay"
                    style={{"transform":"translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div
                ></a>
                <div className="rt-hero-v1-call">
                  <div>
                    <img
                      src="/Taskopia_files/691aa59bf2f2a3f94a847b78_call (1).svg"
                      loading="lazy"
                      alt="" />
                  </div>
                  <div>
                    <div>Call us directly</div>
                    <a href="tel:8884567890">(888) 456 7890</a>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-w-id="aae1e6a7-80d7-3238-cdeb-1bfb3f770633"
              style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
              className="rt-small-btn-wrap rt-hero-v1-small rt-home-1">
              <div
                className="rt-small-btn-main"
                style={{"transform":"translate3d(3.888px, 6.5008px, 0px)\n                    scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                    skew(0deg, 0deg)","transformStyle":"preserve-3d","willChange":"transform"}}>
                <div className="rt-small-btn-text">Workflow</div>
                <div className="rt-btn-arrow-v2 rt-hero-v1-small">
                  <img
                    src="/Taskopia_files/6904842a6f63d7e69353dc60_Vector 503 (1).svg"
                    loading="lazy"
                    alt="small icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-w-id="33bf6bb3-0554-1366-8305-2e53564f5f88"
          style={{"opacity":"1","transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)\n              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
          className="rt-hero-right-v1">
          <img
            width="1078"
            height="604"
            alt="taskopiya-home-two"
            src="/Taskopia_files/6915c70b7c1f18f1e46e5094_taskopiya-home-two.avif"
            loading="lazy" />
        </div>
        <div
          className="rt-hero-v1-box-1"
          style={{"willChange":"transform","transform":"translate3d(0px, 0px, 0px) scale3d(0.699, 0.699, 1)\n              rotateX(0deg) rotateY(0deg) rotateZ(31.893deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}>
          <img
            src="/Taskopia_files/68ee3ab607d07e6601123425_Group 2085663558 (1).svg"
            loading="lazy"
            alt="" />
        </div>
        <div
          className="rt-hero-v1-box-2"
          style={{"willChange":"transform","transform":"translate3d(0px, 0px, 0px) scale3d(0.699, 0.699, 1)\n              rotateX(0deg) rotateY(0deg) rotateZ(-23deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}>
          <img
            src="/Taskopia_files/68ee3ab6b92d21cdec042a92_Group 2085663559.svg"
            loading="lazy"
            alt="icon home page 2" />
        </div>
      </section>
      <section
        data-w-id="3e30973f-044d-0121-e360-b687a00c9974"
        className="rt-marquee-v1">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-text-marquee-wrapper rt-overflow-hidden">
            <div className="rt-text-marquee-train" style={{}}>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef27127d946b9cb9fdcbce_logo.svg"
                  loading="lazy"
                  width="100"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef271276a33d103013fa46_Group 1597884750.svg"
                  loading="lazy"
                  alt="" />
              </div>
            </div>
            <div className="rt-text-marquee-train" style={{}}>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef27127d946b9cb9fdcbce_logo.svg"
                  loading="lazy"
                  width="100"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef271276a33d103013fa46_Group 1597884750.svg"
                  loading="lazy"
                  alt="" />
              </div>
            </div>
            <div className="rt-text-marquee-train" style={{}}>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef27127d946b9cb9fdcbce_logo.svg"
                  loading="lazy"
                  width="100"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                  loading="lazy"
                  alt="" />
              </div>
              <div className="rt-text-marquee-iteme">
                <img
                  src="/Taskopia_files/68ef271276a33d103013fa46_Group 1597884750.svg"
                  loading="lazy"
                  alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rt-our-benefits">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div
            className="rt-our-benefits-heading rt-overflow-hidden rt-heading-bottom-gap">
            <div
              data-w-id="94cc7c6d-9925-8a1a-3c65-1eff2c96a244"
              style={{"opacity":"0"}}
              className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">our benefits</div>
            </div>
            <h2
              data-w-id="f0268362-b169-cd10-f941-4e79335712bd"
              style={{"opacity":"0"}}
              className="rt-gap-off rt-desktop-text-center">
              Seamless teamwork, smarter tasks,
              <span className="rt-color-periwinkle-gray">better outcomes</span>
            </h2>
          </div>
          <div className="rt-our-benefits-content">
            <div
              data-w-id="1bc7296a-24a6-bd97-87ee-3d85a7896859"
              style={{"opacity":"0"}}
              className="rt-our-benefits-content-top">
              <div
                data-w-id="155a4225-1961-a25b-5242-d08a1ed5d33b"
                className="rt-our-benefits-one-top">
                <div className="rt-card-top-text">
                  <div className="rt-overflow-hidden">
                    <div className="rt-sub-text rt-sub-gredient rt-text-size">
                      Centralized Workspace
                    </div>
                  </div>
                  <div className="rt-overflow-hidden">
                    <div className="rt-text-style-h6">
                      One platform for every task and project
                    </div>
                  </div>
                </div>
                <div className="rt-our-benefits-one-animation">
                  <div
                    data-w-id="94e17314-daf6-c72f-7b0e-213605327473"
                    className="rt-our-benefits-btn-one rt-btn-1"
                    style={{"opacity":"0"}}>
                    <div className="rt-small-size">Project tracking</div>
                  </div>
                  <div
                    data-w-id="9bea13b0-69c4-8d2c-7e84-8c2e19fd3196"
                    className="rt-our-benefits-btn-one rt-button-2"
                    style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d","opacity":"0"}}>
                    <div className="rt-small-size rt-text-color-white">
                      Seamless team
                    </div>
                  </div>
                  <div
                    data-w-id="d4e837ca-4c7c-4a4f-6f99-e781ed4c0aab"
                    className="rt-our-benefits-btn-one rt-button-3"
                    style={{"opacity":"0"}}>
                    <div className="rt-small-size">Custom Workflows</div>
                  </div>
                  <div
                    data-w-id="a04517a8-fc82-b735-ef19-7d7ca9b1e21d"
                    className="rt-our-benefits-btn-one rt-button-4"
                    style={{"opacity":"0"}}>
                    <div className="rt-small-size">Integrated tools</div>
                  </div>
                  <div
                    className="rt-benefite-line rt-overflow-hidden"
                    style={{"width":"0%"}}>
                    <img
                      src="/Taskopia_files/68ef3247af262fa1f91a61c0_Vector 1522.png"
                      loading="lazy"
                      width="280"
                      alt="line section" />
                  </div>
                  <div
                    data-w-id="c4d71f34-66b2-085e-99cc-0943fd0ea377"
                    className="rt-our-benefits-btn-one rt-button-5"
                    style={{"opacity":"0"}}>
                    <div className="rt-small-size">Centralized task</div>
                  </div>
                  <div className="rt-benefit-line-two">
                    <div
                      className="rt-benefit-line-two-main rt-overflow-hidden"
                      style={{"height":"0%"}}>
                      <img
                        src="/Taskopia_files/68ef33fcf7932467a4b60157_Group 2085663558.png"
                        loading="lazy"
                        width="193"
                        height="111"
                        alt="line animation 1"
                        className="rt-image-none rt--benefit-v1" />
                    </div>
                  </div>
                </div>
                <div className="rt-overflow-hidden">
                  <p className="rt-our-benefits-para-top rt-gap-off">
                    Keep all your projects, tasks, files, and conversations in
                    one organized hub. With a centralized workspace.
                  </p>
                </div>
              </div>
              <div className="rt-our-benefits-two-top rt-overflow-hidden">
                <div className="rt-card-top-text">
                  <div className="rt-overflow-hidden">
                    <div className="rt-overflow-hidden">
                      <div
                        data-w-id="2c6a32ff-96b2-42b1-ba01-35d7cc1f0046"
                        style={{"opacity":"0"}}
                        className="rt-sub-text rt-sub-gredient rt-text-size">
                        Seamless Collaboration
                      </div>
                    </div>
                  </div>
                  <div className="rt-overflow-hidden">
                    <div
                      data-w-id="2c6a32ff-96b2-42b1-ba01-35d7cc1f0048"
                      style={{"opacity":"0"}}
                      className="rt-text-style-h6">
                      A workflow designed to fit your style
                    </div>
                  </div>
                </div>
                <div className="rt-our-benefits-two-animation">
                  <div
                    data-w-id="b975fa27-f23e-e4dd-d931-87645a58fe34"
                    style={{"opacity":"0"}}
                    className="rt-our-benefits-two-inner">
                    <img
                      src="/Taskopia_files/68ef3bbf83aee6efac6613df_Group 1597884841.webp"
                      loading="lazy"
                      alt="taskopiya-home-one-project-task"
                      className="rt-width-height-full" />
                  </div>
                  <div className="rt-our-benefits-two-inner-two rt-overflow-hidden">
                    <img
                      src="/Taskopia_files/68ef377edc986166df11074b_Group 2085663258.webp"
                      loading="lazy"
                      alt="taskopiya-home-one-task-list"
                      className="rt-width-height-full" />
                  </div>
                </div>
              </div>
            </div>
            <div
              data-w-id="24a71980-4382-0547-3f30-a2d457fef4bd"
              style={{"opacity":"0"}}
              className="rt-our-benefits-content-bottom">
              <div className="rt-our-benefits-one-bottom rt-overflow-hidden">
                <div className="rt-our-benefits-one-wrap">
                  <div className="rt-our-benefits-gap-3">
                    <div className="rt-text-style-h6">Boosted productivity</div>
                  </div>
                  <div
                    data-w-id="d919edb7-1114-6397-f57a-a2c6d2775464"
                    className="rt-inimation-benefits-one-bottom">
                    <div className="rt-bg-benefits-one-bottom">
                      <div>
                        <img
                          src="/Taskopia_files/68ef47dea5804b0aa8577340_Rectangle 17425.png"
                          loading="lazy"
                          alt="Rectangle 17425" />
                      </div>
                    </div>
                    <div className="rt-inner-benefits-one-bottom" style={{}}>
                      <img
                        src="/Taskopia_files/68ef4883307654f50142573b_Group 1597884847 (1).png"
                        loading="lazy"
                        alt="taskopia-home-one-project-rate" />
                    </div>
                  </div>
                </div>
                <p className="rt-gap-off">
                  Boost productivity by organizing tasks, setting clear
                  priorities, automating routine work.
                </p>
              </div>
              <div
                data-w-id="1c6222f6-a97f-fefb-0d46-bedad32c97e7"
                className="rt-our-benefits-one-bottom rt-padding rt-overflow-hidden">
                <div className="rt-small-heading-para-gap">
                  <div className="rt-text-style-h6">Data-driven insights</div>
                </div>
                <div className="rt-2-bg">
                  <img
                    src="/Taskopia_files/68ef4ad94cb3129a087eda8d_Mask group.webp"
                    loading="lazy"
                    alt="
Mask group
"
                    className="rt-width-height-full" />
                </div>
                <p className="rt-gap-off">
                  Gain complete visibility your teamâ€™s performance with
                  real-time analytics and reports .
                </p>
                <div className="rt-our-benefits-two-bottom-content">
                  <div
                    data-w-id="2187d097-913e-2499-2082-25f0715b0e13"
                    className="rt-our-benefits-icon-1 rt-one"
                    style={{"opacity":"0"}}>
                    <img
                      src="/Taskopia_files/68ef4b9ab808dc747717c5d6_Group 2085663558 (2).svg"
                      loading="lazy"
                      alt="" />
                  </div>
                  <div
                    data-w-id="84b6d843-6f9b-68bd-8035-505fad5d588e"
                    className="rt-our-benefits-icon-1 rt-two"
                    style={{"opacity":"0"}}>
                    <img
                      src="/Taskopia_files/68ef4b9b16930aefa632d7c9_Group 2085663559 (2).svg"
                      loading="lazy"
                      alt="" />
                  </div>
                  <div
                    data-w-id="61b710c7-6458-88a3-fed5-92078587dacc"
                    className="rt-our-benefits-icon-wrap-2"
                    style={{"opacity":"0"}}>
                    <div className="rt-shadow rt-radius-full">
                      <img
                        src="/Taskopia_files/68ef4b9b221f1b7f58d6d9fb_Group 2085663560.svg"
                        loading="lazy"
                        alt=""
                        className="rt-width-height-full" />
                    </div>
                    <div className="rt-shadow rt-radius-full">
                      <img
                        src="/Taskopia_files/68ef4b9b6238a6ea761cb446_Group 2085663561.svg"
                        loading="lazy"
                        alt=""
                        className="rt-width-height-full" />
                    </div>
                    <div className="rt-shadow rt-radius-full">
                      <img
                        src="/Taskopia_files/68ef4bc6e4f0293dcb39fe86_Group 2085663561 (1).svg"
                        loading="lazy"
                        alt=""
                        className="rt-width-height-full" />
                    </div>
                  </div>
                  <div
                    className="rt-our-benefits-two-bottom-line rt-overflow-hidden"
                    style={{"width":"0%"}}>
                    <img
                      src="/Taskopia_files/68ef4b9a87704a2661be1351_Group 2085663562.svg"
                      loading="lazy"
                      width="200"
                      alt=""
                      className="rt-image-none r--benefit-v4-img" />
                  </div>
                </div>
              </div>
              <div
                className="rt-our-benefits-one-bottom rt-padding rt-2 rt-overflow-hidden">
                <div className="rt-small-heading-para-gap">
                  <div className="rt-text-style-h6">Deadline tracking</div>
                </div>
                <p className="rt-gap-off">
                  Stay on top of every milestone with smart deadline tracking.
                </p>
                <div className="rt-our-benefits-three-bottom">
                  <div>
                    <img
                      src="/Taskopia_files/68ef5a7f624607e5d90b671e_Subtract.webp"
                      loading="lazy"
                      width="362"
                      alt="Subtract" />
                  </div>
                  <div
                    data-w-id="7c8a7acf-2849-d94b-d213-0bc0279e96cb"
                    className="rt-small-btn-wrap">
                    <div className="rt-small-btn-main" style={{}}>
                      <div className="rt-small-btn-text">Tracking</div>
                      <div className="rt-btn-arrow-v2">
                        <img
                          src="/Taskopia_files/68ef5d8e21f7535e98837c04_Vector 503.svg"
                          loading="lazy"
                          alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rt-our-benefits-text">
                  <div className="rt-our-benefits-three-bottom-text">
                    <div className="rt-small-box"></div>
                    <div className="rt-color-dark-indigo">Automated reminders</div>
                  </div>
                  <div className="rt-our-benefits-three-bottom-text">
                    <div className="rt-small-box rt-change"></div>
                    <div className="rt-color-dark-indigo">Real-time progress</div>
                  </div>
                  <div className="rt-our-benefits-three-bottom-text">
                    <div className="rt-small-box rt-change-2"></div>
                    <div className="rt-color-dark-indigo">Visual timelines</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rt-about-v1">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-about-v1-wrapper">
            <div
              data-w-id="7f0fa30b-3b22-eb95-178c-a03559ed5c7a"
              style={{"opacity":"0"}}
              className="rt-about-v1-left">
              <div
                data-w-id="ff0a139f-98ea-ffdb-dd98-ba887e27c7b1"
                style={{"opacity":"0"}}>
                <img
                  src="/Taskopia_files/68ef7bedcf795a787addad8c_Group 2085663562.webp"
                  loading="lazy"
                  alt=""
                  className="rt-width-height-full" />
              </div>
              <div
                data-w-id="dde1b63a-3928-b16b-6972-084ad79fec04"
                style={{"opacity":"0"}}>
                <img
                  src="/Taskopia_files/68ef7bed775c847e27d93569_Group 2085663563.webp"
                  loading="lazy"
                  alt="taskopia-hero-one-dashbord-daily"
                  className="rt-width-height-full" />
              </div>
            </div>
            <div className="rt-about-v1-right">
              <div
                data-w-id="4edacbd8-6b56-f889-45a6-f171ca5873b4"
                style={{"opacity":"0"}}
                className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">who we are</div>
              </div>
              <div className="rt-heading-para-gap">
                <h2
                  data-w-id="e56a7671-e1ec-e100-8312-33edf2c12738"
                  style={{"opacity":"0"}}
                  className="rt-gap-off">
                  Reduce errors streamline work,
                  <span className="rt-color-periwinkle-gray">stay productive</span>
                </h2>
              </div>
              <p
                data-w-id="9409f12c-9c7e-cee4-4344-eb53953739fe"
                style={{"opacity":"0"}}
                className="rt-gap-off">
                Experience simplified task management with intuitive tools
                designed to remove friction. Keep work organized, accelerate
                progress.
              </p>
              <div className="rt-about-v1-right-inner">
                <div
                  data-w-id="bb09800e-4a4e-6e34-85a6-12c87a12f13f"
                  style={{"opacity":"0"}}
                  className="rt-about-v1-right-item">
                  <div className="rt-about-v1-right-item-icon">
                    <img
                      src="/Taskopia_files/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                      loading="lazy"
                      alt="" />
                  </div>
                  <p className="rt-gap-off">
                    <span className="rt-color-dark-indigo"
                      >Consistent performance:</span
                    >
                    {" "}Ensures smooth, reliable output for every task,
                    helping teams maintain accuracy and stability.
                  </p>
                </div>
                <div
                  data-w-id="c70e8fec-520b-f71e-2e11-c83017c1d6eb"
                  style={{"width":"0%"}}
                  className="rt-about-v1-right-line"></div>
                <div
                  data-w-id="09ab31ad-e88f-ce65-e18d-db54c7228b6d"
                  style={{"opacity":"0"}}
                  className="rt-about-v1-right-item rt-bottom-padding-of">
                  <div className="rt-about-v1-right-item-icon">
                    <img
                      src="/Taskopia_files/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                      loading="lazy"
                      alt="" />
                  </div>
                  <p className="rt-gap-off">
                    <span className="rt-color-dark-indigo"
                      >Data-driven decisions:</span
                    >
                    {" "}Offers clear insights that support smarter choices and
                    improve overall decision quality.
                  </p>
                </div>
              </div>
              <div
                data-w-id="3a13a58c-8b59-09d0-895e-d85627d01dae"
                style={{"opacity":"0"}}
                className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                <a
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href="https://taskopia.webflow.io/contact"
                  className="rt-button-body w-inline-block"
                  ><div className="rt-button-text">Get started today</div>
                  <div
                    className="rt-button-body-overlay"
                    style={{"transform":"translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div
                ></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rt-why-choose-v1">
        <div
          className="w-layout-blockcontainer rt-container-extra-large w-container">
          <div className="rt-why-choose-v1-wrapper">
            <div className="rt-why-choose-v1-content">
              <div className="rt-testimonials-v1-top rt-heading-bottom-gap">
                <div
                  data-w-id="657bd2a2-86bd-d868-77e3-fda88540fe8e"
                  style={{"opacity":"0"}}
                  className="rt-sub-gap">
                  <div className="rt-sub-text rt-sub-gredient">why choose us</div>
                </div>
                <div
                  data-w-id="07416d34-f69b-c50c-b2bc-d9952d15faca"
                  style={{"opacity":"0"}}>
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
                    style={{"opacity":"0"}}>
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
                    style={{"width":"0%"}}></div>
                  <div
                    data-w-id="f3ef8d6b-3999-964f-e18a-fb715340ebb2"
                    className="rt-why-choose-v1-left-item"
                    style={{"opacity":"0"}}>
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
                  style={{"opacity":"0"}}
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
                    style={{"opacity":"0"}}>
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
                    style={{"width":"0%"}}></div>
                  <div
                    data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf84"
                    className="rt-why-choose-v1-left-item"
                    style={{"opacity":"0"}}>
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
                  style={{"opacity":"0"}}
                  className="rt-sub-text rt-sub-gredient">
                  Collaboration Section
                </div>
              </div>
              <div className="rt-heading-para-gap">
                <h2
                  data-w-id="fa389f03-d668-fc21-92b7-625895f0f1cd"
                  style={{"opacity":"0"}}
                  className="rt-gap-off">
                  One platform to connect, collaborate
                  <span className="rt-color-periwinkle-gray">and deliver</span>
                </h2>
              </div>
              <p
                data-w-id="01cd9f60-c08f-a44e-7306-8a24c776e67e"
                style={{"opacity":"0"}}
                className="rt-gap-off">
                Bring your team, tasks, and tools together in one spaceâ€”making
                collaboration seamless and project delivery faster than ever.
              </p>
              <div className="rt-collaboration-left-inner">
                <div
                  data-w-id="756057e3-d2c7-74cf-9fc4-d890fe38f192"
                  style={{"opacity":"0"}}
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
                  style={{"width":"0%"}}></div>
                <div
                  data-w-id="7bbb7d70-219f-6add-8d17-19c31521a7bc"
                  style={{"opacity":"0"}}
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
                    style={{"transform":"translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div
                ></a>
              </div>
            </div>
            <div className="rt-collaboration-v1-right">
              <div className="rt-collaboration-v1-right-top">
                <div
                  data-w-id="ae8cc4e1-ef96-bdcf-a4f1-2f55a386306b"
                  style={{"opacity":"0"}}
                  className="rt-collaboration-v1-right-one">
                  <img
                    src="/Taskopia_files/68f21b4dc6a06a6abe39c79b_taskopia-Collaboration-one.webp"
                    loading="lazy"
                    alt="taskopia-Collaboration-one" />
                </div>
                <div
                  data-w-id="6e37c1de-f32a-f8b2-a948-1302911adaed"
                  style={{"opacity":"0"}}
                  className="rt-collaboration-v1-right-two">
                  <img
                    src="/Taskopia_files/68f21b3af8e5e0af23ce678d_taskopia-Collaboration-two.webp"
                    loading="lazy"
                    alt="taskopia-Collaboration-two" />
                </div>
              </div>
              <div
                data-w-id="5f4e3a0f-8628-ed34-e438-68eb6dc94db3"
                style={{"opacity":"0"}}
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
              style={{"opacity":"0"}}
              className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">integration</div>
            </div>
            <h2
              data-w-id="938155cb-3e23-0427-eb61-f0e0e334e537"
              style={{"opacity":"0"}}
              className="rt-gap-off rt-desktop-text-center">
              Seamless teamwork, smarter tasks,
              <span className="rt-color-periwinkle-gray">better outcomes</span>
            </h2>
          </div>
          <div
            data-w-id="9f1e9f9b-80b7-3274-d862-dfd856e9ef3b"
            className="rt-integration-v1-wrap">
            <div
              style={{"transform":"translate3d(0px, 0px, 0px) scale3d(0.4, 0.4, 1)\n                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)","transformStyle":"preserve-3d"}}
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
            <div style={{"opacity":"0"}} className="rt-integration-icon-wrap rt-1">
              <div>
                <img
                  src="/Taskopia_files/68f23486208c840a16db162e_taskopia-integration-icon-1.svg"
                  loading="lazy"
                  width="18.5"
                  alt="taskopia-integration-icon-1" />
              </div>
            </div>
            <div style={{"opacity":"0"}} className="rt-integration-icon-wrap rt-2">
              <div>
                <img
                  src="/Taskopia_files/68f23486c96e19be1a0fd550_taskopia-integration-icon-3.svg"
                  loading="lazy"
                  width="18.5"
                  alt="taskopia-integration-icon-3" />
              </div>
            </div>
            <div style={{"opacity":"0"}} className="rt-integration-icon-wrap rt-3">
              <div>
                <img
                  src="/Taskopia_files/68f2348699aef274cbcbee3e_taskopia-integration-icon-2.svg"
                  loading="lazy"
                  width="18.5"
                  alt="taskopia-integration-icon-2" />
              </div>
            </div>
            <div style={{"opacity":"0"}} className="rt-integration-icon-wrap rt-4">
              <div>
                <img
                  src="/Taskopia_files/68f23486208c840a16db162e_taskopia-integration-icon-1.svg"
                  loading="lazy"
                  width="18.5"
                  alt="taskopia-integration-icon-1" />
              </div>
            </div>
            <div style={{"opacity":"0"}} className="rt-integration-icon-wrap rt-5">
              <div>
                <img
                  src="/Taskopia_files/68f23486b959a4ffa7a97ffd_taskopia-integration-icon-4.svg"
                  loading="lazy"
                  width="18.5"
                  alt="taskopia-integration-icon-4" />
              </div>
            </div>
            <div style={{"opacity":"0"}} className="rt-integration-icon-wrap rt-6">
              <div>
                <img
                  src="/Taskopia_files/68f234862949c40075dc6633_taskopia-integration-icon-5.svg"
                  loading="lazy"
                  width="18.5"
                  alt="taskopia-integration-icon-5" />
              </div>
            </div>
            <div style={{"opacity":"0"}} className="rt-integration-icon-wrap rt-7">
              <div>
                <img
                  src="/Taskopia_files/68f234867a335089a7a018ec_taskopia-integration-icon-6.svg"
                  loading="lazy"
                  width="18.5"
                  alt="taskopia-integration-icon-6" />
              </div>
            </div>
            <div style={{"opacity":"0"}} className="rt-integration-icon-wrap rt-8">
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
              style={{"width":"0%"}}>
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
              style={{"width":"0%"}}>
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
                  style={{"opacity":"0"}}
                  className="rt-sub-gap">
                  <div className="rt-sub-text">our testimonials</div>
                </div>
                <div className="rt-overflow-hidden">
                  <h2
                    data-w-id="a23714eb-edfa-8381-582b-b2a0c38b7434"
                    style={{"opacity":"0"}}
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
                      style={{"backgroundColor":"rgba(255, 255, 255, 0.098)"}}
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
                              style={{"color":"rgb(255, 255, 255)"}}
                              className="rt-small-name rt-text-color-white">
                              Jonathan Keller<br />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-testimonials-v1-item-inner">
                        <div
                          className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                          style={{"color":"rgb(255, 255, 255)"}}>
                          â€œGood sales growthâ€
                        </div>
                        <p
                          style={{"color":"rgb(178, 181, 187)"}}
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
                      style={{"backgroundColor":"rgba(255, 255, 255, 0.098)"}}
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
                              style={{"color":"rgb(255, 255, 255)"}}
                              className="rt-small-name rt-text-color-white">
                              Rebecca Lin
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-testimonials-v1-item-inner">
                        <div
                          className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                          style={{"color":"rgb(255, 255, 255)"}}>
                          â€œFaster supportâ€
                        </div>
                        <p
                          style={{"color":"rgb(178, 181, 187)"}}
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
                      style={{"backgroundColor":"rgba(255, 255, 255, 0.098)"}}
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
                              style={{"color":"rgb(255, 255, 255)"}}
                              className="rt-small-name rt-text-color-white">
                              Mark Wilson
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-testimonials-v1-item-inner">
                        <div
                          className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                          style={{"color":"rgb(255, 255, 255)"}}>
                          â€œSmooth workflowâ€
                        </div>
                        <p
                          style={{"color":"rgb(178, 181, 187)"}}
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
                      style={{"backgroundColor":"rgba(255, 255, 255, 0.098)"}}
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
                              style={{"color":"rgb(255, 255, 255)"}}
                              className="rt-small-name rt-text-color-white">
                              Jonathan Keller<br />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-testimonials-v1-item-inner">
                        <div
                          className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                          style={{"color":"rgb(255, 255, 255)"}}>
                          â€œGood sales growthâ€
                        </div>
                        <p
                          style={{"color":"rgb(178, 181, 187)"}}
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
                      style={{"backgroundColor":"rgba(255, 255, 255, 0.098)"}}
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
                              style={{"color":"rgb(255, 255, 255)"}}
                              className="rt-small-name rt-text-color-white">
                              Rebecca Lin
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-testimonials-v1-item-inner">
                        <div
                          className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                          style={{"color":"rgb(255, 255, 255)"}}>
                          â€œFaster supportâ€
                        </div>
                        <p
                          style={{"color":"rgb(178, 181, 187)"}}
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
                      style={{"backgroundColor":"rgba(255, 255, 255, 0.098)"}}
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
                              style={{"color":"rgb(255, 255, 255)"}}
                              className="rt-small-name rt-text-color-white">
                              Mark Wilson
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-testimonials-v1-item-inner">
                        <div
                          className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                          style={{"color":"rgb(255, 255, 255)"}}>
                          â€œSmooth workflowâ€
                        </div>
                        <p
                          style={{"color":"rgb(178, 181, 187)"}}
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
                      style={{"backgroundColor":"rgba(255, 255, 255, 0.098)"}}
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
                              style={{"color":"rgb(255, 255, 255)"}}
                              className="rt-small-name rt-text-color-white">
                              Jonathan Keller<br />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-testimonials-v1-item-inner">
                        <div
                          className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                          style={{"color":"rgb(255, 255, 255)"}}>
                          â€œGood sales growthâ€
                        </div>
                        <p
                          style={{"color":"rgb(178, 181, 187)"}}
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
                      style={{"backgroundColor":"rgba(255, 255, 255, 0.098)"}}
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
                              style={{"color":"rgb(255, 255, 255)"}}
                              className="rt-small-name rt-text-color-white">
                              Rebecca Lin
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-testimonials-v1-item-inner">
                        <div
                          className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                          style={{"color":"rgb(255, 255, 255)"}}>
                          â€œFaster supportâ€
                        </div>
                        <p
                          style={{"color":"rgb(178, 181, 187)"}}
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
                      style={{"backgroundColor":"rgba(255, 255, 255, 0.098)"}}
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
                              style={{"color":"rgb(255, 255, 255)"}}
                              className="rt-small-name rt-text-color-white">
                              Mark Wilson
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-testimonials-v1-item-inner">
                        <div
                          className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                          style={{"color":"rgb(255, 255, 255)"}}>
                          â€œSmooth workflowâ€
                        </div>
                        <p
                          style={{"color":"rgb(178, 181, 187)"}}
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
                    style={{"opacity":"0"}}>
                    Frequently asked questions
                  </div>
                </div>
                <h2
                  data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde2f"
                  className="rt-no-margin"
                  style={{"opacity":"0"}}>
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
              style={{"opacity":"0"}}>
              <div
                data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde34"
                className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag rt-top-gap-of"
                style={{"backgroundColor":"rgba(0, 0, 0, 0)"}}>
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
                      style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div>
                  </div>
                </div>
                <div
                  className="rt-faq-bottom-part rt-overflow-hidden"
                  style={{"height":"0px"}}>
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
                style={{"backgroundColor":"rgba(0, 0, 0, 0)"}}>
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
                      style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div>
                  </div>
                </div>
                <div
                  className="rt-faq-bottom-part rt-overflow-hidden"
                  style={{"height":"0px"}}>
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
                style={{"backgroundColor":"rgba(0, 0, 0, 0)"}}>
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
                      style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div>
                  </div>
                </div>
                <div
                  className="rt-faq-bottom-part rt-overflow-hidden"
                  style={{"height":"0px"}}>
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
                style={{"backgroundColor":"rgba(0, 0, 0, 0)"}}>
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
                      style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div>
                  </div>
                </div>
                <div
                  className="rt-faq-bottom-part rt-overflow-hidden"
                  style={{"height":"0px"}}>
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
                style={{"backgroundColor":"rgba(0, 0, 0, 0)"}}>
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
                      style={{"transform":"translate3d(0px, 0px, 0px) scale3d(1, 1, 1)\n                          rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                          skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div>
                  </div>
                </div>
                <div
                  className="rt-faq-bottom-part rt-overflow-hidden"
                  style={{"height":"0px"}}>
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
                    style={{"color":"rgb(255, 255, 255)"}}>
                    Schedule a call
                  </div>
                  <div
                    className="rt-button-body-overlay rt-blue-white"
                    style={{"transform":"translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div
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
                    style={{"transform":"translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)","transformStyle":"preserve-3d"}}></div
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
              <div className="rt-link-discernible">link<br />â€</div></a
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
