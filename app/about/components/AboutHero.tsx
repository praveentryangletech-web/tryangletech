'use client';

import React from 'react';
import SafeImage from '@/app/common/SafeImage';
import { AboutHeroSection, AboutSpecialitySection } from '@/backend/services/about/about.types';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';

interface AboutHeroProps {
  hero?: AboutHeroSection;
  speciality?: AboutSpecialitySection;
}

export default function AboutHero({ hero = DEFAULT_ABOUT_CONTENT.hero, speciality = DEFAULT_ABOUT_CONTENT.speciality }: AboutHeroProps) {
  const avatars = hero.avatars || ['#38bdf8', '#3b82f6', '#a855f7'];
  const stats = hero.stats && hero.stats.length > 0 ? hero.stats : DEFAULT_ABOUT_CONTENT.hero.stats;
  const benefits = speciality.benefits && speciality.benefits.length > 0 ? speciality.benefits : DEFAULT_ABOUT_CONTENT.speciality.benefits;

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
                    {avatars.map((av, idx) => {
                      const isImg = av && (av.startsWith('http') || av.startsWith('/') || av.startsWith('data:'));
                      return (
                        <div
                          key={idx}
                          className={`rt-hero-v2-client-image rt-overflow-hidden rt-sub-image${idx > 0 ? ' rt-margin-left' : ''}`}
                          style={{ border: 'none' }}
                        >
                          {isImg ? (
                            <SafeImage
                              src={av}
                              alt={`Client Avatar ${idx + 1}`}
                              width={60}
                              height={60}
                              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ width: '60px', height: '60px', backgroundColor: av, borderRadius: '50%' }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="rt-overflow-hidden">
                  <div data-w-id="56597df3-c221-7996-6257-e67d35ef3b2a" className="rt-sub-text rt-sub-gredient">
                    {hero.subBadgeText || 'about Tryangletech'}
                  </div>
                </div>
              </div>

              <div className="rt-hero-heading-gap rt-left pt-0">
                <h1 data-w-id="930d11b7-0033-4561-be37-a0d90e04a780" className="rt-gap-off">
                  {hero.headline || 'Your Trusted IT & Digital Partner'}
                </h1>
              </div>

              <p data-w-id="930d11b7-0033-4561-be37-a0d90e04a782" className="rt-padding-hero-v6 rt-gap-off" style={{ marginBottom: '1rem' }}>
                {hero.introParagraph1 ||
                  'Tryangletech is a full-service IT company in Ahmedabad, helping businesses design, build, and grow with expert website development, mobile apps, digital marketing, and custom software solutions, all under one roof.'}
              </p>

              {hero.introParagraph2 && (
                <p data-w-id="930d11b7-0033-4561-be37-a0d90e04a782" style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '95%' }}>
                  {hero.introParagraph2}
                </p>
              )}

              {/* Stats row */}
              <div data-w-id="930d11b7-0033-4561-be37-a0d90e04a784" style={{ display: 'flex', gap: '24px', marginTop: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                {stats.map((stat, idx) => (
                  <div key={stat.id || idx} style={{ display: 'flex', flexDirection: 'column', minWidth: '80px' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2d3a8c', lineHeight: 1.1 }}>{stat.value}</span>
                    <span style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '4px', fontWeight: 500 }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div data-w-id="6da1e0e9-8679-bd2c-933d-50714d290b3b" className="rt-hero-v4-right rt-mobile-l-display-none">
              <div>
                <SafeImage
                  src={hero.heroImage1 || '/about-assets/690c2237c3412540538c8db2_taskopiya-about-hero-Hand.webp'}
                  loading="lazy"
                  alt={hero.heroImage1Alt || 'TryangleTech Software Engineering Excellence'}
                  width={680}
                  height={520}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div className="rt-hero-v4-right-image-two">
                <SafeImage
                  src={hero.heroImage2 || '/about-assets/6915cf130e64f93cbd9e83bc_Mobile about.webp'}
                  loading="lazy"
                  alt={hero.heroImage2Alt || 'TryangleTech Mobile App Preview'}
                  width={480}
                  height={620}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Speciality bar */}
        <div className="w-layout-blockcontainer rt-container-extra-large rt-hero-v4-bottom w-container">
          <div className="rt-hero-v4-speciality-main rt-shadow">
            <div className="rt-hero-v4-speciality">
              <div data-w-id="31a6b6e1-75d7-6fb0-22b0-fb0680596001" className="rt-hero-v4-speciality-top">
                <div className="rt-hero-v4-speciality-top-left">
                  <div className="rt-sub-gap">
                    <div className="rt-sub-text rt-sub-gredient">{speciality.subBadgeText || 'our speciality'}</div>
                  </div>
                  <h2 className="rt-gap-off rt-heading-para-gap">
                    {speciality.heading || 'Building digital solutions that drive real business growth'}
                  </h2>
                </div>
                <div className="rt-hero-v4-speciality-top-para">
                  <p className="rt-gap-off">
                    {speciality.description ||
                      'Our dedicated team works closely with you at every stage, turning complex challenges into streamlined, high-performing digital products that scale with your business.'}
                  </p>
                </div>
              </div>

              <div className="w-layout-grid rt-benefits-v2-card-wrap">
                {benefits.map((benefit, idx) => (
                  <div key={benefit.id || idx} className="w-layout-vflex rt-benefits-v2-card rt-two">
                    <div className="rt-benefits-v2-card-image">
                      <div className="rt-benefits-icon rt-two" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SafeImage
                          width={38}
                          height={38}
                          alt={benefit.title}
                          src={benefit.icon}
                          loading="lazy"
                          style={{ width: '38px', height: '38px', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="rt-text-style-h6">{benefit.title}</div>
                    </div>
                    <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                      <p className="rt-gap-off">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Banner image */}
        <div className="rt-hero-v4-image">
          <SafeImage
            src={hero.bannerImage || '/about-assets/6915cd620829878f7ea58178_taskopiya-about-banner.webp'}
            loading="lazy"
            alt={hero.bannerImageAlt || 'TryangleTech Team Banner'}
            width={1200}
            height={500}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
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
