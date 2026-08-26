import { Metadata } from 'next';
import WebflowInit from "../common/WebflowInit";
import BlogContent from './components/BlogContent';
import BlogFAQ from './components/BlogFAQ';
import { blogService } from '@/backend/services/blog';
import { portfolioCategoryService } from '@/backend/services/portfolio';

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
  let initialPosts: any[] = [];
  let initialCategories: string[] = ['All'];

  try {
    const [postsRes, catsRes] = await Promise.all([
      blogService.getPaginatedPosts({ page: 1, limit: 30, status: 'published' }).catch(() => ({ items: [] })),
      portfolioCategoryService.getAllCategories('BLOG').catch(() => []),
    ]);

    if (postsRes && Array.isArray(postsRes.items)) {
      initialPosts = postsRes.items;
    }

    if (catsRes && Array.isArray(catsRes) && catsRes.length > 0) {
      const names = catsRes.map((c: any) => c.name).filter(Boolean);
      initialCategories = Array.from(new Set(['All', ...names]));
    }
  } catch (err) {
    console.warn('[BlogPage] SSR preload notice:', err);
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
            }
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
