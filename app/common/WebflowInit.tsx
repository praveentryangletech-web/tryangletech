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
    // Remove w-mod-ix to let Webflow's native CSS hide animated elements before ix2.init()
    document.documentElement.classList.remove('w-mod-ix');
  }, [pathname]);

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
        // Prevent React 18 Strict Mode from double-firing the initialization and causing a jump
        if ((window as any).__wf_loaded_pathname === pathname) {
          return;
        }
        (window as any).__wf_loaded_pathname = pathname;

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
        // Give Webflow 50ms to fully calculate and apply all initial inline styles.
        // Then dispatch a scroll event so Webflow 
        // immediately triggers animations for elements already in the viewport.
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
          window.dispatchEvent(new Event('scroll'));
        }, 100);
      } else if (attempts < 50) { // Try for up to 2.5 seconds
        attempts++;
        setTimeout(initWebflow, 50);
      }
    };
    
    // Slight delay to allow DOM to settle
    const timer = setTimeout(initWebflow, 50);
    return () => {
      clearTimeout(timer);
    };
  }, [pathname, pageId]);

  return null;
}
