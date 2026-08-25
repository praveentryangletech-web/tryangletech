"use client";
import React from 'react';
import Link from 'next/link';
import SafeImage from '@/app/common/SafeImage';
import { BlogProvider, useBlog } from '@/app/context/BlogContext';

function HomeLatestBlogContent() {
  const { latestPosts, isLoading } = useBlog();

  if (!isLoading && latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="rt-blog-section-home" style={{ padding: '80px 0', background: 'transparent' }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Heading */}
        <div className="rt-our-benefits-heading rt-heading-bottom-gap" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">LATEST INSIGHTS</div>
          </div>
          <h2 className="rt-gap-off">
            Explore our latest thoughts on <span className="rt-color-periwinkle-gray">tech & design</span>
          </h2>
        </div>

        {/* Fixed 4-Card Equalized Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            width: '100%',
            alignItems: 'stretch',
          }}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '1.25rem',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  }}
                >
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '190px' }} />
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div className="rt-skeleton-box" style={{ width: '40%', height: '14px', marginBottom: '12px' }} />
                    <div className="rt-skeleton-box" style={{ width: '90%', height: '22px', marginBottom: '10px' }} />
                    <div className="rt-skeleton-box" style={{ width: '100%', height: '16px', marginBottom: '6px' }} />
                    <div className="rt-skeleton-box" style={{ width: '70%', height: '16px' }} />
                  </div>
                </div>
              ))
            : latestPosts.map((post) => {
                const coverImage = post.coverImage || post.images?.[0] || '/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png';
                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                  : 'Recent';

                return (
                  <div
                    key={post.id}
                    className="rt-home-blog-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '1.25rem',
                      border: '1px solid #E2E8F0',
                      overflow: 'hidden',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {/* Fixed Image Container (Uniform 190px height across all cards) */}
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '190px',
                        display: 'block',
                        overflow: 'hidden',
                        backgroundColor: '#F1F5F9',
                        flexShrink: 0,
                      }}
                    >
                      <SafeImage
                        src={coverImage}
                        alt={post.coverImageAlt || post.imageAlt || post.title}
                        fill
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                    </Link>

                    {/* Fixed Body Content with Equalized Heights */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        padding: '1.25rem',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        {/* Category & Date Row */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem',
                            gap: '8px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              color: '#1833FE',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              backgroundColor: '#EFF6FF',
                              padding: '3px 9px',
                              borderRadius: '6px',
                              border: '1px solid #DBEAFE',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {post.category || 'Tech'}
                          </span>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              color: '#64748B',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {formattedDate}
                          </span>
                        </div>

                        {/* Title Clamped to 2 lines with fixed minHeight */}
                        <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <h3
                            style={{
                              fontSize: '1.05rem',
                              fontWeight: 700,
                              lineHeight: '1.4',
                              color: '#0F172A',
                              marginBottom: '0.6rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              minHeight: '2.9rem',
                            }}
                          >
                            {post.title}
                          </h3>
                        </Link>

                        {/* Excerpt Clamped to 2 lines with fixed minHeight */}
                        <p
                          style={{
                            fontSize: '0.875rem',
                            color: '#64748B',
                            lineHeight: '1.5',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.625rem',
                          }}
                        >
                          {post.excerpt || 'Explore key technical insights, modern design patterns, and engineering strategies.'}
                        </p>
                      </div>

                      {/* Read Article Action Link */}
                      <div style={{ paddingTop: '1rem', marginTop: 'auto' }}>
                        <Link
                          href={`/blog/${post.slug}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.825rem',
                            fontWeight: 700,
                            color: '#1833FE',
                            textDecoration: 'none',
                          }}
                        >
                          <span>Read Article</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* View All Articles CTA */}
        <div style={{ textAlign: 'center', marginTop: '45px' }}>
          <Link
            href="/blog"
            className="rt-button-body w-inline-block"
            style={{ display: 'inline-flex', padding: '12px 32px' }}
          >
            <div className="rt-button-text">Explore All Articles →</div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomeLatestBlog() {
  return (
    <BlogProvider initialLimit={4}>
      <HomeLatestBlogContent />
    </BlogProvider>
  );
}
