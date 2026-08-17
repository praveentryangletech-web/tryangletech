'use client';

import React from 'react';
import { Quote } from '../../data/mockData';

interface QuotesTableProps {
  quotes: Quote[];
}

export default function QuotesTable({ quotes }: QuotesTableProps) {
  return (
    <div style={{ padding: '1.25rem 0', backgroundColor: 'transparent' }}>
      <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
        Client Project Quote Requests
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.14)' }}>
              <th style={{ padding: '0.75rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>CLIENT</th>
              <th style={{ padding: '0.75rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>SERVICE</th>
              <th style={{ padding: '0.75rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>BUDGET</th>
              <th style={{ padding: '0.75rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>REQUIREMENTS</th>
              <th style={{ padding: '0.75rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.9rem' }}>{q.clientName}</div>
                  <div style={{ color: 'var(--vivid-blue, #4f46e5)', fontSize: '0.8rem', fontWeight: 700 }}>{q.email}</div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{q.phone}</div>
                </td>
                <td style={{ padding: '0.6rem 0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '100px', backgroundColor: '#EEF2FF', color: '#4338CA', fontWeight: 800 }}>
                    {q.serviceType}
                  </span>
                </td>
                <td style={{ padding: '0.6rem 0.75rem', fontWeight: 800, color: '#059669', fontSize: '0.875rem' }}>
                  {q.budget}
                </td>
                <td style={{ padding: '0.6rem 0.75rem', fontSize: '0.825rem', color: '#475569', maxWidth: '400px' }}>
                  {q.details}
                </td>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right' }}>
                  <a
                    href={`mailto:${q.email}?subject=TryangleTech Proposal for ${q.serviceType}`}
                    style={{
                      backgroundColor: 'var(--vivid-blue, #4f46e5)',
                      color: '#FFFFFF',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'inline-block',
                    }}>
                    ✉️ Send Proposal
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
