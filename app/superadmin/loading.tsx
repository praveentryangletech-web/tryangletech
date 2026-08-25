import React from 'react';

/**
 * Superadmin Control Center Loading Skeleton
 * 
 * Renders a pixel-perfect, consistent admin wireframe during page transitions.
 */
export default function SuperadminLoading() {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.25rem 2rem 6rem 2rem', backgroundColor: 'transparent' }}>
      {/* Action Toolbar Skeleton */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
        <div className="rt-skeleton-box" style={{ width: '110px', height: '38px', borderRadius: '8px' }} />
        <div className="rt-skeleton-box" style={{ width: '130px', height: '38px', borderRadius: '8px' }} />
      </div>

      {/* Segmented Tab Navigation Bar Skeleton */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'hidden', paddingBottom: '6px', marginBottom: '20px', borderBottom: '1.5px solid #CBD5E1' }}>
        {['1. Hero & Stats', '2. Speciality & Benefits', '3. Mission & Vision', '4. Why Choose Us', '5. Delivery Process', '6. Footer CTA', '7. FAQs & AEO', '8. SEO & Social'].map((tab, idx) => (
          <div
            key={idx}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: idx === 0 ? 'var(--brand-blue, #1833fe)' : '#F1F5F9',
              color: idx === 0 ? '#FFFFFF' : '#94A3B8',
              fontSize: '0.825rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Form Content Card Skeleton */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '2rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
        }}
      >
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="rt-skeleton-box" style={{ width: '260px', height: '24px', borderRadius: '6px' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
            Above the Fold
          </span>
        </div>

        {/* 2-Column Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
              Overtitle / Sub-Badge Text
            </label>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
              Main Hero Headline *
            </label>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
          </div>
        </div>

        {/* Intro Paragraph 1 */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
            Intro Paragraph 1 *
          </label>
          <div className="rt-skeleton-box" style={{ width: '100%', height: '74px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
        </div>

        {/* Intro Paragraph 2 */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
            Intro Paragraph 2 (Value Proposition)
          </label>
          <div className="rt-skeleton-box" style={{ width: '100%', height: '74px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
        </div>

        {/* Key Company Statistics Box */}
        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>📊 Live Company Statistics</strong>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748B' }}>
                Displayed directly below the hero intro text on the About page.
              </p>
            </div>
            <div
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid #C7D2FE',
                backgroundColor: '#EEF2FF',
                color: '#4338CA',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              + Add Stat
            </div>
          </div>

          {/* 3 Stat Item Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {[1, 2, 3].map((statIdx) => (
              <div key={statIdx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="rt-skeleton-box" style={{ width: '50px', height: '12px', borderRadius: '4px' }} />
                  <div className="rt-skeleton-box" style={{ width: '16px', height: '16px', borderRadius: '4px' }} />
                </div>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Client Avatar Faces & Colors Box */}
        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
          <strong style={{ fontSize: '0.875rem', color: '#0F172A', display: 'block', marginBottom: '12px' }}>
            👥 Client Avatar Circles (Top Left Stack)
          </strong>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="rt-skeleton-box" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
