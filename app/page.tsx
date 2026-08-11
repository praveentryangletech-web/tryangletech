import { Metadata } from 'next';
import React from 'react';
import HomeMain from './home/home-main';

export const metadata: Metadata = {
  title: "Tryangletech Is Best It Company in Ahmedabad",
  description: "Welcome to Tryangletech, your one-stop solution for IT services. From attractive website design and development to powerful marketing strategies, flawless app and software development, to profitable business solutions.",
};

export default function ExactClonePage() {
  return (
    <>
      <HomeMain />
    </>
  );
}
