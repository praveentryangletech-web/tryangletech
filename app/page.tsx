import { Metadata } from 'next';
import React from 'react';
import HomeMain from './home/home-main';
import { homeService } from '@/backend/services/home';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

export async function generateMetadata(): Promise<Metadata> {
  let homeData;
  try {
    homeData = await homeService.getHomeContent();
  } catch (err) {
    homeData = DEFAULT_HOME_CONTENT;
  }

  const title = homeData?.metaTitle || 'TryangleTech | Web, App & Custom Software Development in Ahmedabad';
  const description = homeData?.metaDescription || "Ahmedabad's leading IT team building high-performance websites, iOS/Android apps, and custom software. 350+ projects delivered.";
  const keywords = homeData?.keywords || ['Web Development Ahmedabad', 'Custom Software Ahmedabad', 'Mobile App Development', 'Next.js Developers'];

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates: {
      canonical: 'https://tryangletech.com',
    },
    openGraph: {
      title,
      description,
      url: 'https://tryangletech.com',
      siteName: 'TryangleTech',
      images: [
        {
          url: '/portfolio/vh-accounting.webp',
          width: 1200,
          height: 630,
          alt: 'TryangleTech - IT Company in Ahmedabad',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/portfolio/vh-accounting.webp'],
    },
  };
}

export default async function ExactClonePage() {
  let homeData;
  try {
    homeData = await homeService.getHomeContent();
  } catch (err) {
    homeData = undefined;
  }

  return (
    <>
      <HomeMain initialContent={homeData} />
    </>
  );
}
