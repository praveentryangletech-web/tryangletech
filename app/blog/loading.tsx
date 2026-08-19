import React from 'react';

export default function BlogLoading() {
  return (
    <main>
      <section className="rt-hero-11">
        <div className="w-layout-blockcontainer rt-container w-container">
          <div className="rt-hero-11-heading rt-desktop-text-center rt-heading-bottom-gap">
            <div className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">latest insights</div>
            </div>
            <h1 className="rt-gap-off">
              Transforming businesses with <br />
              <span className="rt-hero-v1-underline-image">
                innovative technology
                <span className="rt-heading-shape-img rt-hero-v1"></span>
              </span>
            </h1>
            <div className="rt-small-btn-wrap rt-hero-v1-small rt-blog-2">
              <div className="rt-small-btn-main rt-color-change">
                <div className="rt-small-btn-text">Tryangletech Blog</div>
              </div>
            </div>
          </div>

          {/* Skeleton Category Tabs */}
          <div className="tabs-menu w-tab-menu">
            {[60, 140, 110, 130, 120, 110].map((w, idx) => (
              <div
                key={idx}
                className="blog-skeleton-shimmer"
                style={{
                  width: `${w}px`,
                  height: '20px',
                  borderRadius: '6px',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Skeleton Blog Cards Grid */}
          <div className="rt-blog-two-wrapper">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div
                  className="blog-skeleton-shimmer"
                  style={{
                    height: '245px',
                    width: '100%',
                    borderRadius: '1.5625rem',
                    border: '1px solid #E2E8F0',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div
                      className="blog-skeleton-shimmer"
                      style={{ width: '100px', height: '14px', borderRadius: '4px' }}
                    />
                    <div
                      className="blog-skeleton-shimmer"
                      style={{ width: '80px', height: '12px', borderRadius: '4px' }}
                    />
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#E2E8F0', width: '100%' }} />
                  <div
                    className="blog-skeleton-shimmer"
                    style={{ width: '92%', height: '22px', borderRadius: '6px' }}
                  />
                  <div
                    className="blog-skeleton-shimmer"
                    style={{ width: '68%', height: '22px', borderRadius: '6px' }}
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
