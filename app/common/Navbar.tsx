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
                    style={{ height: '50px', width: 'auto' }}
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

                {/* Service Mega Menu dropdown */}
                <div
                  data-delay="300"
                  data-hover="true"
                  data-w-id="b07e93b6-139e-136c-8189-3251b36d9247"
                  className="rt-navber-dropdown rt-pages-dropdown w-dropdown">
                  <div
                    className={`rt-navbar-dropdown-toggle w-dropdown-toggle ${isActive(['/service']) ? 'rt-active-link' : ''}`}
                    id="w-dropdown-toggle-2"
                    aria-controls="w-dropdown-list-2"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    role="button"
                    tabIndex={0}>
                    <div className="rt-menu-text" onClick={(e) => { e.stopPropagation(); router.push('/service'); }} style={{ cursor: 'pointer' }}>Service</div>
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
                          <div style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3, marginTop: '0' }}>
                            Transform your bold ideas into powerful digital products with our IT experts.
                          </div>
                        </div>
                        <div className="rt-pages-menu-left-button">
                          <Link href="/contact" className="w-button" style={{ backgroundColor: '#fff', color: '#1833fe', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, display: 'inline-block', border: 'none', cursor: 'pointer' }}>
                            Get started today
                          </Link>
                        </div>
                      </div>
                      <div className="w-layout-vflex" style={{ flex: 1, paddingTop: '12px' }}>
                        <div style={{ padding: '0 32px 12px 32px', fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>
                          Explore Our IT Solutions
                        </div>
                        <div className="w-layout-hflex rt-pages-menu-wrap" style={{ paddingTop: 0 }}>
                          {/* Left column */}
                          <div className="w-layout-vflex rt-pages-menu-list-wrap">
                            {/* Web Development */}
                            <Link href="/service/web-development" data-w-id="b07e93b6-139e-136c-8189-3251b36d925d" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                              <div className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rt-pages-menu-icon"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">Website Development</div>
                                  <div className="rt-pages-menu-small-text rt-text-medium" style={{ whiteSpace: 'nowrap' }}>Scalable and responsive websites</div>
                                </div>
                              </div>
                              <div>
                                <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                              </div>
                            </Link>
                            {/* Custom Software */}
                            <Link href="/service/custom-software" data-w-id="b07e93b6-139e-136c-8189-3251b36d9268" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                              <div className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rt-pages-menu-icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">Custom Software</div>
                                  <div className="rt-pages-menu-small-text rt-text-medium" style={{ whiteSpace: 'nowrap' }}>Tailored software solutions</div>
                                </div>
                              </div>
                              <div>
                                <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                              </div>
                            </Link>
                            {/* Mobile Application */}
                            <Link href="/service/mobile-application" data-w-id="b07e93b6-139e-136c-8189-3251b36d9273" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                              <div className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rt-pages-menu-icon"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">Mobile Application</div>
                                  <div className="rt-pages-menu-small-text rt-text-medium" style={{ whiteSpace: 'nowrap' }}>iOS and Android mobile apps</div>
                                </div>
                              </div>
                              <div>
                                <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                              </div>
                            </Link>
                          </div>
                          {/* Right column */}
                          <div className="w-layout-vflex rt-pages-menu-list-wrap">
                            {/* Digital Marketing */}
                            <Link href="/service/digital-marketing" data-w-id="b07e93b6-139e-136c-8189-3251b36d928a" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                              <div className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rt-pages-menu-icon"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">Digital Marketing</div>
                                  <div className="rt-pages-menu-small-text rt-text-medium" style={{ whiteSpace: 'nowrap' }}>Data-driven growth strategies</div>
                                </div>
                              </div>
                              <div>
                                <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                              </div>
                            </Link>
                            {/* Graphics Designing */}
                            <Link href="/service/graphics-designing" data-w-id="b07e93b6-139e-136c-8189-3251b36d9295" className="rt-pages-menu-link-wrap w-inline-block" tabIndex={0}>
                              <div className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rt-pages-menu-icon"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">Graphics Designing</div>
                                  <div className="rt-pages-menu-small-text rt-text-medium" style={{ whiteSpace: 'nowrap' }}>Creative and intuitive designs</div>
                                </div>
                              </div>
                              <div>
                                <Image width={9} height={8} alt="arrow" src={`${NAV_ASSETS}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-link-arrow" />
                              </div>

                            </Link>
                          </div>
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

                      {/* Pages dropdown Mobile - Removed because it is redundant and Services mega menu handles this on desktop */}

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
