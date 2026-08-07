'use client';
import React, { useState } from "react";
import Link from "next/link";
import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

const CATEGORIES = ["All", "Web Development", "Custom Software", "Digital Marketing"];

export const BLOG_POSTS = [
  {
    id: "post-1",
    slug: "future-of-web-development-2026",
    title: "The Future of Web Development: Trends to Watch in 2026",
    category: "Web Development",
    date: "29 Oct 2025",
    image: "/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png"
  },
  {
    id: "post-2",
    slug: "custom-erp-business-growth",
    title: "How Custom ERP Solutions Drive Business Growth",
    category: "Custom Software",
    date: "15 Oct 2025",
    image: "/blog-assets/690333f5e01881a7f1a4f838_blog-two-H.png"
  },
  {
    id: "post-3",
    slug: "mobile-app-strategies",
    title: "Cross-Platform vs Native: Choosing the Right App Strategy",
    category: "Custom Software",
    date: "02 Oct 2025",
    image: "/blog-assets/690334335e613d605998a49f_blog-two-G.png"
  },
  {
    id: "post-4",
    slug: "seo-strategies-2026",
    title: "SEO Strategies to Boost Your Organic Traffic in 2026",
    category: "Digital Marketing",
    date: "18 Sep 2025",
    image: "/blog-assets/6903348b628bea456749d51f_blog-two-F.png"
  },
  {
    id: "post-5",
    slug: "ui-ux-modern-applications",
    title: "The Importance of UI/UX in Modern Web Applications",
    category: "Web Development",
    date: "05 Sep 2025",
    image: "/blog-assets/690334ce350586b1ee9594e3_blog-two-E.png"
  },
  {
    id: "post-6",
    slug: "headless-cms-switch",
    title: "Headless CMS: Why Modern Businesses Are Switching",
    category: "Web Development",
    date: "21 Aug 2025",
    image: "/blog-assets/690335125e318fe0479213b7_blog-two-D.png"
  },
  {
    id: "post-7",
    slug: "ai-integration-custom-software",
    title: "Leveraging AI Integration in Your Custom Software",
    category: "Custom Software",
    date: "10 Aug 2025",
    image: "/blog-assets/6903355a56854d99c23063f0_blog-two-C.png"
  },
  {
    id: "post-8",
    slug: "social-media-branding",
    title: "Building Your Brand with Targeted Digital Marketing",
    category: "Digital Marketing",
    date: "01 Aug 2025",
    image: "/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png" // Re-using image
  }
];

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

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
                  <Image
                    src="/blog-assets/69203b6151156495054eacd7_Vector 503 (2).svg"
                    loading="lazy"
                    alt=""
                    width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="tabs w-tabs">
            <div className="tabs-menu w-tab-menu" role="tablist">
              {CATEGORIES.map((category, index) => (
                <div
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rt-tab-link w-inline-block w-tab-link ${activeCategory === category ? 'w--current' : ''}`}
                  style={{ cursor: 'pointer' }}
                  role="tab">
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
                    {filteredPosts.map(post => (
                      <div key={post.id} role="listitem" className="w-dyn-item">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="rt-blog-v1-card-wrap w-inline-block">
                          <div className="rt-blog-v3-card-top-part rt-border-radius-l rt-overflow-hidden">
                            <Image
                              loading="lazy"
                              alt={post.title}
                              src={post.image}
                              className="rt-image-scale"
                              width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="w-layout-vflex rt-blog-card-v1-top-part">
                            <div className="w-layout-hflex rt-blog-v1-text-wrap">
                              <div className="rt-sub-text rt-sub-gredient">
                                {post.category}
                              </div>
                              <div className="w-layout-hflex rt-blog-v1-publish-wrap">
                                <div className="rt-blog-card-icon">
                                  <Image
                                    width={14}
                                    height={15}
                                    alt="icon"
                                    src="/blog-assets/691702072672e09d875c245f_calendar-check.svg"
                                    loading="lazy"
                                   />
                                </div>
                                <div>{post.date}</div>
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
                    ))}
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
