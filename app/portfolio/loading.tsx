import React from 'react';

/**
 * Portfolio Listing Page Loading Screen
 * 
 * Preserves the exact .rt-hero-12 gradient background, static Header & Category filter pills.
 * ONLY the dynamic case study cards grid renders the skeleton shimmer.
 */
export default function PortfolioLoading() {
  const staticCategories = [
    'All',
    'Business Website',
    'E-Commerce',
    'Landing Website',
    'Mobile Application',
    'Custom Software',
    'Graphic Design',
  ];

  return (
    <main>
      <section className="rt-hero-12" style={{ minHeight: '85vh' }}>
        {/* 1. Static Hero Header (Immediately Rendered with Gradient) */}
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-hero-11-heading rt-desktop-text-center rt-heading-bottom-gap" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="rt-sub-gap" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
              <div className="rt-sub-text rt-sub-gredient">OUR PORTFOLIO</div>
            </div>
            <h1 className="rt-gap-off" style={{ margin: '0 0 1rem 0' }}>
              Explore our recent success stories
            </h1>
          </div>

          {/* 2. Static Category Pill Navigation Bar (Immediately Rendered) */}
          <div
            className="rt-portfolio-filters-wrapper"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            {staticCategories.map((cat, i) => (
              <div
                key={cat}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '2rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: i === 0 ? 'var(--brand-blue, #1833fe)' : '#E2E8F0',
                  backgroundColor: i === 0 ? 'var(--brand-blue, #1833fe)' : '#FFFFFF',
                  color: i === 0 ? '#FFFFFF' : '#475569',
                  boxShadow: i === 0 ? '0 4px 12px rgba(24, 51, 254, 0.25)' : 'none',
                }}
              >
                {cat}
              </div>
            ))}
          </div>

          {/* 3. ONLY DYNAMIC CARDS GRID AREA SHOWS SKELETON SHIMMER */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={`skeleton-loading-${idx}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '1.75rem',
                  padding: '1.25rem',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Large Rounded Image Skeleton */}
                <div
                  className="rt-skeleton-box"
                  style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '1.25rem',
                  }}
                />
                {/* Rounded Text Skeleton Pills */}
                <div style={{ paddingTop: '1.25rem', paddingBottom: '0.5rem' }}>
                  <div
                    className="rt-skeleton-box"
                    style={{
                      width: '35%',
                      height: '16px',
                      borderRadius: '9999px',
                      marginBottom: '0.85rem',
                    }}
                  />
                  <div
                    className="rt-skeleton-box"
                    style={{
                      width: '85%',
                      height: '20px',
                      borderRadius: '9999px',
                      marginBottom: '0.85rem',
                    }}
                  />
                  <div
                    className="rt-skeleton-box"
                    style={{
                      width: '60%',
                      height: '14px',
                      borderRadius: '9999px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
