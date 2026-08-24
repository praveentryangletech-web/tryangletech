'use client';

import React from 'react';
import { AboutMissionVisionSection } from '@/backend/services/about/about.types';
import HomeImageUploadField from '@/app/superadmin/home/components/HomeImageUploadField';

interface AboutMissionVisionTabProps {
  missionVision: AboutMissionVisionSection;
  setMissionVision: React.Dispatch<React.SetStateAction<AboutMissionVisionSection>>;
  onOpenAssetPicker: (target: string) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 1rem',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  fontSize: '0.875rem',
  fontWeight: 500,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '5px',
};

export default function AboutMissionVisionTab({ missionVision, setMissionVision, onOpenAssetPicker }: AboutMissionVisionTabProps) {
  const missionBullets = missionVision.missionBullets || [];
  const visionBullets = missionVision.visionBullets || [];

  // Mission Bullets Handlers
  const handleUpdateMissionBullet = (idx: number, val: string) => {
    const updated = [...missionBullets];
    updated[idx] = val;
    setMissionVision({ ...missionVision, missionBullets: updated });
  };
  const handleAddMissionBullet = () => {
    setMissionVision({ ...missionVision, missionBullets: [...missionBullets, 'New mission milestone'] });
  };
  const handleRemoveMissionBullet = (idx: number) => {
    setMissionVision({ ...missionVision, missionBullets: missionBullets.filter((_, i) => i !== idx) });
  };

  // Vision Bullets Handlers
  const handleUpdateVisionBullet = (idx: number, val: string) => {
    const updated = [...visionBullets];
    updated[idx] = val;
    setMissionVision({ ...missionVision, visionBullets: updated });
  };
  const handleAddVisionBullet = () => {
    setMissionVision({ ...missionVision, visionBullets: [...visionBullets, 'New vision goal'] });
  };
  const handleRemoveVisionBullet = (idx: number) => {
    setMissionVision({ ...missionVision, visionBullets: visionBullets.filter((_, i) => i !== idx) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', backgroundColor: 'transparent' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 3: Core Purpose (Mission & Vision)
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          2-Column Cards
        </span>
      </div>

      {/* Main Section Header */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Section Over-title / Badge</label>
            <input
              type="text"
              value={missionVision.subBadgeText || ''}
              onChange={(e) => setMissionVision({ ...missionVision, subBadgeText: e.target.value })}
              style={inputStyle}
              placeholder="e.g. our core purpose"
            />
          </div>
          <div>
            <label style={labelStyle}>Section Heading Prefix</label>
            <input
              type="text"
              value={missionVision.heading || ''}
              onChange={(e) => setMissionVision({ ...missionVision, heading: e.target.value })}
              style={inputStyle}
              placeholder="e.g. Driven by a clear"
            />
          </div>
          <div>
            <label style={labelStyle}>Highlighted Heading Text</label>
            <input
              type="text"
              value={missionVision.headingHighlight || ''}
              onChange={(e) => setMissionVision({ ...missionVision, headingHighlight: e.target.value })}
              style={inputStyle}
              placeholder="e.g. mission and vision"
            />
          </div>
        </div>
      </div>

      {/* 2-Column Split: Mission vs Vision */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* CARD 1: OUR MISSION */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', backgroundColor: '#EEF2FF', color: '#4338CA', borderRadius: '6px' }}>
              LEFT CARD
            </span>
            <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>Our Mission</strong>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Badge Tag</label>
              <input
                type="text"
                value={missionVision.missionBadge || ''}
                onChange={(e) => setMissionVision({ ...missionVision, missionBadge: e.target.value })}
                style={inputStyle}
                placeholder="OUR MISSION"
              />
            </div>
            <div>
              <label style={labelStyle}>Mission Headline *</label>
              <input
                type="text"
                value={missionVision.missionHeading || ''}
                onChange={(e) => setMissionVision({ ...missionVision, missionHeading: e.target.value })}
                style={inputStyle}
                placeholder="Empowering your digital transformation"
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Mission Narrative (Paragraph 1)</label>
            <textarea
              rows={2}
              value={missionVision.missionParagraph1 || ''}
              onChange={(e) => setMissionVision({ ...missionVision, missionParagraph1: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Our mission is to bridge the gap..."
            />
          </div>

          <div>
            <label style={labelStyle}>Mission Narrative (Paragraph 2)</label>
            <textarea
              rows={2}
              value={missionVision.missionParagraph2 || ''}
              onChange={(e) => setMissionVision({ ...missionVision, missionParagraph2: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="We focus on delivering high-quality..."
            />
          </div>

          {/* Mission Bullet Points */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>🎯 Mission Key Pillars (Bullets)</label>
              <button
                type="button"
                onClick={handleAddMissionBullet}
                style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4338CA', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                + Add Bullet
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {missionBullets.map((bullet, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleUpdateMissionBullet(idx, e.target.value)}
                    style={{ ...inputStyle, padding: '0.45rem 0.75rem' }}
                  />
                  {missionBullets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMissionBullet(idx)}
                      style={{ border: 'none', background: 'transparent', color: '#EF4444', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <HomeImageUploadField
            label="Mission Feature Visual / Diagram"
            value={missionVision.missionImage || ''}
            onChange={(val) => setMissionVision({ ...missionVision, missionImage: val })}
            altValue={missionVision.missionImageAlt}
            onAltChange={(alt) => setMissionVision({ ...missionVision, missionImageAlt: alt })}
            onOpenAssetPicker={() => onOpenAssetPicker('aboutMission')}
            recommendedDimensions="680 × 480 px (WebP)"
            previewHeight={110}
            previewWidth={160}
          />
        </div>

        {/* CARD 2: OUR VISION */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', backgroundColor: '#EEF2FF', color: '#4338CA', borderRadius: '6px' }}>
              RIGHT CARD
            </span>
            <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>Our Vision</strong>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Badge Tag</label>
              <input
                type="text"
                value={missionVision.visionBadge || ''}
                onChange={(e) => setMissionVision({ ...missionVision, visionBadge: e.target.value })}
                style={inputStyle}
                placeholder="OUR VISION"
              />
            </div>
            <div>
              <label style={labelStyle}>Vision Headline *</label>
              <input
                type="text"
                value={missionVision.visionHeading || ''}
                onChange={(e) => setMissionVision({ ...missionVision, visionHeading: e.target.value })}
                style={inputStyle}
                placeholder="Shaping the future of technology"
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Vision Narrative (Paragraph 1)</label>
            <textarea
              rows={2}
              value={missionVision.visionParagraph1 || ''}
              onChange={(e) => setMissionVision({ ...missionVision, visionParagraph1: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="We envision a future where businesses of all sizes..."
            />
          </div>

          <div>
            <label style={labelStyle}>Vision Narrative (Paragraph 2)</label>
            <textarea
              rows={2}
              value={missionVision.visionParagraph2 || ''}
              onChange={(e) => setMissionVision({ ...missionVision, visionParagraph2: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Tryangletech aims to be the leading IT partner..."
            />
          </div>

          {/* Vision Bullet Points */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>🚀 Vision Milestones (Bullets)</label>
              <button
                type="button"
                onClick={handleAddVisionBullet}
                style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4338CA', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                + Add Bullet
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {visionBullets.map((bullet, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => handleUpdateVisionBullet(idx, e.target.value)}
                    style={{ ...inputStyle, padding: '0.45rem 0.75rem' }}
                  />
                  {visionBullets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveVisionBullet(idx)}
                      style={{ border: 'none', background: 'transparent', color: '#EF4444', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <HomeImageUploadField
            label="Vision Feature Visual / Diagram"
            value={missionVision.visionImage || ''}
            onChange={(val) => setMissionVision({ ...missionVision, visionImage: val })}
            altValue={missionVision.visionImageAlt}
            onAltChange={(alt) => setMissionVision({ ...missionVision, visionImageAlt: alt })}
            onOpenAssetPicker={() => onOpenAssetPicker('aboutVision')}
            recommendedDimensions="680 × 480 px (WebP)"
            previewHeight={110}
            previewWidth={160}
          />
        </div>
      </div>
    </div>
  );
}
