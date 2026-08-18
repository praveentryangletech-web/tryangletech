'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Project, PORTFOLIO_CATEGORIES, PortfolioCategory } from '@/app/data/portfolioData';
import { apiClient } from '@/app/superadmin/utils/apiClient';

/**
 * Clean SVG Tech Stack Definition with Brand Icons
 */
interface TechStackItem {
  name: string;
  icon: (props: { size?: number; color?: string }) => React.ReactNode;
}

const TECH_STACK_CONFIG: TechStackItem[] = [
  {
    name: 'React',
    icon: ({ size = 14, color = '#00D8FF' }) => (
      <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill={color} />
        <g stroke={color} strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="#FFFFFF" />
        <path d="M115.897 54H128V126H115.897V54Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M4 9h7v2.5H8.8v7.5H6.2v-7.5H4V9zm9.3 6.3c.6.4 1.4.7 2.2.7 1 0 1.5-.4 1.5-1 0-.6-.5-.9-1.7-1.3-1.6-.6-2.6-1.5-2.6-2.8 0-1.6 1.3-2.9 3.4-2.9 1 0 1.9.3 2.5.7l-.7 2c-.5-.3-1.1-.5-1.8-.5-.8 0-1.3.4-1.3.9 0 .5.4.8 1.6 1.2 1.8.6 2.7 1.5 2.7 2.9 0 1.8-1.4 3-3.6 3-1.2 0-2.3-.4-3-1l.8-2z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2z" fill="#339933" />
        <path d="M12 4.2l7.8 4.5v9L12 22.2 4.2 17.7v-9L12 4.2z" fill="#215732" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#336791" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: 'Prisma',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M20.5 17.5L13.8 2.6c-.3-.7-1.3-.7-1.6 0L3.5 17.5c-.3.7.2 1.5 1 1.5h15c.8 0 1.3-.8 1-1.5z" fill="#2D3748" />
        <path d="M13 3.5l6.5 14.5H13V3.5z" fill="#5A67D8" />
      </svg>
    ),
  },
  {
    name: 'GSAP',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#88CE02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#88CE02" />
      </svg>
    ),
  },
  {
    name: 'Three.js',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M8 2h8a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v0a4 4 0 0 1 4-4z" fill="#F24E1E" />
        <path d="M4 10a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#A259FF" />
        <path d="M12 6h4a4 4 0 1 1 0 8h-4V6z" fill="#1ABCFE" />
        <path d="M4 18a4 4 0 0 1 4-4h4v4a4 4 0 1 1-8 0z" fill="#0ACF83" />
        <circle cx="16" cy="14" r="4" fill="#FF7262" />
      </svg>
    ),
  },
  {
    name: 'Python',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2c-3.1 0-4.9.4-4.9 1.8v2.3h5v.8H5.1c-1.8 0-3.1 1.2-3.1 3.2 0 2.2 1.4 3.3 3.1 3.3h1.3v-1.6c0-1.8 1.5-3.3 3.3-3.3h4.9v-2.3c0-1.8-1.5-4.2-5.8-4.2zm-2.4 1.3c.4 0 .8.4.8.8 0 .4-.4.8-.8.8-.4 0-.8-.4-.8-.8 0-.4.4-.8.8-.8z" fill="#3776AB" />
        <path d="M12.1 22c3.1 0 4.9-.4 4.9-1.8v-2.3h-5v-.8h6.9c1.8 0 3.1-1.2 3.1-3.2 0-2.2-1.4-3.3-3.1-3.3h-1.3v1.6c0 1.8-1.5 3.3-3.3 3.3H9.4v2.3c0 1.8 1.5 4.2 5.8 4.2zm2.4-1.3c-.4 0-.8-.4-.8-.8 0-.4.4-.8.8-.8.4 0 .8.4.8.8 0 .4-.4.8-.8.8z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M6.5 10c0-.8.6-1.5 1.5-1.5h9c.9 0 1.5.7 1.5 1.5v4c0 .8-.6 1.5-1.5 1.5h-9c-.9 0-1.5-.7-1.5-1.5v-4z" fill="#FF9900" />
        <path d="M4 17c5 3 11 3 16 0" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E10098" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    name: 'Redux',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#764ABC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 9 9" />
        <circle cx="12" cy="12" r="3" fill="#764ABC" />
      </svg>
    ),
  },
  {
    name: 'Styled Components',
    icon: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#DB7093" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="#DB7093" />
        <circle cx="17.5" cy="10.5" r=".5" fill="#DB7093" />
        <circle cx="8.5" cy="7.5" r=".5" fill="#DB7093" />
        <circle cx="6.5" cy="12.5" r=".5" fill="#DB7093" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
];

