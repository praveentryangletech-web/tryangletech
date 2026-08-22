"use client";
import React from 'react';
import Link from 'next/link';
import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

import { HomeAboutSection } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

interface AboutProps {
  about?: HomeAboutSection;
}

export default function About({ about: aboutProp }: AboutProps) {
  const about = aboutProp || DEFAULT_HOME_CONTENT.about;
  const f1 = about.features?.[0] || DEFAULT_HOME_CONTENT.about.features[0];
  const f2 = about.features?.[1] || DEFAULT_HOME_CONTENT.about.features[1];

  return (
    <section className="rt-about-v1">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-about-v1-wrapper">
          <div
            data-w-id="7f0fa30b-3b22-eb95-178c-a03559ed5c7a"
            style={{ "opacity": "0" }}
            className="rt-about-v1-left">
            <div
              data-w-id="ff0a139f-98ea-ffdb-dd98-ba887e27c7b1"
              style={{ "opacity": "0" }}>
              <Image
                src={about.image1 || "/Taskopia_files/68ef7bedcf795a787addad8c_Group 2085663562.webp"}
                loading="lazy"
                alt=""
                className="rt-width-height-full"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div
              data-w-id="dde1b63a-3928-b16b-6972-084ad79fec04"
              style={{ "opacity": "0" }}>
              <Image
                src={about.image2 || "/Taskopia_files/68ef7bed775c847e27d93569_Group 2085663563.webp"}
                loading="lazy"
                alt="taskopia-hero-one-dashbord-daily"
                className="rt-width-height-full"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="rt-about-v1-right">
            <div
              data-w-id="4edacbd8-6b56-f889-45a6-f171ca5873b4"
              style={{ "opacity": "0" }}
              className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">{about.subtitle || 'WHO WE ARE'}</div>
            </div>
            <div className="rt-heading-para-gap">
              <h2
                data-w-id="e56a7671-e1ec-e100-8312-33edf2c12738"
                style={{ "opacity": "0" }}
                className="rt-gap-off">
                {about.heading}{' '}
                <span className="rt-color-periwinkle-gray">{about.headingHighlight || 'your business'}</span>
              </h2>
            </div>
            <p
              data-w-id="9409f12c-9c7e-cee4-4344-eb53953739fe"
              style={{ "opacity": "0" }}
              className="rt-gap-off">
              {about.description}
            </p>
            <div className="rt-about-v1-right-inner">
              <div
                data-w-id="bb09800e-4a4e-6e34-85a6-12c87a12f13f"
                style={{ "opacity": "0" }}
                className="rt-about-v1-right-item">
                <div className="rt-about-v1-right-item-icon">
                  <Image
                    src="/Taskopia_files/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                    loading="lazy"
                    alt=""  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <p className="rt-gap-off">
                  <span className="rt-color-dark-indigo"
                  >Consistent quality -</span
                  >
                  {" "}every project is tested and reviewed before it reaches you.
                </p>
              </div>
              <div
                data-w-id="c70e8fec-520b-f71e-2e11-c83017c1d6eb"
                style={{ "width": "0%" }}
                className="rt-about-v1-right-line"></div>
              <div
                data-w-id="09ab31ad-e88f-ce65-e18d-db54c7228b6d"
                style={{ "opacity": "0" }}
                className="rt-about-v1-right-item rt-bottom-padding-of">
                <div className="rt-about-v1-right-item-icon">
                  <Image
                    src="/Taskopia_files/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                    loading="lazy"
                    alt=""  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <p className="rt-gap-off">
                  <span className="rt-color-dark-indigo"
                  >Clear communication -</span
                  >
                  {" "}you always know where your project stands, with one point of contact keeping you updated.
                </p>
              </div>
            </div>
            <div
              data-w-id="3a13a58c-8b59-09d0-895e-d85627d01dae"
              style={{ "opacity": "0" }}
              className="rt-button-para-gap rt-overflow-hidden rt-button-left">
              <Link
                data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                href="/contact"
                className="rt-button-body w-inline-block"
              ><div className="rt-button-text">Talk to us today</div>
                <div
                  className="rt-button-body-overlay"
                  style={{ "transform": "translate3d(0px, 100%, 0px) scale3d(1, 1, 1)\n                        rotateX(0deg) rotateY(0deg) rotateZ(0deg)\n                        skew(0deg, 0deg)", "transformStyle": "preserve-3d" }}></div
                ></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
