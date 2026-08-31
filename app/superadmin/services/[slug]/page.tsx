'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ServicesProvider, useServices } from '@/app/superadmin/context/ServicesContext';
import HomeMediaPickerModal from '@/app/superadmin/home/components/HomeMediaPickerModal';

import {
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
  MobileAppHeroTab,
  MobileAppProcessTab,
  MobileAppTypesTab,
  MobileAppEngineeringTab,
  MobileAppFeaturesTab,
  MobileAppTestimonialsTab,
  MobileAppFaqsTab,
  MobileAppSeoTab,
  CustomSoftwareHeroTab,
  CustomSoftwareServicesTab,
  CustomSoftwareStatsTab,
  CustomSoftwareAboutTab,
  CustomSoftwareProcessTab,
  CustomSoftwareTestimonialsTab,
  CustomSoftwareFaqsTab,
  CustomSoftwareSeoTab,
  DigitalMarketingHeroTab,
  DigitalMarketingStatementTab,
  DigitalMarketingOfferingsTab,
  DigitalMarketingApproachTab,
  DigitalMarketingWhyUsTab,
  DigitalMarketingStackTab,
  DigitalMarketingFaqsTab,
  DigitalMarketingSeoTab,
  SubServiceSkeleton,
  SaveIcon,
  ExternalLinkIcon,
} from '../components';

const SERVICE_TITLES: Record<string, string> = {
  'main': 'Main Services Overview',
  'web-development': 'Website & Web Application Development',
  'custom-software': 'Custom Software & Enterprise Solutions',
  'mobile-application': 'iOS & Android Mobile App Development',
  'graphics-designing': 'Graphics Designing & UI/UX Experience',
  'digital-marketing': 'Digital Marketing & Growth Strategy',
};

