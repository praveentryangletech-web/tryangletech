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
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
    homeData = DEFAULT_HOME_CONTENT;
  }

  const siteUrl = 'https://tryangletech.com';

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'TryangleTech',
        description:
          homeData?.metaDescription ||
          'TryangleTech is a leading software engineering and digital solutions company.',
        publisher: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'TryangleTech',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
          width: 512,
          height: 512,
        },
        description:
          homeData?.metaDescription ||
          'TryangleTech delivers bespoke web development, mobile applications, and enterprise custom software solutions.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: `${siteUrl}/contact`,
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: 'TryangleTech Digital & Software Engineering',
        url: siteUrl,
        image: `${siteUrl}/logo.png`,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Worldwide',
        },
        serviceType: [
          'Web Development',
          'Mobile App Development',
          'Custom Software Engineering',
          'UI/UX Design',
          'Digital Marketing',
        ],
      },
      ...(homeData?.faqs && homeData.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: homeData.faqs.map((faq: any) => ({
                '@type': 'Question',
                name: faq.q || faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a || faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd),
        }}
      />
      <HomeMain initialContent={homeData} />
    </>
  );
}
