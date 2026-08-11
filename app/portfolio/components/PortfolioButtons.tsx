import React from 'react';
import Link from 'next/link';

export default function PortfolioButtons({ liveUrl }: { liveUrl?: string }) {
  return (
    <>
      <style>{`
        .back-btn-animated {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .back-btn-animated:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(59, 130, 246, 0.25);
        }
        .back-btn-animated:active {
          transform: translateY(-1px);
        }
        .back-btn-animated svg {
          transition: transform 0.3s ease;
        }
        .back-btn-animated:hover svg {
          transform: translateX(-4px);
        }
      `}</style>
      <div style={{ marginTop: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Link href="/portfolio" className="rt-button-body w-inline-block back-btn-animated" style={{ borderRadius: '100px' }}>
          <div className="rt-button-text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </div>
        </Link>
        {liveUrl && (
          <Link href={liveUrl} target="_blank" rel="noopener noreferrer" className="rt-button-body w-inline-block back-btn-animated" style={{ borderRadius: '100px', background: 'transparent', border: '2px solid #1833fe' }}>
            <div className="rt-button-text" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1833fe' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View Live Site
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
