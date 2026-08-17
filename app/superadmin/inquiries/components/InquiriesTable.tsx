'use client';

import React, { useState, useEffect } from 'react';
import { Inquiry } from '../../data/mockData';
import Tooltip from '../../components/Tooltip';

interface InquiriesTableProps {
  inquiries: Inquiry[];
  isLoading?: boolean;
  onSelectInquiry: (inquiry: Inquiry) => void;
  onStatusChange: (id: string, status: Inquiry['status']) => void;
}

export default function InquiriesTable({ inquiries, isLoading, onSelectInquiry, onStatusChange }: InquiriesTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Reset page to 1 when search query, filter, or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, itemsPerPage]);

  const totalItems = filteredInquiries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedInquiries = filteredInquiries.slice(startIndex, endIndex);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 75px)', minHeight: 0, backgroundColor: 'transparent' }}>
      {/* 1. FIXED TOP TOOLBAR & STATUS FILTERS */}
      <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 2rem 1rem 2rem' }}>
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
            <Tooltip key={st} text={st === 'ALL' ? 'Show all lead statuses' : `Filter by ${st} leads`} position="top">
              <button
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
            </Tooltip>
          ))}
        </div>
      </div>

      {/* 2. SCROLLABLE TBODY CONTAINER WITH STICKY THEAD */}
      <div className="admin-scroll-area" style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', width: '100%', minHeight: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#F1F5F9', boxShadow: '0 1px 0 rgba(0, 0, 0, 0.12)' }}>
            <tr>
              <th style={{ padding: '0.85rem 1rem 0.85rem 2rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>CLIENT NAME</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>CONTACT INFO</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>SUBJECTS</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>STATUS</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>DATE</th>
              <th style={{ padding: '0.85rem 2rem 0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={`inquiry-skel-${idx}`} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <td style={{ padding: '0.85rem 1rem 0.85rem 2rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '15px', width: `${60 + (idx % 3) * 15}%` }} />
                  </td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <div className="skeleton-shimmer" style={{ height: '12px', width: '130px' }} />
                      <div className="skeleton-shimmer" style={{ height: '10px', width: '90px' }} />
                    </div>
                  </td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div className="skeleton-shimmer" style={{ height: '16px', width: '50px', borderRadius: '4px' }} />
                      <div className="skeleton-shimmer" style={{ height: '16px', width: '60px', borderRadius: '4px' }} />
                    </div>
                  </td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '22px', width: '80px', borderRadius: '100px' }} />
                  </td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div className="skeleton-shimmer" style={{ height: '12px', width: '65px' }} />
                  </td>
                  <td style={{ padding: '0.6rem 2rem 0.6rem 1rem', textAlign: 'right' }}>
                    <div className="skeleton-shimmer" style={{ height: '26px', width: '95px', borderRadius: '6px', marginLeft: 'auto' }} />
                  </td>
                </tr>
              ))
            ) : paginatedInquiries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: '#94A3B8' }}>
                  No inquiries found matching your filters.
                </td>
              </tr>
            ) : (
              paginatedInquiries.map((item) => (
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
                    <Tooltip text="Change inquiry CRM lead status" position="top">
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
                    </Tooltip>
                  </td>
                  <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', color: '#64748B' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '0.6rem 2rem 0.6rem 1rem', textAlign: 'right' }}>
                    <Tooltip text="View inquiry message & details" position="top">
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
                    </Tooltip>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. TFOOTER PAGINATION BAR */}
      <div
        style={{
          flexShrink: 0,
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          padding: '0.85rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.03)',
        }}
      >
        {/* Left: Summary & Rows per Page Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.825rem', color: '#64748B' }}>
          <span>
            Showing <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{totalItems > 0 ? startIndex + 1 : 0}</strong> to{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{endIndex}</strong> of{' '}
            <strong style={{ color: 'var(--dark-indigo, #1a0b54)' }}>{totalItems}</strong> inquiries
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.775rem' }}>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.775rem',
                outline: 'none',
                backgroundColor: '#F8FAFC',
                fontWeight: 700,
                color: '#334155',
                cursor: 'pointer',
              }}
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Right: Page Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Tooltip text="Go to previous page" position="top">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: currentPage === 1 ? '#F8FAFC' : '#FFFFFF',
                color: currentPage === 1 ? '#CBD5E1' : '#334155',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '0.775rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>‹</span>
              <span>Prev</span>
            </button>
          </Tooltip>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                style={{
                  minWidth: '30px',
                  height: '30px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: currentPage === pageNum ? 'var(--dark-indigo, #1a0b54)' : '#E2E8F0',
                  backgroundColor: currentPage === pageNum ? 'var(--dark-indigo, #1a0b54)' : '#FFFFFF',
                  color: currentPage === pageNum ? '#FFFFFF' : '#475569',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {pageNum}
              </button>
            );
          })}

          <Tooltip text="Go to next page" position="top">
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: currentPage === totalPages || totalPages === 0 ? '#F8FAFC' : '#FFFFFF',
                color: currentPage === totalPages || totalPages === 0 ? '#CBD5E1' : '#334155',
                cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
                fontSize: '0.775rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Next</span>
              <span>›</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
