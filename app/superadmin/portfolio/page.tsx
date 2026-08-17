'use client';

import React from 'react';
import PortfolioTable from './components/PortfolioTable';
import PortfolioDetailsModal from './components/PortfolioDetailsModal';
import PortfolioEditModal from './components/PortfolioEditModal';
import PortfolioDeleteModal from './components/PortfolioDeleteModal';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext';

function PortfolioContentView() {
  const {
    projectsList,
    isLoading,
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

  // Open "Add New Project" modal
  const handleAddNew = () => {
    setEditingProject(null);
    setIsEditModalOpen(true);
  };

  // Open "Edit Project" modal
  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  // Open "Delete Project" modal
  const handleDelete = (project: any) => {
    setDeletingProject(project);
  };

  return (
    <>
      <PortfolioTable
        projectsList={projectsList}
        isLoading={isLoading}
        onSelectProject={(project) => setSelectedProject(project)}
        onEditProject={handleEdit}
        onDeleteProject={handleDelete}
        onAddNewProject={handleAddNew}
      />

      {/* 1. Case Study Details Modal */}
      <PortfolioDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 2. Add / Edit Project Modal */}
      <PortfolioEditModal
        isOpen={isEditModalOpen}
        project={editingProject}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProject(null);
        }}
        onSave={saveProject}
      />

      {/* 3. Delete Confirmation Modal */}
      <PortfolioDeleteModal
        isOpen={!!deletingProject}
        project={deletingProject}
        onClose={() => setDeletingProject(null)}
        onConfirm={deleteProject}
      />
    </>
  );
}

export default function SuperadminPortfolioPage() {
  return (
    <PortfolioProvider>
      <PortfolioContentView />
    </PortfolioProvider>
  );
}
