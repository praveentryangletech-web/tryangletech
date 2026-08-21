import db from '@/backend/db/client';

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  q?: string; // alias support
  a?: string; // alias support
  order?: number;
  isPublished?: boolean;
}

/**
 * Standard Default Portfolio FAQs (Template loaded by default and on 1-click load)
 */
export const DEFAULT_PORTFOLIO_FAQS: FAQItem[] = [
  {
    question: 'What services does Tryangletech offer?',
    answer: 'We offer web design & development, digital marketing, SEO, graphics designing, mobile app development, and custom software development — all under one roof.',
    order: 0,
  },
  {
    question: 'Which industries do you serve?',
    answer: 'We serve businesses across healthcare, finance, e-commerce, education, retail, real estate, and more — both in India and internationally.',
    order: 1,
  },
  {
    question: 'Do you provide support after project completion?',
    answer: 'Yes, we provide dedicated ongoing maintenance, security updates, and technical support after every project launch to ensure optimal performance.',
    order: 2,
  },
  {
    question: "What's a typical project timeline?",
    answer: "Timelines vary by scope: responsive websites typically take 2–4 weeks, while complex web applications, mobile apps, and custom software take 4–8 weeks with clear milestone deliverables.",
    order: 3,
  },
  {
    question: 'What technologies do you build with?',
    answer: 'We engineer with high-performance modern tech stacks including React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, and cloud infrastructure tailored to your scale.',
    order: 4,
  },
];

/**
 * Standard Default Blog FAQs
 */
export const DEFAULT_BLOG_FAQS: FAQItem[] = [
  {
    question: 'How often does TryangleTech publish new tech insights?',
    answer: 'We publish weekly in-depth articles, engineering teardowns, design best practices, and AI case studies.',
    order: 0,
  },
  {
    question: 'Can I request a specific topic or tech tutorial?',
    answer: 'Absolutely! Contact our engineering team via the contact page with your questions or requested topics.',
    order: 1,
  },
  {
    question: 'Are the case studies based on real client deployments?',
    answer: 'Yes, all our engineering articles and case studies showcase real-world client architectures, problem-solving, and measurable results.',
    order: 2,
  },
];

let isFaqTableEnsured = false;
let isFaqSeeded = false;

