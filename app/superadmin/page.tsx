'use client';

import React from 'react';
import OverviewDashboard from './components/OverviewDashboard';
import InquiryDetailsModal from './inquiries/components/InquiryDetailsModal';
import { InquiriesProvider, useInquiries } from './context/InquiriesContext';

function OverviewContent() {
  const {
    inquiries,
    selectedInquiry,
    setSelectedInquiry,
    updateInquiryStatus,
  } = useInquiries();

  return (
    <>
      <OverviewDashboard
        inquiries={inquiries}
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

export default function SuperadminOverviewPage() {
  return (
    <InquiriesProvider>
      <OverviewContent />
    </InquiriesProvider>
  );
}
