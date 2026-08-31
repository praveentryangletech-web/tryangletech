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
  SubServiceHeroTab,
  SubServiceSpecialityTab,
  SubServiceTypesTab,
  SubServiceTechStackTab,
  SubServiceFaqsTab,
  SubServiceSeoTab,
} from './components';

function SuperadminServicesContent() {
  const {
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    subActiveTab,
    setSubActiveTab,
    selectedSubService,
    subServiceData,
    setSubServiceData,
    isSubServiceLoading,
    isSubServiceSaving,
    fetchSubServiceData,
    saveSubServiceData,
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
      <>
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
        <HomeMediaPickerModal
          isOpen={isMediaPickerOpen}
          onClose={() => setIsMediaPickerOpen(false)}
          onSelect={selectMediaAsset}
          title="Select Asset for Services CMS"
        />
      </>
    );
  }

  // ==========================================
  // RENDER: 2. 6-TAB FULL-PAGE CMS EDITOR FOR SUB-SERVICES (e.g. Web Development)
  // ==========================================
  if (viewMode === 'edit-sub') {
    const subTabs = [
      { id: 'hero', label: '1. Hero Header & Overview' },
      { id: 'speciality', label: '2. Capabilities & Features' },
      { id: 'types', label: '3. Website Types' },
      { id: 'techStack', label: '4. Tech Stack & Integrations' },
      { id: 'faqs', label: '5. Dynamic FAQs & Accordion' },
      { id: 'seo', label: '6. SEO, Social & Publication' },
    ];

    const currentSubSlug = selectedSubService?.slug || 'web-development';
    const currentSubName = selectedSubService?.name || 'Website & Web Application Development';
    const currentSubRoute = selectedSubService?.route || `/service/${currentSubSlug}`;

    return (
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.25rem 2rem 6rem 2rem', backgroundColor: 'transparent' }}>
        {/* Top Header & Action Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
            >
              ← Back to All Services
            </button>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
                {currentSubName} CMS
              </h1>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>
                Full dynamic control for <code style={{ color: 'var(--brand-blue, #1833fe)' }}>{currentSubRoute}</code> landing page
              </p>
            </div>
          </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link
                href={currentSubRoute}
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
                disabled={isSubServiceSaving}
                onClick={() => saveSubServiceData()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '38px',
                  padding: '0 18px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'var(--brand-blue, #1833fe)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: isSubServiceSaving ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
                }}
              >
              {isSubServiceSaving ? (
                <>
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#FFFFFF',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
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

        {/* Segmented Tab Navigation Bar */}
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
          {subTabs.map((tab) => {
            const isActive = subActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSubActiveTab(tab.id)}
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
          {isSubServiceLoading || !subServiceData ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748B' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>Loading service data...</div>
            </div>
          ) : (
            <>
              {subActiveTab === 'hero' && (
                <SubServiceHeroTab formData={subServiceData} setFormData={setSubServiceData} />
              )}
              {subActiveTab === 'speciality' && (
                <SubServiceSpecialityTab formData={subServiceData} setFormData={setSubServiceData} />
              )}
              {subActiveTab === 'types' && (
                <SubServiceTypesTab formData={subServiceData} setFormData={setSubServiceData} />
              )}
              {subActiveTab === 'techStack' && (
                <SubServiceTechStackTab formData={subServiceData} setFormData={setSubServiceData} />
              )}
              {subActiveTab === 'faqs' && (
                <SubServiceFaqsTab formData={subServiceData} setFormData={setSubServiceData} />
              )}
              {subActiveTab === 'seo' && (
                <SubServiceSeoTab formData={subServiceData} setFormData={setSubServiceData} />
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

  // ==========================================
  // RENDER: 3. 7-TAB CMS EDITOR FOR MAIN SERVICE OVERVIEW
  // ==========================================
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.25rem 2rem 6rem 2rem', backgroundColor: 'transparent' }}>
      {/* Top Header & Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
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
                justifyContent: 'center',
                gap: '8px',
                height: '38px',
                padding: '0 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--brand-blue, #1833fe)',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: isSaving ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
              }}
            >
              {isSaving ? (
              <>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#FFFFFF',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
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

      {/* Segmented Tab Navigation Bar */}
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
          <div style={{ padding: '4rem', textAlign: 'center', color: '#64748B' }}>
            <div style={{ fontSize: '1rem', fontWeight: 600 }}>Loading services data...</div>
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
