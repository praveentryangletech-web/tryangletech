'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import apiClient from '../utils/apiClient';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';
import {
  AboutContentDTO,
  AboutHeroSection,
  AboutSpecialitySection,
  AboutMissionVisionSection,
  AboutWhyChooseUsSection,
  AboutProcessSection,
  AboutFooterCtaSection,
  AboutFaqSection,
} from '@/backend/services/about/about.types';

export interface AboutContextType {
  // Section States
  hero: AboutHeroSection;
  setHero: React.Dispatch<React.SetStateAction<AboutHeroSection>>;
  speciality: AboutSpecialitySection;
  setSpeciality: React.Dispatch<React.SetStateAction<AboutSpecialitySection>>;
  missionVision: AboutMissionVisionSection;
  setMissionVision: React.Dispatch<React.SetStateAction<AboutMissionVisionSection>>;
  whyChooseUs: AboutWhyChooseUsSection;
  setWhyChooseUs: React.Dispatch<React.SetStateAction<AboutWhyChooseUsSection>>;
  process: AboutProcessSection;
  setProcess: React.Dispatch<React.SetStateAction<AboutProcessSection>>;
  ctaBanner: AboutFooterCtaSection;
  setCtaBanner: React.Dispatch<React.SetStateAction<AboutFooterCtaSection>>;
  faqSection: AboutFaqSection;
  setFaqSection: React.Dispatch<React.SetStateAction<AboutFaqSection>>;

  // SEO & Publication States
  metaTitle: string;
  setMetaTitle: (title: string) => void;
  metaDescription: string;
  setMetaDescription: (desc: string) => void;
  keywords: string;
  setKeywords: (keywords: string) => void;
  canonicalUrl: string;
  setCanonicalUrl: (url: string) => void;
  isPublished: boolean;
  setIsPublished: (published: boolean) => void;
  updatedAt: string;

  // Status & Feedback States
  isLoading: boolean;
  isSaving: boolean;
  successMessage: string;
  setSuccessMessage: (msg: string) => void;
  errorMessage: string;
  setErrorMessage: (err: string) => void;

  // Media Picker Modal State
  isMediaPickerOpen: boolean;
  setIsMediaPickerOpen: (open: boolean) => void;
  mediaPickerTarget: string;
  openAssetPicker: (target: string) => void;
  selectMediaAsset: (url: string, filename?: string) => void;

  // API Methods
  fetchAboutContent: () => Promise<void>;
  saveAboutContent: (publishState?: boolean) => Promise<boolean>;

