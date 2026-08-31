/**
 * Dynamic Services CMS Types & DTO Definitions
 */

export interface ServiceHeroSection {
  subBadgeText: string;
  headline: string;
  subheadline: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  trustBadges: string[];
  avatars?: string[];
}

export interface ServiceCardItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  link: string;
  images: string[];
  imagesAlt?: string[];
  icon?: string;
  badge?: string;
}

export interface ServiceHighlightPillar {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceHighlightsSection {
  subBadgeText: string;
  heading: string;
  imageMain: string;
  imageMainAlt?: string;
  imageSmall: string;
  imageSmallAlt?: string;
  pillars: ServiceHighlightPillar[];
}

export interface ServiceToolItem {
  id: string;
  name: string;
  icon: string;
  iconAlt?: string;
  category?: string;
}

export interface ServiceToolsSection {
  subBadgeText: string;
  heading: string;
  headingHighlight: string;
  tools: ServiceToolItem[];
}

export interface ServiceFaqItem {
  id: string;
  q: string;
  a: string;
}

export interface ServiceTestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  avatarAlt?: string;
  rating: number;
  content: string;
}

export interface ServiceMainContentDTO {
  id: string;
  hero: ServiceHeroSection;
  servicesList: ServiceCardItem[];
  highlights: ServiceHighlightsSection;
  tools: ServiceToolsSection;
  faqs: ServiceFaqItem[];
  testimonials: ServiceTestimonialItem[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  isPublished?: boolean;
  updatedAt?: string;
  etag?: string;
}

export interface ServicePageSummaryItem {
  id: string;
  slug: string;
  name: string;
  route: string;
  category: string;
  isMainPage: boolean;
  isPublished: boolean;
  updatedAt: string;
}

export interface ServicesPaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ServicesListResponse {
  items: ServicePageSummaryItem[];
  pagination: ServicesPaginationInfo;
  categories: string[];
}

export interface ServicesListFilterOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'all' | 'published' | 'draft';
  category?: string;
}

// ----------------------------------------------------
// SUB-SERVICE (WEB DEV, CUSTOM SOFTWARE, ETC.) DTOs
// ----------------------------------------------------

export interface WebDevHeroBullet {
  id: string;
  iconType: 'performance' | 'seo' | 'responsive' | 'custom';
  title: string;
  desc: string;
}

export interface WebDevHeroSection {
  subBadgeText: string;
  headline: string;
  subheadline: string;
  bullets: WebDevHeroBullet[];
  primaryBtnText: string;
  primaryBtnLink: string;
  smallBadgeText: string;
  imageRightOne?: string;
  imageRightOneAlt?: string;
  imageRightTwo?: string;
  imageRightTwoAlt?: string;
  imageBanner?: string;
  imageBannerAlt?: string;
  imageDot?: string;
  imageDotAlt?: string;
}

export interface WebDevSpecialityCard {
  id: string;
  title: string;
  desc: string;
  icon?: string;
  iconAlt?: string;
  images?: string[];
  imagesAlt?: string[];
}

export interface WebDevSpecialitySection {
  subBadgeText: string;
  heading: string;
  cards: WebDevSpecialityCard[];
}

export interface WebDevTypeCard {
  id: string;
  title: string;
  desc: string;
  icon?: string;
  iconAlt?: string;
  badge?: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
  smallImage?: string;
  smallImageAlt?: string;
}

export interface WebDevTypesSection {
  subBadgeText: string;
  heading: string;
  cards: WebDevTypeCard[];
}

export interface WebDevTechStackItem {
  id: string;
  name: string;
  category: string;
  icon?: string;
  iconAlt?: string;
}

export interface WebDevTechStackSection {
  subBadgeText: string;
  heading: string;
  items: WebDevTechStackItem[];
}

export interface WebDevFaqItem {
  id?: string;
  question: string;
  answer: string;
}

export interface WebDevContentDTO {
  id: string;
  slug: string;
  hero: WebDevHeroSection;
  speciality: WebDevSpecialitySection;
  types: WebDevTypesSection;
  techStack: WebDevTechStackSection;
  faqs: WebDevFaqItem[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  isPublished?: boolean;
  updatedAt?: string;
  etag?: string;
}

