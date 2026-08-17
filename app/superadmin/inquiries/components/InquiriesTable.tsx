'use client';

import React, { useState } from 'react';
import { Inquiry } from '../../data/mockData';

interface InquiriesTableProps {
  inquiries: Inquiry[];
  onSelectInquiry: (inquiry: Inquiry) => void;
  onStatusChange: (id: string, status: Inquiry['status']) => void;
}

export default function InquiriesTable({ inquiries, onSelectInquiry, onStatusChange }: InquiriesTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: 0, backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.5rem 2rem 1.25rem 2rem' }}>
        <input
          type="text"
          placeholder="🔍 Search inquiries by client, email, phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '0.65rem 1.15rem',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            width: '320px',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        />
        <div style={{ display: 'flex', gap: '6px' }}>
          {['ALL', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'ARCHIVED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: statusFilter === st ? 'var(--dark-indigo, #1a0b54)' : '#E2E8F0',
                backgroundColor: statusFilter === st ? 'var(--dark-indigo, #1a0b54)' : '#FFFFFF',
                color: statusFilter === st ? '#FFFFFF' : '#64748B',
                fontSize: '0.775rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}>
              {st}
            </button>
          ))}
        </div>
      </div>

      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.14)' }}>
              <th style={{ padding: '0.85rem 1rem 0.85rem 2rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>CLIENT NAME</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>CONTACT INFO</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>SUBJECTS</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>STATUS</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>DATE</th>
              <th style={{ padding: '0.85rem 2rem 0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: '#94A3B8' }}>
                  No inquiries found matching your filters.
                </td>
              </tr>
            ) : (
              filteredInquiries.map((item) => (
                <tr key={item.id} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  <td style={{ padding: '0.75rem 1rem 0.75rem 2rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.9rem' }}>
                    {item.firstName} {item.lastName}
                  </td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div style={{ color: 'var(--vivid-blue, #4f46e5)', fontWeight: 700, fontSize: '0.825rem' }}>{item.email}</div>
                    <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{item.phone}</div>
                  </td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {item.subjects.map((sub: string) => (
                        <span key={sub} style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#F1F5F9', color: '#475569', fontWeight: 600 }}>
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <select
                      value={item.status}
                      onChange={(e) => onStatusChange(item.id, e.target.value as Inquiry['status'])}
                      style={{
                        backgroundColor: item.status === 'NEW' ? '#DCFCE7' : item.status === 'CONTACTED' ? '#E0F2FE' : item.status === 'IN_PROGRESS' ? '#EEF2FF' : '#F1F5F9',
                        color: item.status === 'NEW' ? '#15803D' : item.status === 'CONTACTED' ? '#0369A1' : item.status === 'IN_PROGRESS' ? '#4338CA' : '#475569',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        outline: 'none',
                      }}>
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </td>
                  <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', color: '#64748B' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.6rem 2rem 0.6rem 1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => onSelectInquiry(item)}
                      style={{
                        backgroundColor: 'var(--vivid-blue, #4f46e5)',
                        color: '#FFFFFF',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}>
                      View Message
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
