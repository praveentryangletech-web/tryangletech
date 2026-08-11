import { Metadata } from 'next';
import React from 'react';
import HomeMain from './home/home-main';

export const metadata: Metadata = {
  title: "Tryangle Tech | Web, App & Software Development Company in Ahmedabad",
  description: "Tryangle Tech builds websites, mobile apps, and custom software for businesses in Ahmedabad and across India. 350+ projects delivered in 7+ years.",
};

export default function ExactClonePage() {
  return (
    <>
      <HomeMain />
    </>
  );
}
