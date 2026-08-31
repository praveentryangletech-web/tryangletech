import { Metadata } from 'next';
import { servicesService } from '@/backend/services/services/services.service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return servicesService.generateDigitalMarketingMetadata();
}

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
