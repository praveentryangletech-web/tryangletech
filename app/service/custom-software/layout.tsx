import { Metadata } from "next";
import { servicesService } from "@/backend/services/services";

export async function generateMetadata(): Promise<Metadata> {
  return await servicesService.generateCustomSoftwareMetadata();
}

export default function CustomSoftwareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
