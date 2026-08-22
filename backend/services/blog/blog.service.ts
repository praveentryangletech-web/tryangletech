import { Prisma } from '@prisma/client';
import db from '@/backend/db/client';
import { BLOG_POSTS as staticBlogPosts } from '@/app/blog/data';
import {
  BlogPostItem,
  CreateBlogPostInput,
  UpdateBlogPostInput,
  BlogQueryParams,
  PaginatedBlogResult,
  BlogStats,
} from './blog.types';
import { generateBlogSlug } from './blog.validator';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  etag: string;
}

class BlogCacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private maxEntries = 500;
  private defaultTtlMs = 120 * 1000; // 2 minutes

  public generateKey(prefix: string, params: Record<string, any>): string {
    const sortedKeys = Object.keys(params).sort();
    const normalizedParts = sortedKeys.map((k) => `${k}=${String(params[k] ?? '').toLowerCase().trim()}`);
    return `${prefix}:${normalizedParts.join('&')}`;
  }

  public generateEtag(data: any): string {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return `"${Math.abs(hash).toString(36)}-${str.length.toString(36)}"`;
  }

  public get<T>(key: string): CacheEntry<T> | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry as CacheEntry<T>;
  }

  public set<T>(key: string, data: T, ttlMs = this.defaultTtlMs): CacheEntry<T> {
    if (this.cache.size >= this.maxEntries) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }

    const etag = this.generateEtag(data);
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + ttlMs,
      etag,
    };

    this.cache.set(key, entry);
    return entry;
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const blogCache = new BlogCacheManager();

let isBlogTableEnsured = false;

