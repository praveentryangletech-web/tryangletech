'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../../../data/portfolioData';

interface PortfolioDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function PortfolioDetailsModal({ project, onClose }: PortfolioDetailsModalProps) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalSlideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }
        `}</style>

        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '100px',
                backgroundColor: '#EEF2FF',
                color: '#4338CA',
                letterSpacing: '0.02em',
              }}
            >
              {project.category}
            </span>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B',
              fontSize: '1rem',
              fontWeight: 700,
              transition: 'all 0.15s ease',
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          className="custom-scrollbar"
          style={{
            padding: '1.75rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Featured Image & Quick Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'start' }}>
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={350}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6 }}>
                {project.description}
              </div>

              {/* Meta Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  padding: '1rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #EDF2F7',
                  fontSize: '0.825rem',
                }}
              >
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>CLIENT</span>
                  <strong style={{ color: '#0F172A' }}>{project.client || project.title}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>DURATION</span>
                  <strong style={{ color: '#0F172A' }}>{project.duration || '3-4 Weeks'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>ROLE</span>
                  <strong style={{ color: '#0F172A' }}>{project.role || 'End-to-End Design & Build'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>LIVE DEMO</span>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#1833FE', fontWeight: 700, textDecoration: 'none' }}
                    >
                      Visit Website ↗
                    </a>
                  ) : (
                    <span style={{ color: '#94A3B8' }}>Internal / Proprietary</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.825rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                TECHNOLOGY STACK
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#EEF2FF',
                      color: '#4338CA',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comprehensive Narrative / Case Study */}
          {project.content && (
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.825rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                PROJECT STORY &amp; STRATEGY
              </h4>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.875rem', lineHeight: 1.7 }}>
                {project.content}
              </p>
            </div>
          )}

          {/* Challenges, Solutions & Results */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {project.challenges && project.challenges.length > 0 && (
              <div style={{ padding: '1rem', backgroundColor: '#FFF1F2', borderRadius: '14px', border: '1px solid #FFE4E6' }}>
                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.825rem', fontWeight: 800, color: '#BE123C' }}>
                  ⚠️ Key Challenges
                </h5>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#881337', fontSize: '0.8rem', lineHeight: 1.6 }}>
                  {project.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '14px', border: '1px solid #DCFCE7' }}>
                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.825rem', fontWeight: 800, color: '#15803D' }}>
                  🏆 Measurable Impact
                </h5>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#14532D', fontSize: '0.8rem', lineHeight: 1.6 }}>
                  {project.results.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
            Slug: <code>/portfolio/{project.slug}</code>
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              href={`/portfolio/${project.slug}`}
              target="_blank"
              style={{
                backgroundColor: 'var(--vivid-blue, #4f46e5)',
                color: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.825rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>View Public Page</span>
              <span>↗</span>
            </Link>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#475569',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.825rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
