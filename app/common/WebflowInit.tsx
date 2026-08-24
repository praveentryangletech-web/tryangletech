"use client";

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function WebflowInit({ pageId }: { pageId?: string }) {
  const pathname = usePathname();

  // Remove w-mod-ix synchronously before paint on route change
  // This allows Webflow's native CSS (html.w-mod-js:not(.w-mod-ix)) to hide animated 
  // elements before ix2.init() takes over, preventing a flash of visible content.
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  useIsomorphicLayoutEffect(() => {
    // Commented out to prevent the entire page from flashing blank on route change.
    // document.documentElement.classList.remove('w-mod-ix');
  }, [pathname]);

  useEffect(() => {

    // Set site and page attributes on the root HTML element
    document.documentElement.setAttribute('data-wf-site', '68c3feed3b3e541e7d5c098a');
    if (pageId) {
      document.documentElement.setAttribute('data-wf-page', pageId);
    }

    // Use polling to wait for Webflow script to load
    let attempts = 0;
    const initWebflow = () => {
      const Webflow = (window as any).Webflow;
      if (Webflow && Webflow.require) {
        try {
          Webflow.destroy();
          Webflow.ready();
          const ix2 = Webflow.require('ix2');
          if (ix2) {
            ix2.init();
          }
          document.dispatchEvent(new Event('readystatechange'));
        } catch (e) {
          console.warn('Webflow ix2 init error (safe to ignore):', e);
        }

        // Staggered triggers to ensure in-viewport elements and scroll-listeners wake up
        const triggerEvents = () => {
          window.dispatchEvent(new Event('resize'));
          window.dispatchEvent(new Event('scroll'));
        };

        triggerEvents();
        setTimeout(triggerEvents, 100);
        setTimeout(triggerEvents, 300);
        setTimeout(triggerEvents, 600);
      } else if (attempts < 60) {
        attempts++;
        setTimeout(initWebflow, 50);
      }
    };
    
    // Slight delay to allow DOM and SSR hydration to settle
    const timer = setTimeout(initWebflow, 60);
    return () => {
      clearTimeout(timer);
    };
  }, [pathname, pageId]);

  return null;
}
