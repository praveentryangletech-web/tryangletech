import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development Company in Ahmedabad | Tryangle Tech",
  description: "iOS and Android app development in Ahmedabad. From concept to App Store launch, built for real business growth.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
