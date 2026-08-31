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

// ----------------------------------------------------
// MOBILE APPLICATION SUB-SERVICE DTOs
// ----------------------------------------------------

export interface MobileAppLogoItem {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface MobileAppHeroSection {
  subBadgeText: string;
  headline: string;
  subheadline: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  trustText: string;
  logos?: MobileAppLogoItem[];
  imageRightOne: string;
  imageRightOneAlt?: string;
  imageRightTwo: string;
  imageRightTwoAlt?: string;
  imageBanner: string;
  imageBannerAlt?: string;
}

export interface MobileAppProcessCard {
  id: string;
  title: string;
  desc: string;
  image: string;
  imageAlt?: string;
  smallImage?: string;
  smallImageAlt?: string;
}

export interface MobileAppProcessSection {
  subBadgeText: string;
  heading: string;
  cards: MobileAppProcessCard[];
}

export interface MobileAppTypeCard {
  id: string;
  title: string;
  desc: string;
  badge?: string;
  image: string;
  imageAlt?: string;
  smallImage?: string;
  smallImageAlt?: string;
}

export interface MobileAppTypesSection {
  subBadgeText: string;
  heading: string;
  description?: string;
  cards: MobileAppTypeCard[];
}

export interface MobileAppEngineeringPillar {
  id: string;
  title: string;
  desc: string;
  icon?: string;
}

export interface MobileAppEngineeringSection {
  subBadgeText: string;
  heading: string;
  description: string;
  badgeTitle: string;
  imageMain: string;
  imageMainAlt?: string;
  imageMarquee: string;
  imageMarqueeAlt?: string;
  pillars: MobileAppEngineeringPillar[];
  ctaText: string;
  ctaLink: string;
}

export interface MobileAppAdvantagePoint {
  id: string;
  title: string;
  desc: string;
  icon?: string;
  iconAlt?: string;
}

export interface MobileAppAdvantageSection {
  subBadgeText: string;
  heading: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  points: MobileAppAdvantagePoint[];
  imageMain: string;
  imageMainAlt?: string;
  imageOverlay: string;
  imageOverlayAlt?: string;
  imageOverlay2: string;
  imageOverlay2Alt?: string;
  imageBadge: string;
  imageBadgeAlt?: string;
}

export interface MobileAppFeatureItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  iconAlt?: string;
}

export interface MobileAppFeaturesSection {
  subBadgeText: string;
  heading: string;
  imageMain: string;
  imageMainAlt?: string;
  items: MobileAppFeatureItem[];
}

export interface MobileAppTestimonialItem {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar: string;
  avatarAlt?: string;
  rating: number;
  highlight: string;
  content: string;
}

export interface MobileAppTestimonialsSection {
  subBadgeText: string;
  heading: string;
  items: MobileAppTestimonialItem[];
}

export interface MobileAppFaqItem {
  id?: string;
  q: string;
  a: string;
}

export interface MobileAppContentDTO {
  id: string;
  slug: string;
  hero: MobileAppHeroSection;
  process: MobileAppProcessSection;
  types: MobileAppTypesSection;
  engineering: MobileAppEngineeringSection;
  advantage: MobileAppAdvantageSection;
  features: MobileAppFeaturesSection;
  testimonials: MobileAppTestimonialsSection;
  faqs: MobileAppFaqItem[];
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

// ----------------------------------------------------
// CUSTOM SOFTWARE SUB-SERVICE DTOs
// ----------------------------------------------------

export interface CustomSoftwareHeroImages {
  hero1?: string;
  hero2?: string;
  hero6?: string;
  hero7?: string;
  hero8?: string;
  hero9?: string;
  heroBannerBottom?: string;
  heroRound?: string;
  bg?: string;
}

export interface CustomSoftwareMarqueeLogo {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface CustomSoftwareHeroSection {
  subBadgeText: string;
  headline: string;
  subheadline: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  images: CustomSoftwareHeroImages;
  marqueeLogos: CustomSoftwareMarqueeLogo[];
}

export interface CustomSoftwareServiceCard {
  id: string;
  title: string;
  desc: string;
  icon: string;
  iconAlt?: string;
}

export interface CustomSoftwareServicesSection {
  subBadgeText: string;
  headline: string;
  description: string;
  cards: CustomSoftwareServiceCard[];
  images: string[];
}

export interface CustomSoftwareStatItem {
  id: string;
  value: string;
  label: string;
}

export interface CustomSoftwareStatsSection {
  subBadgeText: string;
  headline: string;
  items: CustomSoftwareStatItem[];
}

export interface CustomSoftwareAboutFeature {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface CustomSoftwareAboutSection {
  subBadgeText: string;
  headline: string;
  description: string;
  image: string;
  imageAlt?: string;
  features: CustomSoftwareAboutFeature[];
  buttonText: string;
  buttonLink: string;
}

export interface CustomSoftwareProcessStep {
  id: string;
  stepNum: string;
  column: string;
  title: string;
  desc: string;
  bg: string;
  color: string;
  descColor: string;
  shadow: string;
}

export interface CustomSoftwareProcessSection {
  subBadgeText: string;
  headline: string;
  description: string;
  steps: CustomSoftwareProcessStep[];
}

export interface CustomSoftwareTestimonialItem {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar: string;
  avatarAlt?: string;
  rating: number;
  quoteTitle: string;
  quote: string;
}

export interface CustomSoftwareTestimonialsSection {
  subBadgeText: string;
  headline: string;
  items: CustomSoftwareTestimonialItem[];
}

export interface CustomSoftwareFaqItem {
  id?: string;
  q: string;
  a: string;
}

export interface CustomSoftwareContentDTO {
  id: string;
  slug: string;
  hero: CustomSoftwareHeroSection;
  services: CustomSoftwareServicesSection;
  stats: CustomSoftwareStatsSection;
  about: CustomSoftwareAboutSection;
  process: CustomSoftwareProcessSection;
  testimonials: CustomSoftwareTestimonialsSection;
  faqs: CustomSoftwareFaqItem[];
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



