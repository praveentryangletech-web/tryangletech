'use client';

import React, { useState } from 'react';
import { PortfolioCategoryItem, DEFAULT_PORTFOLIO_CATEGORY } from '@/backend/services/portfolio/category.service';

interface CategoryManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: PortfolioCategoryItem[];
  isLoading: boolean;
  onAddCategory: (name: string) => Promise<void>;
  onDeleteCategory: (idOrName: string) => Promise<void>;
}

export default function CategoryManageModal({
  isOpen,
  onClose,
  categories,
  isLoading,
  onAddCategory,
  onDeleteCategory,
}: CategoryManageModalProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDeleteCat, setPendingDeleteCat] = useState<PortfolioCategoryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a category name.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await onAddCategory(trimmed);
      setSuccessMessage(`Category "${trimmed}" added successfully!`);
      setNewCategoryName('');
      setTimeout(() => setSuccessMessage(''), 3500);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to add category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePromptDelete = (cat: PortfolioCategoryItem) => {
    if (cat.isDefault || cat.name.toLowerCase() === DEFAULT_PORTFOLIO_CATEGORY.toLowerCase()) {
      setErrorMessage(`The default "${DEFAULT_PORTFOLIO_CATEGORY}" category is protected and cannot be deleted.`);
      return;
    }
    setPendingDeleteCat(cat);
    setErrorMessage('');
  };

  const handleConfirmDelete = async (cat: PortfolioCategoryItem) => {
    setIsDeleting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await onDeleteCategory(cat.id || cat.name);
      setSuccessMessage(
        cat.projectCount > 0
          ? `Category "${cat.name}" deleted. ${cat.projectCount} project(s) reassigned to "${DEFAULT_PORTFOLIO_CATEGORY}".`
          : `Category "${cat.name}" deleted successfully.`
      );
      setPendingDeleteCat(null);
      setTimeout(() => setSuccessMessage(''), 4500);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to delete category.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-cat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .modal-cat-scroll::-webkit-scrollbar-track {
          background: #F1F5F9;
          border-radius: 4px;
        }
        .modal-cat-scroll::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 4px;
        }
        .modal-cat-scroll::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
        .cat-item-row:hover {
          background-color: #F8FAFC;
          border-color: #CBD5E1 !important;
        }
        .cat-del-btn:hover {
          background-color: #FEE2E2 !important;
          color: #DC2626 !important;
          border-color: #FECACA !important;
          transform: scale(1.05);
        }
      `}</style>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          animation: 'slideUp 0.25s ease-out',
          overflow: 'hidden',
        }}
      >
        {/* 1. MODAL HEADER */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFBFC',
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--dark-indigo, #1a0b54)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Manage Portfolio Categories
              </h2>
              <span
                style={{
                  backgroundColor: '#EFF6FF',
                  color: 'var(--brand-blue, #1833fe)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '20px',
                  border: '1px solid #DBEAFE',
                }}
              >
                {categories.length} {categories.length === 1 ? 'Category' : 'Categories'}
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Add new categories or delete custom categories. Protected default category handles unassigned projects.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 2. BODY CONTENT (FIXED TOP CONTROLS + SINGLE SCROLLABLE LIST) */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Feedback Messages */}
          {errorMessage && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
                color: '#B91C1C',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                fontSize: '0.825rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div
              style={{
                backgroundColor: '#F0FDF4',
                border: '1px solid #86EFAC',
                color: '#15803D',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                fontSize: '0.825rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* ADD CATEGORY FORM */}
          <form
            onSubmit={handleCreate}
            style={{
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              flexShrink: 0,
            }}
          >
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
              Add New Category
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="e.g. AI & Machine Learning, SaaS Solutions..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.85rem',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  fontWeight: 500,
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting || !newCategoryName.trim()}
                style={{
                  backgroundColor: 'var(--brand-blue, #1833fe)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: isSubmitting || !newCategoryName.trim() ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting || !newCategoryName.trim() ? 0.6 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(24, 51, 254, 0.2)',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {isSubmitting ? (
                  <>
                    <span
                      style={{
                        width: '13px',
                        height: '13px',
                        border: '2px solid #FFFFFF',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 0.8s linear infinite',
                      }}
                    />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>+</span>
                    <span>Add Category</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* ACTIVE CATEGORIES LIST HEADER */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
              flexShrink: 0,
              paddingTop: '4px',
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Categories ({categories.length})
            </span>

            {categories.length > 4 && (
              <input
                type="text"
                placeholder="Filter list..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.75rem',
                  width: '130px',
                  outline: 'none',
                }}
              />
            )}
          </div>

          {/* SINGLE SCROLLABLE CATEGORIES LIST */}
          <div
            className="modal-cat-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingRight: '4px',
              minHeight: '140px',
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: '46px',
                      backgroundColor: '#F1F5F9',
                      borderRadius: '8px',
                      animation: 'pulse 1.5s infinite',
                    }}
                  />
                ))}
              </div>
            ) : filteredCategories.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94A3B8', fontSize: '0.85rem' }}>
                No categories found matching your filter.
              </div>
            ) : (
              filteredCategories.map((cat) => {
                const isProtected = cat.isDefault || cat.name.toLowerCase() === DEFAULT_PORTFOLIO_CATEGORY.toLowerCase();
                const isPendingDelete = pendingDeleteCat?.id === cat.id || pendingDeleteCat?.name === cat.name;

                // INLINE DELETE CONFIRMATION ROW
                if (isPendingDelete) {
                  return (
                    <div
                      key={`del-${cat.id || cat.name}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: '#FEF2F2',
                        border: '1.5px solid #FCA5A5',
                        borderRadius: '10px',
                        gap: '8px',
                        animation: 'slideUp 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991B1B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Delete &quot;{cat.name}&quot;? {cat.projectCount > 0 ? `(${cat.projectCount} project${cat.projectCount > 1 ? 's' : ''} → General)` : ''}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <button
                          type="button"
                          onClick={() => setPendingDeleteCat(null)}
                          disabled={isDeleting}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            color: '#475569',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: isDeleting ? 'not-allowed' : 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleConfirmDelete(cat)}
                          disabled={isDeleting}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#DC2626',
                            color: '#FFFFFF',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: isDeleting ? 'not-allowed' : 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  );
                }

                // STANDARD CATEGORY ROW
                return (
                  <div
                    key={cat.id || cat.name}
                    className="cat-item-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, overflow: 'hidden' }}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          color: 'var(--dark-indigo, #1a0b54)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {cat.name}
                      </span>

                      {isProtected && (
                        <span
                          style={{
                            backgroundColor: '#EEF2FF',
                            color: '#4F46E5',
                            fontSize: '0.675rem',
                            fontWeight: 700,
                            padding: '2px 7px',
                            borderRadius: '12px',
                            border: '1px solid #C7D2FE',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Default Fallback
                        </span>
                      )}

                      <span
                        style={{
                          backgroundColor: '#F1F5F9',
                          color: '#475569',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 7px',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {cat.projectCount} {cat.projectCount === 1 ? 'project' : 'projects'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      {isProtected ? (
                        <span
                          title="Default category is protected and cannot be deleted"
                          style={{
                            fontSize: '0.725rem',
                            color: '#64748B',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            cursor: 'help',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 600,
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <span>Locked</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePromptDelete(cat)}
                          className="cat-del-btn"
                          title={`Delete ${cat.name}`}
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#64748B',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 3. MODAL FOOTER */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#FAFBFC',
            display: 'flex',
            justifyContent: 'flex-end',
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 22px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              transition: 'all 0.15s ease',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
