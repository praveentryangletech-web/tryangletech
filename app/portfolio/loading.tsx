import React from 'react';

/**
 * Portfolio Listing Page Shimmer Skeleton Loading Screen
 */
export default function PortfolioLoading() {
  return (
    <main style={{ minHeight: '85vh', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      {/* Hero Header Skeleton */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div
            className="rt-skeleton-box"
            style={{ width: '180px', height: '32px', borderRadius: '999px' }}
          />
          <div
            className="rt-skeleton-box"
            style={{ width: '80%', maxWidth: '650px', height: '48px', borderRadius: '14px' }}
          />
          <div
            className="rt-skeleton-box"
            style={{ width: '60%', maxWidth: '480px', height: '18px', borderRadius: '6px' }}
          />
        </div>

        {/* Category Pill Navigation Bar Shimmer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '2.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}
        >
          {['All', 'Business Website', 'E-Commerce', 'Mobile Application', 'Custom Software'].map((cat, i) => (
            <div
              key={cat}
              className="rt-skeleton-box"
              style={{
                width: i === 0 ? '60px' : '140px',
                height: '40px',
                borderRadius: '999px',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </section>

      {/* Case Study Cards Grid Shimmer */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem 5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1.5px solid #F1F5F9',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image Banner */}
              <div
                className="rt-skeleton-box"
                style={{
                  width: '100%',
                  height: '240px',
                }}
              />

              {/* Card Meta Content */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    className="rt-skeleton-box"
                    style={{ width: '110px', height: '22px', borderRadius: '6px' }}
                  />
                  <div
                    className="rt-skeleton-box"
                    style={{ width: '70px', height: '16px', borderRadius: '4px' }}
                  />
                </div>

                <div
                  className="rt-skeleton-box"
                  style={{ width: '85%', height: '24px', borderRadius: '6px' }}
                />
                <div
                  className="rt-skeleton-box"
                  style={{ width: '100%', height: '16px', borderRadius: '4px' }}
                />
                <div
                  className="rt-skeleton-box"
                  style={{ width: '65%', height: '16px', borderRadius: '4px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
