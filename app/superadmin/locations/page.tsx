'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuperadminLocationsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/superadmin/home');
  }, [router]);

  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B' }}>
      Redirecting to Unified Home & Locations CMS...
    </div>
  );
}
