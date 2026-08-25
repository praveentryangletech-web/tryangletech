'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HomeContentDTO, HomeHeroSection, HomeServiceItem, HomeAboutSection, HomeWhyChooseUsSection, HomeHowWeWorkSection, HomeTestimonialItem, HomeCtaBannerSection } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';
import { LocationItem, LocationRegion, LocationFaq } from '@/backend/services/geo/geo.types';
import { apiClient } from '@/app/superadmin/utils/apiClient';

import {
  HomeMediaPickerModal,
  HeroTab,
  ServicesTab,
  AboutTab,
  WhyChooseUsTab,
  HowWeWorkTab,
  TestimonialsTab,
  CtaBannerTab,
  GeoSettingsTab,
  HomePagesTable,
  DuplicateLocationModal,
  DeleteLocationModal,
} from './components';

type HomeTabType = 'hero' | 'services' | 'about' | 'whyChooseUs' | 'howWeWork' | 'testimonials' | 'ctaBanner' | 'geoSettings';

export default function SuperadminUnifiedHomeCMS() {
  // View mode: 'list' (default all pages list) | 'edit-main' | 'edit-location'
  const [viewMode, setViewMode] = useState<'list' | 'edit-main' | 'edit-location'>('list');
  const [activeTab, setActiveTab] = useState<HomeTabType>('hero');

  // Loading & notification states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('All');

  // All location pages
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);

  // Home Content Editor states
  const [hero, setHero] = useState<HomeHeroSection>(DEFAULT_HOME_CONTENT.hero);
  const [services, setServices] = useState<HomeServiceItem[]>(DEFAULT_HOME_CONTENT.services);
  const [about, setAbout] = useState<HomeAboutSection>(DEFAULT_HOME_CONTENT.about);
  const [whyChooseUs, setWhyChooseUs] = useState<HomeWhyChooseUsSection>(DEFAULT_HOME_CONTENT.whyChooseUs);
  const [howWeWork, setHowWeWork] = useState<HomeHowWeWorkSection>(DEFAULT_HOME_CONTENT.howWeWork);
  const [testimonials, setTestimonials] = useState<HomeTestimonialItem[]>(DEFAULT_HOME_CONTENT.testimonials);
  const [ctaBanner, setCtaBanner] = useState<HomeCtaBannerSection>(DEFAULT_HOME_CONTENT.ctaBanner);

  // Location Form states (when editing a location)
  const [locSlug, setLocSlug] = useState('');
  const [locCity, setLocCity] = useState('');
  const [locState, setLocState] = useState('');
  const [locCountry, setLocCountry] = useState('India');
  const [locCountryCode, setLocCountryCode] = useState('IN');
  const [locRegion, setLocRegion] = useState<LocationRegion>('Gujarat');
  const [locRegionCode, setLocRegionCode] = useState('IN-GJ');
  const [locPostalCode, setLocPostalCode] = useState('');
  const [locLatitude, setLocLatitude] = useState('23.0225');
  const [locLongitude, setLocLongitude] = useState('72.5714');
  const [locPopular, setLocPopular] = useState(false);
  const [locIsPublished, setLocIsPublished] = useState(true);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [locMetaTitle, setLocMetaTitle] = useState('');
  const [locMetaDescription, setLocMetaDescription] = useState('');
  const [locKeywords, setLocKeywords] = useState('');
  const [locFaqs, setLocFaqs] = useState<LocationFaq[]>([]);

  // Duplicate Modal State
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [duplicateSource, setDuplicateSource] = useState<{ name: string; slug: string; region?: LocationRegion; country?: string }>({ name: 'Main Homepage', slug: 'main' });
  const [duplicateTargetCity, setDuplicateTargetCity] = useState('');
  const [duplicateTargetSlug, setDuplicateTargetSlug] = useState('');
  const [duplicateTargetRegion, setDuplicateTargetRegion] = useState<LocationRegion>('Gujarat');
  const [duplicateTargetCountry, setDuplicateTargetCountry] = useState('India');
  const [duplicateTargetState, setDuplicateTargetState] = useState('');
  const [duplicateTargetCoords, setDuplicateTargetCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [duplicateTargetPostalCode, setDuplicateTargetPostalCode] = useState('');
  const [duplicateTargetRegionCode, setDuplicateTargetRegionCode] = useState('');
  const [duplicateTargetCountryCode, setDuplicateTargetCountryCode] = useState('');
  const [isDuplicating, setIsDuplicating] = useState(false);

  // Delete Modal State
  const [deletingLocation, setDeletingLocation] = useState<LocationItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Media Picker Modal State
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<string>('');

  // Main Home Data store for SEO/AEO
  const [mainHomeData, setMainHomeData] = useState<HomeContentDTO | null>(null);

  // Backend-side Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }>({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Fetch all data from backend with server-side pagination & filtering
  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      // 1. Fetch Main Home content
      const homeRes = await apiClient.get<HomeContentDTO>('/api/superadmin/home', { useCache: false });
      if (homeRes.success && homeRes.data) {
        const data = homeRes.data;
        setMainHomeData(data);
        // Only populate form state from Main Home if currently in edit-main mode
        if (viewMode === 'edit-main') {
          if (data.hero) setHero(data.hero);
          if (Array.isArray(data.services) && data.services.length > 0) setServices(data.services);
          if (data.about) setAbout(data.about);
          if (data.whyChooseUs) setWhyChooseUs(data.whyChooseUs);
          if (data.howWeWork) setHowWeWork(data.howWeWork);
          if (Array.isArray(data.testimonials) && data.testimonials.length > 0) setTestimonials(data.testimonials);
          if (data.ctaBanner) setCtaBanner(data.ctaBanner);
        }
      }

      // 2. Fetch Backend-Paginated Locations
      const queryParams = new URLSearchParams({
        page: String(currentPage),
        limit: String(itemsPerPage),
        ...(selectedRegionFilter !== 'All' ? { region: selectedRegionFilter } : {}),
        ...(selectedStatusFilter !== 'all' ? { status: selectedStatusFilter } : {}),
        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
      });

      const locRes = await apiClient.get<any>(`/api/superadmin/locations?${queryParams.toString()}`);
      if (locRes.success && Array.isArray(locRes.data)) {
        setLocations(locRes.data);
        if (locRes.pagination) {
          setPagination(locRes.pagination);
        } else {
          const total = locRes.count || locRes.data.length;
          const totalPages = Math.ceil(total / itemsPerPage) || 1;
          setPagination({
            page: currentPage,
            limit: itemsPerPage,
            total,
            totalPages,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
          });
        }
      }
    } catch (err: any) {
      console.warn('Error fetching unified home data:', err);
      setErrorMessage(err?.message || 'Failed to load page data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, selectedRegionFilter, selectedStatusFilter, searchQuery]);

  // Open Edit Mode for Main Home Page
  const openEditMain = () => {
    setSelectedLocation(null);
    setLocSlug('main');
    setLocCity('Ahmedabad');
    setLocState('Gujarat');
    setLocCountry('India');
    setLocCountryCode('IN');
    setLocRegion('Gujarat');
    setLocRegionCode('IN-GJ');
    setLocPostalCode('380015');
    setLocLatitude('23.0225');
    setLocLongitude('72.5714');
    setLocPopular(true);
    setLocMetaTitle(mainHomeData?.metaTitle || 'TryangleTech | Web, App & Custom Software Development in Ahmedabad');
    setLocMetaDescription(mainHomeData?.metaDescription || "Ahmedabad's leading IT team building high-performance websites, iOS/Android apps, and custom software. 350+ projects delivered.");
    setLocKeywords(Array.isArray(mainHomeData?.keywords) ? mainHomeData.keywords.join(', ') : 'Web Development Ahmedabad, Custom Software Ahmedabad, Mobile App Development');
    setLocFaqs(Array.isArray(mainHomeData?.faqs) && mainHomeData.faqs.length > 0 ? mainHomeData.faqs : [
      {
        q: 'Why hire TryangleTech for web and custom software development?',
        a: 'We are an Ahmedabad-based IT team with 7+ years of track record, delivering 350+ projects. You get direct senior engineer communication, transparent pricing, and zero technical jargon.',
      },
      {
        q: 'What technologies and frameworks do you specialize in?',
        a: 'We specialize in Next.js, React, Node.js, Python, TypeScript, Flutter, React Native, PostgreSQL, and AWS Cloud architectures.',
      },
    ]);

    if (mainHomeData?.hero) setHero(mainHomeData.hero);
    else setHero(DEFAULT_HOME_CONTENT.hero);

    if (Array.isArray(mainHomeData?.services) && mainHomeData.services.length > 0) setServices(mainHomeData.services);
    else setServices(DEFAULT_HOME_CONTENT.services);

    if (mainHomeData?.about) setAbout(mainHomeData.about);
    else setAbout(DEFAULT_HOME_CONTENT.about);

    if (mainHomeData?.whyChooseUs) setWhyChooseUs(mainHomeData.whyChooseUs);
    else setWhyChooseUs(DEFAULT_HOME_CONTENT.whyChooseUs);

    if (mainHomeData?.howWeWork) setHowWeWork(mainHomeData.howWeWork);
    else setHowWeWork(DEFAULT_HOME_CONTENT.howWeWork);

    if (Array.isArray(mainHomeData?.testimonials) && mainHomeData.testimonials.length > 0) setTestimonials(mainHomeData.testimonials);
    else setTestimonials(DEFAULT_HOME_CONTENT.testimonials);

    if (mainHomeData?.ctaBanner) setCtaBanner(mainHomeData.ctaBanner);
    else setCtaBanner(DEFAULT_HOME_CONTENT.ctaBanner);

    setActiveTab('hero');
    setViewMode('edit-main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Edit Mode for a specific Location Clone
  const openEditLocation = (loc: LocationItem) => {
    setSelectedLocation(loc);
    setLocSlug(loc.slug);
    setLocCity(loc.city);
    setLocState(loc.state || '');
    setLocCountry(loc.country);
    setLocCountryCode(loc.countryCode || 'IN');
    setLocRegion(loc.region);
    setLocRegionCode(loc.regionCode);
    setLocPostalCode(loc.postalCode || '');
    setLocLatitude(String(loc.coordinates?.latitude || 23.0225));
    setLocLongitude(String(loc.coordinates?.longitude || 72.5714));
    setLocPopular(Boolean(loc.popular));
    setLocIsPublished(loc.isPublished !== undefined ? Boolean(loc.isPublished) : true);
    setLocMetaTitle(loc.metaTitle || `Web Development & Custom Software in ${loc.city} | TryangleTech`);
    setLocMetaDescription(loc.metaDescription || `Top web development and software company serving ${loc.city}. 350+ projects delivered.`);
    setLocKeywords(Array.isArray(loc.keywords) ? loc.keywords.join(', ') : `${loc.city.toLowerCase()} web development, software company in ${loc.city.toLowerCase()}`);
    setLocFaqs(Array.isArray(loc.faqs) && loc.faqs.length > 0 ? loc.faqs : [
      {
        q: `Do you provide on-site consultations for businesses in ${loc.city}?`,
        a: `Yes! We work with enterprise clients and startups across ${loc.city} providing strategic software consulting, high-touch communication, and milestone-driven delivery.`,
      },
      {
        q: `What software services does TryangleTech offer in ${loc.city}?`,
        a: `We build custom web applications, native & cross-platform mobile apps (Flutter, React Native, Swift), enterprise software, CRM/ERP integrations, and cloud architectures.`,
      },
    ]);

    // Set localized section states for editing this location clone
    setHero({
      ...DEFAULT_HOME_CONTENT.hero,
      ...(mainHomeData?.hero || {}),
      ...(loc.hero || {}),
      headline: loc.hero?.headline || `${loc.headlineTitle} ${loc.headlineHighlight}`,
      subheadline: loc.hero?.subheadline || loc.subheadline || DEFAULT_HOME_CONTENT.hero.subheadline,
      subBadgeText: loc.hero?.subBadgeText || `SERVING ${loc.city.toUpperCase()}`,
      dashboardImage: loc.hero?.dashboardImage !== undefined ? loc.hero.dashboardImage : (mainHomeData?.hero?.dashboardImage || DEFAULT_HOME_CONTENT.hero.dashboardImage),
      avatars: loc.hero?.avatars || mainHomeData?.hero?.avatars || DEFAULT_HOME_CONTENT.hero.avatars,
      ctaText: loc.hero?.ctaText || mainHomeData?.hero?.ctaText || DEFAULT_HOME_CONTENT.hero.ctaText,
      ctaLink: loc.hero?.ctaLink || mainHomeData?.hero?.ctaLink || DEFAULT_HOME_CONTENT.hero.ctaLink,
    });

    setServices(
      Array.isArray(loc.services) && loc.services.length > 0
        ? loc.services
        : (mainHomeData?.services || DEFAULT_HOME_CONTENT.services)
    );

    setAbout({
      ...DEFAULT_HOME_CONTENT.about,
      ...(mainHomeData?.about || {}),
      ...(loc.about || {}),
      description: loc.about?.description || loc.aboutText || DEFAULT_HOME_CONTENT.about.description,
      headingHighlight: loc.about?.headingHighlight || `${loc.city} & Global Markets`,
      image1: loc.about?.image1 !== undefined ? loc.about.image1 : (mainHomeData?.about?.image1 || DEFAULT_HOME_CONTENT.about.image1),
      image2: loc.about?.image2 !== undefined ? loc.about.image2 : (mainHomeData?.about?.image2 || DEFAULT_HOME_CONTENT.about.image2),
    });

    setWhyChooseUs(
      loc.whyChooseUs
        ? { ...DEFAULT_HOME_CONTENT.whyChooseUs, ...(mainHomeData?.whyChooseUs || {}), ...loc.whyChooseUs }
        : (mainHomeData?.whyChooseUs || DEFAULT_HOME_CONTENT.whyChooseUs)
    );

    setHowWeWork(
      loc.howWeWork
        ? { ...DEFAULT_HOME_CONTENT.howWeWork, ...(mainHomeData?.howWeWork || {}), ...loc.howWeWork }
        : (mainHomeData?.howWeWork || DEFAULT_HOME_CONTENT.howWeWork)
    );

    setTestimonials(
      Array.isArray(loc.testimonials) && loc.testimonials.length > 0
        ? loc.testimonials
        : (mainHomeData?.testimonials || DEFAULT_HOME_CONTENT.testimonials)
    );

    setCtaBanner(
      loc.ctaBanner
        ? { ...DEFAULT_HOME_CONTENT.ctaBanner, ...(mainHomeData?.ctaBanner || {}), ...loc.ctaBanner }
        : (mainHomeData?.ctaBanner || DEFAULT_HOME_CONTENT.ctaBanner)
    );

    setActiveTab('hero');
    setViewMode('edit-location');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Main Home Page
  const handleSaveMain = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload: Partial<HomeContentDTO> = {
        hero,
        services,
        about,
        whyChooseUs,
        howWeWork,
        testimonials,
        ctaBanner,
        metaTitle: locMetaTitle.trim(),
        metaDescription: locMetaDescription.trim(),
        keywords: locKeywords.split(',').map((k) => k.trim()).filter(Boolean),
        faqs: locFaqs.filter((f) => f.q.trim().length > 0),
      };

      const res = await apiClient.put('/api/superadmin/home', payload);
      if (res.success) {
        setSuccessMessage('Main Home page & SEO/AEO updated live!');
        fetchData();
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setErrorMessage(res.error || 'Failed to save Main Home page.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error updating Home content.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save Location Page (Supports Draft vs Published)
  const handleSaveLocation = async (publishOverride?: boolean) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const targetPublished = publishOverride !== undefined ? publishOverride : locIsPublished;
    setLocIsPublished(targetPublished);

    try {
      const payload: Partial<LocationItem> = {
        slug: locSlug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-'),
        city: locCity.trim(),
        state: locState.trim() || undefined,
        country: locCountry.trim(),
        countryCode: locCountryCode.trim().toUpperCase() || 'IN',
        region: locRegion,
        regionCode: locRegionCode.trim(),
        postalCode: locPostalCode.trim() || undefined,
        coordinates: {
          latitude: parseFloat(locLatitude) || 23.0225,
          longitude: parseFloat(locLongitude) || 72.5714,
        },
        popular: locPopular,
        isPublished: targetPublished,
        headlineTitle: hero.headline.replace(new RegExp(locCity, 'gi'), '').trim() || 'We build websites, apps and custom software for businesses in',
        headlineHighlight: locCity.trim(),
        subheadline: hero.subheadline.trim(),
        aboutText: about.description.trim(),
        metaTitle: locMetaTitle.trim() || `Web Development & Custom Software in ${locCity} | TryangleTech`,
        metaDescription: locMetaDescription.trim() || `Top web development and software company serving ${locCity}. 350+ projects delivered.`,
        keywords: locKeywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
        faqs: locFaqs.filter((f) => f.q.trim().length > 0),
        hero,
        services,
        about,
        whyChooseUs,
        howWeWork,
        testimonials,
        ctaBanner,
      };

      const res = await apiClient.post<any>('/api/superadmin/locations', payload);
      if (res.success) {
        if (res.data) {
          setSelectedLocation(res.data);
        }
        setSuccessMessage(
          targetPublished
            ? `Location "${locCity}" saved & published live!`
            : `Location "${locCity}" saved as Draft (Not Public / Hidden)!`
        );
        fetchData();
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setErrorMessage(res.error || 'Failed to save location.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error saving location.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick Toggle Published / Draft from Table
  const handleQuickToggleStatus = async (slug: string, isPublished: boolean) => {
    try {
      const res = await apiClient.post('/api/superadmin/locations', {
        action: 'toggle-status',
        slug,
        isPublished,
      });
      if (res.success) {
        setSuccessMessage(res.message || `Status updated to ${isPublished ? 'Published' : 'Draft'}.`);
        fetchData();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(res.error || 'Failed to update status.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error updating status.');
    }
  };

  // Open Duplicate Modal
  const openDuplicateModal = (source: { name: string; slug: string; region?: LocationRegion; country?: string }) => {
    setDuplicateSource({ name: source.name, slug: source.slug, region: source.region, country: source.country });
    setDuplicateTargetCity('');
    setDuplicateTargetSlug('');
    setDuplicateTargetRegion(source.region || 'Gujarat');
    setDuplicateTargetCountry(source.country || 'India');
    setDuplicateTargetState('');
    setDuplicateTargetCoords(null);
    setDuplicateTargetPostalCode('');
    setDuplicateTargetRegionCode('');
    setDuplicateTargetCountryCode('');
    setIsDuplicateModalOpen(true);
  };

  // City Search Select callback for Duplicate Modal
  const handleDuplicateCitySelect = (cityItem: any) => {
    setDuplicateTargetCity(cityItem.city);
    setDuplicateTargetSlug(cityItem.slug);
    setDuplicateTargetRegion(cityItem.region);
    setDuplicateTargetCountry(cityItem.country);
    setDuplicateTargetState(cityItem.state || cityItem.city);
    if (cityItem.latitude && cityItem.longitude) {
      setDuplicateTargetCoords({ latitude: cityItem.latitude, longitude: cityItem.longitude });
    }
    setDuplicateTargetPostalCode(cityItem.postalCode || '');
    setDuplicateTargetRegionCode(cityItem.regionCode || '');
    setDuplicateTargetCountryCode(cityItem.countryCode || '');
  };

  // Execute Duplicate / Clone
  const handleExecuteDuplicate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!duplicateTargetCity.trim() || !duplicateTargetSlug.trim()) {
      alert('Target City and Slug are required.');
      return;
    }

    setIsDuplicating(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload = {
        action: 'duplicate',
        sourceSlug: duplicateSource.slug,
        target: {
          city: duplicateTargetCity.trim(),
          slug: duplicateTargetSlug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-'),
          region: duplicateTargetRegion,
          country: duplicateTargetCountry.trim(),
          state: duplicateTargetState || duplicateTargetCity.trim(),
          coordinates: duplicateTargetCoords || undefined,
          postalCode: duplicateTargetPostalCode || undefined,
          regionCode: duplicateTargetRegionCode || undefined,
          countryCode: duplicateTargetCountryCode || undefined,
        },
      };

      const res = await apiClient.post('/api/superadmin/locations', payload);
      if (res.success && res.data) {
        setIsDuplicateModalOpen(false);
        setSuccessMessage(`Successfully cloned "${res.data.city}"! Opening editor...`);
        await fetchData();
        openEditLocation(res.data);
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setErrorMessage(res.error || 'Failed to duplicate page.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error duplicating page.');
    } finally {
      setIsDuplicating(false);
    }
  };

  // Delete Location
  const handleDeleteLocation = async () => {
    if (!deletingLocation) return;
    setIsDeleting(true);

    try {
      const res = await apiClient.delete(`/api/superadmin/locations?slug=${deletingLocation.slug}`);
      if (res.success) {
        setSuccessMessage(`Location "${deletingLocation.city}" deleted.`);
        setDeletingLocation(null);
        fetchData();
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setErrorMessage(res.error || 'Failed to delete location.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error deleting location.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Media Picker Open Trigger
  const handleOpenAssetPicker = (target: string) => {
    setMediaPickerTarget(target);
    setIsMediaPickerOpen(true);
  };

  // Media Asset Selected Callback
  const handleSelectMediaAsset = (url: string) => {
    if (!mediaPickerTarget) return;

    if (mediaPickerTarget === 'hero.dashboardImage') {
      setHero((prev) => ({ ...prev, dashboardImage: url }));
    } else if (mediaPickerTarget.startsWith('hero.avatar.')) {
      const idx = parseInt(mediaPickerTarget.split('.')[2], 10);
      const avatars = [...(hero.avatars && hero.avatars.length > 0 ? hero.avatars : ['#38bdf8', '#3b82f6', '#a855f7'])];
      avatars[idx] = url;
      setHero((prev) => ({ ...prev, avatars }));
    } else if (mediaPickerTarget.startsWith('services.') && mediaPickerTarget.endsWith('.icon')) {
      const idx = parseInt(mediaPickerTarget.split('.')[1], 10);
      setServices((prev) => {
        const copy = [...(prev.length > 0 ? prev : DEFAULT_HOME_CONTENT.services)];
        if (copy[idx]) {
          copy[idx] = { ...copy[idx], icon: url };
        }
        return copy;
      });
    } else if (mediaPickerTarget === 'about.image1') {
      setAbout((prev) => ({ ...prev, image1: url }));
    } else if (mediaPickerTarget === 'about.image2') {
      setAbout((prev) => ({ ...prev, image2: url }));
    } else if (mediaPickerTarget.startsWith('whyChooseUs.items.') && mediaPickerTarget.endsWith('.icon')) {
      const idx = parseInt(mediaPickerTarget.split('.')[2], 10);
      setWhyChooseUs((prev) => {
        const copy = { ...prev, items: [...(prev.items || DEFAULT_HOME_CONTENT.whyChooseUs.items)] };
        if (copy.items[idx]) {
          copy.items[idx] = { ...copy.items[idx], icon: url };
        }
        return copy;
      });
    } else if (mediaPickerTarget.startsWith('howWeWork.items.') && mediaPickerTarget.endsWith('.icon')) {
      const idx = parseInt(mediaPickerTarget.split('.')[2], 10);
      setHowWeWork((prev) => {
        const copy = { ...prev, items: [...(prev.items || DEFAULT_HOME_CONTENT.howWeWork.items)] };
        if (copy.items[idx]) {
          copy.items[idx] = { ...copy.items[idx], icon: url };
        }
        return copy;
      });
    } else if (mediaPickerTarget.startsWith('howWeWork.image')) {
      const field = mediaPickerTarget.split('.')[1] as 'image1' | 'image2' | 'image3';
      setHowWeWork((prev) => ({ ...prev, [field]: url }));
    } else if (mediaPickerTarget.startsWith('testimonials.') && mediaPickerTarget.endsWith('.image')) {
      const idx = parseInt(mediaPickerTarget.split('.')[1], 10);
      setTestimonials((prev) => {
        const copy = [...(prev.length > 0 ? prev : DEFAULT_HOME_CONTENT.testimonials)];
        if (copy[idx]) {
          copy[idx] = { ...copy[idx], image: url };
        }
        return copy;
      });
    } else if (mediaPickerTarget === 'ctaBanner.image') {
      setCtaBanner((prev) => ({ ...prev, image: url }));
    }
  };

  // Reset to page 1 on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegionFilter, searchQuery]);

  // ==========================================
  // RENDER: 1. UNIFIED LIST VIEW (ALL PAGES)
  // ==========================================
  if (viewMode === 'list') {
    return (
      <>
        <HomePagesTable
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRegionFilter={selectedRegionFilter}
          setSelectedRegionFilter={setSelectedRegionFilter}
          selectedStatusFilter={selectedStatusFilter}
          setSelectedStatusFilter={setSelectedStatusFilter}
          onToggleStatus={handleQuickToggleStatus}
          locations={locations}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          pagination={pagination}
          onOpenEditMain={openEditMain}
          onOpenEditLocation={openEditLocation}
          onOpenDuplicateModal={openDuplicateModal}
          onSetDeletingLocation={setDeletingLocation}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />

        {/* Duplicate Modal */}
        <DuplicateLocationModal
          isOpen={isDuplicateModalOpen}
          onClose={() => setIsDuplicateModalOpen(false)}
          duplicateSource={duplicateSource}
          duplicateTargetCity={duplicateTargetCity}
          setDuplicateTargetCity={setDuplicateTargetCity}
          duplicateTargetSlug={duplicateTargetSlug}
          setDuplicateTargetSlug={setDuplicateTargetSlug}
          duplicateTargetRegion={duplicateTargetRegion}
          setDuplicateTargetRegion={setDuplicateTargetRegion}
          duplicateTargetCountry={duplicateTargetCountry}
          setDuplicateTargetCountry={setDuplicateTargetCountry}
          onSelectCity={handleDuplicateCitySelect}
          isDuplicating={isDuplicating}
          onExecuteDuplicate={handleExecuteDuplicate}
        />

        {/* Delete Confirmation Modal */}
        <DeleteLocationModal
          deletingLocation={deletingLocation}
          onClose={() => setDeletingLocation(null)}
          onConfirmDelete={handleDeleteLocation}
          isDeleting={isDeleting}
        />
      </>
    );
  }

  // ==========================================
  // RENDER: 2. UNIFIED 7-TAB / 8-TAB CMS EDITOR
  // ==========================================
  const isEditingLocation = viewMode === 'edit-location';
  const pageTitle = isEditingLocation ? `${selectedLocation?.city} Location Clone` : 'Main Homepage';
  const liveUrl = isEditingLocation ? `/location/${selectedLocation?.slug}` : '/';

  const tabList: Array<{ id: HomeTabType; label: string }> = [
    { id: 'hero', label: '1. Hero Banner' },
    { id: 'services', label: '2. Services Matrix' },
    { id: 'about', label: '3. About & Story' },
    { id: 'whyChooseUs', label: '4. Why Choose Us' },
    { id: 'howWeWork', label: '5. How We Work' },
    { id: 'testimonials', label: '6. Testimonials' },
    { id: 'ctaBanner', label: '7. CTA Banner' },
    { id: 'geoSettings', label: isEditingLocation ? '📍 8. Location & SEO/AEO' : '🔍 8. SEO, GEO & AEO' },
  ];

  if (isLoading) {
    return (
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.25rem 2rem 6rem 2rem', backgroundColor: 'transparent' }}>
        {/* Editor Header Toolbar Skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="rt-skeleton-box" style={{ width: '140px', height: '36px', borderRadius: '8px' }} />
            <div className="rt-skeleton-box" style={{ width: '220px', height: '32px', borderRadius: '6px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="rt-skeleton-box" style={{ width: '120px', height: '38px', borderRadius: '8px' }} />
            <div className="rt-skeleton-box" style={{ width: '135px', height: '38px', borderRadius: '8px' }} />
          </div>
        </div>

        {/* 8 Tabs Skeleton */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '2rem', borderBottom: '1px solid #E2E8F0' }}>
          {['130px', '160px', '140px', '150px', '145px', '140px', '135px', '165px'].map((w, idx) => (
            <div key={idx} className="rt-skeleton-box" style={{ width: w, height: '38px', borderRadius: '8px', flexShrink: 0 }} />
          ))}
        </div>

        {/* Form Fields Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div>
              <div className="rt-skeleton-box" style={{ width: '130px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '44px', borderRadius: '10px' }} />
            </div>
            <div>
              <div className="rt-skeleton-box" style={{ width: '140px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
              <div className="rt-skeleton-box" style={{ width: '100%', height: '44px', borderRadius: '10px' }} />
            </div>
          </div>
          <div>
            <div className="rt-skeleton-box" style={{ width: '150px', height: '14px', marginBottom: '8px', borderRadius: '4px' }} />
            <div className="rt-skeleton-box" style={{ width: '100%', height: '88px', borderRadius: '10px' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.25rem 2rem 6rem 2rem', backgroundColor: 'transparent' }}>
      {/* Editor Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <button
              type="button"
              onClick={() => {
                setViewMode('list');
                fetchData();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              ← Back to All Pages
            </button>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: 'var(--dark-indigo, #1a0b54)' }}>
              {pageTitle}
            </h1>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: isEditingLocation ? '#EFF6FF' : '#DCFCE7', color: isEditingLocation ? 'var(--brand-blue, #1833fe)' : '#166534', border: '1px solid currentColor' }}>
              {liveUrl}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.825rem', color: '#64748B' }}>
            Edit live copy, feature badges, headlines, and localized content blocks.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {isEditingLocation && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 800,
                backgroundColor: locIsPublished ? '#DCFCE7' : '#FEF3C7',
                color: locIsPublished ? '#15803D' : '#B45309',
                border: `1px solid ${locIsPublished ? '#BBF7D0' : '#FDE68A'}`,
              }}
            >
              ● {locIsPublished ? 'Live & Published' : 'Draft / Private'}
            </span>
          )}

          <Link
            href={isEditingLocation ? `${liveUrl}?preview=true` : liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 14px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '0.825rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Preview Live</span>
          </Link>

          {isEditingLocation && (
            <button
              type="button"
              onClick={() => handleSaveLocation(false)}
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '38px',
                padding: '0 16px',
                borderRadius: '8px',
                border: '1.5px solid #F59E0B',
                backgroundColor: '#FFFBEB',
                color: '#B45309',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'all 0.15s ease',
              }}
            >
              <span>Save as Draft</span>
            </button>
          )}

          <button
            type="button"
            onClick={isEditingLocation ? () => handleSaveLocation(true) : handleSaveMain}
            disabled={isSubmitting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '38px',
              padding: '0 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--brand-blue, #1833fe)',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              boxShadow: '0 2px 8px rgba(24, 51, 254, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>{isSubmitting ? 'Saving Live...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div style={{ padding: '10px 16px', backgroundColor: '#ECFDF5', border: '1px solid #34D399', color: '#065F46', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.825rem', fontWeight: 600 }}>
          ✓ {successMessage}
        </div>
      )}
      {errorMessage && (
        <div style={{ padding: '10px 16px', backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#991B1B', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.825rem', fontWeight: 600 }}>
          ⚠ {errorMessage}
        </div>
      )}

      {/* Segmented Tab Navigation Bar */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '20px', borderBottom: '1.5px solid #CBD5E1' }}>
        {tabList.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isActive ? 'var(--brand-blue, #1833fe)' : 'transparent',
                color: isActive ? '#FFFFFF' : '#64748B',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.825rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT CONTAINER - TRANSPARENT CARD BACKGROUND */}
      <div style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}>
        {/* TAB 1: HERO */}
        {activeTab === 'hero' && (
          <HeroTab hero={hero} setHero={setHero} onOpenAssetPicker={handleOpenAssetPicker} />
        )}

        {/* TAB 2: SERVICES */}
        {activeTab === 'services' && (
          <ServicesTab services={services} setServices={setServices} onOpenAssetPicker={handleOpenAssetPicker} />
        )}

        {/* TAB 3: ABOUT */}
        {activeTab === 'about' && (
          <AboutTab about={about} setAbout={setAbout} onOpenAssetPicker={handleOpenAssetPicker} />
        )}

        {/* TAB 4: WHY CHOOSE US */}
        {activeTab === 'whyChooseUs' && (
          <WhyChooseUsTab whyChooseUs={whyChooseUs} setWhyChooseUs={setWhyChooseUs} onOpenAssetPicker={handleOpenAssetPicker} />
        )}

        {/* TAB 5: HOW WE WORK */}
        {activeTab === 'howWeWork' && (
          <HowWeWorkTab howWeWork={howWeWork} setHowWeWork={setHowWeWork} onOpenAssetPicker={handleOpenAssetPicker} />
        )}

        {/* TAB 6: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <TestimonialsTab testimonials={testimonials} setTestimonials={setTestimonials} onOpenAssetPicker={handleOpenAssetPicker} />
        )}

        {/* TAB 7: CTA BANNER */}
        {activeTab === 'ctaBanner' && (
          <CtaBannerTab ctaBanner={ctaBanner} setCtaBanner={setCtaBanner} onOpenAssetPicker={handleOpenAssetPicker} />
        )}

        {/* TAB 8: SEO, GEO & AEO CONTROL CENTER */}
        {activeTab === 'geoSettings' && (
          <GeoSettingsTab
            isEditingLocation={isEditingLocation}
            locSlug={locSlug}
            setLocSlug={setLocSlug}
            locCity={locCity}
            setLocCity={setLocCity}
            locState={locState}
            setLocState={setLocState}
            locCountry={locCountry}
            setLocCountry={setLocCountry}
            locCountryCode={locCountryCode}
            setLocCountryCode={setLocCountryCode}
            locRegion={locRegion}
            setLocRegion={setLocRegion}
            locRegionCode={locRegionCode}
            setLocRegionCode={setLocRegionCode}
            locPostalCode={locPostalCode}
            setLocPostalCode={setLocPostalCode}
            locLatitude={locLatitude}
            setLocLatitude={setLocLatitude}
            locLongitude={locLongitude}
            setLocLongitude={setLocLongitude}
            locPopular={locPopular}
            setLocPopular={setLocPopular}
            locIsPublished={locIsPublished}
            setLocIsPublished={setLocIsPublished}
            locMetaTitle={locMetaTitle}
            setLocMetaTitle={setLocMetaTitle}
            locMetaDescription={locMetaDescription}
            setLocMetaDescription={setLocMetaDescription}
            locKeywords={locKeywords}
            setLocKeywords={setLocKeywords}
            locFaqs={locFaqs}
            setLocFaqs={setLocFaqs}
          />
        )}
      </div>

      {/* Global Media Picker Modal */}
      <HomeMediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleSelectMediaAsset}
        title="Select Asset from Library"
      />
    </div>
  );
}
