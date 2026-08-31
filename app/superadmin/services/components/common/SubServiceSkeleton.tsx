'use client';

import React from 'react';

interface SubServiceSkeletonProps {
  isMain?: boolean;
  activeTab: string;
}

export default function SubServiceSkeleton({ isMain = false, activeTab }: SubServiceSkeletonProps) {
  if (isMain) {
    return <MainServiceTabSkeleton tab={activeTab} />;
  }

  return <SubServiceTabSkeleton tab={activeTab} />;
}

/**
 * 1. Sub-Service (e.g. Web Development / Mobile App / Custom Software / Digital Marketing / Graphics Designing) Tab-Aware Skeleton
 */
function SubServiceTabSkeleton({ tab }: { tab: string }) {
  switch (tab) {
    case 'hero':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div className="rt-skeleton-box" style={{ width: '280px', height: '22px', borderRadius: '6px' }} />
              <div className="rt-skeleton-box" style={{ width: '420px', height: '14px', borderRadius: '4px' }} />
            </div>
            <div className="rt-skeleton-box" style={{ width: '90px', height: '26px', borderRadius: '6px' }} />
          </div>

          {/* Sub-badge & Headline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <div className="rt-skeleton-box" style={{ width: '130px', height: '14px', marginBottom: '6px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
            </div>
            <div>
              <div className="rt-skeleton-box" style={{ width: '150px', height: '14px', marginBottom: '6px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
            </div>
          </div>

          {/* Subheadline Textarea */}
          <div>
            <div className="rt-skeleton-box" style={{ width: '220px', height: '14px', marginBottom: '6px', borderRadius: '4px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '80px', borderRadius: '8px' }} />
          </div>

          {/* 3 Key Benefit Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="rt-skeleton-box" style={{ width: '180px', height: '16px', borderRadius: '4px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '0',
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="rt-skeleton-box" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
                      <div className="rt-skeleton-box" style={{ width: '60px', height: '16px', borderRadius: '4px' }} />
                    </div>
                    <div className="rt-skeleton-box" style={{ width: '140px', height: '34px', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <div className="rt-skeleton-box" style={{ width: '70px', height: '12px', marginBottom: '6px', borderRadius: '4px' }} />
                    <div className="rt-skeleton-box" style={{ width: '100%', height: '36px', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <div className="rt-skeleton-box" style={{ width: '100px', height: '12px', marginBottom: '6px', borderRadius: '4px' }} />
                    <div className="rt-skeleton-box" style={{ width: '100%', height: '56px', borderRadius: '8px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="rt-skeleton-box" style={{ width: '120px', height: '14px', marginBottom: '6px', borderRadius: '4px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
              </div>
            ))}
          </div>

          {/* Hero Visual Assets Card */}
          <div
            style={{
              backgroundColor: 'transparent',
              borderRadius: '0',
              border: 'none',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
              <div className="rt-skeleton-box" style={{ width: '320px', height: '18px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '480px', height: '12px', borderRadius: '4px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ border: 'none', borderRadius: '0', padding: '0', backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="rt-skeleton-box" style={{ width: '140px', height: '14px', borderRadius: '4px' }} />
                    <div className="rt-skeleton-box" style={{ width: '80px', height: '24px', borderRadius: '6px' }} />
                  </div>
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '36px', borderRadius: '8px' }} />
                  <div className="rt-skeleton-box" style={{ width: '80px', height: '12px', borderRadius: '4px' }} />
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '36px', borderRadius: '8px' }} />
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '110px', borderRadius: '8px' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'speciality':
    case 'process':
    case 'offerings':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="rt-skeleton-box" style={{ width: '280px', height: '22px', borderRadius: '6px' }} />
            <div className="rt-skeleton-box" style={{ width: '80px', height: '26px', borderRadius: '6px' }} />
          </div>

          {/* Sub-badge & Heading */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
          </div>

          {/* 3 Capability Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '0',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
                  <div className="rt-skeleton-box" style={{ width: '220px', height: '18px', borderRadius: '4px' }} />
                  <div className="rt-skeleton-box" style={{ width: '80px', height: '14px', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
                </div>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '60px', borderRadius: '8px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', backgroundColor: 'transparent', padding: '0', borderRadius: '0' }}>
                  {[1, 2].map((imgIdx) => (
                    <div key={imgIdx} style={{ backgroundColor: 'transparent', padding: '0', borderRadius: '0', border: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div className="rt-skeleton-box" style={{ width: '100px', height: '12px', borderRadius: '4px' }} />
                      <div className="rt-skeleton-box" style={{ width: '100%', height: '34px', borderRadius: '6px' }} />
                      <div className="rt-skeleton-box" style={{ width: '100%', height: '100px', borderRadius: '8px' }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'types':
    case 'capabilities':
    case 'services':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="rt-skeleton-box" style={{ width: '260px', height: '22px', borderRadius: '6px' }} />
            <div className="rt-skeleton-box" style={{ width: '90px', height: '26px', borderRadius: '6px' }} />
          </div>

          {/* Sub-badge & Heading */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
          </div>

          {/* Type Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '0',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
                  <div className="rt-skeleton-box" style={{ width: '240px', height: '18px', borderRadius: '4px' }} />
                  <div className="rt-skeleton-box" style={{ width: '70px', height: '14px', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
                </div>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '56px', borderRadius: '8px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', backgroundColor: 'transparent', padding: '0', borderRadius: '0' }}>
                  {[1, 2].map((imgIdx) => (
                    <div key={imgIdx} style={{ backgroundColor: 'transparent', padding: '0', borderRadius: '0', border: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div className="rt-skeleton-box" style={{ width: '120px', height: '12px', borderRadius: '4px' }} />
                      <div className="rt-skeleton-box" style={{ width: '100%', height: '34px', borderRadius: '6px' }} />
                      <div className="rt-skeleton-box" style={{ width: '100%', height: '100px', borderRadius: '8px' }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'techStack':
    case 'engineering':
    case 'features':
    case 'stack':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="rt-skeleton-box" style={{ width: '260px', height: '22px', borderRadius: '6px' }} />
            <div className="rt-skeleton-box" style={{ width: '130px', height: '36px', borderRadius: '8px' }} />
          </div>

          {/* Section Heading */}
          <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />

          {/* Tech Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '0',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                  <div className="rt-skeleton-box" style={{ width: '80px', height: '16px', borderRadius: '4px' }} />
                  <div className="rt-skeleton-box" style={{ width: '50px', height: '14px', borderRadius: '4px' }} />
                </div>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '100px', borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'faqs':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="rt-skeleton-box" style={{ width: '280px', height: '22px', borderRadius: '6px' }} />
            <div className="rt-skeleton-box" style={{ width: '120px', height: '36px', borderRadius: '8px' }} />
          </div>

          {/* FAQ Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '0',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                  <div className="rt-skeleton-box" style={{ width: '80px', height: '16px', borderRadius: '4px' }} />
                  <div className="rt-skeleton-box" style={{ width: '50px', height: '14px', borderRadius: '4px' }} />
                </div>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '70px', borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'seo':
    default:
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="rt-skeleton-box" style={{ width: '280px', height: '22px', borderRadius: '6px' }} />
            <div className="rt-skeleton-box" style={{ width: '120px', height: '32px', borderRadius: '20px' }} />
          </div>

          {/* Meta Title */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div className="rt-skeleton-box" style={{ width: '240px', height: '14px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '60px', height: '14px', borderRadius: '4px' }} />
            </div>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
          </div>

          {/* Meta Description */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div className="rt-skeleton-box" style={{ width: '220px', height: '14px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '60px', height: '14px', borderRadius: '4px' }} />
            </div>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '74px', borderRadius: '8px' }} />
          </div>

          {/* Social Share Card Image */}
          <div style={{ backgroundColor: 'transparent', borderRadius: '0', border: 'none', padding: '0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="rt-skeleton-box" style={{ width: '300px', height: '18px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '90px', height: '26px', borderRadius: '6px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
            </div>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '110px', borderRadius: '8px' }} />
          </div>

          {/* Keywords */}
          <div>
            <div className="rt-skeleton-box" style={{ width: '180px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <div className="rt-skeleton-box" style={{ flex: 1, height: '42px', borderRadius: '8px' }} />
              <div className="rt-skeleton-box" style={{ width: '70px', height: '42px', borderRadius: '8px' }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="rt-skeleton-box" style={{ width: '120px', height: '28px', borderRadius: '20px' }} />
              ))}
            </div>
          </div>
        </div>
      );
  }
}

/**
 * 2. Main Service Tab-Aware Skeleton
 */
function MainServiceTabSkeleton({ tab }: { tab: string }) {
  switch (tab) {
    case 'hero':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="rt-skeleton-box" style={{ width: '280px', height: '22px', borderRadius: '6px' }} />
            <div className="rt-skeleton-box" style={{ width: '90px', height: '26px', borderRadius: '6px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
          </div>
          <div className="rt-skeleton-box" style={{ width: '100%', height: '74px', borderRadius: '8px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
          </div>
        </div>
      );

    case 'cards':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="rt-skeleton-box" style={{ width: '280px', height: '22px', borderRadius: '6px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ backgroundColor: 'transparent', border: 'none', borderRadius: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="rt-skeleton-box" style={{ width: '180px', height: '18px', borderRadius: '4px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '60px', borderRadius: '8px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '50px', borderRadius: '6px' }} />
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '50px', borderRadius: '6px' }} />
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '50px', borderRadius: '6px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'highlights':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="rt-skeleton-box" style={{ width: '280px', height: '22px', borderRadius: '6px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '100px', borderRadius: '8px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '100px', borderRadius: '8px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ backgroundColor: 'transparent', border: 'none', borderRadius: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="rt-skeleton-box" style={{ width: '160px', height: '16px', borderRadius: '4px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '38px', borderRadius: '6px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '50px', borderRadius: '6px' }} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'tools':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="rt-skeleton-box" style={{ width: '280px', height: '22px', borderRadius: '6px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} style={{ backgroundColor: 'transparent', border: 'none', borderRadius: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '36px', borderRadius: '6px' }} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'testimonials':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="rt-skeleton-box" style={{ width: '280px', height: '22px', borderRadius: '6px' }} />
            <div className="rt-skeleton-box" style={{ width: '130px', height: '36px', borderRadius: '8px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ backgroundColor: 'transparent', border: 'none', borderRadius: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div className="rt-skeleton-box" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <div className="rt-skeleton-box" style={{ width: '180px', height: '16px', borderRadius: '4px' }} />
                    <div className="rt-skeleton-box" style={{ width: '120px', height: '12px', borderRadius: '4px' }} />
                  </div>
                </div>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '60px', borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <SubServiceTabSkeleton tab={tab} />;
  }
}
