import React from 'react';

/**
 * About Page Loading Screen
 * 
 * Preserves the exact .rt-hero-v4 styling and background gradient.
 */
export default function AboutLoading() {
  return (
    <main style={{ minHeight: '85vh', overflow: 'hidden' }}>
      {/* Hero Section Split Layout Skeleton with rt-hero-v4 */}
      <section className="rt-hero-v4 rt-position-relative rt-overflow-hidden" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="w-layout-blockcontainer rt-container-main rt-position-relative w-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            {/* Left Hero Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Top Sub Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  className="rt-skeleton-box"
                  style={{ width: '80px', height: '32px', borderRadius: '999px' }}
                />
                <div
                  className="rt-skeleton-box"
                  style={{ width: '140px', height: '20px', borderRadius: '6px' }}
                />
              </div>

              {/* Headline */}
              <div
                className="rt-skeleton-box"
                style={{ width: '90%', height: '48px', borderRadius: '14px', marginTop: '0.5rem' }}
              />
              <div
                className="rt-skeleton-box"
                style={{ width: '75%', height: '44px', borderRadius: '14px' }}
              />

              {/* Paragraphs */}
              <div
                className="rt-skeleton-box"
                style={{ width: '100%', height: '18px', borderRadius: '6px', marginTop: '0.5rem' }}
              />
              <div
                className="rt-skeleton-box"
                style={{ width: '95%', height: '18px', borderRadius: '6px' }}
              />
              <div
                className="rt-skeleton-box"
                style={{ width: '80%', height: '18px', borderRadius: '6px' }}
              />

              {/* Metric counters */}
              <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div
                      className="rt-skeleton-box"
                      style={{ width: '50px', height: '32px', borderRadius: '8px' }}
                    />
                    <div
                      className="rt-skeleton-box"
                      style={{ width: '80px', height: '14px', borderRadius: '4px' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Mockup Placeholder */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className="rt-skeleton-box"
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  height: '500px',
                  borderRadius: '36px',
                  border: '8px solid #F1F5F9',
                }}
              />
            </div>
          </div>

          {/* Capability Cards Shimmer */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '4rem',
            }}
          >
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                style={{
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1.5px solid #F1F5F9',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div className="rt-skeleton-box" style={{ width: '44px', height: '44px', borderRadius: '12px' }} />
                <div className="rt-skeleton-box" style={{ width: '65%', height: '22px', borderRadius: '6px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '14px', borderRadius: '4px' }} />
                <div className="rt-skeleton-box" style={{ width: '85%', height: '14px', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
