import React from 'react';

/**
 * Blog Article Detail Page Shimmer Skeleton Loading Screen
 */
export default function BlogDetailLoading() {
  return (
    <main style={{ minHeight: '85vh', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <article style={{ maxWidth: '900px', margin: '0 auto', padding: '4.5rem 1.5rem 4rem' }}>
        {/* Back Link Breadcrumb */}
        <div
          className="rt-skeleton-box"
          style={{ width: '120px', height: '20px', borderRadius: '6px', marginBottom: '1.5rem' }}
        />

        {/* Category Pill */}
        <div
          className="rt-skeleton-box"
          style={{ width: '130px', height: '28px', borderRadius: '999px', marginBottom: '1rem' }}
        />

        {/* Article Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div className="rt-skeleton-box" style={{ width: '95%', height: '46px', borderRadius: '12px' }} />
          <div className="rt-skeleton-box" style={{ width: '75%', height: '42px', borderRadius: '12px' }} />
        </div>

        {/* Author Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '2rem 0' }}>
          <div className="rt-skeleton-box" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="rt-skeleton-box" style={{ width: '140px', height: '16px', borderRadius: '4px' }} />
            <div className="rt-skeleton-box" style={{ width: '90px', height: '14px', borderRadius: '4px' }} />
          </div>
        </div>

        {/* Main Cover Banner */}
        <div
          className="rt-skeleton-box"
          style={{
            width: '100%',
            height: '420px',
            borderRadius: '24px',
            margin: '2rem 0',
            border: '1.5px solid #F1F5F9',
          }}
        />

        {/* Paragraphs and Narrative Structure */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '2.5rem' }}>
          <div className="rt-skeleton-box" style={{ width: '100%', height: '18px', borderRadius: '4px' }} />
          <div className="rt-skeleton-box" style={{ width: '98%', height: '18px', borderRadius: '4px' }} />
          <div className="rt-skeleton-box" style={{ width: '92%', height: '18px', borderRadius: '4px' }} />
          <div className="rt-skeleton-box" style={{ width: '80%', height: '18px', borderRadius: '4px' }} />

          {/* Section Subheading */}
          <div className="rt-skeleton-box" style={{ width: '55%', height: '30px', borderRadius: '8px', marginTop: '1.5rem' }} />

          <div className="rt-skeleton-box" style={{ width: '100%', height: '18px', borderRadius: '4px' }} />
          <div className="rt-skeleton-box" style={{ width: '96%', height: '18px', borderRadius: '4px' }} />
          <div className="rt-skeleton-box" style={{ width: '70%', height: '18px', borderRadius: '4px' }} />

          {/* Quote Block Placeholder */}
          <div
            style={{
              padding: '2rem',
              borderRadius: '16px',
              backgroundColor: '#F8FAFC',
              borderLeft: '4px solid #1833FE',
              margin: '1.5rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div className="rt-skeleton-box" style={{ width: '90%', height: '22px', borderRadius: '6px' }} />
            <div className="rt-skeleton-box" style={{ width: '35%', height: '16px', borderRadius: '4px' }} />
          </div>
        </div>
      </article>
    </main>
  );
}
