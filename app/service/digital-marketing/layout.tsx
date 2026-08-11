import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Services Ahmedabad | SEO & Social Media | Tryangle Tech",
  description: "SEO, social media, and paid ad management for businesses in Ahmedabad. We turn website visitors into paying customers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
