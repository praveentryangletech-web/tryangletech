'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

/* ─── Local public asset base path ─── */
const A = '/about-assets';

/* ─── Reusable components ─── */
const NavArrow = () => (
  <img
    width={10}
    height={6}
    alt="dropdown arrow"
    src={`${A}/68ff46366a330717f35394cb_kloudera-home-one-navbar-dropdown-icon.svg`}
    loading="lazy"
  />
);

const MenuLinkArrow = () => (
  <img
    width={9}
    height={8}
    alt=""
    src={`${A}/68ff46366a330717f35394d1_kloudera-mega-menu-icon.svg`}
    loading="lazy"
    className="rt-pages-menu-link-arrow"
  />
);

/* ─── Main Component ─── */
export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    // Webflow requires these attributes on the <html> tag to initialize page-specific animations
    document.documentElement.setAttribute('data-wf-page', '68eddb57e406830358a1f29d');
    document.documentElement.setAttribute('data-wf-site', '68c3feed3b3e541e7d5c098a');

    const initWebflow = setInterval(() => {
      const Webflow = (window as any).Webflow;
      if (typeof window !== 'undefined' && Webflow && Webflow.require) {
        const ix2 = Webflow.require('ix2');
        if (ix2) {
          clearInterval(initWebflow);
          Webflow.destroy();
          Webflow.ready();
          ix2.init();
        }
      }
    }, 100);

    return () => clearInterval(initWebflow);
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.setAttribute("data-wf-page", "68eddb57e406830358a1f29d");` }} />
      {/* Webflow CSS — served locally */}
      <link
        href={`${A}/taskopia.webflow.shared.f0926b53b.css`}
        rel="stylesheet"
        type="text/css"
      />

      {/* Webflow animation initial states */}
      <style>{`
        @media (min-width:992px) {
          html.w-mod-js:not(.w-mod-ix) [data-w-id="6b5c6d36-e516-7ca4-cea7-722942bbc918"] {
            -webkit-transform:translate3d(0,0,0) scale3d(1,1,1) rotateX(0) rotateY(0) rotateZ(0) skew(0,0);
            transform:translate3d(0,0,0) scale3d(1,1,1) rotateX(0) rotateY(0) rotateZ(0) skew(0,0);
          }
          html.w-mod-js:not(.w-mod-ix) [data-w-id="bcfd77a1-c414-9dba-e50b-0935c10eca41"] { width:0%; }
        }
      `}</style>

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <div
        data-wf--rt-nav--variant="base"
        data-w-id="b07e93b6-139e-136c-8189-3251b36d9225"
        className="rt-top-nav rt-bg-color"
      >
        <div
          data-w-id="b07e93b6-139e-136c-8189-3251b36d9226"
          data-animation="default"
          data-collapse="medium"
          data-duration="400"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="rt-nav w-nav"
        >
          <div className="w-layout-blockcontainer rt-container-nav rt-position-relative w-container">
            <div className="rt-navbar-wrapper rt-position-relative">

              {/* Logo */}
              <div className="rt-navbar-logo-wrap">
                <a href="/" className="rt-navbar-logo rt-position-relative w-nav-brand">
                  <img
                    width={191}
                    height={40}
                    alt="Logo"
                    src={`${A}/69269a3ea5e20bf6f3f40183_top logo.svg`}
                    loading="lazy"
                    className="rt-auto-fit rt-desktop-image-full-width"
                  />
                  <div className="rt-link-discernible">link<br />&#x200D;</div>
                </a>
              </div>

              {/* Desktop Menu */}
              <div className="w-layout-hflex rt-navbar-v1-menu-desktop">

                {/* Home */}
                <div data-delay="300" data-hover="true" data-w-id="b07e93b6-139e-136c-8189-3251b36d922d" className="rt-navbar-dropdown w-dropdown">
                  <div className="rt-navbar-dropdown-toggle w-dropdown-toggle">
                    <div className="rt-menu-text">Home</div>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative"><NavArrow /></div>
                  </div>
                  <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list">
                    <a href="/home-one" className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link">Home one</a>
                    <a href="/home-two" className="rt-nav-menu-link w-dropdown-link">Home two</a>
                    <a href="/home-three" className="rt-nav-menu-link rt-last w-dropdown-link">Home three</a>
                  </nav>
                </div>

                {/* About (active) */}
                <a href="/about" aria-current="page" className="rt-navbar-dropdown-toggle w-inline-block w--current">
                  <div className="rt-menu-text">About</div>
                </a>

                {/* Service */}
                <div data-delay="300" data-hover="true" data-w-id="b07e93b6-139e-136c-8189-3251b36d92ab" className="rt-navbar-dropdown w-dropdown">
                  <div className="rt-navbar-dropdown-toggle w-dropdown-toggle">
                    <div className="rt-menu-text">Service</div>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative"><NavArrow /></div>
                  </div>
                  <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list">
                    <a href="/service-one" className="rt-nav-menu-link rt-first w-dropdown-link">Service one</a>
                    <a href="/service-two" className="rt-nav-menu-link w-dropdown-link">Service two</a>
                    <a href="/service-three" className="rt-nav-menu-link rt-last w-dropdown-link">Service three</a>
                  </nav>
                </div>

                {/* Pages Mega Menu */}
                <div data-delay="300" data-hover="true" data-w-id="b07e93b6-139e-136c-8189-3251b36d9247" className="rt-navber-dropdown rt-pages-dropdown w-dropdown">
                  <div className="rt-navbar-dropdown-toggle w-dropdown-toggle">
                    <div className="rt-menu-text">Pages</div>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative"><NavArrow /></div>
                  </div>
                  <nav className="rt-navbar-menu-dropdown rt-overflow-hidden rt-pages-menu w-dropdown-list">
                    <div className="w-layout-hflex rt-mega-menu-wrap">
                      <div className="w-layout-vflex rt-pages-menu-left">
                        <div className="w-layout-vflex rt-pages-menu-left-top">
                          <div>
                            <img width={27} height={39} alt="" src={`${A}/68ff54083b9a1440134bda1b_Vector 1557.svg`} loading="lazy" className="rt-mega-menu-icon" />
                          </div>
                          <div className="rt-text-style-h6 rt-text-color-white">Connect your favorite tools and apps seamlessly with our AI agent</div>
                        </div>
                        <div className="w-layout-hflex rt-pages-menu-left-button">
                          <a href="/service-one" className="rt-button-body rt-nav-btn w-inline-block">
                            <div className="rt-button-text rt-btn-color-nav">See integrations</div>
                            <div className="rt-button-body-overlay rt-nav-overlay"></div>
                          </a>
                        </div>
                      </div>
                      <div className="w-layout-hflex rt-pages-menu-wrap">
                        <div className="w-layout-vflex rt-pages-menu-list-wrap border">
                          {[
                            { href: '/home-one', iconSuffix: 'ce', label: 'Home page', sub: 'Connect, collaborate and stay' },
                            { href: '/about', iconSuffix: 'd4', label: 'About page', sub: 'Learn about our story, mission', current: true },
                            { href: '/service-one', iconSuffix: 'd3', label: 'Service page', sub: 'Explore our services effortlessly' },
                            { href: '/blog-one', iconSuffix: 'd5', label: 'Blog page', sub: 'Update the latest articles' },
                          ].map(({ href, iconSuffix, label, sub, current }) => (
                            <a key={label} href={href} aria-current={current ? 'page' : undefined} className={`rt-pages-menu-link-wrap w-inline-block${current ? ' w--current' : ''}`}>
                              <div className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <img width={14} height={14} alt="" src={`${A}/68ff46366a330717f35394${iconSuffix}_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">{label}</div>
                                  <div className="rt-pages-menu-small-text rt-text-medium">{sub}</div>
                                </div>
                              </div>
                              <MenuLinkArrow />
                            </a>
                          ))}
                        </div>
                        <div className="w-layout-vflex rt-pages-menu-list-wrap">
                          {[
                            { href: '/contact', iconSuffix: 'd2', label: 'Contact page', sub: "We're here to help you 24/7" },
                            { href: '/pricing', iconSuffix: 'c9', label: 'Pricing page', sub: 'Choose the option made for you' },
                            { href: '/faq', iconSuffix: 'd5', label: 'FAQ', sub: 'Collaboration, trust, and shared goals' },
                          ].map(({ href, iconSuffix, label, sub }) => (
                            <a key={label} href={href} className="rt-pages-menu-link-wrap w-inline-block">
                              <div className="w-layout-hflex rt-pages-menu-content">
                                <div>
                                  <img width={14} height={14} alt="" src={`${A}/68ff46366a330717f35394${iconSuffix}_kloudera-mega-menu-icon.svg`} loading="lazy" className="rt-pages-menu-icon" />
                                </div>
                                <div className="w-layout-vflex rt-pages-menu-link">
                                  <div className="rt-nav-menu-link rt-padding-off">{label}</div>
                                  <div className="rt-pages-menu-small-text rt-text-medium">{sub}</div>
                                </div>
                              </div>
                              <MenuLinkArrow />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>

                {/* Blog */}
                <div data-delay="300" data-hover="true" data-w-id="b07e93b6-139e-136c-8189-3251b36d92b8" className="rt-navbar-dropdown w-dropdown">
                  <div className="rt-navbar-dropdown-toggle w-dropdown-toggle">
                    <div className="rt-menu-text">Blog</div>
                    <div className="rt-nav-menu-arrow-holder rt-position-relative"><NavArrow /></div>
                  </div>
                  <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list">
                    <a href="/blog-one" className="rt-nav-menu-link rt-first w-dropdown-link">Blog one</a>
                    <a href="/blog-two" className="rt-nav-menu-link w-dropdown-link">Blog two</a>
                    <a href="/blog-three" className="rt-nav-menu-link w-dropdown-link">Blog three</a>
                    <a href="/blog-post" className="rt-nav-menu-link rt-last w-dropdown-link">Blog post</a>
                  </nav>
                </div>

                {/* Contact */}
                <a href="/contact" className="rt-navbar-dropdown-toggle w-inline-block">
                  <div className="rt-menu-text">Contact</div>
                </a>
              </div>

              {/* Mobile Menu */}
              <nav role="navigation" className="rt-navbar-v1-menu-mobile w-nav-menu">
                <div className="w-layout-vflex rt-mobile-menu-main">
                  <div className="w-layout-vflex rt-mobile-menu-content-main">
                    <div className="rt-mobile-navbar">
                      <div data-delay="300" data-hover="true" className="rt-navbar-dropdown w-dropdown">
                        <div className="rt-navbar-dropdown-toggle w-dropdown-toggle">
                          <div className="rt-menu-text">Home</div>
                          <div className="rt-nav-menu-arrow-holder rt-position-relative"><NavArrow /></div>
                        </div>
                        <nav className="rt-navbar-menu-dropdown rt-overflow-hidden w-dropdown-list">
                          <a href="/home-one" className="rt-nav-menu-link shadow-varient-59 rt-first w-dropdown-link">Home one</a>
                          <a href="/home-two" className="rt-nav-menu-link w-dropdown-link">Home two</a>
                          <a href="/home-three" className="rt-nav-menu-link rt-last w-dropdown-link">Home three</a>
                        </nav>
                      </div>
                      <a href="/about" aria-current="page" className="rt-navbar-dropdown-toggle w-inline-block w--current">
                        <div className="rt-menu-text">About</div>
                      </a>
                      <a href="/contact" className="rt-navbar-dropdown-toggle rt-bottom w-inline-block">
                        <div className="rt-menu-text">Contact</div>
                      </a>
                    </div>
                    <div className="rt-mobile-menu-button-wrap">
                      <a href="/sign-in" target="_blank" rel="noreferrer" className="rt-button-v1-main rt-position-relative w-inline-block">
                        <div className="rt-button-v1"><div className="rt-button-text">Sign in</div></div>
                        <div className="rt-button-overlay"></div>
                      </a>
                      <a href="/sign-up" target="_blank" rel="noreferrer" className="rt-button-v1-main rt-position-relative background-white-5 w-inline-block">
                        <div className="rt-button-v1 background-white-6"><div className="rt-button-text rt-btn-color">Sign up</div></div>
                        <div className="rt-button-overlay background-white-8"></div>
                      </a>
                    </div>
                  </div>
                  <div className="w-layout-vflex rt-mobile-menu-bottom-part">
                    <div className="w-layout-vflex rt-mobile-menu-llink-main">
                      <div className="rt-text-style-h5">Follow us</div>
                      <div className="w-layout-hflex rt-social-link-wrap">
                        <a href="https://www.instagram.com/" className="rt-mega-menu-icon w-inline-block">
                          <img width={10} height={18} alt="Instagram" src={`${A}/68ff46366a330717f35394cc_Kloudera-team-icon.svg`} loading="lazy" />
                        </a>
                        <a href="https://x.com/" className="rt-mega-menu-icon w-inline-block">
                          <img width={14} height={14} alt="X" src={`${A}/68ff46366a330717f35394d6_kloudera-mega-menu-icon.svg`} loading="lazy" />
                        </a>
                        <a href="https://www.linkedin.com/" className="rt-mega-menu-icon w-inline-block">
                          <img width={14} height={15} alt="LinkedIn" src={`${A}/68ff46366a330717f35394d7_kloudera-mega-menu-icon.svg`} loading="lazy" />
                        </a>
                        <a href="https://www.facebook.com/" className="rt-mega-menu-icon w-inline-block">
                          <img width={10} height={18} alt="Facebook" src={`${A}/68ff46366a330717f35394d0_Kloudera-team-icon.svg`} loading="lazy" />
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

              {/* Hamburger */}
              <div data-w-id="b07e93b6-139e-136c-8189-3251b36d939b" className="rt-menu-button-main w-nav-button">
                <div className="rt-menu-line rt-top-line"></div>
                <div className="rt-menu-line rt-middle-line"></div>
                <div className="rt-menu-line rt-bottom-line"></div>
              </div>

              {/* Desktop CTA */}
              <div className="w-layout-hflex rt-navbar-button-wrap rt-tab-display-none">
                <div className="rt-signin-wrap">
                  <a href="/sign-in" target="_blank" rel="noreferrer" className="rt-menu-text rt-navbar-signin">Sign in</a>
                </div>
                <a
                  data-wf--rt-border-button--variant="padding"
                  data-w-id="9067a903-cf07-9614-de57-af0aba677203"
                  href="/contact"
                  className="rt-button-body rt-nav-btn w-variant-1b2d9ec2-3fdd-1f2f-c0ef-d11a45cf51a4 w-inline-block"
                >
                  <div className="rt-button-text rt-btn-color-nav">Start free trial</div>
                  <div className="rt-button-body-overlay rt-nav-overlay"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="rt-nav-shadows rt-opacite-on"></div>
      </div>

      {/* ══════════════════ MAIN ══════════════════ */}
      <main>

        {/* ── HERO ── */}
        <section data-w-id="6e449987-5519-293a-dd80-e64c90d9a7de" className="rt-hero-v4 rt-position-relative rt-overflow-hidden">
          <div className="w-layout-blockcontainer rt-container-main rt-position-relative w-container">
            <div className="rt-hero-v4-wrapper">

              {/* Left */}
              <div className="rt-hero-v4-left">
                <div data-w-id="56597df3-c221-7996-6257-e67d35ef3b26" className="rt-hero-v1-top-sub">
                  <div className="rt-overflow-hidden">
                    <div className="w-layout-hflex rt-hero-v2-client-img-wrap">
                      {[
                        { id: '7abbce1b-da37-af5e-d2f0-7cd49e9c1598', file: 'ecda1', w: 62, h: 47, extra: '' },
                        { id: '7abbce1b-da37-af5e-d2f0-7cd49e9c159a', file: 'ecda2', w: 59.5, h: 79, extra: ' rt-margin-left' },
                        { id: '7abbce1b-da37-af5e-d2f0-7cd49e9c159c', file: 'ecda3', w: 59.5, h: 79, extra: ' rt-margin-left' },
                      ].map(({ id, file, w, h, extra }) => (
                        <div key={id} data-w-id={id} className={`rt-hero-v2-client-image rt-overflow-hidden rt-sub-image${extra}`}>
                          <img width={w} height={h} alt="client" src={`${A}/690499e17ce0c344a20${file}_kloudera-home-two-hero-image.webp`} loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rt-overflow-hidden">
                    <div data-w-id="56597df3-c221-7996-6257-e67d35ef3b2a" className="rt-sub-text rt-sub-gredient">
                      about Task management
                    </div>
                  </div>
                </div>

                <div className="rt-hero-heading-gap rt-left">
                  <h1 data-w-id="930d11b7-0033-4561-be37-a0d90e04a780" className="rt-gap-off">
                    Smarter scheduling for stress-free project completion
                  </h1>
                </div>

                <p data-w-id="930d11b7-0033-4561-be37-a0d90e04a782" className="rt-padding-hero-v6 rt-gap-off">
                  Empower your team with seamless project management by streamlining workflows, enhancing collaboration, and keeping everyone aligned.
                </p>

                <div data-w-id="930d11b7-0033-4561-be37-a0d90e04a784" className="w-layout-hflex rt-hero-v7-button-wrap">
                  <a data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8" href="/service-one" className="rt-button-body w-inline-block">
                    <div className="rt-button-text">Get started today</div>
                    <div className="rt-button-body-overlay"></div>
                  </a>
                  <a data-wf--rt-border-button--variant="base" href="tel:4588812341" className="rt-button-body rt-nav-btn w-inline-block">
                    <div className="rt-button-text rt-btn-color-nav">Schedule a call</div>
                    <div className="rt-button-body-overlay rt-nav-overlay"></div>
                  </a>
                </div>
              </div>

              {/* Right */}
              <div data-w-id="6da1e0e9-8679-bd2c-933d-50714d290b3b" className="rt-hero-v4-right rt-mobile-l-display-none">
                <div>
                  <img
                    src={`${A}/690c2237c3412540538c8db2_taskopiya-about-hero-Hand.webp`}
                    loading="lazy"
                    alt="about hero"
                  />
                </div>
                <div className="rt-hero-v4-right-image-two">
                  <img
                    src={`${A}/6915cf130e64f93cbd9e83bc_Mobile about.webp`}
                    loading="lazy"
                    alt="Mobile about"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Speciality bar */}
          <div className="w-layout-blockcontainer rt-container-extra-large rt-hero-v4-bottom w-container">
            <div className="rt-hero-v4-speciality-main rt-shadow">
              <div className="rt-hero-v4-speciality">
                <div data-w-id="31a6b6e1-75d7-6fb0-22b0-fb0680596001" style={{ opacity: 0 }} className="rt-hero-v4-speciality-top">
                  <div className="rt-hero-v4-speciality-top-left">
                    <div className="rt-sub-gap">
                      <div className="rt-sub-text rt-sub-gredient">our speciality</div>
                    </div>
                    <h2 className="rt-gap-off rt-heading-para-gap">Building a future of organized, stress-free teamwork</h2>
                  </div>
                  <div className="rt-hero-v4-speciality-top-para">
                    <p className="rt-gap-off">Building a future of organized, stress-free teamwork starts with simplifying how projects are managed</p>
                  </div>
                </div>

                <div className="w-layout-grid rt-benefits-v2-card-wrap">
                  {[
                    { wid: '8625cd89-80d1-684b-6b8f-39c1a7682227', icon: `${A}/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg`, title: '24/7 Virtual support', desc: 'Enables teams to communicate, share files, and track progress in real time, ensuring everyone stays aligned.' },
                    { wid: '8625cd89-80d1-684b-6b8f-39c1a768222f', icon: `${A}/6916ec6339f890a80905a69b_Vector (33).svg`, title: 'Smart task tracking', desc: 'Provides clear visibility of deadlines, priorities, and responsibilities, helping teams stay organized and avoid delays.' },
                    { wid: '8625cd89-80d1-684b-6b8f-39c1a7682237', icon: `${A}/6916ef876682eed2b2fd5911_Vector (34).svg`, title: 'Integration & automation', desc: 'Connects with popular tools and automates repetitive tasks, saving time and boosting overall productivity.' },
                  ].map(({ wid, icon, title, desc }) => (
                    <div key={wid} data-w-id={wid} style={{ opacity: 0 }} className="w-layout-vflex rt-benefits-v2-card rt-two">
                      <div className="rt-benefits-v2-card-image">
                        <div className="rt-benefits-icon rt-two">
                          <img width={38} height={38} alt={title} src={icon} loading="lazy" />
                        </div>
                        <div className="rt-text-style-h6">{title}</div>
                      </div>
                      <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                        <p className="rt-gap-off">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Banner image */}
          <div className="rt-hero-v4-image">
            <img
              src={`${A}/6915cd620829878f7ea58178_taskopiya-about-banner.webp`}
              loading="lazy"
              alt="taskopiya-about-banner"
            />
          </div>
          <div className="rt-hero-v4-dot one"></div>
          <div className="rt-hero-v4-dot two"></div>
          <div className="rt-hero-v4-dot three"></div>
          <div className="rt-hero-v4-dot four"></div>
          <div className="rt-hero-v4-dot five"></div>
          <div className="rt-hero-v4-bottom-overlay"></div>
        </section>

        {/* ── FEATURES ── */}
        <section className="rt-features-v1">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap">
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">our features</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Boost team productivity through <span className="rt-color-periwinkle-gray">streamlined workflows</span>
              </h2>
            </div>

            <div className="rt-features-v1-wrapper">
              {/* Feature 1 — Progress tracking */}
              <div data-w-id="7332a125-a796-723b-e9c9-e16e2936f971" className="rt-features-v1-left rt-border-radius-l">
                <div className="rt-features-v1-inner-heading">
                  <div className="rt-small-sub-gap"><div className="rt-sub-text rt-sub-small">Task Summary</div></div>
                  <div className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap">Real-time progress tracking</div>
                  <p className="rt-color-pale-periwinkle rt-gap-off">Real-Time Progress Tracking gives teams complete visibility into every task, milestone, and deadline.</p>
                </div>
                <div data-w-id="62508c73-e31b-0068-13cd-79c365633cb0" className="rt-features-v1-inner-image">
                  <img
                    src={`${A}/690c408d17e948acfd9dd61a_taskopia- about-features-1.webp`}
                    loading="lazy"
                    alt="about-features-1"
                  />
                  <div className="rt-features-v1-inner-image-over">
                    <div data-w-id="bcfd77a1-c414-9dba-e50b-0935c10eca41" className="rt-features-v1-inner-image-inner">
                      <img src={`${A}/690c411f1386eb9e04e8adb7_Mask group (9).webp`} loading="lazy" alt="line-animation" className="rt-image-min-width" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 — Collaboration */}
              <div data-w-id="56f1b25a-061c-3e82-d0b8-df0f60b657fd" className="rt-features-v1-left rt-border-radius-l rt-right">
                <div className="rt-features-v1-inner-heading">
                  <div className="rt-small-sub-gap"><div className="rt-sub-text rt-sub-small">collaboration</div></div>
                  <div className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap">Team collaboration hub</div>
                  <p className="rt-color-pale-periwinkle rt-gap-off">A centralized space for discussions, file sharing, and feedback to keep teams connected and productive.</p>
                </div>
                <div className="rt-features-v1-inner-image-2">
                  <div data-w-id="7a0ae718-492b-9c68-43b4-75a267c14680" className="rt-features-v1-right-image-one">
                    <img
                      src={`${A}/690c465f3c3aa6146c8e184d_Group 2147225572.png`}
                      loading="lazy"
                      alt="collaboration"
                    />
                  </div>
                  <div data-w-id="cf38d222-3eb1-22c6-4716-782e02464715" className="rt-features-v1-right-image">
                    <img
                      src={`${A}/690c408c3798540bf3f8932b_taskopia- about-features-3.webp`}
                      loading="lazy"
                      alt="about-features-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="rt-choose-v3">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap">
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">Why choose us</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Boost productivity through organized <span className="rt-color-periwinkle-gray">task management</span>
              </h2>
            </div>

            <div data-w-id="7755f54e-a063-7fd1-4011-b0bcae52ff74" className="rt-choose-v3-wrap">
              {[
                { icon: `${A}/6916f56a114dfcf4637d80a2_Vector (36).svg`, title: 'Centralized workspace', desc: 'Manage all projects, tasks, and files in one platform for complete visibility and control.' },
                { icon: `${A}/6916f56a80d627cd0ce40bd7_690091602dd7aa7a0c1228ed_kloudera-pricing-icon.svg`, title: 'Seamless collaboration', desc: 'Enable teams to communicate, share updates, and work together in real time.' },
                { icon: `${A}/6916f56ad8ac594c1debbb97_Vector (37).svg`, title: 'Automation & integrations', desc: 'Automate repetitive tasks and connect with tools your team already uses.' },
                { icon: `${A}/6916ef876682eed2b2fd5911_Vector (34).svg`, title: 'Data-driven insights', desc: 'Get smart reports and analytics to track performance and improve efficiency.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rt-choose-v3-item">
                  <div className="rt-choose-v3-item-icon">
                    <img src={icon} loading="lazy" alt={title} />
                  </div>
                  <div className="rt-choose-v3-item-line"></div>
                  <div className="rt-choose-v3-item-text-wrap">
                    <div className="rt-text-style-h6">{title}</div>
                    <p className="rt-gap-off">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR GOAL ── */}
        <section className="rt-our-goal">
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-our-goal-main rt-position-relative rt-overflow-hidden">
              <div className="rt-our-goal-inner">
                <div className="rt-our-goal-inner-wrap">
                  <div className="rt-our-goal-left">
                    <div className="rt-sub-gap">
                      <div data-w-id="10e068ac-9f62-8197-67e4-96584fae3d03" className="rt-sub-text rt-sub-gredient">our goal</div>
                    </div>
                    <div className="rt-heading-para-gap">
                      <h2 data-w-id="10e068ac-9f62-8197-67e4-96584fae3d06" className="rt-gap-off">
                        Connecting tasks to outcomes that fuel growth
                      </h2>
                    </div>
                    <div data-w-id="10e068ac-9f62-8197-67e4-96584fae3d08" className="rt-analytics-v2-para-wrap rt-gap-large">
                      <p className="rt-gap-off">Connecting tasks to outcomes that fuel growth by aligning team efforts with clear goals, ensuring every project contributes to long-term success.</p>
                    </div>

                    <div className="w-layout-grid rt-our-goal-left-inner-wrapper">
                      {[
                        { wid: '10e068ac-9f62-8197-67e4-96584fae3d0c', icon: `${A}/6916ec6339f890a80905a69b_Vector (33).svg`, title: 'Enhance team productivity', desc: 'Help teams stay focused, reduce delays, and complete tasks faster with smoother workflows.' },
                        { wid: '10e068ac-9f62-8197-67e4-96584fae3d14', icon: `${A}/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg`, title: 'Ensure project transparency', desc: 'Give clear updates, improve visibility, and keep everyone aligned throughout projects.' },
                      ].map(({ wid, icon, title, desc }) => (
                        <div key={wid} data-w-id={wid} className="w-layout-vflex rt-our-goal-left-inner">
                          <div className="rt-icon-no rt-small">
                            <img width={45} height={45} alt="" src={icon} loading="lazy" />
                          </div>
                          <div className="w-layout-vflex rt-analytics-v2-text-wrap">
                            <div className="rt-text-style-h6">{title}</div>
                            <p className="rt-gap-off">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div data-w-id="10e068ac-9f62-8197-67e4-96584fae3d1c" className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                      <a href="/contact" className="rt-button-body w-inline-block">
                        <div className="rt-button-text">Start free trial</div>
                        <div className="rt-button-body-overlay"></div>
                      </a>
                    </div>
                  </div>

                  <div className="rt-our-goal-right rt-position-relative">
                    <div className="rt-our-goal-right-image-wrap">
                      <img
                        width={424}
                        height={519}
                        alt="goal-1"
                        src={`${A}/690c6ad1d102d19b352ee0d0_Taskopia-about-goal-1.webp`}
                        loading="lazy"
                      />
                    </div>
                    <div data-w-id="9c1d7b40-2e15-4a4c-54e5-f1fd08a7e199" className="rt-our-goal-overlay"></div>
                    <div data-w-id="9c1d7b40-2e15-4a4c-54e5-f1fd08a7e19a" className="rt-our-goal-absolute-image rt-mobile-l-display-none">
                      <img alt="goal-2" src={`${A}/690c6ad1caeaf4cf1d1053ae_Taskopia-about-goal-2.webp`} loading="lazy" />
                    </div>
                    <div data-w-id="9c1d7b40-2e15-4a4c-54e5-f1fd08a7e19c" className="rt-our-goal-absolute-line rt-mobile-l-display-none">
                      <img width={68} height={198} alt="" src={`${A}/690c6739a599070d1f107184_kloudera-service-three-faq-line.svg`} loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rt-tools-icon-overlay rt-two">
                <img src={`${A}/690c617ce241b4a9015d2d58_Vector 1533.webp`} loading="lazy" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="rt-process" style={{ paddingBottom: '14rem', position: 'relative' }}>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap">
              <div data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdeb" className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">our process</div>
              </div>
              <h2 data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdee" className="rt-gap-off rt-desktop-text-center">
                Boost team productivity through <span className="rt-color-periwinkle-gray">streamlined workflows</span>
              </h2>
            </div>

            <div className="rt-process-main rt-position-relative">
              {/* Step tabs */}
              <div className="rt-process-wrapper">
                <div className="rt-process-item">
                  <div data-w-id="baf8e5e7-49ac-4f7f-ad09-58deaac1a659" className="rt-process-text"><div>Plan assign</div></div>
                  <div data-w-id="55254470-bac2-0dd8-dd5a-5cfe717a3c25" className="rt-process-item-line-main">
                    <div className="rt-process-item-line one"></div>
                  </div>
                </div>
                <div className="rt-process-item">
                  <div data-w-id="e48fada5-0185-92fe-c33e-d6a7c98377b3" className="rt-process-text"><div>Workflows</div></div>
                  <div data-w-id="e48fada5-0185-92fe-c33e-d6a7c98377b6" className="rt-process-item-line-main">
                    <div className="rt-process-item-line two"></div>
                  </div>
                </div>
                <div className="rt-process-item">
                  <div data-w-id="0d8e4976-b51c-d283-cc1a-5a60ed5dc1f7" className="rt-process-text"><div>Seamless tracking</div></div>
                  <div data-w-id="0d8e4976-b51c-d283-cc1a-5a60ed5dc1fa" className="rt-process-item-line-main">
                    <div className="rt-process-item-line three"></div>
                  </div>
                </div>
                <div className="rt-process-item">
                  <div data-w-id="b4ca4a0e-d949-d77f-5378-a8300d077e81" className="rt-process-text"><div>Execute</div></div>
                  <div data-w-id="b4ca4a0e-d949-d77f-5378-a8300d077e84" className="rt-process-item-line-main">
                    <div className="rt-process-item-line four"></div>
                  </div>
                </div>
                <div className="rt-process-item">
                  <div data-w-id="e54f59c9-a53c-e843-6644-89e2987b9f51" className="rt-process-text"><div>Analyze</div></div>
                  <div data-w-id="e54f59c9-a53c-e843-6644-89e2987b9f54" className="rt-process-item-line-main">
                    <div className="rt-process-item-line five"></div>
                  </div>
                </div>
              </div>

              {/* Process detail boxes */}
              <div className="rt-process-item-overlay rt-overflow-hidden">
                <div data-w-id="fe26f0d6-37c8-3685-a177-c8bb05fdb9ca" className="rt-process-box rt-1">
                  <div className="rt-icon-no">
                    <img src={`${A}/690c7b256a26b771ea0562fb_Vector (27).svg`} loading="lazy" alt="" />
                  </div>
                  <div className="rt-process-text-gap">
                    <div className="rt-text-style-h6 rt-text-color-white">Task setup</div>
                    <p className="rt-gap-off rt-text-color-white">Create and assign tasks with clear deadlines to ensure smooth project initiation.</p>
                  </div>
                </div>

                <div data-w-id="9a59051b-7eac-c0f0-0d70-0d14e85112ac" className="rt-process-box rt-2">
                  <div className="rt-icon-no">
                    <img src={`${A}/690c7b2508ab483ef4047387_Vector (28).svg`} loading="lazy" alt="" />
                  </div>
                  <div className="rt-process-text-gap">
                    <div className="rt-text-style-h6">Progress tracking</div>
                    <p className="rt-gap-off">Monitor task status and analyze team performance with real-time updates.</p>
                  </div>
                </div>

                <div data-w-id="6b5c6d36-e516-7ca4-cea7-722942bbc918" className="rt-process-box rt-3">
                  <div className="rt-icon-no">
                    <img src={`${A}/6914525ddeeb169b19ad1aa4_Vector (29).svg`} loading="lazy" alt="" />
                  </div>
                  <div className="rt-process-text-gap">
                    <div className="rt-text-style-h6">Report &amp; share</div>
                    <p className="rt-gap-off">Export project reports tailored for stakeholders to keep everyone aligned.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <div className="rt-position-relative">
          <section className="rt-faq">
            <div className="w-layout-blockcontainer rt-container-main w-container">
              <div className="rt-faq-content-main-v2">
                <div className="w-layout-hflex rt-faq-heading-main rt-faq-2-main-left">
                  <div className="w-layout-vflex rt-faq-heading-wrap rt-faq-v2">
                    <div className="rt-sub-gap">
                      <div data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb877" className="rt-sub-text rt-sub-gredient">Frequently asked questions</div>
                    </div>
                    <h2 data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb879" className="rt-no-margin">
                      Everything you want to know <span className="rt-color-periwinkle-gray">explained clearly</span>
                    </h2>
                    <div data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb87d" className="rt-button-para-gap">
                      <a data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8" href="/contact" className="rt-button-body w-inline-block">
                        <div className="rt-button-text">Contact us today</div>
                        <div className="rt-button-body-overlay"></div>
                      </a>
                    </div>
                  </div>
                </div>
                <div data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb880" className="rt-faq-main rt-margin-auto rt-faq-2-main">
                  {[
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb881', q: 'Does it integrate with other tools?', a: 'AI automation uses artificial intelligence to perform repetitive tasks, analyze data, and optimize processes, enabling businesses to save time, reduce errors, and make smarter, faster decisions efficiently.', isTop: true, paraClass: '' },
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb88f', q: 'How can task management software improve productivity?', a: 'AI can automate repetitive tasks like data entry, customer support, report generation, inventory management, and workflow optimization, allowing teams to focus on strategic, high-value activities and business growth.', paraClass: ' rt-faq-v2' },
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb89d', q: 'Can I collaborate with my team using this platform?', a: 'Yes, AI automation is ideal for small businesses. It streamlines operations, reduces manual work, improves efficiency, and provides actionable insights, helping smaller teams compete and grow effectively.', paraClass: '' },
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb8ab', q: 'Is this suitable for small teams and enterprises?', a: 'Industries like finance, healthcare, retail, manufacturing, and logistics benefit greatly from AI automation. It streamlines operations, reduces errors, enhances customer service, and drives efficiency across diverse business sectors.', paraClass: '' },
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb8b9', q: 'Can I track project deadlines?', a: 'Absolutely. AI automation seamlessly integrates with your existing tools and platforms, allowing workflows to connect effortlessly, enhancing productivity, reducing manual effort, and ensuring a smooth transition without disrupting current operations.', paraClass: ' rt-faq-v2' },
                  ].map(({ wid, q, a, isTop, paraClass }, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={wid}
                        data-w-id={wid}
                        className={`w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag${isTop ? ' rt-top-gap-of' : ''}`}
                        style={{ cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0)' }}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                      >
                        <div className="w-layout-hflex rt-faq-top-part">
                          <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
                            <div className="rt-text-style-h6">{q}</div>
                          </div>
                          <div className="rt-faq-right-part">
                            <div className="rt-faq-minus"></div>
                            <div className="rt-faq-plus" style={isOpen ? { transform: 'rotate(45deg)' } : {}}></div>
                          </div>
                        </div>
                        {isOpen && (
                          <div className="rt-faq-bottom-part rt-overflow-hidden" style={{ height: 'auto', display: 'block' }}>
                            <div className={`rt-faq-para-wrap${paraClass}`}>
                              <p className="rt-gap-off">{a}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="ff1e6d5c-f1a0-634b-694b-32e3986fb09b" className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
            <div className="rt-section-overlay"></div>
          </div>
        </div>

        {/* ── CTA ── */}
        <section>
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-collaborate-card-main rt-position-relative rt-overflow-hidden">
              <div className="rt-footer-card-content rt-desktop-text-center">
                <div className="rt-sub-gap">
                  <div data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc12" className="rt-sub-text rt-text-color-white">Get Organized, Stay Ahead</div>
                </div>
                <div className="rt-heading-para-gap">
                  <h2 data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc15" className="rt-text-color-white rt-gap-off">Collaborate seamlessly, manage projects with ease</h2>
                </div>
                <p data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc17" className="rt-text-color-white rt-gap-off rt-footer-card-para">Simplify your workflow with a single platform that keeps tasks, deadlines, and teams perfectly aligned.</p>
                <div data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc19" className="rt-button-para-gap">
                  <a data-wf--rt-white-button--variant="color" data-w-id="0405d357-f0f5-aac8-4042-22ceb6fb3cbf" href="/contact" className="rt-button-body rt-bg-color w-inline-block">
                    <div className="rt-button-text rt-btn-color" style={{ color: '#1a0b54' }}>&nbsp;Get started today</div>
                    <div className="rt-button-body-overlay rt-color-blue w-variant-172fb5df-db24-987d-98c7-3d35693edb61 rt-color-change"></div>
                  </a>
                </div>
              </div>
              <div data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc1b" className="rt-collaborate-card-line-1 rt-tab-display-none">
                {[1, 2, 3, 4].map((i) => (
                  <div key={`line1-${i}`} className={`rt-collaborate-icon rt-${i}`}>
                    <div><img src={`${A}/690c965e97785a12d9fab6b0_Nira (1).svg`} loading="lazy" alt="" /></div>
                  </div>
                ))}
              </div>
              <div data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc28" className="rt-collaborate-card-line-2 rt-tab-display-none">
                {[1, 2, 3, 4].map((i) => (
                  <div key={`line2-${i}`} className={`rt-collaborate-icon rt-${i}`}>
                    <div><img src={`${A}/690c965e97785a12d9fab6b0_Nira (1).svg`} loading="lazy" alt="" /></div>
                  </div>
                ))}
              </div>
              <div data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc35" className="rt-collaborate-card-line-3 rt-tab-display-none">
                {[1, 2, 3, 4].map((i) => (
                  <div key={`line3-${i}`} className={`rt-collaborate-icon rt-${i}`}>
                    <div><img src={`${A}/690c965e97785a12d9fab6b0_Nira (1).svg`} loading="lazy" alt="" /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section className="rt-blog-v4">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-blog-v4-heading">
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">integration</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Insights to organize work and <span className="rt-color-periwinkle-gray">achieve more</span>
              </h2>
            </div>
            <div className="w-dyn-list">
              <div role="list" className="rt-blog-v4-card-main w-dyn-items">
                {[
                  {
                    href: '/blog-post/simplify-projects-through-intelligent-task-management',
                    img: '690334392ba1ea2dde7061fb_blog-three-G.png',
                    date: '29 Oct 2025',
                    title: 'Simplify projects through intelligent task management',
                    authorImg: '692578b4c0960e6fd75eecf4_blog-four.webp',
                    author: 'Phyllis Juniper'
                  },
                  {
                    href: '/blog-post/empowering-teams-through-organized-workflows',
                    img: '69033491fe6b91fcc7c657c1_blog-three-F.png',
                    date: '29 Oct 2025',
                    title: 'Empowering teams through organized workflows',
                    authorImg: '692578949272463827cff5ff_blog-five.webp',
                    author: 'Nadia Dulac'
                  },
                  {
                    href: '/blog-post/efficiency-starts-with-effective-task-management',
                    img: '690334d31c75da8a7738d07f_blog-three-E.png',
                    date: '29 Oct 2025',
                    title: 'Efficiency starts with effective task management',
                    authorImg: '692578854278fc2eb9bf2c9e_blog-two.webp',
                    author: 'Alyssa Ireae'
                  }
                ].map((post, idx) => (
                  <div key={idx} role="listitem" className="w-dyn-item">
                    <a data-w-id="6b5c6d36-e516-7ca4-cea7-722942bbc916" href={post.href} className="rt-blog-v3-card rt-border-radius-medium w-inline-block">
                      <div className="rt-blog-v3-card-top-part rt-border-radius-medium rt-overflow-hidden">
                        <img className="rt-auto-fit rt-desktop-image-full-width rt-blog-image" src={`${A}/${post.img}`} width="410" height="348" alt="" data-w-id="6b5c6d36-e516-7ca4-cea7-722942bbc918" loading="lazy" />
                      </div>
                      <div className="rt-blog-v3-card-bottom-part">
                        <div className="w-layout-hflex rt-blog-v3-publish-date">
                          <div className="w-layout-vflex">
                            <img width="15" height="16" alt="" src={`${A}/6903524c7f841af5015b3844_kloudera-blog-two-icon.svg`} loading="lazy" />
                          </div>
                          <div>{post.date}</div>
                        </div>
                        <div className="rt-text-style-h6">{post.title}</div>
                        <div className="w-layout-hflex rt-blog-v2-author-details">
                          <div className="rt-blog-v2-author-image rt-overflow-hidden">
                            <img width="38" height="38" alt="" src={`${A}/${post.authorImg}`} loading="lazy" className="rt-auto-fit rt-desktop-image-full-width" />
                          </div>
                          <div>{post.author}</div>
                        </div>
                      </div>
                      <div className="rt-link-discernible">This is some text inside of a div block.</div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <section data-wf--rt-footer-v1--variant="base" className="rt-footer rt-color-change rt-position-relative">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div data-w-id="e6ec5761-f4fc-4af6-536f-a4c3f63a640a" className="rt-footer-wrap rt-position-relative">
              <div className="w-layout-grid rt-footer-link-grid">
                <div id="w-node-e6ec5761-f4fc-4af6-536f-a4c3f63a640c-fe735dda" className="w-layout-vflex rt-footer-link-wrap">
                  <div className="rt-small-name rt-text-color-white">Need help?</div>
                  <div className="w-layout-vflex rt-footer-link-box rt-change">
                    <div className="rt-footer-link">
                      <div className="rt-text-color-white rt-color-change">Call us directly</div>
                      <a href="tel:8884567890" className="rt-text-color-white rt-bark rt-footer-link">(888) 456 7890</a>
                    </div>
                    <div>
                      <div className="rt-text-color-white rt-color-change">Email us directly</div>
                      <a href="mailto:info@example.com" className="rt-text-color-white rt-emil rt-color-blue rt-footer-link">info@example.com</a>
                    </div>
                  </div>
                </div>
                <div className="w-layout-vflex rt-footer-link-wrap">
                  <div className="rt-small-name rt-text-color-white">Quick links</div>
                  <div className="w-layout-vflex rt-footer-link-box">
                    <a href="/home-one" className="rt-footer-link">Home</a>
                    <a href="/about" aria-current="page" className="rt-footer-link">About </a>
                    <a href="/blog-one" className="rt-footer-link">Blog</a>
                    <a href="/service-one" className="rt-footer-link">Service</a>
                    <a href="/pricing" className="rt-footer-link">Pricing</a>
                  </div>
                </div>
                <div className="w-layout-vflex rt-footer-link-wrap rt-border-none">
                  <div className="rt-small-name rt-text-color-white">Utilities</div>
                  <div className="w-layout-vflex rt-footer-link-box">
                    <a href="/license" className="rt-footer-link">License</a>
                    <a href="/style-guide" className="rt-footer-link">Style guide</a>
                    <a href="https://taskopia.webflow.io/401" target="_blank" className="rt-footer-link">Password protected</a>
                    <a href="https://taskopia.webflow.io/404" target="_blank" className="rt-footer-link">404</a>
                    <a href="/changelog" className="rt-footer-link">Changelog</a>
                  </div>
                </div>
                <div id="w-node-e6ec5761-f4fc-4af6-536f-a4c3f63a6430-fe735dda" className="w-layout-vflex rt-footer-link-main">
                  <div className="w-layout-vflex rt-footer-text-wrap">
                    <div className="rt-small-name rt-text-color-white">Get in touch</div>
                    <p className="rt-color-pale-periwinkle rt-gap-off rt-gap"><span className="rt-text-color-white rt-bark">Let’s discuss your next project</span>—connect with our team today for tailored solutions.</p>
                  </div>
                  <div className="rt-black-footer">
                    <a data-w-id="c8a9123b-e737-6c41-a0a9-96ac3b2f975c" href="tel:8884567890" className="rt-button-body w-inline-block">
                      <div className="rt-button-text rt-blue-white" style={{ color: '#fff' }}>Schedule a call</div>
                      <div className="rt-button-body-overlay rt-blue-white"></div>
                    </a>
                  </div>
                  <div className="rt-white-footer">
                    <a data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8" href="tel:8884567890" className="rt-button-body w-inline-block">
                      <div className="rt-button-text">Schedule a call</div>
                      <div className="rt-button-body-overlay"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-layout-hflex rt-footer-bottom-part">
              <a href="/" className="rt-navbar-logo rt-position-relative w-nav-brand">
                <img width="191" height="40" alt="" src={`${A}/691451006ceea5f04fa24c51_footer logo.svg`} loading="lazy" />
                <div className="rt-link-discernible">link<br />‍</div>
              </a>
              <p className="rt-no-margin rt-color-pale-periwinkle rt-mobile-text-center">Designed by&nbsp;<a href="https://www.radianttemplates.com/" className="rt-bottom-link">Radiant Templates</a>, Powered by&nbsp;<a href="https://webflow.com/" className="rt-bottom-link">Webflow</a></p>
              <div className="rt-social-media">
                <div className="rt-color-pale-periwinkle">Social media :</div>
                <a href="https://dribbble.com/" className="rt-sicial-link rt-position-relative rt-overflow-hidden w-inline-block">
                  <div className="rt-social-media-link"><img src={`${A}/6914525ddeeb169b19ad1aa4_Vector (29).svg`} loading="lazy" alt="" className="rt-nivert" /></div>
                  <div className="rt-link-discernible">link<br />‍</div>
                </a>
                <a href="https://www.instagram.com/" className="rt-sicial-link rt-position-relative rt-overflow-hidden w-inline-block">
                  <div className="rt-social-media-link"><img src={`${A}/6914525d5095fa32d625e19c_Vector (30).svg`} loading="lazy" alt="" className="rt-nivert" /></div>
                  <div className="rt-link-discernible">link<br />‍</div>
                </a>
                <a href="https://www.pinterest.com/" className="rt-sicial-link rt-position-relative rt-overflow-hidden w-inline-block">
                  <div className="rt-social-media-link"><img src={`${A}/6914525d8e53e345a9c4d809_Vector (31).svg`} loading="lazy" alt="" className="rt-nivert" /></div>
                  <div className="rt-link-discernible">link<br />‍</div>
                </a>
              </div>
            </div>
          </div>
          <div className="rt-footer-bottom-line"></div>
        </section>
      </main>

    </>
  );
}