  // Full Combined DTO
  fullData: AboutContentDTO;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export function AboutProvider({ children }: { children: ReactNode }) {
  // Section States
  const [hero, setHero] = useState<AboutHeroSection>(DEFAULT_ABOUT_CONTENT.hero);
  const [speciality, setSpeciality] = useState<AboutSpecialitySection>(DEFAULT_ABOUT_CONTENT.speciality);
  const [missionVision, setMissionVision] = useState<AboutMissionVisionSection>(DEFAULT_ABOUT_CONTENT.missionVision);
  const [whyChooseUs, setWhyChooseUs] = useState<AboutWhyChooseUsSection>(DEFAULT_ABOUT_CONTENT.whyChooseUs);
  const [process, setProcess] = useState<AboutProcessSection>(DEFAULT_ABOUT_CONTENT.process);
  const [ctaBanner, setCtaBanner] = useState<AboutFooterCtaSection>(DEFAULT_ABOUT_CONTENT.ctaBanner);
  const [faqSection, setFaqSection] = useState<AboutFaqSection>(DEFAULT_ABOUT_CONTENT.faqSection);

  // SEO & Publication States
  const [metaTitle, setMetaTitle] = useState<string>(DEFAULT_ABOUT_CONTENT.metaTitle);
  const [metaDescription, setMetaDescription] = useState<string>(DEFAULT_ABOUT_CONTENT.metaDescription);
  const [keywords, setKeywords] = useState<string>(DEFAULT_ABOUT_CONTENT.keywords.join(', '));
  const [canonicalUrl, setCanonicalUrl] = useState<string>(DEFAULT_ABOUT_CONTENT.canonicalUrl || 'https://tryangletech.com/about');
  const [isPublished, setIsPublished] = useState<boolean>(true);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  // Status & Feedback States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Media Picker Modal State
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState<boolean>(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<string>('');

  /**
   * Fetch About Page Content via apiClient
   */
  const fetchAboutContent = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await apiClient.get<AboutContentDTO>('/api/superadmin/about');
      if (res.success && res.data) {
        const d = res.data;
        if (d.hero) setHero(d.hero);
        if (d.speciality) setSpeciality(d.speciality);
        if (d.missionVision) setMissionVision(d.missionVision);
        if (d.whyChooseUs) setWhyChooseUs(d.whyChooseUs);
        if (d.process) setProcess(d.process);
        if (d.ctaBanner) setCtaBanner(d.ctaBanner);
        if (d.faqSection) setFaqSection(d.faqSection);
        if (d.metaTitle) setMetaTitle(d.metaTitle);
        if (d.metaDescription) setMetaDescription(d.metaDescription);
        if (Array.isArray(d.keywords)) setKeywords(d.keywords.join(', '));
        if (d.canonicalUrl) setCanonicalUrl(d.canonicalUrl);
        if (d.isPublished !== undefined) setIsPublished(Boolean(d.isPublished));
        if (d.updatedAt) setUpdatedAt(d.updatedAt);
      }
    } catch (err: any) {
      console.warn('[AboutContext] Error fetching about content:', err);
      setErrorMessage(err.message || 'Failed to fetch About page content.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutContent();
  }, [fetchAboutContent]);

  /**
   * Save and Publish About Page Content via apiClient
   */
  const saveAboutContent = useCallback(
    async (publishState?: boolean): Promise<boolean> => {
      setIsSaving(true);
      setSuccessMessage('');
      setErrorMessage('');

      const targetPublishState = publishState !== undefined ? publishState : isPublished;

      try {
        const keywordArr = keywords
          .split(',')
          .map((k) => k.trim())
          .filter((k) => k.length > 0);

        const payload: Partial<AboutContentDTO> = {
          hero,
          speciality,
          missionVision,
          whyChooseUs,
          process,
          ctaBanner,
          faqSection,
          metaTitle,
          metaDescription,
          keywords: keywordArr,
          canonicalUrl,
          isPublished: targetPublishState,
        };

        const res = await apiClient.post<AboutContentDTO>('/api/superadmin/about', payload);

        if (!res.success) {
          throw new Error(res.error || 'Failed to save About page content.');
        }

        setIsPublished(targetPublishState);
        setSuccessMessage(
          targetPublishState
            ? 'About page saved & published LIVE successfully!'
            : 'About page saved as private Draft successfully.'
        );

        if (res.data?.updatedAt) {
          setUpdatedAt(res.data.updatedAt);
        }

        setTimeout(() => setSuccessMessage(''), 5000);
        return true;
      } catch (err: any) {
        setErrorMessage(err.message || 'An error occurred while saving.');
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [hero, speciality, missionVision, whyChooseUs, process, ctaBanner, faqSection, metaTitle, metaDescription, keywords, canonicalUrl, isPublished]
  );

  /**
   * Open Asset Picker Modal with target field id
   */
  const openAssetPicker = useCallback((target: string) => {
    setMediaPickerTarget(target);
    setIsMediaPickerOpen(true);
  }, []);

  /**
   * Handle selected media asset from modal
   */
  const selectMediaAsset = useCallback(
    (url: string, filename?: string) => {
      const defaultAlt = filename ? filename.replace(/-/g, ' ') : '';

      if (mediaPickerTarget.startsWith('aboutHeroAvatar_')) {
        const idx = parseInt(mediaPickerTarget.replace('aboutHeroAvatar_', ''), 10);
        setHero((prev) => {
          const copy = [...(prev.avatars || ['#38bdf8', '#3b82f6', '#a855f7'])];
          copy[idx] = url;
          return { ...prev, avatars: copy };
        });
      } else if (mediaPickerTarget === 'aboutHero1') {
        setHero((prev) => ({ ...prev, heroImage1: url, heroImage1Alt: prev.heroImage1Alt || defaultAlt }));
      } else if (mediaPickerTarget === 'aboutHero2') {
        setHero((prev) => ({ ...prev, heroImage2: url, heroImage2Alt: prev.heroImage2Alt || defaultAlt }));
      } else if (mediaPickerTarget === 'aboutBanner') {
        setHero((prev) => ({ ...prev, bannerImage: url, bannerImageAlt: prev.bannerImageAlt || defaultAlt }));
      } else if (mediaPickerTarget.startsWith('aboutSpecialityIcon_')) {
        const idx = parseInt(mediaPickerTarget.replace('aboutSpecialityIcon_', ''), 10);
        if (!isNaN(idx) && speciality.benefits[idx]) {
          const updated = [...speciality.benefits];
          updated[idx].icon = url;
          setSpeciality((prev) => ({ ...prev, benefits: updated }));
        }
      } else if (mediaPickerTarget === 'aboutMission') {
        setMissionVision((prev) => ({ ...prev, missionImage: url, missionImageAlt: prev.missionImageAlt || defaultAlt }));
      } else if (mediaPickerTarget === 'aboutVision') {
        setMissionVision((prev) => ({ ...prev, visionImage: url, visionImageAlt: prev.visionImageAlt || defaultAlt }));
      } else if (mediaPickerTarget.startsWith('aboutWcuIcon_')) {
        const idx = parseInt(mediaPickerTarget.replace('aboutWcuIcon_', ''), 10);
        if (!isNaN(idx) && whyChooseUs.items[idx]) {
          const updated = [...whyChooseUs.items];
          updated[idx].icon = url;
          setWhyChooseUs((prev) => ({ ...prev, items: updated }));
        }
      } else if (mediaPickerTarget.startsWith('aboutProcessIcon_')) {
        const idx = parseInt(mediaPickerTarget.replace('aboutProcessIcon_', ''), 10);
        if (!isNaN(idx) && process.steps[idx]) {
          const updated = [...process.steps];
          updated[idx].icon = url;
          setProcess((prev) => ({ ...prev, steps: updated }));
        }
      }
    },
    [mediaPickerTarget, speciality.benefits, whyChooseUs.items, process.steps]
  );

  const fullData: AboutContentDTO = {
    id: 'about_main_v1',
    hero,
    speciality,
    missionVision,
    whyChooseUs,
    process,
    ctaBanner,
    faqSection,
    metaTitle,
    metaDescription,
    keywords: keywords.split(',').map((k) => k.trim()),
    canonicalUrl,
    isPublished,
    updatedAt,
  };

  return (
    <AboutContext.Provider
      value={{
        hero,
        setHero,
        speciality,
        setSpeciality,
        missionVision,
        setMissionVision,
        whyChooseUs,
        setWhyChooseUs,
        process,
        setProcess,
        ctaBanner,
        setCtaBanner,
        faqSection,
        setFaqSection,
        metaTitle,
        setMetaTitle,
        metaDescription,
        setMetaDescription,
        keywords,
        setKeywords,
        canonicalUrl,
        setCanonicalUrl,
        isPublished,
        setIsPublished,
        updatedAt,
        isLoading,
        isSaving,
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        isMediaPickerOpen,
        setIsMediaPickerOpen,
        mediaPickerTarget,
        openAssetPicker,
        selectMediaAsset,
        fetchAboutContent,
        saveAboutContent,
        fullData,
      }}
    >
      {children}
    </AboutContext.Provider>
  );
}

export function useAbout(): AboutContextType {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error('useAbout must be used within an AboutProvider');
  }
  return context;
}

export default AboutContext;
