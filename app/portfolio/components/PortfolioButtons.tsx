import React from 'react';
import Link from 'next/link';

export default function PortfolioButtons() {
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
      <div style={{ marginTop: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
        <Link href="/portfolio" className="rt-button-body w-inline-block back-btn-animated" style={{ borderRadius: '100px' }}>
          <div className="rt-button-text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </div>
        </Link>
      </div>
    </>
  );
}
