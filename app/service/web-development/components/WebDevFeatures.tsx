import React from 'react';
import Image from "next/image";
import ScrollTextReveal from '../../../common/ScrollTextReveal';
import { WebDevSpecialitySection } from '@/backend/services/services/services.types';
import { DEFAULT_WEB_DEV_CONTENT } from '@/backend/services/services/services.defaults';

const SA = '/service3-assets';

export default function WebDevFeatures({ data }: { data?: WebDevSpecialitySection }) {
  const specialityData = data || DEFAULT_WEB_DEV_CONTENT.speciality;
  const cards = specialityData.cards || DEFAULT_WEB_DEV_CONTENT.speciality.cards;

  const card1 = cards[0] || DEFAULT_WEB_DEV_CONTENT.speciality.cards[0];
  const card2 = cards[1] || DEFAULT_WEB_DEV_CONTENT.speciality.cards[1];
  const card3 = cards[2] || DEFAULT_WEB_DEV_CONTENT.speciality.cards[2];

  return (
    <>
      <section className="rt-speciality rt-overflow-hidden" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-tools-iconheading rt-speciality-heading rt-heading-bottom-gap">
            <div className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">{specialityData.subBadgeText || 'features'}</div>
            </div>
            <ScrollTextReveal
              text={specialityData.heading || 'Websites that work well on every device and bring real results to your business'}
              align="center"
            />
          </div>
          <div className="rt-speciality-wrapper">
            <div
              data-w-id="b178d7ba-8043-dad3-0eb9-4ce1a16ab050"
              className="rt-speciality-item rt-border-radius-medium rt-shadow">
              <div className="rt-speciality-item-top">
                <div className="rt-benefits-icon">
                  <Image
                    src={card1.icon || "/service-1-assets/6916ed30eddd8192431b095e_specialiti-icon-1 (1).svg"}
                    loading="lazy"
                    alt=""
                    width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-text-style-h6">
                  {card1.title}
                </div>
                <p className="rt-gap-off">
                  {card1.desc}
                </p>
              </div>
              <div className="rt-speciality-item-bottom rt-1">
                <div data-w-id="550ba491-626c-ae49-18f3-0ae2fea45116">
                  <Image
                    src={card1.images?.[0] || "/service-1-assets/690af46ec3c652eb36481b92_taskopia-service-two-speclality-1.webp"}
                    loading="lazy"
                    alt={card1.title || "taskopia-service-two-speclality-1"}
                    width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div
                  data-w-id="f3df5baa-fd06-6053-f4e2-08d3035925e3"
                  className="rt-speciality-item-bottom-1">
                  <Image
                    src={card1.images?.[1] || "/service-1-assets/6916ee81d584787f4358140a_taskopiya-service-one-seamless-2.webp"}
                    loading="lazy"
                    data-w-id="6a5d4c4b-ca7f-3ed3-b5bd-bc1b1cf646b6"
                    alt={card1.title || "taskopiya-service-one-seamless-2"}
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
                    src={card2.icon || "/service-1-assets/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg"}
                    loading="lazy"
                    alt=""
                    width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-text-style-h6">
                  {card2.title}
                </div>
                <p className="rt-gap-off">
                  {card2.desc}
                </p>
              </div>
              <div className="rt-speciality-item-bottom rt-2">
                <div data-w-id="4b53e202-3d68-4e02-968b-a7142e0b1331">
                  <Image
                    src={card2.images?.[0] || "/service-1-assets/690af46e49d21abec7c4c84e_taskopia-service-two-speclality-4.webp"}
                    loading="lazy"
                    alt={card2.title || "taskopia-service-two-speclality-4"}
                    width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-speciality-item-bottom-1 rt-change">
                  <Image
                    src={card2.images?.[1] || "/service-1-assets/6916ee3d48e50837b4bef350_taskopiya-service-one-seamless.webp"}
                    loading="lazy"
                    alt={card2.title || "taskopiya-service-one-seamless"}
                    className="rt-border-radius-small rt-shadow"
                    width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div data-w-id="60af2a98-b52b-8db3-3b1b-8acaee57774c">
                  <Image
                    src={card2.images?.[2] || "/service-1-assets/690af46eda7a2f8b2df0dffa_taskopia-service-two-speclality-6.webp"}
                    loading="lazy"
                    alt={card2.title || "taskopia-service-two-speclality-6"}
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
                    src={card3.icon || "/service-1-assets/6916ed30dcc91e4de385f200_specialiti-icon-3 (1).svg"}
                    loading="lazy"
                    alt=""
                    width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="rt-text-style-h6">
                  {card3.title}
                </div>
                <p className="rt-gap-off">
                  {card3.desc}
                </p>
              </div>
              <div
                data-w-id="0c53b07b-fe68-2f41-7085-9175bf7b851d"
                className="rt-speciality-item-bottom rt-3">
                <Image
                  src={card3.images?.[0] || "/service-1-assets/690af46ec3c652eb36481b95_taskopia-service-two-speclality-7.webp"}
                  loading="lazy"
                  alt={card3.title || "taskopia-service-two-speclality-7"}
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                <div
                  data-w-id="1cbba0cf-8e7f-a948-68ff-f8a53e0e87ac"
                  className="rt-speciality-item-small-img rt-up-down">
                  <Image
                    src={card3.images?.[1] || "/service-1-assets/6916edd50bad7d0bc178eb08_Group 2085663575.png"}
                    loading="lazy"
                    alt={card3.title || "taskopia-sarvise-v1-smart-automation"}
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
