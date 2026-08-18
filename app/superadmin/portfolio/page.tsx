'use client';

import React from 'react';
import PortfolioTable from './components/PortfolioTable';
import PortfolioDetailsModal from './components/PortfolioDetailsModal';
import PortfolioEditModal from './components/PortfolioEditModal';
import PortfolioDeleteModal from './components/PortfolioDeleteModal';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext';

/**
 * PortfolioContentView Component
 * 
 * Houses the portfolio data table, preview modals, edit/create forms,
 * and delete confirmation dialogs connected to PortfolioContext.
 */
function PortfolioContentView() {
  const {
    selectedProject,
    setSelectedProject,
    editingProject,
    setEditingProject,
    isEditModalOpen,
    setIsEditModalOpen,
    deletingProject,
    setDeletingProject,
    saveProject,
    deleteProject,
  } = usePortfolio();

  /**
   * Open "Add New Project" modal
   * 
   * Clears editing target and opens the blank project creation modal.
   */
  const handleAddNew = () => {
    setEditingProject(null);
    setIsEditModalOpen(true);
  };

  /**
   * Open "Edit Project" modal
   * 
   * Pre-populates the modal form with the selected project data.
   * 
   * @param {any} project - The project record to edit
   */
  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  /**
   * Open "Delete Project" confirmation modal
   * 
   * Sets the project target to be deleted upon confirmation.
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
        onSelectProject={(project) => setSelectedProject(project)}
        onEditProject={handleEdit}
        onDeleteProject={handleDelete}
        onAddNewProject={handleAddNew}
      />

      {/* 2. Case Study Details Modal */}
      <PortfolioDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 3. Add / Edit Project Modal */}
      <PortfolioEditModal
        isOpen={isEditModalOpen}
        project={editingProject}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProject(null);
        }}
        onSave={saveProject}
      />

      {/* 4. Delete Confirmation Modal */}
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
