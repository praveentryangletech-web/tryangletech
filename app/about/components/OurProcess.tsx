import React from 'react';

import Image from "next/image";

const A = '/about-assets';

export default function OurProcess() {
  return (
    <>
        <section className="" style={{ position: 'relative'}}>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap">
              <div data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdeb" className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">our process</div>
              </div>
              <h2 data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdee" className="rt-gap-off rt-desktop-text-center">
                Deliver projects on time through <span className="rt-color-periwinkle-gray">streamlined execution</span>
              </h2>
            </div>

            <div className="rt-process-main rt-position-relative">
              {/* Step tabs */}
              <div className="rt-process-wrapper">
                {[
                  { wid1: 'baf8e5e7-49ac-4f7f-ad09-58deaac1a659', wid2: '55254470-bac2-0dd8-dd5a-5cfe717a3c25', label: 'Discover', cls: 'one' },
                  { wid1: 'e48fada5-0185-92fe-c33e-d6a7c98377b3', wid2: 'e48fada5-0185-92fe-c33e-d6a7c98377b6', label: 'Design & Develop', cls: 'two' },
                  { wid1: '0d8e4976-b51c-d283-cc1a-5a60ed5dc1f7', wid2: '0d8e4976-b51c-d283-cc1a-5a60ed5dc1fa', label: 'Launch & Support', cls: 'three' },
                ].map(({ wid1, wid2, label, cls }) => (
                  <div key={cls} className="rt-process-item">
                    <div data-w-id={wid1} className="rt-process-text"><div>{label}</div></div>
                    <div data-w-id={wid2} className="rt-process-item-line-main">
                      <div className={`rt-process-item-line ${cls}`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Process detail boxes */}
              <div className="rt-process-item-overlay rt-overflow-hidden">
                <div data-w-id="fe26f0d6-37c8-3685-a177-c8bb05fdb9ca" className="rt-process-box rt-1">
                  <div className="rt-icon-no">
                    <Image src={`${A}/690c7b256a26b771ea0562fb_Vector (27).svg`} loading="lazy" alt=""  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-process-text-gap">
                    <div className="rt-text-style-h6 rt-text-color-white">Requirement gathering</div>
                    <p className="rt-gap-off rt-text-color-white">We understand your business goals, target audience, and project scope to build the right solution.</p>
                  </div>
                </div>

                <div data-w-id="9a59051b-7eac-c0f0-0d70-0d14e85112ac" className="rt-process-box rt-2">
                  <div className="rt-icon-no">
                    <Image src={`${A}/690c7b2508ab483ef4047387_Vector (28).svg`} loading="lazy" alt=""  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-process-text-gap">
                    <div className="rt-text-style-h6">Design & development</div>
                    <p className="rt-gap-off">Our team crafts stunning designs and builds robust, scalable solutions tailored to your needs.</p>
                  </div>
                </div>

                <div data-w-id="6b5c6d36-e516-7ca4-cea7-722942bbc918" className="rt-process-box rt-3">
                  <div className="rt-icon-no">
                    <Image src={`${A}/6914525ddeeb169b19ad1aa4_Vector (29).svg`} loading="lazy" alt=""  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-process-text-gap">
                    <div className="rt-text-style-h6">Launch & support</div>
                    <p className="rt-gap-off">We deploy your project, ensure everything runs smoothly, and provide ongoing support after launch.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
