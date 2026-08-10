import React from 'react';
import Link from "next/link";

import Image from "next/image";

const A = '/about-assets';

export default function AboutHero() {
  return (
    <>
      {/* ── HERO ── */}
      <section data-w-id="6e449987-5519-293a-dd80-e64c90d9a7de" className="rt-hero-v4 rt-position-relative rt-overflow-hidden">
        <div className="w-layout-blockcontainer rt-container-main rt-position-relative w-container">
          <div className="rt-hero-v4-wrapper">

            {/* Left */}
            <div className="rt-hero-v4-left" style={{ marginTop: '-4rem' }}>
              <div data-w-id="56597df3-c221-7996-6257-e67d35ef3b26" className="rt-hero-v1-top-sub">
                <div className="rt-overflow-hidden">
                  <div className="w-layout-hflex rt-hero-v2-client-img-wrap">
                    {[
                      { id: '7abbce1b-da37-af5e-d2f0-7cd49e9c1598', extra: '', color: '#38bdf8' },
                      { id: '7abbce1b-da37-af5e-d2f0-7cd49e9c159a', extra: ' rt-margin-left', color: '#3b82f6' },
                      { id: '7abbce1b-da37-af5e-d2f0-7cd49e9c159c', extra: ' rt-margin-left', color: '#a855f7' },
                    ].map(({ id, extra, color }) => (
                      <div key={id} data-w-id={id} className={`rt-hero-v2-client-image rt-overflow-hidden rt-sub-image${extra}`} style={{ border: 'none' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: color, borderRadius: '50%' }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rt-overflow-hidden">
                  <div data-w-id="56597df3-c221-7996-6257-e67d35ef3b2a" className="rt-sub-text rt-sub-gredient">
                    about Tryangletech
                  </div>
                </div>
              </div>

              <div className="rt-hero-heading-gap rt-left pt-0">
                <h1 data-w-id="930d11b7-0033-4561-be37-a0d90e04a780" className="rt-gap-off">
                  Your Trusted IT & Digital Partner
                </h1>
              </div>

              <p data-w-id="930d11b7-0033-4561-be37-a0d90e04a782" className="rt-padding-hero-v6 rt-gap-off" style={{ marginBottom: '1rem' }}>
                Tryangletech is a full-service IT company in Ahmedabad, helping businesses design, build, and grow with expert website development, mobile apps, digital marketing, and custom software solutions, all under one roof.
              </p>
              
              <p data-w-id="930d11b7-0033-4561-be37-a0d90e04a782" style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '95%' }}>
                We don't just write code, we partner with you to solve real business challenges. No confusing jargon or hidden costs, just a dedicated local team that actually cares about your success.
              </p>

              {/* Stats row */}
              <div data-w-id="930d11b7-0033-4561-be37-a0d90e04a784" style={{ display: 'flex', gap: '24px', marginTop: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                {[
                  { value: '7+', label: 'Years of Experience' },
                  { value: '350+', label: 'Websites Developed' },
                  { value: '750+', label: 'Happy Clients' },
                  { value: '5+', label: 'Countries Served' },
                ].map(({ value, label }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', minWidth: '80px' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2d3a8c', lineHeight: 1.1 }}>{value}</span>
                    <span style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '4px', fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons
              <div data-w-id="930d11b7-0033-4561-be37-a0d90e04a784" className="w-layout-hflex rt-hero-v7-button-wrap">
                <Link data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8" href="/service-one" className="rt-button-body w-inline-block">
                  <div className="rt-button-text">Our Services</div>
                  <div className="rt-button-body-overlay"></div>
                </Link>
                <a data-wf--rt-border-button--variant="base" href="/contact" className="rt-button-body rt-nav-btn w-inline-block">
                  <div className="rt-button-text rt-btn-color-nav">Get in Touch</div>
                  <div className="rt-button-body-overlay rt-nav-overlay"></div>
                </a>
              </div> */}
            </div>

            {/* Right */}
            <div data-w-id="6da1e0e9-8679-bd2c-933d-50714d290b3b" className="rt-hero-v4-right rt-mobile-l-display-none">
              <div>
                <Image src={`${A}/690c2237c3412540538c8db2_taskopiya-about-hero-Hand.webp`} loading="lazy" alt="TryangleTech About Hero" width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-hero-v4-right-image-two">
                <Image src={`${A}/6915cf130e64f93cbd9e83bc_Mobile about.webp`} loading="lazy" alt="TryangleTech Mobile App Preview" width={800} height={800} style={{ width: "100%", height: "auto" }} />
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
                  <h2 className="rt-gap-off rt-heading-para-gap">Building digital solutions that drive real business growth</h2>
                </div>
                <div className="rt-hero-v4-speciality-top-para">
                  <p className="rt-gap-off">Our dedicated team works closely with you at every stage, turning complex challenges into streamlined, high-performing digital products that scale with your business.</p>
                </div>
              </div>

              <div className="w-layout-grid rt-benefits-v2-card-wrap">
                {[
                  { wid: '8625cd89-80d1-684b-6b8f-39c1a7682227', icon: `${A}/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg`, title: 'Web Design & Development', desc: 'Precision-crafted websites  custom builds, WordPress, and e-commerce  designed to engage your audience across every device.' },
                  { wid: '8625cd89-80d1-684b-6b8f-39c1a768222f', icon: `${A}/6916ec6339f890a80905a69b_Vector (33).svg`, title: 'Mobile App Development', desc: 'iOS and Android apps built with cutting-edge technology and user-centric design, for brands across the globe.' },
                  { wid: '8625cd89-80d1-684b-6b8f-39c1a7682237', icon: `${A}/6916ef876682eed2b2fd5911_Vector (34).svg`, title: 'Digital Marketing & SEO', desc: 'Complete digital marketing and SEO strategies that improve visibility, drive quality traffic, and grow your online revenue.' },
                ].map(({ wid, icon, title, desc }) => (
                  <div key={wid} data-w-id={wid} style={{ opacity: 0 }} className="w-layout-vflex rt-benefits-v2-card rt-two">
                    <div className="rt-benefits-v2-card-image">
                      <div className="rt-benefits-icon rt-two">
                        <Image width={38} height={38} alt={title} src={icon} loading="lazy" />
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
          <Image src={`${A}/6915cd620829878f7ea58178_taskopiya-about-banner.webp`} loading="lazy" alt="TryangleTech Team Banner" width={800} height={800} style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="rt-hero-v4-dot one"></div>
        <div className="rt-hero-v4-dot two"></div>
        <div className="rt-hero-v4-dot three"></div>
        <div className="rt-hero-v4-dot four"></div>
        <div className="rt-hero-v4-dot five"></div>
        <div className="rt-hero-v4-bottom-overlay"></div>
      </section>
    </>
  );
}
