import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development Company in Ahmedabad | Tryangle Tech",
  description: "iOS and Android app development in Ahmedabad. From concept to App Store launch, built for real business growth.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do you build apps for both iPhone and Android?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we can build apps that work on every type of phone so you can reach all your customers.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to build an app?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on what you need, but most apps take about three to six months to finish from start to launch.",
                },
              },
              {
                "@type": "Question",
                name: "Do you keep working on the app after it launches?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes we do. We offer support packages to make sure your app stays updated and secure as phone software changes.",
                },
              },
              {
                "@type": "Question",
                name: "Can the app connect to my current systems?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we can easily connect your new app to the databases and software your business already uses.",
                },
              },
              {
                "@type": "Question",
                name: "Do you help put the app on the app stores?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we take care of the whole process of getting your app approved and published so people can download it.",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
