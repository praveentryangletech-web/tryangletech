import React from "react";
import ScrollTextReveal from "../../../common/ScrollTextReveal";
import { DigitalMarketingStatementSection } from "@/backend/services/services/services.types";

interface DigitalMarketingAgentProps {
  data?: DigitalMarketingStatementSection;
}

export default function DigitalMarketingAgent({ data }: DigitalMarketingAgentProps) {
  const subBadgeText = data?.subBadgeText || "tryangletech";
  const statement =
    data?.statement ||
    "We craft full-funnel marketing strategies that turn your audience into paying customers.";

  return (
    <section
      data-w-id="c45858de-def6-510f-805b-5dbb3f6a15a5"
      className="rt-agent-v3"
    >
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-agent-v3-top">
          <div className="rt-agent-v3-top-left">
            <div className="rt-sub-text rt-sub-gredient">{subBadgeText}</div>
          </div>
          <div className="rt-position-relative rt-agent-v3-top-right rt-overflow-hidden">
            <ScrollTextReveal
              text={statement}
              align="left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
