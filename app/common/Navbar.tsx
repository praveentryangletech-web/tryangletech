"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useRouter, usePathname } from 'next/navigation';

import Image from "next/image";

const NAV_ASSETS = '/Taskopia_files';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset Webflow IX2 stuck hover interactions on route change
  useEffect(() => {
    const navElements = document.querySelectorAll('.w-dropdown-toggle, .rt-navbar-dropdown-toggle, .w-dropdown, .rt-menu-text, .w-dropdown-list');
    navElements.forEach(el => {
      el.classList.remove('w--open');
      if (el instanceof HTMLElement) {
        // Clear any inline styles left behind by Webflow interactions
        el.style.borderBottom = '';
        el.style.borderBottomColor = '';
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }
    });
  }, [pathname]);

  // Helper to determine if a path is active
  const isActive = (paths: string[]) => {
    return paths.some(path => {
      if (path === '/') {
        return pathname === '/' || pathname === '/home-two' || pathname === '/home-three';
      }
      return pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));
    });
  };

  return (
    <>
      <style>{`
        .rt-top-nav {
          background-color: ${scrolled ? '#ffffff !important' : 'transparent'};
          box-shadow: ${scrolled ? '0 4px 12px rgba(0,0,0,0.05) !important' : 'none'};
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .rt-active-link {
          color: #1833fe !important;
        }
        .rt-active-link .rt-menu-text {
          color: #1833fe !important;
        }
      `}</style>
      <div
        data-wf--rt-nav--variant="base"
        data-w-id="b07e93b6-139e-136c-8189-3251b36d9225"
        className="rt-top-nav relative z-[999]">
        <div
          data-w-id="b07e93b6-139e-136c-8189-3251b36d9226"
          data-animation="default"
          data-collapse="medium"
          data-duration="400"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="rt-nav w-nav">
          <div className="w-layout-blockcontainer rt-container-nav rt-position-relative w-container">
            <div className="rt-navbar-wrapper rt-position-relative">

              {/* ── Logo ── */}
              <div className="rt-navbar-logo-wrap" style={{ flex: 1 }}>
                <Link
                  href="/"
                  className="rt-navbar-logo rt-position-relative w-nav-brand"
                  aria-label="home">
                  <Image
                    style={{ height: '40px', width: 'auto' }}
                    alt="TryangleTech logo"
                    src={`/logo.png`}
                    loading="lazy"
                    className="rt-auto-fit rt-desktop-image-full-width" width={800} height={800} />
                  <div className="rt-link-discernible">link<br />&#x200D;</div>
                </Link>
              </div>

              {/* ── Desktop Menu ── */}
              <div className="w-layout-hflex rt-navbar-v1-menu-desktop">

                {/* Home dropdown (commented out)
                <div
                  data-delay="300"
                  data-hover="true"
                  data-w-id="b07e93b6-139e-136c-8189-3251b36d922d"
                  className="rt-navbar-dropdown w-dropdown">
                  <div
                    className={`rt-navbar-dropdown-toggle w-dropdown-toggle ${isActive(['/']) ? 'rt-active-link' : ''}`}
                    id="w-dropdown-toggle-0"
                    aria-controls="w-dropdown-list-0"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}>
                    <Link href="/" className="rt-menu-text" style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>Home</Link>
                    <div
                      className="rt-nav-menu-arrow-holder rt-position-relative">
                      <Image
                        width={10}
                        height={6}
                        alt="dropdown arrow"
                        src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`}
                        loading="lazy" />
                    </div>
                  </div>
                  <nav
                    className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                    aria-labelledby="w-dropdown-toggle-0">
                    <Link href="/" className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link" tabIndex={0}>Home one</Link>
                  </nav>
                </div>
                */}
                {/* Home */}
                <Link href="/" className={`rt-navbar-dropdown-toggle w-inline-block ${isActive(['/']) ? 'rt-active-link' : ''}`}>
                  <div className="rt-menu-text">Home</div>
                </Link>

                {/* About */}
                <Link href="/about" className={`rt-navbar-dropdown-toggle w-inline-block ${isActive(['/about']) ? 'rt-active-link' : ''}`}>
                  <div className="rt-menu-text">About</div>
                </Link>

                {/* Portfolio */}
                <Link href="/portfolio" className={`rt-navbar-dropdown-toggle w-inline-block ${isActive(['/portfolio']) ? 'rt-active-link' : ''}`}>
                  <div className="rt-menu-text">Portfolio</div>
                </Link>

                {/* Service dropdown */}
                <div
                  data-delay="300"
                  data-hover="true"
                  data-w-id="b07e93b6-139e-136c-8189-3251b36d92ab"
                  className="rt-navbar-dropdown w-dropdown">
                  <div
                    className={`rt-navbar-dropdown-toggle w-dropdown-toggle ${isActive(['/service']) ? 'rt-active-link' : ''}`}
                    id="w-dropdown-toggle-1"
                    aria-controls="w-dropdown-list-1"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}>
                    <Link href="/service" className="rt-menu-text" style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>Service</Link>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative">
                      <Image
                        width={10}
                        height={6}
                        alt="dropdown arrow"
                        src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`}
                        loading="lazy" />
                    </div>
                  </div>
                  <nav
                    className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                    aria-labelledby="w-dropdown-toggle-1" style={{ width: "max-content", minWidth: "200px" }}>

                    <Link href="/service/web-development" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Website Development</Link>
                    <Link href="/service/custom-software" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Custom Software </Link>
                    <Link href="/service/mobile-application" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Mobile Application</Link>
                    <Link href="/service/digital-marketing" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Digital Marketing</Link>
                    <Link href="/service/graphics-designing" className="rt-nav-menu-link rt-last w-dropdown-link" tabIndex={0}>Graphics Designing</Link>
                  </nav>
                </div>

                {/* Pages Mega Menu dropdown */}
                <div
                  data-delay="300"
                  data-hover="true"
                  data-w-id="b07e93b6-139e-136c-8189-3251b36d9247"
                  className="rt-navber-dropdown rt-pages-dropdown w-dropdown">
                  <div
                    className={`rt-navbar-dropdown-toggle w-dropdown-toggle ${isActive(['/team', '/pricing', '/faq', '/404']) ? 'rt-active-link' : ''}`}
                    id="w-dropdown-toggle-2"
                    aria-controls="w-dropdown-list-2"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}>
                    <div className="rt-menu-text">Pages</div>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative">
                      <Image
                        width={10}
                        height={6}
                        alt="dropdown arrow"
                        src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`}
                        loading="lazy" />
                    </div>
                  </div>
                  <nav
                    className="rt-navbar-menu-dropdown rt-overflow-hidden rt-pages-menu w-dropdown-list"
                    aria-labelledby="w-dropdown-toggle-2">
                    <div className="w-layout-hflex rt-mega-menu-wrap">
                      <div className="w-layout-vflex rt-pages-menu-left">
                        <div className="w-layout-vflex rt-pages-menu-left-top">
                          <div style={{ backgroundColor: '#fff', padding: '10px 16px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', width: 'fit-content' }}>
                            <Image width={140} height={40} alt="TryangleTech Logo" src={`/logo.png`} loading="lazy" style={{ width: 'auto', height: '24px' }} />
                          </div>
                          <div style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4, marginTop: '1.5rem' }}>
                            Transform your bold ideas into powerful digital products with our IT experts.
                          </div>
                        </div>
                        <div className="rt-pages-menu-left-button">
                          <Link href="/contact" className="w-button" style={{ backgroundColor: '#fff', color: '#1833fe', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, display: 'inline-block', border: 'none', cursor: 'pointer' }}>
                            Get started today
                          </Link>
                        </div>
                      </div>
                      <div className="w-layout-hflex rt-pages-menu-wrap">
                        {/* Left column */}
                        <div className="w-layout-vflex rt-pages-menu-list-wrap">
                          {/* Home page */}
                          <Link href="/" data-w-id="b07e93b6-139e-136c-8189-3251b36d925d" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <Image width={13} height={14} alt="Home" src={`${NAV_ASSETS}/68ff46366a330717f35394ce_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Home page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Welcome to TryangleTech</div>
                              </div>
                            </div>
                            <div>
                              <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </Link>
                          {/* About page */}
                          <Link href="/about" data-w-id="b07e93b6-139e-136c-8189-3251b36d9268" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <Image width={14} height={14} alt="About" src={`${NAV_ASSETS}/68ff46366a330717f35394d4_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">About page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Discover our mission and vision</div>
                              </div>
                            </div>
                            <div>
                              <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </Link>
                          {/* Service page */}
                          <Link href="/service" data-w-id="b07e93b6-139e-136c-8189-3251b36d9273" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <Image width={14} height={12} alt="Service" src={`${NAV_ASSETS}/68ff46366a330717f35394d3_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Service page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Explore our IT solutions</div>
                              </div>
                            </div>
                            <div>
                              <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </Link>
                          {/* Blog page */}
                          <Link href="/blog" data-w-id="b07e93b6-139e-136c-8189-3251b36d927e" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <Image width={14} height={14} alt="Blog" src={`${NAV_ASSETS}/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Blog page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Read our latest tech insights</div>
                              </div>
                            </div>
                            <div>
                              <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </Link>
                        </div>
                        {/* Right column */}
                        <div className="w-layout-vflex rt-pages-menu-list-wrap">
                          {/* Contact page */}
                          <Link href="/contact" data-w-id="b07e93b6-139e-136c-8189-3251b36d928a" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <Image width={13} height={14} alt="Contact" src={`${NAV_ASSETS}/68ff46366a330717f35394d2_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Contact page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Get in touch with our experts</div>
                              </div>
                            </div>
                            <div>
                              <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </Link>
                          {/* Portfolio page */}
                          <Link href="/portfolio" data-w-id="b07e93b6-139e-136c-8189-3251b36d9295" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <Image width={14} height={14} alt="Portfolio" src={`${NAV_ASSETS}/68ff46366a330717f35394c9_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">Portfolio page</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">View our successful projects</div>
                              </div>
                            </div>
                            <div>
                              <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </Link>
                          {/* FAQ */}
                          <Link href="/faq" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                            <div className="w-layout-hflex rt-pages-menu-content">
                              <div>
                                <Image width={14} height={14} alt="FAQ" src={`${NAV_ASSETS}/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                              </div>
                              <div className="w-layout-vflex rt-pages-menu-link">
                                <div className="rt-nav-menu-link rt-padding-off">FAQ</div>
                                <div className="rt-pages-menu-small-text rt-text-medium">Find answers to common questions</div>
                              </div>
                            </div>
                            <div>
                              <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>

                {/* Blog dropdown
                <div
                  data-delay="300"
                  data-hover="true"
                  data-w-id="b07e93b6-139e-136c-8189-3251b36d92b8"
                  className="rt-navbar-dropdown w-dropdown">
                  <div
                    className={`rt-navbar-dropdown-toggle w-dropdown-toggle ${isActive(['/blog']) ? 'rt-active-link' : ''}`}
                    id="w-dropdown-toggle-3"
                    aria-controls="w-dropdown-list-3"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}>
                    <div className="rt-menu-text" onClick={(e) => { e.stopPropagation(); router.push('/blog/blog-two'); }} style={{ cursor: 'pointer' }}>Blog</div>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative">
                      <Image
                        width={10}
                        height={6}
                        alt="dropdown arrow"
                        src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`}
                        loading="lazy" />
                    </div>
                  </div>
                  <nav
                    className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list"
                    aria-labelledby="w-dropdown-toggle-3">
                    <Link href="/blog" className="rt-nav-menu-link rt-first w-dropdown-link" tabIndex={0}>Blog one</Link>
                    <Link href="/blog" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Blog two</Link>
                    <Link href="/blog" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Blog three</Link>
                    <Link href="/blog" className="rt-nav-menu-link rt-last w-dropdown-link" tabIndex={0}>Blog post</Link>
                  </nav>
                </div>
                */}
                {/* Blog */}
                <Link href="/blog" className={`rt-navbar-dropdown-toggle w-inline-block ${isActive(['/blog']) ? 'rt-active-link' : ''}`}>
                  <div className="rt-menu-text">Blog</div>
                </Link>
                {/* Contact */}
                <Link href="/contact" className={`rt-navbar-dropdown-toggle w-inline-block ${isActive(['/contact']) ? 'rt-active-link' : ''}`}>
                  <div className="rt-menu-text">Contact</div>
                </Link>

              </div>

              {/* ── Mobile Menu ── */}
              <nav role="navigation" className="rt-navbar-v1-menu-mobile w-nav-menu">
                <div className="w-layout-vflex rt-mobile-menu-main">
                  <div className="w-layout-vflex rt-mobile-menu-content-main">
                    <div className="rt-mobile-navbar">

                      {/* Mobile – Home dropdown (commented out)
                      <div data-delay="300" data-hover="true" className="rt-navbar-dropdown w-dropdown" style={{ maxWidth: "1750px" }}>
                        <div className={`rt-navbar-dropdown-toggle w-dropdown-toggle ${isActive(['/']) ? 'rt-active-link' : ''}`} id="w-dropdown-toggle-4" aria-controls="w-dropdown-list-4" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                          <Link href="/" className="rt-menu-text" style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>Home</Link>
                          <div className="rt-nav-menu-arrow-holder rt-position-relative">
                            <Image width={10} height={6} alt="dropdown arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`} loading="lazy" />
                          </div>
                        </div>
                        <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list" id="w-dropdown-list-4" aria-labelledby="w-dropdown-toggle-4">
                          <Link href="/" className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link" tabIndex={0}>Home one</Link>
                        </nav>
                      </div>
                      */}
                      {/* Mobile – Home */}
                      <Link href="/" className={`rt-navbar-dropdown-toggle w-inline-block ${isActive(['/']) ? 'rt-active-link' : ''}`}>
                        <div className="rt-menu-text">Home</div>
                      </Link>

                      {/* Mobile – Service */}
                      <div data-delay="300" data-hover="true" className="rt-navbar-dropdown w-dropdown" style={{ maxWidth: "1750px" }}>
                        <div className={`rt-navbar-dropdown-toggle w-dropdown-toggle ${isActive(['/service']) ? 'rt-active-link' : ''}`} id="w-dropdown-toggle-5" aria-controls="w-dropdown-list-5" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                          <Link href="/service" className="rt-menu-text" style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>Service</Link>
                          <div className="rt-nav-menu-arrow-holder rt-position-relative">
                            <Image width={10} height={6} alt="dropdown arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`} loading="lazy" />
                          </div>
                        </div>
                        <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list" id="w-dropdown-list-5" aria-labelledby="w-dropdown-toggle-5" style={{ width: "max-content", minWidth: "200px" }}>
                          <Link href="/service/web-development" className="rt-nav-menu-link rt-first w-dropdown-link" tabIndex={0}>Web Development</Link>
                          <Link href="/service/mobile-application" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Mobile Application</Link>
                          <Link href="/service/digital-marketing" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Digital Marketing</Link>
                          <Link href="/service/graphics-designing" className="rt-nav-menu-link rt-last w-dropdown-link" tabIndex={0}>Graphics Designing</Link>
                        </nav>
                      </div>

                      {/* About Mobile */}
                      <Link href="/about" className={`rt-navbar-dropdown-toggle w-inline-block ${isActive(['/about']) ? 'rt-active-link' : ''}`}>
                        <div className="rt-menu-text">About</div>
                      </Link>

                      {/* Portfolio Mobile */}
                      <Link href="/portfolio" className={`rt-navbar-dropdown-toggle w-inline-block ${isActive(['/portfolio']) ? 'rt-active-link' : ''}`}>
                        <div className="rt-menu-text">Portfolio</div>
                      </Link>

                      {/* Pages dropdown Mobile */}
                      <div data-delay="300" data-hover="true" className="rt-navbar-dropdown w-dropdown" style={{ maxWidth: "1750px" }}>
                        <div className={`rt-navbar-dropdown-toggle w-dropdown-toggle ${isActive(['/team', '/pricing', '/faq', '/404']) ? 'rt-active-link' : ''}`} id="w-dropdown-toggle-6" aria-controls="w-dropdown-list-6" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                          <div className="rt-menu-text">Pages</div>
                          <div className="rt-nav-menu-arrow-holder rt-position-relative">
                            <Image width={10} height={6} alt="dropdown arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`} loading="lazy" />
                          </div>
                        </div>
                        <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list" id="w-dropdown-list-6" aria-labelledby="w-dropdown-toggle-6">
                          <div className="w-layout-hflex rt-pages-menu-wrap rt-padding">
                            <div className="w-layout-vflex rt-pages-menu-list-wrap">
                              <Link href="/" data-w-id="b84e5def-8be0-c77c-84d1-4421928068bb" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><Image width={13} height={14} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394ce_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Home page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Connect, collaborate and stay</div>
                                  </div>
                                </div>
                                <div><Image width={9} height={8} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </Link>
                              <Link href="/about" data-w-id="b84e5def-8be0-c77c-84d1-4421928068c6" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><Image width={14} height={14} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d4_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">About page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Learn about our story, mission</div>
                                  </div>
                                </div>
                                <div><Image width={9} height={8} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </Link>
                              <Link href="/service" data-w-id="b84e5def-8be0-c77c-84d1-4421928068d1" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><Image width={14} height={12} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d3_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Service page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Explore our services effortlessly</div>
                                  </div>
                                </div>
                                <div><Image width={9} height={8} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </Link>
                              <Link href="/blog" data-w-id="b84e5def-8be0-c77c-84d1-4421928068dc" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><Image width={14} height={14} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Blog page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Update the latest articles</div>
                                  </div>
                                </div>
                                <div><Image width={9} height={8} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </Link>
                            </div>
                            <div className="w-layout-vflex rt-pages-menu-list-wrap rt-padding">
                              <Link href="/contact" data-w-id="b84e5def-8be0-c77c-84d1-4421928068e8" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><Image width={13} height={14} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d2_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Contact page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">We&#x2019;re here to help you 24/7</div>
                                  </div>
                                </div>
                                <div><Image width={9} height={8} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </Link>
                              <Link href="/pricing" data-w-id="b84e5def-8be0-c77c-84d1-4421928068f3" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><Image width={14} height={14} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394c9_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">Pricing page</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Choose the option made for you</div>
                                  </div>
                                </div>
                                <div><Image width={9} height={8} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </Link>
                              <Link href="/faq" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                                <div className="w-layout-hflex rt-pages-menu-content">
                                  <div><Image width={14} height={14} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d5_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" /></div>
                                  <div className="w-layout-vflex rt-pages-menu-link">
                                    <div className="rt-nav-menu-link rt-padding-off">FAQ</div>
                                    <div className="rt-pages-menu-small-text rt-text-medium">Collaboration, trust, and shared goals</div>
                                  </div>
                                </div>
                                <div><Image width={9} height={8} alt="" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" /></div>
                              </Link>
                            </div>
                          </div>
                        </nav>
                      </div>

                      {/* Blog dropdown Mobile (commented out) 
                      <div data-delay="300" data-hover="true" className="rt-navbar-dropdown w-dropdown" style={{ maxWidth: "1750px" }}>
                        <div className={`rt-navbar-dropdown-toggle shadow-varient-41 rt-bottom w-dropdown-toggle ${isActive(['/blog']) ? 'rt-active-link' : ''}`} id="w-dropdown-toggle-7" aria-controls="w-dropdown-list-7" aria-haspopup="menu" aria-expanded="false" role="button" tabIndex={0}>
                          <div className="rt-menu-text">Blog</div>
                          <div className="rt-nav-menu-arrow-holder rt-position-relative">
                            <Image width={10} height={6} alt="dropdown arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`} loading="lazy" />
                          </div>
                        </div>
                        <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list" id="w-dropdown-list-7" aria-labelledby="w-dropdown-toggle-7">
                          <a href="#" className="rt-nav-m-nu-link shadow-varient-59 rt-first w-dropdown-link" tabIndex={0}>Blog one</a>
                          <a href="#" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Blog two</a>
                          <a href="#" className="rt-nav-menu-link w-dropdown-link" tabIndex={0}>Blog three</a>
                          <a href="#" className="rt-nav-menu-link shadow-varient-59 rt-last w-dropdown-link" tabIndex={0}>Blog post</a>
                        </nav>
                      </div>
                      */}
                      {/* Blog Mobile Link */}
                      <Link href="/blog" className={`rt-navbar-dropdown-toggle w-inline-block ${isActive(['/blog']) ? 'rt-active-link' : ''}`}>
                        <div className="rt-menu-text">Blog</div>
                      </Link>

                      {/* Contact Mobile */}
                      <Link href="/contact" className={`rt-navbar-dropdown-toggle rt-bottom w-inline-block ${isActive(['/contact']) ? 'rt-active-link' : ''}`}>
                        <div className="rt-menu-text">Contact</div>
                      </Link>

                    </div>

                  </div>

                  {/* Mobile bottom – social + contact */}
                  <div className="w-layout-vflex rt-mobile-menu-bottom-part">
                    <div className="w-layout-vflex rt-mobile-menu-llink-main">
                      <div className="rt-text-style-h5">Follow us</div>
                      <div className="w-layout-hflex rt-social-link-wrap">
                        <a href="https://www.instagram.com/tryangle24_7/" className="rt-mega-menu-icon w-inline-block" target="_blank" rel="noopener noreferrer">
                          <Image width={10} height={18} alt="Instagram" src={`${NAV_ASSETS}/68ff46366a330717f35394cc_Kloudera-team-icon.svg`} loading="lazy" />
                        </a>
                        <a href="https://www.linkedin.com/company/tryangle-tech" className="rt-mega-menu-icon w-inline-block" target="_blank" rel="noopener noreferrer">
                          <Image width={14} height={15} alt="LinkedIn" src={`${NAV_ASSETS}/68ff46366a330717f35394d7_kloudera-mega-menu-icon.svg`} loading="lazy" />
                        </a>
                        <a href="https://www.facebook.com/tryangletech/" className="rt-mega-menu-icon w-inline-block" target="_blank" rel="noopener noreferrer">
                          <Image width={10} height={18} alt="Facebook" src={`${NAV_ASSETS}/68ff46366a330717f35394d0_Kloudera-team-icon.svg`} loading="lazy" />
                        </a>
                      </div>
                    </div>
                    <div className="w-layout-vflex rt-mobile-menu-link-text-mian">
                      <a href="tel:+919033878806" className="rt-text-style-h5">+91 90338 78806</a>
                      <a href="mailto:info.tryangletech@gmail.com" className="rt-text-style-h5">info.tryangletech@gmail.com</a>
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

              {/* ── Right Spacer to balance flex layout and center menu ── */}
              <div className="rt-tab-display-none" style={{ flex: 1 }}></div>

            </div>
          </div>
          <div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
        </div>
        <div className="rt-nav-shadows rt-opacite-on" style={{ willChange: "opacity", opacity: "0" }}></div>
      </div>
    </>
  );
}
