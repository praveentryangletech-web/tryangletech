import React from 'react';

/**
 * Root Home Page Shimmer Skeleton Loading Screen
 */
export default function GlobalLoading() {
  return (
    <main style={{ minHeight: '85vh', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      {/* Hero Section Skeleton */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
          {/* Badge Pill */}
          <div
            className="rt-skeleton-box"
            style={{ width: '220px', height: '36px', borderRadius: '999px', marginBottom: '0.5rem' }}
          />

          {/* Main Headline */}
          <div
            className="rt-skeleton-box"
            style={{ width: '85%', maxWidth: '820px', height: '56px', borderRadius: '16px' }}
          />
          <div
            className="rt-skeleton-box"
            style={{ width: '65%', maxWidth: '620px', height: '48px', borderRadius: '16px' }}
          />

          {/* Subtitle / Paragraph */}
          <div
            className="rt-skeleton-box"
            style={{ width: '70%', maxWidth: '580px', height: '20px', borderRadius: '8px', marginTop: '0.75rem' }}
          />
          <div
            className="rt-skeleton-box"
            style={{ width: '50%', maxWidth: '420px', height: '20px', borderRadius: '8px' }}
          />

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '1.5rem' }}>
            <div
              className="rt-skeleton-box"
              style={{ width: '160px', height: '48px', borderRadius: '12px' }}
            />
            <div
              className="rt-skeleton-box"
              style={{ width: '140px', height: '48px', borderRadius: '12px' }}
            />
          </div>
        </div>

        {/* Feature Cards Showcase Shimmer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginTop: '4.5rem',
          }}
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: '20px',
                padding: '2rem',
                border: '1.5px solid #F1F5F9',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div
                className="rt-skeleton-box"
                style={{ width: '48px', height: '48px', borderRadius: '12px' }}
              />
              <div
                className="rt-skeleton-box"
                style={{ width: '70%', height: '24px', borderRadius: '6px' }}
              />
              <div
                className="rt-skeleton-box"
                style={{ width: '100%', height: '16px', borderRadius: '4px' }}
              />
              <div
                className="rt-skeleton-box"
                style={{ width: '85%', height: '16px', borderRadius: '4px' }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
