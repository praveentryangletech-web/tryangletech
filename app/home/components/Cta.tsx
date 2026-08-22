"use client";
import Link from "next/link";
import React from 'react';
import { HomeCtaBannerSection } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

interface CtaProps {
  ctaBanner?: HomeCtaBannerSection;
}

export default function Cta({ ctaBanner: ctaBannerProp }: CtaProps) {
  const cta = ctaBannerProp || DEFAULT_HOME_CONTENT.ctaBanner;

  return (
    <section className="rt-cta-v1">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-cta-wrap rt-overflow-hidden rt-position-relative">
          <div className="rt-heading-bottom-gap rt-desktop-text-center">
            <h2 className="rt-gap-off">
              {cta.heading || 'Ready to build something amazing for your business?'}
            </h2>
            <p className="rt-color-pale-periwinkle">
              {cta.description || 'Schedule a free 30-minute consultation with our lead software architects. No technical jargon, no obligations.'}
            </p>
          </div>
          <div className="rt-desktop-text-center">
            <Link href={cta.buttonLink || '/contact'} className="rt-button-body w-inline-block">
              <div className="rt-button-text">{cta.buttonText || 'Talk to us today'}</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
