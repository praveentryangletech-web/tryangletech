"use client";

import React, { useEffect, useRef, useState } from "react";
import WebflowInit from "../common/WebflowInit";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Link from "next/link";

export default function ServicesMainPage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-wf-page", "68e5d0a6a48cfd0f7a0b5c15");
    document.documentElement.setAttribute("data-wf-site", "68c3feed3b3e541e7d5c098a");

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      href: "/service/service-one",
      icon: "/service-1-assets/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg",
      tag: "AI-Powered",
      title: "Automation Solutions",
      desc: "Eliminate repetitive tasks, cut errors and unlock smarter decision-making with intelligent AI workflows built for your team.",
    },
    {
      href: "/service/service-two",
      icon: "/service-2-assets/68ef2712bdcf3d7a4fee2f43_REZOTA.svg",
      tag: "Productivity",
      title: "Task Management",
      desc: "Stay in control — set goals, assign work, track deadlines and collaborate in real-time from a single unified platform.",
    },
    {
      href: "/service/service-three",
      icon: "/service3-assets/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp",
      tag: "Insights",
      title: "Performance Analytics",
      desc: "Get deep real-time insights into your team's performance with analytics that help you optimize, grow and outperform.",
    },
  ];

  const stats = [
    { value: "10x", label: "Faster Delivery" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50K+", label: "Tasks Automated" },
    { value: "24/7", label: "Support Available" },
  ];

  const features = [
    { emoji: "⚡", title: "Lightning Fast Setup", desc: "Get your team onboarded in minutes with zero friction." },
    { emoji: "🔒", title: "Enterprise-Grade Security", desc: "End-to-end encryption and role-based access controls." },
    { emoji: "🔗", title: "Seamless Integrations", desc: "Connect with Slack, GitHub, Jira, Notion and 100+ tools." },
    { emoji: "📊", title: "Real-Time Insights", desc: "Live dashboards so you always know what's happening." },
  ];

  return (
    <>
      <style>{`
        @keyframes svc-fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes svc-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes svc-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes svc-cardIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes svc-statIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Hero */
        .svc-hero { position: relative; padding: 130px 0 80px; overflow: hidden; text-align: center; }
        .svc-hero-orb {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none; z-index: 0;
        }
        .svc-hero-orb-1 {
          width: 460px; height: 460px;
          background: radial-gradient(circle, rgba(143,100,255,0.22) 0%, transparent 70%);
          top: -80px; left: -120px;
          animation: svc-float 9s ease-in-out infinite;
        }
        .svc-hero-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(100,200,180,0.14) 0%, transparent 70%);
          bottom: -60px; right: -80px;
          animation: svc-float 11s ease-in-out infinite reverse;
        }
        .svc-hero-content { position: relative; z-index: 1; }
        .svc-hero-anim-1 { animation: svc-fadeUp 0.65s ease forwards; animation-delay: 0.05s; opacity: 0; }
        .svc-hero-anim-2 { animation: svc-fadeUp 0.65s ease forwards; animation-delay: 0.2s;  opacity: 0; }
        .svc-hero-anim-3 { animation: svc-fadeUp 0.65s ease forwards; animation-delay: 0.35s; opacity: 0; }
        .svc-hero-anim-4 { animation: svc-fadeUp 0.65s ease forwards; animation-delay: 0.5s;  opacity: 0; }

        /* Shimmer gradient heading */
        .svc-shimmer-text {
          background: linear-gradient(90deg, var(--svc-accent, #8f64ff) 0%, #b49aff 30%, #5ee7d0 60%, #8f64ff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: svc-shimmer 5s linear infinite;
        }

        /* Stats */
        .svc-stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
          margin: 0 auto; max-width: 900px;
        }
        @media (max-width: 768px) { .svc-stats-grid { grid-template-columns: repeat(2,1fr); } }
        .svc-stat-box {
          padding: 32px 20px; text-align: center;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          transition: border-color 0.3s, transform 0.3s;
        }
        .svc-stat-box:hover { border-color: rgba(143,100,255,0.35); transform: translateY(-4px); }
        .svc-stat-val {
          font-size: 2.1rem; font-weight: 800; line-height: 1;
          margin-bottom: 8px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .svc-stat-val.show { opacity: 1; transform: translateY(0); }
        .svc-stat-lbl { font-size: 12.5px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; }

        /* Service cards */
        .svc-cards-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 24px;
          max-width: 1100px; margin: 0 auto;
        }
        @media (max-width: 960px)  { .svc-cards-grid { grid-template-columns: 1fr; max-width: 480px; } }
        .svc-card {
          position: relative; overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          padding: 38px 30px;
          display: flex; flex-direction: column; gap: 16px;
          text-decoration: none;
          transition: transform 0.35s cubic-bezier(0.34,1.4,0.64,1), border-color 0.3s, box-shadow 0.35s;
          opacity: 0;
          animation: svc-cardIn 0.6s ease forwards;
        }
        .svc-card:hover {
          transform: translateY(-10px);
          border-color: rgba(143,100,255,0.4);
          box-shadow: 0 24px 60px rgba(143,100,255,0.15);
        }
        .svc-card-glow {
          position: absolute; top: -50px; right: -50px;
          width: 180px; height: 180px; border-radius: 50%;
          background: rgba(143,100,255,0.18); filter: blur(50px);
          pointer-events: none; transition: opacity 0.35s;
        }
        .svc-card:hover .svc-card-glow { opacity: 1.5; }
        .svc-card-tag {
          display: inline-block; padding: 3px 12px; border-radius: 100px;
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(143,100,255,0.14);
          border: 1px solid rgba(143,100,255,0.3);
          width: fit-content;
        }
        .svc-card-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; overflow: hidden;
        }
        .svc-card-title { font-size: 1.3rem; font-weight: 700; color: #fff; margin: 0; line-height: 1.3; }
        .svc-card-desc  { font-size: 14px; line-height: 1.7; flex: 1; margin: 0; }
        .svc-card-cta {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
          margin-top: 6px;
        }
        .svc-card-arrow { transition: transform 0.25s; }
        .svc-card:hover .svc-card-arrow { transform: translateX(5px); }

        /* Feature grid */
        .svc-features-grid {
          display: grid; grid-template-columns: repeat(2,1fr); gap: 18px;
          max-width: 860px; margin: 0 auto;
        }
        @media (max-width: 768px) { .svc-features-grid { grid-template-columns: 1fr; } }
        .svc-feat-item {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 22px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          transition: transform 0.25s, border-color 0.25s;
        }
        .svc-feat-item:hover { transform: translateY(-3px); border-color: rgba(143,100,255,0.25); }
        .svc-feat-icon {
          width: 42px; height: 42px; flex-shrink: 0;
          border-radius: 11px; background: rgba(143,100,255,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .svc-feat-title { font-size: 14.5px; font-weight: 700; color: #fff; margin: 0 0 5px; }
        .svc-feat-desc  { font-size: 13px; line-height: 1.6; margin: 0; }

        /* CTA box */
        .svc-cta-box {
          border-radius: 28px;
          border: 1px solid rgba(143,100,255,0.25);
          background: linear-gradient(135deg, rgba(143,100,255,0.1) 0%, rgba(255,255,255,0.03) 100%);
          padding: 80px 40px; text-align: center;
          position: relative; overflow: hidden;
          max-width: 860px; margin: 0 auto;
        }
        .svc-cta-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(143,100,255,0.12);
          pointer-events: none;
        }
      `}</style>

      <WebflowInit pageId="68e5d0a6a48cfd0f7a0b5c15" />
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────── */}
        <div className="svc-hero">
          <div className="svc-hero-orb svc-hero-orb-1" />
          <div className="svc-hero-orb svc-hero-orb-2" />

          <div className="w-layout-blockcontainer rt-container-main w-container svc-hero-content">

            {/* sub label — matches project's rt-sub-text rt-sub-gredient pattern */}
            <div className="rt-sub-gap svc-hero-anim-1">
              <div className="rt-sub-text rt-sub-gredient">Our Services</div>
            </div>

            <div className="rt-hero-heading-gap svc-hero-anim-2">
              <h1 className="rt-gap-off">
                Powerful solutions for{" "}
                <span className="svc-shimmer-text">modern businesses</span>
              </h1>
            </div>

            <div className="rt-hero-v7-para-wrap svc-hero-anim-3">
              <p className="rt-gap-off">
                From AI-driven automation to streamlined task management and intelligent analytics —
                discover everything we offer to help your team move faster and achieve more.
              </p>
            </div>

            <div className="w-layout-hflex rt-hero-v5-button-wrap svc-hero-anim-4" style={{ justifyContent: "center" }}>
              <a href="/contact" className="rt-button-body w-inline-block">
                <div className="rt-button-text">Get started today</div>
                <div className="rt-button-body-overlay"></div>
              </a>
              <a href="/about" data-wf--rt-border-button--variant="base" className="rt-button-body rt-nav-btn w-inline-block">
                <div className="rt-button-text rt-btn-color-nav">Learn more</div>
                <div className="rt-button-body-overlay rt-nav-overlay"></div>
              </a>
            </div>

          </div>
        </div>

        {/* ── STATS ─────────────────────────── */}
        <section style={{ padding: "0 0 90px" }}>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div ref={statsRef} className="svc-stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="svc-stat-box">
                  <div
                    className={`svc-stat-val svc-shimmer-text${statsVisible ? " show" : ""}`}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >{s.value}</div>
                  <div className="svc-stat-lbl rt-color-pale-periwinkle">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT WE OFFER ─────────────────── */}
        <section style={{ padding: "0 0 110px" }}>
          <div className="w-layout-blockcontainer rt-container-main w-container">

            {/* Section heading — matches project pattern */}
            <div className="rt-tools-iconheading rt-heading-bottom-gap rt-desktop-text-center" style={{ marginBottom: "52px" }}>
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">What we offer</div>
              </div>
              <h2 className="rt-gap-off">
                Choose the right{" "}
                <span className="rt-color-periwinkle-gray">solution for you</span>
              </h2>
            </div>

            <div className="svc-cards-grid" style={{ padding: "0 24px" }}>
              {services.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="svc-card"
                  style={{ animationDelay: `${0.05 + i * 0.14}s` }}
                >
                  <div className="svc-card-glow" />

                  <div className="svc-card-tag rt-sub-text rt-sub-gredient" style={{ WebkitTextFillColor: "unset" }}>
                    {s.tag}
                  </div>

                  <div className="svc-card-icon-wrap">
                    <img src={s.icon} alt={s.title} width="28" height="28" loading="lazy" style={{ objectFit: "contain" }} />
                  </div>

                  <h3 className="svc-card-title">{s.title}</h3>
                  <p className="svc-card-desc rt-color-pale-periwinkle">{s.desc}</p>

                  <div className="svc-card-cta rt-sub-text rt-sub-gredient" style={{ WebkitTextFillColor: "unset" }}>
                    Explore service
                    <svg className="svc-card-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ─────────────────── */}
        <section style={{ padding: "0 0 110px" }}>
          <div className="w-layout-blockcontainer rt-container-main w-container">

            <div className="rt-tools-iconheading rt-heading-bottom-gap rt-desktop-text-center" style={{ marginBottom: "52px" }}>
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">Why choose us</div>
              </div>
              <h2 className="rt-gap-off">
                Built for teams that{" "}
                <span className="rt-color-periwinkle-gray">move fast</span>
              </h2>
            </div>

            <div className="svc-features-grid" style={{ padding: "0 24px" }}>
              {features.map((f, i) => (
                <div key={i} className="svc-feat-item">
                  <div className="svc-feat-icon">{f.emoji}</div>
                  <div>
                    <p className="svc-feat-title">{f.title}</p>
                    <p className="svc-feat-desc rt-color-pale-periwinkle">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────── */}
        <section style={{ padding: "0 24px 110px" }}>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="svc-cta-box">
              {/* Decorative rings */}
              <div className="svc-cta-ring" style={{ width: 260, height: 260, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              <div className="svc-cta-ring" style={{ width: 460, height: 460, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="rt-sub-gap" style={{ marginBottom: "16px" }}>
                  <div className="rt-sub-text rt-sub-gredient">Ready to start?</div>
                </div>
                <h2 className="rt-gap-off rt-text-color-white" style={{ marginBottom: "16px" }}>
                  Not sure which service fits your needs?
                </h2>
                <p className="rt-color-pale-periwinkle" style={{ maxWidth: "480px", margin: "0 auto 36px", fontSize: "15px", lineHeight: "1.75" }}>
                  Our team is here to help you find the perfect solution for your business size, goals and workflow.
                </p>
                <div className="w-layout-hflex rt-hero-v5-button-wrap" style={{ justifyContent: "center" }}>
                  <a href="/contact" className="rt-button-body w-inline-block">
                    <div className="rt-button-text">Talk to our team</div>
                    <div className="rt-button-body-overlay"></div>
                  </a>
                  <a href="/about" data-wf--rt-border-button--variant="base" className="rt-button-body rt-nav-btn w-inline-block">
                    <div className="rt-button-text rt-btn-color-nav">Read our story</div>
                    <div className="rt-button-body-overlay rt-nav-overlay"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
