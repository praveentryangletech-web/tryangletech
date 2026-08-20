'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SafeImage from "@/app/common/SafeImage";
import { CATEGORIES as staticCategories, BLOG_POSTS as staticBlogPosts } from "../data";
import { BlogPostItem } from "@/backend/services/blog";

const BLOG_FALLBACK_IMAGES = [
  "/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png",
  "/blog-assets/690333f5e01881a7f1a4f838_blog-two-H.png",
  "/blog-assets/690334335e613d605998a49f_blog-two-G.png",
  "/blog-assets/6903348b628bea456749d51f_blog-two-F.png",
  "/blog-assets/690334ce350586b1ee9594e3_blog-two-E.png",
  "/blog-assets/690335125e318fe0479213b7_blog-two-D.png",
  "/blog-assets/6903355a56854d99c23063f0_blog-two-C.png",
  "/blog-assets/690335bdf5bb94e8937089e8_blog-two-B.png",
  "/blog-assets/6903360856c5072575d9fe32_blog-two-A.png",
];

const getBlogFallbackImage = (index: number = 0) => {
  return BLOG_FALLBACK_IMAGES[index % BLOG_FALLBACK_IMAGES.length];
};

const getInitialDefaultPosts = (): BlogPostItem[] => {
  return staticBlogPosts.map((p, idx) => {
    const parsedDate = p.date ? new Date(p.date).toISOString() : new Date(2025, 9, 29 - idx).toISOString();
    return {
      id: p.id || String(idx + 1),
      slug: p.slug,
      title: p.title,
      category: p.category,
      excerpt: p.title,
      content: '',
      coverImage: p.image,
      images: p.images || (p.image ? [p.image] : []),
      authorName: 'TryangleTech Team',
      authorRole: 'Editorial Team',
      readTime: '5 min read',
      published: true,
      publishedAt: parsedDate,
      createdAt: parsedDate,
      updatedAt: parsedDate,
    };
  });
};

interface BlogContentProps {
  initialPosts?: BlogPostItem[];
  initialCategories?: string[];
}

