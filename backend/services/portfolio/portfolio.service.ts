import { Prisma } from '@prisma/client';
import db from '@/backend/db/client';
import { projects as defaultProjects, PortfolioCategory } from '@/app/data/portfolioData';
import {
  PortfolioItem,
  CreatePortfolioInput,
  UpdatePortfolioInput,
  PortfolioQueryParams,
  PaginatedPortfolioResult,
} from './portfolio.types';
import { generateSlug } from './portfolio.utils';

export const portfolioService = {
  /**
   * Seed default 24 projects into PostgreSQL if table is empty
   */
  async seedIfEmpty() {
    try {
      const rows = await db.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*) as count FROM "PortfolioProject"
      `;
      const count = Number(rows[0]?.count || 0);

      if (count === 0) {
        for (let i = 0; i < defaultProjects.length; i++) {
          const p = defaultProjects[i];
          const id = crypto.randomUUID();
          await db.$executeRaw`
            INSERT INTO "PortfolioProject" (
              "id", "slug", "title", "category", "image", "description",
              "client", "duration", "role", "liveUrl", "content",
              "challenges", "solutions", "results", "technologies", "order",
              "createdAt", "updatedAt"
            ) VALUES (
              ${id}, ${p.slug}, ${p.title}, ${p.category}, ${p.image || '/portfolio/vh-accounting.webp'},
              ${p.description || ''}, ${p.client || ''}, ${p.duration || '3 Weeks'},
              ${p.role || 'Website Design & Development'}, ${p.liveUrl || ''},
              ${p.content || ''}, ${p.challenges || []}, ${p.solutions || []},
              ${p.results || []}, ${p.technologies || []}, ${i},
              NOW(), NOW()
            )
          `;
        }
        console.log(`[DB Portfolio] Seeded ${defaultProjects.length} initial projects into Supabase PostgreSQL.`);
      }
    } catch (err) {
      console.error('[DB Portfolio] seedIfEmpty warning:', err);
    }
  },

  /**
   * 100% Parameterized, Injection-Proof Paginated Query for Public and Admin routes
   */
  async getPaginatedProjects(params: PortfolioQueryParams): Promise<PaginatedPortfolioResult> {
    const page = Math.max(params.page || 1, 1);
    const limit = Math.min(Math.max(params.limit || 10, 1), 50);
    const offset = (page - 1) * limit;
    const sortBy = params.sortBy || 'order';
    const sortOrder = (params.sortOrder || 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    try {
      await this.seedIfEmpty();

      // Parameterized WHERE conditions using Prisma.sql fragments
      const conditions: Prisma.Sql[] = [];

      if (params.slug && params.slug.trim()) {
        const safeSlug = params.slug.trim().toLowerCase();
        conditions.push(Prisma.sql`LOWER("slug") = ${safeSlug}`);
      }

      if (params.category && params.category.trim().toUpperCase() !== 'ALL') {
        const safeCat = params.category.trim().toLowerCase();
        conditions.push(Prisma.sql`LOWER("category") = ${safeCat}`);
      }

      if (params.search && params.search.trim()) {
        const searchPattern = `%${params.search.trim().toLowerCase()}%`;
        conditions.push(Prisma.sql`(
          LOWER("title") LIKE ${searchPattern} OR 
          LOWER("category") LIKE ${searchPattern} OR 
          LOWER("client") LIKE ${searchPattern} OR
          LOWER("description") LIKE ${searchPattern}
        )`);
      }

      const whereClause = conditions.length > 0 
        ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` 
        : Prisma.empty;

      // 1. Parameterized Total Count Query
      const countRows = await db.$queryRaw<Array<{ count: bigint | number }>>`
        SELECT COUNT(*) as count FROM "PortfolioProject" ${whereClause}
      `;
      const total = Number(countRows[0]?.count || 0);
      const totalPages = Math.ceil(total / limit) || 1;

      // 2. Parameterized Data Query with Whitelisted Ordering
      const orderClause = sortBy === 'title'
        ? (sortOrder === 'DESC' ? Prisma.sql`ORDER BY "title" DESC, "createdAt" DESC` : Prisma.sql`ORDER BY "title" ASC, "createdAt" DESC`)
        : sortBy === 'createdAt'
        ? (sortOrder === 'DESC' ? Prisma.sql`ORDER BY "createdAt" DESC` : Prisma.sql`ORDER BY "createdAt" ASC`)
        : (sortOrder === 'DESC' ? Prisma.sql`ORDER BY "order" DESC, "createdAt" DESC` : Prisma.sql`ORDER BY "order" ASC, "createdAt" DESC`);

      const rows = await db.$queryRaw<any[]>`
        SELECT * FROM "PortfolioProject" 
        ${whereClause} 
        ${orderClause} 
        LIMIT ${limit} OFFSET ${offset}
      `;

      const items: PortfolioItem[] = rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        category: r.category as PortfolioCategory,
        image: r.image,
        description: r.description,
        client: r.client || '',
        duration: r.duration || '',
        role: r.role || '',
        liveUrl: r.liveUrl || '',
        content: r.content || '',
        challenges: Array.isArray(r.challenges) ? r.challenges : [],
        solutions: Array.isArray(r.solutions) ? r.solutions : [],
        results: Array.isArray(r.results) ? r.results : [],
        technologies: Array.isArray(r.technologies) ? r.technologies : [],
        order: r.order || 0,
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
      }));

      return {
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
          category: params.category,
          search: params.search,
          sortBy,
          sortOrder: sortOrder.toLowerCase(),
        },
      };
    } catch (err) {
      console.error('[DB Portfolio] getPaginatedProjects fallback:', err);

      // Fallback with in-memory filtering and pagination on static projects
      let filtered = [...defaultProjects];
      if (params.slug) {
        filtered = filtered.filter((p) => p.slug === params.slug);
      }
      if (params.category && params.category !== 'ALL') {
        filtered = filtered.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
      }
      if (params.search && params.search.trim()) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(s) ||
            p.category.toLowerCase().includes(s) ||
            (p.client && p.client.toLowerCase().includes(s)) ||
            p.description.toLowerCase().includes(s)
        );
      }

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = filtered.slice(offset, offset + limit);

      const items: PortfolioItem[] = paginated.map((p, idx) => ({
        id: `mock-${offset + idx}`,
        slug: p.slug,
        title: p.title,
        category: p.category,
        image: p.image,
        description: p.description,
        client: p.client || '',
        duration: p.duration || '',
        role: p.role || '',
        liveUrl: p.liveUrl || '',
        content: p.content || '',
        challenges: p.challenges || [],
        solutions: p.solutions || [],
        results: p.results || [],
        technologies: p.technologies || [],
        order: offset + idx,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      return {
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
          category: params.category,
          search: params.search,
          sortBy,
          sortOrder: sortOrder.toLowerCase(),
        },
      };
    }
  },

  /**
   * Parameterized Get all portfolio projects
   */
  async getAllProjects(category?: string, search?: string): Promise<PortfolioItem[]> {
    try {
      await this.seedIfEmpty();

      const conditions: Prisma.Sql[] = [];

      if (category && category.trim().toUpperCase() !== 'ALL') {
        const safeCat = category.trim().toLowerCase();
        conditions.push(Prisma.sql`LOWER("category") = ${safeCat}`);
      }

      if (search && search.trim()) {
        const searchPattern = `%${search.trim().toLowerCase()}%`;
        conditions.push(Prisma.sql`(
          LOWER("title") LIKE ${searchPattern} OR 
          LOWER("category") LIKE ${searchPattern} OR 
          LOWER("client") LIKE ${searchPattern} OR 
          LOWER("description") LIKE ${searchPattern}
        )`);
      }

      const whereClause = conditions.length > 0 
        ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}` 
        : Prisma.empty;

      const rows = await db.$queryRaw<any[]>`
        SELECT * FROM "PortfolioProject" 
        ${whereClause} 
        ORDER BY "order" ASC, "createdAt" DESC
      `;

      return rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        category: r.category as PortfolioCategory,
        image: r.image,
        description: r.description,
        client: r.client || '',
        duration: r.duration || '',
        role: r.role || '',
        liveUrl: r.liveUrl || '',
        content: r.content || '',
        challenges: Array.isArray(r.challenges) ? r.challenges : [],
        solutions: Array.isArray(r.solutions) ? r.solutions : [],
        results: Array.isArray(r.results) ? r.results : [],
        technologies: Array.isArray(r.technologies) ? r.technologies : [],
        order: r.order || 0,
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
      }));
    } catch (err) {
      console.error('[DB Portfolio] getAllProjects error:', err);
      // Fallback to static data
      return defaultProjects.map((p, idx) => ({
        id: `mock-${idx}`,
        slug: p.slug,
        title: p.title,
        category: p.category,
        image: p.image,
        description: p.description,
        client: p.client || '',
        duration: p.duration || '',
        role: p.role || '',
        liveUrl: p.liveUrl || '',
        content: p.content || '',
        challenges: p.challenges || [],
        solutions: p.solutions || [],
        results: p.results || [],
        technologies: p.technologies || [],
        order: idx,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }
  },

  /**
   * Parameterized Project Creation
   */
  async createProject(data: CreatePortfolioInput): Promise<PortfolioItem> {
    const id = crypto.randomUUID();
    const slug = (data.slug || (data.title ? generateSlug(data.title) : '') || `project-${Date.now()}`).trim();
    const title = data.title?.trim() || 'Untitled Project';
    const category = data.category || 'Business Website';
    const image = data.image?.trim() || '/portfolio/vh-accounting.webp';
    const description = data.description?.trim() || '';
    const client = data.client?.trim() || '';
    const duration = data.duration?.trim() || '3 Weeks';
    const role = data.role?.trim() || 'Website Design & Development';
    const liveUrl = data.liveUrl?.trim() || '';
    const content = data.content?.trim() || description;
    const challenges = Array.isArray(data.challenges) ? data.challenges : [];
    const solutions = Array.isArray(data.solutions) ? data.solutions : [];
    const results = Array.isArray(data.results) ? data.results : [];
    const technologies = Array.isArray(data.technologies) ? data.technologies : [];
    const order = data.order ?? 0;

    await db.$executeRaw`
      INSERT INTO "PortfolioProject" (
        "id", "slug", "title", "category", "image", "description",
        "client", "duration", "role", "liveUrl", "content",
        "challenges", "solutions", "results", "technologies", "order",
        "createdAt", "updatedAt"
      ) VALUES (
        ${id}, ${slug}, ${title}, ${category}, ${image},
        ${description}, ${client}, ${duration}, ${role}, ${liveUrl},
        ${content}, ${challenges}, ${solutions}, ${results}, ${technologies}, ${order},
        NOW(), NOW()
      )
    `;

    return {
      id,
      slug,
      title,
      category,
      image,
      description,
      client,
      duration,
      role,
      liveUrl,
      content,
      challenges,
      solutions,
      results,
      technologies,
      order,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Parameterized Project Update (100% Injection Safe)
   */
  async updateProject(id: string, data: UpdatePortfolioInput): Promise<PortfolioItem | null> {
    const updates: Prisma.Sql[] = [];

    if (data.title !== undefined) updates.push(Prisma.sql`"title" = ${data.title.trim()}`);
    if (data.slug !== undefined) updates.push(Prisma.sql`"slug" = ${data.slug.trim()}`);
    if (data.category !== undefined) updates.push(Prisma.sql`"category" = ${data.category}`);
    if (data.image !== undefined) updates.push(Prisma.sql`"image" = ${data.image.trim()}`);
    if (data.description !== undefined) updates.push(Prisma.sql`"description" = ${data.description.trim()}`);
    if (data.client !== undefined) updates.push(Prisma.sql`"client" = ${data.client.trim()}`);
    if (data.duration !== undefined) updates.push(Prisma.sql`"duration" = ${data.duration.trim()}`);
    if (data.role !== undefined) updates.push(Prisma.sql`"role" = ${data.role.trim()}`);
    if (data.liveUrl !== undefined) updates.push(Prisma.sql`"liveUrl" = ${data.liveUrl.trim()}`);
    if (data.content !== undefined) updates.push(Prisma.sql`"content" = ${data.content.trim()}`);
    if (data.order !== undefined) updates.push(Prisma.sql`"order" = ${data.order}`);

    if (Array.isArray(data.technologies)) {
      updates.push(Prisma.sql`"technologies" = ${data.technologies}`);
    }
    if (Array.isArray(data.challenges)) {
      updates.push(Prisma.sql`"challenges" = ${data.challenges}`);
    }
    if (Array.isArray(data.solutions)) {
      updates.push(Prisma.sql`"solutions" = ${data.solutions}`);
    }
    if (Array.isArray(data.results)) {
      updates.push(Prisma.sql`"results" = ${data.results}`);
    }

    updates.push(Prisma.sql`"updatedAt" = NOW()`);

    if (updates.length > 0) {
      await db.$executeRaw`
        UPDATE "PortfolioProject"
        SET ${Prisma.join(updates, ', ')}
        WHERE "id" = ${id}
      `;
    }

    const rows = await db.$queryRaw<any[]>`
      SELECT * FROM "PortfolioProject" WHERE "id" = ${id} LIMIT 1
    `;

    if (!rows || rows.length === 0) return null;
    const r = rows[0];

    return {
      id: r.id,
      slug: r.slug,
      title: r.title,
      category: r.category as PortfolioCategory,
      image: r.image,
      description: r.description,
      client: r.client || '',
      duration: r.duration || '',
      role: r.role || '',
      liveUrl: r.liveUrl || '',
      content: r.content || '',
      challenges: Array.isArray(r.challenges) ? r.challenges : [],
      solutions: Array.isArray(r.solutions) ? r.solutions : [],
      results: Array.isArray(r.results) ? r.results : [],
      technologies: Array.isArray(r.technologies) ? r.technologies : [],
      order: r.order || 0,
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString() : new Date().toISOString(),
    };
  },

  /**
   * Parameterized Project Deletion
   */
  async deleteProject(id: string): Promise<boolean> {
    try {
      await db.$executeRaw`
        DELETE FROM "PortfolioProject" WHERE "id" = ${id}
      `;
      return true;
    } catch (err) {
      console.error('[DB Portfolio] deleteProject error:', err);
      return false;
    }
  },
};

export default portfolioService;
