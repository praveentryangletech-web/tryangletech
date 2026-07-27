import React from 'react';

const A = '/about-assets';

export default function OurProcess() {
  return (
    <>
        <section className="rt-process" style={{ paddingBottom: '14rem', position: 'relative' }}>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap">
              <div data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdeb" className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">our process</div>
              </div>
              <h2 data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdee" className="rt-gap-off rt-desktop-text-center">
                Boost team productivity through <span className="rt-color-periwinkle-gray">streamlined workflows</span>
              </h2>
            </div>

            <div className="rt-process-main rt-position-relative">
              {/* Step tabs */}
              <div className="rt-process-wrapper">
                {[
                  { wid1: 'baf8e5e7-49ac-4f7f-ad09-58deaac1a659', wid2: '55254470-bac2-0dd8-dd5a-5cfe717a3c25', label: 'Plan assign', cls: 'one' },
                  { wid1: 'e48fada5-0185-92fe-c33e-d6a7c98377b3', wid2: 'e48fada5-0185-92fe-c33e-d6a7c98377b6', label: 'Workflows', cls: 'two' },
                  { wid1: '0d8e4976-b51c-d283-cc1a-5a60ed5dc1f7', wid2: '0d8e4976-b51c-d283-cc1a-5a60ed5dc1fa', label: 'Seamless tracking', cls: 'three' },
                  { wid1: 'b4ca4a0e-d949-d77f-5378-a8300d077e81', wid2: 'b4ca4a0e-d949-d77f-5378-a8300d077e84', label: 'Execute', cls: 'four' },
                  { wid1: 'e54f59c9-a53c-e843-6644-89e2987b9f51', wid2: 'e54f59c9-a53c-e843-6644-89e2987b9f54', label: 'Analyze', cls: 'five' },
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
                    <img src={`${A}/690c7b256a26b771ea0562fb_Vector (27).svg`} loading="lazy" alt="" />
                  </div>
                  <div className="rt-process-text-gap">
                    <div className="rt-text-style-h6 rt-text-color-white">Task setup</div>
                    <p className="rt-gap-off rt-text-color-white">Create and assign tasks with clear deadlines to ensure smooth project initiation.</p>
                  </div>
                </div>

                <div data-w-id="9a59051b-7eac-c0f0-0d70-0d14e85112ac" className="rt-process-box rt-2">
                  <div className="rt-icon-no">
                    <img src={`${A}/690c7b2508ab483ef4047387_Vector (28).svg`} loading="lazy" alt="" />
                  </div>
                  <div className="rt-process-text-gap">
                    <div className="rt-text-style-h6">Progress tracking</div>
                    <p className="rt-gap-off">Monitor task status and analyze team performance with real-time updates.</p>
                  </div>
                </div>

                <div data-w-id="6b5c6d36-e516-7ca4-cea7-722942bbc918" className="rt-process-box rt-3">
                  <div className="rt-icon-no">
                    <img src={`${A}/6914525ddeeb169b19ad1aa4_Vector (29).svg`} loading="lazy" alt="" />
                  </div>
                  <div className="rt-process-text-gap">
                    <div className="rt-text-style-h6">Report &amp; share</div>
                    <p className="rt-gap-off">Export project reports tailored for stakeholders to keep everyone aligned.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
