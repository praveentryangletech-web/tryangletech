import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '../../data/portfolioData';
import { BLOG_POSTS } from '../../blog/data';
import HomeTwoTestimonial from '../../home-two/components/HomeTwoTestimonial';
import HomeThreeFaq from '../../home-three/components/Faq';
import Cta from '../../home/components/Cta';
import WebflowInit from '../../common/WebflowInit';
import PortfolioButtons from '../components/PortfolioButtons';

import Image from "next/image";

export default async function PortfolioDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

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
              <Image
                src={project.image}
                loading="lazy"
                alt={project.title}
                className="rt-image-scale"
                style={{ width: '100%', height: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '16px' }}
                width={800} height={800} />
            </div>
          </div>
        </section>

        {/* Main Content & Details */}
        <section className="rt-blog-post animate-section anim-delay-2">
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
            color: #0f172a;
            font-weight: 600;
          }
          .enhanced-richtext {
            font-family: 'Inter', sans-serif;
          }
          .enhanced-richtext h2, .enhanced-richtext h3 {
            color: #0f172a;
            font-weight: 700;
            margin-top: 40px;
            margin-bottom: 20px;
            position: relative;
            display: inline-block;
          }
          .enhanced-richtext h2::after, .enhanced-richtext h3::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 40px;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            border-radius: 2px;
          }
          .enhanced-richtext p {
            font-size: 19px;
            line-height: 1.8;
            color: #334155;
            margin-bottom: 24px;
          }
          .start-project-btn {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
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
            box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);
          }
          .start-project-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(15, 23, 42, 0.3);
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          }
          .tech-stack-container {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 15px;
            margin-bottom: 30px;
          }
          .tech-pill {
            background: rgba(121, 107, 240, 0.08);
            color: #5b4dbf;
            padding: 8px 20px;
            border-radius: 100px;
            font-size: 14px;
            font-weight: 600;
            border: 1px solid rgba(121, 107, 240, 0.2);
            transition: all 0.3s ease;
          }
          .tech-pill:hover {
            background: rgba(121, 107, 240, 0.15);
            transform: translateY(-2px);
          }
          .list-item-custom {
            margin-bottom: 16px;
            padding-left: 1.5rem;
            position: relative;
            color: #334155;
            font-size: 1.1rem;
            line-height: 1.6;
          }
          .list-item-custom::before {
            content: '';
            position: absolute;
            left: 0;
            top: 10px;
            width: 8px;
            height: 8px;
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
                  <span className="meta-label">Role</span>
                  <span className="meta-value">{project.role}</span>
                </div>
              </div>
              <PortfolioButtons />

              <div className="enhanced-richtext">
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
                    <div style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}>
                      <div className="rt-text-style-h6" style={{ marginBottom: '1.5rem', color: '#1a0b54', borderBottom: '2px solid rgba(226, 232, 240, 0.8)', paddingBottom: '0.75rem' }}>The Challenge</div>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {project.challenges.map((item, i) => (
                          <li key={i} className="list-item-custom">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.solutions && project.solutions.length > 0 && (
                    <div style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}>
                      <div className="rt-text-style-h6" style={{ marginBottom: '1.5rem', color: '#1a0b54', borderBottom: '2px solid rgba(226, 232, 240, 0.8)', paddingBottom: '0.75rem' }}>Our Solution</div>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {project.solutions.map((item, i) => (
                          <li key={i} className="list-item-custom">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.results && project.results.length > 0 && (
                    <div style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}>
                      <div className="rt-text-style-h6" style={{ marginBottom: '1.5rem', color: '#1a0b54', borderBottom: '2px solid rgba(226, 232, 240, 0.8)', paddingBottom: '0.75rem' }}>Key Results</div>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {project.results.map((item, i) => (
                          <li key={i} className="list-item-custom">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div style={{ marginTop: '2.5rem', marginBottom: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <h3 style={{ display: 'inline-block', margin: 0, fontSize: '1.5rem', color: '#1a0b54', fontWeight: 'bold' }}>Technologies</h3>
                    </div>
                    <div className="w-layout-vflex rt-integration-main-v2" style={{ margin: '0 auto', maxWidth: '900px' }}>
                      <div className="rt-integration-top" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                        {project.technologies.map((tech, i) => {
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
                                  style={{ width: '85px', height: '85px', objectFit: 'contain', padding: '18px', boxSizing: 'border-box' }}
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
                                  boxSizing: 'border-box'
                                }}>
                                  <span className="rt-text-style-h6" style={{ fontSize: '0.9rem', margin: 0, textAlign: 'center', color: '#1a0b54', whiteSpace: 'nowrap', fontWeight: '600' }}>{tech}</span>
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
                  <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', color: '#1a0b54', fontWeight: 'bold', textAlign: 'center' }}>Relevant Projects</h3>
                  <div className="w-dyn-list">
                    <div role="list" className="rt-blog-v4-card-main w-dyn-items animate-section anim-delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                      {(() => {
                        let relevant = projects.filter(p => p.category === project.category && p.slug !== project.slug).slice(0, 3);
                        if (relevant.length < 3) {
                          const more = projects.filter(p => p.category !== project.category && p.slug !== project.slug).slice(0, 3 - relevant.length);
                          relevant.push(...more);
                        }
                        return relevant.map((p, idx) => (
                          <div key={idx} role="listitem" className="w-dyn-item" style={{ height: '100%' }}>
                            <Link href={`/portfolio/${p.slug}`} className="rt-blog-v3-card rt-border-radius-medium w-inline-block transition-all duration-300 hover:-translate-y-2" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fff', border: '1px solid #e2e8f0' }}>
                              <div className="rt-blog-v3-card-top-part rt-overflow-hidden" style={{ minHeight: '220px', background: '#f0f4f8' }}>
                                <Image className="rt-auto-fit rt-desktop-image-full-width rt-blog-image hover:scale-105 transition-transform duration-500" src={p.image} width={410} height={348} alt={p.title} loading="lazy" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                              </div>
                              <div className="rt-blog-v3-card-bottom-part" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <div className="w-layout-hflex rt-blog-v3-publish-date" style={{ marginBottom: '1rem', color: '#64748b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div>{p.duration || 'Completed'}</div>
                                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }}></div>
                                  <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>{p.category}</div>
                                </div>
                                <div className="rt-text-style-h6" style={{ color: '#1a0b54', lineHeight: '1.4', fontSize: '1.1rem', margin: 0 }}>{p.title}</div>
                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', color: '#3b82f6', fontWeight: '600', fontSize: '0.95rem' }}>
                                  View project
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <Link href="/portfolio" className="rt-button-body rt-nav-btn w-inline-block">
                      <div className="rt-button-text rt-btn-color-nav">View all projects</div>
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