export class BlogService {
  /**
   * Fallback static posts converted to BlogPostItem format
   */
  private getFallbackPosts(): BlogPostItem[] {
    return staticBlogPosts.map((p, idx) => ({
      id: p.id || String(idx + 1),
      slug: p.slug,
      title: p.title,
      category: p.category,
      excerpt: p.title,
      content: '',
      coverImage: p.image,
      images: p.images || (p.image ? [p.image] : []),
      authorName: 'TryangleTech Team',
      authorRole: 'Editorial Team',
      authorImage: '/blog-post-assets/692578de4ba3fb26b16f1dd7_blog-nine.webp',
      authorBio: 'By combining human ingenuity with AI capabilities, organizations can unlock new forms of creative expression. Intelligent systems support ideation, experimentation, and execution, while humans provide vision, empathy, and imagination. Together, they form a powerful partnership for innovation and growth.',
      readTime: '5 min read',
      published: true,
      publishedAt: p.date || '29 Oct 2025',
      order: idx,
      tags: [],
      section1Heading: 'Blending human creativity with machine Intelligence',
      section1Paragraph1: 'The combination of human creativity and AI intelligence unlocks new possibilities for innovation and efficiency. AI tools augment human ideas, automate repetitive tasks, and provide data-driven insights that inspire creative solutions.',
      section1Paragraph2: 'By leveraging AI-powered analytics, generative models, and intelligent workflows, teams can focus on conceptual thinking while leaving mundane tasks to machines. This collaboration ensures that human imagination and computational precision work together to produce remarkable outcomes.',
      quoteText: 'Using this task management system has transformed how we work. Tasks are organized, deadlines are clear, and team collaboration is seamless. Productivity has improved, and projects are delivered on time. Highly recommended for teams looking to streamline workflows and boost efficiency.',
      quoteAuthor: 'Tanya Erin',
      stepsTitle: 'Steps to integrate AI with creative workflows',
      step1: 'Successful integration requires identifying areas where AI can assist, selecting the right tools, and fostering a culture of experimentation. Encourage teams to explore AI-generated suggestions, iterate quickly, and combine them with human intuition.',
      step2: 'Develop a step-by-step plan, including testing, monitoring, and continuous optimization. Train teams to adapt to AI-augmented workflows while maintaining governance, security, and compliance. Regularly evaluate outcomes and refine processes for maximum creative impact.',
      contentImage1: '/blog-post-assets/69030925158024507ce308ad_taskopia-bolog-botom-image-1.png',
      contentImage2: '/blog-post-assets/6903092536e793c51e1b23ab_taskopia-bolog-botom-image-2.webp',
      conclusionTitle: 'The future of human-AI collaboration',
      conclusionBody: 'The collaboration of humans and AI will transform industries, combining artistic expression, strategic thinking, and technical execution. Organizations embracing this partnership will create richer experiences, solve complex problems efficiently, and drive innovation in ways previously unimaginable.',
      conclusionPoints: [
        'AI-powered tools enhance creative workflows.',
        'Data-driven insights inform better decisions.',
        'Collaboration between humans and AI accelerates innovation.',
        'Future solutions will be smarter, faster, and more imaginative.',
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  /**
   * Ensure BlogPost schema columns and high-performance indexes exist in PostgreSQL in the background
   */
  private ensureBlogSchema(): void {
    if (isBlogTableEnsured) return;
    isBlogTableEnsured = true;

    (async () => {
      try {
        await db.$executeRaw`
          ALTER TABLE "BlogPost" 
            ADD COLUMN IF NOT EXISTS "coverImageAlt" TEXT,
            ADD COLUMN IF NOT EXISTS "imageAlt" TEXT,
            ADD COLUMN IF NOT EXISTS "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
            ADD COLUMN IF NOT EXISTS "imageAlts" TEXT[] DEFAULT ARRAY[]::TEXT[],
            ADD COLUMN IF NOT EXISTS "contentImage1Alt" TEXT,
            ADD COLUMN IF NOT EXISTS "contentImage2Alt" TEXT,
            ADD COLUMN IF NOT EXISTS "faqs" JSONB;
          CREATE INDEX IF NOT EXISTS "idx_blogpost_slug_lower" ON "BlogPost" (LOWER("slug"));
          CREATE INDEX IF NOT EXISTS "idx_blogpost_cat_pub_date" ON "BlogPost" ("category", "published", "publishedAt" DESC);
          CREATE INDEX IF NOT EXISTS "idx_blogpost_pub_date" ON "BlogPost" ("published", "publishedAt" DESC);
          CREATE INDEX IF NOT EXISTS "idx_blogpost_created_at" ON "BlogPost" ("createdAt" DESC);
        `;
      } catch (_) {}
    })().catch(() => {});
  }

  private mapRowToPost(row: any): BlogPostItem {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      excerpt: row.excerpt || '',
      content: row.content || '',
      coverImage: row.coverImage || '',
      coverImageAlt: row.coverImageAlt || row.imageAlt || '',
      imageAlt: row.imageAlt || row.coverImageAlt || '',
      images: Array.isArray(row.images) && row.images.length > 0 ? row.images : (row.coverImage ? [row.coverImage] : []),
      imageAlts: Array.isArray(row.imageAlts) ? row.imageAlts : [],
      authorName: row.authorName || 'TryangleTech Team',
      authorRole: row.authorRole || 'Editorial Team',
      authorImage: row.authorImage || '',
      authorBio: row.authorBio || '',
      readTime: row.readTime || '5 min read',
      published: Boolean(row.published),
      publishedAt: row.publishedAt ? new Date(row.publishedAt).toISOString() : undefined,
      order: Number(row.order || 0),
      tags: row.tags || [],
      section1Heading: row.section1Heading || '',
      section1Paragraph1: row.section1Paragraph1 || '',
      section1Paragraph2: row.section1Paragraph2 || '',
      quoteText: row.quoteText || '',
      quoteAuthor: row.quoteAuthor || '',
      stepsTitle: row.stepsTitle || '',
      step1: row.step1 || '',
      step2: row.step2 || '',
      contentImage1: row.contentImage1 || '',
      contentImage1Alt: row.contentImage1Alt || '',
      contentImage2: row.contentImage2 || '',
      contentImage2Alt: row.contentImage2Alt || '',
      conclusionTitle: row.conclusionTitle || '',
      conclusionBody: row.conclusionBody || '',
      conclusionPoints: row.conclusionPoints || [],
      metaTitle: row.metaTitle || '',
      metaDescription: row.metaDescription || '',
      canonicalUrl: row.canonicalUrl || '',
      keywords: row.keywords || [],
      faqs: row.faqs ? (typeof row.faqs === 'string' ? JSON.parse(row.faqs) : row.faqs) : [],
      viewsCount: Number(row.viewsCount || 0),
      createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : new Date().toISOString(),
    };
  }

  /**
   * Get paginated articles with filtering, searching, and caching
   */
  public async getPaginatedPosts(params: BlogQueryParams = {}): Promise<PaginatedBlogResult> {
    const page = Math.max(Number(params.page) || 1, 1);
    const limit = Math.max(Number(params.limit) || 10, 1);
    const category = params.category;
    const search = params.search;
    const status = params.status || 'all';
    const sortBy = params.sortBy || 'publishedAt';
    const sortOrder = params.sortOrder || 'desc';

    const cacheKey = blogCache.generateKey('blog:paginated', {
      page,
      limit,
      category,
      search,
      status,
      sortBy,
      sortOrder,
    });

    const cached = blogCache.get<PaginatedBlogResult>(cacheKey);
    if (cached) {
      return cached.data;
    }

    this.ensureBlogSchema();

    try {
      const conditions: Prisma.Sql[] = [];

      if (category && category.toUpperCase() !== 'ALL') {
        conditions.push(Prisma.sql`LOWER("category") = LOWER(${category})`);
      }

      if (status === 'published') {
        conditions.push(Prisma.sql`"published" = true`);
      } else if (status === 'draft') {
        conditions.push(Prisma.sql`"published" = false`);
      }

      if (search && search.trim()) {
        const term = `%${search.trim()}%`;
        conditions.push(Prisma.sql`(
          "title" ILIKE ${term} OR
          "excerpt" ILIKE ${term} OR
          "content" ILIKE ${term} OR
          "authorName" ILIKE ${term}
        )`);
      }

      const whereClause = conditions.length > 0 ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` : Prisma.empty;
      const offset = (page - 1) * limit;

      const [totalCountRows, rows] = await Promise.race([
        Promise.all([
          db.$queryRaw<any[]>`SELECT COUNT(*)::int as count FROM "BlogPost" ${whereClause}`,
          db.$queryRaw<any[]>`SELECT * FROM "BlogPost" ${whereClause} ORDER BY "publishedAt" DESC, "createdAt" DESC LIMIT ${limit} OFFSET ${offset}`,
        ]),
        new Promise<[any[], any[]]>((_, reject) => setTimeout(() => reject(new Error('DB Query Timeout (2500ms)')), 2500)),
      ]);

      const total = Number(totalCountRows?.[0]?.count || 0);
      const items: BlogPostItem[] = (rows || []).map((r: any) => this.mapRowToPost(r));
      const totalPages = Math.ceil(total / limit) || 1;

      const result: PaginatedBlogResult = {
        items,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        filters: {
          category,
          search,
          status,
          sortBy,
          sortOrder,
        },
      };

      blogCache.set(cacheKey, result);
      return result;
    } catch (err) {
      console.warn('Database error in getPaginatedPosts, falling back to static posts:', err);
      const fallbacks = this.getFallbackPosts();
      const filtered = fallbacks.filter((p) => {
        if (category && category !== 'ALL' && p.category.toLowerCase() !== category.toLowerCase()) return false;
        if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paged = filtered.slice((page - 1) * limit, page * limit);

      return {
        items: paged,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        filters: {
          category,
          search,
          status,
          sortBy,
          sortOrder,
        },
      };
    }
  }

  /**
   * Get single post by slug
   */
  public async getPostBySlug(slug: string): Promise<BlogPostItem | null> {
    const cleanSlug = slug.toLowerCase().trim();
    const cacheKey = `blog:slug:${cleanSlug}`;
    const cached = blogCache.get<BlogPostItem>(cacheKey);
    if (cached) return cached.data;

    this.ensureBlogSchema();

    try {
      const rows = await Promise.race([
        db.$queryRaw<any[]>`
          SELECT * FROM "BlogPost" WHERE LOWER("slug") = ${cleanSlug} LIMIT 1
        `,
        new Promise<any[]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout (2500ms)')), 2500)),
      ]);

      if (rows && rows.length > 0) {
        const post = this.mapRowToPost(rows[0]);
        blogCache.set(cacheKey, post);
        return post;
      }
    } catch (err) {
      console.warn('Database error in getPostBySlug:', err);
    }

    const match = this.getFallbackPosts().find((p) => p.slug.toLowerCase() === cleanSlug);
    return match || null;
  }

  /**
   * Get single post by ID
   */
  public async getPostById(id: string): Promise<BlogPostItem | null> {
    const cacheKey = `blog:id:${id}`;
    const cached = blogCache.get<BlogPostItem>(cacheKey);
    if (cached) return cached.data;

    this.ensureBlogSchema();

    try {
      const rows = await Promise.race([
        db.$queryRaw<any[]>`
          SELECT * FROM "BlogPost" WHERE "id" = ${id} OR "slug" = ${id} LIMIT 1
        `,
        new Promise<any[]>((_, reject) => setTimeout(() => reject(new Error('DB Timeout (2500ms)')), 2500)),
      ]);

      if (rows && rows.length > 0) {
        const post = this.mapRowToPost(rows[0]);
        blogCache.set(cacheKey, post);
        return post;
      }
    } catch (err) {
      console.warn('Database error in getPostById:', err);
    }

    const fallback = this.getFallbackPosts().find((p) => p.id === id || p.slug === id) || null;
    if (fallback) blogCache.set(cacheKey, fallback);
    return fallback;
  }

  /**
   * Create a new article
   */
  public async createPost(input: CreateBlogPostInput): Promise<BlogPostItem> {
    await this.ensureBlogSchema();

    const id = `post_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const title = (input.title || 'Untitled Article').trim();
    const slug = (input.slug || generateBlogSlug(title)).trim();
    const category = input.category || 'Web Development';
    const excerpt = input.excerpt || '';
    const content = input.content || '';
    const coverImage = input.coverImage || '';
    const coverImageAlt = (input.coverImageAlt || input.imageAlt || '').trim();
    const imageAlt = coverImageAlt;
    const images = input.images || [];
    const imageAlts = input.imageAlts || [];
    const authorName = input.authorName || 'TryangleTech Team';
    const authorRole = input.authorRole || 'Editorial Team';
    const authorImage = input.authorImage || '';
    const authorBio = input.authorBio || '';
    const readTime = input.readTime || '5 min read';
    const published = input.published !== undefined ? input.published : true;
    const publishedAt = input.publishedAt ? new Date(input.publishedAt) : new Date();
    const order = Number(input.order || 0);
    const tags = input.tags || [];

    const section1Heading = input.section1Heading || '';
    const section1Paragraph1 = input.section1Paragraph1 || '';
    const section1Paragraph2 = input.section1Paragraph2 || '';
    const quoteText = input.quoteText || '';
    const quoteAuthor = input.quoteAuthor || '';
    const stepsTitle = input.stepsTitle || '';
    const step1 = input.step1 || '';
    const step2 = input.step2 || '';
    const contentImage1 = input.contentImage1 || '';
    const contentImage1Alt = (input.contentImage1Alt || '').trim();
    const contentImage2 = input.contentImage2 || '';
    const contentImage2Alt = (input.contentImage2Alt || '').trim();
    const conclusionTitle = input.conclusionTitle || '';
    const conclusionBody = input.conclusionBody || '';
    const conclusionPoints = input.conclusionPoints || [];

    const faqs = Array.isArray(input.faqs) ? input.faqs : [];
    const faqsJson = JSON.stringify(faqs);

    const metaTitle = input.metaTitle || title;
    const metaDescription = input.metaDescription || excerpt;
    const canonicalUrl = input.canonicalUrl || '';
    const keywords = input.keywords || [];

    await db.$executeRaw`
      INSERT INTO "BlogPost" (
        "id", "slug", "title", "category", "excerpt", "content",
        "coverImage", "coverImageAlt", "imageAlt", "images", "imageAlts", "authorName", "authorRole", "authorImage", "authorBio", "readTime",
        "published", "publishedAt", "order", "tags",
        "section1Heading", "section1Paragraph1", "section1Paragraph2",
        "quoteText", "quoteAuthor", "stepsTitle", "step1", "step2",
        "contentImage1", "contentImage1Alt", "contentImage2", "contentImage2Alt", "conclusionTitle", "conclusionBody", "conclusionPoints",
        "faqs", "metaTitle", "metaDescription", "canonicalUrl", "keywords",
        "createdAt", "updatedAt"
      ) VALUES (
        ${id}, ${slug}, ${title}, ${category}, ${excerpt}, ${content},
        ${coverImage}, ${coverImageAlt}, ${imageAlt}, ${images}::text[], ${imageAlts}::text[], ${authorName}, ${authorRole}, ${authorImage}, ${authorBio}, ${readTime},
        ${published}, ${publishedAt}, ${order}, ${tags},
        ${section1Heading}, ${section1Paragraph1}, ${section1Paragraph2},
        ${quoteText}, ${quoteAuthor}, ${stepsTitle}, ${step1}, ${step2},
        ${contentImage1}, ${contentImage1Alt}, ${contentImage2}, ${contentImage2Alt}, ${conclusionTitle}, ${conclusionBody}, ${conclusionPoints},
        ${faqsJson}::jsonb, ${metaTitle}, ${metaDescription}, ${canonicalUrl}, ${keywords},
        NOW(), NOW()
      )
      ON CONFLICT ("slug") DO UPDATE SET
        "title" = EXCLUDED."title",
        "category" = EXCLUDED."category",
        "excerpt" = EXCLUDED."excerpt",
        "content" = EXCLUDED."content",
        "coverImage" = EXCLUDED."coverImage",
        "coverImageAlt" = EXCLUDED."coverImageAlt",
        "imageAlt" = EXCLUDED."imageAlt",
        "images" = EXCLUDED."images",
        "imageAlts" = EXCLUDED."imageAlts",
        "authorName" = EXCLUDED."authorName",
        "authorRole" = EXCLUDED."authorRole",
        "authorImage" = EXCLUDED."authorImage",
        "authorBio" = EXCLUDED."authorBio",
        "readTime" = EXCLUDED."readTime",
        "published" = EXCLUDED."published",
        "publishedAt" = EXCLUDED."publishedAt",
        "order" = EXCLUDED."order",
        "tags" = EXCLUDED."tags",
        "section1Heading" = EXCLUDED."section1Heading",
        "section1Paragraph1" = EXCLUDED."section1Paragraph1",
        "section1Paragraph2" = EXCLUDED."section1Paragraph2",
        "quoteText" = EXCLUDED."quoteText",
        "quoteAuthor" = EXCLUDED."quoteAuthor",
        "stepsTitle" = EXCLUDED."stepsTitle",
        "step1" = EXCLUDED."step1",
        "step2" = EXCLUDED."step2",
        "contentImage1" = EXCLUDED."contentImage1",
        "contentImage1Alt" = EXCLUDED."contentImage1Alt",
        "contentImage2" = EXCLUDED."contentImage2",
        "contentImage2Alt" = EXCLUDED."contentImage2Alt",
        "conclusionTitle" = EXCLUDED."conclusionTitle",
        "conclusionBody" = EXCLUDED."conclusionBody",
        "conclusionPoints" = EXCLUDED."conclusionPoints",
        "faqs" = EXCLUDED."faqs",
        "metaTitle" = EXCLUDED."metaTitle",
        "metaDescription" = EXCLUDED."metaDescription",
        "canonicalUrl" = EXCLUDED."canonicalUrl",
        "keywords" = EXCLUDED."keywords",
        "updatedAt" = NOW()
    `;

    blogCache.clear();
    const created = (await this.getPostBySlug(slug)) || (await this.getPostById(id));
    return created!;
  }

  /**
   * Update an existing article
   */
  public async updatePost(id: string, input: UpdateBlogPostInput): Promise<BlogPostItem> {
    await this.ensureBlogSchema();

    const updates: Prisma.Sql[] = [];

    if (input.title !== undefined) updates.push(Prisma.sql`"title" = ${input.title.trim()}`);
    if (input.slug !== undefined) updates.push(Prisma.sql`"slug" = ${input.slug.trim()}`);
    if (input.category !== undefined) updates.push(Prisma.sql`"category" = ${input.category}`);
    if (input.excerpt !== undefined) updates.push(Prisma.sql`"excerpt" = ${input.excerpt.trim()}`);
    if (input.content !== undefined) updates.push(Prisma.sql`"content" = ${input.content.trim()}`);
    if (input.coverImage !== undefined) updates.push(Prisma.sql`"coverImage" = ${input.coverImage.trim()}`);
    if (input.coverImageAlt !== undefined) updates.push(Prisma.sql`"coverImageAlt" = ${input.coverImageAlt.trim()}`);
    if (input.imageAlt !== undefined) updates.push(Prisma.sql`"imageAlt" = ${input.imageAlt.trim()}`);
    if (Array.isArray(input.images)) updates.push(Prisma.sql`"images" = ${input.images}::text[]`);
    if (Array.isArray(input.imageAlts)) updates.push(Prisma.sql`"imageAlts" = ${input.imageAlts}::text[]`);
    if (input.authorName !== undefined) updates.push(Prisma.sql`"authorName" = ${input.authorName.trim()}`);
    if (input.authorRole !== undefined) updates.push(Prisma.sql`"authorRole" = ${input.authorRole.trim()}`);
    if (input.authorImage !== undefined) updates.push(Prisma.sql`"authorImage" = ${input.authorImage.trim()}`);
    if (input.authorBio !== undefined) updates.push(Prisma.sql`"authorBio" = ${input.authorBio.trim()}`);
    if (input.readTime !== undefined) updates.push(Prisma.sql`"readTime" = ${input.readTime.trim()}`);
    if (input.published !== undefined) updates.push(Prisma.sql`"published" = ${input.published}`);
    if (input.publishedAt !== undefined) updates.push(Prisma.sql`"publishedAt" = ${new Date(input.publishedAt)}`);
    if (input.order !== undefined) updates.push(Prisma.sql`"order" = ${Number(input.order)}`);
    if (Array.isArray(input.tags)) updates.push(Prisma.sql`"tags" = ${input.tags}`);

    if (input.section1Heading !== undefined) updates.push(Prisma.sql`"section1Heading" = ${input.section1Heading.trim()}`);
    if (input.section1Paragraph1 !== undefined) updates.push(Prisma.sql`"section1Paragraph1" = ${input.section1Paragraph1.trim()}`);
    if (input.section1Paragraph2 !== undefined) updates.push(Prisma.sql`"section1Paragraph2" = ${input.section1Paragraph2.trim()}`);
    if (input.quoteText !== undefined) updates.push(Prisma.sql`"quoteText" = ${input.quoteText.trim()}`);
    if (input.quoteAuthor !== undefined) updates.push(Prisma.sql`"quoteAuthor" = ${input.quoteAuthor.trim()}`);
    if (input.stepsTitle !== undefined) updates.push(Prisma.sql`"stepsTitle" = ${input.stepsTitle.trim()}`);
    if (input.step1 !== undefined) updates.push(Prisma.sql`"step1" = ${input.step1.trim()}`);
    if (input.step2 !== undefined) updates.push(Prisma.sql`"step2" = ${input.step2.trim()}`);
    if (input.contentImage1 !== undefined) updates.push(Prisma.sql`"contentImage1" = ${input.contentImage1.trim()}`);
    if (input.contentImage1Alt !== undefined) updates.push(Prisma.sql`"contentImage1Alt" = ${input.contentImage1Alt.trim()}`);
    if (input.contentImage2 !== undefined) updates.push(Prisma.sql`"contentImage2" = ${input.contentImage2.trim()}`);
    if (input.contentImage2Alt !== undefined) updates.push(Prisma.sql`"contentImage2Alt" = ${input.contentImage2Alt.trim()}`);
    if (input.conclusionTitle !== undefined) updates.push(Prisma.sql`"conclusionTitle" = ${input.conclusionTitle.trim()}`);
    if (input.conclusionBody !== undefined) updates.push(Prisma.sql`"conclusionBody" = ${input.conclusionBody.trim()}`);
    if (Array.isArray(input.conclusionPoints)) updates.push(Prisma.sql`"conclusionPoints" = ${input.conclusionPoints}`);
    if (Array.isArray(input.faqs)) {
      const faqsJson = JSON.stringify(input.faqs);
      updates.push(Prisma.sql`"faqs" = ${faqsJson}::jsonb`);
    }

    if (input.metaTitle !== undefined) updates.push(Prisma.sql`"metaTitle" = ${input.metaTitle.trim()}`);
    if (input.metaDescription !== undefined) updates.push(Prisma.sql`"metaDescription" = ${input.metaDescription.trim()}`);
    if (input.canonicalUrl !== undefined) updates.push(Prisma.sql`"canonicalUrl" = ${input.canonicalUrl.trim()}`);
    if (Array.isArray(input.keywords)) updates.push(Prisma.sql`"keywords" = ${input.keywords}`);

    if (updates.length > 0) {
      await db.$executeRaw`
        UPDATE "BlogPost"
        SET ${Prisma.join(updates, ', ')}, "updatedAt" = NOW()
        WHERE "id" = ${id} OR "slug" = ${id} OR "slug" = ${input.slug || ''}
      `;
    }

    blogCache.clear();
    const updated = (await this.getPostById(id)) || (input.slug ? await this.getPostBySlug(input.slug) : null);
    if (!updated) {
      return this.createPost({ ...input, title: input.title || 'Untitled Article' } as CreateBlogPostInput);
    }
    return updated;
  }

  /**
   * Delete an article
   */
  public async deletePost(id: string): Promise<boolean> {
    await this.ensureBlogSchema();

    await db.$executeRaw`
      DELETE FROM "BlogPost" WHERE "id" = ${id} OR "slug" = ${id}
    `;

    blogCache.clear();
    return true;
  }

  /**
   * Get blog analytics stats
   */
  public async getBlogStats(): Promise<BlogStats> {
    await this.ensureBlogSchema();

    try {
      const [totalCountRows, pubCountRows, draftCountRows, allRows] = await Promise.all([
        db.$queryRaw<any[]>`SELECT COUNT(*)::int as count FROM "BlogPost"`,
        db.$queryRaw<any[]>`SELECT COUNT(*)::int as count FROM "BlogPost" WHERE "published" = true`,
        db.$queryRaw<any[]>`SELECT COUNT(*)::int as count FROM "BlogPost" WHERE "published" = false`,
        db.$queryRaw<any[]>`SELECT "category" FROM "BlogPost"`,
      ]);

      const totalPosts = Number(totalCountRows?.[0]?.count || 0);
      const publishedPosts = Number(pubCountRows?.[0]?.count || 0);
      const draftPosts = Number(draftCountRows?.[0]?.count || 0);
      const categoriesSet = new Set((allRows || []).map((p: any) => p.category?.toLowerCase()?.trim()).filter(Boolean));

      return {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews: totalPosts * 125,
        categoriesCount: categoriesSet.size,
      };
    } catch (err) {
      console.warn('Database error in getBlogStats:', err);
    }

    const fallbacks = this.getFallbackPosts();
    return {
      totalPosts: fallbacks.length,
      publishedPosts: fallbacks.length,
      draftPosts: 0,
      totalViews: 1250,
      categoriesCount: 6,
    };
  }
}

export const blogService = new BlogService();
export default blogService;
