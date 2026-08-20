'use client';

import React, { useState, useEffect } from 'react';
import { Project, PORTFOLIO_CATEGORIES, PortfolioCategory } from '../../../data/portfolioData';
import { usePortfolio } from '../../context/PortfolioContext';

interface PortfolioEditModalProps {
  isOpen: boolean;
  project: Project | null; // null means "Add New Project" mode
  onClose: () => void;
  onSave: (projectData: Partial<Project>) => Promise<void>;
}

export default function PortfolioEditModal({
  isOpen,
  project,
  onClose,
  onSave,
}: PortfolioEditModalProps) {
  const isEdit = !!project;
  const { categories: dynamicCategories } = usePortfolio();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<PortfolioCategory>('Business Website');
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('3 Weeks');
  const [role, setRole] = useState('Website Design & Development');
  const [liveUrl, setLiveUrl] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>(['']);
  const [solutions, setSolutions] = useState<string[]>(['']);
  const [results, setResults] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Populate form when modal opens or project changes
  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setSlug(project.slug || '');
      setCategory(project.category || 'Business Website');
      setClient(project.client || '');
      setDuration(project.duration || '3 Weeks');
      setRole(project.role || 'Website Design & Development');
      setLiveUrl(project.liveUrl || '');
      setImage(project.image || '');
      setDescription(project.description || '');
      setContent(project.content || project.description || '');
      setTechnologies(project.technologies || []);
      setChallenges(project.challenges && project.challenges.length > 0 ? project.challenges : ['']);
      setSolutions(project.solutions && project.solutions.length > 0 ? project.solutions : ['']);
      setResults(project.results && project.results.length > 0 ? project.results : ['']);
    } else {
      // Add mode defaults
      setTitle('');
      setSlug('');
      setCategory('Business Website');
      setClient('');
      setDuration('3 Weeks');
      setRole('Website Design & Development');
      setLiveUrl('');
      setImage('');
      setDescription('');
      setContent('');
      setTechnologies(['React', 'Next.js', 'Tailwind CSS']);
      setChallenges(['']);
      setSolutions(['']);
      setResults(['']);
    }
    setErrorMessage('');
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Project title is required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload: Partial<Project> = {
        title: title.trim(),
        slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category,
        client: client.trim(),
        duration: duration.trim(),
        role: role.trim(),
        liveUrl: liveUrl.trim(),
        image: image.trim(),
        description: description.trim(),
        content: content.trim() || description.trim(),
        technologies,
        challenges: challenges.filter((c) => c.trim().length > 0),
        solutions: solutions.filter((s) => s.trim().length > 0),
        results: results.filter((r) => r.trim().length > 0),
      };

      await onSave(payload);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save project.');
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
              {isEdit ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748B' }}>
              {isEdit ? 'Update case study details and live links in Supabase PostgreSQL.' : 'Create a new high-impact portfolio case study.'}
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
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VH Accounting"
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
                  {Array.from(new Set([...(dynamicCategories || []), ...PORTFOLIO_CATEGORIES, 'General', category])).filter(Boolean).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Client, Role, Duration */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. VH Accounting"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
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
                  Project Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Website Design & Dev"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 Weeks"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
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

            {/* Row 3: Live Demo URL & Image Path */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Live Demo URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
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
                  Cover Image Path (Recommended Size: 800 × 500 px • 16:10 Ratio)
                </label>
                <input
                  type="text"
                  placeholder="/portfolio/vh-accounting.webp"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
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

            {/* Row 4: Short Summary */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Summary / Card Description
              </label>
              <textarea
                rows={2}
                placeholder="A brief overview of the project shown on portfolio listing cards..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

            {/* Row 5: Full Case Study Content */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Full Case Study Story / Details
              </label>
              <textarea
                rows={4}
                placeholder="Deep-dive narrative explaining the client background, digital goals, and architectural achievements..."
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

            {/* Row 6: Technologies Tag Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Tech Stack Tags
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  placeholder="Type technology (e.g. Next.js, PostgreSQL, Tailwind) and click Add"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '0.6rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  style={{
                    padding: '0.6rem 1.25rem',
                    backgroundColor: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                >
                  + Add Tag
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {technologies.map((t) => (
                  <span
                    key={t}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#EEF2FF',
                      color: '#4338CA',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(t)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#6366F1',
                        cursor: 'pointer',
                        padding: 0,
                        fontWeight: 800,
                        fontSize: '0.9rem',
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div
            style={{
              padding: '1.25rem 2rem',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              backgroundColor: '#F8FAFC',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#475569',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.65rem 1.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--brand-blue, #1833fe)',
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(24, 51, 254, 0.25)',
              }}
            >
              {isSubmitting ? 'Saving to Database...' : isEdit ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
