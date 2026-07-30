'use client';

import React, { useState } from 'react';

import Image from "next/image";

const SA = '/service3-assets';

const faqs = [
  {
    q: "How does the platform help with task management?",
    a: "Our platform provides intuitive task boards, priority settings, deadline tracking, and team assignments to keep every project organized and on time.",
  },
  {
    q: "Can I use it for remote teams?",
    a: "Absolutely. The platform is built for remote and distributed teams with real-time collaboration, async updates, and shared workspaces accessible from anywhere.",
  },
  {
    q: "What integrations are available?",
    a: "We integrate with Slack, GitHub, Google Workspace, Notion, Jira, and 50+ more tools your team already uses daily.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started.",
  },
  {
    q: "How secure is my data?",
    a: "Your data is encrypted at rest and in transit. We are SOC 2 Type II certified and follow industry best practices for data security.",
  },
];

export default function ServiceOneFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
      <section className="rt-tools-icon-v1">
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-tools-icon-main rt-overflow-hidden rt-position-relative">
              <div className="rt-tools-icon-container">
                <div className="rt-tools-iconheading rt-heading-bottom-gap">
                  <div
                    data-w-id="129f78ad-f271-7836-05de-3984f045f43c"
                    className="rt-sub-gap">
                    <div className="rt-sub-text rt-sub-gredient">
                      integration
                    </div>
                  </div>
                  <h2
                    data-w-id="129f78ad-f271-7836-05de-3984f045f43f"
                    className="rt-gap-off rt-desktop-text-center">
                    Streamline workflows, save time, enhance performance
                  </h2>
                </div>
                <div
                  data-w-id="129f78ad-f271-7836-05de-3984f045f443"
                  className="w-layout-hflex rt-tools-icon-wrapper">
                  <div className="w-layout-vflex rt-tools-icon one">
                    <div className="rt-tools-icon-image">
                      <Image
                        src="/service-1-assets/690addfe1d0a8b4dac6fd942_Group 2147225566.svg"
                        loading="lazy"
                        alt="taskopia-home-two-icon-1"
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="w-layout-vflex rt-tools-icon-text">
                      <div className="rt-small-name">Clarityworks</div>
                      <div className="rt-tools-icon-text-box">
                        <div className="rt-tag">Efficiency consultant</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-layout-vflex rt-tools-icon two">
                    <div className="rt-tools-icon-image">
                      <Image
                        width={135}
                        height={135}
                        alt=""
                        src="/service-1-assets/690ae03efa396b38eb292fe4_Towers.svg"
                        loading="lazy"
                       />
                    </div>
                    <div className="w-layout-vflex rt-tools-icon-text">
                      <div className="rt-small-name">Flowbridge</div>
                      <div className="rt-tools-icon-text-box">
                        <div className="rt-tag">Scrum master</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-layout-vflex rt-tools-icon one">
                    <div className="rt-tools-icon-image">
                      <Image
                        width={112}
                        height={112}
                        alt=""
                        src="/service-1-assets/691d8bb1729b52a1f8ffd65a_icon-service-i.svg"
                        loading="lazy"
                       />
                    </div>
                    <div className="w-layout-vflex rt-tools-icon-text">
                      <div className="rt-small-name">Plansync</div>
                      <div className="rt-tools-icon-text-box">
                        <div className="rt-tag">Project coordinator</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-layout-vflex rt-tools-icon two">
                    <div className="rt-tools-icon-image">
                      <Image
                        width={115}
                        height={115}
                        alt=""
                        src="/service-1-assets/690adf8b2d64b64c03d7f792_Nira.svg"
                        loading="lazy"
                       />
                    </div>
                    <div className="w-layout-vflex rt-tools-icon-text">
                      <div className="rt-small-name">Collabtrack</div>
                      <div className="rt-tools-icon-text-box">
                        <div className="rt-tag">Team lead</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-layout-vflex rt-tools-icon one">
                    <div className="rt-tools-icon-image">
                      <Image
                        width={126}
                        height={126}
                        alt=""
                        src="/service-1-assets/691d8c2797ae7dee4fdd46cd_taskopia-integration-icon.svg"
                        loading="lazy"
                       />
                    </div>
                    <div className="w-layout-vflex rt-tools-icon-text">
                      <div className="rt-small-name">Worksphere</div>
                      <div className="rt-tools-icon-text-box">
                        <div className="rt-tag">Productivity analyst</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-layout-vflex rt-tools-icon two">
                    <div className="rt-tools-icon-image">
                      <Image
                        width={138}
                        height={138}
                        alt=""
                        src="/service-1-assets/690adf8af33dd03d1823e581_Aven.svg"
                        loading="lazy"
                       />
                    </div>
                    <div className="w-layout-vflex rt-tools-icon-text">
                      <div className="rt-small-name">Tasknest</div>
                      <div className="rt-tools-icon-text-box">
                        <div className="rt-tag">Project manager</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rt-tools-icon-overlay">
                <Image
                  src="/service-1-assets/690adbc5bfed3c0fa7e49213_Vector 1530.webp"
                  loading="lazy"
                  alt="taskopia-home-two-overlay-integration"
                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
