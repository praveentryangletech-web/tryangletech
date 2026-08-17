'use client';

import React from 'react';
import QuotesTable from './components/QuotesTable';
import { useSuperadmin } from '../context/SuperadminContext';

export default function SuperadminQuotesPage() {
  const { quotes } = useSuperadmin();

  return <QuotesTable quotes={quotes} />;
}
