'use client';

import React from 'react';
import Link from 'next/link';
import { ServicesProvider, useServices } from '../context/ServicesContext';
import HomeMediaPickerModal from '@/app/superadmin/home/components/HomeMediaPickerModal';

import {
  ServicesPagesTable,
  ServiceHeroTab,
  ServiceCardsTab,
  ServiceHighlightsTab,
  ServiceToolsTab,
  ServiceFaqsTab,
  ServiceTestimonialsTab,
  ServiceSeoTab,
} from './components';

function SuperadminServicesContent() {
  const {
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    categories,
    servicesListSummary,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    pagination,
    hero,
    setHero,
    servicesList,
    setServicesList,
    highlights,
    setHighlights,
    tools,
    setTools,
    faqs,
    setFaqs,
    testimonials,
    setTestimonials,
    metaTitle,
    setMetaTitle,
    metaDescription,
    setMetaDescription,
    keywords,
    setKeywords,
    isPublished,
    setIsPublished,
    isLoading,
    isSaving,
    togglingSlug,
    successMessage,
    errorMessage,
    isMediaPickerOpen,
    setIsMediaPickerOpen,
    openAssetPicker,
    selectMediaAsset,
    saveMainServiceContent,
    toggleServiceStatus,
    openEditMain,
    openEditService,
  } = useServices();

  const tabs = [
    { id: 'hero', label: '1. Hero Header & Overview' },
    { id: 'cards', label: '2. Six Core Service Cards' },
    { id: 'highlights', label: '3. Key Highlights & Pillars' },
    { id: 'tools', label: '4. Tech Stack & Integrations' },
    { id: 'faqs', label: '5. Dynamic FAQs & Accordion' },
    { id: 'testimonials', label: '6. Client Testimonials' },
    { id: 'seo', label: '7. SEO, Social & Publication' },
  ];

  // ==========================================
  // RENDER: 1. UNIFIED SERVICES TABLE WITH DB PAGINATION
  // ==========================================
  if (viewMode === 'list') {
    return (
      <ServicesPagesTable
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategoryFilter={selectedCategoryFilter}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        categories={categories}
        services={servicesListSummary}
        isLoading={isLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        pagination={pagination}
        onOpenEditMain={openEditMain}
        onOpenEditService={openEditService}
        onToggleStatus={toggleServiceStatus}
        togglingSlug={togglingSlug}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    );
  }

  // ==========================================
  // RENDER: 2. 7-TAB CMS EDITOR FOR MAIN SERVICE
  // ==========================================
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.25rem 2rem 6rem 2rem', backgroundColor: 'transparent' }}>
      {/* Top Header & Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setViewMode('list')}
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
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
          >
            ← Back to All Services
          </button>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
              Main Services Overview CMS
            </h1>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>
              Full dynamic control for <code style={{ color: 'var(--brand-blue, #1833fe)' }}>/service</code> landing page
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            href="/service"
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
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Live Preview</span>
          </Link>

          <button
            type="button"
            disabled={isSaving}
            onClick={() => saveMainServiceContent()}
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
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isSaving ? 'wait' : 'pointer',
              boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
              opacity: isSaving ? 0.7 : 1,
            }}
          >
            {isSaving ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-spin">
                  <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                </svg>
                <span>Saving to DB...</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
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

      {/* Segmented Tab Navigation Bar (100% Consistent with Home & About CMS) */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '6px',
          marginBottom: '20px',
          borderBottom: '1.5px solid #CBD5E1',
        }}
      >
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

      {/* Tab Panels */}
      <div style={{ minHeight: '400px', backgroundColor: 'transparent' }}>
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
              gap: '22px',
            }}
          >
            {/* Header Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="rt-skeleton-box" style={{ width: '260px', height: '24px', borderRadius: '6px' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
                Above the Fold
              </span>
            </div>

            {/* Sub Badge & Headline */}
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

            {/* Subheadline & Textarea */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Intro Paragraph / Subheadline
              </label>
              <div className="rt-skeleton-box" style={{ width: '100%', height: '74px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
            </div>

            {/* Button Links Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Primary CTA Button Text
                </label>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Secondary CTA Button Text
                </label>
                <div className="rt-skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px', border: '1px solid #CBD5E1' }} />
              </div>
            </div>

            {/* Trust Badges Skeleton Box */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
              <strong style={{ fontSize: '0.875rem', color: '#0F172A', display: 'block', marginBottom: '12px' }}>
                🏷️ Trust Indicator Badges
              </strong>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[1, 2, 3].map((bIdx) => (
                  <div key={bIdx} className="rt-skeleton-box" style={{ width: '150px', height: '36px', borderRadius: '8px' }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'hero' && (
              <ServiceHeroTab hero={hero} setHero={setHero} onOpenAssetPicker={openAssetPicker} />
            )}
            {activeTab === 'cards' && (
              <ServiceCardsTab servicesList={servicesList} setServicesList={setServicesList} onOpenAssetPicker={openAssetPicker} />
            )}
            {activeTab === 'highlights' && (
              <ServiceHighlightsTab highlights={highlights} setHighlights={setHighlights} onOpenAssetPicker={openAssetPicker} />
            )}
            {activeTab === 'tools' && (
              <ServiceToolsTab tools={tools} setTools={setTools} onOpenAssetPicker={openAssetPicker} />
            )}
            {activeTab === 'faqs' && (
              <ServiceFaqsTab faqs={faqs} setFaqs={setFaqs} />
            )}
            {activeTab === 'testimonials' && (
              <ServiceTestimonialsTab
                testimonials={testimonials}
                setTestimonials={setTestimonials}
                onOpenAssetPicker={openAssetPicker}
              />
            )}
            {activeTab === 'seo' && (
              <ServiceSeoTab
                metaTitle={metaTitle}
                setMetaTitle={setMetaTitle}
                metaDescription={metaDescription}
                setMetaDescription={setMetaDescription}
                keywords={keywords}
                setKeywords={setKeywords}
                isPublished={isPublished}
                setIsPublished={setIsPublished}
              />
            )}
          </>
        )}
      </div>

      {/* Global Media Asset Picker Modal */}
      <HomeMediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={selectMediaAsset}
        title="Select Asset for Services CMS"
      />
    </div>
  );
}

export default function SuperadminServicesCMS() {
  return (
    <ServicesProvider>
      <SuperadminServicesContent />
    </ServicesProvider>
  );
}