const SAMPLE_COVER_PRESETS = [
  '/portfolio/vh-accounting.webp',
  '/portfolio/7d-design-studios.webp',
  '/portfolio/devrshree.webp',
  '/portfolio/software-eoffice.webp',
  '/portfolio/grocifi.webp',
  '/portfolio/edtech.webp',
  '/portfolio/real-estate.webp',
  '/portfolio/healthcare.webp',
];

function PortfolioEditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const isEditMode = Boolean(projectId);

  const [activeTab, setActiveTab] = useState<'general' | 'media' | 'narrative' | 'seo'>('general');
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 1. General
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState<PortfolioCategory>('Business Website');
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('3 Weeks');
  const [role, setRole] = useState('Website Design & Development');
  const [liveUrl, setLiveUrl] = useState('');
  const [order, setOrder] = useState<number>(0);

  // 2. Media
  const [coverImage, setCoverImage] = useState('/portfolio/vh-accounting.webp');
  const [sliderImages, setSliderImages] = useState<string[]>(['/portfolio/vh-accounting.webp']);
  const [newSliderUrl, setNewSliderUrl] = useState('');

  // 3. Narrative
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [challenges, setChallenges] = useState<string[]>(['']);
  const [solutions, setSolutions] = useState<string[]>(['']);
  const [results, setResults] = useState<string[]>(['']);
  const [technologies, setTechnologies] = useState<string[]>(['React', 'Next.js', 'Tailwind CSS']);
  const [techInput, setTechInput] = useState('');

  // 4. SEO
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [aeoSummary, setAeoSummary] = useState('');
  const [geoRegion, setGeoRegion] = useState('Global');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManual && !isEditMode) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generated);
    }
  };

  useEffect(() => {
    if (!projectId) {
      setIsLoading(false);
      return;
    }

    async function loadProject() {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const res = await apiClient.get<Project>(`/api/portfolio?id=${projectId}`);
        if (res.success && res.data) {
          const p = res.data;
          setTitle(p.title || '');
          setSlug(p.slug || '');
          setIsSlugManual(true);
          setCategory(p.category || 'Business Website');
          setClient(p.client || '');
          setDuration(p.duration || '3 Weeks');
          setRole(p.role || 'Website Design & Development');
          setLiveUrl(p.liveUrl || '');
          setOrder((p as any).order || 0);

          setCoverImage(p.image || '/portfolio/vh-accounting.webp');
          setSliderImages(
            p.images && p.images.length > 0
              ? p.images
              : [p.image || '/portfolio/vh-accounting.webp']
          );

          setDescription(p.description || '');
          setContent(p.content || p.description || '');
          setChallenges(p.challenges && p.challenges.length > 0 ? p.challenges : ['']);
          setSolutions(p.solutions && p.solutions.length > 0 ? p.solutions : ['']);
          setResults(p.results && p.results.length > 0 ? p.results : ['']);
          setTechnologies(p.technologies && p.technologies.length > 0 ? p.technologies : ['React', 'Next.js']);

          setMetaTitle(p.metaTitle || p.title || '');
          setMetaDescription(p.metaDescription || p.description || '');
          setAeoSummary(p.aeoSummary || '');
          setGeoRegion(p.geoRegion || 'Global');
          setKeywords(p.keywords || []);
          setCanonicalUrl(p.canonicalUrl || '');
        } else {
          setErrorMessage(res.error || 'Failed to load project details.');
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'Error loading project.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  const handleAddSliderImage = () => {
    if (newSliderUrl.trim() && !sliderImages.includes(newSliderUrl.trim())) {
      setSliderImages([...sliderImages, newSliderUrl.trim()]);
      setNewSliderUrl('');
    }
  };

  const handleRemoveSliderImage = (index: number) => {
    setSliderImages(sliderImages.filter((_, i) => i !== index));
  };

  const handleAddTech = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleAddKeyword = (kw: string) => {
    const trimmed = kw.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const handleBulletChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    index: number,
    value: string
  ) => {
    const updated = [...list];
    updated[index] = value;
    setter(updated);
  };

  const handleAddBullet = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[]
  ) => {
    setter([...list, '']);
  };

  const handleRemoveBullet = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    index: number
  ) => {
    if (list.length === 1) {
      setter(['']);
      return;
    }
    setter(list.filter((_, i) => i !== index));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Project title is required.');
      setActiveTab('general');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const cleanSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const payload: Partial<Project> & { id?: string } = {
        title: title.trim(),
        slug: cleanSlug,
        category,
        client: client.trim(),
        duration: duration.trim(),
        role: role.trim(),
        liveUrl: liveUrl.trim(),
        image: coverImage.trim() || '/portfolio/vh-accounting.webp',
        images: sliderImages.filter((img) => img.trim().length > 0),
        description: description.trim(),
        content: content.trim() || description.trim(),
        challenges: challenges.filter((c) => c.trim().length > 0),
        solutions: solutions.filter((s) => s.trim().length > 0),
        results: results.filter((r) => r.trim().length > 0),
        technologies,
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || description.trim(),
        aeoSummary: aeoSummary.trim(),
        keywords: keywords.filter((k) => k.trim().length > 0),
        geoRegion: geoRegion.trim() || 'Global',
        canonicalUrl: canonicalUrl.trim(),
        order,
      };

      if (isEditMode && projectId) {
        payload.id = projectId;
        const res = await apiClient.patch('/api/portfolio', payload);
        if (!res.success) throw new Error(res.error || 'Failed to update project.');
        setSuccessMessage('Case study updated successfully!');
      } else {
        const res = await apiClient.post('/api/portfolio', payload);
        if (!res.success) throw new Error(res.error || 'Failed to create project.');
        setSuccessMessage('Case study created and published successfully!');
      }

      setTimeout(() => {
        router.push('/superadmin/portfolio');
      }, 900);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save case study.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#64748B' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #E2E8F0',
            borderTopColor: '#1833FE',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1.5rem',
          }}
        />
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>Loading case study editor...</p>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '5rem' }}>
      {/* 1. Header & Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: '#64748B',
              marginBottom: '6px',
              fontWeight: 500,
            }}
          >
            <Link href="/superadmin" style={{ color: '#64748B', textDecoration: 'none' }}>
              Control Center
            </Link>
            <span>/</span>
            <Link href="/superadmin/portfolio" style={{ color: '#64748B', textDecoration: 'none' }}>
              Portfolio
            </Link>
            <span>/</span>
            <span style={{ color: '#1833FE', fontWeight: 700 }}>
              {isEditMode ? 'Edit Case Study' : 'Create Case Study'}
            </span>
          </div>

          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: '#0F172A',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {isEditMode ? `Edit: ${title || 'Case Study'}` : 'Create New Portfolio Case Study'}
            {isEditMode && (
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#1833FE',
                  fontWeight: 700,
                }}
              >
                {category}
              </span>
            )}
          </h1>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isEditMode && slug && (
            <a
              href={`/portfolio/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>Preview Live</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}

          <Link
            href="/superadmin/portfolio"
            style={{
              padding: '9px 18px',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              color: '#475569',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Discard
          </Link>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 24px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#1833FE',
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(24, 51, 254, 0.3)',
            }}
          >
            {isSubmitting ? (
              <>
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid #FFFFFF',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                <span>Saving...</span>
              </>
            ) : (
              <span>{isEditMode ? 'Update Project' : 'Publish Project'}</span>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div
          style={{
            padding: '0.9rem 1.25rem',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '12px',
            color: '#B91C1C',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div
          style={{
            padding: '0.9rem 1.25rem',
            backgroundColor: '#ECFDF5',
            border: '1px solid #6EE7B7',
            borderRadius: '12px',
            color: '#047857',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* 2. Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid #F1F5F9',
          marginBottom: '2rem',
          paddingBottom: '2px',
          overflowX: 'auto',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          style={{
            padding: '10px 18px',
            borderRadius: '10px 10px 0 0',
            border: 'none',
            backgroundColor: activeTab === 'general' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'general' ? '#1833FE' : '#64748B',
            fontWeight: activeTab === 'general' ? 700 : 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            borderBottom: activeTab === 'general' ? '3px solid #1833FE' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span>General Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('media')}
          style={{
            padding: '10px 18px',
            borderRadius: '10px 10px 0 0',
            border: 'none',
            backgroundColor: activeTab === 'media' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'media' ? '#1833FE' : '#64748B',
            fontWeight: activeTab === 'media' ? 700 : 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            borderBottom: activeTab === 'media' ? '3px solid #1833FE' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Media & Showcase Slider</span>
          <span
            style={{
              fontSize: '0.7rem',
              backgroundColor: '#F1F5F9',
              padding: '2px 7px',
              borderRadius: '8px',
              fontWeight: 700,
            }}
          >
            {sliderImages.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('narrative')}
          style={{
            padding: '10px 18px',
            borderRadius: '10px 10px 0 0',
            border: 'none',
            backgroundColor: activeTab === 'narrative' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'narrative' ? '#1833FE' : '#64748B',
            fontWeight: activeTab === 'narrative' ? 700 : 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            borderBottom: activeTab === 'narrative' ? '3px solid #1833FE' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span>Case Study Story & Metrics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          style={{
            padding: '10px 18px',
            borderRadius: '10px 10px 0 0',
            border: 'none',
            backgroundColor: activeTab === 'seo' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'seo' ? '#1833FE' : '#64748B',
            fontWeight: activeTab === 'seo' ? 700 : 500,
            fontSize: '0.9rem',
            cursor: 'pointer',
            borderBottom: activeTab === 'seo' ? '3px solid #1833FE' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>SEO, AEO & GEO Suite</span>
          <span
            style={{
              fontSize: '0.7rem',
              backgroundColor: '#ECFDF5',
              color: '#059669',
              padding: '2px 7px',
              borderRadius: '8px',
              fontWeight: 700,
            }}
          >
            AI Ready
          </span>
        </button>
      </div>

      {/* 3. Form Content */}
      <form onSubmit={handleSave}>
        {/* TAB 1: GENERAL */}
        {activeTab === 'general' && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#1E293B' }}>
              Project Identity & Meta Information
            </h3>

            {/* Title & Category */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Project Title <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 7D Design Studios"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Category <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PortfolioCategory)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                >
                  {PORTFOLIO_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Slug */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                  URL Slug <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Live Path: <code style={{ color: '#1833FE', fontWeight: 700 }}>/portfolio/{slug || 'project-slug'}</code>
                </span>
              </div>
              <input
                type="text"
                required
                placeholder="e.g. 7d-design-studios"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setIsSlugManual(true);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backgroundColor: '#F8FAFC',
                  fontFamily: 'monospace',
                }}
              />
            </div>

            {/* Client, Role, Duration */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7D Design Studios Inc."
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Project Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Website Design & Development"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 Weeks"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
              </div>
            </div>

            {/* Live URL & Order */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                    Live Website / Demo URL
                  </label>
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.75rem', color: '#1833FE', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Test Link ↗
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Sort Order
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA */}
        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Cover Image */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 700, color: '#1E293B' }}>
                Main Listing Cover Image
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.85rem', color: '#64748B' }}>
                Primary card thumbnail displayed across portfolio index grids and social share cards.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 320px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
                <div
                  style={{
                    border: '1px solid #CBD5E1',
                    borderRadius: '14px',
                    padding: '8px',
                    backgroundColor: '#F8FAFC',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '180px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      backgroundColor: '#E2E8F0',
                    }}
                  >
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt="Cover Preview"
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={() => {}}
                      />
                    ) : (
                      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                        No Image
                      </div>
                    )}
                  </div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', marginTop: '6px' }}>
                    Live Cover Preview
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Image Path or CDN URL
                  </label>
                  <input
                    type="text"
                    placeholder="/portfolio/7d-design-studios.webp"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      backgroundColor: '#F8FAFC',
                      marginBottom: '1rem',
                    }}
                  />

                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '6px' }}>
                      Sample Assets:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {SAMPLE_COVER_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setCoverImage(preset)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: coverImage === preset ? '#EFF6FF' : '#FFFFFF',
                            color: coverImage === preset ? '#1833FE' : '#475569',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {preset.replace('/portfolio/', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Images */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#1E293B' }}>
                  Public Hero Showcase Image Slider ({sliderImages.length})
                </h3>
              </div>
              <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.85rem', color: '#64748B' }}>
                Multiple high-resolution screenshots displayed in the hero slider on <code>/portfolio/[slug]</code>.
              </p>

              {/* Add Slide Input */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  placeholder="Enter image URL or path (e.g. /portfolio/7d-design-studios.webp)"
                  value={newSliderUrl}
                  onChange={(e) => setNewSliderUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSliderImage();
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddSliderImage}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#1833FE',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  + Add Slide
                </button>
              </div>

              {/* Slider Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {sliderImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid #E2E8F0',
                      borderRadius: '14px',
                      padding: '10px',
                      backgroundColor: '#F8FAFC',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '140px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: '#CBD5E1',
                      }}
                    >
                      <Image src={imgUrl} alt={`Slide ${idx + 1}`} fill style={{ objectFit: 'cover' }} onError={() => {}} />
                      <span
                        style={{
                          position: 'absolute',
                          top: '6px',
                          left: '6px',
                          backgroundColor: 'rgba(15, 23, 42, 0.8)',
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        Slide #{idx + 1}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...sliderImages];
                          updated[idx] = e.target.value;
                          setSliderImages(updated);
                        }}
                        style={{
                          flex: 1,
                          fontSize: '0.75rem',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          fontFamily: 'monospace',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSliderImage(idx)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          border: '1px solid #FCA5A5',
                          backgroundColor: '#FEF2F2',
                          color: '#DC2626',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NARRATIVE & BULLETS */}
        {activeTab === 'narrative' && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Summary */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Summary / Card Description <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.775rem', color: '#64748B' }}>
                Short 1-2 sentence hook shown on the portfolio card and Google search snippets.
              </p>
              <textarea
                rows={3}
                placeholder="A portfolio and service website for an interior design studio, showcasing their work and expertise."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backgroundColor: '#F8FAFC',
                }}
              />
            </div>

            {/* Story */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Full Case Study Story / In-Depth Narrative
              </label>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.775rem', color: '#64748B' }}>
                Detailed background, design process, and architectural decisions.
              </p>
              <textarea
                rows={6}
                placeholder="For 7D Design Studios, the website itself had to be a masterpiece of design. We created a visually stunning, minimalist portfolio platform..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backgroundColor: '#F8FAFC',
                  lineHeight: '1.6',
                }}
              />
            </div>

            {/* Challenges, Solutions, Results */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* Challenges */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem', backgroundColor: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>The Challenge</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(setChallenges, challenges)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: '#1833FE',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    + Add Point
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {challenges.map((c, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        placeholder={`Challenge #${idx + 1}`}
                        value={c}
                        onChange={(e) => handleBulletChange(setChallenges, challenges, idx, e.target.value)}
                        style={{
                          flex: 1,
                          padding: '7px 10px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.825rem',
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(setChallenges, challenges, idx)}
                        style={{ border: 'none', backgroundColor: 'transparent', color: '#94A3B8', cursor: 'pointer', fontWeight: 700 }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem', backgroundColor: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                      <line x1="9" y1="18" x2="15" y2="18" />
                      <line x1="10" y1="22" x2="14" y2="22" />
                      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                    </svg>
                    <span>Our Solution</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(setSolutions, solutions)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: '#1833FE',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    + Add Point
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {solutions.map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        placeholder={`Solution #${idx + 1}`}
                        value={s}
                        onChange={(e) => handleBulletChange(setSolutions, solutions, idx, e.target.value)}
                        style={{
                          flex: 1,
                          padding: '7px 10px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.825rem',
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(setSolutions, solutions, idx)}
                        style={{ border: 'none', backgroundColor: 'transparent', color: '#94A3B8', cursor: 'pointer', fontWeight: 700 }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem', backgroundColor: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                    <span>Key Results</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(setResults, results)}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: '#1833FE',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    + Add Metric
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {results.map((r, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                      <input
                        type="text"
                        placeholder={`e.g. 100/100 Lighthouse Performance`}
                        value={r}
                        onChange={(e) => handleBulletChange(setResults, results, idx, e.target.value)}
                        style={{
                          flex: 1,
                          padding: '7px 10px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.825rem',
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(setResults, results, idx)}
                        style={{ border: 'none', backgroundColor: 'transparent', color: '#94A3B8', cursor: 'pointer', fontWeight: 700 }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack Pills with Brand SVG Icons */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Tools & Technologies Powering This Project
              </label>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.775rem', color: '#64748B' }}>
                Select popular framework presets with official SVG icons or add custom technologies below.
              </p>

              {/* Brand SVG Chip Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                {TECH_STACK_CONFIG.map((tech) => {
                  const isSelected = technologies.includes(tech.name);
                  return (
                    <button
                      key={tech.name}
                      type="button"
                      onClick={() => (isSelected ? handleRemoveTech(tech.name) : handleAddTech(tech.name))}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: isSelected ? '1px solid #1833FE' : '1px solid #CBD5E1',
                        backgroundColor: isSelected ? '#1833FE' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#334155',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {tech.icon({ size: 14, color: isSelected ? '#FFFFFF' : undefined })}
                      </span>
                      <span>{tech.name}</span>
                      {isSelected && <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Custom Tag Input */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Type custom technology (e.g. WebGL, Supabase) and press Enter"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTech(techInput);
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '9px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem',
                    backgroundColor: '#F8FAFC',
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleAddTech(techInput)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  Add Tag
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SEO / AEO / GEO */}
        {activeTab === 'seo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* SEO */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search Engine Optimization (SEO)</span>
              </h3>

              {/* SERP Preview */}
              <div
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px' }}>
                  Live Google Search Snippet Preview:
                </span>
                <div style={{ fontFamily: 'Arial, sans-serif' }}>
                  <div style={{ fontSize: '0.8rem', color: '#202124', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <span style={{ color: '#5f6368' }}>tryangletech.com</span>
                    <span style={{ color: '#5f6368' }}>›</span>
                    <span style={{ color: '#5f6368' }}>portfolio</span>
                    <span style={{ color: '#5f6368' }}>›</span>
                    <span>{slug || 'case-study'}</span>
                  </div>
                  <div style={{ fontSize: '1.15rem', color: '#1a0dab', fontWeight: 400, lineHeight: 1.3, marginBottom: '4px', cursor: 'pointer' }}>
                    {metaTitle || title || 'Project Title | TryangleTech Portfolio'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#4d5156', lineHeight: 1.4 }}>
                    {metaDescription || description || 'Explore our custom software and web development case study...'}
                  </div>
                </div>
              </div>

              {/* Meta Title */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                    Meta Title
                  </label>
                  <span style={{ fontSize: '0.75rem', color: metaTitle.length > 60 ? '#EF4444' : '#64748B' }}>
                    {metaTitle.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="7D Design Studios - Modern Architecture & Interior Portfolio | TryangleTech"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
              </div>

              {/* Meta Description */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                    Meta Description
                  </label>
                  <span style={{ fontSize: '0.75rem', color: metaDescription.length > 160 ? '#EF4444' : '#64748B' }}>
                    {metaDescription.length}/160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Case study on how TryangleTech engineered a minimalist, lightning-fast portfolio platform for 7D Design Studios..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
              </div>

              {/* Canonical URL */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Canonical URL Override (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://tryangletech.com/portfolio/7d-design-studios"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                  }}
                />
              </div>
            </div>

            {/* AEO (AI Engine Optimization) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
                      <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                      <rect x="4" y="8" width="16" height="12" rx="2" />
                      <circle cx="9" cy="13" r="1" fill="#7C3AED" />
                      <circle cx="15" cy="13" r="1" fill="#7C3AED" />
                      <path d="M10 17h4" />
                    </svg>
                    <span>AI Engine Optimization (AEO)</span>
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                    Direct concise summary structured for LLM answer engines (ChatGPT, Perplexity, Claude, Gemini).
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    fontWeight: 700,
                  }}
                >
                  LLM Citation Ready
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Direct Answer Summary for AI Crawlers
                </label>
                <textarea
                  rows={4}
                  placeholder="TryangleTech designed and developed a bespoke portfolio web application for 7D Design Studios using Next.js and Three.js..."
                  value={aeoSummary}
                  onChange={(e) => setAeoSummary(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#F8FAFC',
                    lineHeight: '1.5',
                  }}
                />
              </div>
            </div>

            {/* GEO & Keywords */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Generative Engine Optimization (GEO) & Semantic Keywords</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Target Geographic Scope / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Global, United States, India, UAE"
                    value={geoRegion}
                    onChange={(e) => setGeoRegion(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      backgroundColor: '#F8FAFC',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Focus Semantic Keywords ({keywords.length})
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      placeholder="Add keyword (press Enter)"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddKeyword(keywordInput);
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none',
                        backgroundColor: '#F8FAFC',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddKeyword(keywordInput)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#1833FE',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {keywords.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        backgroundColor: '#EFF6FF',
                        color: '#1833FE',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                      }}
                    >
                      <span>{kw}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(kw)}
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#1833FE',
                          cursor: 'pointer',
                          fontWeight: 700,
                          padding: 0,
                        }}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sticky Bottom Save Bar */}
        <div
          style={{
            marginTop: '2.5rem',
            padding: '1.25rem 2rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
            <span>Changes will be saved to Supabase PostgreSQL and synced across Edge CDNs.</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              href="/superadmin/portfolio"
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#475569',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 28px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#1833FE',
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(24, 51, 254, 0.3)',
              }}
            >
              {isSubmitting ? 'Saving Case Study...' : isEditMode ? 'Update Project' : 'Publish Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function PortfolioEditorPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#64748B' }}>
          <p style={{ fontSize: '1rem', fontWeight: 600 }}>Loading editor...</p>
        </div>
      }
    >
      <PortfolioEditorInner />
    </Suspense>
  );
}
