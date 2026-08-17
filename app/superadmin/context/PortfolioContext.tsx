'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import apiClient from '../utils/apiClient';
import { Project, projects as staticProjects } from '../../data/portfolioData';

interface PortfolioContextType {
  projectsList: Project[];
  isLoading: boolean;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  editingProject: Project | null;
  setEditingProject: (project: Project | null) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  deletingProject: Project | null;
  setDeletingProject: (project: Project | null) => void;
  fetchPortfolio: () => Promise<void>;
  saveProject: (projectData: Partial<Project>) => Promise<void>;
  deleteProject: (projectIdOrSlug: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projectsList, setProjectsList] = useState<Project[]>(staticProjects);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  // Fetch live portfolio from PostgreSQL
  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
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

  // Save (Create or Update) Project handler
  const saveProject = async (projectData: Partial<Project>) => {
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
  const deleteProject = async (projectIdOrSlug: string) => {
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
    <PortfolioContext.Provider
      value={{
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
        fetchPortfolio,
        saveProject,
        deleteProject,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
