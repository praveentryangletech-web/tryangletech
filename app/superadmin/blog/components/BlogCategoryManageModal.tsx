'use client';

import React, { useState } from 'react';
import { PortfolioCategoryItem, DEFAULT_PORTFOLIO_CATEGORY } from '@/backend/services/portfolio/category.service';

interface BlogCategoryManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: PortfolioCategoryItem[];
  isLoading: boolean;
  onAddCategory: (name: string) => Promise<void>;
  onDeleteCategory: (idOrName: string) => Promise<void>;
}

export default function BlogCategoryManageModal({
  isOpen,
  onClose,
  categories,
  isLoading,
  onAddCategory,
  onDeleteCategory,
}: BlogCategoryManageModalProps) {
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
          ? `Category "${cat.name}" deleted. Any assigned items reassigned to "${DEFAULT_PORTFOLIO_CATEGORY}".`
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
        padding: '1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting && !isDeleting) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
          animation: 'modalSlideUp 0.25s ease-out forwards',
        }}
      >
        {/* Pinned Top Container */}
        <div style={{ flexShrink: 0 }}>
          {/* Header */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F8FAFC',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(24, 51, 254, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-blue, #1833fe)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
                  Manage Categories
                </h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>
                  Add, view, and manage dynamic categories for Blog & Portfolio
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting || isDeleting}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94A3B8',
                padding: '4px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div
              style={{
                margin: '1rem 1.5rem 0',
                padding: '0.75rem 1rem',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '8px',
                color: '#DC2626',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div
              style={{
                margin: '1rem 1.5rem 0',
                padding: '0.75rem 1rem',
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '8px',
                color: '#16A34A',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Add Category Form */}
          <div style={{ padding: '1.25rem 1.5rem 0.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Add New Category
            </label>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="e.g. AI & Machine Learning, DevOps..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                disabled={isSubmitting || isDeleting}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.85rem',
                  outline: 'none',
                  backgroundColor: '#F8FAFC',
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting || !newCategoryName.trim()}
                style={{
                  backgroundColor: 'var(--brand-blue, #1833fe)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: isSubmitting || !newCategoryName.trim() ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting || !newCategoryName.trim() ? 0.6 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="agy-spin" style={{ width: '12px', height: '12px', border: '2px solid #FFF', borderTopColor: 'transparent', borderRadius: '50%' }} />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>+</span>
                    <span>Add Category</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Search / Filter Active Categories */}
          <div style={{ padding: '0.5rem 1.5rem 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Categories ({categories.length})
            </span>
            {categories.length > 5 && (
              <input
                type="text"
                placeholder="Search..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.75rem',
                  outline: 'none',
                  width: '120px',
                }}
              />
            )}
          </div>
        </div>

        {/* Scrollable Category List Container */}
        <div
          className="modal-cat-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.25rem 1.5rem 1.25rem',
            minHeight: '160px',
            maxHeight: '340px',
          }}
        >
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="agy-skeleton"
                  style={{
                    height: '42px',
                    borderRadius: '8px',
                  }}
                />
              ))}
            </div>
          ) : filteredCategories.length === 0 ? (
            <div style={{ padding: '2rem 0', textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem' }}>
              No categories found matching &quot;{searchFilter}&quot;.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filteredCategories.map((cat) => {
                const isDefault = cat.isDefault || cat.name.toLowerCase() === DEFAULT_PORTFOLIO_CATEGORY.toLowerCase();
                const isPendingDelete = pendingDeleteCat?.id === cat.id || pendingDeleteCat?.name === cat.name;

                return (
                  <div
                    key={cat.id || cat.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      backgroundColor: isPendingDelete ? '#FEF2F2' : isDefault ? '#F8FAFC' : '#FFFFFF',
                      border: isPendingDelete ? '1px solid #FCA5A5' : isDefault ? '1px solid #E2E8F0' : '1px solid #E2E8F0',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isPendingDelete ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991B1B' }}>
                            Delete &quot;{cat.name}&quot;?
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                              cursor: 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleConfirmDelete(cat)}
                            disabled={isDeleting}
                            style={{
                              padding: '4px 12px',
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
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark-indigo, #1a0b54)' }}>
                            {cat.name}
                          </span>
                          {isDefault && (
                            <span
                              style={{
                                fontSize: '0.675rem',
                                fontWeight: 800,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                backgroundColor: '#EFF6FF',
                                color: 'var(--brand-blue, #1833fe)',
                                border: '1px solid #BFDBFE',
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em',
                              }}
                            >
                              Default / Fallback
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {isDefault ? (
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontStyle: 'italic' }}>
                              Protected
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handlePromptDelete(cat)}
                              disabled={isSubmitting || isDeleting}
                              title={`Delete "${cat.name}" category`}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #FECACA',
                                color: '#DC2626',
                                borderRadius: '6px',
                                padding: '4px 7px',
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
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            flexShrink: 0,
            padding: '1rem 1.5rem',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            disabled={isSubmitting || isDeleting}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: '8px',
              border: '1.5px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
