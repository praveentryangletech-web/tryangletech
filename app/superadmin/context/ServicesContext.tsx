'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { apiClient } from '../utils/apiClient';
import {
  DEFAULT_SERVICE_MAIN_CONTENT,
  DEFAULT_SERVICES_LIST,
  DEFAULT_WEB_DEV_CONTENT,
  DEFAULT_MOBILE_APP_CONTENT,
} from '@/backend/services/services/services.defaults';
import {
  ServiceMainContentDTO,
  ServicePageSummaryItem,
  ServiceHeroSection,
  ServiceCardItem,
  ServiceHighlightsSection,
  ServiceToolsSection,
  ServiceFaqItem,
  ServiceTestimonialItem,
  ServicesPaginationInfo,
  WebDevContentDTO,
  MobileAppContentDTO,
} from '@/backend/services/services/services.types';

export interface ServicesContextType {
  // Navigation & View Mode
  viewMode: 'list' | 'edit-main' | 'edit-sub';
  setViewMode: (mode: 'list' | 'edit-main' | 'edit-sub') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  subActiveTab: string;
  setSubActiveTab: (tab: string) => void;

  // Sub-Service State
  isSubServiceModalOpen: boolean;
  setIsSubServiceModalOpen: (open: boolean) => void;
  selectedSubService: ServicePageSummaryItem | null;
  subServiceData: any;
  setSubServiceData: React.Dispatch<React.SetStateAction<any>>;
  isSubServiceLoading: boolean;
  isSubServiceSaving: boolean;
  fetchSubServiceData: (slug: string) => Promise<any>;
  saveSubServiceData: (slug?: string, data?: any) => Promise<boolean>;

  // Search & Filtering
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;