export async function ensureFaqTableExists(): Promise<void> {
  if (isFaqTableEnsured) return;
  try {
    await db.$executeRaw`
      CREATE TABLE IF NOT EXISTS "PageFAQ" (
        "id" TEXT PRIMARY KEY,
        "pageType" TEXT NOT NULL,
        "pageId" TEXT,
        "question" TEXT NOT NULL,
        "answer" TEXT NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        "isPublished" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await db.$executeRaw`
      CREATE INDEX IF NOT EXISTS "PageFAQ_pageType_pageId_order_idx" ON "PageFAQ"("pageType", "pageId", "order");
    `;
    await db.$executeRaw`
      CREATE INDEX IF NOT EXISTS "PageFAQ_pageType_isPublished_idx" ON "PageFAQ"("pageType", "isPublished");
    `;
    isFaqTableEnsured = true;
  } catch (err) {
    console.warn('[FAQ Service] ensureFaqTableExists warning (table may already exist):', err);
    isFaqTableEnsured = true;
  }
}

/**
 * Automatically seeds default portfolio and blog FAQs into PostgreSQL PageFAQ table
 */
export async function seedDefaultFAQsIfEmpty(): Promise<void> {
  if (isFaqSeeded) return;
  isFaqSeeded = true;
  await ensureFaqTableExists();

  try {
    // 1. Seed Portfolio Main Default FAQs into database if not present
    const portfolioCount = await db.$queryRaw<Array<{ count: bigint | number }>>`
      SELECT COUNT(*) as count FROM "PageFAQ"
      WHERE "pageType" = 'PORTFOLIO_MAIN' AND ("pageId" IS NULL OR "pageId" = '')
    `;
    const pCount = Number(portfolioCount?.[0]?.count || 0);

    if (pCount === 0) {
      for (let i = 0; i < DEFAULT_PORTFOLIO_FAQS.length; i++) {
        const item = DEFAULT_PORTFOLIO_FAQS[i];
        const id = `default_portfolio_faq_${i + 1}`;
        await db.$executeRaw`
          INSERT INTO "PageFAQ" ("id", "pageType", "pageId", "question", "answer", "order", "isPublished", "createdAt", "updatedAt")
          VALUES (${id}, 'PORTFOLIO_MAIN', NULL, ${item.question}, ${item.answer}, ${i}, true, NOW(), NOW())
          ON CONFLICT ("id") DO NOTHING
        `;
      }
    }

    // 2. Seed Blog Main Default FAQs into database if not present
    const blogCount = await db.$queryRaw<Array<{ count: bigint | number }>>`
      SELECT COUNT(*) as count FROM "PageFAQ"
      WHERE "pageType" = 'BLOG_MAIN' AND ("pageId" IS NULL OR "pageId" = '')
    `;
    const bCount = Number(blogCount?.[0]?.count || 0);

    if (bCount === 0) {
      for (let i = 0; i < DEFAULT_BLOG_FAQS.length; i++) {
        const item = DEFAULT_BLOG_FAQS[i];
        const id = `default_blog_faq_${i + 1}`;
        await db.$executeRaw`
          INSERT INTO "PageFAQ" ("id", "pageType", "pageId", "question", "answer", "order", "isPublished", "createdAt", "updatedAt")
          VALUES (${id}, 'BLOG_MAIN', NULL, ${item.question}, ${item.answer}, ${i}, true, NOW(), NOW())
          ON CONFLICT ("id") DO NOTHING
        `;
      }
    }
  } catch (err) {
    console.warn('[FAQ Service] seedDefaultFAQsIfEmpty warning:', err);
  }
}

export const faqService = {
  /**
   * Get default template FAQs by page type from the database (with fallback to templates)
   */
  async getDefaultFAQs(pageType: string = 'PORTFOLIO'): Promise<FAQItem[]> {
    await ensureFaqTableExists();
    await seedDefaultFAQsIfEmpty();

    const targetType = pageType.toUpperCase().includes('BLOG') ? 'BLOG_MAIN' : 'PORTFOLIO_MAIN';

    try {
      const rows = await db.$queryRaw<any[]>`
        SELECT * FROM "PageFAQ"
        WHERE "pageType" = ${targetType} AND ("pageId" IS NULL OR "pageId" = '') AND "isPublished" = true
        ORDER BY "order" ASC, "createdAt" ASC
      `;

      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          question: r.question,
          answer: r.answer,
          q: r.question,
          a: r.answer,
          order: r.order,
          isPublished: r.isPublished,
        }));
      }
    } catch (err) {
      console.warn('[FAQ Service] getDefaultFAQs DB query warning:', err);
    }

    return targetType === 'BLOG_MAIN' ? DEFAULT_BLOG_FAQS : DEFAULT_PORTFOLIO_FAQS;
  },

  /**
   * Synchronous static fallback
   */
  getDefaultFAQsSync(pageType: string = 'PORTFOLIO'): FAQItem[] {
    const norm = pageType.toUpperCase();
    if (norm.includes('BLOG')) return DEFAULT_BLOG_FAQS;
    return DEFAULT_PORTFOLIO_FAQS;
  },

  /**
   * Get FAQs for a specific page with automatic fallback to defaults in DB
   */
  async getFAQs({
    pageType = 'PORTFOLIO_DETAIL',
    pageId,
  }: {
    pageType?: string;
    pageId?: string;
  }): Promise<FAQItem[]> {
    await ensureFaqTableExists();
    await seedDefaultFAQsIfEmpty();

    try {
      if (pageId) {
        const rows = await db.$queryRaw<any[]>`
          SELECT * FROM "PageFAQ"
          WHERE "pageType" = ${pageType} AND "pageId" = ${pageId} AND "isPublished" = true
          ORDER BY "order" ASC, "createdAt" ASC
        `;

        if (rows && rows.length > 0) {
          return rows.map((r) => ({
            id: r.id,
            question: r.question,
            answer: r.answer,
            q: r.question,
            a: r.answer,
            order: r.order,
            isPublished: r.isPublished,
          }));
        }
      }

      // Fallback to Main Page Defaults in DB
      return await this.getDefaultFAQs(pageType);
    } catch (err) {
      console.warn('[FAQ Service] getFAQs DB query warning, falling back to static defaults:', err);
    }

    return this.getDefaultFAQsSync(pageType);
  },

  /**
   * Save / Sync FAQs for a specific page
   */
  async savePageFAQs(pageType: string, pageId: string | null, items: FAQItem[]): Promise<void> {
    await ensureFaqTableExists();

    try {
      // Clear existing FAQs for this page target
      if (pageId) {
        await db.$executeRaw`
          DELETE FROM "PageFAQ" WHERE "pageType" = ${pageType} AND "pageId" = ${pageId}
        `;
      } else {
        await db.$executeRaw`
          DELETE FROM "PageFAQ" WHERE "pageType" = ${pageType} AND ("pageId" IS NULL OR "pageId" = '')
        `;
      }

      // Insert new items
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const q = (item.question || item.q || '').trim();
        const a = (item.answer || item.a || '').trim();
        if (!q || !a) continue;

        const id = item.id || `faq_${Date.now()}_${i}`;
        const order = item.order ?? i;
        const isPub = item.isPublished !== false;

        await db.$executeRaw`
          INSERT INTO "PageFAQ" ("id", "pageType", "pageId", "question", "answer", "order", "isPublished", "createdAt", "updatedAt")
          VALUES (${id}, ${pageType}, ${pageId || null}, ${q}, ${a}, ${order}, ${isPub}, NOW(), NOW())
        `;
      }
    } catch (err) {
      console.error('[FAQ Service] savePageFAQs error:', err);
      throw err;
    }
  },
};

export default faqService;
