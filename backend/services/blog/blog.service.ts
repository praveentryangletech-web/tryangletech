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
   * Ensure BlogPost schema columns exist in PostgreSQL
   */
  private async ensureBlogSchema(): Promise<void> {
    if (isBlogTableEnsured) return;
    isBlogTableEnsured = true;

    // Run schema synchronization and indexing in background without blocking API queries
    (async () => {
      try {
        const schemaStatements = [
          `CREATE TABLE IF NOT EXISTS "BlogPost" (
            "id" TEXT PRIMARY KEY,
            "slug" TEXT UNIQUE NOT NULL,
            "title" TEXT NOT NULL,
            "category" TEXT NOT NULL,
            "excerpt" TEXT NOT NULL DEFAULT '',
            "content" TEXT NOT NULL DEFAULT '',
            "coverImage" TEXT NOT NULL DEFAULT '',
            "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
            "authorName" TEXT DEFAULT 'TryangleTech Team',
            "authorRole" TEXT DEFAULT 'Content Creators',
            "authorImage" TEXT DEFAULT '',
            "authorBio" TEXT DEFAULT '',
            "readTime" TEXT DEFAULT '5 min read',
            "published" BOOLEAN DEFAULT true,
            "publishedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            "order" INTEGER DEFAULT 0,
            "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
            "section1Heading" TEXT DEFAULT '',
            "section1Paragraph1" TEXT DEFAULT '',
            "section1Paragraph2" TEXT DEFAULT '',
            "quoteText" TEXT DEFAULT '',
            "quoteAuthor" TEXT DEFAULT '',
            "stepsTitle" TEXT DEFAULT '',
            "step1" TEXT DEFAULT '',
            "step2" TEXT DEFAULT '',
            "contentImage1" TEXT DEFAULT '',
            "contentImage2" TEXT DEFAULT '',
            "conclusionTitle" TEXT DEFAULT '',
            "conclusionBody" TEXT DEFAULT '',
            "conclusionPoints" TEXT[] DEFAULT ARRAY[]::TEXT[],
            "metaTitle" TEXT DEFAULT '',
            "metaDescription" TEXT DEFAULT '',
            "canonicalUrl" TEXT DEFAULT '',
            "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
            "viewsCount" INTEGER DEFAULT 0,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
          )`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "section1Heading" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "section1Paragraph1" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "section1Paragraph2" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "quoteText" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "quoteAuthor" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "stepsTitle" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "step1" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "step2" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "contentImage1" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "contentImage2" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "conclusionTitle" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "conclusionBody" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "authorImage" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "authorBio" TEXT DEFAULT ''`,
          `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "conclusionPoints" TEXT[] DEFAULT ARRAY[]::TEXT[]`,
          `CREATE INDEX IF NOT EXISTS "idx_blogpost_slug" ON "BlogPost" ("slug")`,
          `CREATE INDEX IF NOT EXISTS "idx_blogpost_pub_created" ON "BlogPost" ("published", "createdAt" DESC)`,
          `CREATE INDEX IF NOT EXISTS "idx_blogpost_cat_pub" ON "BlogPost" ("category", "published")`,
          `CREATE INDEX IF NOT EXISTS "idx_blogpost_order_created" ON "BlogPost" ("order" ASC, "createdAt" DESC)`,
          `CREATE INDEX IF NOT EXISTS "idx_blogpost_pub_date" ON "BlogPost" ("published", "publishedAt" DESC)`
        ];

        for (const sql of schemaStatements) {
          try {
            await db.$executeRawUnsafe(sql);
          } catch {
            // Ignore non-fatal column/index existence errors
          }
        }
      } catch (err) {
        console.warn('[DB Blog] Background schema check notice:', err);
      }
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
      images: row.images || [],
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
      contentImage2: row.contentImage2 || '',
      conclusionTitle: row.conclusionTitle || '',
      conclusionBody: row.conclusionBody || '',
      conclusionPoints: row.conclusionPoints || [],
      metaTitle: row.metaTitle || '',
      metaDescription: row.metaDescription || '',
      canonicalUrl: row.canonicalUrl || '',
      keywords: row.keywords || [],
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
    const sortBy = params.sortBy || 'createdAt';
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
      const conditions: string[] = [];
      const queryParams: any[] = [];
      let paramIndex = 1;

      if (category && category.toUpperCase() !== 'ALL') {
        conditions.push(`LOWER("category") = LOWER($${paramIndex++})`);
        queryParams.push(category);
      }

      if (status === 'published') {
        conditions.push(`"published" = true`);
      } else if (status === 'draft') {
        conditions.push(`"published" = false`);
      }

      if (search && search.trim()) {
        conditions.push(`(
          "title" ILIKE $${paramIndex} OR
          "excerpt" ILIKE $${paramIndex} OR
          "content" ILIKE $${paramIndex} OR
          "authorName" ILIKE $${paramIndex}
        )`);
        queryParams.push(`%${search.trim()}%`);
        paramIndex++;
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const allowedSortColumns = ['publishedAt', 'createdAt', 'title', 'viewsCount', 'order'];
      const sortColumn = allowedSortColumns.includes(sortBy) ? `"${sortBy}"` : '"publishedAt"';
      const sortDirection = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

      const validatedLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
      const validatedPage = Math.max(Number(page) || 1, 1);
      const offset = (validatedPage - 1) * validatedLimit;

      const limitIdx = paramIndex++;
      queryParams.push(validatedLimit);

      const offsetIdx = paramIndex++;
      queryParams.push(offset);

      const rawRows: any = await db.$queryRawUnsafe(`
        WITH filtered_posts AS (
          SELECT * FROM "BlogPost"
          ${whereClause}
        ),
        total_count AS (
          SELECT COUNT(*)::int as full_count FROM filtered_posts
        )
        SELECT 
          p.*,
          c.full_count
        FROM filtered_posts p
        CROSS JOIN total_count c
        ORDER BY p.${sortColumn} ${sortDirection}, p."createdAt" DESC
        LIMIT $${limitIdx} OFFSET $${offsetIdx}
      `, ...queryParams);

      let total = 0;
      const items: BlogPostItem[] = [];

      if (Array.isArray(rawRows) && rawRows.length > 0) {
        total = Number(rawRows[0].full_count || 0);
        for (const row of rawRows) {
          items.push(this.mapRowToPost(row));
        }
      }

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
      const rows: any = await db.$queryRawUnsafe(
        `SELECT * FROM "BlogPost" WHERE LOWER("slug") = LOWER($1) LIMIT 1`,
        cleanSlug
      );

      if (Array.isArray(rows) && rows.length > 0) {
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
      const rows: any = await db.$queryRawUnsafe(
        `SELECT * FROM "BlogPost" WHERE "id" = $1 OR "slug" = $1 LIMIT 1`,
        id
      );

      if (Array.isArray(rows) && rows.length > 0) {
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
    const images = input.images || [];
    const authorName = input.authorName || 'TryangleTech Team';
    const authorRole = input.authorRole || 'Editorial Team';
    const authorImage = input.authorImage || '';
    const authorBio = input.authorBio || '';
    const readTime = input.readTime || '5 min read';
    const published = input.published !== undefined ? input.published : true;
    let publishedAt: Date;
    if (input.publishedAt) {
      const d = new Date(input.publishedAt);
      if (d.toDateString() === new Date().toDateString()) {
        publishedAt = new Date();
      } else {
        publishedAt = d;
      }
    } else {
      publishedAt = new Date();
    }
    const order = Number(input.order || 0);
    const tags = input.tags || [];

    await db.$executeRawUnsafe(
      `
      INSERT INTO "BlogPost" (
        "id", "slug", "title", "category", "excerpt", "content",
        "coverImage", "images", "authorName", "authorRole", "authorImage", "authorBio", "readTime",
        "published", "publishedAt", "order", "tags",
        "section1Heading", "section1Paragraph1", "section1Paragraph2",
        "quoteText", "quoteAuthor", "stepsTitle", "step1", "step2",
        "contentImage1", "contentImage2", "conclusionTitle", "conclusionBody", "conclusionPoints",
        "metaTitle", "metaDescription", "canonicalUrl", "keywords",
        "createdAt", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12, $13,
        $14, $15, $16, $17,
        $18, $19, $20,
        $21, $22, $23, $24, $25,
        $26, $27, $28, $29, $30,
        $31, $32, $33, $34,
        NOW(), NOW()
      )
      `,
      id,
      slug,
      title,
      category,
      excerpt,
      content,
      coverImage,
      images,
      authorName,
      authorRole,
      authorImage,
      authorBio,
      readTime,
      published,
      publishedAt,
      order,
      tags,
      input.section1Heading || '',
      input.section1Paragraph1 || '',
      input.section1Paragraph2 || '',
      input.quoteText || '',
      input.quoteAuthor || '',
      input.stepsTitle || '',
      input.step1 || '',
      input.step2 || '',
      input.contentImage1 || '',
      input.contentImage2 || '',
      input.conclusionTitle || '',
      input.conclusionBody || '',
      input.conclusionPoints || [],
      input.metaTitle || title,
      input.metaDescription || excerpt,
      input.canonicalUrl || '',
      input.keywords || []
    );

    blogCache.clear();
    const created = await this.getPostById(id);
    return created!;
  }

  /**
   * Update an existing article
   */
  public async updatePost(id: string, input: UpdateBlogPostInput): Promise<BlogPostItem> {
    await this.ensureBlogSchema();

    const existing = await this.getPostById(id);
    if (!existing) {
      throw new Error(`Article with id or slug "${id}" not found.`);
    }

    const title = input.title !== undefined ? input.title.trim() : existing.title;
    const slug = input.slug !== undefined ? input.slug.trim() : existing.slug;
    const category = input.category !== undefined ? input.category : existing.category;
    const excerpt = input.excerpt !== undefined ? input.excerpt : existing.excerpt;
    const content = input.content !== undefined ? input.content : existing.content;
    const coverImage = input.coverImage !== undefined ? input.coverImage : existing.coverImage;
    const images = input.images !== undefined ? input.images : existing.images;
    const authorName = input.authorName !== undefined ? input.authorName : existing.authorName;
    const authorRole = input.authorRole !== undefined ? input.authorRole : existing.authorRole;
    const authorImage = input.authorImage !== undefined ? input.authorImage : existing.authorImage;
    const authorBio = input.authorBio !== undefined ? input.authorBio : existing.authorBio;
    const readTime = input.readTime !== undefined ? input.readTime : existing.readTime;
    const published = input.published !== undefined ? input.published : existing.published;
    const publishedAt = input.publishedAt ? new Date(input.publishedAt) : (existing.publishedAt ? new Date(existing.publishedAt) : new Date());
    const order = input.order !== undefined ? Number(input.order) : existing.order;
    const tags = input.tags !== undefined ? input.tags : existing.tags;

    await db.$executeRawUnsafe(
      `
      UPDATE "BlogPost"
      SET
        "title" = $1,
        "slug" = $2,
        "category" = $3,
        "excerpt" = $4,
        "content" = $5,
        "coverImage" = $6,
        "images" = $7,
        "authorName" = $8,
        "authorRole" = $9,
        "authorImage" = $10,
        "authorBio" = $11,
        "readTime" = $12,
        "published" = $13,
        "publishedAt" = $14,
        "order" = $15,
        "tags" = $16,
        "section1Heading" = $17,
        "section1Paragraph1" = $18,
        "section1Paragraph2" = $19,
        "quoteText" = $20,
        "quoteAuthor" = $21,
        "stepsTitle" = $22,
        "step1" = $23,
        "step2" = $24,
        "contentImage1" = $25,
        "contentImage2" = $26,
        "conclusionTitle" = $27,
        "conclusionBody" = $28,
        "conclusionPoints" = $29,
        "metaTitle" = $30,
        "metaDescription" = $31,
        "canonicalUrl" = $32,
        "keywords" = $33,
        "updatedAt" = NOW()
      WHERE "id" = $34 OR "slug" = $34
      `,
      title,
      slug,
      category,
      excerpt,
      content,
      coverImage,
      images || [],
      authorName,
      authorRole,
      authorImage || '',
      authorBio || '',
      readTime,
      published,
      publishedAt,
      order,
      tags || [],
      input.section1Heading !== undefined ? input.section1Heading : existing.section1Heading || '',
      input.section1Paragraph1 !== undefined ? input.section1Paragraph1 : existing.section1Paragraph1 || '',
      input.section1Paragraph2 !== undefined ? input.section1Paragraph2 : existing.section1Paragraph2 || '',
      input.quoteText !== undefined ? input.quoteText : existing.quoteText || '',
      input.quoteAuthor !== undefined ? input.quoteAuthor : existing.quoteAuthor || '',
      input.stepsTitle !== undefined ? input.stepsTitle : existing.stepsTitle || '',
      input.step1 !== undefined ? input.step1 : existing.step1 || '',
      input.step2 !== undefined ? input.step2 : existing.step2 || '',
      input.contentImage1 !== undefined ? input.contentImage1 : existing.contentImage1 || '',
      input.contentImage2 !== undefined ? input.contentImage2 : existing.contentImage2 || '',
      input.conclusionTitle !== undefined ? input.conclusionTitle : existing.conclusionTitle || '',
      input.conclusionBody !== undefined ? input.conclusionBody : existing.conclusionBody || '',
      input.conclusionPoints !== undefined ? input.conclusionPoints : existing.conclusionPoints || [],
      input.metaTitle !== undefined ? input.metaTitle : existing.metaTitle || '',
      input.metaDescription !== undefined ? input.metaDescription : existing.metaDescription || '',
      input.canonicalUrl !== undefined ? input.canonicalUrl : existing.canonicalUrl || '',
      input.keywords !== undefined ? input.keywords : existing.keywords || [],
      existing.id
    );

    blogCache.clear();
    return (await this.getPostById(existing.id))!;
  }

  /**
   * Delete an article
   */
  public async deletePost(id: string): Promise<boolean> {
    await this.ensureBlogSchema();

    await db.$executeRawUnsafe(
      `DELETE FROM "BlogPost" WHERE "id" = $1 OR "slug" = $1`,
      id
    );

    blogCache.clear();
    return true;
  }

  /**
   * Get blog analytics stats
   */
  public async getBlogStats(): Promise<BlogStats> {
    await this.ensureBlogSchema();

    try {
      const statsRows: any = await db.$queryRawUnsafe(`
        SELECT 
          COUNT(*)::int as total,
          COUNT(CASE WHEN "published" = true THEN 1 END)::int as published,
          COUNT(CASE WHEN "published" = false THEN 1 END)::int as drafts,
          COALESCE(SUM("viewsCount"), 0)::int as views,
          COUNT(DISTINCT "category")::int as categories
        FROM "BlogPost"
      `);

      if (Array.isArray(statsRows) && statsRows.length > 0) {
        const row = statsRows[0];
        return {
          totalPosts: Number(row.total || 0),
          publishedPosts: Number(row.published || 0),
          draftPosts: Number(row.drafts || 0),
          totalViews: Number(row.views || 0),
          categoriesCount: Number(row.categories || 0),
        };
      }
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
