'use client';
import React from "react";
import ScrollTextReveal from "../../../common/ScrollTextReveal";
import { GraphicsDesigningStatsSection } from "@/backend/services/services/services.types";

interface GraphicsDesigningAIAgentsProps {
  data?: GraphicsDesigningStatsSection;
}

export default function GraphicsDesigningAIAgents({ data }: GraphicsDesigningAIAgentsProps) {
  const subBadgeText = data?.subBadgeText || "our numbers";
  const headline =
    data?.headline || "Trusted by businesses across Ahmedabad for creative design that delivers real results";
  const stats = data?.stats || [];

  const stat1 = stats[0] || { value: '500+', label: 'Design projects delivered' };
  const stat2 = stats[1] || { value: '200+', label: 'Brands elevated' };
  const stat3 = stats[2] || { value: '7+', label: 'Years of experience' };
  const stat4 = stats[3] || { value: '99.9%', label: 'Client satisfaction' };

  return (
    <>
      <section className="rt-ai-agents-v1 rt-overflow-hidden">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-simplified-top rt-desktop-text-center">
            <div
              data-w-id="d34d7029-6b0e-655f-892b-4c57bb0aa55d"
              className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">{subBadgeText}</div>
            </div>
            <ScrollTextReveal
              text={headline}
              align="center"
            />
          </div>
          <div
            data-w-id="815f59ed-ca55-1d01-2fde-6345deaaa739"
            className="w-layout-grid rt-ai-agents-v1-card-main rt-position-relative rt-overflow-hidden">
            <div
              data-w-id="815f59ed-ca55-1d01-2fde-6345deaaa73a"
              className="w-layout-vflex rt-ai-agents-v1card rt-position-relative rt-one">
              <div className="rt-text-style-h1 rt-color-vivid-blue">{stat1.value}</div>
              <div className="w-layout-hflex rt-ai-agents-text-wrap">
                <div className="rt-text-style-h6">{stat1.label}</div>
              </div>
              <div
                data-w-id="815f59ed-ca55-1d01-2fde-6345deaaa741"
                className="rt-vision-card-box-line rt-one"></div>
            </div>
            <div
              data-w-id="815f59ed-ca55-1d01-2fde-6345deaaa742"
              className="w-layout-vflex rt-ai-agents-v1card rt-position-relative rt-two">
              <div className="rt-text-style-h1 rt-color-vivid-blue">{stat2.value}</div>
              <div className="w-layout-hflex rt-ai-agents-text-wrap">
                <div className="rt-text-style-h6">{stat2.label}</div>
              </div>
              <div
                data-w-id="815f59ed-ca55-1d01-2fde-6345deaaa749"
                className="rt-vision-card-box-line rt-two"></div>
            </div>
            <div
              data-w-id="815f59ed-ca55-1d01-2fde-6345deaaa74a"
              className="w-layout-vflex rt-ai-agents-v1card rt-position-relative rt-three">
              <div className="rt-text-style-h1 rt-color-vivid-blue">{stat3.value}</div>
              <div className="w-layout-hflex rt-ai-agents-text-wrap">
                <div className="rt-text-style-h6">{stat3.label}</div>
              </div>
              <div
                data-w-id="815f59ed-ca55-1d01-2fde-6345deaaa751"
                className="rt-vision-card-box-line rt-three"></div>
            </div>
            <div
              data-w-id="815f59ed-ca55-1d01-2fde-6345deaaa752"
              className="w-layout-vflex rt-ai-agents-v1card rt-four">
              <div className="rt-text-style-h1 rt-color-vivid-blue">
                {stat4.value}
              </div>
              <div className="w-layout-hflex rt-ai-agents-text-wrap">
                <div className="rt-text-style-h6">{stat4.label}</div>
              </div>
              <div className="rt-vision-card-box-line rt-line"></div>
            </div>
            <div className="rt-vision-card-line rt-landscape-display-none"></div>
          </div>
        </div>
      </section>
    </>
  );
}
