import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tryangle Tech | IT Company in Ahmedabad",
  description: "Learn about Tryangle Tech, an IT company based in Ahmedabad delivering 350+ web, app, and software projects over 7+ years.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
