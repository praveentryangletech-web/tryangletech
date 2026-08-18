import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Project, projects, projects as staticProjects } from '../../data/portfolioData';
import { portfolioService } from '@/backend/services/portfolio';
import { BLOG_POSTS } from '../../blog/data'; 
import HomeTwoTestimonial from '../../home-two/components/HomeTwoTestimonial';
import HomeThreeFaq from '../../home-three/components/Faq';
import Cta from '../../home/components/Cta';
import WebflowInit from '../../common/WebflowInit';
import PortfolioImageSlider from '../components/PortfolioImageSlider';

import type { Metadata } from 'next';
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let project: Project | null = null;
  try {
    const res = await portfolioService.getPaginatedProjects({ slug: resolvedParams.slug });
    if (res.items && res.items.length > 0) {
      project = res.items[0] as Project;
    }
  } catch (err) {
    // fallback
  }

  if (!project) {
    project = staticProjects.find((p) => p.slug === resolvedParams.slug) || null;
  }

  if (!project) {
    return {
      title: 'Portfolio Case Study | TryangleTech',
      description: 'Explore custom software and web development case studies by TryangleTech.',
    };
  }

  const title = project.metaTitle || `${project.title} - ${project.category} | TryangleTech Case Study`;
  const description = project.metaDescription || project.description || 'Custom software design and development case study by TryangleTech.';
  const keywords = project.keywords && project.keywords.length > 0 ? project.keywords : [project.category, 'Web Development', 'TryangleTech'];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: project.image || '/portfolio/vh-accounting.webp',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    alternates: {
      canonical: project.canonicalUrl || `https://tryangletech.com/portfolio/${project.slug}`,
    },
  };
}

