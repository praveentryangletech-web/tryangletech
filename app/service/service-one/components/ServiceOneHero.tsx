'use client';
import Link from "next/link";
import Image from "next/image";

const SA = '/service3-assets';

export default function ServiceOneHero() {
  return (
    <>
      <section className="rt-hero-v5">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-hero-v5-wrapper">
              <div className="w-layout-vflex rt-hero-v5-heading-wrap rt-position-relative">
                <div className="rt-sub-gap">
                  <div
                    data-w-id="136ee2be-3a36-f0e2-c08f-8813ef35031e"
                    className="rt-sub-text rt-sub-gredient">
                    Task Solutions
                  </div>
                </div>
                <div className="rt-hero-heading-gap">
                  <h1
                    data-w-id="136ee2be-3a36-f0e2-c08f-8813ef350321"
                    className="rt-gap-off">
                    Smarter services to streamline projects from start
                  </h1>
                </div>
                <div
                  data-w-id="136ee2be-3a36-f0e2-c08f-8813ef350323"
                  className="rt-hero-v7-para-wrap">
                  <p className="rt-gap-off">
                    Smarter services to streamline projects from start mean
                    every task is organized, every deadline is clear, and every
                    team member.
                  </p>
                </div>
                <div
                  data-w-id="136ee2be-3a36-f0e2-c08f-8813ef350326"
                  className="w-layout-hflex rt-hero-v5-button-wrap">
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
                        data-w-id="136ee2be-3a36-f0e2-c08f-8813ef35032a"
                        className="rt-hero-v2-client-image rt-overflow-hidden">
                        <Image
                          width={62}
                          height={47}
                          alt="Kloudera-home-two-hero-image"
                          src="/service-1-assets/690499e17ce0c344a20ecda1_kloudera-home-two-hero-image.webp"
                          loading="lazy"
                         />
                      </div>
                      <div
                        data-w-id="136ee2be-3a36-f0e2-c08f-8813ef35032c"
                        className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left">
                        <Image
                          width={60}
                          height={79}
                          alt="Kloudera-home-two-hero-image"
                          src="/service-1-assets/690499e17ce0c344a20ecda2_kloudera-home-two-hero-image.webp"
                          loading="lazy"
                         />
                      </div>
                      <div
                        data-w-id="136ee2be-3a36-f0e2-c08f-8813ef35032e"
                        className="rt-hero-v2-client-image rt-overflow-hidden rt-margin-left">
                        <Image
                          width={60}
                          height={79}
                          alt="Kloudera-home-two-hero-image"
                          src="/service-1-assets/690499e17ce0c344a20ecda3_kloudera-home-two-hero-image.webp"
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
                  data-w-id="2a922485-2ae2-43f1-d550-fc7c8735205f"
                  className="rt-small-btn-wrap rt-hero-v1-small rt-service-one">
                  <div className="rt-small-btn-main rt-color-change">
                    <div className="rt-small-btn-text">Workflow</div>
                    <div className="rt-btn-arrow-v2 rt-hero-v1-small">
                      <Image
                        src="/service-1-assets/69203b6151156495054eacd7_Vector 503 (2).svg"
                        loading="lazy"
                        alt=""
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rt-hero-v5-right rt-mobile-l-display-none">
                <div
                  data-w-id="136ee2be-3a36-f0e2-c08f-8813ef35035e"
                  className="rt-hero-v5-right-one">
                  <Image
                    src="/service-1-assets/690acfecf91d77770201a6cb_taskopia-service-one-hero-1.webp"
                    loading="lazy"
                    alt="taskopia-service-one-hero-1"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div
                  data-w-id="136ee2be-3a36-f0e2-c08f-8813ef350360"
                  className="rt-hero-v5-right-two">
                  <Image
                    src="/service-1-assets/6916b40c8e7ba2243876a27f_taskopiya-service-one-hero.avif"
                    loading="lazy"
                    alt="taskopiya-service-one-hero"
                    className="rt-shadow rt-border-radius-medium"
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="rt-hero-v5-image">
            <Image
              src="/service-1-assets/6915cd620829878f7ea58178_taskopiya-about-banner.webp"
              loading="lazy"
              alt="taskopiya-about-banner"
             width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
          <div
            data-w-id="e3adfb91-848f-aad7-a9a7-c71e5016acc3"
            className="rt-hero-v5-image-dot">
            <Image
              src="/service-1-assets/690ad30ba7100eb0c23fba01_taskopia-service-2-dot.webp"
              loading="lazy"
              alt="taskopia-service-2-dot"
             width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
        </section>
    </>
  );
}
