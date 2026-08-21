import { MetadataRoute } from 'next';
import prisma from '@/backend/db/client';
import { BLOG_POSTS } from './blog/data';
import { projects as staticProjects } from './data/portfolioData';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tryangletech.com';

  // 1. Core static routes with priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/service/web-development`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/custom-software`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/mobile-application`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/graphics-designing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/digital-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 2. Dynamic Blog Slugs from DB (with fallback)
  let dynamicBlogEntries: MetadataRoute.Sitemap = [];
  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
      take: 500,
    });

    if (dbPosts && dbPosts.length > 0) {
      dynamicBlogEntries = dbPosts.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: p.updatedAt || p.publishedAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    } else {
      dynamicBlogEntries = BLOG_POSTS.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    dynamicBlogEntries = BLOG_POSTS.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  // 3. Dynamic Portfolio Slugs from DB (with fallback)
  let dynamicPortfolioEntries: MetadataRoute.Sitemap = [];
  try {
    const dbProjects = await prisma.portfolioProject.findMany({
      select: { slug: true, updatedAt: true, createdAt: true },
      take: 500,
    });

    if (dbProjects && dbProjects.length > 0) {
      dynamicPortfolioEntries = dbProjects.map((proj) => ({
        url: `${baseUrl}/portfolio/${proj.slug}`,
        lastModified: proj.updatedAt || proj.createdAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    } else {
      dynamicPortfolioEntries = staticProjects.map((p) => ({
        url: `${baseUrl}/portfolio/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    dynamicPortfolioEntries = staticProjects.map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  return [...staticRoutes, ...dynamicPortfolioEntries, ...dynamicBlogEntries];
}

