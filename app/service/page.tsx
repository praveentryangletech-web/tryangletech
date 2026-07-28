"use client";

import React, { useEffect, useRef, useState } from "react";
import WebflowInit from "../common/WebflowInit";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Link from "next/link";

/* ── Scroll reveal hook ─────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            setTimeout(() => el.classList.add("revealed"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Animated sketch background SVG ────────────────────── */
function SketchBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="svcGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0L0 0 0 60" fill="none" stroke="#6c47ff" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#svcGrid)" />
      </svg>

      {/* Dashed animated circle — top left */}
      <div className="absolute top-12 left-14 animate-[svcBob_7s_ease-in-out_infinite]">
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <circle cx="55" cy="55" r="48" stroke="#6c47ff" strokeWidth="1.5"
            strokeDasharray="8 5" strokeDashoffset="0" opacity="0.28"
            style={{ animation: "svcDraw 3s ease forwards" }}/>
          <circle cx="55" cy="55" r="6" fill="#6c47ff" opacity="0.22"/>
        </svg>
      </div>

      {/* Squiggle — top right */}
      <div className="absolute top-10 right-20 animate-[svcWobble_5s_ease-in-out_infinite]">
        <svg width="130" height="70" viewBox="0 0 130 70" fill="none">
          <path d="M5 35 Q35 5 65 35 Q95 65 125 35"
            stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.45"
            style={{ strokeDasharray:400, strokeDashoffset:400, animation:"svcDash 2.8s ease 0.3s forwards" }}/>
        </svg>
      </div>

      {/* Spinning star — left center */}
      <div className="absolute top-[42%] left-8 animate-[svcSpin_16s_linear_infinite]">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 2 L22.8 17 L38 20 L22.8 23 L20 38 L17.2 23 L2 20 L17.2 17 Z"
            stroke="#6c47ff" strokeWidth="1.8" fill="none" opacity="0.32"/>
        </svg>
      </div>

      {/* Drawn wave — bottom center */}
      <div className="absolute bottom-10 left-32" style={{ animation: "svcBobSlow 9s ease-in-out infinite" }}>
        <svg width="180" height="50" viewBox="0 0 180 50" fill="none">
          <path d="M5 40 Q45 5 90 25 Q135 45 175 10"
            stroke="#34d399" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35"
            style={{ strokeDasharray:500, strokeDashoffset:500, animation:"svcDash 3.2s ease 0.6s forwards" }}/>
        </svg>
      </div>

      {/* Dots cluster — bottom right */}
      <div className="absolute bottom-12 right-20 animate-[svcBobSlow_8s_ease-in-out_infinite_reverse]">
        <svg width="90" height="60" viewBox="0 0 90 60" fill="none">
          {[10,28,46,64].flatMap((x,i)=>[16,36].map((y,j)=>(
            <circle key={`${i}-${j}`} cx={x} cy={y} r="3.5" fill="#6c47ff" opacity={0.1+i*0.055}/>
          )))}
        </svg>
      </div>

      {/* Pulsing triangle — right */}
      <div className="absolute top-[55%] right-12 animate-[svcSpin_24s_linear_infinite_reverse]">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <polygon points="26,4 50,46 2,46"
            stroke="#f59e0b" strokeWidth="1.5" fill="none"
            style={{ animation:"svcPulse 3s ease-in-out infinite" }} opacity="0.3"/>
        </svg>
      </div>

      {/* Bracket — bottom left */}
      <div className="absolute bottom-20 left-10 opacity-25">
        <svg width="50" height="80" viewBox="0 0 50 80" fill="none">
          <path d="M40 5 L10 5 L10 75 L40 75" stroke="#6c47ff" strokeWidth="2"
            strokeLinecap="round" fill="none" strokeDasharray="6 4"
            style={{ strokeDashoffset:300, animation:"svcDash 2.5s ease 0.8s forwards" }}/>
        </svg>
      </div>
    </div>
  );
}

