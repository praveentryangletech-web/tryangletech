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
                  {[1, 2, 3, 4].map((i) => {
                    const iconIndex = ((lineNum - 1) * 4 + i) % 7 + 1;
                    const icons = {
                      1: '/Taskopia_files/68f23486208c840a16db162e_taskopia-integration-icon-1.svg',
                      2: '/Taskopia_files/68f2348699aef274cbcbee3e_taskopia-integration-icon-2.svg',
                      3: '/Taskopia_files/68f23486c96e19be1a0fd550_taskopia-integration-icon-3.svg',
                      4: '/Taskopia_files/68f23486b959a4ffa7a97ffd_taskopia-integration-icon-4.svg',
                      5: '/Taskopia_files/68f234862949c40075dc6633_taskopia-integration-icon-5.svg',
                      6: '/Taskopia_files/68f234867a335089a7a018ec_taskopia-integration-icon-6.svg',
                      7: '/Taskopia_files/68f2348662af5d1784a5246b_taskopia-integration-icon-7.svg'
                    };
                    const src = icons[iconIndex as keyof typeof icons];
                    return (
                      <div key={`line${lineNum}-${i}`} className={`rt-collaborate-icon rt-${i} animate-icon-${lineNum}`}>
                        <div><Image src={src} loading="lazy" alt={`Integration Icon`} width={800} height={800} style={{ width: "100%", height: "auto" }} /></div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
