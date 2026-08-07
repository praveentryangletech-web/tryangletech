'use client';
import React, { useState } from "react";
import Link from "next/link";
import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

import { CATEGORIES, BLOG_POSTS } from "../data";

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
