import React from 'react';
import Link from "next/link";

const A = '/about-assets';

export default function OurGoal() {
  return (
    <>
        {/* ── OUR GOAL ── */}
        <section className="rt-our-goal">
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-our-goal-main rt-position-relative rt-overflow-hidden">
              <div className="rt-our-goal-inner">
                <div className="rt-our-goal-inner-wrap">
                  <div className="rt-our-goal-left">
                    <div className="rt-sub-gap">
                      <div data-w-id="10e068ac-9f62-8197-67e4-96584fae3d03" className="rt-sub-text rt-sub-gredient">our goal</div>
                    </div>
                    <div className="rt-heading-para-gap">
                      <h2 data-w-id="10e068ac-9f62-8197-67e4-96584fae3d06" className="rt-gap-off">
                        Connecting tasks to outcomes that fuel growth
                      </h2>
                    </div>
                    <div data-w-id="10e068ac-9f62-8197-67e4-96584fae3d08" className="rt-analytics-v2-para-wrap rt-gap-large">
                      <p className="rt-gap-off">Connecting tasks to outcomes that fuel growth by aligning team efforts with clear goals, ensuring every project contributes to long-term success.</p>
                    </div>

                    <div className="w-layout-grid rt-our-goal-left-inner-wrapper">
                      {[
                        { wid: '10e068ac-9f62-8197-67e4-96584fae3d0c', icon: `${A}/6916ec6339f890a80905a69b_Vector (33).svg`, title: 'Enhance team productivity', desc: 'Help teams stay focused, reduce delays, and complete tasks faster with smoother workflows.' },
                        { wid: '10e068ac-9f62-8197-67e4-96584fae3d14', icon: `${A}/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg`, title: 'Ensure project transparency', desc: 'Give clear updates, improve visibility, and keep everyone aligned throughout projects.' },
                      ].map(({ wid, icon, title, desc }) => (
                        <div key={wid} data-w-id={wid} className="w-layout-vflex rt-our-goal-left-inner">
                          <div className="rt-icon-no rt-small">
                            <img width={45} height={45} alt="" src={icon} loading="lazy" />
                          </div>
                          <div className="w-layout-vflex rt-analytics-v2-text-wrap">
                            <div className="rt-text-style-h6">{title}</div>
                            <p className="rt-gap-off">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div data-w-id="10e068ac-9f62-8197-67e4-96584fae3d1c" className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                      <Link href="/contact" className="rt-button-body w-inline-block">
                        <div className="rt-button-text">Start free trial</div>
                        <div className="rt-button-body-overlay"></div>
                      </Link>
                    </div>
                  </div>

                  <div className="rt-our-goal-right rt-position-relative">
                    <div className="rt-our-goal-right-image-wrap">
                      <img width={424} height={519} alt="goal-1" src={`${A}/690c6ad1d102d19b352ee0d0_Taskopia-about-goal-1.webp`} loading="lazy" />
                    </div>
                    <div data-w-id="9c1d7b40-2e15-4a4c-54e5-f1fd08a7e199" className="rt-our-goal-overlay"></div>
                    <div data-w-id="9c1d7b40-2e15-4a4c-54e5-f1fd08a7e19a" className="rt-our-goal-absolute-image rt-mobile-l-display-none">
                      <img alt="goal-2" src={`${A}/690c6ad1caeaf4cf1d1053ae_Taskopia-about-goal-2.webp`} loading="lazy" />
                    </div>
                    <div data-w-id="9c1d7b40-2e15-4a4c-54e5-f1fd08a7e19c" className="rt-our-goal-absolute-line rt-mobile-l-display-none">
                      <img width={68} height={198} alt="" src={`${A}/690c6739a599070d1f107184_kloudera-service-three-faq-line.svg`} loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rt-tools-icon-overlay rt-two">
                <img src={`${A}/690c617ce241b4a9015d2d58_Vector 1533.webp`} loading="lazy" alt="" />
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
