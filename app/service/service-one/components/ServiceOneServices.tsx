'use client';
import Link from "next/link";

import React, { useState } from 'react';

const SA = '/service3-assets';

export default function ServiceOneServices() {
  return (
    <>
      <section className="rt-why-choose-v2 rt-position-relative">
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-why-choose-v2-contanner">
              <div className="rt-why-choose-v2-container">
                <div className="rt-why-choose-v2-left">
                  <div data-w-id="a157f48e-ba73-8122-adde-8033c6a3150f">
                    <img
                      src="/service-1-assets/690b2a90bfbee5f2f093be43_Group 2147225571.webp"
                      loading="lazy"
                      alt="taskopia-sarvise-v1-real-time"
                    />
                  </div>
                  <div className="rt-why-choose-v2-left-img-wrap">
                    <div
                      data-w-id="4b26b30d-7856-b7b9-e78d-9d12b65b48f7"
                      className="rt-why-choose-v2-left-img-one">
                      <img
                        src="/service-1-assets/690b2a4b5a7c4a8e93179bfa_taskopia-service-one-choose-two.webp"
                        loading="lazy"
                        alt="taskopia-service-one-choose-two"
                      />
                    </div>
                    <div
                      data-w-id="d54bbf07-7adf-ef17-cba9-4c8591822d3c"
                      className="rt-why-choose-v2-left-img-two">
                      <img
                        src="/service-1-assets/690b2a4bb24f0436882287df_taskopia-service-one-choose-one.webp"
                        loading="lazy"
                        alt="taskopia-service-one-choose-one"
                      />
                    </div>
                  </div>
                </div>
                <div className="rt-why-choose-v2-right">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="f811abe4-4f70-55fe-7128-7a1d75f4745a"
                      className="rt-sub-text">
                      why choose us
                    </div>
                  </div>
                  <div className="rt-heading-para-gap rt-why-choose-v2-heading">
                    <h2
                      data-w-id="f811abe4-4f70-55fe-7128-7a1d75f4745c"
                      className="rt-gap-off rt-text-color-white">
                      Transform tasks into success with automation
                    </h2>
                  </div>
                  <div
                    data-w-id="f811abe4-4f70-55fe-7128-7a1d75f47460"
                    className="rt-goal-para-wrap">
                    <p className="rt-gap-off rt-color-pale-periwinkle">
                      Transform tasks into success with automation by
                      streamlining workflows, reducing errors, and ensuring
                      teams achieve goals
                    </p>
                  </div>
                  <div className="w-layout-vflex rt-goal-box-main rt-gap-medium">
                    <div
                      data-w-id="f811abe4-4f70-55fe-7128-7a1d75f47464"
                      className="w-layout-hflex rt-goal-box-wrap rt-bottom-padding">
                      <div className="rt-goal-icon">
                        <img
                          width="35"
                          height="37"
                          alt="
specialiti-icon-3
"
                          src="/service-1-assets/6916b3308963a64636496151_specialiti-icon-3.svg"
                          loading="lazy"
                          className="rt-height-auto"
                        />
                      </div>
                      <div className="w-layout-vflex rt-goal-box-text-wrap">
                        <div className="rt-text-style-h6 rt-text-color-white">
                          All-in-one platform
                        </div>
                        <p className="rt-gap-off rt-color-pale-periwinkle">
                          Manage tasks, deadlines, and team collaboration in one
                          centralized place for maximum efficiency.
                        </p>
                      </div>
                    </div>
                    <div
                      data-w-id="f811abe4-4f70-55fe-7128-7a1d75f4746c"
                      className="w-layout-hflex rt-goal-box-wrap">
                      <div className="rt-goal-icon">
                        <img
                          width="35"
                          height="37"
                          alt="specialiti-icon-1"
                          src="/service-1-assets/6916b330bfe76dda628cf5ac_specialiti-icon-1.svg"
                          loading="lazy"
                          className="rt-height-auto"
                        />
                      </div>
                      <div className="w-layout-vflex rt-goal-box-text-wrap">
                        <div className="rt-text-style-h6 rt-text-color-white">
                          Smart automation
                        </div>
                        <p className="rt-gap-off rt-color-pale-periwinkle">
                          Save time by automating repetitive tasks and receiving
                          real-time updates to stay on track.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-id="f811abe4-4f70-55fe-7128-7a1d75f47474"
                    className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                    <Link
                      data-wf--rt-white-button--variant="base"
                      data-w-id="0405d357-f0f5-aac8-4042-22ceb6fb3cbf"
                      href="/about"
                      className="rt-button-body rt-bg-color w-inline-block">
                      <div className="rt-button-text rt-btn-color">
                        Organize my tasks
                      </div>
                      <div className="rt-button-body-overlay rt-color-blue rt-color-change"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
