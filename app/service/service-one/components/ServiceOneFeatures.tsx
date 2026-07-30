'use client';

import React, { useState } from 'react';

import Image from "next/image";

const SA = '/service3-assets';

const features = [
  {
    icon: `${SA}/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg`,
    title: "Smart task planning",
    desc: "Organize work with precision, assign tasks to the right people, and keep everyone on track with intelligent planning tools.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a14",
  },
  {
    icon: `${SA}/6916ec6339f890a80905a69b_Vector (33).svg`,
    title: "Real-time collaboration",
    desc: "Work together seamlessly across teams with live updates, shared workspaces, and instant notifications.",
    wId: "31f55def-c002-725b-ac24-4fb3c902009b",
  },
  {
    icon: `${SA}/6916ef876682eed2b2fd5911_Vector (34).svg`,
    title: "Workflow automation",
    desc: "Automate repetitive tasks, set triggers, and let your team focus on what matters most — delivering results.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a1a",
  },
  {
    icon: `${SA}/6916f00db3051e5aed09bd3f_Group 2085663576.svg`,
    title: "Advanced analytics",
    desc: "Get deep insights into team performance, project health, and productivity trends with powerful dashboards.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a20",
  },
];

export default function ServiceOneFeatures() {
  return (
    <>
      <section className="rt-speciality rt-overflow-hidden">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-speciality-heading rt-heading-bottom-gap">
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">integration</div>
              </div>
              <div
                data-w-id="a60e50fe-a27d-8fb6-5747-bbbaa935d16d"
                className="rt-position-relative">
                <h2 className="rt-gap-off rt-desktop-text-center">
                  Simplify workflows, collaborate seamlessly, and manage tasks
                  effectively for better business growth
                </h2>
                <div className="rt-position-absolute rt-text-overlay">
                  <div className="rt-position-relative rt-text-wrap-overlay one rt-overflow-hidden">
                    <div className="rt-position-absolute rt-text-overlay-inner one"></div>
                  </div>
                  <div className="rt-position-relative rt-text-wrap-overlay two rt-overflow-hidden">
                    <div className="rt-position-absolute rt-text-overlay-inner two"></div>
                  </div>
                  <div className="rt-position-relative rt-text-wrap-overlay three rt-overflow-hidden">
                    <div className="rt-position-absolute rt-text-overlay-inner three"></div>
                  </div>
                  <div className="rt-position-relative rt-text-wrap-overlay four rt-overflow-hidden">
                    <div className="rt-position-absolute rt-text-overlay-inner four"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rt-speciality-wrapper">
              <div
                data-w-id="b178d7ba-8043-dad3-0eb9-4ce1a16ab050"
                className="rt-speciality-item rt-border-radius-medium rt-shadow">
                <div className="rt-speciality-item-top">
                  <div className="rt-benefits-icon">
                    <Image
                      src="/service-1-assets/6916ed30eddd8192431b095e_specialiti-icon-1 (1).svg"
                      loading="lazy"
                      alt=""
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-text-style-h6">
                    Centralized task organization
                  </div>
                  <p className="rt-gap-off">
                    Keep all tasks, projects, and deadlines in one place for
                    easy tracking and visibility.
                  </p>
                </div>
                <div className="rt-speciality-item-bottom rt-1">
                  <div data-w-id="550ba491-626c-ae49-18f3-0ae2fea45116">
                    <Image
                      src="/service-1-assets/690af46ec3c652eb36481b92_taskopia-service-two-speclality-1.webp"
                      loading="lazy"
                      alt="taskopia-service-two-speclality-1"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div
                    data-w-id="f3df5baa-fd06-6053-f4e2-08d3035925e3"
                    className="rt-speciality-item-bottom-1">
                    <Image
                      src="/service-1-assets/6916ee81d584787f4358140a_taskopiya-service-one-seamless-2.webp"
                      loading="lazy"
                      data-w-id="6a5d4c4b-ca7f-3ed3-b5bd-bc1b1cf646b6"
                      alt="taskopiya-service-one-seamless-2"
                      className="rt-border-radius-small rt-shadow"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
              <div
                data-w-id="c1e551e6-c901-44d5-1f37-6ae62cb1db08"
                className="rt-speciality-item rt-border-radius-medium rt-shadow">
                <div className="rt-speciality-item-top">
                  <div className="rt-benefits-icon">
                    <Image
                      src="/service-1-assets/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg"
                      loading="lazy"
                      alt=""
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-text-style-h6">
                    Seamless team collaboration
                  </div>
                  <p className="rt-gap-off">
                    Keep all tasks, projects, and deadlines in one place for
                    easy tracking and visibility.
                  </p>
                </div>
                <div className="rt-speciality-item-bottom rt-2">
                  <div data-w-id="4b53e202-3d68-4e02-968b-a7142e0b1331">
                    <Image
                      src="/service-1-assets/690af46e49d21abec7c4c84e_taskopia-service-two-speclality-4.webp"
                      loading="lazy"
                      alt="taskopia-service-two-speclality-4"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-speciality-item-bottom-1 rt-change">
                    <Image
                      src="/service-1-assets/6916ee3d48e50837b4bef350_taskopiya-service-one-seamless.webp"
                      loading="lazy"
                      alt="taskopiya-service-one-seamless"
                      className="rt-border-radius-small rt-shadow"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div data-w-id="60af2a98-b52b-8db3-3b1b-8acaee57774c">
                    <Image
                      src="/service-1-assets/690af46eda7a2f8b2df0dffa_taskopia-service-two-speclality-6.webp"
                      loading="lazy"
                      alt="taskopia-service-two-speclality-6"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
              <div
                data-w-id="362c2f1b-716e-11f3-871b-c961433b7bbb"
                className="rt-speciality-item rt-border-radius-medium rt-shadow">
                <div className="rt-speciality-item-top">
                  <div className="rt-benefits-icon rt-icon-three">
                    <Image
                      src="/service-1-assets/6916ed30dcc91e4de385f200_specialiti-icon-3 (1).svg"
                      loading="lazy"
                      alt=""
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="rt-text-style-h6">
                    Smart automation &amp; reminders
                  </div>
                  <p className="rt-gap-off">
                    Keep all tasks, projects, and deadlines in one place for
                    easy tracking and visibility.
                  </p>
                </div>
                <div
                  data-w-id="0c53b07b-fe68-2f41-7085-9175bf7b851d"
                  className="rt-speciality-item-bottom rt-3">
                  <Image
                    src="/service-1-assets/690af46ec3c652eb36481b95_taskopia-service-two-speclality-7.webp"
                    loading="lazy"
                    alt="taskopia-service-two-speclality-7"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  <div
                    data-w-id="1cbba0cf-8e7f-a948-68ff-f8a53e0e87ac"
                    className="rt-speciality-item-small-img rt-up-down">
                    <Image
                      src="/service-1-assets/6916edd50bad7d0bc178eb08_Group 2085663575.png"
                      loading="lazy"
                      alt="taskopia-sarvise-v1-smart-automation"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
