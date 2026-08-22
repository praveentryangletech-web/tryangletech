export interface HomeHeroSection {
  subBadgeText: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  floatingBadgeText: string;
  dashboardImage: string;
  dashboardImageAlt?: string;
  avatars?: string[];
  serviceBadges?: Array<{ text: string; icon?: string }>;
}

export interface HomeServiceItem {
  id: string;
  title: string;
  description: string;
  highlightText?: string;
  pills: string[];
  link?: string;
  slug?: string;
  icon?: string;
}

export interface HomeAboutSection {
  subtitle: string;
  heading: string;
  headingHighlight?: string;
  description: string;
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
  }>;
  ctaText: string;
  ctaLink: string;
  image1?: string;
  image2?: string;
}

export interface HomeWhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HomeWhyChooseUsSection {
  subtitle: string;
  heading: string;
  headingHighlight?: string;
  items: HomeWhyChooseUsItem[];
  centerImage: string;
}

export interface HomeHowWeWorkItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HomeHowWeWorkSection {
  subtitle: string;
  heading: string;
  headingHighlight?: string;
  description: string;
  items: HomeHowWeWorkItem[];
  ctaText: string;
  ctaLink: string;
  image1?: string;
  image2?: string;
  image3?: string;
}

export interface HomeTechItem {
  id: string;
  name: string;
  icon: string;
  category?: string;
}

export interface HomeTestimonialItem {
  id: string;
  name: string;
  title: string;
  text: string;
  company?: string;
  review?: string;
  image: string;
  rating?: number;
}

export interface HomeCtaBannerSection {
  subtitle?: string;
  heading: string;
  title?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface HomeContentDTO {
  id: string;
  hero: HomeHeroSection;
  services: HomeServiceItem[];
  about: HomeAboutSection;
  whyChooseUs: HomeWhyChooseUsSection;
  howWeWork: HomeHowWeWorkSection;
  techStack: HomeTechItem[];
  testimonials: HomeTestimonialItem[];
  ctaBanner: HomeCtaBannerSection;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  faqs?: Array<{ q: string; a: string }>;
  updatedAt?: string;
}
