import React from 'react';
import { notFound } from 'next/navigation';
import { projects } from '../../data/portfolioData';
import HomeTwoTestimonial from '../../home-two/components/HomeTwoTestimonial';
import HomeThreeFaq from '../../home-three/components/Faq';
import Cta from '../../home/components/Cta';
import WebflowInit from '../../common/WebflowInit';

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
              <img
                src={project.image}
                loading="lazy"
                alt={project.title}
                className="rt-image-scale"
                style={{ width: '100%', height: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '16px' }}
              />
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
            background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 16px;
            border: 1px solid rgba(226, 232, 240, 0.8);
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
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

              <div className="enhanced-richtext">
                <h2>Project Overview</h2>
                <p>
                  {project.description}
                </p>

                <h3>Case Study</h3>
                <p>
                  {project.content}
                </p>
              </div>

              <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
                <a href="/contact" className="start-project-btn">
                  Start a similar project
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials, FAQ, and CTA Sections */}

        <div className="animate-section anim-delay-4">
          <HomeTwoTestimonial />
          <Cta />
        </div>
        <div className="animate-section anim-delay-3">
          <HomeThreeFaq />
        </div>
      </main>
    </>
  );
}
