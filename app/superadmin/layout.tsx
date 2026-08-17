import React from 'react';
import type { Metadata } from 'next';
import SuperadminShell from './components/SuperadminShell';

export const metadata: Metadata = {
  title: 'Control Center | TryangleTech',
  description: 'TryangleTech Executive Control Center & Lead Management',
};

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperadminShell>{children}</SuperadminShell>;
}
