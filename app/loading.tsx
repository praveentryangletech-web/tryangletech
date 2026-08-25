import React from 'react';

/**
 * High-End, Pixel-Accurate Skeleton Loading Screen for TryangleTech
 * Perfectly replicates the authentic Hero, Showcase Mockup & Services structure.
 */
export default function GlobalLoading() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', overflow: 'hidden', position: 'relative' }}>
      {/* Background Soft Glow Radial Gradients */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(24, 51, 254, 0.06) 0%, rgba(248, 89, 54, 0.03) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* HERO SECTION SKELETON */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '3.5rem 1.5rem 2rem 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* 1. Hero Sub-Badge with Overlapping Avatars & Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px 6px 8px',
              borderRadius: '999px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              marginBottom: '1.75rem',
            }}
          >
            {/* 3 Overlapping Avatar Circles */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className="rt-skeleton-box"
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #FFFFFF' }}
              />
              <div
                className="rt-skeleton-box"
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #FFFFFF', marginLeft: '-10px' }}
              />
              <div
                className="rt-skeleton-box"
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #FFFFFF', marginLeft: '-10px' }}
              />
            </div>
            {/* Pill Text */}
            <div
              className="rt-skeleton-box"
              style={{ width: '130px', height: '16px', borderRadius: '6px' }}
            />
          </div>

          {/* 2. Hero Headline (Multi-line proportional layout) */}
          <div style={{ width: '100%', maxWidth: '880px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
            <div
              className="rt-skeleton-box"
              style={{ width: '92%', height: '54px', borderRadius: '14px' }}
            />
            <div
              className="rt-skeleton-box"
              style={{ width: '74%', height: '54px', borderRadius: '14px' }}
            />
          </div>

          {/* 3. Hero Subtitle / Description */}
          <div style={{ width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
            <div
              className="rt-skeleton-box"
              style={{ width: '96%', height: '18px', borderRadius: '6px' }}
            />
            <div
              className="rt-skeleton-box"
              style={{ width: '70%', height: '18px', borderRadius: '6px' }}
            />
          </div>

          {/* 4. Primary CTA Button with Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '3.5rem' }}>
            <div
              className="rt-skeleton-box"
              style={{ width: '180px', height: '52px', borderRadius: '999px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}
            />
          </div>

          {/* 5. Hero Interactive Dashboard / Showcase Mockup Frame */}
          <div
            style={{
              width: '100%',
              maxWidth: '1060px',
              borderRadius: '24px',
              border: '1.5px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.07)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Mockup Browser Window Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div className="rt-skeleton-box" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                <div className="rt-skeleton-box" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                <div className="rt-skeleton-box" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
              </div>
              <div className="rt-skeleton-box" style={{ width: '220px', height: '22px', borderRadius: '6px' }} />
              <div className="rt-skeleton-box" style={{ width: '80px', height: '22px', borderRadius: '6px' }} />
            </div>

            {/* Mockup Body Wireframe */}
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem' }}>
              {/* Sidebar wireframe */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '34px', borderRadius: '8px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '34px', borderRadius: '8px' }} />
                <div className="rt-skeleton-box" style={{ width: '85%', height: '34px', borderRadius: '8px' }} />
                <div className="rt-skeleton-box" style={{ width: '90%', height: '34px', borderRadius: '8px' }} />
              </div>

              {/* Main canvas wireframe */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* 3 Metric Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div className="rt-skeleton-box" style={{ height: '72px', borderRadius: '12px' }} />
                  <div className="rt-skeleton-box" style={{ height: '72px', borderRadius: '12px' }} />
                  <div className="rt-skeleton-box" style={{ height: '72px', borderRadius: '12px' }} />
                </div>
                {/* Chart Graphic Area */}
                <div className="rt-skeleton-box" style={{ height: '160px', borderRadius: '14px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK & SERVICES SECTION SKELETON */}
      <section style={{ maxWidth: '1280px', margin: '3rem auto 5rem auto', padding: '0 1.5rem' }}>
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px', marginBottom: '2.5rem' }}>
          <div className="rt-skeleton-box" style={{ width: '110px', height: '24px', borderRadius: '999px' }} />
          <div className="rt-skeleton-box" style={{ width: '420px', height: '38px', borderRadius: '10px' }} />
          <div className="rt-skeleton-box" style={{ width: '320px', height: '16px', borderRadius: '6px' }} />
        </div>

        {/* 3 Service Matrix Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              style={{
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="rt-skeleton-box" style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
                <div className="rt-skeleton-box" style={{ width: '60px', height: '20px', borderRadius: '999px' }} />
              </div>
              <div className="rt-skeleton-box" style={{ width: '75%', height: '24px', borderRadius: '8px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '14px', borderRadius: '4px' }} />
                <div className="rt-skeleton-box" style={{ width: '85%', height: '14px', borderRadius: '4px' }} />
              </div>
              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                <div className="rt-skeleton-box" style={{ width: '100px', height: '16px', borderRadius: '6px' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
