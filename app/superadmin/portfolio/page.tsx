'use client';

import React, { useState } from 'react';
import PortfolioTable from './components/PortfolioTable';
import PortfolioDetailsModal from './components/PortfolioDetailsModal';
import { Project } from '../../data/portfolioData';

export default function SuperadminPortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <PortfolioTable onSelectProject={(project) => setSelectedProject(project)} />

      <PortfolioDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
