'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ServicesProvider, useServices } from '../../context/ServicesContext';
import HomeMediaPickerModal from '@/app/superadmin/home/components/HomeMediaPickerModal';
import { apiClient } from '@/app/superadmin/utils/apiClient';
import { WebDevContentDTO } from '@/backend/services/services/services.types';
import { DEFAULT_WEB_DEV_CONTENT } from '@/backend/services/services/services.defaults';

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
  const router = useRouter();
  const slug = (params?.slug as string) || 'web-development';
  const isMain = slug === 'main' || slug === 'service-main';

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
    isMediaPickerOpen,
    setIsMediaPickerOpen,
    openAssetPicker,
    selectMediaAsset,
  } = useServices();

  const [subData, setSubData] = useState<WebDevContentDTO>(DEFAULT_WEB_DEV_CONTENT);
  const [isSubLoading, setIsSubLoading] = useState(!isMain);
  const [isSubSaving, setIsSubSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const serviceName = SERVICE_TITLES[slug] || (isMain ? 'Main Services Overview' : 'Service Detail');
  const serviceRoute = isMain ? '/service' : `/service/${slug}`;

  // Fetch Sub-Service Data on Mount
  useEffect(() => {
    if (!isMain) {
      setIsSubLoading(true);
      (async () => {
        try {
          const res = await apiClient.get<WebDevContentDTO>(`/api/superadmin/services/${slug}`, { useCache: false });
          if (res.success && res.data) {
            setSubData(res.data);
          } else {
            setSubData(DEFAULT_WEB_DEV_CONTENT);
          }
        } catch (err: any) {
          console.warn('[ServiceEditor] Error fetching sub-service data, using defaults:', err);
          setSubData(DEFAULT_WEB_DEV_CONTENT);
        } finally {
          setIsSubLoading(false);
        }
      })();
    }
  }, [slug, isMain]);

  // Save Sub-Service
  const handleSaveSubService = async () => {
    setIsSubSaving(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const res = await apiClient.put<WebDevContentDTO>(`/api/superadmin/services/${slug}`, subData);
      if (res.success && res.data) {
        setSubData(res.data);
        setSuccessMessage(`✓ ${serviceName} changes saved live to database!`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(res.error || 'Failed to save changes.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error saving service content.');
    } finally {
      setIsSubSaving(false);
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

  const subTabs = [
    { id: 'hero', label: '1. Hero Header & Overview' },
    { id: 'speciality', label: '2. Capabilities & Features' },
    { id: 'types', label: '3. Website Types' },
    { id: 'techStack', label: '4. Tech Stack & Integrations' },
    { id: 'faqs', label: '5. Dynamic FAQs & Accordion' },
    { id: 'seo', label: '6. SEO, Social & Publication' },
  ];

  const isSaving = isMain ? isMainSaving : isSubSaving;
  const isLoading = isMain ? isMainLoading : isSubLoading;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.25rem 2rem 6rem 2rem', backgroundColor: 'transparent' }}>
      {/* Top Header & Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            {serviceName} CMS
          </h1>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>
            Full dynamic control for <code style={{ color: 'var(--brand-blue, #1833fe)' }}>{serviceRoute}</code> landing page
          </p>
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
            onClick={isMain ? () => saveMainServiceContent() : handleSaveSubService}
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
        {(isMain ? mainTabs : subTabs).map((tab) => {
          const currentActive = isMain ? activeTab : subActiveTab;
          const isActive = currentActive === tab.id;
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
          <div style={{ padding: '4rem', textAlign: 'center', color: '#64748B' }}>
            <div style={{ fontSize: '1rem', fontWeight: 600 }}>Loading service content...</div>
          </div>
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
        ) : (
          <>
            {subActiveTab === 'hero' && (
              <SubServiceHeroTab formData={subData} setFormData={setSubData as any} />
            )}
            {subActiveTab === 'speciality' && (
              <SubServiceSpecialityTab formData={subData} setFormData={setSubData as any} />
            )}
            {subActiveTab === 'types' && (
              <SubServiceTypesTab formData={subData} setFormData={setSubData as any} />
            )}
            {subActiveTab === 'techStack' && (
              <SubServiceTechStackTab formData={subData} setFormData={setSubData as any} />
            )}
            {subActiveTab === 'faqs' && (
              <SubServiceFaqsTab formData={subData} setFormData={setSubData as any} />
            )}
            {subActiveTab === 'seo' && (
              <SubServiceSeoTab formData={subData} setFormData={setSubData as any} />
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

export default function ServiceSubEditorPage() {
  return (
    <ServicesProvider>
      <ServiceEditorInner />
    </ServicesProvider>
  );
}
