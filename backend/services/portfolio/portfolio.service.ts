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
   * Secure, Paginated Query Filter for Public and Admin routes
   */
  async getPaginatedProjects(params: PortfolioQueryParams): Promise<PaginatedPortfolioResult> {
    const page = Math.max(params.page || 1, 1);
    const limit = Math.min(Math.max(params.limit || 10, 1), 50);
    const offset = (page - 1) * limit;
    const sortBy = params.sortBy || 'order';
    const sortOrder = (params.sortOrder || 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    try {
      await this.seedIfEmpty();

      const conditions: string[] = [];

      if (params.slug && params.slug.trim()) {
        const safeSlug = params.slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');
        conditions.push(`LOWER("slug") = '${safeSlug}'`);
      }

      if (params.category && params.category !== 'ALL') {
        const safeCat = params.category.trim().toLowerCase().replace(/'/g, "''");
        conditions.push(`LOWER("category") = '${safeCat}'`);
      }

      if (params.search && params.search.trim()) {
        const s = params.search.trim().toLowerCase().replace(/'/g, "''");
        conditions.push(`(
          LOWER("title") LIKE '%${s}%' OR 
          LOWER("category") LIKE '%${s}%' OR 
          LOWER("client") LIKE '%${s}%' OR
          LOWER("description") LIKE '%${s}%'
        )`);
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      // 1. Get exact total count for pagination metadata
      const countQuery = `SELECT COUNT(*) as count FROM "PortfolioProject" ${whereClause}`;
      const countRows = await db.$queryRawUnsafe<Array<{ count: bigint | number }>>(countQuery);
      const total = Number(countRows[0]?.count || 0);
      const totalPages = Math.ceil(total / limit) || 1;

      // 2. Fetch paginated records with safe ORDER BY and LIMIT / OFFSET
      const safeSortCol = sortBy === 'title' ? '"title"' : sortBy === 'createdAt' ? '"createdAt"' : '"order"';
      const dataQuery = `
        SELECT * FROM "PortfolioProject" 
        ${whereClause} 
        ORDER BY ${safeSortCol} ${sortOrder}, "createdAt" DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;

      const rows = await db.$queryRawUnsafe<any[]>(dataQuery);

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
   * Get all portfolio projects with optional category and search filters
   */
  async getAllProjects(category?: string, search?: string): Promise<PortfolioItem[]> {
    try {
      await this.seedIfEmpty();

      let query = `SELECT * FROM "PortfolioProject" WHERE 1=1`;
      const conditions: string[] = [];

      if (category && category !== 'ALL') {
        conditions.push(`LOWER("category") = '${category.toLowerCase().replace(/'/g, "''")}'`);
      }

      if (search && search.trim()) {
        const s = search.trim().toLowerCase().replace(/'/g, "''");
        conditions.push(`(
          LOWER("title") LIKE '%${s}%' OR 
          LOWER("category") LIKE '%${s}%' OR 
          LOWER("client") LIKE '%${s}%' OR
          LOWER("description") LIKE '%${s}%'
        )`);
      }

      if (conditions.length > 0) {
        query += ` AND ` + conditions.join(' AND ');
      }

      query += ` ORDER BY "order" ASC, "createdAt" DESC`;

      const rows = await db.$queryRawUnsafe<any[]>(query);

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
   * Create a new project in PostgreSQL
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
   * Update an existing project by ID
   */
  async updateProject(id: string, data: UpdatePortfolioInput): Promise<PortfolioItem | null> {
    const fields: string[] = [];

    if (data.title !== undefined) fields.push(`"title" = '${data.title.replace(/'/g, "''")}'`);
    if (data.slug !== undefined) fields.push(`"slug" = '${data.slug.replace(/'/g, "''")}'`);
    if (data.category !== undefined) fields.push(`"category" = '${data.category.replace(/'/g, "''")}'`);
    if (data.image !== undefined) fields.push(`"image" = '${data.image.replace(/'/g, "''")}'`);
    if (data.description !== undefined) fields.push(`"description" = '${data.description.replace(/'/g, "''")}'`);
    if (data.client !== undefined) fields.push(`"client" = '${data.client.replace(/'/g, "''")}'`);
    if (data.duration !== undefined) fields.push(`"duration" = '${data.duration.replace(/'/g, "''")}'`);
    if (data.role !== undefined) fields.push(`"role" = '${data.role.replace(/'/g, "''")}'`);
    if (data.liveUrl !== undefined) fields.push(`"liveUrl" = '${data.liveUrl.replace(/'/g, "''")}'`);
    if (data.content !== undefined) fields.push(`"content" = '${data.content.replace(/'/g, "''")}'`);
    if (data.order !== undefined) fields.push(`"order" = ${data.order}`);

    if (Array.isArray(data.technologies)) {
      const techArray = data.technologies.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(',');
      fields.push(`"technologies" = '{${techArray}}'`);
    }
    if (Array.isArray(data.challenges)) {
      const chArray = data.challenges.map((c) => `"${c.replace(/"/g, '\\"')}"`).join(',');
      fields.push(`"challenges" = '{${chArray}}'`);
    }
    if (Array.isArray(data.solutions)) {
      const solArray = data.solutions.map((s) => `"${s.replace(/"/g, '\\"')}"`).join(',');
      fields.push(`"solutions" = '{${solArray}}'`);
    }
    if (Array.isArray(data.results)) {
      const resArray = data.results.map((r) => `"${r.replace(/"/g, '\\"')}"`).join(',');
      fields.push(`"results" = '{${resArray}}'`);
    }

    fields.push(`"updatedAt" = NOW()`);

    if (fields.length > 0) {
      await db.$executeRawUnsafe(`
        UPDATE "PortfolioProject" 
        SET ${fields.join(', ')} 
        WHERE "id" = '${id.replace(/'/g, "''")}'
      `);
    }

    const rows = await db.$queryRawUnsafe<any[]>(`
      SELECT * FROM "PortfolioProject" WHERE "id" = '${id.replace(/'/g, "''")}' LIMIT 1
    `);

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
   * Delete project by ID
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
