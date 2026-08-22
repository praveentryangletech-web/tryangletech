'use client';
import React, { useState, useEffect, useRef, useMemo } from "react";
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

// Global in-memory cache for instantaneous client-side navigation
let clientCachedPosts: BlogPostItem[] | null = null;
let clientCachedCategories: string[] | null = null;

interface BlogContentProps {
  initialPosts?: BlogPostItem[];
  initialCategories?: string[];
}

export default function BlogContent({ initialPosts, initialCategories }: BlogContentProps = {}) {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [posts, setPosts] = useState<BlogPostItem[]>(() => {
    if (clientCachedPosts && clientCachedPosts.length > 0) return clientCachedPosts;
    if (initialPosts && initialPosts.length > 0) return initialPosts;
    return getInitialDefaultPosts();
  });

  const [categories, setCategories] = useState<string[]>(() => {
    if (clientCachedCategories && clientCachedCategories.length > 0) return clientCachedCategories;
    if (initialCategories && initialCategories.length > 0) return initialCategories;
    return staticCategories;
  });

  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(() => {
    if (clientCachedPosts && clientCachedPosts.length > 0) return false;
    if (initialPosts && initialPosts.length > 0) return false;
    return false; // Render fast defaults or skeletons seamlessly
  });

  // Fast Client-Side background API fetch
  useEffect(() => {
    let isMounted = true;
    const fetchLivePosts = async () => {
      try {
        const [postsRes, catsRes] = await Promise.allSettled([
          fetch('/api/blog?limit=100&status=published&sortBy=publishedAt&sortOrder=desc', {
            headers: { 'Accept': 'application/json' },
          }),
          fetch('/api/blog/categories', {
            headers: { 'Accept': 'application/json' },
          }),
        ]);

        if (postsRes.status === 'fulfilled' && postsRes.value.ok) {
          const data = await postsRes.value.json();
          if (isMounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
            setPosts(data.data);
            clientCachedPosts = data.data;
          }
        }

        if (catsRes.status === 'fulfilled' && catsRes.value.ok) {
          const catsData = await catsRes.value.json();
          if (isMounted && catsData.success && Array.isArray(catsData.data) && catsData.data.length > 0) {
            const dynamicCats = ['All', ...catsData.data.map((c: any) => c.name)];
            setCategories(dynamicCats);
            clientCachedCategories = dynamicCats;
          }
        }
      } catch (err) {
        console.warn('Client API fetch warning:', err);
      } finally {
        if (isMounted) {
          setIsInitialLoading(false);
        }
      }
    };

    fetchLivePosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const tabsBarRef = useRef<HTMLDivElement>(null);

  // Enable mouse wheel horizontal scrolling on categories
  useEffect(() => {
    const el = tabsBarRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const cleanActiveCat = activeCategory.toLowerCase().replace(/[-\s]/g, '');

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
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
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return sortedPosts;
    return sortedPosts.filter((post) => {
      const postCat = (post.category || '').toLowerCase().replace(/[-\s]/g, '');
      return postCat === cleanActiveCat;
    });
  }, [activeCategory, cleanActiveCat, sortedPosts]);

  return (
    <main>
      <section className="rt-hero-11">
        <div className="w-layout-blockcontainer rt-container w-container">
          
          {/* Hero Header */}
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

          {/* Category Tabs & Blog Grid */}
          <div className="tabs" style={{ width: '100%', maxWidth: '100%' }}>
            <style>{`
              .custom-blog-tabs-bar {
                display: flex !important;
                overflow-x: auto !important;
                overflow-y: hidden !important;
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 0 2.5rem 0 !important;
                padding: 0 0 0.85rem 0 !important;
                border-bottom: 1px solid var(--lavender-blue, #E2E8F0) !important;
                -webkit-overflow-scrolling: touch !important;
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
                scroll-behavior: smooth !important;
              }
              .custom-blog-tabs-bar::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
              }
              .custom-blog-tabs-inner {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                min-width: 100% !important;
                width: max-content !important;
                gap: 2rem !important;
                padding: 0 0.5rem !important;
              }
              .custom-blog-tab-btn {
                cursor: pointer !important;
                flex-shrink: 0 !important;
                white-space: nowrap !important;
                padding: 0.35rem 0.25rem !important;
                margin: 0 !important;
                border: none !important;
                background: transparent !important;
                font-size: 1.05rem !important;
                line-height: 1.5 !important;
                transition: color 0.2s ease, font-weight 0.2s ease, transform 0.2s ease !important;
                user-select: none !important;
                position: relative !important;
              }
              .custom-blog-tab-btn:hover {
                color: var(--dark-indigo, #1a0b54) !important;
              }
              .custom-blog-tab-btn.is-active {
                color: var(--dark-indigo, #1a0b54) !important;
                font-weight: 700 !important;
              }
              .custom-blog-tab-btn.is-active::after {
                content: '' !important;
                position: absolute !important;
                bottom: -0.9rem !important;
                left: 0 !important;
                right: 0 !important;
                height: 2.5px !important;
                background: linear-gradient(90deg, #1833FE, #6366F1) !important;
                border-radius: 2px !important;
              }

              /* Smooth Card Interactive Elevation */
              .rt-blog-v1-card-wrap {
                transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
                border-radius: 1.5625rem !important;
                position: relative !important;
              }
              .rt-blog-v1-card-wrap:hover {
                transform: translateY(-5px) !important;
              }
              .rt-blog-v3-card-top-part {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
                transition: box-shadow 0.35s ease, border-color 0.35s ease !important;
              }
              .rt-blog-v1-card-wrap:hover .rt-blog-v3-card-top-part {
                box-shadow: 0 16px 36px rgba(24, 51, 254, 0.12) !important;
                border-color: #BFDBFE !important;
              }
            `}</style>
            
            {/* Horizontal Tabs Bar */}
            <div
              ref={tabsBarRef}
              className="custom-blog-tabs-bar"
              role="tablist"
              aria-label="Blog categories"
            >
              <div className="custom-blog-tabs-inner">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      type="button"
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`custom-blog-tab-btn${isActive ? ' is-active' : ''}`}
                      role="tab"
                      aria-selected={isActive}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Articles Grid or Shimmer Skeleton States */}
            <div className="rt-tads-content w-tab-content">
              <div className="w-tab-pane w--tab-active" role="tabpanel">
                <div className="w-dyn-list">
                  
                  {/* 1. Shimmer Skeleton Loading State */}
                  {isInitialLoading ? (
                    <div role="list" className="rt-blog-two-wrapper w-dyn-items">
                      {[1, 2, 3, 4, 5, 6].map((sk) => (
                        <div key={sk} role="listitem" className="w-dyn-item">
                          <div
                            className="rt-blog-v1-card-wrap"
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1.25rem',
                            }}
                          >
                            <div
                              className="rt-blog-v3-card-top-part rt-skeleton-box"
                              style={{
                                height: '245px',
                                width: '100%',
                                borderRadius: '1.5625rem',
                                border: '1px solid #E2E8F0',
                              }}
                            />
                            <div
                              className="rt-blog-card-v1-top-part"
                              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <div
                                  className="rt-skeleton-box"
                                  style={{ width: '100px', height: '18px', borderRadius: '4px' }}
                                />
                                <div
                                  className="rt-skeleton-box"
                                  style={{ width: '90px', height: '16px', borderRadius: '4px' }}
                                />
                              </div>
                              <div
                                className="rt-skeleton-box"
                                style={{ width: '100%', height: '1px', borderRadius: '1px' }}
                              />
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div
                                  className="rt-skeleton-box"
                                  style={{ width: '95%', height: '22px', borderRadius: '6px' }}
                                />
                                <div
                                  className="rt-skeleton-box"
                                  style={{ width: '65%', height: '22px', borderRadius: '6px' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredPosts.length === 0 ? (
                    
                    /* 2. Empty State with Reset CTA */
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '5rem 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '24px',
                        border: '1.5px dashed #CBD5E1',
                        margin: '2rem 0',
                      }}
                    >
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          backgroundColor: '#EFF6FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#1833FE',
                          fontSize: '1.75rem',
                          border: '1.5px solid #BFDBFE',
                        }}
                      >
                        📰
                      </div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--dark-indigo, #1a0b54)' }}>
                        No articles found
                      </div>
                      <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '420px', margin: '0 auto', lineHeight: 1.6 }}>
                        There are currently no published articles in the <strong>{activeCategory}</strong> category.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveCategory("All")}
                        style={{
                          marginTop: '0.5rem',
                          padding: '0.7rem 1.6rem',
                          borderRadius: '999px',
                          backgroundColor: '#1833FE',
                          color: '#FFFFFF',
                          border: 'none',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Explore All Articles
                      </button>
                    </div>
                  ) : (
                    
                    /* 3. Published Articles Grid */
                    <div
                      role="list"
                      className="rt-blog-two-wrapper w-dyn-items"
                      key={activeCategory}
                    >
                      {filteredPosts.map((post, idx) => {
                        const postFallback = getBlogFallbackImage(idx);
                        const resolvedCover = (post.coverImage && typeof post.coverImage === 'string' && post.coverImage.trim())
                          ? post.coverImage.trim()
                          : postFallback;

                        return (
                          <div
                            key={post.id}
                            role="listitem"
                            className="w-dyn-item animate-fade-in-up-load"
                            style={{ animationDelay: `${(idx % 6) * 0.08}s` }}
                          >
                            <Link
                              href={`/blog/${post.slug}`}
                              className="rt-blog-v1-card-wrap w-inline-block"
                            >
                              <div className="rt-blog-v3-card-top-part rt-border-radius-l rt-overflow-hidden">
                                <SafeImage
                                  loading="lazy"
                                  alt={post.coverImageAlt || post.imageAlt || post.title}
                                  src={resolvedCover}
                                  fallbackSrc={postFallback}
                                  className="rt-image-scale"
                                  width={820}
                                  height={490}
                                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                />
                              </div>
                              <div className="w-layout-vflex rt-blog-card-v1-top-part">
                                <div className="w-layout-hflex rt-blog-v1-text-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                  <div className="rt-sub-text rt-sub-gredient" style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                    {post.category}
                                  </div>
                                  <div className="w-layout-hflex rt-blog-v1-publish-wrap" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div className="rt-blog-card-icon">
                                      <SafeImage
                                        width={14}
                                        height={15}
                                        alt="calendar icon"
                                        src="/blog-assets/691702072672e09d875c245f_calendar-check.svg"
                                        fallbackSrc="/blog-assets/691702072672e09d875c245f_calendar-check.svg"
                                        loading="lazy"
                                      />
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
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
                                <div className="rt-text-style-h6" style={{ fontSize: '1.2rem', lineHeight: 1.4, fontWeight: 700, color: 'var(--dark-indigo, #1a0b54)' }}>
                                  {post.title}
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
