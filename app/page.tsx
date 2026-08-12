import { Metadata } from 'next';
import React from 'react';
import HomeMain from './home/home-main';

export const metadata: Metadata = {
  title: "TryangleTech | Web, App & Custom Software Development in Ahmedabad",
  description: "We're an Ahmedabad-based IT company building websites, mobile apps, and custom software for businesses. 350+ projects delivered with zero technical jargon.",
};

export default function ExactClonePage() {
  return (
    <>
      <HomeMain />
    </>
  );
}