export default async function PortfolioDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  // 1. Fetch live from PostgreSQL
  let project: Project | null = null;
  try {
    const res = await portfolioService.getPaginatedProjects({ slug: resolvedParams.slug });
    if (res.items && res.items.length > 0) {
      project = res.items[0] as Project;
    }
  } catch (err) {
    console.warn('DB slug lookup warning, using static fallback:', err);
  }

  // 2. Fallback to static project dataset
  if (!project) {
    project = staticProjects.find((p) => p.slug === resolvedParams.slug) || null;
  }

  if (!project) {
    notFound();
  }

  return (
    <>
      <WebflowInit pageId="68eddb21f14a8338ce862110" />
      <style>{`
        @keyframes fadeUpAnim {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-section {
          opacity: 0;
          animation: fadeUpAnim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-delay-1 { animation-delay: 0.1s; }
        .anim-delay-2 { animation-delay: 0.3s; }
        .anim-delay-3 { animation-delay: 0.5s; }
        .anim-delay-4 { animation-delay: 0.7s; }
      `}</style>
      <main>
        {/* Hero Section */}
        <section className="rt-hero-13 animate-section anim-delay-1">
          <div className="w-layout-blockcontainer rt-container w-container">
            <div className="rt-hero-10-heading rt-desktop-text-center">
              <div className="rt-sub-gap" style={{ justifyContent: 'center' }}>
                <div className="rt-sub-text rt-sub-gredient">
                  {project.category}
                </div>
              </div>
              <h1 className="rt-gap-off">
                {project.title}
              </h1>
            </div>
            <div className="rt-hero-13-main-image rt-overflow-hidden rt-shadow" style={{ maxWidth: '1000px', margin: '0 auto', maxHeight: '550px', borderRadius: '24px', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
              {project.images && project.images.length > 1 ? (
                <PortfolioImageSlider images={project.images} title={project.title} />
              ) : (
                <Image
                  src={project.image}
                  loading="lazy"
                  alt={project.title}
                  className="rt-image-scale"
                  style={{ width: '100%', height: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '16px' }}
                  width={800} height={800} />
              )}
            </div>
          </div>
        </section>

        {/* Main Content & Details */}
        <section className="rt-blog-post animate-section anim-delay-2" style={{ paddingBottom: '0px' }}>
          <style>{`
          .project-meta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 50px;
            padding: 30px;
            // background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 16px;
            // border: 1px solid rgba(226, 232, 240, 0.8);
            // box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          }
          .meta-card {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 15px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
            transition: transform 0.3s ease;
          }
          .meta-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          }
          .meta-label {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #64748b;
            font-weight: 600;
          }
          .meta-value {
            font-size: 18px;
            color: #1a0b54;
            font-weight: 600;
          }
          .start-project-btn {
            background: #1833fe;
            color: white;
            padding: 18px 40px;
            border-radius: 100px;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 25px rgba(24, 51, 254, 0.25);
          }
          .start-project-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(26, 11, 84, 0.25);
            background: #1a0b54;
          }
          
          /* Portfolio Card CSS matching PortfolioGrid */
          .rt-blog-v3-card .rt-blog-image {
            transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            display: block;
            width: 100%;
            object-fit: cover;
          }
          .rt-blog-v3-card:hover .rt-blog-image {
            transform: scale(1.08);
          }
          .rt-blog-v3-card {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .rt-blog-v3-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 28px 50px rgba(24, 72, 212, 0.14) !important;
          }
          .rt-blog-v3-card .rt-blog-v3-card-bottom-part {
            text-align: left !important;
            align-items: flex-start !important;
            width: 100% !important;
          }
          .rt-blog-v3-card:hover .pf-arrow-icon {
            transform: translateX(4px);
          }
          .pf-grid {
            display: grid;
            gap: 30px;
            grid-template-columns: 1fr 1fr !important;
          }
          @media (min-width: 992px) {
            .pf-grid {
              grid-template-columns: 1fr 1fr 1fr !important;
            }
          }
          @media (max-width: 767px) {
            .pf-grid {
              grid-template-columns: 1fr !important;
            }
          }
          .tech-stack-container {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 15px;
            margin-bottom: 30px;
          }
          .tech-pill {
            background: rgba(24, 51, 254, 0.08);
            color: #1833fe;
            padding: 8px 20px;
            border-radius: 100px;
            font-size: 14px;
            font-weight: 600;
            border: 1px solid rgba(24, 51, 254, 0.2);
            transition: all 0.3s ease;
          }
          .tech-pill:hover {
            background: rgba(24, 51, 254, 0.15);
            transform: translateY(-2px);
          }
          .portfolio-list {
            list-style-type: none;
            padding-left: 1rem;
            margin: 0;
          }
          .portfolio-list li {
            position: relative;
            margin-bottom: 16px;
          }
          .portfolio-list li::before {
            content: '';
            position: absolute;
            left: -0.85rem;
            top: 10px;
            width: 6px;
            height: 6px;
            background-color: #1833fe;
            border-radius: 50%;
          }
          .portfolio-view-all-btn {
            position: relative;
            overflow: hidden;
            background-color: transparent !important;
            z-index: 1;
          }
          .portfolio-view-all-btn::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0%;
            background-color: #1833fe;
            transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: -1;
          }
          .portfolio-view-all-btn:hover::before {
            height: 100%;
          }
          .portfolio-view-all-btn .rt-button-text {
            position: relative;
            z-index: 2;
            transition: color 0.4s ease;
          }
          .portfolio-view-all-btn:hover .rt-button-text {
            color: #ffffff !important;
          }
        `}</style>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-blog-post--main">

              <div className="project-meta-grid">
                <div className="meta-card">
                  <span className="meta-label">Client</span>
                  <span className="meta-value">{project.client}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">Duration</span>
                  <span className="meta-value">{project.duration}</span>
                </div>
                <div className="meta-card">
                  <span className="meta-label">{project.category}</span>
                  <span className="meta-value">{project.role}</span>
                </div>
              </div>

              {project.liveUrl && (
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="rt-button-body rt-nav-btn w-inline-block portfolio-view-all-btn" style={{ display: 'inline-flex', width: 'auto', minWidth: '200px', padding: '14px 32px', justifyContent: 'center' }}>
                    <div className="rt-button-text rt-btn-color-nav" style={{ width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                      View Live Site
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </div>
                    <div className="rt-button-body-overlay rt-nav-overlay"></div>
                  </a>
                </div>
              )}

              <div className="w-richtext">
                {project.description && (
                  <>
                    <h2>Project Overview</h2>
                    <p>{project.description}</p>
                  </>
                )}

                {project.content && (
                  <>
                    <h3>Case Study</h3>
                    <p>{project.content}</p>
                  </>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2.5rem', marginBottom: '3rem' }}>
                  {project.challenges && project.challenges.length > 0 && (
                    <div style={{ background: '#ffffff', padding: '1.5rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}>
                      <div className="rt-text-style-h6" style={{ marginBottom: '1.5rem', borderBottom: '2px solid rgba(226, 232, 240, 0.8)', paddingBottom: '0.75rem' }}>The Challenge</div>
                      <ul className="portfolio-list">
                        {project.challenges.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.solutions && project.solutions.length > 0 && (
                    <div style={{ background: '#ffffff', padding: '1.5rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}>
                      <div className="rt-text-style-h6" style={{ marginBottom: '1.5rem', borderBottom: '2px solid rgba(226, 232, 240, 0.8)', paddingBottom: '0.75rem' }}>Our Solution</div>
                      <ul className="portfolio-list">
                        {project.solutions.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.results && project.results.length > 0 && (
                    <div style={{ background: '#ffffff', padding: '1.5rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}>
                      <div className="rt-text-style-h6" style={{ marginBottom: '1.5rem', borderBottom: '2px solid rgba(226, 232, 240, 0.8)', paddingBottom: '0.75rem' }}>Key Results</div>
                      <ul className="portfolio-list">
                        {project.results.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div style={{ marginTop: '4rem', marginBottom: '3rem' }}>
                    <div className="w-layout-hflex rt-our-benefits-heading" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
                      <div className="rt-testimonial-v2-heading-wrap rt-desktop-text-center">
                        <div className="rt-sub-gap" style={{ justifyContent: 'center' }}>
                          <div className="rt-sub-text rt-sub-gredient">TECHNOLOGIES</div>
                        </div>
                        <h2 className="rt-gap-off" style={{ margin: 0 }}>Tools that power this project</h2>
                      </div>
                    </div>
                    <div className="w-layout-vflex rt-integration-main-v2" style={{ margin: '0 auto', maxWidth: '900px' }}>
                      <div className="rt-integration-top" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                        {project.technologies.map((tech: string, i: number) => {
                          const techIconMap: Record<string, string> = {
                            "React": "/tech-icons/react.svg",
                            "React Native": "/tech-icons/react.svg",
                            "Next.js": "/tech-icons/nextjs.svg",
                            "PHP": "/tech-icons/php.svg",
                            "AWS": "/tech-icons/aws.svg",
                            "AWS S3": "/tech-icons/aws.svg",
                            "Docker": "/tech-icons/docker.svg",
                            "Laravel": "/tech-icons/laravel.svg",
                            "Tailwind CSS": "/tech-icons/tailwind.svg",
                            "Figma": "/tech-icons/figma.svg",
                            "Google Ads": "/tech-icons/google-ads.svg",
                            "Razorpay": "/tech-icons/razorpay.svg",
                            "Meta": "/tech-icons/meta.svg",
                            "MongoDB": "/tech-icons/mongodb.svg",
                            "MySQL": "/tech-icons/mysql.svg",
                            "PostgreSQL": "/tech-icons/postgresql.svg",
                            "SQLite": "/tech-icons/sqlite.svg",
                            "Stripe": "/tech-icons/stripe.svg",
                            "Swift": "/tech-icons/swift.svg",
                            "WordPress": "/tech-icons/wordpress.svg",
                            "Flutter": "/tech-icons/flutter.svg",
                            "Git": "/tech-icons/git.svg",
                            "Kotlin": "/tech-icons/kotlin.svg",
                          };
                          const iconSrc = techIconMap[tech];
                          return (
                            <div key={i} className="animate-section" style={{ animationDelay: `${i * 0.15}s` }}>
                              {iconSrc ? (
                                <img
                                  alt={tech}
                                  src={iconSrc}
                                  loading="lazy"
                                  className="rt-itegration-logo hover:-translate-y-2 transition-all duration-300"
                                  style={{ width: '85px', height: '85px', objectFit: 'contain', padding: '18px', boxSizing: 'border-box', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)' }}
                                />
                              ) : (
                                <div className="rt-itegration-logo hover:-translate-y-2 transition-all duration-300" style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  minWidth: '85px',
                                  width: 'auto',
                                  height: '85px',
                                  background: '#ffffff',
                                  padding: '0 16px',
                                  boxSizing: 'border-box',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
                                }}>
                                  <span className="rt-text-style-h6" style={{ margin: 0, textAlign: 'center', whiteSpace: 'nowrap' }}>{tech}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Relevant Projects Section */}
                <div style={{ marginTop: '5rem', marginBottom: '3rem' }}>
                  <div className="w-layout-hflex rt-our-benefits-heading" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
                    <div className="rt-testimonial-v2-heading-wrap rt-desktop-text-center">
                      <div className="rt-sub-gap" style={{ justifyContent: 'center' }}>
                        <div className="rt-sub-text rt-sub-gredient">PORTFOLIO</div>
                      </div>
                      <h2 className="rt-gap-off" style={{ margin: 0 }}>Explore similar projects</h2>
                    </div>
                  </div>
                  <div className="rt-blog-three-all w-dyn-list">
                    <div role="list" className="rt-blog-v3-card-main w-dyn-items pf-grid animate-section anim-delay-2">
                      {(() => {
                        let relevant = staticProjects.filter(p => p.category === project.category && p.slug !== project.slug).slice(0, 3);
                        if (relevant.length < 3) {
                          const more = staticProjects.filter(p => p.category !== project.category && p.slug !== project.slug).slice(0, 3 - relevant.length);
                          relevant.push(...more);
                        }
                        return relevant.map((p, idx) => (
                          <div key={idx} role="listitem" className="w-dyn-item" style={{ height: '100%' }}>
                            <Link
                              href={`/portfolio/${p.slug}`}
                              className="rt-blog-v3-card rt-border-radius-medium w-inline-block"
                            >
                              <div className="rt-blog-v3-card-top-part rt-border-radius-medium rt-overflow-hidden">
                                <Image
                                  className="rt-auto-fit rt-desktop-image-full-width rt-blog-image"
                                  src={p.image}
                                  alt={p.title}
                                  width={410}
                                  height={290}
                                  loading="lazy"
                                  unoptimized={p.image.endsWith('.gif')}
                                  style={{ height: '175px' }}
                                />
                              </div>
                              <div className="rt-blog-v3-card-bottom-part">
                                <div className="w-layout-hflex rt-blog-v3-publish-date">
                                  <div className="w-layout-vflex">
                                    <Image
                                      width={15}
                                      height={16}
                                      alt=""
                                      src="/blog-assets/691702072672e09d875c245f_calendar-check.svg"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div>{p.category}</div>
                                </div>
                                <div className="rt-text-style-h6">{p.title}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '6px', paddingTop: '0.9375rem' }}>
                                  <span className="rt-button-text rt-color-vivid-blue" style={{ margin: 0 }}>
                                    View Case Study
                                  </span>
                                  <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'start',
                                    color: 'var(--vivid-blue, #1833fe)',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    lineHeight: 1,
                                    transition: 'transform 0.3s ease',
                                  }} className="pf-arrow-icon">›</span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <Link href="/portfolio" className="rt-button-body rt-nav-btn w-inline-block portfolio-view-all-btn" style={{ display: 'inline-flex', width: 'auto', minWidth: '200px', padding: '14px 32px', justifyContent: 'center' }}>
                      <div className="rt-button-text rt-btn-color-nav" style={{ width: 'auto', display: 'inline-block', margin: 0 }}>View all projects</div>
                      <div className="rt-button-body-overlay rt-nav-overlay"></div>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials, FAQ, and CTA Sections */}

        <div className="animate-section anim-delay-4">
          <HomeTwoTestimonial />
          {/* <Cta /> */}
        </div>
        <div className="animate-section anim-delay-3">
          <HomeThreeFaq />
        </div>
      </main>
    </>
  );
}
