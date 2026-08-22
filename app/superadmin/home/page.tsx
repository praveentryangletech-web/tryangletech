
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Tooltip from '@/app/superadmin/components/Tooltip';
import CustomDropdown from '@/app/superadmin/components/CustomDropdown';
import { HomeContentDTO, HomeHeroSection, HomeServiceItem, HomeAboutSection, HomeWhyChooseUsSection, HomeHowWeWorkSection, HomeTestimonialItem, HomeCtaBannerSection } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';
import { LocationItem, LocationRegion, LocationFaq } from '@/backend/services/geo/geo.types';
import { apiClient } from '@/app/superadmin/utils/apiClient';

const REGION_OPTIONS: LocationRegion[] = [
  'Gujarat',
  'India Metros',
  'Middle East',
  'USA & Canada',
  'Europe & UK',
  'Global Hubs',
];

type HomeTab = 'hero' | 'services' | 'about' | 'whyChooseUs' | 'howWeWork' | 'testimonials' | 'ctaBanner' | 'geoSettings';

export default function SuperadminUnifiedHomeCMS() {
  // View mode: 'list' (default all pages list) | 'edit-main' | 'edit-location'
  const [viewMode, setViewMode] = useState<'list' | 'edit-main' | 'edit-location'>('list');
  const [activeTab, setActiveTab] = useState<HomeTab>('hero');

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
  const [locMetaTitle, setLocMetaTitle] = useState('');
  const [locMetaDescription, setLocMetaDescription] = useState('');
  const [locKeywords, setLocKeywords] = useState('');
  const [locFaqs, setLocFaqs] = useState<LocationFaq[]>([]);

  // Duplicate Modal State
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [duplicateSource, setDuplicateSource] = useState<{ name: string; slug: string }>({ name: 'Main Homepage', slug: 'main' });
  const [duplicateTargetCity, setDuplicateTargetCity] = useState('');
  const [duplicateTargetSlug, setDuplicateTargetSlug] = useState('');
  const [duplicateTargetRegion, setDuplicateTargetRegion] = useState<LocationRegion>('Gujarat');
  const [duplicateTargetCountry, setDuplicateTargetCountry] = useState('India');
  const [isDuplicating, setIsDuplicating] = useState(false);

  // Delete Modal State
  const [deletingLocation, setDeletingLocation] = useState<LocationItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
        if (data.hero) setHero(data.hero);
        if (Array.isArray(data.services) && data.services.length > 0) setServices(data.services);
        if (data.about) setAbout(data.about);
        if (data.whyChooseUs) setWhyChooseUs(data.whyChooseUs);
        if (data.howWeWork) setHowWeWork(data.howWeWork);
        if (Array.isArray(data.testimonials) && data.testimonials.length > 0) setTestimonials(data.testimonials);
        if (data.ctaBanner) setCtaBanner(data.ctaBanner);
      }

      // 2. Fetch Backend-Paginated Locations
      const queryParams = new URLSearchParams({
        page: String(currentPage),
        limit: String(itemsPerPage),
        ...(selectedRegionFilter !== 'All' ? { region: selectedRegionFilter } : {}),
        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
      });

      const locRes = await apiClient.get<any>(`/api/superadmin/locations?${queryParams.toString()}`, { useCache: false });
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
  }, [currentPage, itemsPerPage, selectedRegionFilter, searchQuery]);

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

    // Set localized hero/about overrides for editing
    setHero({
      ...DEFAULT_HOME_CONTENT.hero,
      headline: `${loc.headlineTitle} ${loc.headlineHighlight}`,
      subheadline: loc.subheadline || DEFAULT_HOME_CONTENT.hero.subheadline,
      subBadgeText: `SERVING ${loc.city.toUpperCase()}`,
    });

    setAbout({
      ...DEFAULT_HOME_CONTENT.about,
      description: loc.aboutText || DEFAULT_HOME_CONTENT.about.description,
      headingHighlight: `${loc.city} & Global Markets`,
    });

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

  // Save Location Page
  const handleSaveLocation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

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
      };

      const res = await apiClient.post('/api/superadmin/locations', payload);
      if (res.success) {
        setSuccessMessage(`Location "${locCity}" saved & published live!`);
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

  // Open Duplicate Modal
  const openDuplicateModal = (source: { name: string; slug: string; region?: LocationRegion; country?: string }) => {
    setDuplicateSource({ name: source.name, slug: source.slug });
    setDuplicateTargetCity('');
    setDuplicateTargetSlug('');
    setDuplicateTargetRegion(source.region || 'Gujarat');
    setDuplicateTargetCountry(source.country || 'India');
    setIsDuplicateModalOpen(true);
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

  // Reset to page 1 on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegionFilter, searchQuery]);

  const totalLocations = pagination.total;
  const totalPages = pagination.totalPages || 1;
  const startIndex = totalLocations > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * itemsPerPage, totalLocations);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.65rem 1rem',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    backgroundColor: '#FFFFFF',
    fontSize: '0.875rem',
    fontWeight: 500,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#334155',
    marginBottom: '5px',
  };

  // ==========================================
  // RENDER: 1. UNIFIED LIST VIEW (ALL PAGES)
  // ==========================================
  if (viewMode === 'list') {
    const showMainRow = currentPage === 1 && selectedRegionFilter === 'All' && !searchQuery;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 75px)', minHeight: 0, backgroundColor: 'transparent' }}>
        {/* 1. TOP TOOLBAR */}
        <div style={{ flexShrink: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.25rem 2rem 0.75rem 2rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Search Input on Left */}
            <div style={{ position: 'relative', width: '360px', maxWidth: '100%' }}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by city, slug, country, or region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.65rem 1.15rem 0.65rem 2.4rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  width: '100%',
                  boxSizing: 'border-box',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  fontFamily: 'inherit',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}
              />
            </div>

            {/* Action Buttons on Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '6px 12px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: 'var(--brand-blue, #1833fe)', border: '1px solid #BFDBFE' }}>
                1 Main + {locations.length} Geo Clones
              </span>

              <button
                type="button"
                onClick={() => openDuplicateModal({ name: 'Main Homepage', slug: 'main' })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--brand-blue, #1833fe)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>+</span>
                <span>Create Location Clone</span>
              </button>
            </div>
          </div>

          {/* Region Filter Chips (Scrollable with hidden scrollbar) */}
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              gap: '8px',
              padding: '0 2rem 1rem 2rem',
              overflowX: 'auto',
              overflowY: 'hidden',
              minWidth: 0,
            }}
          >
            {['All', ...REGION_OPTIONS].map((reg) => {
              const isActive = selectedRegionFilter === reg;
              return (
                <Tooltip key={reg} text={reg === 'All' ? 'Show all location pages' : `Filter by ${reg} region`} position="top">
                  <button
                    type="button"
                    onClick={() => setSelectedRegionFilter(reg)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--dark-indigo, #1a0b54)' : '#E2E8F0',
                      backgroundColor: isActive ? 'var(--dark-indigo, #1a0b54)' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      fontSize: '0.775rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {reg}
                  </button>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div style={{ margin: '0 2rem 1rem 2rem', padding: '10px 16px', backgroundColor: '#ECFDF5', border: '1px solid #34D399', color: '#065F46', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 600 }}>
            ✓ {successMessage}
          </div>
        )}
        {errorMessage && (
          <div style={{ margin: '0 2rem 1rem 2rem', padding: '10px 16px', backgroundColor: '#FEF2F2', border: '1px solid #F87171', color: '#991B1B', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 600 }}>
            ⚠ {errorMessage}
          </div>
        )}

        {/* 2. SCROLLABLE TBODY CONTAINER WITH STICKY THEAD */}
        <div
          className="admin-scroll-area"
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'auto',
            width: '100%',
            minHeight: 0,
          }}
        >
          <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backgroundColor: '#F1F5F9',
                boxShadow: '0 1px 0 rgba(0, 0, 0, 0.12)',
              }}
            >
              <tr>
                <th style={{ width: '28%', padding: '0.85rem 0.75rem 0.85rem 2rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  PAGE NAME & IDENTITY
                </th>
                <th style={{ width: '22%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  URL ROUTE
                </th>
                <th style={{ width: '18%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  REGION / COUNTRY
                </th>
                <th style={{ width: '14%', padding: '0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  STATUS
                </th>
                <th style={{ width: '18%', padding: '0.85rem 2rem 0.85rem 0.5rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {/* 1. PRIMARY MAIN HOMEPAGE ROW */}
              {showMainRow && (
                <tr className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: '#F0FDF4' }}>
                  <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534', flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.875rem' }}>
                          Main Homepage
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#166534', fontWeight: 600 }}>
                          Default Core Site
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '6px' }}>
                      /
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.825rem', color: '#334155', fontWeight: 600 }}>
                    Primary Root
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '12px', fontSize: '0.725rem', fontWeight: 700, backgroundColor: '#DCFCE7', color: '#166534', border: '1px solid #BBF7D0' }}>
                      ● Live Default
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Tooltip text="View live homepage in new tab" position="top">
                        <a
                          href="/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: '#EFF6FF',
                            color: 'var(--brand-blue, #1833fe)',
                            border: '1px solid #BFDBFE',
                            height: '30px',
                            padding: '0 8px',
                            borderRadius: '7px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          <span>View</span>
                        </a>
                      </Tooltip>

                      <Tooltip text="Edit Main Homepage in CMS editor" position="top">
                        <button
                          type="button"
                          onClick={openEditMain}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569',
                            height: '30px',
                            width: '30px',
                            padding: 0,
                            borderRadius: '7px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </Tooltip>

                      <Tooltip text="Duplicate homepage into a new location clone" position="top">
                        <button
                          type="button"
                          onClick={() => openDuplicateModal({ name: 'Main Homepage', slug: 'main' })}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569',
                            height: '30px',
                            width: '30px',
                            padding: 0,
                            borderRadius: '7px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        </button>
                      </Tooltip>

                      <Tooltip text="Default Core Site cannot be deleted" position="top">
                        <div
                          style={{
                            height: '30px',
                            width: '30px',
                            borderRadius: '7px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#CBD5E1',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              )}

              {/* 2. PROGRAMMATIC GEO CLONE ROWS */}
              {isLoading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={`skeleton-${idx}`} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                    <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}>
                      <div className="skeleton-shimmer" style={{ height: '18px', width: '120px', borderRadius: '6px' }} />
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <div className="skeleton-shimmer" style={{ height: '18px', width: '100px', borderRadius: '6px' }} />
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <div className="skeleton-shimmer" style={{ height: '18px', width: '90px', borderRadius: '6px' }} />
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <div className="skeleton-shimmer" style={{ height: '18px', width: '60px', borderRadius: '12px' }} />
                    </td>
                    <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right' }}>
                      <div className="skeleton-shimmer" style={{ height: '28px', width: '140px', borderRadius: '6px', marginLeft: 'auto' }} />
                    </td>
                  </tr>
                ))
              ) : locations.length === 0 && (!showMainRow) ? (
                <tr>
                  <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.875rem' }}>
                    No matching location pages found.
                  </td>
                </tr>
              ) : (
                locations.map((loc) => (
                  <tr key={loc.slug} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    <td style={{ padding: '0.75rem 0.75rem 0.75rem 2rem' }}>
                      <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.875rem' }}>
                        {loc.city}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: '#64748B' }}>
                        {loc.state ? `${loc.state} • ` : ''}
                        <span style={{ color: 'var(--brand-blue, #1833fe)', fontWeight: 600 }}>{loc.region}</span>
                      </div>
                    </td>

                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #DBEAFE', display: 'inline-block' }}>
                        /location/{loc.slug}
                      </span>
                    </td>

                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#334155' }}>{loc.country}</span>
                      <span style={{ fontSize: '0.725rem', color: '#64748B', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: 600 }}>
                        {loc.countryCode}
                      </span>
                    </td>

                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {loc.popular ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '12px', fontSize: '0.725rem', fontWeight: 700, backgroundColor: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A' }}>
                          ★ Featured
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '12px', fontSize: '0.725rem', fontWeight: 700, backgroundColor: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}>
                          Geo Clone
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '0.75rem 2rem 0.75rem 0.5rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Tooltip text="View live location page" position="top">
                          <a
                            href={`/location/${loc.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#EFF6FF',
                              color: 'var(--brand-blue, #1833fe)',
                              border: '1px solid #BFDBFE',
                              height: '30px',
                              padding: '0 8px',
                              borderRadius: '7px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            <span>View</span>
                          </a>
                        </Tooltip>

                        <Tooltip text="Edit location in CMS editor" position="top">
                          <button
                            type="button"
                            onClick={() => openEditLocation(loc)}
                            style={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              color: '#475569',
                              height: '30px',
                              width: '30px',
                              padding: 0,
                              borderRadius: '7px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                        </Tooltip>

                        <Tooltip text="Duplicate / clone page" position="top">
                          <button
                            type="button"
                            onClick={() => openDuplicateModal({ name: loc.city, slug: loc.slug, region: loc.region, country: loc.country })}
                            style={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              color: '#475569',
                              height: '30px',
                              width: '30px',
                              padding: 0,
                              borderRadius: '7px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                          </button>
                        </Tooltip>

                        <Tooltip text="Permanently delete location" position="top">
                          <button
                            type="button"
                            onClick={() => setDeletingLocation(loc)}
                            style={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #FECACA',
                              color: '#DC2626',
                              height: '30px',
                              width: '30px',
                              padding: 0,
                              borderRadius: '7px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 3. TFOOTER PAGINATION BAR */}
        <div
          style={{
            flexShrink: 0,
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            padding: '0.85rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Left: Entries Info & Rows Per Page */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span>
              Showing <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{startIndex}</strong> to{' '}
              <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{endIndex}</strong> of{' '}
              <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{totalLocations}</strong> location pages
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.775rem' }}>Rows per page:</span>
              <CustomDropdown<number>
                value={itemsPerPage}
                options={[5, 8, 10, 20]}
                onChange={(val) => {
                  setItemsPerPage(Number(val));
                  setCurrentPage(1);
                }}
                direction="up"
              />
            </div>
          </div>

          {/* Right: Page Navigation & Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Tooltip text="Go to previous page" position="top">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: currentPage === 1 ? '#F8FAFC' : '#FFFFFF',
                  color: currentPage === 1 ? '#CBD5E1' : '#334155',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>‹</span>
                <span>Prev</span>
              </button>
            </Tooltip>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    minWidth: '30px',
                    height: '30px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: currentPage === pageNum ? 'var(--dark-indigo, #1a0b54)' : '#E2E8F0',
                    backgroundColor: currentPage === pageNum ? 'var(--dark-indigo, #1a0b54)' : '#FFFFFF',
                    color: currentPage === pageNum ? '#FFFFFF' : '#475569',
                    fontSize: '0.775rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            <Tooltip text="Go to next page" position="top">
              <button
                type="button"
                disabled={currentPage >= totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: currentPage === totalPages || totalPages === 0 ? '#F8FAFC' : '#FFFFFF',
                  color: currentPage === totalPages || totalPages === 0 ? '#CBD5E1' : '#334155',
                  cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>Next</span>
                <span>›</span>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Duplicate Modal */}
        {isDuplicateModalOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', maxWidth: '480px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
                  Duplicate Page Clone
                </h3>
                <button
                  type="button"
                  onClick={() => setIsDuplicateModalOpen(false)}
                  style={{ background: 'transparent', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: '8px 12px', backgroundColor: '#EFF6FF', borderRadius: '8px', marginBottom: '16px', fontSize: '0.825rem', color: '#1E40AF', border: '1px solid #BFDBFE' }}>
                Source: <strong>{duplicateSource.name}</strong>
              </div>

              <form onSubmit={handleExecuteDuplicate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>Target City Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Jaipur, Berlin"
                    value={duplicateTargetCity}
                    onChange={(e) => {
                      setDuplicateTargetCity(e.target.value);
                      setDuplicateTargetSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                    }}
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label style={labelStyle}>Target URL Slug *</label>
                  <input
                    type="text"
                    placeholder="e.g. pune"
                    value={duplicateTargetSlug}
                    onChange={(e) => setDuplicateTargetSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Region</label>
                    <select
                      value={duplicateTargetRegion}
                      onChange={(e) => setDuplicateTargetRegion(e.target.value as any)}
                      style={{ ...inputStyle, backgroundColor: '#FFFFFF' }}
                    >
                      {REGION_OPTIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <input
                      type="text"
                      value={duplicateTargetCountry}
                      onChange={(e) => setDuplicateTargetCountry(e.target.value)}
                      style={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsDuplicateModalOpen(false)}
                    style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#64748B', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isDuplicating}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: 'var(--brand-blue, #1833fe)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: isDuplicating ? 'not-allowed' : 'pointer',
                      opacity: isDuplicating ? 0.7 : 1,
                    }}
                  >
                    {isDuplicating ? 'Cloning...' : 'Duplicate & Edit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingLocation && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', maxWidth: '440px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
                Delete Location "{deletingLocation.city}"?
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 20px 0' }}>
                Are you sure you want to delete <strong>/location/{deletingLocation.slug}</strong>?
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setDeletingLocation(null)}
                  style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#64748B', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteLocation}
                  disabled={isDeleting}
                  style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#DC2626', color: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER: 2. UNIFIED 7-TAB / 8-TAB CMS EDITOR
  // ==========================================
  const isEditingLocation = viewMode === 'edit-location';
  const pageTitle = isEditingLocation ? `${selectedLocation?.city} Location Clone` : 'Main Homepage';
  const liveUrl = isEditingLocation ? `/location/${selectedLocation?.slug}` : '/';

  const tabList: Array<{ id: HomeTab; label: string }> = [
    { id: 'hero', label: '1. Hero Banner' },
    { id: 'services', label: '2. Services Matrix' },
    { id: 'about', label: '3. About & Story' },
    { id: 'whyChooseUs', label: '4. Why Choose Us' },
    { id: 'howWeWork', label: '5. How We Work' },
    { id: 'testimonials', label: '6. Testimonials' },
    { id: 'ctaBanner', label: '7. CTA Banner' },
    { id: 'geoSettings' as HomeTab, label: isEditingLocation ? '📍 8. Location & SEO/AEO' : '🔍 8. SEO, GEO & AEO' },
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.25rem 2rem 6rem 2rem' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            href={liveUrl}
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
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Preview Live</span>
          </Link>

          <button
            type="button"
            onClick={isEditingLocation ? handleSaveLocation : handleSaveMain}
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

      {/* Segmented Tab Navigation */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
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
                backgroundColor: isActive ? 'var(--brand-blue, #1833fe)' : '#F8FAFC',
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

      {/* TAB CONTENT PANELS */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        {/* TAB 1: HERO */}
        {activeTab === 'hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>Section 1: Hero Banner</h3>
            <div>
              <label style={labelStyle}>Headline Proposition *</label>
              <textarea
                rows={2}
                value={hero.headline}
                onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <div>
              <label style={labelStyle}>Subheadline / Supporting Narrative</label>
              <textarea
                rows={3}
                value={hero.subheadline}
                onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Primary CTA Button Text</label>
                <input
                  type="text"
                  value={hero.ctaText}
                  onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Primary CTA Button Link</label>
                <input
                  type="text"
                  value={hero.ctaLink}
                  onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Hero Dashboard & Right Preview Image */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', marginTop: '6px' }}>
              <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', marginBottom: '12px', fontSize: '0.9rem' }}>
                Hero Visual Assets
              </div>
              <div>
                <label style={labelStyle}>Hero Dashboard Image URL</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '120px',
                      height: '68px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      overflow: 'hidden',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {hero.dashboardImage ? (
                      <img
                        src={hero.dashboardImage}
                        alt="Hero preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Default</span>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="/Taskopia_files/6915c70b7c1f18f1e46e5094_taskopiya-home-two.avif or https://..."
                    value={hero.dashboardImage || ''}
                    onChange={(e) => setHero({ ...hero, dashboardImage: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Social Proof Client Avatars */}
              <div style={{ marginTop: '16px' }}>
                <label style={labelStyle}>Social Proof Client Avatars (3 Images or Hex Codes)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[0, 1, 2].map((idx) => {
                    const avVal = hero.avatars?.[idx] || (idx === 0 ? '#38bdf8' : idx === 1 ? '#3b82f6' : '#a855f7');
                    const isImg = avVal.startsWith('http') || avVal.startsWith('/') || avVal.startsWith('data:');
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: !isImg ? avVal : '#F1F5F9',
                            overflow: 'hidden',
                            flexShrink: 0,
                            border: '1px solid #CBD5E1',
                          }}
                        >
                          {isImg && (
                            <img src={avVal} alt={`Avatar ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder={`Avatar #${idx + 1}`}
                          value={avVal}
                          onChange={(e) => {
                            const newAvatars = [...(hero.avatars || ['#38bdf8', '#3b82f6', '#a855f7'])];
                            newAvatars[idx] = e.target.value;
                            setHero({ ...hero, avatars: newAvatars });
                          }}
                          style={{ ...inputStyle, padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES */}
        {activeTab === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>Section 2: Services Matrix</h3>
            {services.map((srv, idx) => (
              <div key={idx} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', backgroundColor: '#F8FAFC' }}>
                <div style={{ fontWeight: 800, color: 'var(--brand-blue, #1833fe)', marginBottom: '10px', fontSize: '0.875rem' }}>Service #{idx + 1}: {srv.title}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <label style={labelStyle}>Service Title</label>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const copy = [...services];
                        copy[idx] = { ...copy[idx], title: e.target.value };
                        setServices(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Target Link URL</label>
                    <input
                      type="text"
                      value={srv.link || srv.slug || ''}
                      onChange={(e) => {
                        const copy = [...services];
                        copy[idx] = { ...copy[idx], link: e.target.value, slug: e.target.value };
                        setServices(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={labelStyle}>Service Icon / Graphic URL</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {srv.icon ? (
                        <img src={srv.icon} alt="Icon" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Icon</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Icon URL (e.g. /Taskopia_files/... or https://...)"
                      value={srv.icon || ''}
                      onChange={(e) => {
                        const copy = [...services];
                        copy[idx] = { ...copy[idx], icon: e.target.value };
                        setServices(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    rows={2}
                    value={srv.description}
                    onChange={(e) => {
                      const copy = [...services];
                      copy[idx] = { ...copy[idx], description: e.target.value };
                      setServices(copy);
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: ABOUT */}
        {activeTab === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>Section 3: About & Story</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Main Heading Text</label>
                <input
                  type="text"
                  value={about.heading}
                  onChange={(e) => setAbout({ ...about, heading: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Heading Highlight</label>
                <input
                  type="text"
                  value={about.headingHighlight || ''}
                  onChange={(e) => setAbout({ ...about, headingHighlight: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Story Paragraph</label>
              <textarea
                rows={4}
                value={about.description}
                onChange={(e) => setAbout({ ...about, description: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {/* About Visual Illustrations */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', marginBottom: '12px', fontSize: '0.9rem' }}>
                About Section Dynamic Images
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={labelStyle}>About Main Illustration (image1)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {about.image1 ? (
                        <img src={about.image1} alt="About 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Default</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="/Taskopia_files/68ef7bedcf795a787addad8c_Group 2085663562.webp"
                      value={about.image1 || ''}
                      onChange={(e) => setAbout({ ...about, image1: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>About Secondary Graphic (image2)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {about.image2 ? (
                        <img src={about.image2} alt="About 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Default</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="/Taskopia_files/68ef7bed775c847e27d93569_Group 2085663563.webp"
                      value={about.image2 || ''}
                      onChange={(e) => setAbout({ ...about, image2: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: WHY CHOOSE US */}
        {activeTab === 'whyChooseUs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>Section 4: Why Choose Us (Value Pillars)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Heading Text</label>
                <input
                  type="text"
                  value={whyChooseUs.heading}
                  onChange={(e) => setWhyChooseUs({ ...whyChooseUs, heading: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Heading Highlight</label>
                <input
                  type="text"
                  value={whyChooseUs.headingHighlight || ''}
                  onChange={(e) => setWhyChooseUs({ ...whyChooseUs, headingHighlight: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            {(whyChooseUs.items || DEFAULT_HOME_CONTENT.whyChooseUs.items).map((item, idx) => (
              <div key={idx} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', backgroundColor: '#F8FAFC' }}>
                <div style={{ fontWeight: 800, color: 'var(--brand-blue, #1833fe)', marginBottom: '8px', fontSize: '0.85rem' }}>
                  Pillar {idx + 1}: {item.title}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
                  <div>
                    <label style={labelStyle}>Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const copy = { ...whyChooseUs, items: [...(whyChooseUs.items || DEFAULT_HOME_CONTENT.whyChooseUs.items)] };
                        copy.items[idx] = { ...copy.items[idx], title: e.target.value };
                        setWhyChooseUs(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Icon URL</label>
                    <input
                      type="text"
                      placeholder="Icon URL (e.g. /Taskopia_files/...)"
                      value={item.icon || ''}
                      onChange={(e) => {
                        const copy = { ...whyChooseUs, items: [...(whyChooseUs.items || DEFAULT_HOME_CONTENT.whyChooseUs.items)] };
                        copy.items[idx] = { ...copy.items[idx], icon: e.target.value };
                        setWhyChooseUs(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const copy = { ...whyChooseUs, items: [...(whyChooseUs.items || DEFAULT_HOME_CONTENT.whyChooseUs.items)] };
                      copy.items[idx] = { ...copy.items[idx], description: e.target.value };
                      setWhyChooseUs(copy);
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: HOW WE WORK */}
        {activeTab === 'howWeWork' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>Section 5: How We Work (Delivery Process)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Heading Text</label>
                <input
                  type="text"
                  value={howWeWork.heading}
                  onChange={(e) => setHowWeWork({ ...howWeWork, heading: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Heading Highlight</label>
                <input
                  type="text"
                  value={howWeWork.headingHighlight || ''}
                  onChange={(e) => setHowWeWork({ ...howWeWork, headingHighlight: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Process Narrative</label>
              <textarea
                rows={2}
                value={howWeWork.description}
                onChange={(e) => setHowWeWork({ ...howWeWork, description: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {/* Dynamic Step Icons */}
            {(howWeWork.items || DEFAULT_HOME_CONTENT.howWeWork.items).map((st, sIdx) => (
              <div key={sIdx} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', backgroundColor: '#F8FAFC' }}>
                <div style={{ fontWeight: 800, color: 'var(--brand-blue, #1833fe)', marginBottom: '8px', fontSize: '0.85rem' }}>
                  Process Step {sIdx + 1}: {st.title}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
                  <div>
                    <label style={labelStyle}>Step Title</label>
                    <input
                      type="text"
                      value={st.title}
                      onChange={(e) => {
                        const copy = { ...howWeWork, items: [...(howWeWork.items || DEFAULT_HOME_CONTENT.howWeWork.items)] };
                        copy.items[sIdx] = { ...copy.items[sIdx], title: e.target.value };
                        setHowWeWork(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Icon URL</label>
                    <input
                      type="text"
                      placeholder="Icon URL"
                      value={st.icon || ''}
                      onChange={(e) => {
                        const copy = { ...howWeWork, items: [...(howWeWork.items || DEFAULT_HOME_CONTENT.howWeWork.items)] };
                        copy.items[sIdx] = { ...copy.items[sIdx], icon: e.target.value };
                        setHowWeWork(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    rows={2}
                    value={st.description}
                    onChange={(e) => {
                      const copy = { ...howWeWork, items: [...(howWeWork.items || DEFAULT_HOME_CONTENT.howWeWork.items)] };
                      copy.items[sIdx] = { ...copy.items[sIdx], description: e.target.value };
                      setHowWeWork(copy);
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>
            ))}

            {/* Collaboration Process Graphics */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', marginBottom: '12px', fontSize: '0.9rem' }}>
                Process Section Visual Graphics
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[1, 2, 3].map((num) => {
                  const key = `image${num}` as 'image1' | 'image2' | 'image3';
                  const val = howWeWork[key] || '';
                  return (
                    <div key={num}>
                      <label style={labelStyle}>Process Graphic {num}</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {val ? (
                            <img src={val} alt={`Graphic ${num}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <span style={{ fontSize: '0.6rem', color: '#94A3B8' }}>Default</span>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Graphic URL"
                          value={val}
                          onChange={(e) => setHowWeWork({ ...howWeWork, [key]: e.target.value })}
                          style={{ ...inputStyle, padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>Section 6: Client Testimonials</h3>
            {testimonials.map((t, tIdx) => (
              <div key={tIdx} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', backgroundColor: '#F8FAFC' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
                  <div>
                    <label style={labelStyle}>Client Name</label>
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[tIdx] = { ...copy[tIdx], name: e.target.value };
                        setTestimonials(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company / Role</label>
                    <input
                      type="text"
                      value={t.company || ''}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[tIdx] = { ...copy[tIdx], company: e.target.value };
                        setTestimonials(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Client Avatar / Photo */}
                <div style={{ marginBottom: '10px' }}>
                  <label style={labelStyle}>Client Photo / Avatar URL</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {t.image ? (
                        <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Photo</span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Photo URL (e.g. /Taskopia_files/690db2077e68fa707530663f_test-1.webp)"
                      value={t.image || ''}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[tIdx] = { ...copy[tIdx], image: e.target.value };
                        setTestimonials(copy);
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Client Review Text</label>
                  <textarea
                    rows={3}
                    value={t.text || t.review || ''}
                    onChange={(e) => {
                      const copy = [...testimonials];
                      copy[tIdx] = { ...copy[tIdx], text: e.target.value, review: e.target.value };
                      setTestimonials(copy);
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 7: CTA BANNER */}
        {activeTab === 'ctaBanner' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>Section 7: Call to Action Banner</h3>
            <div>
              <label style={labelStyle}>Banner Headline</label>
              <input
                type="text"
                value={ctaBanner.heading || ctaBanner.title || ''}
                onChange={(e) => setCtaBanner({ ...ctaBanner, heading: e.target.value, title: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Banner Description</label>
              <textarea
                rows={2}
                value={ctaBanner.description}
                onChange={(e) => setCtaBanner({ ...ctaBanner, description: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Button Text</label>
                <input
                  type="text"
                  value={ctaBanner.buttonText}
                  onChange={(e) => setCtaBanner({ ...ctaBanner, buttonText: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Button Link</label>
                <input
                  type="text"
                  value={ctaBanner.buttonLink}
                  onChange={(e) => setCtaBanner({ ...ctaBanner, buttonLink: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>CTA Background / Badge Graphic URL</label>
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={ctaBanner.image || ''}
                onChange={(e) => setCtaBanner({ ...ctaBanner, image: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {/* TAB 8: SEO, GEO & AEO CONTROL CENTER */}
        {activeTab === 'geoSettings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Tab Header Banner */}
            <div style={{ padding: '16px 20px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎯 Search, AI & Geo Knowledge Center</span>
                  <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: 'var(--brand-blue, #1833fe)', fontWeight: 800, border: '1px solid #BFDBFE' }}>
                    SEO + AEO + GEO
                  </span>
                </h3>
                <p style={{ margin: 0, fontSize: '0.825rem', color: '#64748B' }}>
                  Manage Google SERP metadata, Schema.org Local Graph, and AI Answer Engine Optimization (ChatGPT, Perplexity, Claude, Google AI Overviews).
                </p>
              </div>
            </div>

            {/* CARD 1: GOOGLE & AI CITATION LIVE PREVIEW */}
            <div style={{ padding: '18px 20px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                  🌐 Google SERP & AI Search Preview
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
                  Live Canonical Rendering
                </span>
              </div>

              {/* SERP Snippet Box */}
              <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', fontFamily: 'Arial, sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--brand-blue, #1833fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '10px', fontWeight: 900 }}>
                    T
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#202124', lineHeight: 1.2 }}>
                    <div style={{ fontWeight: 600 }}>TryangleTech</div>
                    <div style={{ color: '#5f6368', fontSize: '0.72rem' }}>
                      https://tryangletech.com{isEditingLocation ? `/location/${locSlug || 'city'}` : ''}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '1.15rem', color: '#1a0dab', fontWeight: 500, lineHeight: 1.3, marginBottom: '4px', cursor: 'pointer' }}>
                  {locMetaTitle || (isEditingLocation ? `Web Development & Custom Software in ${locCity} | TryangleTech` : 'TryangleTech | Web, App & Custom Software Development')}
                </div>

                <div style={{ fontSize: '0.85rem', color: '#4d5156', lineHeight: 1.4 }}>
                  {locMetaDescription || (isEditingLocation ? `Top web development and software company serving ${locCity}. 350+ projects delivered.` : "Ahmedabad's leading IT team building high-performance websites, iOS/Android apps, and custom software. 350+ projects delivered.")}
                </div>
              </div>

              {/* Character Metrics Bar */}
              <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '0.78rem' }}>
                <div>
                  <strong style={{ color: '#334155' }}>Title Length: </strong>
                  <span style={{ color: (locMetaTitle.length >= 40 && locMetaTitle.length <= 65) ? '#16A34A' : locMetaTitle.length > 65 ? '#DC2626' : '#EA580C', fontWeight: 700 }}>
                    {locMetaTitle.length} / 60 chars
                  </span>
                  <span style={{ color: '#94A3B8', marginLeft: '4px' }}>(Optimal: 50-60)</span>
                </div>
                <div>
                  <strong style={{ color: '#334155' }}>Description Length: </strong>
                  <span style={{ color: (locMetaDescription.length >= 120 && locMetaDescription.length <= 160) ? '#16A34A' : locMetaDescription.length > 160 ? '#DC2626' : '#EA580C', fontWeight: 700 }}>
                    {locMetaDescription.length} / 160 chars
                  </span>
                  <span style={{ color: '#94A3B8', marginLeft: '4px' }}>(Optimal: 140-160)</span>
                </div>
              </div>
            </div>

            {/* CARD 2: CORE SEO META FIELDS */}
            <div style={{ padding: '18px 20px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                🏷️ Core Meta Tags & Search Keywords
              </span>

              <div>
                <label style={labelStyle}>SEO Meta Title *</label>
                <input
                  type="text"
                  value={locMetaTitle}
                  onChange={(e) => setLocMetaTitle(e.target.value)}
                  placeholder="e.g. Web Development & Custom Software in Varanasi | TryangleTech"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>SEO Meta Description *</label>
                <textarea
                  rows={2}
                  value={locMetaDescription}
                  onChange={(e) => setLocMetaDescription(e.target.value)}
                  placeholder="e.g. Leading IT & Web Development company in Varanasi. We build custom websites, iOS/Android mobile apps, and custom software systems with 350+ delivered projects."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Target Keywords & Semantic Entities (comma-separated)</label>
                <input
                  type="text"
                  value={locKeywords}
                  onChange={(e) => setLocKeywords(e.target.value)}
                  placeholder="e.g. varanasi web development, software company varanasi, mobile app developers, IT services"
                  style={inputStyle}
                />
                {/* Live Keyword Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {locKeywords
                    .split(',')
                    .map((k) => k.trim())
                    .filter(Boolean)
                    .map((kw, kwIdx) => (
                      <span key={kwIdx} style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '14px', backgroundColor: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1' }}>
                        #{kw}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* CARD 3: AEO & AI ANSWER ENGINE OPTIMIZATION */}
            <div style={{ padding: '18px 20px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #BFDBFE', boxShadow: '0 2px 10px rgba(24, 51, 254, 0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '0.98rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🤖 AEO & AI Knowledge Engine (ChatGPT, Perplexity & Google AI)</span>
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
                    These structured Q&A pairs are injected into <code>schema.org/FAQPage</code> and <code>Speakable</code> JSON-LD schema for instant AI bot answers & voice search citations.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setLocFaqs([
                      ...locFaqs,
                      {
                        q: isEditingLocation ? `Why hire TryangleTech for web development in ${locCity}?` : 'Why hire TryangleTech for custom software development?',
                        a: isEditingLocation ? `TryangleTech provides enterprise-grade web development and mobile apps for businesses in ${locCity} backed by 7+ years of experience and 350+ delivered projects.` : 'We deliver full-stack web and mobile software with dedicated senior engineer communication and transparent pricing.',
                      },
                    ]);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--brand-blue, #1833fe)',
                    backgroundColor: '#EFF6FF',
                    color: 'var(--brand-blue, #1833fe)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <span>+ Add AEO FAQ Question</span>
                </button>
              </div>

              {/* FAQ Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {locFaqs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#F8FAFC', borderRadius: '8px', color: '#94A3B8', fontSize: '0.85rem' }}>
                    No AEO FAQs added yet. Click &quot;+ Add AEO FAQ Question&quot; above to generate AI citation targets.
                  </div>
                ) : (
                  locFaqs.map((faq, fIdx) => (
                    <div key={fIdx} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', backgroundColor: '#F8FAFC', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                          AEO Query #{fIdx + 1} (Direct AI Citation Target)
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setLocFaqs(locFaqs.filter((_, i) => i !== fIdx));
                          }}
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: '#DC2626',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          ✕ Remove
                        </button>
                      </div>

                      <div style={{ marginBottom: '8px' }}>
                        <label style={labelStyle}>User Query / Voice Prompt</label>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => {
                            const copy = [...locFaqs];
                            copy[fIdx] = { ...copy[fIdx], q: e.target.value };
                            setLocFaqs(copy);
                          }}
                          placeholder="e.g. What software services does TryangleTech offer in this city?"
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Direct AI Answer (Concise citation for Perplexity/ChatGPTBot)</label>
                        <textarea
                          rows={2}
                          value={faq.a}
                          onChange={(e) => {
                            const copy = [...locFaqs];
                            copy[fIdx] = { ...copy[fIdx], a: e.target.value };
                            setLocFaqs(copy);
                          }}
                          placeholder="e.g. TryangleTech develops bespoke Next.js web applications, mobile apps, and custom software systems with 350+ delivered projects."
                          style={{ ...inputStyle, resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* CARD 4: GEO IDENTITY & LOCAL GRAPH (When editing Location Clones) */}
            {isEditingLocation && (
              <div style={{ padding: '18px 20px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
                  📍 Local GEO Entity & GPS Coordinates
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>City Name *</label>
                    <input type="text" value={locCity} onChange={(e) => setLocCity(e.target.value)} style={inputStyle} required />
                  </div>
                  <div>
                    <label style={labelStyle}>URL Slug (/location/[slug]) *</label>
                    <input type="text" value={locSlug} onChange={(e) => setLocSlug(e.target.value)} style={inputStyle} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Region</label>
                    <select value={locRegion} onChange={(e) => setLocRegion(e.target.value as any)} style={{ ...inputStyle, backgroundColor: '#FFFFFF' }}>
                      {REGION_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <input type="text" value={locCountry} onChange={(e) => setLocCountry(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Postal Code</label>
                    <input type="text" value={locPostalCode} onChange={(e) => setLocPostalCode(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>GPS Latitude</label>
                    <input type="number" step="any" value={locLatitude} onChange={(e) => setLocLatitude(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>GPS Longitude</label>
                    <input type="number" step="any" value={locLongitude} onChange={(e) => setLocLongitude(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
                  <input
                    type="checkbox"
                    id="editPopular"
                    checked={locPopular}
                    onChange={(e) => setLocPopular(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--brand-blue, #1833fe)', cursor: 'pointer' }}
                  />
                  <label htmlFor="editPopular" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                    🌟 Featured / Popular Commercial Hub (Highlights on Directory & Menus)
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
