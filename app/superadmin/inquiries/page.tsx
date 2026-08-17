'use client';

import React from 'react';
import InquiriesTable from './components/InquiriesTable';
import InquiryDetailsModal from './components/InquiryDetailsModal';
import { InquiriesProvider, useInquiries } from '../context/InquiriesContext';

function InquiriesView() {
  const { inquiries, selectedInquiry, setSelectedInquiry, updateInquiryStatus, isLoading } = useInquiries();

  return (
    <>
      <InquiriesTable
        inquiries={inquiries}
        isLoading={isLoading}
        onSelectInquiry={(inq) => setSelectedInquiry(inq)}
        onStatusChange={updateInquiryStatus}
      />

      <InquiryDetailsModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onStatusChange={updateInquiryStatus}
      />
    </>
  );
}

export default function SuperadminInquiriesPage() {
  return (
    <InquiriesProvider>
      <InquiriesView />
    </InquiriesProvider>
  );
}
