import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Tryangle Tech | Ahmedabad IT Company",
  description: "Get in touch with Tryangle Tech for your website, app, or software project. Call +91 90338 78806 or email info.tryangletech@gmail.com.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
