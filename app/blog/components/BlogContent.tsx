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

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState<BlogPostItem[]>(() =>
    staticBlogPosts.map((p, idx) => {
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
    })
  );
  const [categories, setCategories] = useState<string[]>(staticCategories);

  // Fetch live articles from API
  useEffect(() => {
    let isMounted = true;
    const fetchLivePosts = async () => {
      try {
        const res = await fetch('/api/blog?limit=100&status=published&sortBy=publishedAt&sortOrder=desc');
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPosts(data.data);

          // Extract unique categories dynamically
          const dynamicCats = Array.from(
            new Set(['All', ...data.data.map((p: BlogPostItem) => p.category)])
          );
          setCategories(dynamicCats);
        }
      } catch {
        // Retains initial static state seamlessly
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
          
          <style>{`
            .blog-tabs-menu {
              display: flex !important;
              justify-content: center !important;
              align-items: flex-end !important;
              border-bottom: 2px solid #E2E8F0 !important;
              padding-bottom: 0 !important;
              margin-bottom: 3.5rem !important;
              gap: 0.5rem !important;
              overflow-x: auto !important;
              scrollbar-width: none !important;
              -ms-overflow-style: none !important;
              width: 100% !important;
            }
            .blog-tabs-menu::-webkit-scrollbar {
              display: none !important;
            }
            .blog-tab-btn {
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              white-space: nowrap !important;
              padding: 0.875rem 1.35rem !important;
              color: #64748B !important;
              font-size: 0.95rem !important;
              font-weight: 600 !important;
              position: relative !important;
              cursor: pointer !important;
              border: none !important;
              background: transparent !important;
              border-bottom: 3px solid transparent !important;
              margin-bottom: -2px !important;
              transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
              text-decoration: none !important;
            }
            .blog-tab-btn:hover {
              color: #0F172A !important;
            }
            .blog-tab-btn.w--current {
              color: var(--brand-blue, #1833FE) !important;
              font-weight: 700 !important;
              border-bottom: 3px solid var(--brand-blue, #1833FE) !important;
            }

            /* ── Card Grid Layout Matching Original Webflow UI Exactly ── */
            .rt-blog-two-wrapper {
              grid-column-gap: 1.875rem !important;
              grid-row-gap: 3.2rem !important;
              grid-template-columns: repeat(3, 1fr) !important;
              display: grid !important;
            }
            @media (max-width: 991px) {
              .rt-blog-two-wrapper {
                grid-template-columns: repeat(2, 1fr) !important;
                grid-row-gap: 2.2rem !important;
              }
            }
            @media (max-width: 640px) {
              .rt-blog-two-wrapper {
                grid-template-columns: 1fr !important;
                grid-row-gap: 2rem !important;
              }
            }
            .rt-blog-v1-card-wrap {
              grid-column-gap: 1.8rem !important;
              grid-row-gap: 1.8rem !important;
              flex-flow: column !important;
              display: flex !important;
              text-decoration: none !important;
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              border-radius: 0 !important;
            }
            @keyframes blogImgSkeletonShimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            .rt-blog-v3-card-top-part {
              border: 1px solid #d3d3f4 !important;
              border-radius: 1.5625rem !important;
              overflow: hidden !important;
              height: 245px !important;
              width: 100% !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              background: linear-gradient(90deg, #F8FAFC 0%, #EEF2F6 25%, #FFFFFF 50%, #EEF2F6 75%, #F8FAFC 100%) !important;
              background-size: 200% 100% !important;
              animation: blogImgSkeletonShimmer 1.8s infinite linear !important;
              position: relative !important;
            }
            .rt-blog-v3-card-top-part img,
            .rt-blog-v3-card-top-part .rt-image-scale {
              width: 100% !important;
              height: 100% !important;
              object-fit: contain !important;
              display: block !important;
              position: relative !important;
              z-index: 2 !important;
              transition: transform 0.4s ease !important;
            }
            .rt-blog-v1-card-wrap:hover .rt-blog-v3-card-top-part img,
            .rt-blog-v1-card-wrap:hover .rt-image-scale {
              transform: scale(1.04) !important;
            }
            .rt-blog-card-v1-top-part {
              grid-column-gap: 1rem !important;
              grid-row-gap: 1rem !important;
              display: flex !important;
              flex-direction: column !important;
              padding: 0 !important;
            }
          `}</style>
          
          <div className="tabs w-tabs">
            <div className="tabs-menu w-tab-menu blog-tabs-menu" role="tablist">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`blog-tab-btn ${activeCategory === category ? 'w--current' : ''}`}
                  role="tab"
                >
                  <span>{category}</span>
                </button>
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
                                src={resolvedCover}
                                fallbackSrc={postFallback}
                                alt={post.title}
                                className="rt-image-scale"
                                width={800}
                                height={500}
                                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
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
