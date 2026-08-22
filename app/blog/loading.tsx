import React from 'react';

/**
 * Blog Listing Page Shimmer Skeleton Loading Screen
 */
export default function BlogLoading() {
  return (
    <main style={{ minHeight: '85vh', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <section className="rt-hero-11" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div className="w-layout-blockcontainer rt-container w-container">
          
          {/* Hero Heading Shimmer */}
          <div
            className="rt-hero-11-heading rt-desktop-text-center rt-heading-bottom-gap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            {/* Sub-text Badge */}
            <div
              className="rt-skeleton-box"
              style={{ width: '130px', height: '26px', borderRadius: '999px' }}
            />

            {/* Main Headline */}
            <div
              className="rt-skeleton-box"
              style={{ width: '85%', maxWidth: '680px', height: '52px', borderRadius: '14px' }}
            />

            {/* Small Blog Pill */}
            <div
              className="rt-skeleton-box"
              style={{ width: '170px', height: '34px', borderRadius: '999px' }}
            />
          </div>

          {/* Category Tabs Bar Shimmer */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2rem',
              width: '100%',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid #E2E8F0',
              overflowX: 'auto',
              marginBottom: '3rem',
            }}
          >
            {[
              { w: '50px' },
              { w: '140px' },
              { w: '160px' },
              { w: '130px' },
              { w: '150px' },
              { w: '110px' },
            ].map((tab, i) => (
              <div
                key={i}
                className="rt-skeleton-box"
                style={{
                  width: tab.w,
                  height: '24px',
                  borderRadius: '6px',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Blog Cards Grid Shimmer */}
          <div
            className="rt-blog-two-wrapper"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2.5rem 1.875rem',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="rt-blog-v1-card-wrap"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {/* Card Top Image Cover */}
                <div
                  className="rt-blog-v3-card-top-part rt-skeleton-box"
                  style={{
                    height: '245px',
                    width: '100%',
                    borderRadius: '1.5625rem',
                    border: '1px solid #E2E8F0',
                  }}
                />

                {/* Card Metadata & Title */}
                <div
                  className="rt-blog-card-v1-top-part"
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                >
                  {/* Category & Date Row */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      className="rt-skeleton-box"
                      style={{ width: '100px', height: '18px', borderRadius: '4px' }}
                    />
                    <div
                      className="rt-skeleton-box"
                      style={{ width: '90px', height: '16px', borderRadius: '4px' }}
                    />
                  </div>

                  {/* Horizontal Line Shimmer */}
                  <div
                    className="rt-skeleton-box"
                    style={{ width: '100%', height: '1px', borderRadius: '1px' }}
                  />

                  {/* Article Title Lines */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div
                      className="rt-skeleton-box"
                      style={{ width: '95%', height: '22px', borderRadius: '6px' }}
                    />
                    <div
                      className="rt-skeleton-box"
                      style={{ width: '65%', height: '22px', borderRadius: '6px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
