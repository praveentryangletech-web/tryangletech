'use client';

import React from 'react';
import { DigitalMarketingContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface DigitalMarketingOfferingsTabProps {
  formData: DigitalMarketingContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<DigitalMarketingContentDTO | null>>;
  onOpenAssetPicker?: (target: string) => void;
}

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
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '6px',
};

export default function DigitalMarketingOfferingsTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: DigitalMarketingOfferingsTabProps) {
  const offerings = formData.offerings || ({} as any);
  const cards = offerings.cards || [];

  const handleHeaderChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        offerings: { ...prev.offerings, [field]: val },
      };
    });
  };

  const handleCardChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.offerings?.cards || [])];
      if (copy[index]) {
        copy[index] = { ...copy[index], [field]: val };
      }
      return {
        ...prev,
        offerings: { ...prev.offerings, cards: copy },
      };
    });
  };

  const handleCardImageChange = (cardIdx: number, imgIdx: number, url: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.offerings?.cards || [])];
      if (copy[cardIdx]) {
        const imgs = [...(copy[cardIdx].images || [])];
        imgs[imgIdx] = url;
        copy[cardIdx] = { ...copy[cardIdx], images: imgs };
      }
      return {
        ...prev,
        offerings: { ...prev.offerings, cards: copy },
      };
    });
  };

  const addCardImage = (cardIdx: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.offerings?.cards || [])];
      if (copy[cardIdx]) {
        const imgs = [...(copy[cardIdx].images || [])];
        imgs.push('/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp');
        copy[cardIdx] = { ...copy[cardIdx], images: imgs };
      }
      return {
        ...prev,
        offerings: { ...prev.offerings, cards: copy },
      };
    });
  };

  const removeCardImage = (cardIdx: number, imgIdx: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.offerings?.cards || [])];
      if (copy[cardIdx]) {
        const imgs = [...(copy[cardIdx].images || [])];
        imgs.splice(imgIdx, 1);
        copy[cardIdx] = { ...copy[cardIdx], images: imgs };
      }
      return {
        ...prev,
        offerings: { ...prev.offerings, cards: copy },
      };
    });
  };

  const addCard = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.offerings?.cards || [])];
      copy.push({
        id: `offering-${Date.now()}`,
        title: `New Marketing Service`,
        desc: `High-impact marketing campaigns crafted to scale conversions and expand audience reach.`,
        images: ['/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp'],
      });
      return {
        ...prev,
        offerings: { ...prev.offerings, cards: copy },
      };
    });
  };

  const removeCard = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.offerings?.cards || [])];
      copy.splice(index, 1);
      return {
        ...prev,
        offerings: { ...prev.offerings, cards: copy },
      };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 16px 0',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '12px',
          }}
        >
          Services &amp; Offerings Header
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Pill Badge Text</label>
            <input
              style={inputStyle}
              value={offerings.subBadgeText || ''}
              onChange={(e) => handleHeaderChange('subBadgeText', e.target.value)}
              placeholder="e.g. our services"
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              style={inputStyle}
              value={offerings.headline || ''}
              onChange={(e) => handleHeaderChange('headline', e.target.value)}
              placeholder="e.g. Powerful services that fuel real business growth"
            />
          </div>
        </div>
      </div>

      {/* 2. Service Cards */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Service Offering Cards ({cards.length})
          </h3>
          <button
            type="button"
            onClick={addCard}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #6366F1',
              backgroundColor: '#EEF2FF',
              color: '#4F46E5',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <PlusIcon style={{ width: '14px', height: '14px' }} />
            Add Service Card
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cards.map((card, idx) => (
            <div
              key={card.id || idx}
              style={{
                backgroundColor: '#F8FAFC',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4F46E5' }}>
                  Card #{idx + 1}: {card.title || 'Untitled Card'}
                </span>
                <button
                  type="button"
                  onClick={() => removeCard(idx)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid #FCA5A5',
                    backgroundColor: '#FEF2F2',
                    color: '#EF4444',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <TrashIcon style={{ width: '14px', height: '14px' }} />
                  Remove Card
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Card Title</label>
                  <input
                    style={inputStyle}
                    value={card.title || ''}
                    onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                    placeholder="e.g. Search Engine Optimization"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Card Description</label>
                  <textarea
                    style={{ ...textareaStyle, minHeight: '90px' }}
                    value={card.desc || ''}
                    onChange={(e) => handleCardChange(idx, 'desc', e.target.value)}
                    placeholder="Describe this service offering in detail..."
                  />
                </div>
              </div>

              {/* Layered Showcase Images */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Visual Showcase Layer Images ({card.images?.length || 0})</label>
                  <button
                    type="button"
                    onClick={() => addCardImage(idx)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: '#475569',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    + Add Image Layer
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  {(card.images || []).map((imgUrl, imgIdx) => (
                    <div key={imgIdx} style={{ position: 'relative' }}>
                      <ImageFieldWithUpload
                        label={`Layer Image #${imgIdx + 1}`}
                        value={imgUrl || ''}
                        onChange={(url) => handleCardImageChange(idx, imgIdx, url)}
                        onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`digitalMarketing.offerings.cards.${idx}.images.${imgIdx}`) : undefined}
                      />
                      {(card.images || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCardImage(idx, imgIdx)}
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            padding: '4px',
                            borderRadius: '4px',
                            border: '1px solid #FCA5A5',
                            backgroundColor: '#FEF2F2',
                            color: '#EF4444',
                            cursor: 'pointer',
                          }}
                          title="Remove Image Layer"
                        >
                          <TrashIcon style={{ width: '12px', height: '12px' }} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
