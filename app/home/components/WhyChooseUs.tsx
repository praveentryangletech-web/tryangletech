"use client";
import React from 'react';
import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

import { HomeWhyChooseUsSection } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

interface WhyChooseUsProps {
  whyChooseUs?: HomeWhyChooseUsSection;
}

export default function WhyChooseUs({ whyChooseUs: whyChooseUsProp }: WhyChooseUsProps) {
  const whyChooseUs = whyChooseUsProp || DEFAULT_HOME_CONTENT.whyChooseUs;
  const items = whyChooseUs.items && whyChooseUs.items.length >= 4 ? whyChooseUs.items : DEFAULT_HOME_CONTENT.whyChooseUs.items;
  const item1 = items[0] || DEFAULT_HOME_CONTENT.whyChooseUs.items[0];
  const item2 = items[1] || DEFAULT_HOME_CONTENT.whyChooseUs.items[1];
  const item3 = items[2] || DEFAULT_HOME_CONTENT.whyChooseUs.items[2];
  const item4 = items[3] || DEFAULT_HOME_CONTENT.whyChooseUs.items[3];

  return (
    <section className="rt-why-choose-v1">
      <div
        className="w-layout-blockcontainer rt-container-extra-large w-container">
        <div className="rt-why-choose-v1-wrapper" style={{ boxShadow: "none", border: "none" }}>
          <div className="rt-why-choose-v1-content">
            <div className="rt-testimonials-v1-top rt-heading-bottom-gap">
              <div
                data-w-id="657bd2a2-86bd-d868-77e3-fda88540fe8e"
                style={{ "opacity": "0" }}
                className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">{whyChooseUs.subtitle || 'WHY CHOOSE US'}</div>
              </div>
              <div
                data-w-id="07416d34-f69b-c50c-b2bc-d9952d15faca"
                style={{ "opacity": "0" }}>
                <h2 className="rt-gap-off">
                  {whyChooseUs.heading}{' '}
                  <span className="rt-color-periwinkle-gray"
                  >{whyChooseUs.headingHighlight || 'chose us'}</span
                  >
                </h2>
              </div>
            </div>
            <div className="rt-why-choose-v1-main rt-overflow-hidden">
              <div className="rt-why-choose-v1-left">
                <div
                  data-w-id="cac76f96-8396-311e-6048-5de6986cd688"
                  className="rt-why-choose-v1-left-item"
                  style={{ "opacity": "0" }}>
                  <div className="rt-why-choose-v1-icon">
                    <Image
                      src={item1.icon || "/Taskopia_files/6916ef876682eed2b2fd5911_Vector (34).svg"}
                      loading="lazy"
                      width={19}
                      height={100}
                      alt=""
                      className="rt-why-choose-icon" />
                  </div>
                  <div className="rt-text-style-h6 rt-small-heading-para-gap">
                    {item1.title}
                  </div>
                  <p className="rt-gap-off">
                    {item1.description}
                  </p>
                </div>
                <div
                  data-w-id="d1090583-b79b-0169-8445-2f4f2a34b09c"
                  className="rt-about-v1-right-line rt-why-choose-v1-line"
                  style={{ "width": "0%" }}></div>
                <div
                  data-w-id="f3ef8d6b-3999-964f-e18a-fb715340ebb2"
                  className="rt-why-choose-v1-left-item"
                  style={{ "opacity": "0" }}>
                  <div className="rt-why-choose-v1-icon">
                    <Image
                      src="/Taskopia_files/6916f00db3051e5aed09bd3f_Group 2085663576.svg"
                      loading="lazy"
                      width={100}
                      height={100}
                      alt=""
                      className="rt-why-choose-icon" />
                  </div>
                  <div className="rt-text-style-h6 rt-small-heading-para-gap">
                    We deliver on time
                  </div>
                  <p className="rt-gap-off">
                    When we quote a timeline, we stick to it - 2 to 4 weeks for a website, 4 to 8 for custom software. You'll get regular updates along the way.
                  </p>
                </div>
              </div>
              <div
                data-w-id="9ec697c3-d7e6-12f5-7ab9-a71d0a578b6a"
                style={{ "opacity": "0" }}
                className="rt-why-choose-v1-center">
                <Image
                  src="/Taskopia_files/691ecfdec4425f741cb80fc8_tasopiya-home-one-hande.webp"
                  loading="lazy"
                  alt="" width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-why-choose-v1-left">
                <div
                  data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf7c"
                  className="rt-why-choose-v1-left-item"
                  style={{ "opacity": "0" }}>
                  <div className="rt-why-choose-v1-icon">
                    <Image
                      src="/Taskopia_files/6916ec635353353be914aafc_Vector (32).svg"
                      loading="lazy"
                      width={19}
                      height={100}
                      alt=""
                      className="rt-why-choose-icon" />
                  </div>
                  <div className="rt-text-style-h6 rt-small-heading-para-gap">
                    Everything under one roof
                  </div>
                  <p className="rt-gap-off">
                    Web development, mobile apps, custom software, marketing, and design - all from one team in Ahmedabad. No juggling five vendors for one project.
                  </p>
                </div>
                <div
                  data-w-id="0637a1b1-677c-853f-04eb-0a234d569018"
                  className="rt-about-v1-right-line rt-why-choose-v1-line"
                  style={{ "width": "0%" }}></div>
                <div
                  data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf84"
                  className="rt-why-choose-v1-left-item"
                  style={{ "opacity": "0" }}>
                  <div className="rt-why-choose-v1-icon">
                    <Image
                      src="/Taskopia_files/6916ec6339f890a80905a69b_Vector (33).svg"
                      loading="lazy"
                      width={100}
                      height={100}
                      alt=""
                      className="rt-why-choose-icon" />
                  </div>
                  <div className="rt-text-style-h6 rt-small-heading-para-gap">
                    Easy to work with
                  </div>
                  <p className="rt-gap-off">
                    You share feedback, we make the changes - simple as that. No complicated tools, no waiting days for a reply. Just one point of contact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
