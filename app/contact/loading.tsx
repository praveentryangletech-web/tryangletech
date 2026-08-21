import React from 'react';

/**
 * Contact Page Shimmer Skeleton Loading Screen
 */
export default function ContactLoading() {
  return (
    <main style={{ minHeight: '85vh', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 1.5rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          {/* Left Column: Contact Info & Address Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="rt-skeleton-box" style={{ width: '150px', height: '32px', borderRadius: '999px' }} />
            <div className="rt-skeleton-box" style={{ width: '90%', height: '48px', borderRadius: '14px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '18px', borderRadius: '6px' }} />
            <div className="rt-skeleton-box" style={{ width: '75%', height: '18px', borderRadius: '6px' }} />

            {/* Direct Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    backgroundColor: '#F8FAFC',
                    border: '1.5px solid #F1F5F9',
                  }}
                >
                  <div className="rt-skeleton-box" style={{ width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                    <div className="rt-skeleton-box" style={{ width: '35%', height: '14px', borderRadius: '4px' }} />
                    <div className="rt-skeleton-box" style={{ width: '70%', height: '18px', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form Box Skeleton */}
          <div
            style={{
              padding: '2.5rem',
              borderRadius: '28px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <div className="rt-skeleton-box" style={{ width: '50%', height: '28px', borderRadius: '8px' }} />

            {/* Subject Selector Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4].map((pill) => (
                <div key={pill} className="rt-skeleton-box" style={{ width: '110px', height: '36px', borderRadius: '999px' }} />
              ))}
            </div>

            {/* Input fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '120px', borderRadius: '12px' }} />
            </div>

            {/* Submit Button */}
            <div className="rt-skeleton-box" style={{ width: '100%', height: '52px', borderRadius: '12px', marginTop: '0.5rem' }} />
          </div>
        </div>
      </section>
    </main>
  );
}
