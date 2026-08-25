import {
  HomeHeroSection,
  HomeServiceItem,
  HomeAboutSection,
  HomeWhyChooseUsSection,
  HomeHowWeWorkSection,
  HomeTestimonialItem,
  HomeCtaBannerSection,
} from '../home/home.types';

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationFaq {
  q: string;
  a: string;
}

export const DEFAULT_LOCATION_REGIONS: string[] = [
  'Gujarat',
  'India Metros',
  'Middle East',
  'USA & Canada',
  'Europe & UK',
  'Global Hubs',
];

export type LocationRegion = string;

export interface LocationItem {
  slug: string;
  city: string;
  state?: string;
  country: string;
  countryCode: string;
  region: LocationRegion;
  regionCode: string; // e.g. 'IN-GJ', 'IN-MH', 'AE-DU', 'US-NY', 'GB-ENG'
  postalCode?: string;
  coordinates: GeoCoordinates;
  headlineTitle: string;
  headlineHighlight: string;
  subheadline: string;
  aboutText: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs: LocationFaq[];
  popular?: boolean;
  isPublished?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;

  // Dynamic section overrides
  hero?: Partial<HomeHeroSection>;
  services?: HomeServiceItem[];
  about?: Partial<HomeAboutSection>;
  whyChooseUs?: Partial<HomeWhyChooseUsSection>;
  howWeWork?: Partial<HomeHowWeWorkSection>;
  testimonials?: HomeTestimonialItem[];
  ctaBanner?: Partial<HomeCtaBannerSection>;
}

export interface LocationSummaryItem {
  slug: string;
  city: string;
  state?: string;
  country: string;
  countryCode: string;
  region: LocationRegion;
  regionCode: string;
  postalCode?: string;
  coordinates: GeoCoordinates;
  popular: boolean;
  isPublished: boolean;
  metaTitle?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface LocationQueryParams {
  page?: number;
  limit?: number;
  region?: string;
  search?: string;
  popular?: boolean;
  publishedOnly?: boolean;
  status?: 'all' | 'published' | 'draft';
  includeDrafts?: boolean;
}

export interface PaginatedLocationResult {
  items: LocationSummaryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
