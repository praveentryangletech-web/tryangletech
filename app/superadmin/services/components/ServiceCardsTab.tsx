'use client';

import React from 'react';
import Image from 'next/image';
import HomeImageUploadField from '@/app/superadmin/home/components/HomeImageUploadField';
import { ServiceCardItem } from '@/backend/services/services/services.types';
import { ImageIcon } from './StandardSvgIcons';

interface ServiceCardsTabProps {
  servicesList: ServiceCardItem[];
  setServicesList: React.Dispatch<React.SetStateAction<ServiceCardItem[]>>;
  onOpenAssetPicker: (target: string) => void;
}

export default function ServiceCardsTab({ servicesList, setServicesList, onOpenAssetPicker }: ServiceCardsTabProps) {
  const handleCardChange = (idx: number, field: keyof ServiceCardItem, value: any) => {
    setServicesList((prev) => {
      const copy = [...prev];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: value };
      }
      return copy;
    });
  };

  const handleCardImageChange = (cardIdx: number, imgIdx: number, val: string) => {
    setServicesList((prev) => {
      const copy = [...prev];
      if (copy[cardIdx]) {
        const images = [...(copy[cardIdx].images || [])];
        images[imgIdx] = val;
        copy[cardIdx] = { ...copy[cardIdx], images };
      }
      return copy;
    });
  };

  const handleCardImageAltChange = (cardIdx: number, imgIdx: number, alt: string) => {
    setServicesList((prev) => {
      const copy = [...prev];
      if (copy[cardIdx]) {
        const imagesAlt = [...(copy[cardIdx].imagesAlt || [])];
        imagesAlt[imgIdx] = alt;
        copy[cardIdx] = { ...copy[cardIdx], imagesAlt };
      }
      return copy;
    });
  };

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            2. Core Service Feature Cards
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.785rem', color: '#64748B' }}>
            Manage the primary interactive cards showcasing TryangleTech offerings on the Main Services Overview page.
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px', border: '1px solid #A7F3D0' }}>
          {servicesList.length} Active Cards
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {servicesList.map((card, idx) => (
          <div
            key={card.id || idx}
            style={{
              backgroundColor: 'transparent',
              borderBottom: idx < servicesList.length - 1 ? '1px solid #E2E8F0' : 'none',
              paddingBottom: idx < servicesList.length - 1 ? '20px' : '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Card Header & Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-blue, #1833fe)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {idx + 1}
                </span>
                <strong style={{ fontSize: '0.925rem', color: '#0F172A' }}>
                  {card.title || `Service Card ${idx + 1}`}
                </strong>
              </div>
              <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 600 }}>
                Route: {card.link}
              </span>
            </div>

            {/* Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Card Title *
                </label>
                <input
                  type="text"
                  value={card.title || ''}
                  onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                  style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem', fontWeight: 600, color: '#1E293B' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Detail Page Link
                </label>
                <input
                  type="text"
                  value={card.link || ''}
                  onChange={(e) => handleCardChange(idx, 'link', e.target.value)}
                  placeholder="/service/..."
                  style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem', color: '#1E293B' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Card Description *
              </label>
              <textarea
                rows={2}
                value={card.description || ''}
                onChange={(e) => handleCardChange(idx, 'description', e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem', color: '#1E293B', fontFamily: 'inherit' }}
              />
            </div>

            {/* Mockup Images Selector */}
            <div style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                <ImageIcon size={14} color="#1833FE" />
                <span>Mockup & Preview Images (Up to 3 Layered Assets)</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {[0, 1, 2].map((imgIdx) => {
                  const imgUrl = card.images?.[imgIdx] || '';
                  const imgAlt = card.imagesAlt?.[imgIdx] || '';
                  return (
                    <HomeImageUploadField
                      key={imgIdx}
                      label={`Mockup Layer ${imgIdx + 1}`}
                      value={imgUrl}
                      onChange={(val) => handleCardImageChange(idx, imgIdx, val)}
                      onOpenAssetPicker={() => onOpenAssetPicker(`servicesList.${idx}.image.${imgIdx}`)}
                      altValue={imgAlt}
                      onAltChange={(alt) => handleCardImageAltChange(idx, imgIdx, alt)}
                      recommendedDimensions="300 × 200 px (WebP)"
                      previewHeight={60}
                      previewWidth={90}
                      shape="rect"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
