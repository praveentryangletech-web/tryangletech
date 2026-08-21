import React from 'react';

/**
 * Service Pages Shimmer Skeleton Loading Screen
 * (Applies across all service landing pages and dynamic service routes)
 */
export default function ServiceLoading() {
  return (
    <main style={{ minHeight: '85vh', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      {/* Hero Header Skeleton */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="rt-skeleton-box" style={{ width: '170px', height: '32px', borderRadius: '999px' }} />
            <div className="rt-skeleton-box" style={{ width: '90%', height: '48px', borderRadius: '14px' }} />
            <div className="rt-skeleton-box" style={{ width: '75%', height: '44px', borderRadius: '14px' }} />

            <div className="rt-skeleton-box" style={{ width: '100%', height: '18px', borderRadius: '6px', marginTop: '0.5rem' }} />
            <div className="rt-skeleton-box" style={{ width: '90%', height: '18px', borderRadius: '6px' }} />

            <div style={{ display: 'flex', gap: '14px', marginTop: '1rem' }}>
              <div className="rt-skeleton-box" style={{ width: '160px', height: '48px', borderRadius: '12px' }} />
              <div className="rt-skeleton-box" style={{ width: '140px', height: '48px', borderRadius: '12px' }} />
            </div>
          </div>

          {/* Right Showcase Box */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="rt-skeleton-box"
              style={{
                width: '100%',
                maxWidth: '480px',
                height: '360px',
                borderRadius: '28px',
                border: '1.5px solid #F1F5F9',
              }}
            />
          </div>
        </div>

        {/* Deliverables / Capabilities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginTop: '4.5rem',
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: '20px',
                padding: '2rem',
                border: '1.5px solid #F1F5F9',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div className="rt-skeleton-box" style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
              <div className="rt-skeleton-box" style={{ width: '70%', height: '22px', borderRadius: '6px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '14px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '80%', height: '14px', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
