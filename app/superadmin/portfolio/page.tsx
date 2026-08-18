'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PortfolioTable from './components/PortfolioTable';
import PortfolioDeleteModal from './components/PortfolioDeleteModal';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext';

/**
 * PortfolioContentView Component
 * 
 * Houses the portfolio data table, preview modals, full-page edit/create navigation,
 * and delete confirmation dialogs connected to PortfolioContext.
 */
function PortfolioContentView() {
  const router = useRouter();
  const {
    deletingProject,
    setDeletingProject,
    deleteProject,
  } = usePortfolio();

  /**
   * Navigate to the full-page Case Study Editor (Create mode)
   */
  const handleAddNew = () => {
    router.push('/superadmin/portfolio/editor');
  };

  /**
   * Navigate to the full-page Case Study Editor (Edit mode)
   * 
   * @param {any} project - The project record to edit
   */
  const handleEdit = (project: any) => {
    const targetId = project.id || project.slug;
    router.push(`/superadmin/portfolio/editor?id=${targetId}`);
  };

  /**
   * Open "Delete Project" confirmation modal
   * 
   * @param {any} project - The project record to delete
   */
  const handleDelete = (project: any) => {
    setDeletingProject(project);
  };

  return (
    <>
      {/* 1. Server-Paginated Interactive Portfolio Table */}
      <PortfolioTable
        onEditProject={handleEdit}
        onDeleteProject={handleDelete}
        onAddNewProject={handleAddNew}
      />

      {/* 2. Delete Confirmation Modal */}
      <PortfolioDeleteModal
        isOpen={!!deletingProject}
        project={deletingProject}
        onClose={() => setDeletingProject(null)}
        onConfirm={deleteProject}
      />
    </>
  );
}

/**
 * SuperadminPortfolioPage Component
 * 
 * Root Superadmin page for managing portfolio case studies, wrapped in PortfolioProvider.
 */
export default function SuperadminPortfolioPage() {
  return (
    <PortfolioProvider>
      <PortfolioContentView />
    </PortfolioProvider>
  );
}
