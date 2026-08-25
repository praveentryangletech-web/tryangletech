import React from 'react';

/**
 * Blog Listing Page Loading Screen
 * 
 * Header and Category filter tabs are static and rendered immediately.
 * ONLY the dynamic blog cards grid renders the skeleton shimmer.
 */
export default function BlogLoading() {
  const staticCategories = ['All', 'Web Development', 'Mobile Apps', 'Cloud & DevOps', 'UI/UX Design', 'Custom Software'];

  return (
    <main style={{ minHeight: '85vh', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <section className="rt-hero-11" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div className="w-layout-blockcontainer rt-container w-container">
          
          {/* Static Hero Heading */}
          <div
            className="rt-hero-11-heading rt-desktop-text-center rt-heading-bottom-gap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '3rem',
            }}
          >
            <div className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">LATEST INSIGHTS</div>
            </div>
            <h1 className="rt-gap-off" style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              Explore our latest thoughts on <span className="rt-color-periwinkle-gray">tech & design</span>
            </h1>
          </div>

          {/* Static Category Tabs Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              width: '100%',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid #E2E8F0',
              overflowX: 'auto',
              marginBottom: '3rem',
            }}
          >
            {staticCategories.map((cat, i) => (
              <div
                key={cat}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: i === 0 ? 800 : 600,
                  color: i === 0 ? 'var(--brand-blue, #1833fe)' : '#64748B',
                  borderBottom: i === 0 ? '2px solid var(--brand-blue, #1833fe)' : 'none',
                  paddingBottom: '0.75rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </div>
            ))}
          </div>

          {/* Dynamic Blog Cards Grid Shimmer */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={`skeleton-blog-${idx}`}
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
                <div
                  className="rt-skeleton-box"
                  style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '1.25rem',
                  }}
                />
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
