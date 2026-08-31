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
  SubServiceSkeleton,
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

  const [subMediaPickerOpen, setSubMediaPickerOpen] = useState(false);
  const [subPickerTarget, setSubPickerTarget] = useState<string>('');

  const handleOpenAssetPicker = (target: string) => {
    if (isMain) {
      openAssetPicker(target);
    } else {
      setSubPickerTarget(target);
      setSubMediaPickerOpen(true);
    }
  };

  const handleSubSelectAsset = (url: string) => {
    if (subPickerTarget.startsWith('subService.')) {
      const fieldPath = subPickerTarget.replace('subService.', '');
      setSubData((prev) => {
        if (!prev) return prev;
        const copy = JSON.parse(JSON.stringify(prev));
        if (fieldPath === 'hero.imageRightOne') copy.hero.imageRightOne = url;
        else if (fieldPath === 'hero.imageRightTwo') copy.hero.imageRightTwo = url;
        else if (fieldPath === 'hero.imageBanner') copy.hero.imageBanner = url;
        else if (fieldPath === 'hero.imageDot') copy.hero.imageDot = url;
        else if (fieldPath === 'seo.ogImage') copy.ogImage = url;
        else if (fieldPath.startsWith('speciality.')) {
          const parts = fieldPath.split('.');
          const cardIdx = parseInt(parts[1], 10);
          if (parts[2] === 'icon') {
            copy.speciality.cards[cardIdx].icon = url;
          } else if (parts[2] === 'images') {
            const imgIdx = parseInt(parts[3], 10);
            if (!copy.speciality.cards[cardIdx].images) copy.speciality.cards[cardIdx].images = [];
            copy.speciality.cards[cardIdx].images[imgIdx] = url;
          }
        } else if (fieldPath.startsWith('types.')) {
          const parts = fieldPath.split('.');
          const cardIdx = parseInt(parts[1], 10);
          if (parts[2] === 'image') {
            copy.types.cards[cardIdx].image = url;
          } else if (parts[2] === 'smallImage') {
            copy.types.cards[cardIdx].smallImage = url;
          }
        } else if (fieldPath.startsWith('techStack.')) {
          const parts = fieldPath.split('.');
          const techIdx = parseInt(parts[1], 10);
          if (copy.techStack.items && copy.techStack.items[techIdx]) {
            copy.techStack.items[techIdx].icon = url;
          }
        }
        return copy;
      });
    }
    setSubMediaPickerOpen(false);
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
    { id: 'types', label: '3. Website Types We Build' },
    { id: 'techStack', label: '4. Tech Stack & Tools' },
    { id: 'faqs', label: '5. Dynamic Service FAQs' },
    { id: 'seo', label: '6. SEO & Social Meta' },
  ];

  const tabs = isMain ? mainTabs : subTabs;
  const currentActiveTab = isMain ? activeTab : subActiveTab;
  const isLoading = isMain ? isMainLoading : isSubLoading;
  const isSaving = isMain ? isMainSaving : isSubSaving;

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
            <span>↗ Live Preview</span>
          </Link>

          <button
            type="button"
            onClick={isMain ? saveMainServiceContent : handleSaveSubService}
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
            <span>{isSaving ? 'Saving Changes...' : '💾 Save Changes'}</span>
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
          <span>✓</span>
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
          <span>✕</span>
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
              <ServiceHeroTab hero={hero} setHero={setHero} onOpenAssetPicker={handleOpenAssetPicker} />
            )}
            {activeTab === 'cards' && (
              <ServiceCardsTab servicesList={servicesList} setServicesList={setServicesList} onOpenAssetPicker={handleOpenAssetPicker} />
            )}
            {activeTab === 'highlights' && (
              <ServiceHighlightsTab highlights={highlights} setHighlights={setHighlights} onOpenAssetPicker={handleOpenAssetPicker} />
            )}
            {activeTab === 'tools' && (
              <ServiceToolsTab tools={tools} setTools={setTools} onOpenAssetPicker={handleOpenAssetPicker} />
            )}
            {activeTab === 'faqs' && (
              <ServiceFaqsTab faqs={faqs} setFaqs={setFaqs} />
            )}
            {activeTab === 'testimonials' && (
              <ServiceTestimonialsTab
                testimonials={testimonials}
                setTestimonials={setTestimonials}
                onOpenAssetPicker={handleOpenAssetPicker}
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
              <SubServiceHeroTab formData={subData} setFormData={setSubData as any} onOpenAssetPicker={handleOpenAssetPicker} />
            )}
            {subActiveTab === 'speciality' && (
              <SubServiceSpecialityTab formData={subData} setFormData={setSubData as any} onOpenAssetPicker={handleOpenAssetPicker} />
            )}
            {subActiveTab === 'types' && (
              <SubServiceTypesTab formData={subData} setFormData={setSubData as any} onOpenAssetPicker={handleOpenAssetPicker} />
            )}
            {subActiveTab === 'techStack' && (
              <SubServiceTechStackTab formData={subData} setFormData={setSubData as any} onOpenAssetPicker={handleOpenAssetPicker} />
            )}
            {subActiveTab === 'faqs' && (
              <SubServiceFaqsTab formData={subData} setFormData={setSubData as any} />
            )}
            {subActiveTab === 'seo' && (
              <SubServiceSeoTab formData={subData} setFormData={setSubData as any} onOpenAssetPicker={handleOpenAssetPicker} />
            )}
          </>
        )}
      </div>

      {/* Global Media Asset Picker Modal for Main Services */}
      <HomeMediaPickerModal
        isOpen={isMain ? isMediaPickerOpen : subMediaPickerOpen}
        onClose={() => (isMain ? setIsMediaPickerOpen(false) : setSubMediaPickerOpen(false))}
        onSelect={isMain ? selectMediaAsset : handleSubSelectAsset}
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