  // Data Lists & Pagination
  categories: string[];
  servicesListSummary: ServicePageSummaryItem[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: (limit: number) => void;
  pagination: ServicesPaginationInfo;

  // Main Service Editor States
  hero: ServiceHeroSection;
  setHero: React.Dispatch<React.SetStateAction<ServiceHeroSection>>;
  servicesList: ServiceCardItem[];
  setServicesList: React.Dispatch<React.SetStateAction<ServiceCardItem[]>>;
  highlights: ServiceHighlightsSection;
  setHighlights: React.Dispatch<React.SetStateAction<ServiceHighlightsSection>>;
  tools: ServiceToolsSection;
  setTools: React.Dispatch<React.SetStateAction<ServiceToolsSection>>;
  faqs: ServiceFaqItem[];
  setFaqs: React.Dispatch<React.SetStateAction<ServiceFaqItem[]>>;
  testimonials: ServiceTestimonialItem[];
  setTestimonials: React.Dispatch<React.SetStateAction<ServiceTestimonialItem[]>>;

  // SEO & Publication States
  metaTitle: string;
  setMetaTitle: (title: string) => void;
  metaDescription: string;
  setMetaDescription: (desc: string) => void;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  isPublished: boolean;
  setIsPublished: React.Dispatch<React.SetStateAction<boolean>>;
  updatedAt: string;

  // Status & Feedback
  isLoading: boolean;
  isSaving: boolean;
  togglingSlug: string | null;
  successMessage: string;
  setSuccessMessage: (msg: string) => void;
  errorMessage: string;
  setErrorMessage: (err: string) => void;

  // Media Asset Picker
  isMediaPickerOpen: boolean;
  setIsMediaPickerOpen: (open: boolean) => void;
  mediaPickerTarget: string;
  openAssetPicker: (target: string) => void;
  selectMediaAsset: (url: string) => void;

  // Actions & API Methods
  fetchServicesList: () => Promise<void>;
  fetchMainServiceContent: () => Promise<void>;
  saveMainServiceContent: () => Promise<boolean>;
  toggleServiceStatus: (slug: string, currentStatus: boolean) => Promise<boolean>;
  openEditMain: () => void;
  openEditService: (serviceOrSlug: ServicePageSummaryItem | string) => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode }) {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<'list' | 'edit-main' | 'edit-sub'>('list');
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [subActiveTab, setSubActiveTab] = useState<string>('hero');

  // Sub-Service State
  const [isSubServiceModalOpen, setIsSubServiceModalOpen] = useState(false);
  const [selectedSubService, setSelectedSubService] = useState<ServicePageSummaryItem | null>(null);
  const [subServiceData, setSubServiceData] = useState<any>(DEFAULT_WEB_DEV_CONTENT);
  const [isSubServiceLoading, setIsSubServiceLoading] = useState(false);
  const [isSubServiceSaving, setIsSubServiceSaving] = useState(false);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Data Lists & Pagination
  const [categories, setCategories] = useState<string[]>(['All']);
  const [servicesListSummary, setServicesListSummary] = useState<ServicePageSummaryItem[]>(DEFAULT_SERVICES_LIST);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [pagination, setPagination] = useState<ServicesPaginationInfo>({
    page: 1,
    limit: 8,
    total: 6,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Main Service Editor States
  const [hero, setHero] = useState<ServiceHeroSection>(
    DEFAULT_SERVICE_MAIN_CONTENT?.hero || {
      subBadgeText: 'Our Services',
      headline: 'Comprehensive Digital Solutions for Your Business Growth',
      subheadline:
        'From custom software to data-driven marketing, we provide end-to-end services designed to scale your business and drive innovation.',
      primaryBtnText: 'Get started today',
      primaryBtnLink: '/contact',
      secondaryBtnText: 'View portfolio',
      secondaryBtnLink: '/portfolio',
      trustBadges: ['Innovative Solutions', 'Expert Engineering', 'Client-Centric'],
      avatars: ['#38bdf8', '#3b82f6', '#a855f7'],
    }
  );
  const [servicesList, setServicesList] = useState<ServiceCardItem[]>(
    DEFAULT_SERVICE_MAIN_CONTENT?.servicesList || []
  );
  const [highlights, setHighlights] = useState<ServiceHighlightsSection>(
    DEFAULT_SERVICE_MAIN_CONTENT?.highlights || {
      subBadgeText: 'Key Highlights',
      heading: 'Deliver excellence, drive innovation, achieve scale',
      imageMain: '/Home3_files/690dad354d2417ec66d3ca01_Taskopia-features-home-v3-hero.webp',
      imageSmall: '/Home3_files/690dad35b1d40224fc5d2a93_Taskopia-features-home-v3-left.webp',
      pillars: [],
    }
  );
  const [tools, setTools] = useState<ServiceToolsSection>(
    DEFAULT_SERVICE_MAIN_CONTENT?.tools || {
      subBadgeText: 'integration',
      heading: 'Streamline workflows, save time,',
      headingHighlight: 'enhance performance',
      tools: [],
    }
  );
  const [faqs, setFaqs] = useState<ServiceFaqItem[]>(DEFAULT_SERVICE_MAIN_CONTENT?.faqs || []);
  const [testimonials, setTestimonials] = useState<ServiceTestimonialItem[]>(
    DEFAULT_SERVICE_MAIN_CONTENT?.testimonials || []
  );

  // SEO & Publication States
  const [metaTitle, setMetaTitle] = useState(
    DEFAULT_SERVICE_MAIN_CONTENT?.metaTitle || 'Our Services | Web, Mobile, Custom Software & Marketing | TryangleTech'
  );
  const [metaDescription, setMetaDescription] = useState(
    DEFAULT_SERVICE_MAIN_CONTENT?.metaDescription ||
      'Explore TryangleTech’s full spectrum of digital services: Web Development, Custom Software Engineering, iOS/Android Apps, UI/UX Graphics Designing, and Growth Marketing.'
  );
  const [keywords, setKeywords] = useState<string[]>(
    DEFAULT_SERVICE_MAIN_CONTENT?.keywords || ['Digital Services', 'Custom Software Development', 'Web Development']
  );
  const [isPublished, setIsPublished] = useState<boolean>(true);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  // Status & Feedback
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Media Asset Picker
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState<boolean>(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<string>('');

  /**
   * 1. Fetch Paginated Services List
   */
  const fetchServicesList = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(itemsPerPage),
      });

      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }
      if (selectedCategoryFilter !== 'All') {
        params.set('category', selectedCategoryFilter);
      }

      const res = await apiClient.get<ServicePageSummaryItem[]>(`/api/superadmin/services?${params.toString()}`);
      if (res.success && res.data) {
        setServicesListSummary(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        }
        if (res.categories && Array.isArray(res.categories)) {
          setCategories(res.categories);
        }
      }
    } catch (err: any) {
      console.error('Error fetching services list:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery, selectedCategoryFilter]);

  /**
   * 2. Fetch Full Main Service Page Content
   */
  const fetchMainServiceContent = useCallback(async () => {
    try {
      const res = await apiClient.get<ServiceMainContentDTO>('/api/superadmin/services/main');
      if (res.success && res.data) {
        const d = res.data;
        if (d.hero) setHero(d.hero);
        if (d.servicesList) setServicesList(d.servicesList);
        if (d.highlights) setHighlights(d.highlights);
        if (d.tools) setTools(d.tools);
        if (d.faqs) setFaqs(d.faqs);
        if (d.testimonials) setTestimonials(d.testimonials);
        if (d.metaTitle) setMetaTitle(d.metaTitle);
        if (d.metaDescription) setMetaDescription(d.metaDescription);
        if (d.keywords) setKeywords(d.keywords);
        setIsPublished(d.isPublished ?? true);
        if (d.updatedAt) setUpdatedAt(d.updatedAt);
      }
    } catch (err: any) {
      console.error('Error loading main service content:', err);
    }
  }, []);

  useEffect(() => {
    fetchServicesList();
    fetchMainServiceContent();
  }, [fetchServicesList, fetchMainServiceContent]);

  /**
   * 3. Save Main Service Page Content
   */
  const saveMainServiceContent = async (): Promise<boolean> => {
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload: ServiceMainContentDTO = {
        id: 'service-main',
        hero,
        servicesList,
        highlights,
        tools,
        faqs,
        testimonials,
        metaTitle,
        metaDescription,
        keywords,
        isPublished,
      };

      const res = await apiClient.put<ServiceMainContentDTO>('/api/superadmin/services/main', payload);
      if (res.success) {
        setSuccessMessage('✓ Main Services page changes successfully saved to database!');
        await fetchServicesList();
        setTimeout(() => setSuccessMessage(''), 4000);
        return true;
      } else {
        setErrorMessage(res.error || 'Failed to save changes.');
        return false;
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error saving services content.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 4. Quick Toggle Status
   */
  const toggleServiceStatus = async (slug: string, currentStatus: boolean): Promise<boolean> => {
    setTogglingSlug(slug);
    const newStatus = !currentStatus;

    // Optimistic UI update
    setServicesListSummary((prev) =>
      prev.map((s) => (s.slug === slug ? { ...s, isPublished: newStatus } : s))
    );

    try {
      const res = await apiClient.patch('/api/superadmin/services', {
        slug,
        isPublished: newStatus,
      });

      if (res.success) {
        setSuccessMessage(`✓ Status updated to ${newStatus ? 'Published (Live)' : 'Draft (Private)'}`);
        setTimeout(() => setSuccessMessage(''), 3000);
        return true;
      } else {
        // Revert on error
        setServicesListSummary((prev) =>
          prev.map((s) => (s.slug === slug ? { ...s, isPublished: currentStatus } : s))
        );
        setErrorMessage(res.error || 'Failed to update status.');
        return false;
      }
    } catch (err: any) {
      // Revert on error
      setServicesListSummary((prev) =>
        prev.map((s) => (s.slug === slug ? { ...s, isPublished: currentStatus } : s))
      );
      setErrorMessage(err?.message || 'Error updating status.');
      return false;
    } finally {
      setTogglingSlug(null);
    }
  };

  /**
   * 5. Sub-Service Data Handlers
   */
  const fetchSubServiceData = useCallback(async (slug: string): Promise<any> => {
    setIsSubServiceLoading(true);
    const cleanSlug = slug.replace(/^service-/, '');
    const isMobileApp = cleanSlug === 'mobile-application';
    const defaultData = isMobileApp ? DEFAULT_MOBILE_APP_CONTENT : DEFAULT_WEB_DEV_CONTENT;

    try {
      const res = await apiClient.get<any>(`/api/superadmin/services/${cleanSlug}`, { useCache: false });
      if (res.success && res.data) {
        setSubServiceData(res.data);
        return res.data;
      } else {
        setSubServiceData(defaultData);
        return defaultData;
      }
    } catch (err: any) {
      console.warn('[ServicesContext] Error fetching sub-service data, using default:', err);
      setSubServiceData(defaultData);
      return defaultData;
    } finally {
      setIsSubServiceLoading(false);
    }
  }, []);

  const saveSubServiceData = async (slug?: string, data?: any): Promise<boolean> => {
    setIsSubServiceSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const targetSlug = slug || selectedSubService?.slug || 'web-development';
      const targetData = data || subServiceData || {};
      const cleanSlug = targetSlug.replace(/^service-/, '');
      const res = await apiClient.put<any>(`/api/superadmin/services/${cleanSlug}`, targetData);
      if (res.success && res.data) {
        setSubServiceData(res.data);
        const name = res.data.hero?.subBadgeText || (cleanSlug === 'mobile-application' ? 'Mobile Application' : 'Web Development');
        setSuccessMessage(`✓ ${name} content saved live to database!`);
        await fetchServicesList();
        setTimeout(() => setSuccessMessage(''), 4000);
        return true;
      } else {
        setErrorMessage(res.error || 'Failed to save service content.');
        return false;
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error saving service content.');
      return false;
    } finally {
      setIsSubServiceSaving(false);
    }
  };

  /**
   * 6. Media Picker Handlers
   */
  const openAssetPicker = (target: string) => {
    setMediaPickerTarget(target);
    setIsMediaPickerOpen(true);
  };

  const selectMediaAsset = (url: string) => {
    if (!mediaPickerTarget) return;

    if (
      (mediaPickerTarget.startsWith('cards.') || mediaPickerTarget.startsWith('servicesList.')) &&
      mediaPickerTarget.includes('.image.')
    ) {
      const parts = mediaPickerTarget.split('.');
      const cardIdx = parseInt(parts[1], 10);
      const imgIdx = parseInt(parts[3], 10);

      setServicesList((prev) => {
        const copy = [...prev];
        if (copy[cardIdx]) {
          const imgs = [...(copy[cardIdx].images || [])];
          imgs[imgIdx] = url;
          copy[cardIdx] = { ...copy[cardIdx], images: imgs };
        }
        return copy;
      });
    } else if (mediaPickerTarget.startsWith('highlights.')) {
      const imgKey = mediaPickerTarget.replace('highlights.', '') as keyof ServiceHighlightsSection;
      setHighlights((prev) => ({ ...prev, [imgKey]: url }));
    } else if (mediaPickerTarget.startsWith('tools.') && mediaPickerTarget.endsWith('.icon')) {
      const parts = mediaPickerTarget.split('.');
      const toolIdx = parseInt(parts[1], 10);
      setTools((prev) => {
        const copy = [...(prev.tools || [])];
        if (copy[toolIdx]) {
          copy[toolIdx] = { ...copy[toolIdx], icon: url };
        }
        return { ...prev, tools: copy };
      });
    } else if (mediaPickerTarget.startsWith('testimonials.') && mediaPickerTarget.endsWith('.avatar')) {
      const parts = mediaPickerTarget.split('.');
      const testIdx = parseInt(parts[1], 10);
      setTestimonials((prev) => {
        const copy = [...prev];
        if (copy[testIdx]) {
          copy[testIdx] = { ...copy[testIdx], avatar: url };
        }
        return copy;
      });
    } else if (mediaPickerTarget.startsWith('subService.')) {
      const fieldPath = mediaPickerTarget.replace('subService.', '');
      setSubServiceData((prev: any) => {
        if (!prev) return prev;
        const copy = JSON.parse(JSON.stringify(prev));
        if (fieldPath === 'hero.imageRightOne') copy.hero.imageRightOne = url;
        else if (fieldPath === 'hero.imageRightTwo') copy.hero.imageRightTwo = url;
        else if (fieldPath === 'hero.imageBanner') copy.hero.imageBanner = url;
        else if (fieldPath === 'hero.imageDot') copy.hero.imageDot = url;
        else if (fieldPath === 'seo.ogImage') copy.ogImage = url;
        else if (fieldPath.startsWith('speciality.')) {
          const parts = fieldPath.split('.');
          const cardIdx = parseInt(parts[1], 10);
          if (parts[2] === 'icon') {
            copy.speciality.cards[cardIdx].icon = url;
          } else if (parts[2] === 'images') {
            const imgIdx = parseInt(parts[3], 10);
            if (!copy.speciality.cards[cardIdx].images) copy.speciality.cards[cardIdx].images = [];
            copy.speciality.cards[cardIdx].images[imgIdx] = url;
          }
        } else if (fieldPath.startsWith('types.')) {
          const parts = fieldPath.split('.');
          const cardIdx = parseInt(parts[1], 10);
          if (parts[2] === 'image') copy.types.cards[cardIdx].image = url;
          else if (parts[2] === 'smallImage') copy.types.cards[cardIdx].smallImage = url;
        } else if (fieldPath.startsWith('techStack.')) {
          const parts = fieldPath.split('.');
          const techIdx = parseInt(parts[1], 10);
          if (copy.techStack?.items && copy.techStack.items[techIdx]) {
            copy.techStack.items[techIdx].icon = url;
          }
        }
        return copy;
      });
    } else if (mediaPickerTarget.startsWith('mobileApp.')) {
      const fieldPath = mediaPickerTarget.replace('mobileApp.', '');
      setSubServiceData((prev: any) => {
        if (!prev) return prev;
        const copy = JSON.parse(JSON.stringify(prev));
        if (fieldPath === 'hero.imageRightOne') copy.hero.imageRightOne = url;
        else if (fieldPath === 'hero.imageRightTwo') copy.hero.imageRightTwo = url;
        else if (fieldPath === 'hero.imageBanner') copy.hero.imageBanner = url;
        else if (fieldPath === 'engineering.imageMain') copy.engineering.imageMain = url;
        else if (fieldPath === 'engineering.imageMarquee') copy.engineering.imageMarquee = url;
        else if (fieldPath === 'features.imageMain') copy.features.imageMain = url;
        else if (fieldPath === 'seo.ogImage') copy.ogImage = url;
        else if (fieldPath.startsWith('process.')) {
          const parts = fieldPath.split('.');
          const cardIdx = parseInt(parts[1], 10);
          if (parts[2] === 'image') copy.process.cards[cardIdx].image = url;
          else if (parts[2] === 'smallImage') copy.process.cards[cardIdx].smallImage = url;
        } else if (fieldPath.startsWith('types.')) {
          const parts = fieldPath.split('.');
          const cardIdx = parseInt(parts[1], 10);
          if (parts[2] === 'image') copy.types.cards[cardIdx].image = url;
          else if (parts[2] === 'smallImage') copy.types.cards[cardIdx].smallImage = url;
        } else if (fieldPath.startsWith('testimonials.')) {
          const parts = fieldPath.split('.');
          const testIdx = parseInt(parts[1], 10);
          if (parts[2] === 'avatar') copy.testimonials.items[testIdx].avatar = url;
        }
        return copy;
      });
    }
    setIsMediaPickerOpen(false);
  };

  const openEditMain = () => {
    setViewMode('edit-main');
    setActiveTab('hero');
  };

  const openEditService = (serviceOrSlug: ServicePageSummaryItem | string) => {
    const slug = typeof serviceOrSlug === 'string' ? serviceOrSlug : serviceOrSlug.slug;
    if (slug === 'service-main' || slug === 'main') {
      openEditMain();
    } else {
      const cleanSlug = slug.replace(/^service-/, '');
      const item = typeof serviceOrSlug === 'string'
        ? servicesListSummary.find(s => s.slug === cleanSlug || s.id === slug) || {
            id: slug,
            slug: cleanSlug,
            name: cleanSlug === 'mobile-application'
              ? 'iOS & Android Mobile App Development'
              : cleanSlug === 'web-development'
              ? 'Website & Web Application Development'
              : cleanSlug,
            route: `/service/${cleanSlug}`,
            category: cleanSlug === 'mobile-application' ? 'Mobile & App' : 'Engineering & Web',
            isMainPage: false,
            isPublished: true,
            updatedAt: new Date().toISOString(),
          }
        : serviceOrSlug;
      setSelectedSubService(item);
      setViewMode('edit-sub');
      setSubActiveTab('hero');
      fetchSubServiceData(item.slug || item.id);
    }
  };

  return (
    <ServicesContext.Provider
      value={{
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        subActiveTab,
        setSubActiveTab,
        isSubServiceModalOpen,
        setIsSubServiceModalOpen,
        selectedSubService,
        subServiceData,
        setSubServiceData,
        isSubServiceLoading,
        isSubServiceSaving,
        fetchSubServiceData,
        saveSubServiceData,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        categories,
        servicesListSummary,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        pagination,
        hero,
        setHero,
        servicesList,
        setServicesList,
        highlights,
        setHighlights,
        tools,
        setTools,
        faqs,
        setFaqs,
        testimonials,
        setTestimonials,
        metaTitle,
        setMetaTitle,
        metaDescription,
        setMetaDescription,
        keywords,
        setKeywords,
        isPublished,
        setIsPublished,
        updatedAt,
        isLoading,
        isSaving,
        togglingSlug,
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        isMediaPickerOpen,
        setIsMediaPickerOpen,
        mediaPickerTarget,
        openAssetPicker,
        selectMediaAsset,
        fetchServicesList,
        fetchMainServiceContent,
        saveMainServiceContent,
        toggleServiceStatus,
        openEditMain,
        openEditService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
}
