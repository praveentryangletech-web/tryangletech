'use client';

import React from 'react';
import InquiriesTable from './components/InquiriesTable';
import InquiryDetailsModal from './components/InquiryDetailsModal';
import { useSuperadmin } from '../context/SuperadminContext';

export default function SuperadminInquiriesPage() {
  const { inquiries, selectedInquiry, setSelectedInquiry, updateInquiryStatus, isLoading } = useSuperadmin();

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