function ServiceEditorInner() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || 'web-development';
  const slug = rawSlug.replace(/^service-/, '');
  const isMain = slug === 'main';
  const isDigitalMarketing = slug === 'digital-marketing';
  const isMobileApp = slug === 'mobile-application';
  const isCustomSoftware = slug === 'custom-software';

  const {
    activeTab,
    setActiveTab,
    subActiveTab,
    setSubActiveTab,
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
    isLoading: isMainLoading,
    isSaving: isMainSaving,
    saveMainServiceContent,
    subServiceData,
    setSubServiceData,
    isSubServiceLoading,
    isSubServiceSaving,
    fetchSubServiceData,
    saveSubServiceData,
    successMessage,
    errorMessage,
    isMediaPickerOpen,
    setIsMediaPickerOpen,
    openAssetPicker,
    selectMediaAsset,
  } = useServices();

  const serviceName = SERVICE_TITLES[slug] || (isMain ? 'Main Services Overview' : 'Service Detail');
  const serviceRoute = isMain ? '/service' : `/service/${slug}`;

  // Fetch Sub-Service Data on Mount / Slug Change via ServicesContext
  useEffect(() => {
    if (!isMain) {
      fetchSubServiceData(slug);
    }
  }, [slug, isMain, fetchSubServiceData]);

  // Handle Save Action via ServicesContext
  const handleSave = () => {
    if (isMain) {
      saveMainServiceContent();
    } else {
      saveSubServiceData(slug, subServiceData);
    }
  };

  const mainTabs = [
    { id: 'hero', label: '1. Hero Header & Overview' },
    { id: 'cards', label: '2. Six Core Service Cards' },
    { id: 'highlights', label: '3. Key Highlights & Pillars' },
    { id: 'tools', label: '4. Tech Stack & Integrations' },
    { id: 'faqs', label: '5. Dynamic FAQs & Accordion' },
    { id: 'testimonials', label: '6. Client Testimonials' },
    { id: 'seo', label: '7. SEO, Social & Publication' },
  ];

  const webDevTabs = [
    { id: 'hero', label: '1. Hero Header & Overview' },
    { id: 'speciality', label: '2. Capabilities & Features' },
    { id: 'types', label: '3. Website Types We Build' },
    { id: 'techStack', label: '4. Tech Stack & Tools' },
    { id: 'faqs', label: '5. Dynamic Service FAQs' },
    { id: 'seo', label: '6. SEO & Social Meta' },
  ];

  const mobileAppTabs = [
    { id: 'hero', label: '1. Hero Header & Overview' },
    { id: 'process', label: '2. Development Process' },
    { id: 'types', label: '3. Mobile App Types' },
    { id: 'engineering', label: '4. Engineering & Advantage' },
    { id: 'features', label: '5. What You Get / Features' },
    { id: 'testimonials', label: '6. Client Testimonials' },
    { id: 'faqs', label: '7. Dynamic FAQs' },
    { id: 'seo', label: '8. SEO & Social Meta' },
  ];

  const customSoftwareTabs = [
    { id: 'hero', label: '1. Hero Header & Visuals' },
    { id: 'services', label: '2. Custom Offerings (Cards)' },
    { id: 'stats', label: '3. Numbers & Metrics' },
    { id: 'about', label: '4. Why Choose Us' },
    { id: 'process', label: '5. Development Process' },
    { id: 'testimonials', label: '6. Client Testimonials' },
    { id: 'faqs', label: '7. Dynamic FAQs' },
    { id: 'seo', label: '8. SEO & Social Meta' },
  ];

  const digitalMarketingTabs = [
    { id: 'hero', label: '1. Hero & Branding' },
    { id: 'statement', label: '2. Mission Statement' },
    { id: 'offerings', label: '3. Services & Offerings' },
    { id: 'approach', label: '4. Our Approach' },
    { id: 'whyUs', label: '5. Why TryangleTech' },
    { id: 'stack', label: '6. Marketing Stack' },
    { id: 'faqs', label: '7. FAQs' },
    { id: 'seo', label: '8. SEO & Social Meta' },
  ];

  const tabs = isMain
    ? mainTabs
    : isDigitalMarketing
    ? digitalMarketingTabs
    : isCustomSoftware
    ? customSoftwareTabs
    : isMobileApp
    ? mobileAppTabs
    : webDevTabs;
  const currentActiveTab = isMain ? activeTab : subActiveTab;
  const isLoading = isMain ? isMainLoading : isSubServiceLoading;
  const isSaving = isMain ? isMainSaving : isSubServiceSaving;

  return (
    <div
      style={{
        padding: '0 24px 48px 24px',
        maxWidth: '1440px',
        margin: '0 auto',
        minHeight: '100vh',
      }}
    >
      {/* Top Breadcrumb & Live Action Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 0 18px 0',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#EFF6FF',
              color: 'var(--brand-blue, #1833fe)',
              border: '1px solid #BFDBFE',
              fontFamily: 'monospace',
            }}
          >
            Live Landing Page: {serviceRoute}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            href={serviceRoute}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
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
            <ExternalLinkIcon size={13} color="#334155" />
            <span>Live Preview</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isSaving ? '#93C5FD' : 'var(--brand-blue, #1833fe)',
              color: '#FFFFFF',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 4px rgba(24, 51, 254, 0.2)',
              transition: 'all 0.15s ease',
            }}
          >
            <SaveIcon size={14} color="#FFFFFF" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Success & Error Banner Alerts */}
      {successMessage && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: '#DCFCE7',
            border: '1px solid #86EFAC',
            borderRadius: '10px',
            color: '#15803D',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: '10px',
            color: '#B91C1C',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tab Navigation Pill Bar */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '12px',
          marginBottom: '24px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {tabs.map((tab) => {
          const isActive = currentActiveTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => (isMain ? setActiveTab(tab.id) : setSubActiveTab(tab.id))}
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
          <SubServiceSkeleton isMain={isMain} activeTab={currentActiveTab} />
        ) : isMain ? (
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
        ) : isDigitalMarketing ? (
          <>
            {subActiveTab === 'hero' && (
              <DigitalMarketingHeroTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'statement' && (
              <DigitalMarketingStatementTab formData={subServiceData} setFormData={setSubServiceData} />
            )}
            {subActiveTab === 'offerings' && (
              <DigitalMarketingOfferingsTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'approach' && (
              <DigitalMarketingApproachTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'whyUs' && (
              <DigitalMarketingWhyUsTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'stack' && (
              <DigitalMarketingStackTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'faqs' && (
              <DigitalMarketingFaqsTab formData={subServiceData} setFormData={setSubServiceData} />
            )}
            {subActiveTab === 'seo' && (
              <DigitalMarketingSeoTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
          </>
        ) : isCustomSoftware ? (
          <>
            {subActiveTab === 'hero' && (
              <CustomSoftwareHeroTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'services' && (
              <CustomSoftwareServicesTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'stats' && (
              <CustomSoftwareStatsTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'about' && (
              <CustomSoftwareAboutTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'process' && (
              <CustomSoftwareProcessTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'testimonials' && (
              <CustomSoftwareTestimonialsTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'faqs' && (
              <CustomSoftwareFaqsTab formData={subServiceData} setFormData={setSubServiceData} />
            )}
            {subActiveTab === 'seo' && (
              <CustomSoftwareSeoTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
          </>
        ) : isMobileApp ? (
          <>
            {subActiveTab === 'hero' && (
              <MobileAppHeroTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'process' && (
              <MobileAppProcessTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'types' && (
              <MobileAppTypesTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'engineering' && (
              <MobileAppEngineeringTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'features' && (
              <MobileAppFeaturesTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'testimonials' && (
              <MobileAppTestimonialsTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'faqs' && (
              <MobileAppFaqsTab formData={subServiceData} setFormData={setSubServiceData} />
            )}
            {subActiveTab === 'seo' && (
              <MobileAppSeoTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
          </>
        ) : (
          <>
            {subActiveTab === 'hero' && (
              <SubServiceHeroTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'speciality' && (
              <SubServiceSpecialityTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'types' && (
              <SubServiceTypesTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'techStack' && (
              <SubServiceTechStackTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
            {subActiveTab === 'faqs' && (
              <SubServiceFaqsTab formData={subServiceData} setFormData={setSubServiceData} />
            )}
            {subActiveTab === 'seo' && (
              <SubServiceSeoTab formData={subServiceData} setFormData={setSubServiceData} onOpenAssetPicker={openAssetPicker} />
            )}
          </>
        )}
      </div>

      {/* Global Media Asset Picker Modal */}
      <HomeMediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={selectMediaAsset}
        title={`Select Asset for ${serviceName}`}
      />
    </div>
  );
}

export default function ServiceSubEditorPage() {
  return (
    <ServicesProvider>
      <ServiceEditorInner />
    </ServicesProvider>
  );
}
