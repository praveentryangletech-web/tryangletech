/**
 * About Page Content DTO & Section Interfaces
 */

export interface AboutStatItem {
  id?: string;
  value: string;
  label: string;
}

export interface AboutHeroSection {
  subBadgeText: string;
  headline: string;
  introParagraph1: string;
  introParagraph2: string;
  stats: AboutStatItem[];
  heroImage1: string;
  heroImage1Alt?: string;
  heroImage2: string;
  heroImage2Alt?: string;
  bannerImage: string;
  bannerImageAlt?: string;
  avatars?: string[];
}

export interface AboutBenefitItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutSpecialitySection {
  subBadgeText: string;
  heading: string;
  description: string;
  benefits: AboutBenefitItem[];
}

export interface AboutMissionVisionSection {
  subBadgeText: string;
  heading: string;
  headingHighlight: string;
  missionBadge: string;
  missionHeading: string;
  missionParagraph1: string;
  missionParagraph2: string;
  missionBullets: string[];
  missionImage: string;
  missionImageAlt?: string;
  visionBadge: string;
  visionHeading: string;
  visionParagraph1: string;
  visionParagraph2: string;
  visionBullets: string[];
  visionImage: string;
  visionImageAlt?: string;
}

export interface AboutWhyChooseUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutWhyChooseUsSection {
  subBadgeText: string;
  heading: string;
  headingHighlight: string;
  items: AboutWhyChooseUsItem[];
}

export interface AboutProcessStep {
  id: string;
  label: string;
  stepTitle: string;
  description: string;
  icon: string;
}

export interface AboutProcessSection {
  subBadgeText: string;
  heading: string;
  headingHighlight: string;
  steps: AboutProcessStep[];
}

export interface AboutFooterCtaSection {
  subBadgeText: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface AboutFaqItem {
  id: string;
  q: string;
  a: string;
}

export interface AboutFaqSection {
  subBadgeText: string;
  heading: string;
  headingHighlight: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  faqs: AboutFaqItem[];
}

export interface AboutContentDTO {
  id: string;
  hero: AboutHeroSection;
  speciality: AboutSpecialitySection;
  missionVision: AboutMissionVisionSection;
  whyChooseUs: AboutWhyChooseUsSection;
  process: AboutProcessSection;
  ctaBanner: AboutFooterCtaSection;
  faqSection: AboutFaqSection;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  isPublished?: boolean;
  updatedAt?: string;
  etag?: string;
}
