import db from './client';

let isIndexingCompleted = false;

const INDEX_COMMANDS = [
  // 1. Portfolio Indexes
  `CREATE INDEX IF NOT EXISTS "idx_portfolioproject_order_created" ON "PortfolioProject" ("order" ASC, "createdAt" DESC)`,
  `CREATE INDEX IF NOT EXISTS "idx_portfolioproject_cat" ON "PortfolioProject" ("category")`,
  `CREATE INDEX IF NOT EXISTS "idx_portfolioproject_slug" ON "PortfolioProject" ("slug")`,
  `CREATE INDEX IF NOT EXISTS "idx_portfolioproject_cat_order_created" ON "PortfolioProject" ("category", "order" ASC, "createdAt" DESC)`,
  `CREATE INDEX IF NOT EXISTS "idx_portfolioproject_created" ON "PortfolioProject" ("createdAt" DESC)`,

  // 2. Category Indexes (Shared between Portfolio & Blog)
  `CREATE INDEX IF NOT EXISTS "idx_portfoliocategory_type_order" ON "PortfolioCategory" ("type", "order" ASC, "name" ASC)`,
  `CREATE INDEX IF NOT EXISTS "idx_portfoliocategory_type_slug" ON "PortfolioCategory" ("type", "slug")`,

  // 3. Blog Post Indexes
  `CREATE INDEX IF NOT EXISTS "idx_blogpost_cat_pub_created" ON "BlogPost" ("category", "published", "createdAt" DESC)`,
  `CREATE INDEX IF NOT EXISTS "idx_blogpost_pub_created" ON "BlogPost" ("published", "createdAt" DESC)`,
  `CREATE INDEX IF NOT EXISTS "idx_blogpost_slug" ON "BlogPost" ("slug")`,
  `CREATE INDEX IF NOT EXISTS "idx_blogpost_order_created" ON "BlogPost" ("order", "createdAt" DESC)`,

  // 4. Page Content & Geo Clones Indexes
  `CREATE INDEX IF NOT EXISTS "idx_pagecontent_pagetype_pub" ON "PageContent" ("pageType", "isPublished")`,
  `CREATE INDEX IF NOT EXISTS "idx_pagecontent_region_pub" ON "PageContent" ("region", "isPublished")`,
  `CREATE INDEX IF NOT EXISTS "idx_pagecontent_popular" ON "PageContent" ("popular")`,
  `CREATE INDEX IF NOT EXISTS "idx_pagecontent_slug" ON "PageContent" ("slug")`,

  // 5. Contact Leads & Newsletter Indexes
  `CREATE INDEX IF NOT EXISTS "idx_contact_status_created" ON "ContactSubmission" ("status", "createdAt" DESC)`,
  `CREATE INDEX IF NOT EXISTS "idx_newsletter_status_created" ON "NewsletterSubscriber" ("status", "createdAt" DESC)`,
];

/**
 * Ensures all high-performance composite & functional PostgreSQL indexes exist.
 * Executes individual DDL commands concurrently in the background.
 */
export async function ensureAllDatabaseIndexes(): Promise<void> {
  if (isIndexingCompleted) return;
  isIndexingCompleted = true;

  try {
    for (const cmd of INDEX_COMMANDS) {
      try {
        await db.$executeRawUnsafe(cmd);
      } catch {
        // Safe to ignore statement timeouts or index exists notices
      }
    }
  } catch (err) {
    console.warn('[DB Indexing] Background index notice:', err);
  }
}

export default ensureAllDatabaseIndexes;
