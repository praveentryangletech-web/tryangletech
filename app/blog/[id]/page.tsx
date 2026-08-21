import { Metadata } from "next";
import WebflowInit from "../../common/WebflowInit";
import Image from "next/image";
import Link from "next/link";
import SafeImage from "@/app/common/SafeImage";
import { BLOG_POSTS } from "../data";
import { notFound } from "next/navigation";
import PortfolioImageSlider from "../../portfolio/components/PortfolioImageSlider";
import { blogService } from "@/backend/services/blog/blog.service";
import HomeThreeFaq from "../../home-three/components/Faq";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let post: any = null;
  try {
    post = await blogService.getPostBySlug(resolvedParams.id);
  } catch {}

  if (!post) {
    post = BLOG_POSTS.find((p) => p.slug === resolvedParams.id);
  }

  if (!post) {
    return {
      title: "Article Not Found | TryangleTech Blog",
      description: "Explore tech insights and software development articles on TryangleTech.",
    };
  }

  const title = post.metaTitle || `${post.title} | TryangleTech Blog`;
  const description = post.metaDescription || post.excerpt || post.section1Paragraph1 || "Read this article on TryangleTech Blog.";
  const canonicalUrl = post.canonicalUrl || `https://tryangletech.com/blog/${post.slug}`;
  const keywords = post.keywords && post.keywords.length > 0 ? post.keywords : [post.category, "Software Development", "Web Development", "Tech Agency"];
  const image = post.coverImage || post.image || "/portfolio/vh-accounting.webp";

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.authorName || "TryangleTech Team"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt || post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // 1. Try fetching from dynamic database first
  let post: any = null;
  try {
    post = await blogService.getPostBySlug(resolvedParams.id);
  } catch {}

  // 2. Fallback to static data
  if (!post) {
    post = BLOG_POSTS.find((p) => p.slug === resolvedParams.id);
  }

  if (!post) {
    return notFound();
  }

  const coverImage = (post.coverImage && typeof post.coverImage === 'string' && post.coverImage.trim())
    ? post.coverImage.trim()
    : (post.image || '/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png');
  const coverImageAlt = post.coverImageAlt || post.imageAlt || post.title;
  const sliderImages = (post.images && post.images.length > 0 && post.images.some((img: string) => img && img.trim()))
    ? post.images.filter((img: string) => img && typeof img === 'string' && img.trim())
    : [coverImage];
  const sliderImageAlts = post.imageAlts || [];
  const authorName = post.authorName || 'TryangleTech Team';
  const authorRole = post.authorRole || 'Content Creators';
  const authorImage = (post.authorImage && !post.authorImage.includes('/portfolio/')) ? post.authorImage : '/blog-post-assets/692578de4ba3fb26b16f1dd7_blog-nine.webp';
  const publishDate = post.publishedAt
    ? (post.publishedAt.includes('T') ? new Date(post.publishedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : post.publishedAt)
    : (post.date || '29 Oct 2025');

  // Section 1: Intro Story
  const s1Heading = post.section1Heading || "Blending human creativity with machine Intelligence";
  const s1P1 = post.section1Paragraph1 || post.content || "The combination of human creativity and AI intelligence unlocks new possibilities for innovation and efficiency. AI tools augment human ideas, automate repetitive tasks, and provide data-driven insights that inspire creative solutions.";
  const s1P2 = post.section1Paragraph2 || "By leveraging AI-powered analytics, generative models, and intelligent workflows, teams can focus on conceptual thinking while leaving mundane tasks to machines. This collaboration ensures that human imagination and computational precision work together to produce remarkable outcomes.";

  // Section 2: Quote Box
  const quoteText = post.quoteText || "Using this task management system has transformed how we work. Tasks are organized, deadlines are clear, and team collaboration is seamless. Productivity has improved, and projects are delivered on time. Highly recommended for teams looking to streamline workflows and boost efficiency.";
  const quoteAuthor = post.quoteAuthor || "Tanya Erin";

  // Section 3: Steps
  const stepsTitle = post.stepsTitle || "Steps to integrate AI with creative workflows";
  const step1 = post.step1 || "Successful integration requires identifying areas where AI can assist, selecting the right tools, and fostering a culture of experimentation. Encourage teams to explore AI-generated suggestions, iterate quickly, and combine them with human intuition.";
  const step2 = post.step2 || "Develop a step-by-step plan, including testing, monitoring, and continuous optimization. Train teams to adapt to AI-augmented workflows while maintaining governance, security, and compliance. Regularly evaluate outcomes and refine processes for maximum creative impact.";

  // Section 4: Mid-Article Images
  const img1 = post.contentImage1 || "/blog-post-assets/69030925158024507ce308ad_taskopia-bolog-botom-image-1.png";
  const img1Alt = post.contentImage1Alt || "Section showcase 1";
  const img2 = post.contentImage2 || "/blog-post-assets/6903092536e793c51e1b23ab_taskopia-bolog-botom-image-2.webp";
  const img2Alt = post.contentImage2Alt || "Section showcase 2";

  // Section 5: Conclusion & Takeaways
  const concTitle = post.conclusionTitle || "The future of human-AI collaboration";
  const concBody = post.conclusionBody || "The collaboration of humans and AI will transform industries, combining artistic expression, strategic thinking, and technical execution. Organizations embracing this partnership will create richer experiences, solve complex problems efficiently, and drive innovation in ways previously unimaginable.";
  const concPoints = post.conclusionPoints && post.conclusionPoints.length > 0 ? post.conclusionPoints : [
    "AI-powered tools enhance creative workflows.",
    "Data-driven insights inform better decisions.",
    "Collaboration between humans and AI accelerates innovation.",
    "Future solutions will be smarter, faster, and more imaginative.",
  ];

  // Section 6: Author Bio
  const authorBio = post.authorBio || "By combining human ingenuity with AI capabilities, organizations can unlock new forms of creative expression. Intelligent systems support ideation, experimentation, and execution, while humans provide vision, empathy, and imagination. Together, they form a powerful partnership for innovation and growth.";

  return (
    <>
      <WebflowInit pageId="68edde422825b6d5b8990f59" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://tryangletech.com/blog/${post.slug}`
            },
            "headline": post.title,
            "description": post.metaDescription || post.excerpt || s1P1,
            "image": [coverImage, ...sliderImages.filter((img: string) => img !== coverImage)],
            "datePublished": post.publishedAt || post.createdAt || "2025-10-29T00:00:00.000Z",
            "dateModified": post.updatedAt || post.publishedAt || post.createdAt || "2025-10-29T00:00:00.000Z",
            "author": {
              "@type": "Person",
              "name": authorName,
              "jobTitle": authorRole
            },
            "publisher": {
              "@type": "Organization",
              "name": "TryangleTech",
              "url": "https://tryangletech.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tryangletech.com/icon.png"
              }
            },
            "articleSection": post.category,
            "keywords": post.keywords && post.keywords.length > 0 ? post.keywords.join(", ") : post.category
          })
        }}
      />

      <main>
        <section className="rt-hero-13">
          <div className="w-layout-blockcontainer rt-container w-container">
            <div className="rt-hero-10-heading rt-desktop-text-center">
              <div className="rt-sub-gap">
                <div
                  data-w-id="83bcf42d-4766-4fc8-0747-58448baf3155"
                  className="rt-sub-text rt-sub-gredient">
                  {post.category}
                </div>
              </div>
              <h1
                data-w-id="83bcf42d-4766-4fc8-0747-58448baf3157"
                className="rt-gap-off">
                {post.title}
              </h1>
            </div>
            <div
              data-w-id="d22c76d6-a21f-c2ce-07ca-5c00f34c816e"
              className="rt-hero-13-main-image rt-overflow-hidden"
              style={{ position: 'relative', backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              {sliderImages.length > 1 ? (
                <PortfolioImageSlider
                  images={sliderImages}
                  title={post.title}
                  coverImage={coverImage}
                  coverAlt={coverImageAlt}
                  imageAlts={sliderImageAlts}
                />
              ) : (
                <SafeImage
                  src={coverImage}
                  fallbackSrc="/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png"
                  loading="lazy"
                  alt={coverImageAlt}
                  className="rt-image-scale"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto", objectFit: "contain", maxHeight: "60vh", backgroundColor: 'transparent' }}
                />
              )}
            </div>
          </div>
        </section>
        <section
          data-w-id="0b9dc695-d306-eb81-56f1-71ef2dbac9c7"
          className="rt-blog-post">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-blog-post--main">
              <div
                data-w-id="0b9dc695-d306-eb81-56f1-71ef2dbac9ca"
                className="w-layout-hflex rt-blog-post-date-wrap">
                <p className="rt-gap-off rt-color-vivid-blue">
                  {publishDate}
                </p>
                <div className="rt-author-name-wrap">
                  <div className="rt-dot-small"></div>
                  <div className="rt-sub-text rt-color-blue-yonder">
                    {post.category}
                  </div>
                </div>
              </div>

              {/* 1. SECTION 1: Dynamic Introduction & Story Section */}
              <div
                data-w-id="0b9dc695-d306-eb81-56f1-71ef2dbac9d1"
                className="w-richtext">
                <h2>{s1Heading}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{s1P1}</p>
                {s1P2 && <p style={{ whiteSpace: 'pre-line' }}>{s1P2}</p>}
              </div>

              {/* Meta Grid */}
              <div className="project-meta-grid">
                <div className="meta-card">
                  <span className="meta-label">Category</span>
                  <span className="meta-value">{post.category}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Author</span>
                  <span className="meta-value">{authorName}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Read Time</span>
                  <span className="meta-value">{post.readTime || '5 min read'}</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                <Link href="/blog" className="rt-button-body w-inline-block back-btn-animated" style={{ borderRadius: '100px' }}>
                  <div className="rt-button-text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                  </div>
                </Link>
              </div>

              {/* 2. SECTION 2: Highlight Quote Box */}
              <div
                data-w-id="0b9dc695-d306-eb81-56f1-71ef2dbaca03"
                className="rt-blog-details-overlay">
                <div className="w-layout-hflex rt-blog-details-overlay-inner rt-border-radius-l">
                  <div className="rt-blog-d-image">
                    <Image
                      width={51}
                      height={36}
                      alt=""
                      src="/blog-post-assets/6901bd59af6fd86af618ab91_kloudera-contact-three-icon.svg"
                      loading="lazy"
                      className="rt-height-auto"
                    />
                  </div>
                  <div className="w-layout-vflex rt-blog-overlay-wrap">
                    <div className="rt-text-style-h6 rt-text-color-white">
                      {quoteText}
                    </div>
                    <div className="w-layout-hflex rt-blog-author">
                      <div>
                        <Image
                          width={36}
                          height={1}
                          alt=""
                          src="/blog-post-assets/6901bd59af6fd86af618ab92_Kloudera-blog-post-line.svg"
                          loading="lazy"
                          className="rt-auto-fit rt-desktop-image-full-width"
                        />
                      </div>
                      <div className="rt-text-color-white">{quoteAuthor}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. SECTION 3: Key Steps Section */}
              <div
                data-w-id="0b9dc695-d306-eb81-56f1-71ef2dbaca0f"
                className="w-richtext">
                <h3>{stepsTitle}</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2 flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <p className="m-0" style={{ whiteSpace: 'pre-line' }}>
                      {step1}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <p className="m-0" style={{ whiteSpace: 'pre-line' }}>
                      {step2}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. SECTION 4: Mid-Article Images */}
              <div
                data-w-id="0b9dc695-d306-eb81-56f1-71ef2dbaca41"
                className="rt-blog-details-content-image"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'stretch' }}
              >
                <div
                  className="rt-blog-post-image-wrap rt-overflow-hidden"
                  style={{
                    width: '100%',
                    height: '360px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                  }}
                >
                  <SafeImage
                    width={520}
                    height={360}
                    alt={img1Alt}
                    src={img1}
                    fallbackSrc="/blog-post-assets/69030925158024507ce308ad_taskopia-bolog-botom-image-1.png"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', backgroundColor: 'transparent' }}
                    loading="lazy"
                  />
                </div>
                <div
                  className="rt-blog-post-image-wrap rt-overflow-hidden"
                  style={{
                    width: '100%',
                    height: '360px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                  }}
                >
                  <SafeImage
                    width={520}
                    height={360}
                    alt={img2Alt}
                    src={img2}
                    fallbackSrc="/blog-post-assets/6903092536e793c51e1b23ab_taskopia-bolog-botom-image-2.webp"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', backgroundColor: 'transparent' }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* 5. SECTION 5: Conclusion & Future Outlook */}
              <div
                data-w-id="0b9dc695-d306-eb81-56f1-71ef2dbaca46"
                className="w-richtext">
                <h4>{concTitle}</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{concBody}</p>
                <ul role="list">
                  {concPoints.map((pt: string, idx: number) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>


              {/* 7. SECTION 6: Author Bio Footer */}
              <div
                data-w-id="0b9dc695-d306-eb81-56f1-71ef2dbaca78"
                className="w-layout-hflex rt-bottom-blog">
                <div className="rt-author-bloge-dtails rt-overflow-hidden">
                  <Image
                    width={110}
                    height={110}
                    alt={authorName}
                    src={authorImage}
                    loading="lazy"
                    className="rt-auto-fit rt-desktop-image-full-width"
                  />
                </div>
                <div className="w-layout-vflex rt-author-content-wrap rt-mobile-text-center">
                  <div className="w-layout-hflex rt-blog-post-author-wrap">
                    <div className="rt-text-style-h6">{authorName}</div>
                    <div className="rt-author-degignation-wrap">
                      <div className="rt-blog-degignation-text rt-text-color-white-2">
                        {authorRole}
                      </div>
                    </div>
                  </div>
                  <p className="rt-no-margin" style={{ whiteSpace: 'pre-line' }}>
                    {authorBio}
                  </p>
                </div>
              </div>

              {/* 8. Back to Blog Navigation Button */}
              <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
                <Link
                  href="/blog"
                  className="rt-button-body w-inline-block back-btn-animated"
                  style={{ borderRadius: '100px' }}
                >
                  <div className="rt-button-text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to All Articles
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Article FAQs Section */}
        <div className="animate-section anim-delay-3" style={{ marginTop: '3rem' }}>
          <HomeThreeFaq items={post.faqs} />
        </div>
      </main>
    </>
  );
}
