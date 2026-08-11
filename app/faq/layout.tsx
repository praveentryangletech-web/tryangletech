import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Tryangle Tech",
  description: "Answers to common questions about working with Tryangle Tech, timelines, technologies, industries served, and ongoing support.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
