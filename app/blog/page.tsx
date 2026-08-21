import { Metadata } from 'next';
import WebflowInit from "../common/WebflowInit";
import BlogContent from './components/BlogContent';
import BlogFAQ from './components/BlogFAQ';
import { blogService, BlogPostItem } from '@/backend/services/blog';
import { portfolioCategoryService } from '@/backend/services/portfolio/category.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Tech Insights & Software Engineering Blog | TryangleTech',
  description: 'Explore the latest insights on web development, mobile apps, software architecture, UI/UX design trends, and tech innovation from the TryangleTech engineering team.',
  alternates: {
    canonical: 'https://tryangletech.com/blog',
  },
  openGraph: {
    title: 'Tech Insights & Software Engineering Blog | TryangleTech',
    description: 'Articles, tutorials, and case studies on modern software engineering, web apps, and design from Ahmedabad.',
    url: 'https://tryangletech.com/blog',
    type: 'website',
  },
};

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
      initialCategories = ['All', ...catsResult.value.map((c) => c.name)];
    } else if (initialPosts.length > 0) {
      initialCategories = Array.from(new Set(['All', ...initialPosts.map((p) => p.category)]));
    }
  } catch (err) {
    console.warn('Failed to prefetch SSR blog posts, fallback will be used:', err);
  }

  return (
    <>
      <WebflowInit pageId="68eddbced83339fe88ea9ff6" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "TryangleTech Engineering & Tech Blog",
            "url": "https://tryangletech.com/blog",
            "description": "Insights, guides, and updates on Web Development, Mobile Applications, and Custom Software Engineering.",
            "publisher": {
              "@type": "Organization",
              "name": "TryangleTech",
              "url": "https://tryangletech.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tryangletech.com/icon.png"
              }
            },
            "blogPost": initialPosts.slice(0, 15).map((post) => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "url": `https://tryangletech.com/blog/${post.slug}`,
              "datePublished": post.publishedAt || post.createdAt,
              "articleSection": post.category,
              "image": post.coverImage || "https://tryangletech.com/portfolio/vh-accounting.webp",
              "author": {
                "@type": "Person",
                "name": post.authorName || "TryangleTech Team"
              }
            }))
          })
        }}
      />

      <main>
        <BlogContent initialPosts={initialPosts} initialCategories={initialCategories} />
        <BlogFAQ />
      </main>
    </>
  );
}

