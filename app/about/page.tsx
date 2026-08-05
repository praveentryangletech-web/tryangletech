'use client';

import { useEffect, useState } from 'react';



import AboutHero from './components/AboutHero';
import AboutFeatures from './components/AboutFeatures';
import WhyChooseUs from './components/WhyChooseUs';
import OurGoal from './components/OurGoal';
import OurProcess from './components/OurProcess';
import AboutFAQ from './components/AboutFAQ';
import FooterCTA from '../components/FooterCTA';
import AboutBlog from './components/AboutBlog';

const A = '/about-assets';

import WebflowInit from "../common/WebflowInit";

export default function AboutPage() {


  return (
    <>
      <WebflowInit pageId="68eddb57e406830358a1f29d" />


      {/* ══════════════════ MAIN ══════════════════ */}
      <main>

        <AboutHero />

        <AboutFeatures />

        <WhyChooseUs />

        {/* <OurGoal /> */}

        <OurProcess />


        <FooterCTA />
        <AboutFAQ />

        {/* <AboutBlog /> */}

      </main>


    </>
  );
}
