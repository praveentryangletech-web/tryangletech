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
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Tech Insights & Software Engineering Blog | TryangleTech',
    description: 'Articles, tutorials, and case studies on modern software engineering, web apps, and design from TryangleTech.',
    url: 'https://tryangletech.com/blog',
    siteName: 'TryangleTech',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'TryangleTech Engineering Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Insights & Software Engineering Blog | TryangleTech',
    description: 'Articles, tutorials, and case studies on modern software engineering and design.',
    images: ['/logo.png'],
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

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': 'https://tryangletech.com/blog#blog',
        url: 'https://tryangletech.com/blog',
        name: 'TryangleTech Engineering & Tech Blog',
        description:
          'Insights, guides, and updates on Web Development, Mobile Applications, and Custom Software Engineering.',
        publisher: {
          '@type': 'Organization',
          name: 'TryangleTech',
          url: 'https://tryangletech.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://tryangletech.com/logo.png',
          },
        },
        blogPost: initialPosts.slice(0, 10).map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `https://tryangletech.com/blog/${post.slug || post.id}`,
          description: post.excerpt || post.metaDescription || post.title,
          datePublished: post.publishedAt || post.createdAt,
          author: {
            '@type': 'Person',
            name: post.authorName || 'TryangleTech Team',
          },
          image: post.coverImage || post.image || 'https://tryangletech.com/logo.png',
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://tryangletech.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://tryangletech.com/blog',
          },
        ],
      },
    ],
  };

  return (
    <>
      <WebflowInit pageId="68eddbced83339fe88ea9ff6" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd),
        }}
      />

      <main>
        <BlogContent initialPosts={initialPosts} initialCategories={initialCategories} />
        <BlogFAQ />
      </main>
    </>
  );
}
