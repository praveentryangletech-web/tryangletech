'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogPostItem, BLOG_CATEGORIES, generateBlogSlug } from '@/backend/services/blog';
import { apiClient } from '@/app/superadmin/utils/apiClient';
import CustomDropdown from '@/app/superadmin/components/CustomDropdown';

interface MediaAssetItem {
  filename: string;
  url: string;
  size: number;
  updatedAt: string;
}

function BlogEditorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const isEditMode = Boolean(postId);

  const [activeTab, setActiveTab] = useState<'general' | 'media' | 'narrative' | 'seo'>('general');
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  // 1. General & Author
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState<string>('Web Development');
  const [authorName, setAuthorName] = useState('TryangleTech Team');
  const [authorRole, setAuthorRole] = useState('Content Creators');
  const [authorImage, setAuthorImage] = useState('/blog-post-assets/692578de4ba3fb26b16f1dd7_blog-nine.webp');
  const [authorBio, setAuthorBio] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [published, setPublished] = useState(true);
  const [publishedAt, setPublishedAt] = useState<string>(() => formatForDateTimeInput());
  const [order, setOrder] = useState<number>(0);

  // 2. Media
  const [coverImage, setCoverImage] = useState('');
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [newSliderUrl, setNewSliderUrl] = useState('');

  // Media Library Management State
  const [mediaList, setMediaList] = useState<MediaAssetItem[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<'cover' | 'slider' | 'contentImage1' | 'contentImage2' | 'authorImage'>('cover');
  const [uploadFeedback, setUploadFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Pre-upload rename states
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);
  const [uploadFilePreview, setUploadFilePreview] = useState<string | null>(null);
  const [customFilenameInput, setCustomFilenameInput] = useState('');
  const [blobPreviewMap, setBlobPreviewMap] = useState<Record<string, string>>({});

  // Asset Picker Modal State
  const [isAssetPickerOpen, setIsAssetPickerOpen] = useState(false);
  const [assetPickerTarget, setAssetPickerTarget] = useState<'cover' | 'slider' | 'contentImage1' | 'contentImage2' | 'authorImage'>('cover');
  const [assetPickerSearch, setAssetPickerSearch] = useState('');
  const [selectedAssetUrls, setSelectedAssetUrls] = useState<string[]>([]);

  // 3. Section-Wise Content
  const [excerpt, setExcerpt] = useState('');
  // Section 1: Intro Story
  const [section1Heading, setSection1Heading] = useState('Blending human creativity with machine Intelligence');
  const [section1Paragraph1, setSection1Paragraph1] = useState('');
  const [section1Paragraph2, setSection1Paragraph2] = useState('');
  // Section 2: Highlight Quote Box
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('Tanya Erin');
  // Section 3: Key Steps
  const [stepsTitle, setStepsTitle] = useState('Steps to integrate AI with creative workflows');
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState('');
  // Section 4: Mid-Article Images
  const [contentImage1, setContentImage1] = useState('');
  const [contentImage2, setContentImage2] = useState('');
  // Section 5: Conclusion & Takeaways
  const [conclusionTitle, setConclusionTitle] = useState('The future of human-AI collaboration');
  const [conclusionBody, setConclusionBody] = useState('');
  const [conclusionPoints, setConclusionPoints] = useState<string[]>([
    'AI-powered tools enhance creative workflows.',
    'Data-driven insights inform better decisions.',
    'Collaboration between humans and AI accelerates innovation.',
    'Future solutions will be smarter, faster, and more imaginative.',
  ]);
  const [newPointInput, setNewPointInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  // 4. SEO & AEO Engine
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  // Fetch Media Assets
  const fetchMediaList = async () => {
    setIsLoadingMedia(true);
    try {
      const res = await fetch('/api/superadmin/media');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMediaList(data.data);
      }
    } catch {} finally {
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

  const handleSelectFileToUpload = (files: FileList | null, target: 'cover' | 'slider' | 'contentImage1' | 'contentImage2' | 'authorImage' = 'cover') => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadTarget(target);
    setSelectedUploadFile(file);

    const lastDot = file.name.lastIndexOf('.');
    const baseName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
    const cleanBase = baseName
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    setCustomFilenameInput(cleanBase || 'article-media');

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
        text: `Asset "${data.filename}" uploaded successfully!`,
      });

      if (uploadTarget === 'cover') {
        setCoverImage(data.url);
      } else if (uploadTarget === 'slider') {
        if (!sliderImages.includes(data.url)) {
          setSliderImages((prev) => [...prev, data.url]);
        }
      } else if (uploadTarget === 'contentImage1') {
        setContentImage1(data.url);
      } else if (uploadTarget === 'contentImage2') {
        setContentImage2(data.url);
      } else if (uploadTarget === 'authorImage') {
        setAuthorImage(data.url);
      }

      if (uploadFilePreview) {
        const previewUrl = uploadFilePreview;
        setBlobPreviewMap((prev) => ({ ...prev, [data.url]: previewUrl }));
      }

      setSelectedUploadFile(null);
      setCustomFilenameInput('');
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
    setUploadFilePreview(null);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManual && !isEditMode) {
      setSlug(generateBlogSlug(val));
    }
  };

  // Load existing article if edit mode
  useEffect(() => {
    if (!postId) {
      setIsLoading(false);
      return;
    }

    async function loadPost() {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const res = await apiClient.get<BlogPostItem>(`/api/blog?id=${encodeURIComponent(postId!)}`);
        if (res.success && res.data) {
          const p = res.data;
          setTitle(p.title || '');
          setSlug(p.slug || '');
          setIsSlugManual(true);
          setCategory(p.category || 'Web Development');
          setAuthorName(p.authorName || 'TryangleTech Team');
          setAuthorRole(p.authorRole || 'Content Creators');
          setAuthorImage(p.authorImage || '/blog-post-assets/692578de4ba3fb26b16f1dd7_blog-nine.webp');
          setAuthorBio(p.authorBio || '');
          setReadTime(p.readTime || '5 min read');
          setPublished(p.published);
          setPublishedAt(formatForDateTimeInput(p.publishedAt || p.createdAt));
          setOrder(p.order || 0);

          setCoverImage(p.coverImage || '');
          setSliderImages(p.images && p.images.length > 0 ? p.images : (p.coverImage ? [p.coverImage] : []));

          setExcerpt(p.excerpt || '');
          // Section 1
          setSection1Heading(p.section1Heading || p.title || 'Blending human creativity with machine Intelligence');
          setSection1Paragraph1(p.section1Paragraph1 || p.content || '');
          setSection1Paragraph2(p.section1Paragraph2 || '');
          // Section 2
          setQuoteText(p.quoteText || '');
          setQuoteAuthor(p.quoteAuthor || 'Tanya Erin');
          // Section 3
          setStepsTitle(p.stepsTitle || 'Steps to integrate AI with creative workflows');
          setStep1(p.step1 || '');
          setStep2(p.step2 || '');
          // Section 4
          setContentImage1(p.contentImage1 || '');
          setContentImage2(p.contentImage2 || '');
          // Section 5
          setConclusionTitle(p.conclusionTitle || 'The future of human-AI collaboration');
          setConclusionBody(p.conclusionBody || '');
          setConclusionPoints(p.conclusionPoints && p.conclusionPoints.length > 0 ? p.conclusionPoints : [
            'AI-powered tools enhance creative workflows.',
            'Data-driven insights inform better decisions.',
            'Collaboration between humans and AI accelerates innovation.',
            'Future solutions will be smarter, faster, and more imaginative.',
          ]);

          const loadedKeywords = (p.keywords && p.keywords.length > 0) ? p.keywords : (p.tags || []);
          setKeywords(loadedKeywords);
          setTags(loadedKeywords);

          setMetaTitle(p.metaTitle || p.title || '');
          setMetaDescription(p.metaDescription || p.excerpt || '');
          setCanonicalUrl(p.canonicalUrl || '');
        } else {
          setErrorMessage(res.error || 'Failed to load article details.');
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'Error loading article.');
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [postId]);

  const handleAddSliderImage = () => {
    if (newSliderUrl.trim() && !sliderImages.includes(newSliderUrl.trim())) {
      setSliderImages([...sliderImages, newSliderUrl.trim()]);
      setNewSliderUrl('');
    }
  };

  const handleRemoveSliderImage = (index: number) => {
    setSliderImages(sliderImages.filter((_, i) => i !== index));
  };

  const handleAddPoint = () => {
    if (newPointInput.trim()) {
      setConclusionPoints([...conclusionPoints, newPointInput.trim()]);
      setNewPointInput('');
    }
  };

  const handleRemovePoint = (index: number) => {
    setConclusionPoints(conclusionPoints.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
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

  const handleSave = async (e?: React.FormEvent, overridePublished?: boolean) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Article Title is required.');
      setActiveTab('general');
      return;
    }

    const finalPublished = typeof overridePublished === 'boolean' ? overridePublished : published;
    if (typeof overridePublished === 'boolean') {
      setPublished(overridePublished);
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload: Partial<BlogPostItem> = {
        title: title.trim(),
        slug: slug.trim() || generateBlogSlug(title),
        category,
        authorName: authorName.trim(),
        authorRole: authorRole.trim(),
        authorImage: authorImage.trim(),
        authorBio: authorBio.trim(),
        readTime: readTime.trim(),
        published: finalPublished,
        publishedAt: new Date(publishedAt).toISOString(),
        order,
        coverImage: coverImage.trim(),
        images: sliderImages,
        excerpt: excerpt.trim(),
        content: section1Paragraph1.trim(),
        section1Heading: section1Heading.trim(),
        section1Paragraph1: section1Paragraph1.trim(),
        section1Paragraph2: section1Paragraph2.trim(),
        quoteText: quoteText.trim(),
        quoteAuthor: quoteAuthor.trim(),
        stepsTitle: stepsTitle.trim(),
        step1: step1.trim(),
        step2: step2.trim(),
        contentImage1: contentImage1.trim(),
        contentImage2: contentImage2.trim(),
        conclusionTitle: conclusionTitle.trim(),
        conclusionBody: conclusionBody.trim(),
        conclusionPoints,
        tags: keywords,
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
        canonicalUrl: canonicalUrl.trim(),
        keywords,
      };

      if (isEditMode) {
        const res = await apiClient.patch('/api/blog', { id: postId, ...payload });
        if (!res.success) throw new Error(res.error || 'Failed to update article.');
        apiClient.clearCache();
        setSuccessMessage(finalPublished ? '✅ Article updated & published live!' : '📝 Article updated & saved as Draft!');
        setTimeout(() => {
          router.push('/superadmin/blog');
        }, 1000);
      } else {
        const res = await apiClient.post<BlogPostItem>('/api/blog', payload);
        if (!res.success) throw new Error(res.error || 'Failed to create article.');
        apiClient.clearCache();
        setSuccessMessage(finalPublished ? '🚀 Article published live on public website!' : '📝 Article created & saved as Draft!');
        setTimeout(() => {
          router.push('/superadmin/blog');
        }, 1000);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.825rem',
    fontWeight: 700,
    color: '#334155',
    marginBottom: '7px',
  };

  if (isLoading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
        <style>{`
          @keyframes agyPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .agy-skeleton {
            background-color: #E2E8F0;
            border-radius: 8px;
            animation: agyPulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>

        {/* Header Toolbar Skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="agy-skeleton" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="agy-skeleton" style={{ width: '220px', height: '28px', borderRadius: '6px' }} />
              <div className="agy-skeleton" style={{ width: '340px', height: '16px', borderRadius: '4px' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="agy-skeleton" style={{ width: '120px', height: '42px', borderRadius: '10px' }} />
            <div className="agy-skeleton" style={{ width: '140px', height: '42px', borderRadius: '10px' }} />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E2E8F0', paddingBottom: '12px', marginBottom: '2rem' }}>
          <div className="agy-skeleton" style={{ width: '160px', height: '36px', borderRadius: '8px' }} />
          <div className="agy-skeleton" style={{ width: '140px', height: '36px', borderRadius: '8px' }} />
          <div className="agy-skeleton" style={{ width: '170px', height: '36px', borderRadius: '8px' }} />
          <div className="agy-skeleton" style={{ width: '130px', height: '36px', borderRadius: '8px' }} />
        </div>

        {/* Form Main Card Skeleton */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          {/* Title & Category Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <div>
              <div className="agy-skeleton" style={{ width: '100px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '46px', borderRadius: '10px' }} />
            </div>
            <div>
              <div className="agy-skeleton" style={{ width: '90px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '46px', borderRadius: '10px' }} />
            </div>
          </div>

          {/* URL Slug */}
          <div>
            <div className="agy-skeleton" style={{ width: '120px', height: '14px', marginBottom: '8px' }} />
            <div className="agy-skeleton" style={{ width: '100%', height: '46px', borderRadius: '10px' }} />
          </div>

          {/* 2-Column Metadata (Date & Read Time) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div className="agy-skeleton" style={{ width: '110px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '46px', borderRadius: '10px' }} />
            </div>
            <div>
              <div className="agy-skeleton" style={{ width: '80px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '46px', borderRadius: '10px' }} />
            </div>
          </div>

          {/* 2-Column Author Info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div className="agy-skeleton" style={{ width: '95px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '46px', borderRadius: '10px' }} />
            </div>
            <div>
              <div className="agy-skeleton" style={{ width: '150px', height: '14px', marginBottom: '8px' }} />
              <div className="agy-skeleton" style={{ width: '100%', height: '46px', borderRadius: '10px' }} />
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
      {/* 1. Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            href="/superadmin/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              color: '#475569',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '1.65rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
                {isEditMode ? 'Edit Blog Article' : 'New Blog Article'}
              </h1>
              <span
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: published ? '#ECFDF5' : '#FEF3C7',
                  color: published ? '#047857' : '#B45309',
                  border: `1px solid ${published ? '#A7F3D0' : '#FDE68A'}`,
                }}
              >
                {published ? '● Live Published' : '● Draft Mode'}
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748B' }}>
              {isEditMode ? `Editing: ${title || 'Article'}` : 'Configure section-wise content, media showcase, draft status, and SEO.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {isEditMode && slug && (
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              style={{
                height: '42px',
                padding: '0 16px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                color: '#1833FE',
                border: '1.5px solid #BFDBFE',
                fontSize: '0.875rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
            >
              <span>View Live</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>
          )}

          {/* Option A: Save as Draft */}
          <button
            type="button"
            onClick={() => handleSave(undefined, false)}
            disabled={isSubmitting}
            style={{
              height: '42px',
              padding: '0 18px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              border: '1.5px solid #CBD5E1',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxSizing: 'border-box',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              transition: 'all 0.15s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>{isSubmitting ? 'Saving...' : 'Save Draft'}</span>
          </button>

          {/* Option B: Save & Publish Live */}
          <button
            type="button"
            onClick={() => handleSave(undefined, true)}
            disabled={isSubmitting}
            style={{
              height: '42px',
              padding: '0 22px',
              borderRadius: '10px',
              backgroundColor: '#1833FE',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxSizing: 'border-box',
              boxShadow: '0 4px 14px rgba(24, 51, 254, 0.3)',
              transition: 'all 0.15s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
            <span>{isSubmitting ? 'Publishing...' : isEditMode ? 'Update & Publish' : 'Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div style={{ padding: '0.875rem 1.25rem', backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#991B1B', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', fontWeight: 600 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div style={{ padding: '0.875rem 1.25rem', backgroundColor: '#ECFDF5', border: '1px solid #34D399', color: '#065F46', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', fontWeight: 600 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* 2. Tabs Navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E2E8F0', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { key: 'general', label: '1. General & Author' },
          { key: 'media', label: '2. Media Showcase & Slider' },
          { key: 'narrative', label: '3. Story & Sections' },
          { key: 'seo', label: '4. SEO & Search Engine' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: '12px 20px',
              fontSize: '0.925rem',
              fontWeight: activeTab === tab.key ? 700 : 500,
              color: activeTab === tab.key ? '#1833FE' : '#64748B',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.key ? '3px solid #1833FE' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Form Content */}
      <form onSubmit={handleSave}>
        {/* TAB 1: GENERAL */}
        {activeTab === 'general' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2.5rem', minHeight: '560px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>
                  Article Title <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Transforming businesses with innovative technology"
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
                  options={BLOG_CATEGORIES.map((c) => ({ value: c, label: c }))}
                  onChange={(val) => setCategory(val as string)}
                  direction="down"
                  size="form"
                  fullWidth
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                <label style={{ ...labelStyle, margin: 0 }}>
                  URL Slug <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Live Path: <code style={{ color: '#1833FE', fontWeight: 700, backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>/blog/{slug || 'article-slug'}</code>
                </span>
              </div>
              <input
                type="text"
                required
                placeholder="e.g. transforming-businesses"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setIsSlugManual(true);
                }}
                style={{ ...inputStyle, fontFamily: 'monospace' }}
              />
            </div>

            {/* Publishing & Article Metadata Row (Date & Read Time) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>
                  Publish Date & Time 📅
                </label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Read Time</label>
                <input
                  type="text"
                  placeholder="e.g. 5 min read"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Author Information Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Author Name</label>
                <input
                  type="text"
                  placeholder="e.g. TryangleTech Team"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Author Role / Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Content Creators"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MEDIA (COVER & SHOWCASE SLIDER) */}
        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* 1. Main Listing Cover Image Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #E2E8F0',
                padding: '2.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
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
                The primary card thumbnail displayed across blog listings and hero banners. Recommended image dimensions: <strong>800 × 500 px</strong> (or 16:10 aspect ratio).
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
                  }}
                >
                  <span>{uploadFeedback.text}</span>
                  <button
                    type="button"
                    onClick={() => setUploadFeedback(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 800 }}
                  >
                    ✕
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
                        Modify Image Filename before storing in <code>public/blog-assets/</code>:
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="text"
                          value={customFilenameInput}
                          onChange={(e) => setCustomFilenameInput(e.target.value)}
                          placeholder="e.g. blog-article-cover"
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
                        {isUploading ? 'Uploading...' : '🚀 Save & Set as Cover'}
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
                        alt="Cover Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          if (coverImage && !img.src.includes('/api/media/')) {
                            const filename = coverImage.split('?')[0].split('/').pop();
                            if (filename) {
                              img.src = `/api/media/${encodeURIComponent(filename)}`;
                            }
                          }
                        }}
                      />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', gap: '6px' }}>
                        <span style={{ fontSize: '1.75rem' }}>🖼️</span>
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
                    <span>📁</span>
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

                {/* Right: Dropdown & Direct URL Field */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>Select from Public Assets Library</label>
                    <CustomDropdown
                      value={mediaList.some((m) => m.url === coverImage) ? coverImage : ''}
                      onChange={(val) => {
                        if (val) setCoverImage(val);
                      }}
                      options={[
                        { label: '— Choose an existing image from Asset Library —', value: '' },
                        ...mediaList.map((m) => ({
                          label: `${m.filename} (${(m.size / 1024).toFixed(0)} KB)`,
                          value: m.url,
                        })),
                      ]}
                      placeholder="Select image from Asset Library..."
                      size="form"
                      fullWidth
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Or Enter Direct URL / File Path (Required Size: 820 × 490 px • 16:10 Ratio)</label>
                    <input
                      type="text"
                      placeholder="/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Slider Showcase Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #E2E8F0',
                padding: '2.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
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
                Multiple high-resolution screenshots displayed in the hero carousel on <code>/blog/[slug]</code>. Recommended image dimensions: <strong>1200 × 600 px</strong> (or 2:1 aspect ratio).
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
                        Modify Image Filename before saving to <code>public/blog-assets/</code>:
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="text"
                          value={customFilenameInput}
                          onChange={(e) => setCustomFilenameInput(e.target.value)}
                          placeholder="e.g. blog-slide-2"
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
                        {isUploading ? 'Uploading...' : '🚀 Save & Add to Slider'}
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', marginBottom: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Enter image URL or path (e.g. /blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png)"
                    value={newSliderUrl}
                    onChange={(e) => setNewSliderUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSliderImage();
                      }
                    }}
                    style={{ ...inputStyle, flex: 1 }}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                    <span>📁 Upload Slide File</span>
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
              </div>

              {/* Slider Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
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
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🖼️</div>
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
                        padding: '10px',
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
                          alt={`Slide ${idx + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            if (imgUrl && !img.src.includes('/api/media/')) {
                              const filename = imgUrl.split('?')[0].split('/').pop();
                              if (filename) {
                                img.src = `/api/media/${encodeURIComponent(filename)}`;
                              }
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
                            fontSize: '0.775rem',
                            padding: '7px 10px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            backgroundColor: '#F8FAFC',
                            fontFamily: 'monospace',
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
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STORY & DYNAMIC SECTIONS */}
        {activeTab === 'narrative' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Article Hook / Excerpt */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <label style={labelStyle}>Article Excerpt / Hook (Summary on Listing Cards) *</label>
              <textarea
                rows={2}
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Short 1-2 sentence hook shown on cards..."
                style={{ ...inputStyle, fontFamily: 'inherit' }}
              />
            </div>

            {/* Section 1: Main Story & Intro */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <span>Section 1: Main Introduction & Story</span>
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#EFF6FF', color: '#1833FE', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                  Top Section
                </span>
              </div>

              <div>
                <label style={labelStyle}>Section Heading</label>
                <input
                  type="text"
                  value={section1Heading}
                  onChange={(e) => setSection1Heading(e.target.value)}
                  placeholder="e.g. Blending human creativity with machine Intelligence"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Paragraph 1</label>
                <textarea
                  rows={4}
                  value={section1Paragraph1}
                  onChange={(e) => setSection1Paragraph1(e.target.value)}
                  placeholder="The combination of human creativity and AI intelligence unlocks new possibilities..."
                  style={{ ...inputStyle, fontFamily: 'inherit', lineHeight: 1.6 }}
                />
              </div>

              <div>
                <label style={labelStyle}>Paragraph 2</label>
                <textarea
                  rows={4}
                  value={section1Paragraph2}
                  onChange={(e) => setSection1Paragraph2(e.target.value)}
                  placeholder="By leveraging AI-powered analytics, generative models, and intelligent workflows..."
                  style={{ ...inputStyle, fontFamily: 'inherit', lineHeight: 1.6 }}
                />
              </div>
            </div>

            {/* Section 2: Highlight Quote Box */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 0 4-1 6-3 8" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 0 4-1 6-3 8" />
                  </svg>
                  <span>Section 2: Highlight Quote / Testimonial Box</span>
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#FDF2F8', color: '#DB2777', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                  Quote Overlay
                </span>
              </div>

              <div>
                <label style={labelStyle}>Quote Text</label>
                <textarea
                  rows={3}
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="Using this task management system has transformed how we work..."
                  style={{ ...inputStyle, fontFamily: 'inherit', lineHeight: 1.6 }}
                />
              </div>

              <div>
                <label style={labelStyle}>Quote Attributed Author / Source</label>
                <input
                  type="text"
                  value={quoteAuthor}
                  onChange={(e) => setQuoteAuthor(e.target.value)}
                  placeholder="e.g. Tanya Erin"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Section 3: Key Steps Section */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span>Section 3: Key Steps / Process Strategy</span>
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#F0FDF4', color: '#16A34A', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                  2 Columns
                </span>
              </div>

              <div>
                <label style={labelStyle}>Steps Section Heading</label>
                <input
                  type="text"
                  value={stepsTitle}
                  onChange={(e) => setStepsTitle(e.target.value)}
                  placeholder="e.g. Steps to integrate AI with creative workflows"
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Step 1 Description</label>
                  <textarea
                    rows={4}
                    value={step1}
                    onChange={(e) => setStep1(e.target.value)}
                    placeholder="Successful integration requires identifying areas where AI can assist..."
                    style={{ ...inputStyle, fontFamily: 'inherit', lineHeight: 1.6 }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Step 2 Description</label>
                  <textarea
                    rows={4}
                    value={step2}
                    onChange={(e) => setStep2(e.target.value)}
                    placeholder="Develop a step-by-step plan, including testing, monitoring, and continuous optimization..."
                    style={{ ...inputStyle, fontFamily: 'inherit', lineHeight: 1.6 }}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Mid-Article Image Showcase (2 Images) */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Section 4: Mid-Article Image Showcase (Side-by-Side)</span>
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#FEF3C7', color: '#D97706', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                  Card Size: 520 × 360 px (Recommended)
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {/* Image 1 */}
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', backgroundColor: '#F8FAFC' }}>
                  <label style={labelStyle}>
                    Left Image URL / Path
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', marginLeft: '6px' }}>
                      (Size: 520 × 360 px • ~16:11 ratio)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={contentImage1}
                    onChange={(e) => setContentImage1(e.target.value)}
                    placeholder="/blog-post-assets/... or https://..."
                    style={{ ...inputStyle, marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        fetchMediaList();
                        setAssetPickerTarget('contentImage1');
                        setIsAssetPickerOpen(true);
                      }}
                      style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#1833FE', color: '#FFF', border: 'none', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Pick from Assets
                    </button>
                    {contentImage1 && (
                      <button
                        type="button"
                        onClick={() => setContentImage1('')}
                        style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {contentImage1 && (
                    <div style={{ marginTop: '12px', height: '210px', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #E2E8F0', backgroundColor: '#FFFFFF', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={contentImage1}
                        alt="Preview 1"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          if (contentImage1 && !img.src.includes('/api/media/')) {
                            const filename = contentImage1.split('?')[0].split('/').pop();
                            if (filename) img.src = `/api/media/${encodeURIComponent(filename)}`;
                          }
                        }}
                      />
                      <span style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>
                        Left Card (520 × 360 px)
                      </span>
                    </div>
                  )}
                </div>

                {/* Image 2 */}
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', backgroundColor: '#F8FAFC' }}>
                  <label style={labelStyle}>
                    Right Image URL / Path
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', marginLeft: '6px' }}>
                      (Size: 520 × 360 px • ~16:11 ratio)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={contentImage2}
                    onChange={(e) => setContentImage2(e.target.value)}
                    placeholder="/blog-post-assets/... or https://..."
                    style={{ ...inputStyle, marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        fetchMediaList();
                        setAssetPickerTarget('contentImage2');
                        setIsAssetPickerOpen(true);
                      }}
                      style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#1833FE', color: '#FFF', border: 'none', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Pick from Assets
                    </button>
                    {contentImage2 && (
                      <button
                        type="button"
                        onClick={() => setContentImage2('')}
                        style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: '#FEE2E2', color: '#DC2626', border: 'none', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {contentImage2 && (
                    <div style={{ marginTop: '12px', height: '210px', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #E2E8F0', backgroundColor: '#FFFFFF', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={contentImage2}
                        alt="Preview 2"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          if (contentImage2 && !img.src.includes('/api/media/')) {
                            const filename = contentImage2.split('?')[0].split('/').pop();
                            if (filename) img.src = `/api/media/${encodeURIComponent(filename)}`;
                          }
                        }}
                      />
                      <span style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>
                        Right Card (520 × 360 px)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5: Conclusion & Future Outlook */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Section 5: Conclusion & Future Outlook</span>
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#F3E8FF', color: '#9333EA', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                  Takeaways & Bullets
                </span>
              </div>

              <div>
                <label style={labelStyle}>Conclusion Heading</label>
                <input
                  type="text"
                  value={conclusionTitle}
                  onChange={(e) => setConclusionTitle(e.target.value)}
                  placeholder="e.g. The future of human-AI collaboration"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Conclusion Body Paragraph</label>
                <textarea
                  rows={4}
                  value={conclusionBody}
                  onChange={(e) => setConclusionBody(e.target.value)}
                  placeholder="The collaboration of humans and AI will transform industries..."
                  style={{ ...inputStyle, fontFamily: 'inherit', lineHeight: 1.6 }}
                />
              </div>

              {/* Bullet Points List */}
              <div>
                <label style={labelStyle}>Key Takeaways (Bullet List)</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={newPointInput}
                    onChange={(e) => setNewPointInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPoint();
                      }
                    }}
                    placeholder="Enter key point bullet..."
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={handleAddPoint}
                    style={{ padding: '0 18px', borderRadius: '10px', backgroundColor: '#1833FE', color: '#FFF', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    + Add Point
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {conclusionPoints.map((pt, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <span style={{ color: '#1833FE', fontWeight: 800 }}>•</span>
                      <span style={{ flex: 1, fontSize: '0.85rem', color: '#1E293B' }}>{pt}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePoint(idx)}
                        style={{ border: 'none', background: 'none', color: '#DC2626', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '2px' }}
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

            {/* Section 6: Author Bio Footer */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Section 6: Author Bio Card (Article Footer)</span>
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#EFF6FF', color: '#1833FE', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                  Author Profile
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', backgroundColor: '#F8FAFC', textAlign: 'center' }}>
                  <label style={labelStyle}>Author Avatar Image</label>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 10px', backgroundColor: '#E2E8F0' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={authorImage || '/blog-post-assets/692578de4ba3fb26b16f1dd7_blog-nine.webp'}
                      alt="Author"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        if (authorImage && !img.src.includes('/api/media/')) {
                          const filename = authorImage.split('?')[0].split('/').pop();
                          if (filename) img.src = `/api/media/${encodeURIComponent(filename)}`;
                        }
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={authorImage}
                    onChange={(e) => setAuthorImage(e.target.value)}
                    placeholder="Avatar URL..."
                    style={{ ...inputStyle, fontSize: '0.75rem', marginBottom: '8px' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      fetchMediaList();
                      setAssetPickerTarget('authorImage');
                      setIsAssetPickerOpen(true);
                    }}
                    style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#1833FE', color: '#FFF', border: 'none', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Pick Photo
                  </button>
                </div>

                <div>
                  <label style={labelStyle}>Author Custom Bio</label>
                  <textarea
                    rows={4}
                    value={authorBio}
                    onChange={(e) => setAuthorBio(e.target.value)}
                    placeholder="By combining human ingenuity with AI capabilities, organizations can unlock new forms of creative expression..."
                    style={{ ...inputStyle, fontFamily: 'inherit', lineHeight: 1.6 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SEO & SERP */}
        {activeTab === 'seo' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={title ? `${title} | TryangleTech Blog` : 'Meta title...'}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Canonical URL</label>
                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder={`https://tryangletech.com/blog/${slug || 'article-slug'}`}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Meta Description (SERP Snippet)</label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="160 character snippet for Google search..."
                style={inputStyle}
              />
            </div>

            {/* Keywords */}
            <div>
              <label style={labelStyle}>Target SEO Keywords</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  placeholder="e.g. Web Development, Cloud Computing"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddKeyword();
                    }
                  }}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  style={{ padding: '0 18px', borderRadius: '10px', backgroundColor: '#1833FE', color: '#FFF', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  + Add Keyword
                </button>
              </div>

              {keywords.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      style={{
                        backgroundColor: '#F1F5F9',
                        color: '#334155',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.775rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                      </svg>
                      <span>{kw}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(kw)}
                        style={{ border: 'none', background: 'none', color: '#EF4444', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: '2px' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Live Google SERP Snippet Preview Card */}
            <div style={{ padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
              <span style={{ fontSize: '0.75rem', color: '#1A0DAB', display: 'block' }}>
                https://tryangletech.com › blog › {slug || 'article-slug'}
              </span>
              <h4 style={{ fontSize: '1.05rem', color: '#1A0DAB', margin: '4px 0', fontWeight: 600 }}>
                {metaTitle || `${title || 'Article Title'} | TryangleTech Blog`}
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#4D5156', margin: 0, lineHeight: 1.4 }}>
                {metaDescription || excerpt || 'Discover in-depth engineering insights, modern software consulting, and technology strategies from TryangleTech.'}
              </p>
            </div>
          </div>
        )}
      </form>

      {/* Bottom Action Footer Bar */}
      <div
        style={{
          marginTop: '2.5rem',
          padding: '1.25rem 2rem',
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Current Status:
          </span>
          <span
            style={{
              fontSize: '0.775rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '6px',
              backgroundColor: published ? '#ECFDF5' : '#FEF3C7',
              color: published ? '#047857' : '#B45309',
              border: `1px solid ${published ? '#A7F3D0' : '#FDE68A'}`,
            }}
          >
            {published ? '● Published Live' : '● Draft Mode'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => handleSave(undefined, false)}
            disabled={isSubmitting}
            style={{
              height: '42px',
              padding: '0 20px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              border: '1.5px solid #CBD5E1',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>{isSubmitting ? 'Saving...' : 'Save as Draft'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(undefined, true)}
            disabled={isSubmitting}
            style={{
              height: '42px',
              padding: '0 24px',
              borderRadius: '10px',
              backgroundColor: '#1833FE',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxSizing: 'border-box',
              boxShadow: '0 4px 14px rgba(24, 51, 254, 0.3)',
              transition: 'all 0.15s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
            <span>{isSubmitting ? 'Publishing...' : isEditMode ? 'Update & Publish Live' : 'Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Full Asset Picker Modal */}
      {isAssetPickerOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10001,
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
                  Select Asset from Library ({assetPickerTarget})
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                  Pick existing images from the asset storage library.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAssetPickerOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  color: '#64748B',
                }}
              >
                ✕
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
                  placeholder="Search assets by filename..."
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

                  const handleSelectAsset = () => {
                    if (assetPickerTarget === 'cover') {
                      setCoverImage(asset.url);
                      setIsAssetPickerOpen(false);
                    } else if (assetPickerTarget === 'contentImage1') {
                      setContentImage1(asset.url);
                      setIsAssetPickerOpen(false);
                    } else if (assetPickerTarget === 'contentImage2') {
                      setContentImage2(asset.url);
                      setIsAssetPickerOpen(false);
                    } else if (assetPickerTarget === 'authorImage') {
                      setAuthorImage(asset.url);
                      setIsAssetPickerOpen(false);
                    } else {
                      if (isSelected) {
                        setSelectedAssetUrls(selectedAssetUrls.filter((u) => u !== asset.url));
                      } else {
                        setSelectedAssetUrls([...selectedAssetUrls, asset.url]);
                      }
                    }
                  };

                  return (
                    <div
                      key={asset.filename}
                      onClick={handleSelectAsset}
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
                      </div>

                      <div style={{ overflow: 'hidden' }}>
                        <p style={{ margin: 0, fontSize: '0.775rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={asset.filename}>
                          {asset.filename}
                        </p>
                        <span style={{ fontSize: '0.675rem', color: '#64748B' }}>
                          {(asset.size / 1024).toFixed(0)} KB
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectAsset();
                        }}
                        style={{
                          padding: '5px 8px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: '#1833FE',
                          color: '#FFFFFF',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Select Image
                      </button>
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

export default function BlogEditorPage() {
  return (
    <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center' }}>Loading Blog Editor...</div>}>
      <BlogEditorInner />
    </Suspense>
  );
}
