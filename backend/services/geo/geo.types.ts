export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationFaq {
  q: string;
  a: string;
}

export type LocationRegion = 'Gujarat' | 'India Metros' | 'Middle East' | 'USA & Canada' | 'Europe & UK' | 'Global Hubs';

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
}

export interface LocationQueryParams {
  page?: number;
  limit?: number;
  region?: string;
  search?: string;
  popular?: boolean;
  publishedOnly?: boolean;
}

export interface PaginatedLocationResult {
  items: LocationItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
