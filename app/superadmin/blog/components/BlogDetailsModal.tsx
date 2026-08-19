'use client';

import React from 'react';
import Link from 'next/link';
import SafeImage from '@/app/common/SafeImage';
import { BlogPostItem } from '@/backend/services/blog';

interface BlogDetailsModalProps {
  post: BlogPostItem | null;
  onClose: () => void;
}

export default function BlogDetailsModal({ post, onClose }: BlogDetailsModalProps) {
  if (!post) return null;

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
          maxWidth: '860px',
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
              {post.category}
            </span>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              {post.title}
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
              <SafeImage
                src={post.coverImage || '/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png'}
                fallbackSrc="/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png"
                alt={post.title}
                width={500}
                height={350}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6 }}>
                {post.excerpt || post.content?.slice(0, 150)}
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
                  <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>AUTHOR</span>
                  <strong style={{ color: '#0F172A' }}>{post.authorName || 'TryangleTech Team'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>READ TIME</span>
                  <strong style={{ color: '#0F172A' }}>{post.readTime || '5 min read'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>ROLE</span>
                  <strong style={{ color: '#0F172A' }}>{post.authorRole || 'Content Creators'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontWeight: 600 }}>STATUS</span>
                  <strong style={{ color: post.published ? '#059669' : '#D97706' }}>
                    {post.published ? 'Live Published' : 'Draft'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Intro Story */}
          {(post.section1Heading || post.section1Paragraph1) && (
            <div style={{ padding: '1.25rem', backgroundColor: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                📖 {post.section1Heading || 'Introduction'}
              </h4>
              <p style={{ margin: '0 0 8px', color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {post.section1Paragraph1}
              </p>
              {post.section1Paragraph2 && (
                <p style={{ margin: 0, color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {post.section1Paragraph2}
                </p>
              )}
            </div>
          )}

          {/* Section 2: Quote & Section 3: Key Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {post.quoteText && (
              <div style={{ padding: '1rem', backgroundColor: '#FFF1F2', borderRadius: '14px', border: '1px solid #FFE4E6' }}>
                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.825rem', fontWeight: 800, color: '#BE123C' }}>
                  💬 Highlight Quote
                </h5>
                <p style={{ margin: '0 0 4px', color: '#881337', fontSize: '0.8rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                  &ldquo;{post.quoteText}&rdquo;
                </p>
                <span style={{ fontSize: '0.75rem', color: '#9F1239', fontWeight: 700 }}>
                  — {post.quoteAuthor || 'Author'}
                </span>
              </div>
            )}

            {post.stepsTitle && (
              <div style={{ padding: '1rem', backgroundColor: '#F0FDF4', borderRadius: '14px', border: '1px solid #DCFCE7' }}>
                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.825rem', fontWeight: 800, color: '#15803D' }}>
                  ⚡ {post.stepsTitle}
                </h5>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#14532D', fontSize: '0.8rem', lineHeight: 1.6 }}>
                  {post.step1 && <li>{post.step1}</li>}
                  {post.step2 && <li>{post.step2}</li>}
                </ul>
              </div>
            )}
          </div>

          {/* Section 5: Conclusion & Takeaways */}
          {post.conclusionTitle && (
            <div style={{ padding: '1.25rem', backgroundColor: '#FAF5FF', borderRadius: '14px', border: '1px solid #F3E8FF' }}>
              <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: 800, color: '#6B21A8' }}>
                🎯 {post.conclusionTitle}
              </h5>
              {post.conclusionBody && (
                <p style={{ margin: '0 0 8px', color: '#581C87', fontSize: '0.825rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {post.conclusionBody}
                </p>
              )}
              {post.conclusionPoints && post.conclusionPoints.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#581C87', fontSize: '0.8rem', lineHeight: 1.6 }}>
                  {post.conclusionPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
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
            Slug: <code>/blog/{post.slug}</code>
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              href={`/superadmin/blog/editor?id=${post.id}`}
              style={{
                backgroundColor: '#EFF6FF',
                color: '#1833FE',
                border: '1px solid #BFDBFE',
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
              <span>Edit All Sections</span>
              <span>✏️</span>
            </Link>

            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              style={{
                backgroundColor: '#1833FE',
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
