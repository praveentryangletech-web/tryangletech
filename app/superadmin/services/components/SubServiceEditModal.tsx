'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useServices } from '../../context/ServicesContext';
import Tooltip from '@/app/superadmin/components/Tooltip';
import { WebDevContentDTO, WebDevHeroBullet, WebDevFaqItem, WebDevTechStackItem } from '@/backend/services/services/services.types';
import CustomDropdown, { DropdownOption } from '@/app/superadmin/components/CustomDropdown';
import {
  ZapIcon,
  SearchIcon,
  ResponsiveIcon,
  ShieldIcon,
  AnalyticsIcon,
  SupportIcon,
  StarIcon,
} from './StandardSvgIcons';

const ICON_OPTIONS: DropdownOption<string>[] = [
  {
    value: 'performance',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <ZapIcon size={14} color="#1833FE" />
        <span>Performance</span>
      </span>
    ),
  },
  {
    value: 'seo',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <SearchIcon size={14} color="#1833FE" />
        <span>Search / SEO</span>
      </span>
    ),
  },
  {
    value: 'responsive',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <ResponsiveIcon size={14} color="#1833FE" />
        <span>Responsive</span>
      </span>
    ),
  },
  {
    value: 'security',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <ShieldIcon size={14} color="#1833FE" />
        <span>Security</span>
      </span>
    ),
  },
  {
    value: 'analytics',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <AnalyticsIcon size={14} color="#1833FE" />
        <span>Analytics</span>
      </span>
    ),
  },
  {
    value: 'support',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <SupportIcon size={14} color="#1833FE" />
        <span>Support</span>
      </span>
    ),
  },
  {
    value: 'custom',
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <StarIcon size={14} color="#1833FE" />
        <span>Star / Quality</span>
      </span>
    ),
  },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '42px',
  padding: '0 14px',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  fontSize: '0.875rem',
  color: '#0F172A',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  fontSize: '0.875rem',
  color: '#0F172A',
  lineHeight: '1.5',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '6px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: '12px',
  padding: '1.25rem 1.5rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: 800,
  color: 'var(--dark-indigo, #1a0b54)',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export default function SubServiceEditModal() {
  const {
    isSubServiceModalOpen,
    setIsSubServiceModalOpen,
    selectedSubService,
    subServiceData,
    isSubServiceLoading,
    isSubServiceSaving,
    saveSubServiceData,
    openAssetPicker,
  } = useServices();

  const [activeTab, setActiveTab] = useState<'hero' | 'speciality' | 'types' | 'techStack' | 'faqs' | 'seo'>('hero');
  const [formData, setFormData] = useState<WebDevContentDTO | null>(null);

  useEffect(() => {
    if (subServiceData) {
      setFormData(JSON.parse(JSON.stringify(subServiceData)));
    }
  }, [subServiceData, isSubServiceModalOpen]);

  if (!isSubServiceModalOpen || !formData) return null;

  const handleHeroChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, hero: { ...prev.hero, [field]: val } };
    });
  };

  const handleHeroBulletChange = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const bullets = [...prev.hero.bullets];
      bullets[index] = { ...bullets[index], [field]: val };
      return { ...prev, hero: { ...prev.hero, bullets } };
    });
  };

  const handleSpecialityChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, speciality: { ...prev.speciality, [field]: val } };
    });
  };

  const handleSpecialityCardChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const cards = [...prev.speciality.cards];
      cards[index] = { ...cards[index], [field]: val };
      return { ...prev, speciality: { ...prev.speciality, cards } };
    });
  };

  const handleTypesChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, types: { ...prev.types, [field]: val } };
    });
  };

  const handleTypeCardChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const cards = [...prev.types.cards];
      cards[index] = { ...cards[index], [field]: val };
      return { ...prev, types: { ...prev.types, cards } };
    });
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const faqs = [...prev.faqs];
      faqs[index] = { ...faqs[index], [field]: val };
      return { ...prev, faqs };
    });
  };

  const handleAddFaq = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        faqs: [
          ...prev.faqs,
          {
            id: `faq-${Date.now()}`,
            question: 'New Question?',
            answer: 'Answer to the question goes here.',
          },
        ],
      };
    });
  };

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const faqs = prev.faqs.filter((_, i) => i !== index);
      return { ...prev, faqs };
    });
  };

  const handleTechItemChange = (index: number, field: keyof WebDevTechStackItem, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const items = [...prev.techStack.items];
      items[index] = { ...items[index], [field]: val };
      return { ...prev, techStack: { ...prev.techStack, items } };
    });
  };

  const handleAddTechItem = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        techStack: {
          ...prev.techStack,
          items: [
            ...prev.techStack.items,
            {
              id: `tech-${Date.now()}`,
              name: 'Technology Name',
              category: 'Category',
              icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
            },
          ],
        },
      };
    });
  };

  const handleRemoveTechItem = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const items = prev.techStack.items.filter((_, i) => i !== index);
      return { ...prev, techStack: { ...prev.techStack, items } };
    });
  };

  const handleSave = async () => {
    if (!formData) return;
    const slug = selectedSubService?.slug || 'web-development';
    const success = await saveSubServiceData(slug, formData);
    if (success) {
      setIsSubServiceModalOpen(false);
    }
  };

  const tabs = [
    { id: 'hero', label: '1. Hero & Header' },
    { id: 'speciality', label: '2. Capabilities' },
    { id: 'types', label: '3. Website Types' },
    { id: 'techStack', label: '4. Tech Stack' },
    { id: 'faqs', label: '5. Dynamic FAQs' },
    { id: 'seo', label: '6. SEO & Status' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        boxSizing: 'border-box',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsSubServiceModalOpen(false);
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '1080px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
          boxSizing: 'border-box',
          border: '1px solid #E2E8F0',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                color: 'var(--brand-blue, #1833fe)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid #DBEAFE',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
                  Edit Service: {selectedSubService?.name || 'Website & Web Application Development'}
                </h2>
                <span
                  style={{
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    backgroundColor: formData.isPublished ? '#DCFCE7' : '#FEF3C7',
                    color: formData.isPublished ? '#15803D' : '#B45309',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    border: `1px solid ${formData.isPublished ? '#BBF7D0' : '#FDE68A'}`,
                  }}
                >
                  ● {formData.isPublished ? 'Live' : 'Draft'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                <span style={{ fontSize: '0.785rem', color: '#64748B' }}>Route:</span>
                <code style={{ fontSize: '0.775rem', color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '2px 7px', borderRadius: '4px', border: '1px solid #DBEAFE' }}>
                  /service/{selectedSubService?.slug || 'web-development'}
                </code>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSubServiceModalOpen(false)}
            aria-label="Close"
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              color: '#64748B',
              cursor: 'pointer',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E2E8F0';
              e.currentTarget.style.color = '#0F172A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
              e.currentTarget.style.color = '#64748B';
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation (Matching Home & Services CMS) */}
        <div
          style={{
            padding: '0.65rem 1.75rem',
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '2px',
            }}
          >
            {tabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as any)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '8px',
                    border: isActive ? 'none' : '1px solid #E2E8F0',
                    backgroundColor: isActive ? 'var(--brand-blue, #1833fe)' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#64748B',
                    fontSize: '0.825rem',
                    fontWeight: isActive ? 800 : 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                    boxShadow: isActive ? '0 2px 6px rgba(24, 51, 254, 0.25)' : 'none',
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div
          className="admin-scroll-area"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem 1.75rem',
            backgroundColor: '#F8FAFC',
          }}
        >
          {isSubServiceLoading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#64748B' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>Loading live service content...</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* TAB 1: HERO & HEADER */}
              {activeTab === 'hero' && (
                <>
                  <div style={cardStyle}>
                    <div style={sectionTitleStyle}>
                      <span>1. Main Headline & Subtitle</span>
                      <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 500 }}>Above the fold</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Overtitle / Sub-Badge Text</label>
                        <input
                          type="text"
                          value={formData.hero.subBadgeText}
                          onChange={(e) => handleHeroChange('subBadgeText', e.target.value)}
                          placeholder="e.g. Web Development"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Floating Pill Badge Text</label>
                        <input
                          type="text"
                          value={formData.hero.smallBadgeText}
                          onChange={(e) => handleHeroChange('smallBadgeText', e.target.value)}
                          placeholder="e.g. Built for you"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Hero Main Headline (H1) *</label>
                      <input
                        type="text"
                        value={formData.hero.headline}
                        onChange={(e) => handleHeroChange('headline', e.target.value)}
                        placeholder="Websites that bring in customers, not just look nice"
                        style={{ ...inputStyle, fontWeight: 600 }}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Hero Sub-headline / Descriptive Paragraph *</label>
                      <textarea
                        rows={3}
                        value={formData.hero.subheadline}
                        onChange={(e) => handleHeroChange('subheadline', e.target.value)}
                        placeholder="Detailed value proposition..."
                        style={textareaStyle}
                      />
                    </div>
                  </div>

                  {/* Benefit Bullets */}
                  <div style={cardStyle}>
                    <div style={sectionTitleStyle}>
                      <span>2. Value Proposition Bullets (3 Items)</span>
                      <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 500 }}>Key takeaways</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {formData.hero.bullets.map((bullet, idx) => (
                        <div
                          key={bullet.id || idx}
                          style={{
                            padding: '14px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                          }}
                        >
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px' }}>
                              #{idx + 1}
                            </span>
                            <input
                              type="text"
                              placeholder="Title (e.g. Fast and reliable)"
                              value={bullet.title}
                              onChange={(e) => handleHeroBulletChange(idx, 'title', e.target.value)}
                              style={{ ...inputStyle, height: '38px', flex: 1, fontWeight: 700 }}
                            />
                            <CustomDropdown
                              value={bullet.iconType || 'performance'}
                              options={ICON_OPTIONS}
                              onChange={(val) => handleHeroBulletChange(idx, 'iconType', val)}
                              direction="down"
                              size="sm"
                              buttonStyle={{
                                height: '38px',
                                borderRadius: '8px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #CBD5E1',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                minWidth: '150px',
                              }}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Description text"
                            value={bullet.desc}
                            onChange={(e) => handleHeroBulletChange(idx, 'desc', e.target.value)}
                            style={{ ...inputStyle, height: '36px', fontSize: '0.825rem' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <div style={cardStyle}>
                    <div style={sectionTitleStyle}>
                      <span>3. Call to Action Button</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Button Text</label>
                        <input
                          type="text"
                          value={formData.hero.primaryBtnText}
                          onChange={(e) => handleHeroChange('primaryBtnText', e.target.value)}
                          placeholder="Get started today"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Button Target Link</label>
                        <input
                          type="text"
                          value={formData.hero.primaryBtnLink}
                          onChange={(e) => handleHeroChange('primaryBtnLink', e.target.value)}
                          placeholder="/contact"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: CAPABILITIES */}
              {activeTab === 'speciality' && (
                <>
                  <div style={cardStyle}>
                    <div style={sectionTitleStyle}>
                      <span>Section Header</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Sub-Badge</label>
                        <input
                          type="text"
                          value={formData.speciality.subBadgeText}
                          onChange={(e) => handleSpecialityChange('subBadgeText', e.target.value)}
                          placeholder="Speciality / features"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Main Section Heading</label>
                        <input
                          type="text"
                          value={formData.speciality.heading}
                          onChange={(e) => handleSpecialityChange('heading', e.target.value)}
                          placeholder="Websites that work well on every device..."
                          style={{ ...inputStyle, fontWeight: 600 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={cardStyle}>
                    <div style={sectionTitleStyle}>
                      <span>Capability Cards (3 Cards)</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {formData.speciality.cards.map((card, idx) => (
                        <div
                          key={card.id || idx}
                          style={{
                            padding: '14px 16px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px' }}>
                              Card #{idx + 1}
                            </span>
                            <input
                              type="text"
                              placeholder="Card Title (e.g. Responsive Design)"
                              value={card.title}
                              onChange={(e) => handleSpecialityCardChange(idx, 'title', e.target.value)}
                              style={{ ...inputStyle, height: '38px', flex: 1, fontWeight: 700 }}
                            />
                          </div>
                          <textarea
                            rows={2}
                            placeholder="Card Description"
                            value={card.desc}
                            onChange={(e) => handleSpecialityCardChange(idx, 'desc', e.target.value)}
                            style={textareaStyle}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 3: WEBSITE TYPES */}
              {activeTab === 'types' && (
                <>
                  <div style={cardStyle}>
                    <div style={sectionTitleStyle}>
                      <span>Section Header</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Sub-Badge</label>
                        <input
                          type="text"
                          value={formData.types.subBadgeText}
                          onChange={(e) => handleTypesChange('subBadgeText', e.target.value)}
                          placeholder="website types"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Main Section Heading</label>
                        <input
                          type="text"
                          value={formData.types.heading}
                          onChange={(e) => handleTypesChange('heading', e.target.value)}
                          placeholder="Unveiling the Variety in Website Types We Build"
                          style={{ ...inputStyle, fontWeight: 600 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={cardStyle}>
                    <div style={sectionTitleStyle}>
                      <span>Website Type Cards ({formData.types.cards.length})</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {formData.types.cards.map((typeCard, idx) => (
                        <div
                          key={typeCard.id || idx}
                          style={{
                            padding: '14px 16px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                          }}
                        >
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px' }}>
                              #{idx + 1}
                            </span>
                            <input
                              type="text"
                              placeholder="Title (e.g. Business & Corporate Websites)"
                              value={typeCard.title}
                              onChange={(e) => handleTypeCardChange(idx, 'title', e.target.value)}
                              style={{ ...inputStyle, height: '38px', flex: 1, fontWeight: 700 }}
                            />
                            <input
                              type="text"
                              placeholder="Badge (e.g. Corporate)"
                              value={typeCard.badge || ''}
                              onChange={(e) => handleTypeCardChange(idx, 'badge', e.target.value)}
                              style={{ ...inputStyle, height: '38px', width: '140px' }}
                            />
                          </div>
                          <textarea
                            rows={2}
                            placeholder="Description"
                            value={typeCard.desc}
                            onChange={(e) => handleTypeCardChange(idx, 'desc', e.target.value)}
                            style={textareaStyle}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 4: TECH STACK */}
              {activeTab === 'techStack' && (
                <>
                  <div style={cardStyle}>
                    <div style={sectionTitleStyle}>
                      <span>Section Header</span>
                    </div>
                    <div>
                      <label style={labelStyle}>Section Heading</label>
                      <input
                        type="text"
                        value={formData.techStack.heading}
                        onChange={(e) =>
                          setFormData((prev) =>
                            prev ? { ...prev, techStack: { ...prev.techStack, heading: e.target.value } } : prev
                          )
                        }
                        placeholder="We build with industry-leading modern technologies"
                        style={{ ...inputStyle, fontWeight: 600 }}
                      />
                    </div>
                  </div>

                  <div style={cardStyle}>
                    <div style={sectionTitleStyle}>
                      <span>Technologies & Frameworks ({formData.techStack.items.length})</span>
                      <button
                        type="button"
                        onClick={handleAddTechItem}
                        style={{
                          backgroundColor: '#EFF6FF',
                          color: 'var(--brand-blue, #1833fe)',
                          border: '1px solid #BFDBFE',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        + Add Technology
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
                      {formData.techStack.items.map((tech, idx) => (
                        <div
                          key={tech.id || idx}
                          style={{
                            padding: '12px 14px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                              #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTechItem(idx)}
                              style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.725rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Remove
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Name (e.g. React.js)"
                            value={tech.name}
                            onChange={(e) => handleTechItemChange(idx, 'name', e.target.value)}
                            style={{ ...inputStyle, height: '36px', fontWeight: 700 }}
                          />
                          <input
                            type="text"
                            placeholder="Category (e.g. Frontend)"
                            value={tech.category}
                            onChange={(e) => handleTechItemChange(idx, 'category', e.target.value)}
                            style={{ ...inputStyle, height: '34px', fontSize: '0.8rem' }}
                          />
                          <input
                            type="text"
                            placeholder="Icon SVG / Image URL"
                            value={tech.icon}
                            onChange={(e) => handleTechItemChange(idx, 'icon', e.target.value)}
                            style={{ ...inputStyle, height: '34px', fontSize: '0.75rem' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 5: DYNAMIC FAQS */}
              {activeTab === 'faqs' && (
                <div style={cardStyle}>
                  <div style={sectionTitleStyle}>
                    <span>Frequently Asked Questions ({formData.faqs.length})</span>
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      style={{
                        backgroundColor: '#EFF6FF',
                        color: 'var(--brand-blue, #1833fe)',
                        border: '1px solid #BFDBFE',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      + Add FAQ
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {formData.faqs.map((faq, idx) => (
                      <div
                        key={faq.id || idx}
                        style={{
                          padding: '14px 16px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                            Question #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFaq(idx)}
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Question"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                          style={{ ...inputStyle, fontWeight: 700 }}
                        />
                        <textarea
                          rows={2}
                          placeholder="Answer"
                          value={faq.answer}
                          onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                          style={textareaStyle}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SEO & STATUS */}
              {activeTab === 'seo' && (
                <div style={cardStyle}>
                  <div style={sectionTitleStyle}>
                    <span>Search Engine Optimization & Visibility</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <label style={labelStyle}>Meta Title (Browser Tab & Google Search)</label>
                      <span style={{ fontSize: '0.725rem', color: (formData.metaTitle?.length || 0) > 60 ? '#D97706' : '#64748B', fontWeight: 600 }}>
                        {formData.metaTitle?.length || 0} / 60 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData((prev) => (prev ? { ...prev, metaTitle: e.target.value } : prev))}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <label style={labelStyle}>Meta Description (SERP Snippet)</label>
                      <span style={{ fontSize: '0.725rem', color: (formData.metaDescription?.length || 0) > 160 ? '#D97706' : '#64748B', fontWeight: 600 }}>
                        {formData.metaDescription?.length || 0} / 160 chars
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={formData.metaDescription}
                      onChange={(e) => setFormData((prev) => (prev ? { ...prev, metaDescription: e.target.value } : prev))}
                      style={textareaStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Target Keywords (Comma Separated)</label>
                    <input
                      type="text"
                      value={formData.keywords.join(', ')}
                      onChange={(e) => {
                        const kw = e.target.value.split(',').map((k) => k.trim()).filter(Boolean);
                        setFormData((prev) => (prev ? { ...prev, keywords: kw } : prev));
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginTop: '8px', padding: '14px 16px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1E293B' }}>Publication Status</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                        {formData.isPublished ? 'Page is live and accessible to the public.' : 'Page is in Draft mode.'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => (prev ? { ...prev, isPublished: !prev.isPublished } : prev))}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: `1px solid ${formData.isPublished ? '#BBF7D0' : '#FDE68A'}`,
                        backgroundColor: formData.isPublished ? '#DCFCE7' : '#FEF3C7',
                        color: formData.isPublished ? '#15803D' : '#B45309',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      ● {formData.isPublished ? 'Live Published' : 'Draft'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <button
            type="button"
            onClick={() => setIsSubServiceModalOpen(false)}
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
          >
            Cancel
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              href={`/service/${selectedSubService?.slug || 'web-development'}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
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
              onClick={handleSave}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 22px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--brand-blue, #1833fe)',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: isSubServiceSaving ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
                transition: 'all 0.15s ease',
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
                  <span>Save Changes Live</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