export default function BlogContent({ initialPosts, initialCategories }: BlogContentProps = {}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPostItem[]>(() => {
    if (initialPosts && initialPosts.length > 0) return initialPosts;
    return getInitialDefaultPosts();
  });
  const [categories, setCategories] = useState<string[]>(() => {
    if (initialCategories && initialCategories.length > 0) return initialCategories;
    return staticCategories;
  });

  // Fetch live articles from API in background without blocking initial render
  useEffect(() => {
    let isMounted = true;
    const fetchLivePosts = async () => {
      try {
        const res = await fetch('/api/blog?limit=100&status=published&sortBy=publishedAt&sortOrder=desc');
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPosts(data.data);
          const dynamicCats = Array.from(new Set(['All', ...data.data.map((p: BlogPostItem) => p.category)]));
          setCategories(dynamicCats);
        }
      } catch (err) {
        console.warn('Failed to fetch live blog posts in background:', err);
      }
    };

    fetchLivePosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const cleanActiveCat = activeCategory.toLowerCase().replace(/[-\s]/g, '');

  const sortedPosts = [...posts].sort((a, b) => {
    // 1. Primary sort: publishedAt date DESC
    const timeA = new Date(a.publishedAt || a.createdAt || 0).getTime();
    const timeB = new Date(b.publishedAt || b.createdAt || 0).getTime();
    if (timeB !== timeA) return timeB - timeA;

    // 2. Secondary sort: createdAt timestamp DESC
    const createdA = new Date(a.createdAt || a.publishedAt || 0).getTime();
    const createdB = new Date(b.createdAt || b.publishedAt || 0).getTime();
    if (createdB !== createdA) return createdB - createdA;

    // 3. Fallback tie-breaker: ID comparison
    return String(b.id).localeCompare(String(a.id));
  });

  const filteredPosts = activeCategory === "All"
    ? sortedPosts
    : sortedPosts.filter((post) => {
        const postCat = (post.category || '').toLowerCase().replace(/[-\s]/g, '');
        return postCat === cleanActiveCat;
      });

  return (
    <main>
      <section className="rt-hero-11">
        <div className="w-layout-blockcontainer rt-container w-container">
          <div className="rt-hero-11-heading rt-desktop-text-center rt-heading-bottom-gap">
            <div className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">latest insights</div>
            </div>
            <h1 className="rt-gap-off">
              Transforming businesses with innovative technology
            </h1>
            <div className="rt-small-btn-wrap rt-hero-v1-small rt-blog-2">
              <div className="rt-small-btn-main rt-color-change">
                <div className="rt-small-btn-text">Tryangletech Blog</div>
                <div className="rt-btn-arrow-v2 rt-hero-v1-small">
                  <SafeImage
                    src="/blog-assets/69203b6151156495054eacd7_Vector 503 (2).svg"
                    fallbackSrc="/blog-assets/69203b6151156495054eacd7_Vector 503 (2).svg"
                    loading="lazy"
                    alt=""
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="tabs w-tabs">
            <div className="tabs-menu w-tab-menu" role="tablist">
              {categories.map((category, index) => (
                <div
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rt-tab-link w-inline-block w-tab-link ${activeCategory === category ? 'w--current' : ''}`}
                  style={{ cursor: 'pointer' }}
                  role="tab"
                >
                  <div>{category}</div>
                  <div className="rt-tab-main-border-line">
                    <div className={`rt-tab-inner-booder-line rt-${(index % 4) + 1}${index === 1 ? '-bg' : ''}`}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rt-tads-content w-tab-content">
              <div className="w-tab-pane w--tab-active" role="tabpanel">
                <div className="w-dyn-list">
                  <div role="list" className="rt-blog-two-wrapper w-dyn-items">
                    {filteredPosts.map((post, idx) => {
                        const postFallback = getBlogFallbackImage(idx);
                        const resolvedCover = (post.coverImage && typeof post.coverImage === 'string' && post.coverImage.trim())
                          ? post.coverImage.trim()
                          : postFallback;

                        return (
                          <div key={post.id} role="listitem" className="w-dyn-item">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="rt-blog-v1-card-wrap w-inline-block"
                            >
                              <div className="rt-blog-v3-card-top-part rt-border-radius-l rt-overflow-hidden">
                                <SafeImage
                                  loading="lazy"
                                  alt={post.title}
                                  src={resolvedCover}
                                  fallbackSrc={postFallback}
                                  className="rt-image-scale"
                                  width={820}
                                  height={490}
                                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                />
                              </div>
                              <div className="w-layout-vflex rt-blog-card-v1-top-part">
                                <div className="w-layout-hflex rt-blog-v1-text-wrap">
                                  <div className="rt-sub-text rt-sub-gredient">
                                    {post.category}
                                  </div>
                                  <div className="w-layout-hflex rt-blog-v1-publish-wrap">
                                    <div className="rt-blog-card-icon">
                                      <SafeImage
                                        width={14}
                                        height={15}
                                        alt="icon"
                                        src="/blog-assets/691702072672e09d875c245f_calendar-check.svg"
                                        fallbackSrc="/blog-assets/691702072672e09d875c245f_calendar-check.svg"
                                        loading="lazy"
                                      />
                                    </div>
                                    <div>
                                      {post.publishedAt
                                        ? (post.publishedAt.includes('T')
                                            ? new Date(post.publishedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
                                            : post.publishedAt)
                                        : '29 Oct 2025'}
                                    </div>
                                  </div>
                                </div>
                                <div className="rt-blog-v1-line rt-v2">
                                  <div className="rt-blog-v3-line-overlay"></div>
                                </div>
                                <div className="rt-text-style-h6">
                                  {post.title}
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
