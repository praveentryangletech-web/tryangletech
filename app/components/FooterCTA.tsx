import React from 'react';
import Link from "next/link";

import Image from "next/image";

const A = '/about-assets';

export default function FooterCTA() {
  return (
    <>
        {/* ── CTA ── */}
        <section>
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-collaborate-card-main rt-position-relative rt-overflow-hidden">
              <div className="rt-footer-card-content rt-desktop-text-center">
                <div className="rt-sub-gap">
                  <div data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc12" className="rt-sub-text rt-text-color-white">GROW YOUR BUSINESS ONLINE</div>
                </div>
                <div className="rt-heading-para-gap">
                  <h2 data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc15" className="rt-text-color-white rt-gap-off">Build smarter, launch faster, grow your business online</h2>
                </div>
                <p data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc17" className="rt-text-color-white rt-gap-off rt-footer-card-para">Partner with Tryangletech for expert web development, digital marketing, and custom software solutions — all under one roof.</p>
                <div data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc19" className="rt-button-para-gap">
                  <Link data-wf--rt-white-button--variant="color" data-w-id="0405d357-f0f5-aac8-4042-22ceb6fb3cbf" href="/contact" className="rt-button-body rt-bg-color w-inline-block">
                    <div className="rt-button-text rt-btn-color" style={{ color: '#1a0b54' }}>&nbsp;Get started today</div>
                    <div className="rt-button-body-overlay rt-color-blue w-variant-172fb5df-db24-987d-98c7-3d35693edb61 rt-color-change"></div>
                  </Link>
                </div>
              </div>
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes spinForward { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes spinBackward { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
                
                .animate-ring-1 { animation: spinForward 40s linear infinite; }
                .animate-icon-1 { animation: spinBackward 40s linear infinite; }
                
                .animate-ring-2 { animation: spinBackward 50s linear infinite; }
                .animate-icon-2 { animation: spinForward 50s linear infinite; }
                
                .animate-ring-3 { animation: spinForward 60s linear infinite; }
                .animate-icon-3 { animation: spinBackward 60s linear infinite; }
              `}} />
              {[1, 2, 3].map((lineNum) => (
                <div key={lineNum} className={`rt-collaborate-card-line-${lineNum} animate-ring-${lineNum} rt-tab-display-none`}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={`line${lineNum}-${i}`} className={`rt-collaborate-icon rt-${i} animate-icon-${lineNum}`}>
                      <div><Image src="/favicon.png" loading="lazy" alt="Tryangle Tech Logo" width={800} height={800} style={{ width: "100%", height: "auto" }} /></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
