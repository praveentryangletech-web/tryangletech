import React from 'react';
import { Metadata } from 'next';
import { aboutService } from '@/backend/services/about';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await aboutService.getAboutContent();
    return aboutService.generateAboutMetadata(content);
  } catch (err) {
    console.warn('[AboutLayout] DB error in generateMetadata, using fallback:', err);
    return aboutService.generateAboutMetadata(DEFAULT_ABOUT_CONTENT);
  }
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
