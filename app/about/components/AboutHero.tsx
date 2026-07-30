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
                          <Image width={w} height={h} alt="client" src={`${A}/690499e17ce0c344a20${file}_kloudera-home-two-hero-image.webp`} loading="lazy"  />
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
                  <Link data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8" href="/service-one" className="rt-button-body w-inline-block">
                    <div className="rt-button-text">Get started today</div>
                    <div className="rt-button-body-overlay"></div>
                  </Link>
                  <a data-wf--rt-border-button--variant="base" href="tel:4588812341" className="rt-button-body rt-nav-btn w-inline-block">
                    <div className="rt-button-text rt-btn-color-nav">Schedule a call</div>
                    <div className="rt-button-body-overlay rt-nav-overlay"></div>
                  </a>
                </div>
              </div>

              {/* Right */}
              <div data-w-id="6da1e0e9-8679-bd2c-933d-50714d290b3b" className="rt-hero-v4-right rt-mobile-l-display-none">
                <div>
                  <Image src={`${A}/690c2237c3412540538c8db2_taskopiya-about-hero-Hand.webp`} loading="lazy" alt="about hero"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-hero-v4-right-image-two">
                  <Image src={`${A}/6915cf130e64f93cbd9e83bc_Mobile about.webp`} loading="lazy" alt="Mobile about"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
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
                          <Image width={38} height={38} alt={title} src={icon} loading="lazy"  />
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
            <Image src={`${A}/6915cd620829878f7ea58178_taskopiya-about-banner.webp`} loading="lazy" alt="taskopiya-about-banner"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
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
