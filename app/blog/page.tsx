import WebflowInit from "../common/WebflowInit";
import BlogContent from './components/BlogContent';
import BlogFAQ from './components/BlogFAQ';
import { blogService, BlogPostItem } from '@/backend/services/blog';
import { portfolioCategoryService } from '@/backend/services/portfolio/category.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  let initialPosts: BlogPostItem[] = [];
  let initialCategories: string[] = ['All'];

  try {
    const [postsResult, catsResult] = await Promise.allSettled([
      blogService.getPaginatedPosts({
        limit: 100,
        status: 'published',
        sortBy: 'publishedAt',
        sortOrder: 'desc',
      }),
      portfolioCategoryService.getAllCategories('BLOG'),
    ]);

    if (postsResult.status === 'fulfilled' && postsResult.value && Array.isArray(postsResult.value.items)) {
      initialPosts = postsResult.value.items;
    }

    if (catsResult.status === 'fulfilled' && catsResult.value && Array.isArray(catsResult.value) && catsResult.value.length > 0) {
      const activeCats = catsResult.value
        .filter((c) => (c.postCount ?? 0) > 0)
        .map((c) => c.name);
      initialCategories = ['All', ...activeCats];
    } else if (initialPosts.length > 0) {
      initialCategories = Array.from(new Set(['All', ...initialPosts.map((p) => p.category)]));
    }
  } catch (err) {
    console.warn('Failed to prefetch SSR blog posts, fallback will be used:', err);
  }

  return (
    <>
      <WebflowInit pageId="68eddbced83339fe88ea9ff6" />

      <main>
        <BlogContent initialPosts={initialPosts} initialCategories={initialCategories} />
        <BlogFAQ />
      </main>
    </>
  );
}
