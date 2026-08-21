'use client';

import React, { useState, useEffect } from 'react';
import { BlogPostItem } from '@/backend/services/blog';
import { useBlog } from '../../context/BlogContext';

interface BlogEditModalProps {
  isOpen: boolean;
  post: BlogPostItem | null; // null means "Add New Article" mode
  onClose: () => void;
  onSave: (postData: Partial<BlogPostItem>) => Promise<void>;
}

export default function BlogEditModal({
  isOpen,
  post,
  onClose,
  onSave,
}: BlogEditModalProps) {
  const { categories: dynamicCategories } = useBlog();
  const isEdit = !!post;

  const formatForDateTimeInput = (dateStr?: string | Date) => {
    if (!dateStr) {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<string>('Web Development');
  const [authorName, setAuthorName] = useState('TryangleTech Team');
  const [authorRole, setAuthorRole] = useState('Editorial Team');
  const [readTime, setReadTime] = useState('5 min read');
  const [published, setPublished] = useState(true);
  const [publishedAt, setPublishedAt] = useState<string>(() => formatForDateTimeInput());
  const [coverImage, setCoverImage] = useState('');
  const [coverImageAlt, setCoverImageAlt] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Populate form when modal opens or post changes
  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setSlug(post.slug || '');
      setCategory(post.category || 'Web Development');
      setAuthorName(post.authorName || 'TryangleTech Team');
      setAuthorRole(post.authorRole || 'Editorial Team');
      setReadTime(post.readTime || '5 min read');
      setPublished(post.published);
      setPublishedAt(formatForDateTimeInput(post.publishedAt || post.createdAt));
      setCoverImage(post.coverImage || '');
      setCoverImageAlt(post.coverImageAlt || post.imageAlt || '');
      setExcerpt(post.excerpt || '');
      setContent(post.content || post.excerpt || '');
      setTags(post.tags || []);
    } else {
      // Add mode defaults
      setTitle('');
      setSlug('');
      setCategory('Web Development');
      setAuthorName('TryangleTech Team');
      setAuthorRole('Editorial Team');
      setReadTime('5 min read');
      setPublished(true);
      setPublishedAt(formatForDateTimeInput());
      setCoverImage('');
      setCoverImageAlt('');
      setExcerpt('');
      setContent('');
      setTags([]);
    }
    setErrorMessage('');
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Article title is required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload: Partial<BlogPostItem> = {
        title: title.trim(),
        slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category,
        authorName: authorName.trim(),
        authorRole: authorRole.trim(),
        readTime: readTime.trim(),
        published,
        publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
        coverImage: coverImage.trim(),
        coverImageAlt: coverImageAlt.trim(),
        imageAlt: coverImageAlt.trim(),
        excerpt: excerpt.trim(),
        content: content.trim() || excerpt.trim(),
        tags,
      };

      await onSave(payload);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          animation: 'fadeInScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F8FAFC',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              {isEdit ? 'Edit Blog Article' : 'Add New Blog Article'}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748B' }}>
              {isEdit ? 'Update article details, publication status, and content.' : 'Create and publish a new blog article.'}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B',
            }}
            aria-label="Close modal"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Form Scrollable Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div
            className="admin-scroll-area"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.75rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {errorMessage && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#DC2626',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Row 1: Title & Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Transforming businesses with innovative technology"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box',
                  }}
                >
                  {Array.from(
                    new Set([
                      ...(dynamicCategories || []),
                      'General',
                      category,
                    ].filter(Boolean))
                  ).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Author, Role, Read Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Author Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. TryangleTech Team"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Author Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Editorial Team"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Read Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 min read"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Row 3: Cover Image Path & Publish Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Cover Image URL / Path (Required Card Size: 820 × 490 px • 16:10 Ratio)
                </label>
                <input
                  type="text"
                  placeholder="/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    backgroundColor: '#F8FAFC',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    marginBottom: '8px',
                  }}
                />
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Cover Image Alt Text (SEO)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI Workflow Management illustration"
                  value={coverImageAlt}
                  onChange={(e) => setCoverImageAlt(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    backgroundColor: '#F8FAFC',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Publish Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Row 4: Short Excerpt */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Article Excerpt / Hook
              </label>
              <textarea
                rows={2}
                placeholder="A brief overview shown on listing cards and article header..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Row 5: Full Article Content */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Full Article Content
              </label>
              <textarea
                rows={4}
                placeholder="Full article body content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>


            {/* Row 7: Published Toggle Switch */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '4px' }}>
              <input
                type="checkbox"
                id="modalPublishedToggle"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#1833FE' }}
              />
              <label htmlFor="modalPublishedToggle" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}>
                Published (Live on Public Website)
              </label>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div
            style={{
              padding: '1.25rem 2rem',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#F8FAFC',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              {isEdit && post && (
                <a
                  href={`/superadmin/blog/editor?id=${post.id}`}
                  style={{
                    padding: '0.65rem 1.1rem',
                    borderRadius: '8px',
                    border: '1px solid #BFDBFE',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Full Section Editor ↗
                </a>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.65rem 1.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--brand-blue, #1833fe)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(24, 51, 254, 0.25)',
              }}
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
