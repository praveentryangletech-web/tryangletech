'use client';

import Link from "next/link";
import Image from "next/image";
import { WebDevHeroSection } from '@/backend/services/services/services.types';
import { DEFAULT_WEB_DEV_CONTENT } from '@/backend/services/services/services.defaults';

const SA = '/service3-assets';

function getBulletIcon(iconType?: string) {
  if (iconType === 'performance') {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
  } else if (iconType === 'seo') {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
  } else if (iconType === 'responsive') {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>;
  }
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}

export default function WebDevHero({ data }: { data?: WebDevHeroSection }) {
  const hero = data || DEFAULT_WEB_DEV_CONTENT.hero;
  const bullets = hero.bullets || DEFAULT_WEB_DEV_CONTENT.hero.bullets;

  return (
    <>
      <section className="rt-hero-v5 rt-overflow-hidden" style={{ overflow: "hidden" }}>
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-hero-v5-wrapper">
            <div className="w-layout-vflex rt-hero-v5-heading-wrap rt-position-relative">
              <div className="rt-sub-gap">
                <div
                  data-w-id="136ee2be-3a36-f0e2-c08f-8813ef35031e"
                  className="rt-sub-text rt-sub-gredient">
                  {hero.subBadgeText || 'Web Development'}
                </div>
              </div>
              <div className="rt-hero-heading-gap">
                <h1
                  data-w-id="136ee2be-3a36-f0e2-c08f-8813ef350321"
                  className="rt-gap-off">
                  {hero.headline}
                </h1>
              </div>
              <div
                data-w-id="136ee2be-3a36-f0e2-c08f-8813ef350323"
                className="rt-hero-v7-para-wrap">
                <p className="rt-gap-off">
                  {hero.subheadline}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px', marginBottom: '8px' }}>
                  {bullets.map((b, idx) => (
                    <div key={b.id || idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99,102,241,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {getBulletIcon(b.iconType)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '2px' }}>{b.title}</div>
                        <div style={{ fontSize: '14px', opacity: 0.7, lineHeight: '1.5' }}>{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                data-w-id="136ee2be-3a36-f0e2-c08f-8813ef350326"
                className="w-layout-hflex rt-hero-v5-button-wrap">

                <Link
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href={hero.primaryBtnLink || '/contact'}
                  className="rt-button-body w-inline-block">
                  <div className="rt-button-text">{hero.primaryBtnText || 'Get started today'}</div>
                  <div className="rt-button-body-overlay"></div>
                </Link>

              </div>
              <div
                data-w-id="2a922485-2ae2-43f1-d550-fc7c8735205f"
                className="rt-small-btn-wrap rt-hero-v1-small rt-service-one">
                <div className="rt-small-btn-main rt-color-change">
                  <div className="rt-small-btn-text">{hero.smallBadgeText || 'Built for you'}</div>
                  <div className="rt-btn-arrow-v2 rt-hero-v1-small">
                    <Image
                      src="/service-1-assets/69203b6151156495054eacd7_Vector 503 (2).svg"
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="rt-hero-v5-right rt-mobile-l-display-none">
              <div
                data-w-id="136ee2be-3a36-f0e2-c08f-8813ef35035e"
                className="rt-hero-v5-right-one">
                <Image
                  src={hero.imageRightOne || "/service-1-assets/690acfecf91d77770201a6cb_taskopia-service-one-hero-1.webp"}
                  loading="lazy"
                  alt="taskopia-service-one-hero-1"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="136ee2be-3a36-f0e2-c08f-8813ef350360"
                className="rt-hero-v5-right-two">
                <Image
                  src={hero.imageRightTwo || "/service-1-assets/6916b40c8e7ba2243876a27f_taskopiya-service-one-hero.avif"}
                  loading="lazy"
                  alt="taskopiya-service-one-hero"
                  className="rt-shadow rt-border-radius-medium"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="rt-hero-v5-image">
          <Image
            src={hero.imageBanner || "/service-1-assets/6915cd620829878f7ea58178_taskopiya-about-banner.webp"}
            loading="lazy"
            alt="taskopiya-about-banner"
            width={800} height={800} style={{ width: "100%", height: "auto" }} />
        </div>
        <div
          data-w-id="e3adfb91-848f-aad7-a9a7-c71e5016acc3"
          className="rt-hero-v5-image-dot">
          <Image
            src={hero.imageDot || "/service-1-assets/690ad30ba7100eb0c23fba01_taskopia-service-2-dot.webp"}
            loading="lazy"
            alt="taskopia-service-2-dot"
            width={800} height={800} style={{ width: "100%", height: "auto" }} />
        </div>
      </section>
    </>
  );
}

