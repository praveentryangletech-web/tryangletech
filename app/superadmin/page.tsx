'use client';

import React from 'react';
import OverviewDashboard from './components/OverviewDashboard';
import InquiryDetailsModal from './inquiries/components/InquiryDetailsModal';
import { useSuperadmin } from './context/SuperadminContext';

export default function SuperadminOverviewPage() {
  const {
    inquiries,
    quotes,
    selectedInquiry,
    setSelectedInquiry,
    updateInquiryStatus,
  } = useSuperadmin();

  return (
    <>
      <OverviewDashboard
        inquiries={inquiries}
        quotes={quotes}
        onSelectInquiry={(inq) => setSelectedInquiry(inq)}
      />

      <InquiryDetailsModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onStatusChange={updateInquiryStatus}
      />
    </>
  );
}
