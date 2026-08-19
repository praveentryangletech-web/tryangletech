
import WebflowInit from "../common/WebflowInit";
import BlogContent from './components/BlogContent';
import BlogFAQ from './components/BlogFAQ';
import { blogService, BlogPostItem } from '@/backend/services/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  let initialPosts: BlogPostItem[] = [];
  let initialCategories: string[] = ['All'];

  try {
    const result = await blogService.getPaginatedPosts({
      limit: 100,
      status: 'published',
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    });

    if (result && Array.isArray(result.items) && result.items.length > 0) {
      initialPosts = result.items;
      initialCategories = Array.from(
        new Set(['All', ...result.items.map((p: BlogPostItem) => p.category)])
      );
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
