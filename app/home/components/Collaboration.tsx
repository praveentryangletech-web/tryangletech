"use client";
import React from 'react';
import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

import { HomeHowWeWorkSection } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

interface CollaborationProps {
  howWeWork?: HomeHowWeWorkSection;
}

export default function Collaboration({ howWeWork: howWeWorkProp }: CollaborationProps) {
  const howWeWork = howWeWorkProp || DEFAULT_HOME_CONTENT.howWeWork;
  const items = howWeWork.items && howWeWork.items.length >= 2 ? howWeWork.items : DEFAULT_HOME_CONTENT.howWeWork.items;
  const item1 = items[0] || DEFAULT_HOME_CONTENT.howWeWork.items[0];
  const item2 = items[1] || DEFAULT_HOME_CONTENT.howWeWork.items[1];

  return (
        <section className="rt-collaboration-v1 rt-overflow-hidden">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-collaboration-v1-main">
              <div className="rt-collaboration-left">
                <div className="rt-sub-gap">
                  <div
                    data-w-id="f68a08f7-0700-c3c7-7ea2-119bf4408740"
                    style={{ "opacity": "0" }}
                    className="rt-sub-text rt-sub-gredient">
                    {howWeWork.subtitle || 'How We Work'}
                  </div>
                </div>
                <div className="rt-heading-para-gap">
                  <h2
                    data-w-id="fa389f03-d668-fc21-92b7-625895f0f1cd"
                    style={{ "opacity": "0" }}
                    className="rt-gap-off">
                    {howWeWork.heading}{' '}
                    <span className="rt-color-periwinkle-gray">{howWeWork.headingHighlight || 'to finish'}</span>
                  </h2>
                </div>
                <p
                  data-w-id="01cd9f60-c08f-a44e-7306-8a24c776e67e"
                  style={{ "opacity": "0" }}
                  className="rt-gap-off">
                  {howWeWork.description}
                </p>
                <div className="rt-collaboration-left-inner">
                  <div
                    data-w-id="756057e3-d2c7-74cf-9fc4-d890fe38f192"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-left-item">
                    <div className="rt-collaboration-left-icon">
                      <Image
                        src={item1.icon || "/Taskopia_files/6916ed30eddd8192431b095e_specialiti-icon-1 (1).svg"}
                        loading="lazy"
                        alt=""  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        {item1.title}
                      </div>
                      <p className="rt-gap-off">
                        {item1.description}
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="e928092d-3b4d-c194-2dee-623c2c3a4898"
                    className="rt-about-v1-right-line rt-why-choose-v1-line"
                    style={{ "width": "0%" }}></div>
                  <div
                    data-w-id="7bbb7d70-219f-6add-8d17-19c31521a7bc"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-left-item">
                    <div className="rt-collaboration-left-icon">
                      <Image
                        src={item2.icon || "/Taskopia_files/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg"}
                        loading="lazy"
                        alt=""  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        {item2.title}
                      </div>
                      <p>
                        {item2.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                  <a
                    data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                    href="contact"
                    className="rt-button-body w-inline-block"
                  ><div className="rt-button-text">Talk to us today</div>
                    <div
                      className="rt-button-body-overlay"
                      style={{ "transform": "translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div
                    ></a>
                </div>
              </div>
              <div className="rt-collaboration-v1-right">
                <div className="rt-collaboration-v1-right-top">
                  <div
                    data-w-id="ae8cc4e1-ef96-bdcf-a4f1-2f55a386306b"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-v1-right-one">
                    <Image
                      src={howWeWork.image1 || "/Taskopia_files/68f21b4dc6a06a6abe39c79b_taskopia-Collaboration-one.webp"}
                      loading="lazy"
                      alt="Collaboration Feature 1"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div
                    data-w-id="6e37c1de-f32a-f8b2-a948-1302911adaed"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-v1-right-two">
                    <Image
                      src={howWeWork.image2 || "/Taskopia_files/68f21b3af8e5e0af23ce678d_taskopia-Collaboration-two.webp"}
                      loading="lazy"
                      alt="Collaboration Feature 2"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div
                  data-w-id="5f4e3a0f-8628-ed34-e438-68eb6dc94db3"
                  style={{ "opacity": "0" }}
                  className="rt-collaboration-v1-right-bottom">
                  <Image
                    src={howWeWork.image3 || "/Taskopia_files/68f21b3a3b734d2430609672_taskopia-Collaboration-three.webp"}
                    loading="lazy"
                    width={466}
                    height={800}
                    alt="Collaboration Overview"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="rt-collaboration-v1-right-bg"></div>
              </div>
            </div>
          </div>
        </section>
  );
}
