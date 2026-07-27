import React from 'react';

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
                  <div data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc12" className="rt-sub-text rt-text-color-white">Get Organized, Stay Ahead</div>
                </div>
                <div className="rt-heading-para-gap">
                  <h2 data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc15" className="rt-text-color-white rt-gap-off">Collaborate seamlessly, manage projects with ease</h2>
                </div>
                <p data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc17" className="rt-text-color-white rt-gap-off rt-footer-card-para">Simplify your workflow with a single platform that keeps tasks, deadlines, and teams perfectly aligned.</p>
                <div data-w-id="7e10f033-b0ef-59d7-53ae-aed6bd65fc19" className="rt-button-para-gap">
                  <a data-wf--rt-white-button--variant="color" data-w-id="0405d357-f0f5-aac8-4042-22ceb6fb3cbf" href="/contact" className="rt-button-body rt-bg-color w-inline-block">
                    <div className="rt-button-text rt-btn-color" style={{ color: '#1a0b54' }}>&nbsp;Get started today</div>
                    <div className="rt-button-body-overlay rt-color-blue w-variant-172fb5df-db24-987d-98c7-3d35693edb61 rt-color-change"></div>
                  </a>
                </div>
              </div>
              {[1, 2, 3].map((lineNum) => (
                <div key={lineNum} data-w-id={`7e10f033-b0ef-59d7-53ae-aed6bd65fc${lineNum + 26}`} className={`rt-collaborate-card-line-${lineNum} rt-tab-display-none`}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={`line${lineNum}-${i}`} className={`rt-collaborate-icon rt-${i}`}>
                      <div><img src={`${A}/690c965e97785a12d9fab6b0_Nira (1).svg`} loading="lazy" alt="" /></div>
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
