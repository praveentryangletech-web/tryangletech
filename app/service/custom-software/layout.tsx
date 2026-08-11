import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development Ahmedabad | Tryangle Tech",
  description: "We build custom software around how your business actually works, not off-the-shelf templates. Based in Ahmedabad, serving clients across India.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
