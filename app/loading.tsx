import React from 'react';
import Image from 'next/image';

/**
 * High-End "Content-Only" Shimmer Loading Screen for TryangleTech
 * Keeps the static framework (avatars, CTA button, phone badge, floating button, and dashboard mockup)
 * 100% static & fully rendered, while applying a delicate shimmer pulse ONLY to dynamic text blocks.
 */
export default function GlobalLoading() {
  return (
    <main style={{ minHeight: '90vh', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <section className="rt-hero-one rt-overflow-hidden rt-position-relative">
        {/* LEFT COLUMN */}
        <div className="rt-hero-left">
          <div className="rt-hero-left-main rt-v1-right rt-position-relative">
            {/* 1. Real Static Avatars + Shimmer Sub-Badge Text */}
            <div className="rt-hero-v1-top-sub rt-new-v1">
              <div className="rt-overflow-hidden">
                <div className="w-layout-hflex rt-hero-v2-client-img-wrap">
                  {[0, 1, 2].map((idx) => {
                    const bgColor = idx === 0 ? '#38bdf8' : idx === 1 ? '#3b82f6' : '#a855f7';
                    return (
                      <div
                        key={idx}
                        style={{
                          transform:
                            idx === 0
                              ? 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateZ(-15deg)'
                              : idx === 1
                              ? 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateZ(0deg)'
                              : 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateZ(30deg)',
                          border: 'none',
                        }}
                        className={`rt-hero-v2-client-image rt-overflow-hidden ${idx > 0 ? 'rt-margin-left' : ''} rt-sub-image`}
                      >
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: bgColor,
                            borderRadius: '50%',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rt-overflow-hidden" style={{ marginLeft: '12px' }}>
                {/* Shimmer Sub-Badge */}
                <div
                  className="rt-skeleton-box"
                  style={{
                    width: '160px',
                    height: '20px',
                    borderRadius: '6px',
                    background: 'linear-gradient(90deg, #1833FE 0%, #6366F1 50%, #1833FE 100%)',
                    backgroundSize: '200% 100%',
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>

            {/* 2. Dynamic Headline: Subtle Shimmer Placeholder */}
            <div className="rt-hero-heading-gap rt-hero-v1-heading">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '620px' }}>
                <div className="rt-skeleton-box" style={{ width: '92%', height: '52px', borderRadius: '10px' }} />
                <div className="rt-skeleton-box" style={{ width: '98%', height: '52px', borderRadius: '10px' }} />
                <div className="rt-skeleton-box" style={{ width: '75%', height: '52px', borderRadius: '10px' }} />
              </div>
            </div>

            {/* 3. Dynamic Subtitle: Subtle Shimmer Lines */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '1.25rem', width: '100%', maxWidth: '580px' }}>
                <div className="rt-skeleton-box" style={{ width: '96%', height: '16px', borderRadius: '4px' }} />
                <div className="rt-skeleton-box" style={{ width: '82%', height: '16px', borderRadius: '4px' }} />
              </div>
            </div>

            {/* 4. Real Static Action Buttons & Call Directly Badge */}
            <div className="rt-overflow-hidden">
              <div className="rt-button-para-gap rt-hero-between" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="rt-button-body" style={{ cursor: 'pointer' }}>
                  <div className="rt-button-text">Talk to us today</div>
                </div>
                <div className="rt-hero-v1-call">
                  <div>
                    <Image
                      src="/Taskopia_files/691aa59bf2f2a3f94a847b78_call (1).svg"
                      loading="lazy"
                      alt="call icon"
                      width={800}
                      height={800}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Call us directly</div>
                    <a href="tel:+919033878806" style={{ fontWeight: 700, color: '#0F172A' }}>+91 90338 78806</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Real Static Floating Purple Button ("Development" / "Let's Build") */}
            <div className="rt-small-btn-wrap rt-hero-v1-small rt-home-1">
              <div className="rt-small-btn-main">
                <div className="rt-small-btn-text">Development</div>
                <div className="rt-btn-arrow-v2 rt-hero-v1-small">
                  <Image
                    src="/Taskopia_files/6904842a6f63d7e69353dc60_Vector 503 (1).svg"
                    loading="lazy"
                    alt="arrow icon"
                    width={800}
                    height={800}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL STATIC TASKPIA DASHBOARD MOCKUP */}
        <div className="rt-hero-right-v1">
          <Image
            width={1078}
            height={604}
            alt="Hero Dashboard Overview"
            src="/Taskopia_files/6915c70b7c1f18f1e46e5094_taskopiya-home-two.avif"
            priority
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Real Static Floating Decorative Box */}
        <div
          className="rt-hero-v1-box-1"
          style={{
            willChange: 'transform',
            transform: 'translate3d(0px, 0px, 0px) scale3d(0.699, 0.699, 1) rotateZ(31.893deg)',
          }}
        >
          <Image
            src="/Taskopia_files/68ee3ab607d07e6601123425_Group 2085663558 (1).svg"
            loading="lazy"
            alt="decorative icon"
            width={800}
            height={800}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </section>
    </main>
  );
}