export default function ServicesMainPage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  useScrollReveal();

  useEffect(() => {
    document.documentElement.setAttribute("data-wf-page", "68e5d0a6a48cfd0f7a0b5c15");
    document.documentElement.setAttribute("data-wf-site", "68c3feed3b3e541e7d5c098a");
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);

  /* Tailwind v4 arbitrary keyframes via @theme or inline style tag */
  return (
    <>
      <style>{`
        @keyframes svcBob     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes svcBobSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes svcSpin    { to{transform:rotate(360deg)} }
        @keyframes svcWobble  { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }
        @keyframes svcPulse   { 0%,100%{opacity:.15;transform:scale(1)} 50%{opacity:.4;transform:scale(1.08)} }
        @keyframes svcDash    { from{stroke-dashoffset:inherit;opacity:0} 8%{opacity:1} to{stroke-dashoffset:0;opacity:1} }
        @keyframes svcDraw    { from{stroke-dashoffset:400;opacity:0} 10%{opacity:1} to{stroke-dashoffset:0;opacity:1} }
        @keyframes svcStatPop { 0%{opacity:0;transform:translateY(12px) scale(.9)} 60%{transform:translateY(-2px) scale(1.04)} 100%{opacity:1;transform:none} }
        @keyframes svcFadeUp  { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:none} }

        /* Scroll reveal */
        [data-reveal]           { opacity:0; transition: opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1); }
        [data-reveal="up"]      { transform:translateY(44px); }
        [data-reveal="left"]    { transform:translateX(-44px); }
        [data-reveal="right"]   { transform:translateX(44px); }
        [data-reveal="scale"]   { transform:scale(.88); }
        [data-reveal="fade"]    { transform:none; }
        .revealed               { opacity:1 !important; transform:none !important; }

        /* Stat counter pop */
        .stat-show { animation: svcStatPop .6s ease forwards; }

        /* Sketch underline */
        .sketch-underline        { position:relative; display:inline-block; }
        .sketch-underline svg    { position:absolute; bottom:-6px; left:0; width:100%; height:12px; overflow:visible; }

        /* Fallback Native CSS Layouts (in case Tailwind hasn't compiled yet) */
        .svc-hero-wrap { position:relative; overflow:hidden; background:#fff; text-align:center; padding:120px 20px 80px; }
        .svc-hero-content { position:relative; z-index:10; max-width:880px; margin:0 auto; }
        .svc-btn-row { display:flex; flex-wrap:wrap; gap:16px; justify-content:center; }

        .svc-section-wrap { position:relative; overflow:hidden; background:#fff; padding:90px 20px; }
        .svc-section-inner { max-width:1040px; margin:0 auto; position:relative; z-index:10; }
        
        .svc-grid-3 { display:grid; grid-template-columns:repeat(3, 1fr); gap:30px; margin-top:50px; }
        @media(max-width:900px){ .svc-grid-3 { grid-template-columns:1fr; max-width:500px; margin:50px auto 0; } }

        .svc-card {
          display:flex; flex-direction:column; height:100%;
          border-radius:18px; overflow:hidden; border:1px solid #f1f5f9; background:#fff;
          transition:transform 0.4s, box-shadow 0.4s, border-color 0.4s;
          text-decoration:none;
        }
        .svc-card:hover {
          transform:translateY(-8px);
          box-shadow:0 24px 60px rgba(108,71,255,0.12);
          border-color:#c5b6ff;
        }
        .svc-card-img-wrap { width:100%; height:200px; position:relative; overflow:hidden; flex-shrink:0; }
        .svc-card-img-wrap img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s; }
        .svc-card:hover .svc-card-img-wrap img { transform:scale(1.06); }
        
        .svc-card-body { padding:30px; display:flex; flex-direction:column; gap:14px; flex-grow:1; }
        .svc-card-title { font-size:1.4rem; font-weight:800; color:#111827; margin:0; line-height:1.3; transition:color 0.2s; }
        .svc-card-desc { font-size:0.9rem; color:#6b7280; line-height:1.6; margin:0; }
        .svc-card-feats { display:flex; flex-wrap:wrap; gap:8px; margin-top:auto; padding-top:16px; }
        .svc-card-cta { display:inline-flex; align-items:center; gap:8px; margin-top:10px; font-size:0.85rem; font-weight:700; transition:gap 0.2s; }
        .svc-card:hover .svc-card-cta { gap:14px; }
      `}</style>

      <WebflowInit pageId="68e5d0a6a48cfd0f7a0b5c15" />
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white text-center py-32 px-4">
        <SketchBg />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* badge */}
          <div data-reveal="fade" data-delay="0"
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"/>
            Our Services
          </div>

          {/* heading */}
          <div data-reveal="up" data-delay="80">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
              Smarter services to{" "}
              <span className="sketch-underline text-violet-600">
                streamline your business
                <svg viewBox="0 0 480 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 Q120 2 240 10 Q360 17 478 5" stroke="#6c47ff" strokeWidth="3" strokeLinecap="round" opacity="0.45"/>
                </svg>
              </span>
            </h1>
          </div>

          {/* desc */}
          <p data-reveal="up" data-delay="180"
            className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Every task organized. Every deadline clear. Every team member aligned —
            choose the service that transforms how your team works.
          </p>

          {/* CTAs */}
          <div data-reveal="up" data-delay="280"
            className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="rt-button-body w-inline-block">
              <div className="rt-button-text">Get started today</div>
              <div className="rt-button-body-overlay"/>
            </Link>
            <Link href="/about" data-wf--rt-border-button--variant="base" className="rt-button-body rt-nav-btn w-inline-block">
              <div className="rt-button-text rt-btn-color-nav">Learn more</div>
              <div className="rt-button-body-overlay rt-nav-overlay"/>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 border-y border-slate-100 py-16 overflow-hidden">
        {/* BG sketch */}
        <svg className="absolute right-0 bottom-0 opacity-[0.06] pointer-events-none" width="300" height="180" viewBox="0 0 300 180" fill="none">
          <path d="M10 170 Q80 30 150 90 Q220 150 290 20" stroke="#6c47ff" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>

        <div ref={statsRef} className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            { val:"200", acc:"+", label:"Teams onboarded"   },
            { val:"98",  acc:"%", label:"Client satisfaction"},
            { val:"50K", acc:"+", label:"Tasks automated"   },
            { val:"3",   acc:"×", label:"Productivity boost"},
          ].map((s,i)=>(
            <div key={i} className="py-8 px-5 text-center relative [&:not(:last-child)]:after:content-[''] [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:top-[20%] [&:not(:last-child)]:after:h-[60%] [&:not(:last-child)]:after:w-px [&:not(:last-child)]:after:bg-slate-200">
              <div className={`text-4xl font-black text-gray-900 mb-2 ${statsVisible ? "stat-show" : "opacity-0"}`}
                style={{ animationDelay: `${i*0.12}s` }}>
                {s.val}<span className="text-violet-600">{s.acc}</span>
              </div>
              <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SERVICE CARDS ═════════════════════════════════════ */}
      <section className="svc-section-wrap">
        {/* BG sketch elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-6 right-8 opacity-15 animate-[svcBob_7s_ease-in-out_infinite]" style={{ animation: "svcBob 7s ease-in-out infinite", opacity: 0.15, top: 24, right: 32 }}>
            <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
              <rect x="8" y="8" width="94" height="94" rx="14" stroke="#6c47ff" strokeWidth="1.5" strokeDasharray="7 4" fill="none"/>
              <rect x="28" y="28" width="54" height="54" rx="8"  stroke="#6c47ff" strokeWidth="1"   strokeDasharray="5 5" fill="none" opacity="0.6"/>
            </svg>
          </div>
          <div className="absolute bottom-8 left-6 opacity-15 animate-[svcBobSlow_9s_ease-in-out_infinite]" style={{ animation: "svcBobSlow 9s ease-in-out infinite", opacity: 0.15, bottom: 32, left: 24 }}>
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="45" r="38" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="svc-section-inner">
          {/* heading */}
          <div data-reveal="up" style={{ textAlign: "center", marginBottom: "30px" }}>
            <p style={{ color: "#6c47ff", fontSize: "0.75rem", fontWeight: "bold", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>What we offer</p>
            <h2 style={{ fontSize: "2.8rem", fontWeight: "800", color: "#111827", margin: 0, lineHeight: 1.2 }}>
              Choose the right{" "}
              <span className="sketch-underline text-violet-600">
                solution for you
                <svg viewBox="0 0 360 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 Q90 2 180 10 Q270 17 358 5" stroke="#6c47ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="svc-grid-3">
            {[
              {
                href:"/service/service-one",
                num:"01", numBg:"#7c3aed", imgBg:"#f5f3ff",
                img:"/service-1-assets/690acfecf91d77770201a6cb_taskopia-service-one-hero-1.webp",
                tag:"Automation", tagBg:"#f5f3ff", tagBorder:"#ddd6fe", tagColor:"#7c3aed",
                title:"Task Solutions & Automation",
                desc:"Smarter services to streamline projects from start — every task is organized, every deadline is clear.",
                feats:["Centralized task hub","Smart deadlines","Workflow automation"],
                featBg:"#f8fafc", featBorder:"#e2e8f0", featColor:"#475569", dotBg:"#7c3aed",
                ctaColor:"#7c3aed", reveal:"up", delay:0,
                imgSketch: <path d="M4 40 L4 4 L40 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>,
              },
              {
                href:"/service/service-two",
                num:"02", numBg:"#059669", imgBg:"#ecfdf5",
                img:"/service-1-assets/6916b40c8e7ba2243876a27f_taskopiya-service-one-hero.avif",
                tag:"Productivity", tagBg:"#ecfdf5", tagBorder:"#a7f3d0", tagColor:"#047857",
                title:"Task Management & Collaboration",
                desc:"Define goals, assign and organize work, track progress in real-time, and deliver results on schedule.",
                feats:["Goal tracking","Team collaboration","Real-time updates"],
                featBg:"#ecfdf5", featBorder:"#d1fae5", featColor:"#047857", dotBg:"#059669",
                ctaColor:"#047857", reveal:"up", delay:120,
                imgSketch: <circle cx="22" cy="22" r="18" stroke="#fff" strokeWidth="2" strokeDasharray="5 3" fill="none"/>,
              },
              {
                href:"/service/service-three",
                num:"03", numBg:"#f59e0b", imgBg:"#fffbeb",
                img:"/service-1-assets/690af46ec3c652eb36481b92_taskopia-service-two-speclality-1.webp",
                tag:"Insights", tagBg:"#fffbeb", tagBorder:"#fde68a", tagColor:"#b45309",
                title:"Performance Analytics & Insights",
                desc:"Get deep insights into team performance, project health, and productivity trends with powerful dashboards.",
                feats:["Live dashboards","Productivity trends","Actionable insights"],
                featBg:"#fffbeb", featBorder:"#fef3c7", featColor:"#b45309", dotBg:"#f59e0b",
                ctaColor:"#d97706", reveal:"up", delay:240,
                imgSketch: <polyline points="2,36 12,20 22,28 34,10 44,20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
              },
            ].map((s)=>(
              <div key={s.href} data-reveal={s.reveal} data-delay={String(s.delay)}>
                <Link href={s.href} className="svc-card group">

                  {/* Number badge */}
                  <div style={{ position:"absolute", zIndex:10, margin:"16px", width:"36px", height:"36px", borderRadius:"50%", background:s.numBg, color:"#fff", fontSize:"12px", fontWeight:"900", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(0,0,0,0.15)" }}>
                    {s.num}
                  </div>

                  {/* Image */}
                  <div className="svc-card-img-wrap" style={{ background: s.imgBg }}>
                    <img src={s.img} alt={s.title} loading="lazy" />
                    <div style={{ position:"absolute", bottom:"12px", right:"12px", opacity:0.6 }}>
                      <svg width="46" height="46" viewBox="0 0 46 46" fill="none">{s.imgSketch}</svg>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="svc-card-body">
                    <span style={{ display:"inline-block", padding:"4px 12px", borderRadius:"99px", fontSize:"10px", fontWeight:"bold", letterSpacing:"0.1em", textTransform:"uppercase", width:"fit-content", background:s.tagBg, border:`1px solid ${s.tagBorder}`, color:s.tagColor }}>
                      {s.tag}
                    </span>
                    <h3 className="svc-card-title group-hover:text-violet-600" style={{ color: "#111827" }}>
                      {s.title}
                    </h3>
                    <p className="svc-card-desc">{s.desc}</p>
                    
                    <div className="svc-card-feats">
                      {s.feats.map(f=>(
                        <span key={f} style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"4px 10px", borderRadius:"8px", fontSize:"11px", fontWeight:"600", background:s.featBg, border:`1px solid ${s.featBorder}`, color:s.featColor }}>
                          <span style={{ width:"6px", height:"6px", borderRadius:"50%", display:"inline-block", background:s.dotBg }}/>
                          {f}
                        </span>
                      ))}
                    </div>
                    
                    <div className="svc-card-cta" style={{ color: s.ctaColor }}>
                      Explore service
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 border-t border-slate-100 py-24 overflow-hidden">
        {/* BG sketches */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-8 right-14 opacity-15 animate-[svcBobSlow_8s_ease-in-out_infinite]">
            <svg width="130" height="90" viewBox="0 0 130 90" fill="none">
              <path d="M5 80 Q35 10 65 45 Q95 80 125 15" stroke="#6c47ff" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <div className="absolute bottom-10 left-14 opacity-15 animate-[svcSpin_20s_linear_infinite]">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
              <polygon points="35,5 67,60 3,60" stroke="#f59e0b" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <div className="absolute top-1/2 left-4 opacity-20 animate-[svcPulse_3.5s_ease-in-out_infinite]">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="18" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div data-reveal="up" className="text-center mb-14">
            <p className="text-violet-600 text-xs font-bold tracking-widest uppercase mb-3">Why choose us</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Simplify workflows,{" "}
              <span className="text-violet-600">manage tasks effectively</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { img:"/service-1-assets/6916ed30eddd8192431b095e_specialiti-icon-1 (1).svg", title:"Centralized task organization", desc:"Keep all tasks, projects, and deadlines in one place for easy tracking and full team visibility.", delay:0 },
              { img:"/service-1-assets/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg", title:"Seamless team collaboration",  desc:"Work together across teams with live updates, shared workspaces, and instant notifications.", delay:120 },
              { img:"/service-1-assets/6916ed30dcc91e4de385f200_specialiti-icon-3 (1).svg", title:"Smart automation & reminders", desc:"Automate repetitive tasks and let your team focus on what matters — delivering results.", delay:240 },
              { img:"/service3-assets/6916f00db3051e5aed09bd3f_Group 2085663576.svg",        title:"Advanced analytics dashboard", desc:"Deep insights into team performance and productivity trends with powerful visual dashboards.", delay:360 },
            ].map((f,i)=>(
              <div key={i} data-reveal="scale" data-delay={String(f.delay)}
                className="group relative flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 transition-all duration-300 overflow-hidden">
                {/* corner sketch */}
                <div className="absolute bottom-2 right-2 opacity-[0.08] group-hover:opacity-[0.2] group-hover:scale-110 group-hover:rotate-12 transition-all duration-400">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="17" stroke="#6c47ff" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
                  </svg>
                </div>
                <div className="w-12 h-12 shrink-0 rounded-xl bg-violet-50 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                  <img src={f.img} alt={f.title} className="w-6 h-6 object-contain"/>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1.5">{f.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed m-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section className="bg-white py-6 pb-24 px-6">
        <div data-reveal="scale"
          className="relative max-w-3xl mx-auto rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-20 text-center overflow-hidden">
          {/* animated sketch decorations inside CTA */}
          <div className="absolute top-4 left-4 opacity-20 animate-[svcBob_6s_ease-in-out_infinite]">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path d="M2 54 L2 2 L54 2" stroke="#6c47ff" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="2" cy="2" r="3" fill="#6c47ff"/>
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 opacity-20 animate-[svcBobSlow_7s_ease-in-out_infinite] rotate-180">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path d="M2 54 L2 2 L54 2" stroke="#6c47ff" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="2" cy="2" r="3" fill="#6c47ff"/>
            </svg>
          </div>
          <div className="absolute top-5 right-5 opacity-25 animate-[svcSpin_9s_linear_infinite]">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M15 1 L17.3 12.7 L29 15 L17.3 17.3 L15 29 L12.7 17.3 L1 15 L12.7 12.7 Z"
                stroke="#f59e0b" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <div className="absolute bottom-6 left-16 opacity-20 animate-[svcWobble_5s_ease-in-out_infinite]">
            <svg width="80" height="28" viewBox="0 0 80 28" fill="none">
              <path d="M2 14 Q20 2 38 14 Q56 26 74 14" stroke="#6c47ff" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          <div className="relative z-10">
            <p className="text-violet-600 text-xs font-bold tracking-widest uppercase mb-4">Trusted by 200+ leaders</p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-snug">
              Not sure which service{" "}
              <span className="text-violet-600">fits your needs?</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-10">
              Our team is here to help you find the perfect solution for your business size, goals, and workflow.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="rt-button-body w-inline-block">
                <div className="rt-button-text">Talk to our team</div>
                <div className="rt-button-body-overlay"/>
              </Link>
              <Link href="/about" data-wf--rt-border-button--variant="base" className="rt-button-body rt-nav-btn w-inline-block">
                <div className="rt-button-text rt-btn-color-nav">Read our story</div>
                <div className="rt-button-body-overlay rt-nav-overlay"/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
