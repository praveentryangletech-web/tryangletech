'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AboutProvider, useAbout } from '../context/AboutContext';
import HomeMediaPickerModal from '@/app/superadmin/home/components/HomeMediaPickerModal';

import AboutHeroTab from './components/AboutHeroTab';
import AboutSpecialityTab from './components/AboutSpecialityTab';
import AboutMissionVisionTab from './components/AboutMissionVisionTab';
import AboutWhyChooseUsTab from './components/AboutWhyChooseUsTab';
import AboutProcessTab from './components/AboutProcessTab';
import AboutCtaTab from './components/AboutCtaTab';
import AboutFaqsTab from './components/AboutFaqsTab';
import AboutSeoTab from './components/AboutSeoTab';

function SuperadminAboutContent() {
  const {
    hero,
    setHero,
    speciality,
    setSpeciality,
    missionVision,
    setMissionVision,
    whyChooseUs,
    setWhyChooseUs,
    process,
    setProcess,
    ctaBanner,
    setCtaBanner,
    faqSection,
    setFaqSection,
    metaTitle,
    setMetaTitle,
    metaDescription,
    setMetaDescription,
    keywords,
    setKeywords,
    canonicalUrl,
    setCanonicalUrl,
    isPublished,
    updatedAt,
    isLoading,
    isSaving,
    successMessage,
    errorMessage,
    isMediaPickerOpen,
    setIsMediaPickerOpen,
    openAssetPicker,
    selectMediaAsset,
    saveAboutContent,
    fullData,
  } = useAbout();

  const [activeTab, setActiveTab] = useState<string>('hero');

  const tabs = [
    { id: 'hero', label: '1. Hero & Stats' },
    { id: 'speciality', label: '2. Speciality & Benefits' },
    { id: 'missionVision', label: '3. Mission & Vision' },
    { id: 'whyChooseUs', label: '4. Why Choose Us' },
    { id: 'process', label: '5. Delivery Process' },
    { id: 'ctaBanner', label: '6. Footer CTA' },
    { id: 'faqs', label: '7. FAQs & AEO' },
    { id: 'seo', label: '8. SEO & Social' },
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.25rem 2rem 6rem 2rem', backgroundColor: 'transparent' }}>
      {/* Editor Action Toolbar (Static & Always Rendered) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
        <Link
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            height: '38px',
            padding: '0 14px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: '#334155',
            fontSize: '0.825rem',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          <span>Preview Live</span>
        </Link>

        <button
          type="button"
          onClick={() => saveAboutContent(true)}
          disabled={isSaving || isLoading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            height: '38px',
            padding: '0 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'var(--brand-blue, #1833fe)',
            color: '#FFFFFF',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: isSaving || isLoading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(24, 51, 254, 0.25)',
            opacity: isSaving || isLoading ? 0.7 : 1,
            transition: 'all 0.15s ease',
          }}
        >
          <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div style={{ padding: '10px 16px', backgroundColor: '#ECFDF5', border: '1px solid #34D399', color: '#065F46', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.825rem', fontWeight: 600 }}>
          ✓ {successMessage}
        </div>
      )}

      {errorMessage && (
        <div style={{ padding: '10px 16px', backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#991B1B', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.825rem', fontWeight: 600 }}>
          ⚠ {errorMessage}
        </div>
      )}

      {/* Segmented Tab Navigation Bar (Static & Always Visible with no ugly scrollbar) */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '20px', borderBottom: '1.5px solid #CBD5E1' }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isActive ? 'var(--brand-blue, #1833fe)' : 'transparent',
                color: isActive ? '#FFFFFF' : '#64748B',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.825rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Container (ONLY THIS AREA SHOWS SKELETON WHILE LOADING) */}
      <div style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
        {isLoading ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            {/* Section Header Skeleton */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #F1F5F9' }}>
              <div>
                <div className="rt-skeleton-box" style={{ width: '220px', height: '24px', borderRadius: '6px', marginBottom: '6px' }} />
                <div className="rt-skeleton-box" style={{ width: '320px', height: '14px', borderRadius: '4px' }} />
              </div>
              <div className="rt-skeleton-box" style={{ width: '90px', height: '28px', borderRadius: '6px' }} />
            </div>

            {/* Form Field Rows Skeleton */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              <div>
                <div className="rt-skeleton-box" style={{ width: '120px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '44px', borderRadius: '10px' }} />
              </div>
              <div>
                <div className="rt-skeleton-box" style={{ width: '140px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
                <div className="rt-skeleton-box" style={{ width: '100%', height: '44px', borderRadius: '10px' }} />
              </div>
            </div>

            <div>
              <div className="rt-skeleton-box" style={{ width: '160px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '88px', borderRadius: '10px' }} />
            </div>

            <div>
              <div className="rt-skeleton-box" style={{ width: '180px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '88px', borderRadius: '10px' }} />
            </div>

            {/* Statistics / Repeater Box Skeleton */}
            <div style={{ padding: '1.25rem', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div className="rt-skeleton-box" style={{ width: '150px', height: '16px', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rt-skeleton-box" style={{ width: '100%', height: '70px', borderRadius: '10px' }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'hero' && (
              <AboutHeroTab hero={hero} setHero={setHero} onOpenAssetPicker={openAssetPicker} />
            )}
            {activeTab === 'speciality' && (
              <AboutSpecialityTab speciality={speciality} setSpeciality={setSpeciality} onOpenAssetPicker={openAssetPicker} />
            )}
            {activeTab === 'missionVision' && (
              <AboutMissionVisionTab missionVision={missionVision} setMissionVision={setMissionVision} onOpenAssetPicker={openAssetPicker} />
            )}
            {activeTab === 'whyChooseUs' && (
              <AboutWhyChooseUsTab whyChooseUs={whyChooseUs} setWhyChooseUs={setWhyChooseUs} onOpenAssetPicker={openAssetPicker} />
            )}
            {activeTab === 'process' && (
              <AboutProcessTab process={process} setProcess={setProcess} onOpenAssetPicker={openAssetPicker} />
            )}
            {activeTab === 'ctaBanner' && (
              <AboutCtaTab ctaBanner={ctaBanner} setCtaBanner={setCtaBanner} />
            )}
            {activeTab === 'faqs' && (
              <AboutFaqsTab faqSection={faqSection} setFaqSection={setFaqSection} />
            )}
            {activeTab === 'seo' && (
              <AboutSeoTab
                metaTitle={metaTitle}
                setMetaTitle={setMetaTitle}
                metaDescription={metaDescription}
                setMetaDescription={setMetaDescription}
                keywords={keywords}
                setKeywords={setKeywords}
                canonicalUrl={canonicalUrl}
                setCanonicalUrl={setCanonicalUrl}
                fullData={fullData}
              />
            )}
          </>
        )}
      </div>

      {/* Media Picker Modal */}
      <HomeMediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={selectMediaAsset}
        title="Select Image Asset from Library"
      />
    </div>
  );
}

export default function SuperadminAboutPage() {
  return (
    <AboutProvider>
      <SuperadminAboutContent />
    </AboutProvider>
  );
}
