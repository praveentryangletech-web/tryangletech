'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Project, PortfolioCategory } from '@/app/data/portfolioData';
import { apiClient } from '@/app/superadmin/utils/apiClient';
import CustomDropdown from '@/app/superadmin/components/CustomDropdown';
import { PortfolioProvider, usePortfolio } from '@/app/superadmin/context/PortfolioContext';

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
    icon: ({ size = 15, color = '#00D8FF' }) => (
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
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="#FFFFFF" />
        <path d="M115.897 54H128V126H115.897V54Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M4 9h7v2.5H8.8v7.5H6.2v-7.5H4V9zm9.3 6.3c.6.4 1.4.7 2.2.7 1 0 1.5-.4 1.5-1 0-.6-.5-.9-1.7-1.3-1.6-.6-2.6-1.5-2.6-2.8 0-1.6 1.3-2.9 3.4-2.9 1 0 1.9.3 2.5.7l-.7 2c-.5-.3-1.1-.5-1.8-.5-.8 0-1.3.4-1.3.9 0 .5.4.8 1.6 1.2 1.8.6 2.7 1.5 2.7 2.9 0 1.8-1.4 3-3.6 3-1.2 0-2.3-.4-3-1l.8-2z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2z" fill="#339933" />
        <path d="M12 4.2l7.8 4.5v9L12 22.2 4.2 17.7v-9L12 4.2z" fill="#215732" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#336791" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: 'Prisma',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M20.5 17.5L13.8 2.6c-.3-.7-1.3-.7-1.6 0L3.5 17.5c-.3.7.2 1.5 1 1.5h15c.8 0 1.3-.8 1-1.5z" fill="#2D3748" />
        <path d="M13 3.5l6.5 14.5H13V3.5z" fill="#5A67D8" />
      </svg>
    ),
  },
  {
    name: 'GSAP',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#88CE02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#88CE02" />
      </svg>
    ),
  },
  {
    name: 'Three.js',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    icon: ({ size = 15 }) => (
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
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2c-3.1 0-4.9.4-4.9 1.8v2.3h5v.8H5.1c-1.8 0-3.1 1.2-3.1 3.2 0 2.2 1.4 3.3 3.1 3.3h1.3v-1.6c0-1.8 1.5-3.3 3.3-3.3h4.9v-2.3c0-1.8-1.5-4.2-5.8-4.2zm-2.4 1.3c.4 0 .8.4.8.8 0 .4-.4.8-.8.8-.4 0-.8-.4-.8-.8 0-.4.4-.8.8-.8z" fill="#3776AB" />
        <path d="M12.1 22c3.1 0 4.9-.4 4.9-1.8v-2.3h-5v-.8h6.9c1.8 0 3.1-1.2 3.1-3.2 0-2.2-1.4-3.3-3.1-3.3h-1.3v1.6c0 1.8-1.5 3.3-3.3 3.3H9.4v2.3c0 1.8 1.5 4.2 5.8 4.2zm2.4-1.3c-.4 0-.8-.4-.8-.8 0-.4.4-.8.8-.8.4 0 .8.4.8.8 0 .4-.4.8-.8.8z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M6.5 10c0-.8.6-1.5 1.5-1.5h9c.9 0 1.5.7 1.5 1.5v4c0 .8-.6 1.5-1.5 1.5h-9c-.9 0-1.5-.7-1.5-1.5v-4z" fill="#FF9900" />
        <path d="M4 17c5 3 11 3 16 0" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E10098" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    name: 'Redux',
    icon: ({ size = 15 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#764ABC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 9 9" />
        <circle cx="12" cy="12" r="3" fill="#764ABC" />
      </svg>
    ),
  },
  {
    name: 'Styled Components',
    icon: ({ size = 15 }) => (
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

function PortfolioEditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const isEditMode = Boolean(projectId);
  type EditorTab = 'general' | 'media' | 'narrative' | 'seo' | 'faqs';
  const VALID_TABS: EditorTab[] = ['general', 'media', 'narrative', 'seo', 'faqs'];

  const tabParam = searchParams.get('tab') as EditorTab | null;
  const initialTab: EditorTab = tabParam && VALID_TABS.includes(tabParam) ? tabParam : 'general';

  const [activeTab, setActiveTabState] = useState<EditorTab>(initialTab);

  const setActiveTab = (tab: EditorTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState(null, '', url.toString());
      try {
        sessionStorage.setItem(`portfolio_editor_tab_${projectId || 'new'}`, tab);
      } catch (_) {}
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlTab = searchParams.get('tab') as EditorTab | null;
      if (urlTab && VALID_TABS.includes(urlTab)) {
        setActiveTabState(urlTab);
      } else {
        try {
          const savedTab = sessionStorage.getItem(`portfolio_editor_tab_${projectId || 'new'}`) as EditorTab | null;
          if (savedTab && VALID_TABS.includes(savedTab)) {
            setActiveTabState(savedTab);
            const url = new URL(window.location.href);
            url.searchParams.set('tab', savedTab);
            window.history.replaceState(null, '', url.toString());
          }
        } catch (_) {}
      }
    }
  }, [searchParams, projectId]);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { categories: availableCategories, saveProject } = usePortfolio();

  // 1. General
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState<string>('General');
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('3 Weeks');
  const [role, setRole] = useState('Website Design & Development');
  const [liveUrl, setLiveUrl] = useState('');
  const [order, setOrder] = useState<number>(0);

  // 2. Media
  const [coverImage, setCoverImage] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [imageAlts, setImageAlts] = useState<string[]>([]);
  const [newSliderUrl, setNewSliderUrl] = useState('');
  const [newSliderAlt, setNewSliderAlt] = useState('');

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

  // 5. Dynamic FAQs
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);
  const [isLoadingDefaults, setIsLoadingDefaults] = useState(false);

  // 6. Media Library Management State
  interface MediaAssetItem {
    filename: string;
    url: string;
    altText?: string;
    size: number;
    updatedAt: string;
  }
  const [mediaList, setMediaList] = useState<MediaAssetItem[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<'cover' | 'slider'>('cover');
  const [uploadFeedback, setUploadFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');

  // Pre-upload rename & alt states
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);
  const [uploadFilePreview, setUploadFilePreview] = useState<string | null>(null);
  const [customFilenameInput, setCustomFilenameInput] = useState('');
  const [customAltInput, setCustomAltInput] = useState('');
  const [blobPreviewMap, setBlobPreviewMap] = useState<Record<string, string>>({});

  // 6. Asset Picker Modal State
  const [isAssetPickerOpen, setIsAssetPickerOpen] = useState(false);
  const [assetPickerTarget, setAssetPickerTarget] = useState<'cover' | 'slider'>('cover');
  const [assetPickerSearch, setAssetPickerSearch] = useState('');
  const [selectedAssetUrls, setSelectedAssetUrls] = useState<string[]>([]);

  const fetchMediaList = async () => {
    setIsLoadingMedia(true);
    try {
      const res = await fetch('/api/superadmin/media');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMediaList(data.data);
      }
    } catch {
      // Ignored
    } finally {
      setIsLoadingMedia(false);
    }
  };

  useEffect(() => {
    fetchMediaList();
  }, []);

  useEffect(() => {
    if (activeTab === 'media') {
      fetchMediaList();
    }
  }, [activeTab]);

  const handleSelectFileToUpload = (files: FileList | null, target: 'cover' | 'slider' = 'cover') => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadTarget(target);
    setSelectedUploadFile(file);

    // Auto extract clean base filename
    const lastDot = file.name.lastIndexOf('.');
    const baseName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
    const cleanBase = baseName
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    setCustomFilenameInput(cleanBase || (target === 'cover' ? 'cover-image' : 'slide-image'));
    setCustomAltInput(title.trim() ? `${title.trim()} ${target === 'cover' ? 'cover showcase' : 'slide preview'}` : cleanBase.replace(/-/g, ' '));

    const objectUrl = URL.createObjectURL(file);
    setUploadFilePreview(objectUrl);
    setUploadFeedback(null);
  };

  const handleExecuteUpload = async () => {
    if (!selectedUploadFile) return;
    setIsUploading(true);
    setUploadFeedback(null);

    const formData = new FormData();
    formData.append('file', selectedUploadFile);
    if (customFilenameInput.trim()) {
      formData.append('customName', customFilenameInput.trim());
    }
    if (customAltInput.trim()) {
      formData.append('altText', customAltInput.trim());
    }

    try {
      const res = await fetch('/api/superadmin/media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to upload asset.');
      }

      setUploadFeedback({
        type: 'success',
        text: `Asset "${data.filename}" stored in public/portfolio successfully!`,
      });

      if (uploadTarget === 'cover') {
        setCoverImage(data.url);
        if (customAltInput.trim()) {
          setImageAlt(customAltInput.trim());
        }
      } else {
        if (!sliderImages.includes(data.url)) {
          setSliderImages((prev) => [...prev, data.url]);
          setImageAlts((prev) => [...prev, customAltInput.trim() || `${title || 'Project'} screenshot ${sliderImages.length + 1}`]);
        }
      }

      if (uploadFilePreview) {
        const previewUrl = uploadFilePreview;
        setBlobPreviewMap((prev) => ({ ...prev, [data.url]: previewUrl }));
      }

      // Cleanup pre-upload state
      setSelectedUploadFile(null);
      setCustomFilenameInput('');
      setCustomAltInput('');
      setUploadFilePreview(null);
      fetchMediaList();
    } catch (err: any) {
      setUploadFeedback({ type: 'error', text: err?.message || 'Upload failed.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelSelectedFile = () => {
    setSelectedUploadFile(null);
    setCustomFilenameInput('');
    setCustomAltInput('');
    setUploadFilePreview(null);
  };

  const handleDeleteMedia = async (filename: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${filename}" from public/portfolio?`)) {
      return;
    }

    try {
      const res = await fetch('/api/superadmin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to delete asset.');
      }

      setUploadFeedback({
        type: 'success',
        text: `Asset "${filename}" deleted from public/portfolio.`,
      });

      fetchMediaList();

      if (coverImage.includes(filename)) {
        setCoverImage('');
      }
      setSliderImages((prev) => prev.filter((img) => !img.includes(filename)));
    } catch (err: any) {
      alert(`Delete failed: ${err?.message || 'Error deleting file.'}`);
    }
  };

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

          setCoverImage(p.image || '');
          setImageAlt(p.imageAlt || p.title || '');
          setSliderImages(
            p.images && p.images.length > 0
              ? p.images
              : (p.image ? [p.image] : [])
          );
          setImageAlts(
            Array.isArray(p.imageAlts) && p.imageAlts.length > 0
              ? p.imageAlts
              : (p.images || []).map((_, i) => `${p.title || 'Project'} screenshot ${i + 1}`)
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
          const rawFaqs = (p as any).faqs || [];
          setFaqs(
            Array.isArray(rawFaqs)
              ? rawFaqs.map((f: any) => ({
                  question: f.question || f.q || '',
                  answer: f.answer || f.a || '',
                }))
              : []
          );
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
      setImageAlts([...imageAlts, newSliderAlt.trim() || `${title || 'Project'} slide ${sliderImages.length + 1}`]);
      setNewSliderUrl('');
      setNewSliderAlt('');
    }
  };

  const handleRemoveSliderImage = (index: number) => {
    setSliderImages(sliderImages.filter((_, i) => i !== index));
    setImageAlts(imageAlts.filter((_, i) => i !== index));
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

  const handleAddFaq = () => {
    setFaqs((prev) => [{ question: '', answer: '' }, ...prev]);
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setFaqs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleMoveFaqUp = (index: number) => {
    if (index === 0) return;
    setFaqs((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      return updated;
    });
  };

  const handleMoveFaqDown = (index: number) => {
    setFaqs((prev) => {
      if (index >= prev.length - 1) return prev;
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      return updated;
    });
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

  const handleRemoveFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleLoadDefaultFaqs = async () => {
    setIsLoadingDefaults(true);
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
        setIsLoadingDefaults(false);
        return;
      }
    } catch (err) {
      console.warn('API default load warning:', err);
    }
    setFaqs(DEFAULT_PORTFOLIO_FALLBACK_FAQS);
    setIsLoadingDefaults(false);
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
    list: string[],
    focusPrefix?: string,
    currentIndex?: number
  ) => {
    if (typeof currentIndex === 'number' && currentIndex < list.length - 1 && focusPrefix) {
      const nextInput = document.getElementById(`${focusPrefix}-${currentIndex + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
        return;
      }
    }

    const nextIdx = list.length;
    setter([...list, '']);
    if (focusPrefix) {
      setTimeout(() => {
        const nextInput = document.getElementById(`${focusPrefix}-${nextIdx}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }, 50);
    }
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
        image: coverImage.trim(),
        imageAlt: imageAlt.trim() || title.trim(),
        images: sliderImages.filter((img) => img.trim().length > 0),
        imageAlts: imageAlts.slice(0, sliderImages.length),
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
        faqs: faqs.filter((f) => f.question.trim().length > 0 && f.answer.trim().length > 0),
        order,
      };

      if (isEditMode && projectId) {
        payload.id = projectId;
        await saveProject(payload);
        setSuccessMessage('Case study updated successfully!');
      } else {
        await saveProject(payload);
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 16px',
    borderRadius: '12px',
    border: '1.5px solid #CBD5E1',
    fontSize: '0.9rem',
    outline: 'none',
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
    fontWeight: 500,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.825rem',
    fontWeight: 700,
    color: '#1E293B',
    marginBottom: '7px',
    letterSpacing: '0.01em',
  };

  if (isLoading) {
    return (
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.75rem 2rem 6rem 2rem' }}>
        {/* Header Toolbar Skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="agy-skeleton" style={{ width: '160px', height: '42px', borderRadius: '12px' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="agy-skeleton" style={{ width: '110px', height: '42px', borderRadius: '12px' }} />
            <div className="agy-skeleton" style={{ width: '150px', height: '42px', borderRadius: '12px' }} />
          </div>
        </div>

        {/* Tabs Bar Skeleton */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1.5px solid #CBD5E1', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <div className="agy-skeleton" style={{ flex: 1, height: '42px', borderRadius: '10px' }} />
          <div className="agy-skeleton" style={{ flex: 1, height: '42px', borderRadius: '10px' }} />
          <div className="agy-skeleton" style={{ flex: 1, height: '42px', borderRadius: '10px' }} />
          <div className="agy-skeleton" style={{ flex: 1, height: '42px', borderRadius: '10px' }} />
        </div>

        {/* Main Form Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', padding: '0.5rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <div>
              <div className="agy-skeleton" style={{ width: '100px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
            <div>
              <div className="agy-skeleton" style={{ width: '90px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
          </div>

          <div>
            <div className="agy-skeleton" style={{ width: '120px', height: '14px', marginBottom: '8px' }} />
            <div className="agy-skeleton" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div className="agy-skeleton" style={{ width: '90px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
            <div>
              <div className="agy-skeleton" style={{ width: '90px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
            <div>
              <div className="agy-skeleton" style={{ width: '90px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.75rem 2rem 6rem 2rem' }}>
      {/* 1. Header Action Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <Link
          href="/superadmin/portfolio"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: '42px',
            padding: '0 18px',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            color: '#334155',
            fontSize: '0.875rem',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            boxSizing: 'border-box',
            transition: 'all 0.15s ease',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Portfolio</span>
        </Link>

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
                justifyContent: 'center',
                gap: '7px',
                height: '42px',
                padding: '0 18px',
                borderRadius: '10px',
                border: '1.5px solid #BFDBFE',
                backgroundColor: '#EFF6FF',
                color: '#1833FE',
                fontSize: '0.875rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Preview Live</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}

          <Link
            href="/superadmin/portfolio"
            style={{
              height: '42px',
              padding: '0 20px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '0.875rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
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
              justifyContent: 'center',
              gap: '8px',
              height: '42px',
              padding: '0 24px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#1833FE',
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(24, 51, 254, 0.3)',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
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
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
                <span>{isEditMode ? 'Update Project' : 'Publish Project'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '14px',
            color: '#B91C1C',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            padding: '1rem 1.25rem',
            backgroundColor: '#ECFDF5',
            border: '1px solid #6EE7B7',
            borderRadius: '14px',
            color: '#047857',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* 2. Modern Segmented Tab Navigation Bar */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          backgroundColor: 'transparent',
          padding: '0 0 1rem 0',
          borderBottom: '1.5px solid #CBD5E1',
          marginBottom: '2rem',
          gap: '6px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Tab 1 */}
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          style={{
            flex: '1 1 auto',
            padding: '9px 14px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: activeTab === 'general' ? '#1833FE' : 'transparent',
            color: activeTab === 'general' ? '#FFFFFF' : '#64748B',
            fontWeight: activeTab === 'general' ? 700 : 600,
            fontSize: '0.815rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'general' ? '0 2px 8px rgba(24, 51, 254, 0.25)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span>General Details</span>
        </button>

        {/* Tab 2 */}
        <button
          type="button"
          onClick={() => setActiveTab('media')}
          style={{
            flex: '1 1 auto',
            padding: '9px 14px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: activeTab === 'media' ? '#1833FE' : 'transparent',
            color: activeTab === 'media' ? '#FFFFFF' : '#64748B',
            fontWeight: activeTab === 'media' ? 700 : 600,
            fontSize: '0.815rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'media' ? '0 2px 8px rgba(24, 51, 254, 0.25)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Media & Showcase</span>
          <span
            style={{
              fontSize: '0.7rem',
              backgroundColor: activeTab === 'media' ? 'rgba(255, 255, 255, 0.25)' : '#F1F5F9',
              color: activeTab === 'media' ? '#FFFFFF' : '#64748B',
              padding: '1px 7px',
              borderRadius: '10px',
              fontWeight: 700,
            }}
          >
            {sliderImages.length}
          </span>
        </button>

        {/* Tab 3 */}
        <button
          type="button"
          onClick={() => setActiveTab('narrative')}
          style={{
            flex: '1 1 auto',
            padding: '9px 14px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: activeTab === 'narrative' ? '#1833FE' : 'transparent',
            color: activeTab === 'narrative' ? '#FFFFFF' : '#64748B',
            fontWeight: activeTab === 'narrative' ? 700 : 600,
            fontSize: '0.815rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'narrative' ? '0 2px 8px rgba(24, 51, 254, 0.25)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span>Story & Metrics</span>
        </button>

        {/* Tab 4 */}
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          style={{
            flex: '1 1 auto',
            padding: '9px 14px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: activeTab === 'seo' ? '#1833FE' : 'transparent',
            color: activeTab === 'seo' ? '#FFFFFF' : '#64748B',
            fontWeight: activeTab === 'seo' ? 700 : 600,
            fontSize: '0.815rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'seo' ? '0 2px 8px rgba(24, 51, 254, 0.25)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>SEO, AEO & GEO</span>
          <span
            style={{
              fontSize: '0.7rem',
              backgroundColor: activeTab === 'seo' ? 'rgba(255, 255, 255, 0.25)' : '#ECFDF5',
              color: activeTab === 'seo' ? '#FFFFFF' : '#059669',
              padding: '1px 7px',
              borderRadius: '10px',
              fontWeight: 700,
            }}
          >
            AI Ready
          </span>
        </button>

        {/* Tab 5: Dynamic FAQs */}
        <button
          type="button"
          onClick={() => setActiveTab('faqs')}
          style={{
            flex: '1 1 auto',
            padding: '9px 14px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: activeTab === 'faqs' ? '#1833FE' : 'transparent',
            color: activeTab === 'faqs' ? '#FFFFFF' : '#64748B',
            fontWeight: activeTab === 'faqs' ? 700 : 600,
            fontSize: '0.815rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'faqs' ? '0 2px 8px rgba(24, 51, 254, 0.25)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Dynamic FAQs</span>
          <span
            style={{
              fontSize: '0.7rem',
              backgroundColor: activeTab === 'faqs' ? 'rgba(255, 255, 255, 0.25)' : '#EFF6FF',
              color: activeTab === 'faqs' ? '#FFFFFF' : '#1833FE',
              padding: '1px 7px',
              borderRadius: '10px',
              fontWeight: 700,
            }}
          >
            {faqs.length} FAQs
          </span>
        </button>
      </div>

      {/* 3. Form Content */}
      <form onSubmit={handleSave}>
        {/* ============================================================ */}
        {/* TAB 1: GENERAL                                               */}
        {/* ============================================================ */}
        {activeTab === 'general' && (
          <div
            style={{
              backgroundColor: 'transparent',
              borderRadius: '20px',
              border: 'none',
              padding: '0.5rem 0',
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                Project Identity & Meta Information
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>
                Configure core identity, category assignment, client name, and duration.
              </p>
            </div>

            {/* Row 1: Title & Category Custom Dropdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>
                  Project Title <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 7D Design Studios"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Category <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <CustomDropdown
                  value={category}
                  options={Array.from(new Set([...availableCategories, category]))
                    .filter(Boolean)
                    .map((c) => ({ value: c, label: c }))}
                  onChange={(val) => setCategory(String(val))}
                  direction="down"
                  size="form"
                  fullWidth
                />
              </div>
            </div>

            {/* Row 2: Slug */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                <label style={{ ...labelStyle, margin: 0 }}>
                  URL Slug <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Live Path: <code style={{ color: '#1833FE', fontWeight: 700, backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>/portfolio/{slug || 'project-slug'}</code>
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
                style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.925rem' }}
              />
            </div>

            {/* Row 3: Client, Role, Duration */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Client / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. 7D Design Studios Inc."
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Project Role</label>
                <input
                  type="text"
                  placeholder="e.g. Website Design & Development"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 3 Weeks"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Row 4: Live URL & Order */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                  <label style={{ ...labelStyle, margin: 0 }}>Live Website / Demo URL</label>
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.75rem', color: '#1833FE', fontWeight: 700, textDecoration: 'none' }}
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
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Sort Order</label>
                <input
                  type="number"
                  placeholder="0"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: MEDIA (COVER & SHOWCASE SLIDER)                       */}
        {/* ============================================================ */}
        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* 1. Main Listing Cover Image Card */}
            <div
              style={{
                backgroundColor: 'transparent',
                borderRadius: '20px',
                border: 'none',
                padding: '0.5rem 0',
                boxShadow: 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                  Main Listing Cover Image
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#EFF6FF', color: '#1833FE', padding: '4px 12px', borderRadius: '12px', fontWeight: 700 }}>
                  Recommended: 800 × 500 px • 16:10 Ratio
                </span>
              </div>
              <p style={{ margin: '0 0 1.75rem 0', fontSize: '0.85rem', color: '#64748B' }}>
                The primary card thumbnail displayed across portfolio index grids and social media share previews. Recommended image dimensions: <strong>800 × 500 px</strong> (or 16:10 aspect ratio).
              </p>

              {/* Upload Feedback Alert */}
              {uploadFeedback && (
                <div
                  style={{
                    marginBottom: '1.5rem',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '12px',
                    backgroundColor: uploadFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                    color: uploadFeedback.type === 'success' ? '#047857' : '#B91C1C',
                    border: `1px solid ${uploadFeedback.type === 'success' ? '#A7F3D0' : '#FECACA'}`,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {uploadFeedback.type === 'success' ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    )}
                    <span>{uploadFeedback.text}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadFeedback(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Cover Pre-upload renaming box */}
              {selectedUploadFile && uploadTarget === 'cover' && (
                <div
                  style={{
                    marginBottom: '1.75rem',
                    border: '1.5px solid #BFDBFE',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    backgroundColor: '#F0F9FF',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(120px, 150px) 1fr',
                    gap: '1.5rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '110px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    {uploadFilePreview && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={uploadFilePreview}
                        alt="Upload Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        color: '#FFFFFF',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '2px 5px',
                        borderRadius: '4px',
                      }}
                    >
                      {(selectedUploadFile.size / 1024).toFixed(0)} KB
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                        Modify Image Filename before storing in <code>public/portfolio/</code>:
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="text"
                          value={customFilenameInput}
                          onChange={(e) => setCustomFilenameInput(e.target.value)}
                          placeholder="e.g. vh-accounting-cover"
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid #3B82F6',
                            backgroundColor: '#FFFFFF',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#0F172A',
                            outline: 'none',
                          }}
                        />
                        <span
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: '#E0F2FE',
                            color: '#0369A1',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                          }}
                        >
                          {selectedUploadFile.name.substring(selectedUploadFile.name.lastIndexOf('.')) || '.webp'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                        Cover Image Alt Text (SEO &amp; Screen Readers):
                      </label>
                      <input
                        type="text"
                        value={customAltInput}
                        onChange={(e) => setCustomAltInput(e.target.value)}
                        placeholder="e.g. VH Accounting corporate business website dashboard mockup"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1.5px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#0F172A',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={handleExecuteUpload}
                        disabled={isUploading}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: '#1833FE',
                          color: '#FFFFFF',
                          fontSize: '0.825rem',
                          fontWeight: 700,
                          cursor: isUploading ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {isUploading ? 'Uploading...' : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span>Save &amp; Set as Cover</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelSelectedFile}
                        disabled={isUploading}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#475569',
                          fontSize: '0.825rem',
                          fontWeight: 600,
                          cursor: isUploading ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Cover Main Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 320px) 1fr', gap: '2rem', alignItems: 'start' }}>
                {/* Left: Preview & Browse Button */}
                <div
                  style={{
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '16px',
                    padding: '12px',
                    backgroundColor: '#F8FAFC',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '180px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#F1F5F9',
                    }}
                  >
                    {coverImage && coverImage.trim() ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={blobPreviewMap[coverImage] || coverImage}
                        alt={imageAlt || "Cover Preview"}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          if (coverImage && !img.src.includes('/api/media/')) {
                            const filename = coverImage.split('?')[0].split('/').pop();
                            if (filename) img.src = `/api/media/${encodeURIComponent(filename)}`;
                          }
                        }}
                      />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', gap: '6px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>No Cover Image Selected</span>
                      </div>
                    )}
                  </div>

                  <input
                    id="cover-file-input"
                    type="file"
                    accept="image/webp,image/png,image/jpeg,image/svg+xml,image/gif,image/avif"
                    style={{ display: 'none' }}
                    onChange={(e) => handleSelectFileToUpload(e.target.files, 'cover')}
                  />

                  <button
                    type="button"
                    onClick={() => document.getElementById('cover-file-input')?.click()}
                    style={{
                      width: '100%',
                      padding: '9px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      color: '#1833FE',
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Upload Image from Device</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      fetchMediaList();
                      setAssetPickerTarget('cover');
                      setIsAssetPickerOpen(true);
                    }}
                    style={{
                      width: '100%',
                      padding: '9px 14px',
                      marginTop: '8px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                      color: '#1E293B',
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Select from Existing</span>
                  </button>
                </div>

                {/* Right: Dropdown, Direct URL Field, & Alt Text Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>Select from Public Assets Library</label>
                    <CustomDropdown
                      value={mediaList.some((m) => m.url === coverImage) ? coverImage : ''}
                      onChange={(val) => {
                        if (val) setCoverImage(val);
                      }}
                      options={[
                        { label: '— Choose an existing image from /public/portfolio —', value: '' },
                        ...mediaList.map((m) => ({
                          label: `${m.filename} (${(m.size / 1024).toFixed(0)} KB)`,
                          value: m.url,
                        })),
                      ]}
                      placeholder="Select image from public/portfolio..."
                      size="form"
                      fullWidth
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Or Enter Direct URL / File Path</label>
                    <input
                      type="text"
                      placeholder="/portfolio/7d-design-studios.webp"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Cover Image Alt Text <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748B' }}>(Descriptive text for SEO &amp; Accessibility)</span>
                    </label>
                    <input
                      type="text"
                      placeholder={`e.g. ${title || 'Project'} corporate website mockup`}
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Slider Showcase Card */}
            <div
              style={{
                backgroundColor: 'transparent',
                borderRadius: '20px',
                border: 'none',
                padding: '0.5rem 0',
                boxShadow: 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                  Public Hero Showcase Image Slider ({sliderImages.length})
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#EFF6FF', color: '#1833FE', padding: '4px 12px', borderRadius: '12px', fontWeight: 700 }}>
                  Recommended: 1200 × 600 px • 2:1 Ratio
                </span>
              </div>
              <p style={{ margin: '0 0 1.75rem 0', fontSize: '0.85rem', color: '#64748B' }}>
                Multiple high-resolution screenshots displayed in the hero carousel on <code>/portfolio/[slug]</code>. Recommended image dimensions: <strong>1200 × 600 px</strong> (or 2:1 aspect ratio).
              </p>

              {/* Slider Pre-upload renaming box */}
              {selectedUploadFile && uploadTarget === 'slider' && (
                <div
                  style={{
                    marginBottom: '1.75rem',
                    border: '1.5px solid #BFDBFE',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    backgroundColor: '#F0F9FF',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(120px, 150px) 1fr',
                    gap: '1.5rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '110px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    {uploadFilePreview && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={uploadFilePreview}
                        alt="Selected File Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                        color: '#FFFFFF',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '2px 5px',
                        borderRadius: '4px',
                      }}
                    >
                      {(selectedUploadFile.size / 1024).toFixed(0)} KB
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                        Modify Image Filename before saving to <code>public/portfolio/</code>:
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="text"
                          value={customFilenameInput}
                          onChange={(e) => setCustomFilenameInput(e.target.value)}
                          placeholder="e.g. project-slide-2"
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1.5px solid #3B82F6',
                            backgroundColor: '#FFFFFF',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#0F172A',
                            outline: 'none',
                          }}
                        />
                        <span
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: '#E0F2FE',
                            color: '#0369A1',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                          }}
                        >
                          {selectedUploadFile.name.substring(selectedUploadFile.name.lastIndexOf('.')) || '.webp'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                        Slide Image Alt Text (SEO &amp; Accessibility):
                      </label>
                      <input
                        type="text"
                        value={customAltInput}
                        onChange={(e) => setCustomAltInput(e.target.value)}
                        placeholder="e.g. VH Accounting analytics reports screen"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1.5px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#0F172A',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={handleExecuteUpload}
                        disabled={isUploading}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: '#1833FE',
                          color: '#FFFFFF',
                          fontSize: '0.825rem',
                          fontWeight: 700,
                          cursor: isUploading ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        {isUploading ? (
                          <>
                            <span
                              style={{
                                width: '12px',
                                height: '12px',
                                border: '2px solid #FFFFFF',
                                borderTopColor: 'transparent',
                                borderRadius: '50%',
                                display: 'inline-block',
                                animation: 'spin 0.8s linear infinite',
                              }}
                            />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            <span>Save &amp; Add to Slider</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelSelectedFile}
                        disabled={isUploading}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#475569',
                          fontSize: '0.825rem',
                          fontWeight: 600,
                          cursor: isUploading ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Slide Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '1.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Image URL (e.g. /portfolio/vh-accounting.webp)"
                  value={newSliderUrl}
                  onChange={(e) => setNewSliderUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSliderImage();
                    }
                  }}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Image Alt Text (e.g. VH Accounting Features)"
                  value={newSliderAlt}
                  onChange={(e) => setNewSliderAlt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSliderImage();
                    }
                  }}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={handleAddSliderImage}
                  style={{
                    padding: '11px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#1833FE',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  + Add URL Slide
                </button>
              </div>

              {/* Upload Slide Button & Select Existing Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <input
                  id="slider-file-input"
                  type="file"
                  accept="image/webp,image/png,image/jpeg,image/svg+xml,image/gif,image/avif"
                  style={{ display: 'none' }}
                  onChange={(e) => handleSelectFileToUpload(e.target.files, 'slider')}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('slider-file-input')?.click()}
                  style={{
                    padding: '11px 18px',
                    borderRadius: '12px',
                    border: '1.5px solid #BFDBFE',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span>Upload Slide File</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    fetchMediaList();
                    setAssetPickerTarget('slider');
                    setSelectedAssetUrls([]);
                    setIsAssetPickerOpen(true);
                  }}
                  style={{
                    padding: '11px 18px',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#1E293B',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Select from Existing</span>
                </button>
              </div>

              {/* Slider Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {sliderImages.length === 0 ? (
                  <div
                    style={{
                      gridColumn: '1 / -1',
                      padding: '2.5rem 1.5rem',
                      textAlign: 'center',
                      border: '2px dashed #CBD5E1',
                      borderRadius: '16px',
                      backgroundColor: '#F8FAFC',
                      color: '#64748B',
                    }}
                  >
                    <div style={{ marginBottom: '8px', color: '#94A3B8', display: 'flex', justifyContent: 'center' }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1E293B', marginBottom: '4px' }}>No Slider Images Added Yet</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Add screenshot URLs, upload slide files from your device, or pick from the existing library above.</div>
                  </div>
                ) : (
                  sliderImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: '1.5px solid #E2E8F0',
                      borderRadius: '16px',
                      padding: '12px',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '145px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#F1F5F9',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blobPreviewMap[imgUrl] || imgUrl}
                        alt={imageAlts[idx] || `Slide ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          if (imgUrl && !img.src.includes('/api/media/')) {
                            const filename = imgUrl.split('?')[0].split('/').pop();
                            if (filename) img.src = `/api/media/${encodeURIComponent(filename)}`;
                          }
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          backgroundColor: 'rgba(15, 23, 42, 0.85)',
                          color: '#FFFFFF',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: '8px',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        Slide #{idx + 1}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input
                        type="text"
                        value={imgUrl}
                        placeholder="Image URL..."
                        onChange={(e) => {
                          const updated = [...sliderImages];
                          updated[idx] = e.target.value;
                          setSliderImages(updated);
                        }}
                        style={{
                          width: '100%',
                          fontSize: '0.775rem',
                          padding: '7px 10px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#F8FAFC',
                          fontFamily: 'monospace',
                          boxSizing: 'border-box',
                        }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="text"
                          placeholder={`Alt text for slide #${idx + 1}...`}
                          value={imageAlts[idx] || ''}
                          onChange={(e) => {
                            const updated = [...imageAlts];
                            updated[idx] = e.target.value;
                            setImageAlts(updated);
                          }}
                          style={{
                            flex: 1,
                            fontSize: '0.8rem',
                            padding: '7px 10px',
                            borderRadius: '8px',
                            border: '1.5px solid #E2E8F0',
                            backgroundColor: '#FFFFFF',
                            color: '#0F172A',
                            boxSizing: 'border-box',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSliderImage(idx)}
                          style={{
                            padding: '7px 10px',
                            borderRadius: '8px',
                            border: '1px solid #FECACA',
                            backgroundColor: '#FEF2F2',
                            color: '#DC2626',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          aria-label="Remove slide"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: NARRATIVE & BULLETS                                   */}
        {/* ============================================================ */}
        {activeTab === 'narrative' && (
          <div
            style={{
              backgroundColor: 'transparent',
              borderRadius: '20px',
              border: 'none',
              padding: '0.5rem 0',
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.25rem',
            }}
          >
            {/* Summary */}
            <div>
              <label style={labelStyle}>
                Summary / Card Description <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: '#64748B' }}>
                Short 1-2 sentence hook shown on the portfolio card and Google search snippets.
              </p>
              <textarea
                rows={3}
                placeholder="A portfolio and service website for an interior design studio, showcasing their work and expertise."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, lineHeight: '1.5' }}
              />
            </div>

            {/* Story */}
            <div>
              <label style={labelStyle}>
                Full Case Study Story / In-Depth Narrative
              </label>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: '#64748B' }}>
                Detailed background, design process, and architectural decisions.
              </p>
              <textarea
                rows={6}
                placeholder="For 7D Design Studios, the website itself had to be a masterpiece of design. We created a visually stunning, minimalist portfolio platform..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ ...inputStyle, lineHeight: '1.6' }}
              />
            </div>

            {/* Challenges, Solutions, Results Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* Challenges */}
              <div style={{ border: '1.5px solid #FEE2E2', borderRadius: '16px', padding: '1.5rem', backgroundColor: '#FFFBFB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#991B1B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>The Challenge</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(setChallenges, challenges, 'challenge-input')}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid #FECACA',
                      backgroundColor: '#FFFFFF',
                      color: '#DC2626',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Add Point</span>
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {challenges.map((c, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                      <input
                        id={`challenge-input-${idx}`}
                        type="text"
                        placeholder={`Challenge #${idx + 1}`}
                        value={c}
                        onChange={(e) => handleBulletChange(setChallenges, challenges, idx, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddBullet(setChallenges, challenges, 'challenge-input', idx);
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.85rem',
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(setChallenges, challenges, idx)}
                        style={{ border: 'none', backgroundColor: 'transparent', color: '#94A3B8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '0 4px' }}
                        aria-label="Remove challenge point"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div style={{ border: '1.5px solid #DBEAFE', borderRadius: '16px', padding: '1.5rem', backgroundColor: '#F8FAFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
                      <line x1="9" y1="18" x2="15" y2="18" />
                      <line x1="10" y1="22" x2="14" y2="22" />
                      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                    </svg>
                    <span>Our Solution</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(setSolutions, solutions, 'solution-input')}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid #BFDBFE',
                      backgroundColor: '#FFFFFF',
                      color: '#1833FE',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Add Point</span>
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {solutions.map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                      <input
                        id={`solution-input-${idx}`}
                        type="text"
                        placeholder={`Solution #${idx + 1}`}
                        value={s}
                        onChange={(e) => handleBulletChange(setSolutions, solutions, idx, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddBullet(setSolutions, solutions, 'solution-input', idx);
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.85rem',
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(setSolutions, solutions, idx)}
                        style={{ border: 'none', backgroundColor: 'transparent', color: '#94A3B8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '0 4px' }}
                        aria-label="Remove solution point"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div style={{ border: '1.5px solid #D1FAE5', borderRadius: '16px', padding: '1.5rem', backgroundColor: '#F6FEF9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#065F46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                    <span>Key Results</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(setResults, results, 'result-input')}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid #A7F3D0',
                      backgroundColor: '#FFFFFF',
                      color: '#059669',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Add Metric</span>
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {results.map((r, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '6px' }}>
                      <input
                        id={`result-input-${idx}`}
                        type="text"
                        placeholder={`e.g. 100/100 Lighthouse Performance`}
                        value={r}
                        onChange={(e) => handleBulletChange(setResults, results, idx, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddBullet(setResults, results, 'result-input', idx);
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '10px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.85rem',
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(setResults, results, idx)}
                        style={{ border: 'none', backgroundColor: 'transparent', color: '#94A3B8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '0 4px' }}
                        aria-label="Remove metric point"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack Pills with Brand SVG Icons */}
            <div>
              <label style={labelStyle}>
                Tools & Technologies Powering This Project
              </label>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.8rem', color: '#64748B' }}>
                Select popular framework presets with official SVG icons or type custom technologies below.
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
                        padding: '7px 14px',
                        borderRadius: '20px',
                        border: isSelected ? '1.5px solid #1833FE' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? '#1833FE' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#334155',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {tech.icon({ size: 15, color: isSelected ? '#FFFFFF' : undefined })}
                      </span>
                      <span>{tech.name}</span>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
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
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => handleAddTech(techInput)}
                  style={{
                    padding: '11px 20px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Add Tag
                </button>
              </div>

              {/* Active Selected Technologies List */}
              {technologies.length > 0 && (
                <div style={{ marginTop: '14px', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Active Project Technologies ({technologies.length}):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '16px',
                          backgroundColor: '#0F172A',
                          color: '#FFFFFF',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                        }}
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tech)}
                          style={{
                            border: 'none',
                            background: 'none',
                            color: '#94A3B8',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                          aria-label={`Remove ${tech}`}
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
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SEO / AEO / GEO                                       */}
        {/* ============================================================ */}
        {activeTab === 'seo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* SEO */}
            <div
              style={{
                backgroundColor: 'transparent',
                borderRadius: '20px',
                border: 'none',
                padding: '0.5rem 0',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search Engine Optimization (SEO)</span>
              </h3>

              {/* Live SERP Snippet Preview */}
              <div
                style={{
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <span style={{ fontSize: '0.775rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '10px' }}>
                  Live Google Search Result Preview:
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                  <label style={{ ...labelStyle, margin: 0 }}>Meta Title</label>
                  <span style={{ fontSize: '0.75rem', color: metaTitle.length > 60 ? '#EF4444' : '#64748B', fontWeight: 600 }}>
                    {metaTitle.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="7D Design Studios - Modern Architecture & Interior Portfolio | TryangleTech"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Meta Description */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                  <label style={{ ...labelStyle, margin: 0 }}>Meta Description</label>
                  <span style={{ fontSize: '0.75rem', color: metaDescription.length > 160 ? '#EF4444' : '#64748B', fontWeight: 600 }}>
                    {metaDescription.length}/160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Case study on how TryangleTech engineered a minimalist, lightning-fast portfolio platform for 7D Design Studios..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  style={{ ...inputStyle, lineHeight: '1.5' }}
                />
              </div>

              {/* Canonical URL */}
              <div>
                <label style={labelStyle}>Canonical URL Override (Optional)</label>
                <input
                  type="url"
                  placeholder="https://tryangletech.com/portfolio/7d-design-studios"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* AEO (AI Engine Optimization) */}
            <div
              style={{
                backgroundColor: 'transparent',
                borderRadius: '20px',
                border: 'none',
                padding: '0.5rem 0',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5">
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
                    padding: '4px 12px',
                    borderRadius: '14px',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    fontWeight: 700,
                  }}
                >
                  LLM Citation Ready
                </span>
              </div>

              <div>
                <label style={labelStyle}>Direct Answer Summary for AI Crawlers</label>
                <textarea
                  rows={4}
                  placeholder="TryangleTech designed and developed a bespoke portfolio web application for 7D Design Studios using Next.js and Three.js..."
                  value={aeoSummary}
                  onChange={(e) => setAeoSummary(e.target.value)}
                  style={{ ...inputStyle, lineHeight: '1.5' }}
                />
              </div>
            </div>

            {/* GEO & Keywords */}
            <div
              style={{
                backgroundColor: 'transparent',
                borderRadius: '20px',
                border: 'none',
                padding: '0.5rem 0',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Generative Engine Optimization (GEO) & Semantic Keywords</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Target Geographic Scope / Region</label>
                  <input
                    type="text"
                    placeholder="e.g. Global, United States, India, UAE"
                    value={geoRegion}
                    onChange={(e) => setGeoRegion(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Focus Semantic Keywords ({keywords.length})</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
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
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddKeyword(keywordInput)}
                      aria-label="Add keyword"
                      style={{
                        padding: '0 18px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: '#1833FE',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {keywords.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '16px',
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        color: '#1833FE',
                        fontSize: '0.78rem',
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
                          padding: 0,
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}
                        aria-label={`Remove ${kw}`}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: DYNAMIC FAQS                                          */}
        {/* ============================================================ */}
        {activeTab === 'faqs' && (
          <div
            style={{
              backgroundColor: 'transparent',
              borderRadius: '20px',
              border: 'none',
              padding: '0.5rem 0',
              boxShadow: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            {/* Header & Quick Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid #E2E8F0' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#1833FE', border: '1px solid #BFDBFE' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </span>
                  <span>Dynamic Case Study FAQs</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#EFF6FF', color: '#1833FE', padding: '2px 10px', borderRadius: '10px', border: '1px solid #BFDBFE' }}>
                    {faqs.length} FAQs
                  </span>
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.825rem', color: '#64748B' }}>
                  Add project-specific questions and answers to highlight custom deliverables, or load default FAQs from the database.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleLoadDefaultFaqs}
                  disabled={isLoadingDefaults}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 14px',
                    borderRadius: '9px',
                    border: '1.5px solid #BFDBFE',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    fontSize: '0.815rem',
                    fontWeight: 700,
                    cursor: isLoadingDefaults ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                    opacity: isLoadingDefaults ? 0.7 : 1,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1833FE">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span>{isLoadingDefaults ? 'Loading...' : 'Load Default FAQs'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddFaq}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '9px',
                    border: 'none',
                    backgroundColor: '#1833FE',
                    color: '#FFFFFF',
                    fontSize: '0.815rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(24, 51, 254, 0.25)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Add Question</span>
                </button>
              </div>
            </div>

            {/* Empty State */}
            {faqs.length === 0 ? (
              <div style={{ padding: '3.5rem 2rem', textAlign: 'center', backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1.5px dashed #CBD5E1' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1833FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                  No Custom FAQs Added Yet
                </h4>
                <p style={{ margin: '0 auto 20px auto', maxWidth: '480px', fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6 }}>
                  This project currently falls back to the main portfolio default FAQs stored in the database. You can load and modify them, or write customized questions.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleLoadDefaultFaqs}
                    disabled={isLoadingDefaults}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '9px 18px',
                      borderRadius: '10px',
                      border: '1.5px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      color: '#1833FE',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#1833FE">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span>Load Default FAQs</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '9px 18px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Write Custom FAQ</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1.25rem 1.5rem',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {/* Card Top Row with Pill, Info & Action Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1833FE', backgroundColor: '#EFF6FF', padding: '4px 10px', borderRadius: '7px', border: '1px solid #BFDBFE' }}>
                          Question #{idx + 1}
                        </span>
                        <span style={{ fontSize: '0.775rem', color: '#94A3B8', fontWeight: 500 }}>
                          Item {idx + 1} of {faqs.length}
                        </span>
                      </div>

                      {/* Reorder and Remove Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleMoveFaqUp(idx)}
                          disabled={idx === 0}
                          title="Move question up"
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '7px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: idx === 0 ? '#F8FAFC' : '#FFFFFF',
                            color: idx === 0 ? '#CBD5E1' : '#475569',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveFaqDown(idx)}
                          disabled={idx === faqs.length - 1}
                          title="Move question down"
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '7px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: idx === faqs.length - 1 ? '#F8FAFC' : '#FFFFFF',
                            color: idx === faqs.length - 1 ? '#CBD5E1' : '#475569',
                            cursor: idx === faqs.length - 1 ? 'not-allowed' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: '7px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            marginLeft: '4px',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.785rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                        Question Heading
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. What were the specific engineering challenges in this project?"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                        style={{
                          ...inputStyle,
                          backgroundColor: '#F8FAFC',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          padding: '9px 12px',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.785rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                        Answer Explanation
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detailed answer explaining the solution, architecture, and deliverables..."
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                        style={{
                          ...inputStyle,
                          backgroundColor: '#F8FAFC',
                          lineHeight: '1.5',
                          fontSize: '0.85rem',
                          padding: '9px 12px',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sticky Bottom Save Bar */}
        <div
          style={{
            marginTop: '2.5rem',
            padding: '1.25rem 2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '18px',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>
                   </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              href="/superadmin/portfolio"
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1.5px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
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

      {/* Asset Picker Modal */}
      {isAssetPickerOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1.5rem',
          }}
          onClick={() => setIsAssetPickerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '860px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              border: '1px solid #E2E8F0',
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                  Select from Existing Assets {assetPickerTarget === 'cover' ? '(Cover Image)' : '(Hero Showcase Slider)'}
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                  Pick existing images from <code>/public/portfolio/</code>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAssetPickerOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748B',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
                aria-label="Close asset picker"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Search Filter Toolbar */}
            <div style={{ padding: '1rem 1.75rem', borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search assets by filename (e.g. 7d, devrshree, vh)..."
                  value={assetPickerSearch}
                  onChange={(e) => setAssetPickerSearch(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 34px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none',
                    color: '#0F172A',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>
                {mediaList.filter((m) => m.filename.toLowerCase().includes(assetPickerSearch.toLowerCase())).length} Assets
              </span>
            </div>

            {/* Assets Grid */}
            <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
              {mediaList
                .filter((asset) => asset.filename.toLowerCase().includes(assetPickerSearch.toLowerCase()))
                .map((asset) => {
                  const isCover = coverImage === asset.url;
                  const isInSlider = sliderImages.includes(asset.url);
                  const isSelected = selectedAssetUrls.includes(asset.url);

                  return (
                    <div
                      key={asset.filename}
                      onClick={() => {
                        if (assetPickerTarget === 'cover') {
                          setCoverImage(asset.url);
                          setIsAssetPickerOpen(false);
                        } else {
                          if (isSelected) {
                            setSelectedAssetUrls(selectedAssetUrls.filter((u) => u !== asset.url));
                          } else {
                            setSelectedAssetUrls([...selectedAssetUrls, asset.url]);
                          }
                        }
                      }}
                      style={{
                        border: (assetPickerTarget === 'cover' ? isCover : isSelected || isInSlider)
                          ? '2px solid #1833FE'
                          : '1px solid #E2E8F0',
                        borderRadius: '12px',
                        padding: '8px',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        position: 'relative',
                        transition: 'all 0.15s ease',
                        boxShadow: (assetPickerTarget === 'cover' ? isCover : isSelected)
                          ? '0 4px 12px rgba(24, 51, 254, 0.15)'
                          : '0 1px 3px rgba(0,0,0,0.02)',
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#F1F5F9' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={blobPreviewMap[asset.url] || asset.url}
                          alt={asset.filename}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            if (asset.filename && !img.src.includes('/api/media/')) {
                              img.src = `/api/media/${encodeURIComponent(asset.filename)}`;
                            }
                          }}
                        />
                        {assetPickerTarget === 'cover' && isCover && (
                          <span style={{ position: 'absolute', top: '4px', left: '4px', backgroundColor: '#1833FE', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                            Current Cover
                          </span>
                        )}
                        {assetPickerTarget === 'slider' && isInSlider && (
                          <span style={{ position: 'absolute', top: '4px', left: '4px', backgroundColor: '#059669', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                            In Slider
                          </span>
                        )}
                        {assetPickerTarget === 'slider' && isSelected && !isInSlider && (
                          <span style={{ position: 'absolute', top: '4px', right: '4px', backgroundColor: '#1833FE', color: '#FFFFFF', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        )}
                      </div>

                      <div style={{ overflow: 'hidden' }}>
                        <p style={{ margin: 0, fontSize: '0.775rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={asset.filename}>
                          {asset.filename}
                        </p>
                        <span style={{ fontSize: '0.675rem', color: '#64748B' }}>
                          {(asset.size / 1024).toFixed(0)} KB
                        </span>
                      </div>

                      {assetPickerTarget === 'cover' ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCoverImage(asset.url);
                            setIsAssetPickerOpen(false);
                          }}
                          style={{
                            padding: '5px 8px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: isCover ? '#EFF6FF' : '#1833FE',
                            color: isCover ? '#1833FE' : '#FFFFFF',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                          }}
                        >
                          {isCover ? (
                            <>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>Active Cover</span>
                            </>
                          ) : (
                            'Select Cover'
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isInSlider) {
                              setSliderImages([...sliderImages, asset.url]);
                            }
                          }}
                          disabled={isInSlider}
                          style={{
                            padding: '5px 8px',
                            borderRadius: '6px',
                            border: isInSlider ? '1px solid #E2E8F0' : 'none',
                            backgroundColor: isInSlider ? '#F1F5F9' : '#EFF6FF',
                            color: isInSlider ? '#94A3B8' : '#1833FE',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            cursor: isInSlider ? 'default' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                          }}
                        >
                          {isInSlider ? (
                            <>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>In Slider</span>
                            </>
                          ) : (
                            '+ Add Slide'
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1.25rem 1.75rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
              <button
                type="button"
                onClick={() => setIsAssetPickerOpen(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>

              {assetPickerTarget === 'slider' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.825rem', color: '#64748B', fontWeight: 600 }}>
                    {selectedAssetUrls.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedAssetUrls.length > 0) {
                        const newImages = [...sliderImages];
                        selectedAssetUrls.forEach((u) => {
                          if (!newImages.includes(u)) newImages.push(u);
                        });
                        setSliderImages(newImages);
                        setSelectedAssetUrls([]);
                        setIsAssetPickerOpen(false);
                      }
                    }}
                    disabled={selectedAssetUrls.length === 0}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: selectedAssetUrls.length > 0 ? '#1833FE' : '#CBD5E1',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: selectedAssetUrls.length > 0 ? 'pointer' : 'not-allowed',
                      boxShadow: selectedAssetUrls.length > 0 ? '0 2px 8px rgba(24, 51, 254, 0.25)' : 'none',
                    }}
                  >
                    Add Selected ({selectedAssetUrls.length}) to Slider
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioEditorPage() {
  return (
    <PortfolioProvider>
      <Suspense
        fallback={
          <div style={{ padding: '5rem 2rem', textAlign: 'center', color: '#64748B' }}>
            <p style={{ fontSize: '1.05rem', fontWeight: 700 }}>Loading editor...</p>
          </div>
        }
      >
        <PortfolioEditorInner />
      </Suspense>
    </PortfolioProvider>
  );
}
