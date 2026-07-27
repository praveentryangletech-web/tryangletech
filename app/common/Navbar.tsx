"use client";
import React from 'react';
import Link from 'next/link';

const NAV_ASSETS = '/Taskopia_files';

export default function Navbar() {
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
          style={{  }}>
          <div className="w-layout-blockcontainer rt-container-nav rt-position-relative w-container">
            <div className="rt-navbar-wrapper rt-position-relative">

              {/* ── Logo ── */}
              <div className="rt-navbar-logo-wrap">
                <a
                  href="/"
                  className="rt-navbar-logo rt-position-relative w-nav-brand"
                  aria-label="home">
                  <img
                    width="191"
                    height="40"
                    alt="Taskopia logo"
                    src={`${NAV_ASSETS}/69269a3ea5e20bf6f3f40183_top logo.svg`}
                    loading="lazy"
                    className="rt-auto-fit rt-desktop-image-full-width" />
                  <div className="rt-link-discernible">link<br />&#x200D;</div>
                </a>
              </div>

              {/* ── Desktop Menu ── */}
              <div className="w-layout-hflex rt-navbar-v1-menu-desktop">

                {/* Home dropdown */}
                <div
                  data-delay="300"
                  data-hover="true"
                  data-w-id="b07e93b6-139e-136c-8189-3251b36d922d"
                  className="rt-navbar-dropdown w-dropdown">
                  <div
                    className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                    id="w-dropdown-toggle-0"
                    aria-controls="w-dropdown-list-0"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}>
                    <Link href="/" className="rt-menu-text" style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>Home</Link>
                    <div
                      className="rt-nav-menu-arrow-holder rt-position-relative">
                      <img
                        width="10"
                        height="6"
                        alt="dropdown arrow"
                        src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`}
                        loading="lazy" />
                    </div>
                  </div>
                  <nav
                    className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                    id="w-dropdown-list-0"
                    aria-labelledby="w-dropdown-toggle-0"
                    style={{ width: "100%", height: "0px" }}>
                    <a href="/" className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link" tabIndex={0}>Home one</a>
                    <a href="/home-two" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Home two</a>
                    <a href="#" className="rt-nav-menu-link rt-last w-dropdown-link" tabIndex={0}>Home three</a>
                  </nav>
                </div>

                {/* About */}
                <a href="/about" className="rt-navbar-dropdown-toggle w-inline-block">
                  <div className="rt-menu-text">About</div>
                </a>

                {/* Service dropdown */}
                <div
                  data-delay="300"
                  data-hover="true"
                  data-w-id="b07e93b6-139e-136c-8189-3251b36d92ab"
                  className="rt-navbar-dropdown w-dropdown">
                  <div
                    className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                    id="w-dropdown-toggle-1"
                    aria-controls="w-dropdown-list-1"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}>
                    <Link href="/service" className="rt-menu-text" style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>Service</Link>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative">
                      <img
                        width="10"
                        height="6"
                        alt="dropdown arrow"
                        src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`}
                        loading="lazy" />
                    </div>
                  </div>
                  <nav
                    className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                    id="w-dropdown-list-1"
                    aria-labelledby="w-dropdown-toggle-1"
                    style={{ width: "100%", height: "0px" }}>
                    <a href="/service/service-one" className="rt-nav-menu-link rt-first w-dropdown-link" tabIndex={0}>Service one</a>
                    <a href="/service/service-two" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Service two</a>
                    <a href="/service/service-three" className="rt-nav-menu-link rt-last w-dropdown-link" tabIndex={0}>Service three</a>
                  </nav>
                </div>

                {/* Pages Mega Menu dropdown */}
                <div
                  data-delay="300"
                  data-hover="true"
                  data-w-id="b07e93b6-139e-136c-8189-3251b36d9247"
                  className="rt-navber-dropdown rt-pages-dropdown w-dropdown">
                  <div
                    className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                    id="w-dropdown-toggle-2"
                    aria-controls="w-dropdown-list-2"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}>
                    <div className="rt-menu-text">Pages</div>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative">
                      <img
                        width="10"
                        height="6"
                        alt="dropdown arrow"
                        src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`}
                        loading="lazy" />
                    </div>
                  </div>
                  <nav
                    className="rt-navbar-menu-dropdown rt-overflow-hidden rt-pages-menu w-dropdown-list"
                    id="w-dropdown-list-2"
                    aria-labelledby="w-dropdown-toggle-2"
                    style={{ width: "100%", height: "0px" }}>
                    <div className="w-layout-hflex rt-mega-menu-wrap">
                      <div className="w-layout-vflex rt-pages-menu-left">
                        <div className="w-layout-vflex rt-pages-menu-left-top">
                          <div>
                            <img
                              width="27"
                              height="39"
                              alt=""
                              src={`${NAV_ASSETS}/68ff54083b9a1440134bda1b_Vector 1557.svg`}
                              loading="lazy"
                              className="rt-mega-menu-icon" />
                          </div>
                          <div className="rt-text-style-h6 rt-text-color-white">
                            Connect your favorite tools and apps seamlessly with our AI agent
                          </div>
                        </div>
                        <div className="w-layout-hflex rt-pages-menu-left-button">
                          <a
                            data-wf--rt-border-button--variant="base"
                            data-w-id="9067a903-cf07-9614-de57-af0aba677203"
                            href="/service/service-one"
                            className="rt-button-body rt-nav-btn w-inline-block"
                            tabIndex={0}>
                            <div className="rt-button-text rt-btn-color-nav">See integrations</div>
                            <div className="rt-button-body-overlay rt-nav-overlay"></div>
                          </a>
                        </div>
                      </div>
                      <div className="w-layout-hflex rt-pages-menu-wrap">
                        {/* Left column */}
                        <div className="w-layout-vflex rt-pages-menu-list-wrap">
                          {/* Home page */}
                          <a href="/" data-w-id="b07e93b6-139e-136c-8189-3251b36d925d" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <img width="13" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394ce_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Home page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Connect, collaborate and stay</div>
                              </div>
                            </div>
                            <div>
                              <img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </a>
                          {/* About page */}
                          <a href="/about" data-w-id="b07e93b6-139e-136c-8189-3251b36d9268" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <img width="14" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d4_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">About page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Learn about our story, mission</div>
                              </div>
                            </div>
                            <div>
                              <img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </a>
                          {/* Service page */}
                          <a href="/service/service-one" data-w-id="b07e93b6-139e-136c-8189-3251b36d9273" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <img width="14" height="12" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d3_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Service page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Explore our services effortlessly</div>
                              </div>
                            </div>
                            <div>
                              <img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </a>
                          {/* Blog page */}
                          <a href="#" data-w-id="b07e93b6-139e-136c-8189-3251b36d927e" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <img width="14" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Blog page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Update the latest articles</div>
                              </div>
                            </div>
                            <div>
                              <img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </a>
                        </div>
                        {/* Right column */}
                        <div className="w-layout-vflex rt-pages-menu-list-wrap">
                          {/* Contact page */}
                          <a href="/contact" data-w-id="b07e93b6-139e-136c-8189-3251b36d928a" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <img width="13" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d2_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Contact page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">We&#x2019;re here to help you 24/7</div>
                              </div>
                            </div>
                            <div>
                              <img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </a>
                          {/* Pricing page */}
                          <a href="#" data-w-id="b07e93b6-139e-136c-8189-3251b36d9295" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <img width="14" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394c9_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Pricing page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Choose the option made for you</div>
                              </div>
                            </div>
                            <div>
                              <img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </a>
                          {/* FAQ */}
                          <a href="#" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <img width="14" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">FAQ</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Collaboration, trust, and shared goals</div>
                              </div>
                            </div>
                            <div>
                              <img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>

                {/* Blog dropdown */}
                <div
                  data-delay="300"
                  data-hover="true"
                  data-w-id="b07e93b6-139e-136c-8189-3251b36d92b8"
                  className="rt-navbar-dropdown w-dropdown">
                  <div
                    className="rt-navbar-dropdown-toggle w-dropdown-toggle"
                    id="w-dropdown-toggle-3"
                    aria-controls="w-dropdown-list-3"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}>
                    <div className="rt-menu-text">Blog</div>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative">
                      <img
                        width="10"
                        height="6"
                        alt="dropdown arrow"
                        src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`}
                        loading="lazy" />
                    </div>
                  </div>
                  <nav
                    className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                    id="w-dropdown-list-3"
                    aria-labelledby="w-dropdown-toggle-3"
                    style={{ width: "100%", height: "0px" }}>
                    <a href="/blog" className="rt-nav-menu-link rt-first w-dropdown-link" tabIndex={0}>Blog one</a>
                    <a href="/blog" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Blog two</a>
                    <a href="/blog" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Blog three</a>
                    <a href="/blog" className="rt-nav-menu-link rt-last w-dropdown-link" tabIndex={0}>Blog post</a>
                  </nav>
                </div>

                {/* Contact */}
                <a href="/contact" className="rt-navbar-dropdown-toggle w-inline-block">
                  <div className="rt-menu-text">Contact</div>
                </a>

              </div>

              {/* ── Mobile Menu ── */}
              <nav role="navigation" className="rt-navbar-v1-menu-mobile w-nav-menu">
                <div className="w-layout-vflex rt-mobile-menu-main">
                  <div className="w-layout-vflex rt-mobile-menu-content-main">
                    <div className="rt-mobile-navbar">

                      {/* Mobile – Home */}
                      <div data-delay="300" data-hover="true" className="rt-navbar-dropdown w-dropdown" style={{ maxWidth: "1750px" }}>
                        <div className="rt-navbar-dropdown-toggle w-dropdown-toggle" id="w-dropdown-toggle-4" aria-controls="w-dropdown-list-4" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                          <Link href="/" className="rt-menu-text" style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>Home</Link>
                          <div className="rt-nav-menu-arrow-holder rt-position-relative">
                            <img width="10" height="6" alt="dropdown arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`} loading="lazy" />
                          </div>
                        </div>
                        <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list" id="w-dropdown-list-4" aria-labelledby="w-dropdown-toggle-4">
                          <a href="/" className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link" tabIndex={0}>Home one</a>
                          <a href="/home-two" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Home two</a>
                          <a href="#" className="rt-nav-menu-link rt-last w-dropdown-link" tabIndex={0}>Home three</a>
                        </nav>
                      </div>

                      {/* Mobile – Service */}
                      <div data-delay="300" data-hover="true" className="rt-navbar-dropdown w-dropdown" style={{ maxWidth: "1750px" }}>
                        <div className="rt-navbar-dropdown-toggle w-dropdown-toggle" id="w-dropdown-toggle-5" aria-controls="w-dropdown-list-5" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                          <Link href="/service" className="rt-menu-text" style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>Service</Link>
                          <div className="rt-nav-menu-arrow-holder rt-position-relative">
                            <img width="10" height="6" alt="dropdown arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`} loading="lazy" />
                          </div>
                        </div>
                        <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list" id="w-dropdown-list-5" aria-labelledby="w-dropdown-toggle-5">
                          <a href="/service/service-one" className="rt-nav-menu-link rt-first w-dropdown-link" tabIndex={0}>Service one</a>
                          <a href="/service/service-two" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Service two</a>
                          <a href="/service/service-three" className="rt-nav-menu-link rt-last w-dropdown-link" tabIndex={0}>Service three</a>
                        </nav>
                      </div>

                      {/* Mobile – About */}
                      <a href="/about" className="rt-navbar-dropdown-toggle w-inline-block">
                        <div className="rt-menu-text">About</div>
                      </a>

                      {/* Mobile – Pages */}
                      <div data-delay="300" data-hover="true" className="rt-navbar-dropdown w-dropdown" style={{ maxWidth: "1750px" }}>
                        <div className="rt-navbar-dropdown-toggle w-dropdown-toggle" id="w-dropdown-toggle-6" aria-controls="w-dropdown-list-6" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                          <div className="rt-menu-text">Pages</div>
                          <div className="rt-nav-menu-arrow-holder rt-position-relative">
                            <img width="10" height="6" alt="dropdown arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`} loading="lazy" />
                          </div>
                        </div>
                        <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list" id="w-dropdown-list-6" aria-labelledby="w-dropdown-toggle-6">
                          <div className="w-layout-hflex rt-pages-menu-wrap rt-padding">
                            <div className="w-layout-vflex rt-pages-menu-list-wrap">
                              <a href="/" data-w-id="b84e5def-8be0-c77c-84d1-4421928068bb" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><img width="13" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394ce_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Home page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Connect, collaborate and stay</div>
                                  </div>
                                </div>
                                <div><img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </a>
                              <a href="/about" data-w-id="b84e5def-8be0-c77c-84d1-4421928068c6" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><img width="14" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d4_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">About page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Learn about our story, mission</div>
                                  </div>
                                </div>
                                <div><img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </a>
                              <a href="/service/service-one" data-w-id="b84e5def-8be0-c77c-84d1-4421928068d1" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><img width="14" height="12" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d3_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Service page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Explore our services effortlessly</div>
                                  </div>
                                </div>
                                <div><img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </a>
                              <a href="#" data-w-id="b84e5def-8be0-c77c-84d1-4421928068dc" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><img width="14" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Blog page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Update the latest articles</div>
                                  </div>
                                </div>
                                <div><img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </a>
                            </div>
                            <div className="w-layout-vflex rt-pages-menu-list-wrap rt-padding">
                              <a href="/contact" data-w-id="b84e5def-8be0-c77c-84d1-4421928068e8" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><img width="13" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d2_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Contact page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">We&#x2019;re here to help you 24/7</div>
                                  </div>
                                </div>
                                <div><img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </a>
                              <a href="#" data-w-id="b84e5def-8be0-c77c-84d1-4421928068f3" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><img width="14" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394c9_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Pricing page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Choose the option made for you</div>
                                  </div>
                                </div>
                                <div><img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </a>
                              <a href="#" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><img width="14" height="14" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">FAQ</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Collaboration, trust, and shared goals</div>
                                  </div>
                                </div>
                                <div><img width="9" height="8" alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </a>
                            </div>
                          </div>
                        </nav>
                      </div>

                      {/* Mobile – Blog */}
                      <div data-delay="300" data-hover="true" className="rt-navbar-dropdown w-dropdown" style={{ maxWidth: "1750px" }}>
                        <div className="rt-navbar-dropdown-toggle shadow-varient-41 rt-bottom w-dropdown-toggle" id="w-dropdown-toggle-7" aria-controls="w-dropdown-list-7" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                          <div className="rt-menu-text">Blog</div>
                          <div className="rt-nav-menu-arrow-holder rt-position-relative">
                            <img width="10" height="6" alt="dropdown arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`} loading="lazy" />
                          </div>
                        </div>
                        <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list" id="w-dropdown-list-7" aria-labelledby="w-dropdown-toggle-7">
                          <a href="#" className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link" tabIndex={0}>Blog one</a>
                          <a href="#" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Blog two</a>
                          <a href="#" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Blog three</a>
                          <a href="#" className="rt-nav-menu-link shadow-varient-59 rt-last w-dropdown-link" tabIndex={0}>Blog post</a>
                        </nav>
                      </div>

                      {/* Mobile – Contact */}
                      <a href="/contact" className="rt-navbar-dropdown-toggle rt-bottom w-inline-block">
                        <div className="rt-menu-text">Contact</div>
                      </a>

                    </div>

                    {/* Mobile CTA buttons */}
                    <div className="rt-mobile-menu-button-wrap">
                      <a href="#" className="rt-button-v1-main rt-position-relative w-inline-block">
                        <div className="rt-button-v1">
                          <div className="rt-button-text">Sign in</div>
                        </div>
                        <div className="rt-button-overlay"></div>
                      </a>
                      <a href="#" className="rt-button-v1-main rt-position-relative background-white-5 w-inline-block">
                        <div className="rt-button-v1 background-white-6">
                          <div className="rt-button-text rt-btn-color">Sign up</div>
                        </div>
                        <div className="rt-button-overlay background-white-8"></div>
                      </a>
                    </div>
                  </div>

                  {/* Mobile bottom – social + contact */}
                  <div className="w-layout-vflex rt-mobile-menu-bottom-part">
                    <div className="w-layout-vflex rt-mobile-menu-llink-main">
                      <div className="rt-text-style-h5">Follow us</div>
                      <div className="w-layout-hflex rt-social-link-wrap">
                        <a href="https://www.instagram.com/" className="rt-mega-menu-icon w-inline-block">
                          <img width="10" height="18" alt="Instagram" src={`${NAV_ASSETS}/68ff46366a330717f35394cc_Kloudera-team-icon.svg`} loading="lazy" />
                        </a>
                        <a href="https://x.com/" className="rt-mega-menu-icon w-inline-block">
                          <img width="14" height="14" alt="X" src={`${NAV_ASSETS}/68ff46366a330717f35394d6_kloudera-mega-menu-icon.svg`} loading="lazy" />
                        </a>
                        <a href="https://www.linkedin.com/" className="rt-mega-menu-icon w-inline-block">
                          <img width="14" height="15" alt="LinkedIn" src={`${NAV_ASSETS}/68ff46366a330717f35394d7_kloudera-mega-menu-icon.svg`} loading="lazy" />
                        </a>
                        <a href="https://www.facebook.com/" className="rt-mega-menu-icon w-inline-block">
                          <img width="10" height="18" alt="Facebook" src={`${NAV_ASSETS}/68ff46366a330717f35394d0_Kloudera-team-icon.svg`} loading="lazy" />
                        </a>
                      </div>
                    </div>
                    <div className="w-layout-vflex rt-mobile-menu-link-text-mian">
                      <a href="tel:8884567890" className="rt-text-style-h5">(888) 456 7890</a>
                      <a href="mailto:info@example.com" className="rt-text-style-h5">info@example.com</a>
                    </div>
                  </div>
                </div>
              </nav>

              {/* ── Hamburger button ── */}
              <div
                data-w-id="b07e93b6-139e-136c-8189-3251b36d939b"
                className="rt-menu-button-main w-nav-button"
                style={{ WebkitUserSelect: "text" }}
                aria-label="menu"
                role="button"
                tabIndex={0}
                aria-controls="w-nav-overlay-0"
                aria-haspopup="menu"
                aria-expanded="false">
                <div className="rt-menu-line rt-top-line"></div>
                <div className="rt-menu-line rt-middle-line"></div>
                <div className="rt-menu-line rt-bottom-line"></div>
              </div>

              {/* ── Desktop CTA ── */}
              <div className="w-layout-hflex rt-navbar-button-wrap rt-tab-display-none">
                <div className="rt-signin-wrap">
                  <a href="#" className="rt-menu-text rt-navbar-signin">Sign in</a>
                </div>
                <a
                  data-wf--rt-border-button--variant="padding"
                  data-w-id="9067a903-cf07-9614-de57-af0aba677203"
                  href="/contact"
                  className="rt-button-body rt-nav-btn w-variant-1b2d9ec2-3fdd-1f2f-c0ef-d11a45cf51a4 w-inline-block">
                  <div className="rt-button-text rt-btn-color-nav">Start free trial</div>
                  <div className="rt-button-body-overlay rt-nav-overlay"></div>
                </a>
              </div>

            </div>
          </div>
          <div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
        </div>
        <div className="rt-nav-shadows rt-opacite-on" style={{ willChange: "opacity", opacity: "0" }}></div>
      </div>
    </>
  );
}
