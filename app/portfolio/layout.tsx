import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Web & App Development Portfolio | Tryangle Tech",
  description: "See real projects delivered by Tryangle Tech, business websites, e-commerce stores, mobile apps, and custom software for clients across industries.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
