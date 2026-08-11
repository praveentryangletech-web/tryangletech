import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphic Design & Branding Services Ahmedabad | Tryangle Tech",
  description: "Logo design, brand identity, and marketing graphics for businesses in Ahmedabad and across India.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
