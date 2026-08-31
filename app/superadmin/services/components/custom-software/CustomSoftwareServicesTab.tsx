'use client';

import React from 'react';
import { CustomSoftwareContentDTO, CustomSoftwareServiceCard } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { PlusIcon, TrashIcon, ImageIcon } from '../common/StandardSvgIcons';

interface CustomSoftwareServicesTabProps {
  formData: CustomSoftwareContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<CustomSoftwareContentDTO | null>>;
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

export default function CustomSoftwareServicesTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: CustomSoftwareServicesTabProps) {
  const services = formData.services || ({} as any);
  const cards = services.cards || [];
  const images = services.images || [];

  const handleServicesChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, services: { ...prev.services, [field]: val } };
    });
  };

  const handleAddCard = () => {
    const newCard: CustomSoftwareServiceCard = {
      id: `service-${Date.now()}`,
      title: 'New Custom Offering',
      desc: 'Describe the purpose and enterprise benefits of this software solution.',
      icon: '/service-2-assets/69099fe756beabe4238c7528_clipboard (1) 1.svg',
    };
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        services: {
          ...prev.services,
          cards: [...(prev.services?.cards || []), newCard],
        },
      };
    });
  };

  const handleUpdateCard = (idx: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.services?.cards || [])];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return { ...prev, services: { ...prev.services, cards: copy } };
    });
  };

  const handleRemoveCard = (idx: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.services?.cards || [])];
      copy.splice(idx, 1);
      return { ...prev, services: { ...prev.services, cards: copy } };
    });
  };

  const handleUpdateImage = (idx: number, url: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.services?.images || [])];
      copy[idx] = url;
      return { ...prev, services: { ...prev.services, images: copy } };
    });
  };

  return (
    <div style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Section */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          Services Section Header
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Sub-Badge Text</label>
            <input
              type="text"
              style={inputStyle}
              value={services.subBadgeText || ''}
              onChange={(e) => handleServicesChange('subBadgeText', e.target.value)}
              placeholder="our services"
            />
          </div>

          <div>
            <label style={labelStyle}>Section Heading</label>
            <input
              type="text"
              style={inputStyle}
              value={services.headline || ''}
              onChange={(e) => handleServicesChange('headline', e.target.value)}
              placeholder="Custom software solutions built to fit your business"
            />
          </div>

          <div>
            <label style={labelStyle}>Description Paragraph</label>
            <textarea
              rows={2}
              style={textareaStyle}
              value={services.description || ''}
              onChange={(e) => handleServicesChange('description', e.target.value)}
              placeholder="From enterprise ERP and CRM systems to automated HRMS..."
            />
          </div>
        </div>
      </div>

      {/* 2. Service Cards */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Service Offerings Cards ({cards.length})</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748B' }}>Interactive accordion service cards displayed on the left column</p>
          </div>
          <button
            type="button"
            onClick={handleAddCard}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <PlusIcon /> Add Card
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cards.map((card, idx) => (
            <div key={card.id || idx} style={{ padding: '18px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>Card #{idx + 1} — {card.title || 'Untitled Card'}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCard(idx)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                >
                  <TrashIcon />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                <ImageFieldWithUpload
                  label="Icon SVG"
                  value={card.icon}
                  onChange={(url) => handleUpdateCard(idx, 'icon', url)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`customSoftware.services.cards.${idx}.icon`) : undefined}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Card Title</label>
                    <input
                      type="text"
                      style={inputStyle}
                      value={card.title}
                      onChange={(e) => handleUpdateCard(idx, 'title', e.target.value)}
                      placeholder="e.g. Enterprise ERP Systems"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Card Description</label>
                    <textarea
                      rows={2}
                      style={textareaStyle}
                      value={card.desc}
                      onChange={(e) => handleUpdateCard(idx, 'desc', e.target.value)}
                      placeholder="Explain features and capabilities..."
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Section Illustration Visuals (Right Stack) */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon /> Right Column Layered Visuals
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {[0, 1, 2, 3].map((imgIdx) => (
            <div key={imgIdx} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
              <label style={labelStyle}>Visual Layer #{imgIdx + 1}</label>
              <ImageFieldWithUpload
                label=""
                value={images[imgIdx] || ''}
                onChange={(url) => handleUpdateImage(imgIdx, url)}
                onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`customSoftware.services.images.${imgIdx}`) : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
