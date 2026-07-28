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
      const Webflow = (window as any).Webflow;
      if (Webflow && Webflow.require) {
        Webflow.destroy();
        Webflow.ready();
        const ix2 = Webflow.require('ix2');
        if (ix2) {
          try {
            ix2.init();
          } catch (e) {
            console.warn("Webflow ix2 init error (safe to ignore):", e);
          }
        }
        document.dispatchEvent(new Event('readystatechange'));
        
        // Dispatch a scroll event immediately so Webflow triggers animations for elements already in view
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
        }, 50);

        // Dispatch resize and scroll events once when window fully loads (images loaded) to fix coordinates.
        const handleLoad = () => {
          window.dispatchEvent(new Event('resize'));
          window.dispatchEvent(new Event('scroll'));
        };

        if (document.readyState === 'complete') {
          handleLoad();
        } else {
          window.addEventListener('load', handleLoad);
        }
      } else if (attempts < 50) { // Try for up to 2.5 seconds
        attempts++;
        setTimeout(initWebflow, 50);
      }
    };
    
    // Slight delay to allow DOM to settle
    const timer = setTimeout(initWebflow, 50);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', () => window.dispatchEvent(new Event('resize')));
    };
  }, [pathname, pageId]);

  return null;
}
