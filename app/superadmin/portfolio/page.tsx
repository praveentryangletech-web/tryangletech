'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PortfolioTable from './components/PortfolioTable';
import PortfolioDetailsModal from './components/PortfolioDetailsModal';
import PortfolioEditModal from './components/PortfolioEditModal';
import PortfolioDeleteModal from './components/PortfolioDeleteModal';
import { Project, projects as staticProjects } from '../../data/portfolioData';
import apiClient from '../utils/apiClient';

export default function SuperadminPortfolioPage() {
  const [projectsList, setProjectsList] = useState<Project[]>(staticProjects);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  // Fetch live portfolio from PostgreSQL
  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await apiClient.get<Project[]>('/api/portfolio');
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setProjectsList(res.data);
      }
    } catch (err) {
      console.warn('Failed to load live portfolio, using static fallback:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  // Open "Add New Project" modal
  const handleAddNew = () => {
    setEditingProject(null);
    setIsEditModalOpen(true);
  };

  // Open "Edit Project" modal
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  // Open "Delete Project" modal
  const handleDelete = (project: Project) => {
    setDeletingProject(project);
  };

  // Save (Create or Update) Project handler
  const handleSaveProject = async (projectData: Partial<Project>) => {
    if (editingProject) {
      const targetId = (editingProject as any).id || editingProject.slug;

      // 1. Optimistic Update
      setProjectsList((prev) =>
        prev.map((p) => ((p as any).id === targetId || p.slug === editingProject.slug ? { ...p, ...projectData } : p))
      );

      // 2. Persist to Supabase PostgreSQL
      const res = await apiClient.patch('/api/portfolio', { id: targetId, ...projectData });
      if (!res.success) {
        throw new Error(res.error || 'Failed to update project in database.');
      }
    } else {
      // Create new project
      const res = await apiClient.post<Project>('/api/portfolio', projectData);
      if (!res.success) {
        throw new Error(res.error || 'Failed to create project in database.');
      }

      if (res.data) {
        setProjectsList((prev) => [res.data as Project, ...prev]);
      }
    }

    // Refresh from DB to guarantee sync
    fetchPortfolio();
  };

  // Delete Project handler
  const handleConfirmDelete = async (projectIdOrSlug: string) => {
    // 1. Optimistic removal
    setProjectsList((prev) => prev.filter((p) => (p as any).id !== projectIdOrSlug && p.slug !== projectIdOrSlug));

    // 2. Persist deletion in Supabase PostgreSQL
    const res = await apiClient.delete('/api/portfolio', { params: { id: projectIdOrSlug } });
    if (!res.success) {
      throw new Error(res.error || 'Failed to delete project from database.');
    }

    fetchPortfolio();
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
        onSave={handleSaveProject}
      />

      {/* 3. Delete Confirmation Modal */}
      <PortfolioDeleteModal
        isOpen={!!deletingProject}
        project={deletingProject}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
