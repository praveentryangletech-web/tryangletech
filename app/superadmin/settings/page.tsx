'use client';

import React from 'react';
import SettingsView from './components/SettingsView';
import { useSuperadmin } from '../context/SuperadminContext';

export default function SuperadminSettingsPage() {
  const { dbLatency } = useSuperadmin();

  return <SettingsView dbLatency={dbLatency} />;
}
