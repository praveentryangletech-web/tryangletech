'use client';
import Link from "next/link";

import React, { useState } from 'react';

import Image from "next/image";

const SA = '/service3-assets';

const faqs = [
  {
    q: "Does it integrate with other tools?",
    a: "AI automation uses artificial intelligence to perform repetitive tasks, analyze data, and optimize processes, enabling businesses to save time, reduce errors, and make smarter, faster decisions efficiently.",
  },
  {
    q: "How can task management software improve productivity?",
    a: "AI can automate repetitive tasks like data entry, customer support, report generation, inventory management, and workflow optimization, allowing teams to focus on strategic, high-value activities and business growth.",
  },
  {
    q: "Can I collaborate with my team using this platform?",
    a: "Yes, AI automation is ideal for small businesses. It streamlines operations, reduces manual work, improves efficiency, and provides actionable insights, helping smaller teams compete and grow effectively.",
  },
  {
    q: "Is this suitable for small teams and enterprises?",
    a: "Industries like finance, healthcare, retail, manufacturing, and logistics benefit greatly from AI automation. It streamlines operations, reduces errors, enhances customer service, and drives efficiency across diverse business sectors.",
  },
  {
    q: "Can I track project deadlines?",
    a: "Absolutely. AI automation seamlessly integrates with your existing tools and platforms, allowing workflows to connect effortlessly, enhancing productivity, reducing manual effort, and ensuring a smooth transition without disrupting current operations.",
  },
];

