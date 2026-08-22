"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SafeImage from '@/app/common/SafeImage';
import { BlogPostItem } from '@/backend/services/blog';

export default function HomeLatestBlog() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLatestPosts() {
      try {
        const res = await fetch('/api/blog?limit=3&status=published&sortBy=publishedAt&sortOrder=desc');
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPosts(json.data.slice(0, 3));
        }
      } catch (err) {
        console.warn('Failed to load home latest blogs:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLatestPosts();
  }, []);

  if (!isLoading && posts.length === 0) {
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

        {/* 3-Card Grid */}
        <div className="w-layout-grid rt-blog-v1-grid">
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="rt-blog-v1-card-wrap" style={{ borderRadius: '1.5625rem', overflow: 'hidden' }}>
                  <div className="rt-skeleton-box" style={{ width: '100%', height: '240px', borderRadius: '1.5625rem' }} />
                  <div style={{ padding: '20px 10px' }}>
                    <div className="rt-skeleton-box" style={{ width: '40%', height: '14px', marginBottom: '12px' }} />
                    <div className="rt-skeleton-box" style={{ width: '90%', height: '22px', marginBottom: '10px' }} />
                    <div className="rt-skeleton-box" style={{ width: '70%', height: '16px' }} />
                  </div>
                </div>
              ))
            : posts.map((post) => {
                const coverImage = post.coverImage || post.images?.[0] || '/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png';
                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                  : 'Recent';

                return (
                  <div key={post.id} className="rt-blog-v1-card-wrap" style={{ borderRadius: '1.5625rem', transition: 'transform 0.3s ease' }}>
                    <div className="rt-blog-v3-card" style={{ borderRadius: '1.5625rem' }}>
                      <Link href={`/blog/${post.slug}`} className="rt-blog-v3-card-top-part w-inline-block" style={{ borderRadius: '1.5625rem', overflow: 'hidden' }}>
                        <div className="rt-blog-v3-card-image-wrap" style={{ position: 'relative', width: '100%', height: '230px', overflow: 'hidden' }}>
                          <SafeImage
                            src={coverImage}
                            alt={post.coverImageAlt || post.imageAlt || post.title}
                            fill
                            className="rt-blog-v3-card-image"
                            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          />
                        </div>
                      </Link>

                      <div className="rt-blog-v1-card-bottom-part" style={{ paddingTop: '18px' }}>
                        <div className="rt-blog-meta-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1833FE', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {post.category || 'Tech'}
                          </span>
                          <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                            📅 {formattedDate}
                          </span>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="w-inline-block">
                          <h3 className="rt-text-style-h5" style={{ fontSize: '1.25rem', lineHeight: '1.4', marginBottom: '10px', color: '#0F172A' }}>
                            {post.title}
                          </h3>
                        </Link>
                        {post.excerpt && (
                          <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: '1.5', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {post.excerpt}
                          </p>
                        )}
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
