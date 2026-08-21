'use client';

import React, { useState, useEffect } from 'react';
import { Project, PortfolioCategory } from '../../../data/portfolioData';
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
  const [imageAlt, setImageAlt] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>(['']);
  const [solutions, setSolutions] = useState<string[]>(['']);
  const [results, setResults] = useState<string[]>(['']);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [aeoSummary, setAeoSummary] = useState('');
  const [geoRegion, setGeoRegion] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);
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
      setImageAlt(project.imageAlt || project.title || '');
      setDescription(project.description || '');
      setContent(project.content || project.description || '');
      setTechnologies(project.technologies || []);
      setChallenges(project.challenges && project.challenges.length > 0 ? project.challenges : ['']);
      setSolutions(project.solutions && project.solutions.length > 0 ? project.solutions : ['']);
      setResults(project.results && project.results.length > 0 ? project.results : ['']);
      setMetaTitle(project.metaTitle || '');
      setMetaDescription(project.metaDescription || '');
      setCanonicalUrl(project.canonicalUrl || '');
      setAeoSummary(project.aeoSummary || '');
      setGeoRegion(project.geoRegion || '');
      setKeywords(project.keywords || []);
      const rawFaqs = (project as any).faqs || [];
      setFaqs(
        Array.isArray(rawFaqs)
          ? rawFaqs.map((f: any) => ({
              question: f.question || f.q || '',
              answer: f.answer || f.a || '',
            }))
          : []
      );
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
      setImageAlt('');
      setDescription('');
      setContent('');
      setTechnologies(['React', 'Next.js', 'Tailwind CSS']);
      setChallenges(['']);
      setSolutions(['']);
      setResults(['']);
      setMetaTitle('');
      setMetaDescription('');
      setCanonicalUrl('');
      setAeoSummary('');
      setGeoRegion('');
      setKeywords([]);
      setFaqs([]);
    }
    setKeywordInput('');
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

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const handleAddFaq = () => {
    setFaqs([{ question: '', answer: '' }, ...faqs]);
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const handleMoveFaqUp = (index: number) => {
    if (index === 0) return;
    const updated = [...faqs];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setFaqs(updated);
  };

  const handleMoveFaqDown = (index: number) => {
    if (index >= faqs.length - 1) return;
    const updated = [...faqs];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setFaqs(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, idx) => idx !== index));
  };

  const DEFAULT_PORTFOLIO_FALLBACK_FAQS = [
    {
      question: 'What services does Tryangletech offer?',
      answer: 'We offer web design & development, digital marketing, SEO, graphics designing, mobile app development, and custom software development — all under one roof.',
    },
    {
      question: 'Which industries do you serve?',
      answer: 'We serve businesses across healthcare, finance, e-commerce, education, retail, real estate, and more — both in India and internationally.',
    },
    {
      question: 'Do you provide support after project completion?',
      answer: 'Yes, we provide dedicated ongoing maintenance, security updates, and technical support after every project launch to ensure optimal performance.',
    },
    {
      question: "What's a typical project timeline?",
      answer: "Timelines vary by scope: responsive websites typically take 2–4 weeks, while complex web applications, mobile apps, and custom software take 4–8 weeks with clear milestone deliverables.",
    },
    {
      question: 'What technologies do you build with?',
      answer: 'We engineer with high-performance modern tech stacks including React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, and cloud infrastructure tailored to your scale.',
    },
  ];

  const handleLoadDefaultFaqs = async () => {
    try {
      const res = await fetch('/api/faqs?defaults=true&pageType=PORTFOLIO_MAIN');
      const data = await res.json();
      if (data.success && Array.isArray(data.faqs) && data.faqs.length > 0) {
        setFaqs(
          data.faqs.map((f: any) => ({
            question: f.question || f.q || '',
            answer: f.answer || f.a || '',
          }))
        );
        return;
      }
    } catch (err) {
      console.warn('Failed to load default FAQs from API:', err);
    }
    setFaqs(DEFAULT_PORTFOLIO_FALLBACK_FAQS);
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
        imageAlt: imageAlt.trim() || title.trim(),
        description: description.trim(),
        content: content.trim() || description.trim(),
        technologies,
        challenges: challenges.filter((c) => c.trim().length > 0),
        solutions: solutions.filter((s) => s.trim().length > 0),
        results: results.filter((r) => r.trim().length > 0),
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        canonicalUrl: canonicalUrl.trim(),
        aeoSummary: aeoSummary.trim(),
        geoRegion: geoRegion.trim(),
        keywords,
        faqs: faqs.filter((f) => f.question.trim().length > 0 && f.answer.trim().length > 0),
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
                  {Array.from(new Set([...(dynamicCategories || []), 'General', category])).filter(Boolean).map((cat) => (
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

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Cover Image Alt Text (SEO &amp; Accessibility)
                </label>
                <input
                  type="text"
                  placeholder={`e.g. ${title || 'Project'} user interface showcase`}
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
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
                      aria-label={`Remove ${t}`}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#6366F1',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* ── SECTION: SEO, AEO & GEO SUITE ── */}
            <div style={{ marginTop: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>Dynamic SEO, AEO & GEO Optimization</span>
                </h3>
                <span style={{ fontSize: '0.725rem', backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                  AI Ready
                </span>
              </div>

              {/* 2-Col Meta Title & Canonical */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Custom Meta Title
                  </label>
                  <input
                    type="text"
                    placeholder={title ? `${title} | TryangleTech Case Study` : 'e.g. VH Accounting - Enterprise Software Platform'}
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Target GEO Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ahmedabad, India, United States"
                    value={geoRegion}
                    onChange={(e) => setGeoRegion(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.9rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Meta Description (SERP Snippet)
                </label>
                <textarea
                  rows={2}
                  placeholder="Compelling 160-character description for Google search..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.875rem',
                    outline: 'none',
                    lineHeight: '1.4',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* AEO Summary */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', margin: 0 }}>
                    AEO Direct Answer (For ChatGPT, Gemini & Perplexity)
                  </label>
                  <span style={{ fontSize: '0.7rem', color: '#7C3AED', fontWeight: 700 }}>LLM Citation Ready</span>
                </div>
                <textarea
                  rows={2}
                  placeholder="Direct concise answer summary explaining how TryangleTech solved the client's problem..."
                  value={aeoSummary}
                  onChange={(e) => setAeoSummary(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.875rem',
                    outline: 'none',
                    lineHeight: '1.4',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Semantic Keywords */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Target Keywords
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    placeholder="Type keyword and press Enter"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
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
                    onClick={handleAddKeyword}
                    style={{
                      padding: '0.6rem 1.1rem',
                      backgroundColor: '#1833FE',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Add</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#EFF6FF',
                        color: '#1833FE',
                        padding: '4px 10px',
                        borderRadius: '100px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1px solid #BFDBFE',
                      }}
                    >
                      {kw}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(kw)}
                        aria-label={`Remove ${kw}`}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#1833FE',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SECTION: DYNAMIC PAGE FAQS ── */}
            <div style={{ marginTop: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span>Dynamic Case Study FAQs ({faqs.length})</span>
                  </h3>
                  <p style={{ margin: '3px 0 0 0', fontSize: '0.78rem', color: '#64748B' }}>
                    Manage specific Q&A for this project or load default FAQs from the main portfolio page.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={handleLoadDefaultFaqs}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      color: '#1833FE',
                      fontSize: '0.775rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#1833FE">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span>Load Default FAQs</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddFaq}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#1833FE',
                      color: '#FFFFFF',
                      fontSize: '0.775rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Add Question</span>
                  </button>
                </div>
              </div>

              {faqs.length === 0 ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px dashed #CBD5E1' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#64748B' }}>
                    No custom FAQs added for this project yet. It will use the standard main portfolio FAQs.
                  </p>
                  <button
                    type="button"
                    onClick={handleLoadDefaultFaqs}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: '1px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      color: '#1833FE',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#1833FE">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span>Load Default FAQs to Customize</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '1rem 1.25rem',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#1833FE', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
                            Question #{idx + 1}
                          </span>
                          <span style={{ fontSize: '0.725rem', color: '#94A3B8' }}>
                            Item {idx + 1} of {faqs.length}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => handleMoveFaqUp(idx)}
                            disabled={idx === 0}
                            title="Move question up"
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                              backgroundColor: idx === 0 ? '#F8FAFC' : '#FFFFFF',
                              color: idx === 0 ? '#CBD5E1' : '#475569',
                              cursor: idx === 0 ? 'not-allowed' : 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="18 15 12 9 6 15" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleMoveFaqDown(idx)}
                            disabled={idx === faqs.length - 1}
                            title="Move question down"
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                              backgroundColor: idx === faqs.length - 1 ? '#F8FAFC' : '#FFFFFF',
                              color: idx === faqs.length - 1 ? '#CBD5E1' : '#475569',
                              cursor: idx === faqs.length - 1 ? 'not-allowed' : 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveFaq(idx)}
                            title="Remove question"
                            style={{
                              border: '1px solid #FCA5A5',
                              backgroundColor: '#FEF2F2',
                              color: '#DC2626',
                              cursor: 'pointer',
                              fontSize: '0.725rem',
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: '6px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              marginLeft: '4px',
                            }}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="e.g. What were the specific deliverables for this project?"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.825rem',
                          outline: 'none',
                          fontWeight: 600,
                          backgroundColor: '#F8FAFC',
                          boxSizing: 'border-box',
                        }}
                      />

                      <textarea
                        rows={2}
                        placeholder="Detailed answer for this question..."
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.825rem',
                          outline: 'none',
                          lineHeight: '1.4',
                          backgroundColor: '#F8FAFC',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
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
