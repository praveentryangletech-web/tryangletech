"use client";
import React from 'react';
import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

export default function Collaboration() {
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
                    How We Work
                  </div>
                </div>
                <div className="rt-heading-para-gap">
                  <h2
                    data-w-id="fa389f03-d668-fc21-92b7-625895f0f1cd"
                    style={{ "opacity": "0" }}
                    className="rt-gap-off">
                    One team to connect, collaborate
                    <span className="rt-color-periwinkle-gray">and deliver</span>
                  </h2>
                </div>
                <p
                  data-w-id="01cd9f60-c08f-a44e-7306-8a24c776e67e"
                  style={{ "opacity": "0" }}
                  className="rt-gap-off">
                  From the first call to final launch, we work as an extension of your team — clear communication, real progress updates, and no surprises.
                </p>
                <div className="rt-collaboration-left-inner">
                  <div
                    data-w-id="756057e3-d2c7-74cf-9fc4-d890fe38f192"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-left-item">
                    <div className="rt-collaboration-left-icon">
                      <Image
                        src="/Taskopia_files/6916ed30eddd8192431b095e_specialiti-icon-1 (1).svg"
                        loading="lazy"
                        alt=""  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Seamless teamwork
                      </div>
                      <p className="rt-gap-off">
                        Stay aligned with clear communication and a dedicated point of contact throughout your project — no chasing updates, no guesswork.
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
                        src="/Taskopia_files/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg"
                        loading="lazy"
                        alt=""  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Faster project delivery
                      </div>
                      <p>
                        Track progress, hit clear deadlines, and launch on time, every time — backed by 7+ years delivering 350+ websites.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                  <a
                    data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                    href="contact"
                    className="rt-button-body w-inline-block"
                  ><div className="rt-button-text">Get started today</div>
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
                      src="/Taskopia_files/68f21b4dc6a06a6abe39c79b_taskopia-Collaboration-one.webp"
                      loading="lazy"
                      alt="taskopia-Collaboration-one"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div
                    data-w-id="6e37c1de-f32a-f8b2-a948-1302911adaed"
                    style={{ "opacity": "0" }}
                    className="rt-collaboration-v1-right-two">
                    <Image
                      src="/Taskopia_files/68f21b3af8e5e0af23ce678d_taskopia-Collaboration-two.webp"
                      loading="lazy"
                      alt="taskopia-Collaboration-two"  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div
                  data-w-id="5f4e3a0f-8628-ed34-e438-68eb6dc94db3"
                  style={{ "opacity": "0" }}
                  className="rt-collaboration-v1-right-bottom">
                  <Image
                    src="/Taskopia_files/68f21b3a3b734d2430609672_taskopia-Collaboration-three.webp"
                    loading="lazy"
                    width={466}
                    sizes="(max-width: 479px) 100vw, 466px"
                    alt="taskopia-Collaboration-three"
                    srcSet="
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f21b3a3b734d2430609672_taskopia-Collaboration-three-p-500.webp 500w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f21b3a3b734d2430609672_taskopia-Collaboration-three-p-800.webp 800w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f21b3a3b734d2430609672_taskopia-Collaboration-three.webp       932w
                  "  height={800} />
                </div>
                <div className="rt-collaboration-v1-right-bg"></div>
              </div>
            </div>
          </div>
        </section>
  );
}