export default function ServiceThreeFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
      <section className="rt-hero-v7 rt-position-relative rt-overflow-hidden">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-hero-v7-main">
              <div className="w-layout-vflex rt-hero-v7-heading-wrap">
                <div className="rt-sub-gap">
                  <div
                    data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80b6"
                    className="rt-sub-text rt-sub-gredient">
                    Customer Experience AI
                  </div>
                </div>
                <div className="rt-hero-heading-gap rt-herding-v7-main">
                  <h1
                    data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80b8"
                    className="rt-gap-off">
                    Simplifying teamwork for maximum business impact
                  </h1>
                </div>
                <div
                  data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80bc"
                  className="rt-hero-v7-para-wrap">
                  <p className="rt-gap-off">
                    Simplify teamwork with smart task management tools that
                    enhance collaboration, streamline workflows, and maximize
                    impact for lasting business growth.
                  </p>
                </div>
                <div
                  data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80bf"
                  className="w-layout-hflex rt-hero-v7-button-wrap">
                  <Link
                    data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                    href="/contact"
                    className="rt-button-body w-inline-block">
                    <div className="rt-button-text">Get started today</div>
                    <div className="rt-button-body-overlay"></div>
                  </Link>
                  <div className="w-layout-hflex rt-hero-v2-client-wrap">
                    <div className="w-layout-hflex rt-hero-v2-client-img-wrap">
                      <div
                        data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80c7"
                        className="rt-hero-v2-client-image rt-overflow-hidden">
                        <Image
                          width={62}
                          height={47}
                          alt="Kloudera-home-two-hero-image"
                          src="/service-3-assets/690499e17ce0c344a20ecda1_kloudera-home-two-hero-image.webp"
                          loading="lazy"
                         />
                      </div>
                      <div
                        data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80c9"
                        className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left">
                        <Image
                          width={60}
                          height={79}
                          alt="Kloudera-home-two-hero-image"
                          src="/service-3-assets/690499e17ce0c344a20ecda2_kloudera-home-two-hero-image.webp"
                          loading="lazy"
                         />
                      </div>
                      <div
                        data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80cb"
                        className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left">
                        <Image
                          width={60}
                          height={79}
                          alt="Kloudera-home-two-hero-image"
                          src="/service-3-assets/690499e17ce0c344a20ecda3_kloudera-home-two-hero-image.webp"
                          loading="lazy"
                         />
                      </div>
                    </div>
                    <div className="rt-color-dark-indigo">
                      Trusted by 200+ leaders
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="71a4d9bb-ed12-fffa-7ded-0324d6f48125"
                  className="rt-hero-v7-left-bottom rt-overflow-hidden rt-tab-display-none">
                  <div className="rt-text-style-h6 rt-hero-v7-left-text">
                    Trusted by 50,000+ businesses
                  </div>
                  <div className="rt-text-marquee-wrapper rt-overflow-hidden">
                    <div className="rt-text-marquee-train">
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef27127d946b9cb9fdcbce_logo.svg"
                          loading="lazy"
                          width={100}
                          alt=""
                         height={40} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef271276a33d103013fa46_Group 1597884750.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                    </div>
                    <div className="rt-text-marquee-train">
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef27127d946b9cb9fdcbce_logo.svg"
                          loading="lazy"
                          width={100}
                          alt=""
                         height={40} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef271276a33d103013fa46_Group 1597884750.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                    </div>
                    <div className="rt-text-marquee-train">
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef27127d946b9cb9fdcbce_logo.svg"
                          loading="lazy"
                          width={100}
                          alt=""
                         height={40} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                      <div className="rt-text-marquee-iteme">
                        <Image
                          src="/service-3-assets/68ef271276a33d103013fa46_Group 1597884750.svg"
                          loading="lazy"
                          alt=""
                         width={200} height={80} style={{ height: "30px", width: "auto" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rt-hero-v7-right rt-overflow-hidden rt-mobile-l-display-none">
                <div
                  data-w-id="821b55b3-a8cd-3cff-b821-5c6fb716e28e"
                  className="rt-hero-v7-right-one rt-overflow-hidden">
                  <Image
                    src="/service-3-assets/69170015f37d357acf91bec7_taskopiya-service-3 (1).webp"
                    loading="lazy"
                    alt="taskopiya-service-3 (1)"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div
                  data-w-id="5ff5999f-0cd2-c9e1-fdc1-ac73c3d8a152"
                  className="rt-hero-v7-right-two">
                  <Image
                    src="/service-3-assets/69203729550f7640007a1251_taskopia-service-three.webp"
                    loading="lazy"
                    alt="taskopia-service-three"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="rt-hero-v7-image">
            <Image
              src="/service-3-assets/6915d5eb6bd730eb6b764f99_taskopiya-service- two.webp"
              loading="lazy"
              alt="taskopiya-service- two"
             width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="rt-hero-v7-over-lay-one"></div>
          <div className="rt-hero-v7-over-lay-two"></div>
          <div className="rt-overlay"></div>
        </section>
        <section className="rt-simplified">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-simplified-top rt-desktop-text-center rt-heading-bottom-gap">
              <div
                data-w-id="d32a2ace-49d2-24b0-6caf-89ca61419702"
                className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">
                  simplified workflow
                </div>
              </div>
              <h2
                data-w-id="d0c75e4f-f3ca-a991-c514-10c2a1c509e3"
                className="rt-gap-off">
                Our task management service helps teams stay organized,
                streamline{" "}
                <span className="rt-color-periwinkle-gray">
                  workflows, and boost productivity
                </span>
              </h2>
            </div>
            <div className="w-layout-grid rt-simplified-wrapper">
              <div
                data-w-id="06b87898-4f2c-d6fb-f75a-492f3e7822fe"
                className="w-layout-vflex rt-simplified-card">
                <div className="rt-simplified-card-top-part rt-border-radius-medium rt-shadow">
                  <Image
                    className="rt-image-scale"
                    src="/service-3-assets/69086c48e8613e3b874ea6f9_taskopia-service-three-image-simplified.webp"
                    width={370}
                    height={209}
                    alt="taskopia-service-three-image-simplified"
                    data-w-id="06b87898-4f2c-d6fb-f75a-492f3e782300"
                    loading="lazy"
                   />
                </div>
                <div className="w-layout-vflex rt-simplified-card-bottom-part">
                  <div className="rt-text-style-h6">
                    Efficient task tracking
                  </div>
                  <p className="rt-gap-off">
                    Efficient task tracking ensures that every project stays on
                    schedule and team members.
                  </p>
                </div>
              </div>
              <div
                data-w-id="210cc947-d79f-f5d0-ef5e-ac7987d3db20"
                className="w-layout-vflex rt-simplified-card">
                <div className="rt-simplified-card-top-part rt-border-radius-medium rt-shadow">
                  <Image
                    className="rt-image-scale"
                    src="/service-3-assets/69086d605e01e0ce0ecb4b9f_taskopia-service-three-image-simplified-8.webp"
                    width={370}
                    height={209}
                    alt="taskopia-service-three-image-simplified-8"
                    data-w-id="210cc947-d79f-f5d0-ef5e-ac7987d3db22"
                    loading="lazy"
                   />
                  <div
                    data-w-id="35a3418c-007f-e286-2fac-1448d7ccf163"
                    className="rt-simplified-card-top-innar">
                    <Image
                      src="/service-3-assets/69086dd1a451e7aadfd1b02b_Mask group (5).webp"
                      loading="lazy"
                      data-w-id="bf832279-7882-71e9-77f0-dfcaa36b2a14"
                      alt="Mask group (5)"
                      className="rt-image-scale"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div className="w-layout-vflex rt-simplified-card-bottom-part rt-3">
                  <div className="rt-text-style-h6">
                    Enhanced team collaboration
                  </div>
                  <p className="rt-gap-off">
                    Facilitate communication, file sharing, and real-time
                    updates to boost team efficiency .
                  </p>
                </div>
              </div>
              <div
                data-w-id="210cc947-d79f-f5d0-ef5e-ac7987d3dad5"
                className="w-layout-vflex rt-simplified-card">
                <div className="rt-simplified-card-top-part rt-border-radius-medium rt-shadow">
                  <Image
                    src="/service-3-assets/69086a437e0f8dd43b0a2a94_taskopia-service-three-image-simplified-6.webp"
                    loading="lazy"
                    data-w-id="31f55def-c002-725b-ac24-4fb3c902009b"
                    alt="taskopia-service-three-image-simplified-6"
                    className="rt-image-scale"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="w-layout-vflex rt-simplified-card-bottom-part rt-2">
                  <div className="rt-text-style-h6">
                    Streamlined task organization
                  </div>
                  <p className="rt-gap-off">
                    Keep all projects, tasks, and deadlines in one centralized
                    platform for easy access and management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="rt-our-services-v1">
          <div className="rt-our-service-bg rt-overflow-hidden">
            <div className="w-layout-blockcontainer rt-container-main w-container">
              <div className="rt-our-service-main">
                <div className="rt-our-service-left rt-border-radius-l">
                  <div
                    data-w-id="4528b803-2d5d-5c7d-d6ff-d1755664fb4c"
                    className="rt-text-style-h6 rt-text-color-white">
                    Task management dashboard
                  </div>
                  <div
                    data-w-id="ff0184b4-6762-c757-cca5-2cc31e232758"
                    className="rt-our-service-left-image-one">
                    <Image
                      src="/service-3-assets/690843d741469dfe6381c86e_taskopia-service-one-our-image.webp"
                      loading="lazy"
                      alt="taskopia-service-one-our-image"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div className="w-layout-vflex rt-choose-us-marquee-main">
                    <div
                      data-w-id="ed4ebf30-cbfb-5c24-fd0e-9bd7078cfb64"
                      className="rt-choose-us-marquee rt-overflow-hidden">
                      <div className="rt-marquee-item">
                        <Image
                          alt="taskopia-service-one-our-image-two"
                          src="/service-3-assets/690843d6663a57301c359099_taskopia-service-one-our-image-two.webp"
                          loading="lazy"
                         width={800} height={800} style={{ width: "100%", height: "auto" }} />
                      </div>
                      <div className="rt-marquee-item">
                        <Image
                          alt="taskopia-service-one-our-image-two"
                          src="/service-3-assets/690843d6663a57301c359099_taskopia-service-one-our-image-two.webp"
                          loading="lazy"
                         width={800} height={800} style={{ width: "100%", height: "auto" }} />
                      </div>
                      <div className="rt-marquee-item">
                        <Image
                          alt="taskopia-service-one-our-image-two"
                          src="/service-3-assets/690843d6663a57301c359099_taskopia-service-one-our-image-two.webp"
                          loading="lazy"
                         width={800} height={800} style={{ width: "100%", height: "auto" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rt-our-service-right">
                  <div>
                    <div className="rt-sub-gap">
                      <div
                        data-w-id="46267b11-3534-1c87-dbbb-42e400ef381e"
                        className="rt-sub-text">
                        why choose us
                      </div>
                    </div>
                    <div className="rt-heading-para-gap">
                      <h2
                        data-w-id="0874d457-f036-2926-f3c8-80010962016e"
                        className="rt-gap-off rt-text-color-white">
                        Smarter task management for growing agile teams
                      </h2>
                    </div>
                    <p
                      data-w-id="b0ab4ba8-5be6-3c27-98c6-724a3e3820db"
                      className="rt-gap-off rt-color-pale-periwinkle">
                      Our task management service is designed to support growing
                      teams by providing smarter tools to organize work,
                      streamline communication, &nbsp;and ensure timely
                      delivery.
                    </p>
                  </div>
                  <div
                    data-w-id="ff7f24cb-57e0-c93d-b0a4-9eba6d3e1a72"
                    className="rt-about-v1-right-line rt-why-choose-v1-line"></div>
                  <div className="rt-our-service-right-inner">
                    <div data-w-id="ecf91cbc-a037-faed-e91f-a12afbd7b4dd">
                      <Image
                        src="/service-3-assets/6916b330bfe76dda628cf5ac_specialiti-icon-1.svg"
                        loading="lazy"
                        alt="specialiti-icon-1"
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-our-service-right-icon">
                      <div
                        data-w-id="51e73edd-cd94-a54d-7eed-7768bb6cc864"
                        className="rt-text-style-h6 rt-text-color-white rt-small-heading-para-gap">
                        Time &amp; productivity tracking
                      </div>
                      <p
                        data-w-id="15cfac48-955b-b56a-6e2a-fa56be3f619c"
                        className="rt-gap-off rt-color-pale-periwinkle">
                        Our task management service is designed to support
                        growing teams by providing smarter tools to organize
                        work, streamline communication, &nbsp;and ensure timely
                        delivery.
                      </p>
                    </div>
                    <div
                      data-w-id="33b12b78-8729-722c-56a6-c9b1a508f1b5"
                      className="rt-button-para-gap">
                      <Link
                        data-wf--rt-white-button--variant="base"
                        data-w-id="0405d357-f0f5-aac8-4042-22ceb6fb3cbf"
                        href="/service-one"
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
          </div>
        </section>
        <section className="rt-cases">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="w-layout-hflex rt-cases-main">
              <div className="w-layout-vflex rt-cases-right-part">
                <div className="w-layout-vflex rt-cases-heading-wrap rt-overflow-hidden">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401e1"
                      className="rt-sub-text rt-sub-gredient">
                      why choose us
                    </div>
                  </div>
                  <div className="rt-heading-para-gap">
                    <h2
                      data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401e3"
                      className="rt-gap-off">
                      Organized workflows, stress-
                      <span className="rt-color-periwinkle-gray">
                        free project delivery
                      </span>
                    </h2>
                  </div>
                  <div
                    data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401e7"
                    className="rt-cases-para-wrap rt-gap-large">
                    <p className="rt-gap-off">
                      Our task management solution is designed to help teams
                      save time, stay organized, and hit deadlines without
                      stress.
                    </p>
                  </div>
                  <div
                    data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401ea"
                    className="rt-button-para-gap">
                    <Link
                      data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                      href="/service-one"
                      className="rt-button-body w-inline-block">
                      <div className="rt-button-text">Explore benefits</div>
                      <div className="rt-button-body-overlay"></div>
                    </Link>
                  </div>
                </div>
                <div
                  data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401f0"
                  className="w-layout-grid rt-cases-box-main rt-position-relative">
                  <div
                    id="w-node-cd8e4bfe-5169-9342-1cbb-40d6510401f1-0687f4f0"
                    data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401f1"
                    className="w-layout-vflex rt-cases-box-wrap">
                    <div>
                      <Image
                        src="/service-3-assets/6916ef876682eed2b2fd5911_Vector (34).svg"
                        loading="lazy"
                        alt=""
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="w-layout-vflex rt-cases-box-text-wrap">
                      <div className="rt-text-style-h6">
                        Efficient workflows
                      </div>
                      <p className="rt-gap-off">
                        Our platform streamlines tasks, tracks progress, and
                        ensures deadlines are never missed,
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401f8"
                    className="w-layout-vflex rt-cases-box-wrap rt-left-padding">
                    <div>
                      <Image
                        src="/service-3-assets/6916f00db3051e5aed09bd3f_Group 2085663576.svg"
                        loading="lazy"
                        alt=""
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="w-layout-vflex rt-cases-box-text-wrap rt-full-width">
                      <div className="rt-text-style-h6">
                        Seamless collaboration
                      </div>
                      <p className="rt-gap-off">
                        Real-time updates, task assignments, and integrated
                        communication make teamwork smoothrer
                      </p>
                    </div>
                  </div>
                  <div className="rt-cades-absolute-line"></div>
                </div>
              </div>
              <div
                data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401d6"
                className="rt-cases-left-part">
                <div
                  data-w-id="8503912d-a933-f4c4-ce1c-498a3e0e7655"
                  className="rt-cases-left-main">
                  <Image
                    src="/service-3-assets/6904b11c6b4ad8773a03a11c_taskopia-service-three-why-choose (1).png"
                    loading="lazy"
                    alt="taskopia-service-three-why-choose (1)"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-cases-v2-left-overlay">
                  <Image
                    src="/service-3-assets/6904b11c9c86bd80ff185a4b_Mask group (4).png"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div
                  data-w-id="004aed41-8599-003c-e25f-67cb5124ad03"
                  className="rt-cases-left-overlay-2">
                  <Image
                    src="/service-3-assets/6904b2880d8bf1cf10e7ab48_taskopia-service-three-why-choose-two.png"
                    loading="lazy"
                    alt="taskopia-service-three-why-choose-two"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div
                  data-w-id="b39041d9-95f1-3e94-cc77-0b326d8cf6d8"
                  className="rt-small-btn-main rt-cases-small">
                  <Image
                    src="/service-3-assets/69087acd988708b2bfcb37de_Group 2085662995.webp"
                    loading="lazy"
                    alt=" taskopia-workflow"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="rt-feaures-v1 rt-position-relative rt-overflow-hidden">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-feaures-top rt-desktop-text-center rt-heading-bottom-gap">
              <div
                data-w-id="90bc93a4-7453-cf99-b117-5b196d3d4337"
                className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">
                  our unique feaures
                </div>
              </div>
              <h2
                data-w-id="90bc93a4-7453-cf99-b117-5b196d3d433a"
                className="rt-gap-off">
                Simplify workflows, boost overall{" "}
                <span className="rt-color-periwinkle-gray">
                  business efficiency
                </span>
              </h2>
            </div>
            <div
              data-w-id="8e33e015-0098-3931-b15d-9ef7d71eaaea"
              className="rt-feaures-v1-main">
              <Image
                src="/service-3-assets/6915c70b7c1f18f1e46e5094_taskopiya-home-two.avif"
                loading="lazy"
                alt="taskopiya-home-two"
               width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="w-layout-grid rt-benefits-v2-card-wrap">
              <div
                data-w-id="6c812f82-28ff-1528-5a4b-fce6814a7d9e"
                className="w-layout-vflex rt-benefits-v2-card">
                <div className="rt-benefits-icon">
                  <Image
                    width={38}
                    height={38}
                    alt="databaseicon-1"
                    src="/service-3-assets/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg"
                    loading="lazy"
                   />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">Customizable workflows</div>
                  <p className="rt-gap-off">
                    Monitor task status, deadlines, and team performance
                    instantly.
                  </p>
                </div>
              </div>
              <div
                data-w-id="6c812f82-28ff-1528-5a4b-fce6814a7da6"
                className="w-layout-vflex rt-benefits-v2-card">
                <div>
                  <Image
                    width={38}
                    height={38}
                    alt=""
                    src="/service-3-assets/6916f56a80d627cd0ce40bd7_690091602dd7aa7a0c1228ed_kloudera-pricing-icon.svg"
                    loading="lazy"
                    className="rt-benefits-icon"
                   />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">Data-driven insights</div>
                  <p className="rt-gap-off">
                    Never miss deadlines with smart alerts and notifications.
                  </p>
                </div>
              </div>
              <div
                data-w-id="6c812f82-28ff-1528-5a4b-fce6814a7dae"
                className="w-layout-vflex rt-benefits-v2-card">
                <div>
                  <Image
                    width={42}
                    height={38}
                    alt=""
                    src="/service-3-assets/6916ec6339f890a80905a69b_Vector (33).svg"
                    loading="lazy"
                    className="rt-benefits-icon"
                   />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">Cross-platform access</div>
                  <p className="rt-gap-off">
                    Manage tasks anytime from desktop, mobile, or tablet.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            data-w-id="e31b2892-b856-bf93-8f9c-f3a209ae4130"
            className="rt-feaures-v1-top-icon rt-1">
            <div className="rt-feaures-v1-icon rt-shadow rt-1">
              <Image
                src="/service-3-assets/68f2348699aef274cbcbee3e_taskopia-integration-icon-2.svg"
                loading="lazy"
                alt="taskopia-integration-icon-2"
               width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="rt-feaures-v1-icon-line">
              <Image
                src="/service-3-assets/690888a0007751b90f4a140a_Vector 1587.svg"
                loading="lazy"
                alt=""
               width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="rt-feaures-v1-icon rt-shadow rt-2">
              <Image
                src="/service-3-assets/68f23486208c840a16db162e_taskopia-integration-icon-1.svg"
                loading="lazy"
                alt="taskopia-integration-icon-1"
               width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="rt-feaures-v1-top-icon rt-2">
            <div
              data-w-id="87693453-cb6f-15d8-f9b9-6e8d41dc38fa"
              className="rt-feaures-v1-icon rt-shadow rt-1">
              <Image
                src="/service-3-assets/68f2348662af5d1784a5246b_taskopia-integration-icon-7.svg"
                loading="lazy"
                alt="taskopia-integration-icon-7"
               width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="rt-feaures-v1-icon-line rt-overflow-hidden">
              <Image
                src="/service-3-assets/690888a0007751b90f4a140a_Vector 1587.svg"
                loading="lazy"
                data-w-id="87693453-cb6f-15d8-f9b9-6e8d41dc38fd"
                alt=""
               width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div
              data-w-id="87693453-cb6f-15d8-f9b9-6e8d41dc38fe"
              className="rt-feaures-v1-icon rt-shadow rt-2">
              <Image
                src="/service-3-assets/68f234867a335089a7a018ec_taskopia-integration-icon-6.svg"
                loading="lazy"
                alt="taskopia-integration-icon-6"
               width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div
            data-w-id="d52146fe-cbab-c032-4bd3-c4ce5802bc7b"
            className="rt-small-btn-main rt-feaures-v1-icon-animatiom">
            <div className="rt-feaures-v1-icon rt-shadow rt-5">
              <Image
                src="/service-3-assets/68f234862949c40075dc6633_taskopia-integration-icon-5.svg"
                loading="lazy"
                alt="taskopia-integration-icon-5"
               width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
        </section>
        <section className="rt-collaboration-v1 rt-top-gap rt-position-relative">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-collaboration-v1-main">
              <div className="rt-collaboration-v1-right rt-service-v1">
                <div className="rt-collaboration-v1-right-top rt-service-v1">
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289d6"
                    className="rt-collaboration-v1-right-two">
                    <Image
                      src="/service-3-assets/68f21b3af8e5e0af23ce678d_taskopia-Collaboration-two.webp"
                      loading="lazy"
                      alt="taskopia-Collaboration-two"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289d8"
                    className="rt-collaboration-v1-right-one rt-overflow-hidden rt-shadow">
                    <Image
                      src="/service-3-assets/690462c104fe7d75a4299d62_Taskopia-service-three-happy.png"
                      loading="lazy"
                      alt="Taskopia-service-three-happy"
                     width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                </div>
                <div
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289da"
                  className="rt-collaboration-v1-right-bottom rt-service-v1 rt-shadow rt-overflow-hidden">
                  <Image
                    src="/service-3-assets/690462025b3a67e962bf187e_Taskopia-service-happy-two.png"
                    loading="lazy"
                    width={466}
                    alt="
Taskopia-service-happy-two
"
                   height={800} />
                </div>
                <div className="rt-collaboration-v1-right-bg rt-service-v1"></div>
              </div>
              <div className="rt-collaboration-left">
                <div
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289de"
                  className="rt-sub-gap">
                  <div className="rt-sub-text rt-sub-gredient">
                    Collaboration Section
                  </div>
                </div>
                <div
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289e1"
                  className="rt-heading-para-gap">
                  <h2 className="rt-gap-off">
                    One platform to connect, collaborate{" "}
                    <span className="rt-color-periwinkle-gray">
                      and deliver
                    </span>
                  </h2>
                </div>
                <p
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289e6"
                  className="rt-gap-off">
                  Bring your team, tasks, and tools together in one space—making
                  collaboration seamless and project delivery faster than ever.
                </p>
                <div className="rt-collaboration-left-inner">
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289e9"
                    className="rt-collaboration-left-item">
                    <div className="rt-collaboration-left-icon">
                      <Image
                        src="/service-3-assets/6916ed30eddd8192431b095e_specialiti-icon-1 (1).svg"
                        loading="lazy"
                        alt=""
                        className="rt-height-auto"
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Seamless teamwork
                      </div>
                      <p className="rt-gap-off">
                        Unify communication, tasks, and files in one space to
                        keep your team aligned and projects moving forward
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289f1"
                    className="rt-about-v1-right-line rt-why-choose-v1-line"></div>
                  <div
                    data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289f2"
                    className="rt-collaboration-left-item">
                    <div className="rt-collaboration-left-icon">
                      <Image
                        src="/service-3-assets/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg"
                        loading="lazy"
                        alt=""
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="rt-collaboration-left-item-text">
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Faster project delivery
                      </div>
                      <p className="rt-gap-off">
                        Track progress, set clear deadlines, and streamline
                        workflows to ensure every project is delivered on time.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="ae5c502b-6188-46fa-bc36-1f7b3f7289fa"
                  className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                  <Link
                    data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                    href="/contact"
                    className="rt-button-body w-inline-block">
                    <div className="rt-button-text">Collaborate smarter</div>
                    <div className="rt-button-body-overlay"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            data-w-id="f2aff3b2-cea7-6f9d-a44b-1ba65f4ef71a"
            className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
            <div className="rt-section-overlay"></div>
          </div>
        </section>
        <section className="rt-testimonials-v1">
          <div className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-testimonials-v1-contanner rt-overflow-hidden">
              <div className="rt-testimonials-v1-container rt-position-relative">
                <div className="rt-testimonials-v1-top rt-heading-bottom-gap">
                  <div
                    data-w-id="584d018b-8d6e-8292-34fe-7f2c572f8489"
                    className="rt-sub-gap">
                    <div className="rt-sub-text">our testimonials</div>
                  </div>
                  <h2
                    data-w-id="584d018b-8d6e-8292-34fe-7f2c572f848c"
                    className="rt-gap-off rt-text-color-white">
                    Customer experiences that speak for themselves
                  </h2>
                </div>
                <div
                  data-w-id="47b98db0-d75d-b458-7027-7553e5020911"
                  className="rt-marquee-v1-animation rt-overflow-hidden">
                  <div className="rt-testimonials-v1-content">
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="47b98db0-d75d-b458-7027-7553e5020914"
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src="/service-3-assets/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp"
                              loading="lazy"
                              alt="
taskopia-testimonials-author-v1
"
                             width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1"
                                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                Jonathan Keller
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                            “Good sales growth”
                          </div>
                          <p className="rt-color-pale-periwinkle">
                            “This tool transformed how our team works! Tasks are
                            organized, deadlines are clear, and collaboration is
                            smoother than ever. Productivity has never been this
                            high.”
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="47b98db0-d75d-b458-7027-7553e5020926"
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src="/service-3-assets/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v2"
                             width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1"
                                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                {" "}
                                Rebecca Lin
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                            “Faster support”
                          </div>
                          <p className="rt-color-pale-periwinkle">
                            “An absolute game-changer for project management. We
                            can track progress in real-time, avoid delays, and
                            deliver projects on schedule with less stress.”
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="47b98db0-d75d-b458-7027-7553e5020937"
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src="/service-3-assets/68f2056835f743b2678916ad_taskopia-testimonials-author-v3.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v3"
                             width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1"
                                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                {" "}
                                Mark Wilson
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                            “Smooth workflow”
                          </div>
                          <p className="rt-color-pale-periwinkle">
                            “Simple, intuitive, and powerful—our team now
                            manages tasks without confusion. It keeps everyone
                            aligned and helps us achieve more in less time.”
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rt-testimonials-v1-content">
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="47b98db0-d75d-b458-7027-7553e5020949"
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src="/service-3-assets/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp"
                              loading="lazy"
                              alt="
taskopia-testimonials-author-v1
"
                             width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1"
                                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                Jonathan Keller
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                            “Good sales growth”
                          </div>
                          <p className="rt-color-pale-periwinkle">
                            “This tool transformed how our team works! Tasks are
                            organized, deadlines are clear, and collaboration is
                            smoother than ever. Productivity has never been this
                            high.”
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="47b98db0-d75d-b458-7027-7553e502095b"
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src="/service-3-assets/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v2"
                             width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1"
                                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                {" "}
                                Rebecca Lin
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                            “Faster support”
                          </div>
                          <p className="rt-color-pale-periwinkle">
                            “An absolute game-changer for project management. We
                            can track progress in real-time, avoid delays, and
                            deliver projects on schedule with less stress.”
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="47b98db0-d75d-b458-7027-7553e502096c"
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src="/service-3-assets/68f2056835f743b2678916ad_taskopia-testimonials-author-v3.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v3"
                             width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1"
                                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                {" "}
                                Mark Wilson
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                            “Smooth workflow”
                          </div>
                          <p className="rt-color-pale-periwinkle">
                            “Simple, intuitive, and powerful—our team now
                            manages tasks without confusion. It keeps everyone
                            aligned and helps us achieve more in less time.”
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rt-testimonials-v1-content">
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="47b98db0-d75d-b458-7027-7553e502097e"
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src="/service-3-assets/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp"
                              loading="lazy"
                              alt="
taskopia-testimonials-author-v1
"
                             width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1"
                                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                Jonathan Keller
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                            “Good sales growth”
                          </div>
                          <p className="rt-color-pale-periwinkle">
                            “This tool transformed how our team works! Tasks are
                            organized, deadlines are clear, and collaboration is
                            smoother than ever. Productivity has never been this
                            high.”
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="47b98db0-d75d-b458-7027-7553e5020990"
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src="/service-3-assets/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v2"
                             width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1"
                                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                {" "}
                                Rebecca Lin
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                            “Faster support”
                          </div>
                          <p className="rt-color-pale-periwinkle">
                            “An absolute game-changer for project management. We
                            can track progress in real-time, avoid delays, and
                            deliver projects on schedule with less stress.”
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rt-testimonials-item-wrapper">
                      <div
                        data-w-id="47b98db0-d75d-b458-7027-7553e50209a1"
                        className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src="/service-3-assets/68f2056835f743b2678916ad_taskopia-testimonials-author-v3.webp"
                              loading="lazy"
                              alt="taskopia-testimonials-author-v3"
                             width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star (2)"
                                  className="rt-star-test-v1"
                                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                {" "}
                                Mark Wilson
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                            “Smooth workflow”
                          </div>
                          <p className="rt-color-pale-periwinkle">
                            “Simple, intuitive, and powerful—our team now
                            manages tasks without confusion. It keeps everyone
                            aligned and helps us achieve more in less time.”
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rt-testimonials-overlay"></div>
                </div>
              </div>
              <div className="rt-testimonials-v1-overlay"></div>
            </div>
          </div>
        </section>
        <section className="rt-faq">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-faq-content-main-v2">
              <div className="w-layout-hflex rt-faq-heading-main rt-faq-2-main-left">
                <div className="w-layout-vflex rt-faq-heading-wrap rt-faq-v2">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb877"
                      className="rt-sub-text rt-sub-gredient">
                      Frequently asked questions
                    </div>
                  </div>
                  <h2
                    data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb879"
                    className="rt-no-margin">
                    Everything you want to know{" "}
                    <span className="rt-color-periwinkle-gray">
                      explained clearly
                    </span>
                  </h2>
                  <div
                    data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb87d"
                    className="rt-button-para-gap">
                    <Link
                      data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                      href="/contact"
                      className="rt-button-body w-inline-block">
                      <div className="rt-button-text">Contact us today</div>
                      <div className="rt-button-body-overlay"></div>
                    </Link>
                  </div>
                </div>
                <div
                  data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb880"
                  className="rt-faq-main rt-margin-auto rt-faq-2-main">
                {faqs.map(({ q, a }, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag${idx === 0 ? ' rt-top-gap-of' : ''}`}
                      style={{ cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      <div className="w-layout-hflex rt-faq-top-part">
                        <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
                          <h3 className="rt-text-style-h6" style={{ marginTop: 0, marginBottom: 0 }}>{q}</h3>
                        </div>
                        <div className="rt-faq-right-part">
                          <div className="rt-faq-minus"></div>
                          <div 
                            className="rt-faq-plus" 
                            style={{ 
                              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', 
                              opacity: isOpen ? 0 : 1,
                              transition: 'all 0.3s ease' 
                            }}></div>
                        </div>
                      </div>
                      <div 
                        className="rt-faq-bottom-part rt-overflow-hidden" 
                        style={{ 
                          height: isOpen ? 'auto' : 0, 
                          opacity: isOpen ? 1 : 0, 
                          transition: 'opacity 0.3s ease',
                          paddingTop: isOpen ? '20px' : 0
                        }}
                      >
                        <div className="rt-faq-para-wrap">
                          <p className="rt-gap-off">{a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            })
          }}
        />
    </>
  );
}
