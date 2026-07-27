"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function WebflowInit({ pageId }: { pageId?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    // If a specific page ID is provided, set it on the HTML element
    if (pageId) {
      document.documentElement.setAttribute('data-wf-page', pageId);
    }

    // Use polling to wait for Webflow script to load
    let attempts = 0;
    const initWebflow = () => {
      if (window.Webflow && window.Webflow.require) {
        window.Webflow.destroy();
        window.Webflow.ready();
        const ix2 = window.Webflow.require('ix2');
        if (ix2) {
          ix2.init();
        }
      } else if (attempts < 50) { // Try for up to 2.5 seconds
        attempts++;
        setTimeout(initWebflow, 50);
      }
    };
    
    // Slight delay to allow DOM to settle
    const timer = setTimeout(initWebflow, 50);
    return () => clearTimeout(timer);
  }, [pathname, pageId]);

  return null;
}
