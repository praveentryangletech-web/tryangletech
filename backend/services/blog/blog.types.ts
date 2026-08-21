export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt?: string;
  imageAlt?: string;
  images?: string[];
  imageAlts?: string[];
  authorName?: string;
  authorRole?: string;
  authorImage?: string;
  authorBio?: string;
  readTime?: string;
  published: boolean;
  publishedAt?: string;
  order?: number;
  tags?: string[];
  // Section 1: Intro Story
  section1Heading?: string;
  section1Paragraph1?: string;
  section1Paragraph2?: string;
  // Section 2: Quote Box
  quoteText?: string;
  quoteAuthor?: string;
  // Section 3: Key Steps
  stepsTitle?: string;
  step1?: string;
  step2?: string;
  // Section 4: Mid-Article Images
  contentImage1?: string;
  contentImage1Alt?: string;
  contentImage2?: string;
  contentImage2Alt?: string;
  // Section 5: Conclusion & Takeaways
  conclusionTitle?: string;
  conclusionBody?: string;
  conclusionPoints?: string[];
  // Section 6: SEO
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  keywords?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  viewsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateBlogPostInput = Partial<Omit<BlogPostItem, 'id' | 'createdAt' | 'updatedAt'>>;
export type UpdateBlogPostInput = Partial<BlogPostItem>;

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  status?: 'all' | 'published' | 'draft';
  sortBy?: 'order' | 'createdAt' | 'publishedAt' | 'title' | 'viewsCount';
  sortOrder?: 'asc' | 'desc';
  slug?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedBlogResult {
  items: BlogPostItem[];
  pagination: PaginationMeta;
  filters: {
    category?: string;
    search?: string;
    status?: string;
    sortBy: string;
    sortOrder: string;
  };
}

export type BlogPaginationResult = PaginatedBlogResult;

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
  categoriesCount: number;
}
