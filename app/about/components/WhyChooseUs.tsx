import React from 'react';

import Image from "next/image";

const A = '/about-assets';

export default function WhyChooseUs() {
  return (
    <>
        {/* ── WHY CHOOSE US ── */}
        <section className="rt-choose-v3">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap">
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">Why choose us</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Boost productivity through organized <span className="rt-color-periwinkle-gray">task management</span>
              </h2>
            </div>

            <div data-w-id="7755f54e-a063-7fd1-4011-b0bcae52ff74" className="rt-choose-v3-wrap">
              {[
                { icon: `${A}/6916f56a114dfcf4637d80a2_Vector (36).svg`, title: 'Centralized workspace', desc: 'Manage all projects, tasks, and files in one platform for complete visibility and control.' },
                { icon: `${A}/6916f56a80d627cd0ce40bd7_690091602dd7aa7a0c1228ed_kloudera-pricing-icon.svg`, title: 'Seamless collaboration', desc: 'Enable teams to communicate, share updates, and work together in real time.' },
                { icon: `${A}/6916f56ad8ac594c1debbb97_Vector (37).svg`, title: 'Automation & integrations', desc: 'Automate repetitive tasks and connect with tools your team already uses.' },
                { icon: `${A}/6916ef876682eed2b2fd5911_Vector (34).svg`, title: 'Data-driven insights', desc: 'Get smart reports and analytics to track performance and improve efficiency.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rt-choose-v3-item">
                  <div className="rt-choose-v3-item-icon">
                    <Image src={icon} loading="lazy" alt={title}  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-choose-v3-item-line"></div>
                  <div className="rt-choose-v3-item-text-wrap">
                    <div className="rt-text-style-h6">{title}</div>
                    <p className="rt-gap-off">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
