'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogPostItem, generateBlogSlug } from '@/backend/services/blog';
import { apiClient } from '@/app/superadmin/utils/apiClient';
import CustomDropdown from '@/app/superadmin/components/CustomDropdown';
import { BlogProvider, useBlog } from '@/app/superadmin/context/BlogContext';

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

  const { categories: dynamicCategories, savePost } = useBlog();

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
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlTab = searchParams.get('tab') as EditorTab | null;
      if (urlTab && VALID_TABS.includes(urlTab)) {
        setActiveTabState(urlTab);
      } else {
        setActiveTabState('general');
      }
    }
  }, [searchParams, postId]);

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingAction, setSubmittingAction] = useState<'draft' | 'publish' | null>(null);
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
  const [category, setCategory] = useState<string>('General');
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
  const [coverImageAlt, setCoverImageAlt] = useState('');
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [sliderImageAlts, setSliderImageAlts] = useState<string[]>([]);
  const [newSliderUrl, setNewSliderUrl] = useState('');
  const [newSliderAlt, setNewSliderAlt] = useState('');

  // Media Library Management State
  const [mediaList, setMediaList] = useState<MediaAssetItem[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<'cover' | 'slider' | 'replaceSlide' | 'contentImage1' | 'contentImage2' | 'authorImage'>('cover');
  const [replacingSlideIndex, setReplacingSlideIndex] = useState<number | null>(null);
  const [uploadFeedback, setUploadFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Pre-upload rename states
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);
  const [uploadFilePreview, setUploadFilePreview] = useState<string | null>(null);
  const [customFilenameInput, setCustomFilenameInput] = useState('');
  const [customAltInput, setCustomAltInput] = useState('');
  const [blobPreviewMap, setBlobPreviewMap] = useState<Record<string, string>>({});

  // Asset Picker Modal State
  const [isAssetPickerOpen, setIsAssetPickerOpen] = useState(false);
  const [assetPickerTarget, setAssetPickerTarget] = useState<'cover' | 'slider' | 'replaceSlide' | 'contentImage1' | 'contentImage2' | 'authorImage'>('cover');
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
  const [contentImage1Alt, setContentImage1Alt] = useState('');
  const [contentImage2, setContentImage2] = useState('');
  const [contentImage2Alt, setContentImage2Alt] = useState('');
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

  // 5. Dynamic FAQs
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);
  const [isLoadingDefaults, setIsLoadingDefaults] = useState(false);

  const DEFAULT_BLOG_FALLBACK_FAQS = [
    {
      question: 'How does TryangleTech approach custom web development?',
      answer: 'We craft high-performance, modern digital products with Next.js, React, Node.js, and PostgreSQL, focusing on sub-second load times, scalability, and UX design.',
    },
    {
      question: 'How do AI-driven workflows benefit modern business apps?',
      answer: 'AI integrations streamline mundane operations, optimize search algorithms with AEO/GEO indexing, and provide intelligent personalization for users.',
    },
    {
      question: 'What is the standard delivery timeline for bespoke platforms?',
      answer: 'Our sprint-driven agile process delivers high-impact web apps in 2 to 6 weeks with transparent weekly milestones and continuous deployment.',
    },
    {
      question: 'Do you provide post-launch maintenance and SEO tracking?',
      answer: 'Yes, we provide full-lifecycle monitoring, speed optimization, and ongoing Search & AI Engine Optimization (SEO/AEO).',
    },
  ];

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
    if (index >= faqs.length - 1) return;
    setFaqs((prev) => {
      if (index >= prev.length - 1) return prev;
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      return updated;
    });
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleLoadDefaultFaqs = async () => {
    setIsLoadingDefaults(true);
    try {
      const res = await fetch('/api/faqs?pageType=BLOG_MAIN&defaults=true');
      const json = await res.json();
      const list = json.faqs || json.data;
      if (json.success && Array.isArray(list) && list.length > 0) {
        setFaqs(
          list.map((f: any) => ({
            question: f.question,
            answer: f.answer,
          }))
        );
        return;
      }
    } catch (err) {
      console.warn('Failed to fetch default FAQs from API, using static fallbacks:', err);
    } finally {
      setIsLoadingDefaults(false);
    }
    setFaqs(DEFAULT_BLOG_FALLBACK_FAQS);
  };

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

  const handleSelectFileToUpload = (files: FileList | null, target: 'cover' | 'slider' | 'replaceSlide' | 'contentImage1' | 'contentImage2' | 'authorImage' = 'cover') => {
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
          setSliderImageAlts((prev) => [...prev, title.trim() ? `${title.trim()} slide preview` : 'Article slide showcase']);
        }
      } else if (uploadTarget === 'replaceSlide' && replacingSlideIndex !== null) {
        const updated = [...sliderImages];
        updated[replacingSlideIndex] = data.url;
        setSliderImages(updated);
        setReplacingSlideIndex(null);
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
        const res = await apiClient.get<BlogPostItem>(`/api/blog?id=${encodeURIComponent(postId!)}`, { useCache: false });
        if (res.success && res.data) {
          const p = res.data;
          setTitle(p.title || '');
          setSlug(p.slug || '');
          setIsSlugManual(true);
          setCategory(p.category || 'General');
          setAuthorName(p.authorName || 'TryangleTech Team');
          setAuthorRole(p.authorRole || 'Content Creators');
          setAuthorImage(p.authorImage || '/blog-post-assets/692578de4ba3fb26b16f1dd7_blog-nine.webp');
          setAuthorBio(p.authorBio || '');
          setReadTime(p.readTime || '5 min read');
          setPublished(p.published);
          setPublishedAt(formatForDateTimeInput(p.publishedAt || p.createdAt));
          setOrder(p.order || 0);

          setCoverImage(p.coverImage || '');
          setCoverImageAlt(p.coverImageAlt || p.imageAlt || '');
          setSliderImages(p.images && p.images.length > 0 ? p.images : (p.coverImage ? [p.coverImage] : []));
          setSliderImageAlts(p.imageAlts || []);

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
          setContentImage1Alt(p.contentImage1Alt || '');
          setContentImage2(p.contentImage2 || '');
          setContentImage2Alt(p.contentImage2Alt || '');
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

          setFaqs(Array.isArray(p.faqs) ? p.faqs : []);
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
      setSliderImageAlts([...sliderImageAlts, newSliderAlt.trim() || title]);
      setNewSliderUrl('');
      setNewSliderAlt('');
    }
  };

  const handleRemoveSliderImage = (index: number) => {
    setSliderImages(sliderImages.filter((_, i) => i !== index));
    setSliderImageAlts(sliderImageAlts.filter((_, i) => i !== index));
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
    const raw = tagInput.trim();
    if (!raw) return;
    const parts = raw.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    if (parts.length > 0) {
      setTags((prev) => {
        const next = [...prev];
        for (const p of parts) {
          if (!next.includes(p)) next.push(p);
        }
        return next;
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleAddKeyword = () => {
    const raw = keywordInput.trim();
    if (!raw) return;
    const parts = raw.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    if (parts.length > 0) {
      setKeywords((prev) => {
        const next = [...prev];
        for (const p of parts) {
          if (!next.includes(p)) next.push(p);
        }
        return next;
      });
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

    setSubmittingAction(finalPublished ? 'publish' : 'draft');
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
        coverImageAlt: coverImageAlt.trim(),
        imageAlt: coverImageAlt.trim(),
        images: sliderImages,
        imageAlts: sliderImageAlts,
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
        contentImage1Alt: contentImage1Alt.trim(),
        contentImage2: contentImage2.trim(),
        contentImage2Alt: contentImage2Alt.trim(),
        conclusionTitle: conclusionTitle.trim(),
        conclusionBody: conclusionBody.trim(),
        conclusionPoints,
        tags: keywords,
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || excerpt.trim(),
        canonicalUrl: canonicalUrl.trim(),
        keywords,
        faqs: faqs.filter((f) => f.question.trim().length > 0),
      };

      if (isEditMode && postId) {
        await savePost({ id: postId, ...payload });
        setSuccessMessage(finalPublished ? 'Article updated & published live!' : 'Article updated & saved as Draft!');
        setTimeout(() => {
          router.push('/superadmin/blog');
        }, 1000);
      } else {
        await savePost(payload);
        setSuccessMessage(finalPublished ? 'Article published live on public website!' : 'Article created & saved as Draft!');
        setTimeout(() => {
          router.push('/superadmin/blog');
        }, 1000);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save article.');
    } finally {
      setIsSubmitting(false);
      setSubmittingAction(null);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 16px',
    borderRadius: '12px',
    border: '1.5px solid #CBD5E1',
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
    fontSize: '0.9rem',
    fontWeight: 500,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
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
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.75rem 2rem 6rem 2rem' }}>
        {/* 1. Header Toolbar Skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="rt-skeleton-box" style={{ width: '150px', height: '42px', borderRadius: '10px' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="rt-skeleton-box" style={{ width: '125px', height: '42px', borderRadius: '10px' }} />
            <div className="rt-skeleton-box" style={{ width: '90px', height: '42px', borderRadius: '10px' }} />
            <div className="rt-skeleton-box" style={{ width: '145px', height: '42px', borderRadius: '10px' }} />
          </div>
        </div>

        {/* 2. Tabs Bar Skeleton (5 Tabs with divider line) */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1.5px solid #CBD5E1',
            paddingBottom: '0.75rem',
            marginBottom: '2rem',
            overflowX: 'auto',
          }}
        >
          <div className="rt-skeleton-box" style={{ width: '150px', height: '40px', borderRadius: '10px', flexShrink: 0 }} />
          <div className="rt-skeleton-box" style={{ width: '165px', height: '40px', borderRadius: '10px', flexShrink: 0 }} />
          <div className="rt-skeleton-box" style={{ width: '145px', height: '40px', borderRadius: '10px', flexShrink: 0 }} />
          <div className="rt-skeleton-box" style={{ width: '170px', height: '40px', borderRadius: '10px', flexShrink: 0 }} />
          <div className="rt-skeleton-box" style={{ width: '155px', height: '40px', borderRadius: '10px', flexShrink: 0 }} />
        </div>

        {/* 3. Section Title & Subtitle */}
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div className="rt-skeleton-box" style={{ width: '320px', height: '24px', borderRadius: '6px' }} />
          <div className="rt-skeleton-box" style={{ width: '480px', height: '16px', borderRadius: '4px' }} />
        </div>

        {/* 4. Form Fields Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Row 1: Title & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div className="rt-skeleton-box" style={{ width: '110px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
            <div>
              <div className="rt-skeleton-box" style={{ width: '90px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
          </div>

          {/* Row 2: Slug */}
          <div>
            <div className="rt-skeleton-box" style={{ width: '85px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
          </div>

          {/* Row 3: Publication Status, Published Date & Read Time */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div className="rt-skeleton-box" style={{ width: '140px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
            <div>
              <div className="rt-skeleton-box" style={{ width: '150px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
            <div>
              <div className="rt-skeleton-box" style={{ width: '140px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
          </div>

          {/* Row 4: Author Name & Author Role */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div className="rt-skeleton-box" style={{ width: '100px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
            <div>
              <div className="rt-skeleton-box" style={{ width: '140px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
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
          href="/superadmin/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
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
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Blog</span>
        </Link>

        {/* Top Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isEditMode && slug && (
            <a
              href={published ? `/blog/${slug}` : `/blog/${slug}?preview=true`}
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
                border: published ? '1.5px solid #BFDBFE' : '1.5px solid #FCD34D',
                backgroundColor: published ? '#EFF6FF' : '#FEF3C7',
                color: published ? '#1833FE' : '#92400E',
                fontSize: '0.875rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{published ? 'View Live' : 'Preview Draft'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}

          <Link
            href="/superadmin/blog"
            style={{
              height: '42px',
              padding: '0 20px',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
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
              transition: 'all 0.15s ease',
            }}
          >
            Discard
          </Link>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(undefined, true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '42px',
              padding: '0 24px',
              borderRadius: '10px',
              border: '1.5px solid #BFDBFE',
              backgroundColor: '#EFF6FF',
              color: '#1833FE',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease',
            }}
          >
            {submittingAction === 'publish' ? (
              <>
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid #1833FE',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                <span>{isEditMode ? 'Updating Article...' : 'Publishing Article...'}</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
                <span>{isEditMode ? 'Update Article' : 'Publish Article'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Title & Metadata Status Bar */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900, color: 'var(--dark-indigo, #1a0b54)', letterSpacing: '-0.02em' }}>
            {isEditMode ? `Edit Article: ${title || 'Untitled'}` : 'Create New Blog Article'}
          </h1>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: published ? '#ECFDF5' : '#FEF3C7',
              color: published ? '#047857' : '#B45309',
              border: `1px solid ${published ? '#A7F3D0' : '#FDE68A'}`,
            }}
          >
            {published ? '● Live Published' : '● Draft Mode'}
          </span>
        </div>
        <p style={{ margin: '6px 0 0', fontSize: '0.875rem', color: '#64748B' }}>
          {isEditMode
            ? `Editing database record: ${title || 'Article'} • Category: ${category}`
            : 'Configure section-wise content, media showcase, draft status, and SEO.'}
        </p>
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
        {[
          {
            key: 'general',
            label: 'General & Author',
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            ),
          },
          {
            key: 'media',
            label: 'Media Showcase',
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            ),
            badge: sliderImages.length > 0 ? `${sliderImages.length}` : undefined,
          },
          {
            key: 'narrative',
            label: 'Story & Sections',
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            ),
            badge: '6 Sections',
          },
          {
            key: 'seo',
            label: 'SEO & Search Engine',
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            ),
            badge: 'SERP Live',
          },
          {
            key: 'faqs',
            label: 'Dynamic FAQs',
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            ),
            badge: faqs.length > 0 ? `${faqs.length} FAQs` : undefined,
          },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                flex: '1 1 auto',
                padding: '11px 20px',
                borderRadius: '10px',
                border: isActive ? '1.5px solid #BFDBFE' : '1.5px solid transparent',
                backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                color: isActive ? '#1833FE' : '#64748B',
                fontWeight: isActive ? 700 : 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  style={{
                    fontSize: '0.725rem',
                    backgroundColor: isActive ? '#DBEAFE' : '#F1F5F9',
                    color: isActive ? '#1833FE' : '#64748B',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: 700,
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Form Content */}
      <form onSubmit={handleSave}>
        {/* TAB 1: GENERAL */}
        {activeTab === 'general' && (
          <div style={{ backgroundColor: 'transparent', borderRadius: '20px', border: 'none', padding: '0.5rem 0', minHeight: '560px', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                Article Identity & Meta Information
              </h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>
                Configure core title, category assignment, author details, read time, and publication metadata.
              </p>
            </div>

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
                  onChange={(e) => setTitle(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Category <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <CustomDropdown
                  value={category}
                  options={Array.from(new Set([...dynamicCategories, category].filter(Boolean))).map((c) => ({ value: c, label: c }))}
                  onChange={(val) => setCategory(val as string)}
                  direction="down"
                  size="form"
                  fullWidth
                />
              </div>
            </div>

            {/* URL Slug */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>
                  URL Slug <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSlug(generateBlogSlug(title));
                  }}
                  style={{
                    border: 'none',
                    background: 'none',
                    color: '#1833FE',
                    fontSize: '0.775rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Regenerate from Title
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    padding: '11px 16px',
                    borderRadius: '12px',
                    backgroundColor: '#F8FAFC',
                    border: '1.5px solid #CBD5E1',
                    color: '#64748B',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                  }}
                >
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  placeholder="transforming-businesses-with-innovative-technology"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  style={{ ...inputStyle, flex: 1, fontFamily: 'monospace' }}
                />
              </div>
            </div>

            {/* 3-Column Metadata: Status, Published Date, and Read Time */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>
                  Publication Status <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <CustomDropdown
                  value={published ? 'published' : 'draft'}
                  options={[
                    { value: 'published', label: '● Live Published (Visible on /blog)' },
                    { value: 'draft', label: '● Draft Mode (Hidden from /blog)' },
                  ]}
                  onChange={(val) => setPublished(val === 'published')}
                  direction="down"
                  size="form"
                  fullWidth
                />
              </div>

              <div>
                <label style={labelStyle}>Published Date &amp; Time</label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Read Time Estimate</label>
                <input
                  type="text"
                  placeholder="e.g. 5 min read"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* 2-Column Author Info */}
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
                <label style={labelStyle}>Author Role / Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Cloud Architect"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA SHOWCASE */}
        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* 1. Cover Image Card */}
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
                  Article Cover Image (Hero Banner)
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#EFF6FF', color: '#1833FE', padding: '4px 12px', borderRadius: '12px', fontWeight: 700 }}>
                  Standard Size: 820 × 490 px • 16:10 Ratio
                </span>
              </div>
              <p style={{ margin: '0 0 1.75rem 0', fontSize: '0.85rem', color: '#64748B' }}>
                The main banner image displayed on blog listing cards and at the top of the article. Upload a crisp screenshot or artwork. Standard dimensions: <strong>820 × 490 px</strong>.
              </p>

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
                        Modify Image Filename before saving to <code>public/blog-assets/</code>:
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="text"
                          value={customFilenameInput}
                          onChange={(e) => setCustomFilenameInput(e.target.value)}
                          placeholder="e.g. taskopia-blog-cover"
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
                          border: '1.5px solid #BFDBFE',
                          backgroundColor: '#EFF6FF',
                          color: '#1833FE',
                          fontSize: '0.825rem',
                          fontWeight: 700,
                          cursor: isUploading ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {isUploading ? (
                          <>
                            <span
                              style={{
                                width: '12px',
                                height: '12px',
                                border: '2px solid #1833FE',
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span>Confirm Upload &amp; Set</span>
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

              {/* Cover Image 2-Column Layout (Left: Preview & Upload Controls, Right: Selection from Library) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '2rem', alignItems: 'start' }}>
                {/* Left: Thumbnail & Trigger Buttons */}
                <div>
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1.5px solid #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: 'none',
                    }}
                  >
                    {coverImage ? (
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
                      <div style={{ textAlign: 'center', padding: '1rem', color: '#94A3B8' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 6px', display: 'block' }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>No Cover Image Set</span>
                      </div>
                    )}

                    {coverImage && (
                      <button
                        type="button"
                        onClick={() => setCoverImage('')}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          padding: '5px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: 'rgba(239, 68, 68, 0.9)',
                          color: '#FFFFFF',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <label style={labelStyle}>Cover Image Alt Text (SEO & Accessibility)</label>
                    <input
                      type="text"
                      value={coverImageAlt}
                      onChange={(e) => setCoverImageAlt(e.target.value)}
                      placeholder="e.g. AI Workflow Optimization illustration"
                      style={inputStyle}
                    />
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
                      padding: '10px 14px',
                      marginTop: '12px',
                      borderRadius: '10px',
                      border: '1.5px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      color: '#1833FE',
                      fontSize: '0.85rem',
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
                    <span>Upload Image</span>
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
                      padding: '10px 14px',
                      marginTop: '8px',
                      borderRadius: '10px',
                      border: '1.5px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      color: '#1833FE',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Select Existing Assets</span>
                  </button>
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
                marginTop: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                    Article Carousel &amp; Slider Showcase ({sliderImages.length} Slides)
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748B' }}>
                    Multi-image slides displayed inside the interactive carousel on the live article page.
                  </p>
                </div>

                {/* Upload & Select from Library Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
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
                      padding: '9px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      color: '#1833FE',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Upload Slide Image</span>
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
                      padding: '9px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #BFDBFE',
                      backgroundColor: '#EFF6FF',
                      color: '#1833FE',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Select Existing Assets</span>
                  </button>
                </div>
              </div>

              {/* Add New Slide row with Alt Text */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginTop: '1.25rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Slide Image URL (e.g. /blog-assets/diagram.webp or https://...)"
                  value={newSliderUrl}
                  onChange={(e) => setNewSliderUrl(e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Slide Image Alt Text (e.g. Workflow Diagram)"
                  value={newSliderAlt}
                  onChange={(e) => setNewSliderAlt(e.target.value)}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={handleAddSliderImage}
                  style={{
                    padding: '0 20px',
                    height: '46px',
                    borderRadius: '12px',
                    border: '1.5px solid #BFDBFE',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  + Add Slide
                </button>
              </div>

              {/* Slider Image List Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {sliderImages.length === 0 ? (
                  <div style={{ gridColumn: '1 / -1', padding: '2.5rem', textAlign: 'center', border: '1.5px dashed #CBD5E1', borderRadius: '16px', backgroundColor: '#F8FAFC' }}>
                    <div style={{ marginBottom: '8px', color: '#94A3B8', display: 'flex', justifyContent: 'center' }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <div style={{ fontWeight: 700, color: '#334155', marginBottom: '4px' }}>No Carousel Slider Images Added Yet</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Add screenshot URLs, upload slide files from your device, or pick from the existing library above.</div>
                  </div>
                ) : (
                  sliderImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      style={{
                        border: '1.5px solid #CBD5E1',
                        borderRadius: '16px',
                        padding: '12px',
                        backgroundColor: '#FFFFFF',
                        boxShadow: 'none',
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
                          alt={sliderImageAlts[idx] || `Slide ${idx + 1}`}
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

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <input
                          type="text"
                          value={imgUrl}
                          onChange={(e) => {
                            const updated = [...sliderImages];
                            updated[idx] = e.target.value;
                            setSliderImages(updated);
                          }}
                          placeholder="Image URL"
                          style={{
                            width: '100%',
                            fontSize: '0.775rem',
                            padding: '7px 10px',
                            borderRadius: '8px',
                            border: '1.5px solid #CBD5E1',
                            backgroundColor: '#F8FAFC',
                            fontFamily: 'monospace',
                          }}
                        />
                        <input
                          type="text"
                          value={sliderImageAlts[idx] || ''}
                          onChange={(e) => {
                            const updated = [...sliderImageAlts];
                            updated[idx] = e.target.value;
                            setSliderImageAlts(updated);
                          }}
                          placeholder="Slide Alt Text"
                          style={{
                            width: '100%',
                            fontSize: '0.775rem',
                            padding: '7px 10px',
                            borderRadius: '8px',
                            border: '1.5px solid #CBD5E1',
                            backgroundColor: '#F8FAFC',
                          }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '2px' }}>
                        <input
                          id={`replace-slide-file-${idx}`}
                          type="file"
                          accept="image/webp,image/png,image/jpeg,image/svg+xml,image/gif,image/avif"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            setReplacingSlideIndex(idx);
                            handleSelectFileToUpload(e.target.files, 'replaceSlide');
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById(`replace-slide-file-${idx}`)?.click()}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '8px',
                            border: '1px solid #BFDBFE',
                            backgroundColor: '#EFF6FF',
                            color: '#1833FE',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            gap: '4px',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span>Upload New</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            fetchMediaList();
                            setReplacingSlideIndex(idx);
                            setAssetPickerTarget('replaceSlide');
                            setIsAssetPickerOpen(true);
                          }}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '8px',
                            border: '1px solid #BFDBFE',
                            backgroundColor: '#EFF6FF',
                            color: '#1833FE',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.725rem',
                            fontWeight: 700,
                            gap: '4px',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span>Pick Asset</span>
                        </button>
                      </div>

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
                          fontSize: '0.775rem',
                          fontWeight: 700,
                          gap: '6px',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        <span>Remove Slide</span>
                      </button>
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
            <div style={{ backgroundColor: 'transparent', borderRadius: '20px', border: 'none', padding: '0.5rem 0', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1833FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <span>Article Excerpt & Hook (Listing Cards Summary)</span>
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#EFF6FF', color: '#1833FE', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                  Featured Summary
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.825rem', color: '#64748B' }}>
                Short 1-2 sentence compelling summary displayed on the main blog grid cards and Google search snippet.
              </p>
              <div>
                <label style={labelStyle}>
                  Excerpt Content <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="e.g. Discover how modern AI workflows and human creativity collaborate to drive digital transformation..."
                  style={{ ...inputStyle, fontFamily: 'inherit', lineHeight: 1.6 }}
                />
              </div>
            </div>

            {/* Section 1: Main Story & Intro */}
            <div style={{ backgroundColor: 'transparent', borderRadius: '20px', border: 'none', padding: '0.5rem 0', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
            <div style={{ backgroundColor: 'transparent', borderRadius: '20px', border: 'none', padding: '0.5rem 0', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
            <div style={{ backgroundColor: 'transparent', borderRadius: '20px', border: 'none', padding: '0.5rem 0', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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

            {/* Section 4: Mid-Article Image Showcase (2 Images with Alt) */}
            <div style={{ backgroundColor: 'transparent', borderRadius: '20px', border: 'none', padding: '0.5rem 0', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                <div style={{ border: '1.5px solid #CBD5E1', borderRadius: '14px', padding: '1.25rem', backgroundColor: '#F8FAFC' }}>
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
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
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
                  <div>
                    <label style={{ ...labelStyle, fontSize: '0.775rem', marginBottom: '4px' }}>Left Image Alt Text</label>
                    <input
                      type="text"
                      value={contentImage1Alt}
                      onChange={(e) => setContentImage1Alt(e.target.value)}
                      placeholder="e.g. Analytics dashboard illustration"
                      style={inputStyle}
                    />
                  </div>
                  {contentImage1 && (
                    <div style={{ marginTop: '12px', height: '210px', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #CBD5E1', backgroundColor: '#FFFFFF', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={contentImage1}
                        alt={contentImage1Alt || 'Preview 1'}
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
                <div style={{ border: '1.5px solid #CBD5E1', borderRadius: '14px', padding: '1.25rem', backgroundColor: '#F8FAFC' }}>
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
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
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
                  <div>
                    <label style={{ ...labelStyle, fontSize: '0.775rem', marginBottom: '4px' }}>Right Image Alt Text</label>
                    <input
                      type="text"
                      value={contentImage2Alt}
                      onChange={(e) => setContentImage2Alt(e.target.value)}
                      placeholder="e.g. Workflow automation diagram"
                      style={inputStyle}
                    />
                  </div>
                  {contentImage2 && (
                    <div style={{ marginTop: '12px', height: '210px', borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #CBD5E1', backgroundColor: '#FFFFFF', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={contentImage2}
                        alt={contentImage2Alt || 'Preview 2'}
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
            <div style={{ backgroundColor: 'transparent', borderRadius: '20px', border: 'none', padding: '0.5rem 0', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1.5px solid #CBD5E1' }}>
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
            <div style={{ backgroundColor: 'transparent', borderRadius: '20px', border: 'none', padding: '0.5rem 0', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                <div style={{ border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '1rem', backgroundColor: '#F8FAFC', textAlign: 'center' }}>
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
                    style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1833FE', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s ease' }}
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
          <div style={{ backgroundColor: 'transparent', borderRadius: '20px', border: 'none', padding: '0.5rem 0', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
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
                  style={{ padding: '0 18px', borderRadius: '10px', border: '1.5px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1833FE', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.15s ease' }}
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
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        color: '#1833FE',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.775rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1833FE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
            <div style={{ padding: '1.25rem', borderRadius: '14px', border: '1.5px solid #CBD5E1', backgroundColor: '#F8FAFC' }}>
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
            {/* Header & Default loader banner */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                padding: '1.25rem 1.5rem',
                backgroundColor: '#EFF6FF',
                borderRadius: '16px',
                border: '1.5px solid #BFDBFE',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1E3A8A' }}>
                  Dynamic Article FAQs & Knowledge Answers
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.825rem', color: '#3B82F6' }}>
                  Manage bespoke FAQs for this article or load high-converting defaults from the database.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleLoadDefaultFaqs}
                  disabled={isLoadingDefaults}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    border: '1.5px solid #BFDBFE',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: isLoadingDefaults ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>{isLoadingDefaults ? 'Loading...' : '⚡ Load Default Blog FAQs'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    border: '1.5px solid #BFDBFE',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Add FAQ Item</span>
                </button>
              </div>
            </div>

            {/* FAQs List */}
            {faqs.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '3.5rem 1.5rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '16px',
                  border: '1.5px dashed #CBD5E1',
                }}
              >
                <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', borderRadius: '12px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1833FE' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>No Dynamic FAQs Added</h4>
                <p style={{ margin: '6px 0 16px', fontSize: '0.85rem', color: '#64748B' }}>
                  Click &quot;Load Default Blog FAQs&quot; to auto-populate or manually add questions.
                </p>
                <button
                  type="button"
                  onClick={handleLoadDefaultFaqs}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '10px',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    border: '1.5px solid #BFDBFE',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  ⚡ Populate Recommended FAQs
                </button>
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
                        placeholder="e.g. How does TryangleTech approach custom web development?"
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
                        placeholder="Detailed answer explaining the topic, strategy, or insights..."
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
      </form>

      {/* Bottom Action Footer Bar */}
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
            {submittingAction === 'draft' ? (
              <>
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid #64748B',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
                <span>Saving Draft...</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>Save as Draft</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleSave(undefined, true)}
            disabled={isSubmitting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '42px',
              padding: '0 28px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#1833FE',
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(24, 51, 254, 0.3)',
              boxSizing: 'border-box',
              transition: 'all 0.15s ease',
            }}
          >
            {submittingAction === 'publish' ? (
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
                <span>{isEditMode ? 'Updating Article...' : 'Publishing Article...'}</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
                <span>{isEditMode ? 'Update Article' : 'Publish Article'}</span>
              </>
            )}
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
                    } else if (assetPickerTarget === 'replaceSlide' && replacingSlideIndex !== null) {
                      const updated = [...sliderImages];
                      updated[replacingSlideIndex] = asset.url;
                      setSliderImages(updated);
                      setReplacingSlideIndex(null);
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
                        const newAlts = [...sliderImageAlts];
                        selectedAssetUrls.forEach((u) => {
                          if (!newImages.includes(u)) {
                            newImages.push(u);
                            newAlts.push(title.trim() ? `${title.trim()} slide preview` : 'Article slide showcase');
                          }
                        });
                        setSliderImages(newImages);
                        setSliderImageAlts(newAlts);
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
    <BlogProvider>
      <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center' }}>Loading Blog Editor...</div>}>
        <BlogEditorInner />
      </Suspense>
    </BlogProvider>
  );
}
