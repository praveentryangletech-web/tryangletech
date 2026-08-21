import React from 'react';

/**
 * Portfolio Case Study Detail Page Shimmer Skeleton Loading Screen
 */
export default function PortfolioDetailLoading() {
  return (
    <main style={{ minHeight: '85vh', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      {/* Header & Meta Bar Skeleton */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4.5rem 1.5rem 2rem' }}>
        {/* Back Link Breadcrumb */}
        <div
          className="rt-skeleton-box"
          style={{ width: '130px', height: '20px', borderRadius: '6px', marginBottom: '1.5rem' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '850px' }}>
          {/* Category Pill */}
          <div
            className="rt-skeleton-box"
            style={{ width: '140px', height: '28px', borderRadius: '999px' }}
          />

          {/* Title */}
          <div
            className="rt-skeleton-box"
            style={{ width: '90%', height: '52px', borderRadius: '14px' }}
          />
          <div
            className="rt-skeleton-box"
            style={{ width: '70%', height: '44px', borderRadius: '14px' }}
          />

          {/* Short Excerpt */}
          <div
            className="rt-skeleton-box"
            style={{ width: '100%', height: '20px', borderRadius: '6px', marginTop: '0.5rem' }}
          />
          <div
            className="rt-skeleton-box"
            style={{ width: '80%', height: '20px', borderRadius: '6px' }}
          />
        </div>

        {/* Project Metrics / Quick Info Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            padding: '1.75rem',
            backgroundColor: '#F8FAFC',
            borderRadius: '20px',
            border: '1.5px solid #F1F5F9',
            marginTop: '2.5rem',
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <div key={item} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="rt-skeleton-box" style={{ width: '60px', height: '14px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '120px', height: '22px', borderRadius: '6px' }} />
            </div>
          ))}
        </div>

        {/* Big Showcase Slider Image Skeleton */}
        <div style={{ marginTop: '3rem' }}>
          <div
            className="rt-skeleton-box"
            style={{
              width: '100%',
              height: '520px',
              borderRadius: '28px',
              border: '1.5px solid #F1F5F9',
            }}
          />
        </div>

        {/* 2-Column Challenge & Solution Narrative Skeleton */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginTop: '4rem',
          }}
        >
          {[1, 2].map((col) => (
            <div
              key={col}
              style={{
                padding: '2.25rem',
                borderRadius: '24px',
                backgroundColor: '#F8FAFC',
                border: '1.5px solid #F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div className="rt-skeleton-box" style={{ width: '140px', height: '28px', borderRadius: '8px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '16px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '95%', height: '16px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '85%', height: '16px', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
