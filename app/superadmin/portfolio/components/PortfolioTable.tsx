'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, projects } from '../../../data/portfolioData';

interface PortfolioTableProps {
  onSelectProject: (project: Project) => void;
}

export default function PortfolioTable({ onSelectProject }: PortfolioTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const categories = [
    'ALL',
    'Business Website',
    'E-Commerce',
    'Mobile Application',
    'Custom Software',
    'Graphic Design',
    'Landing Website',
  ];

  const filteredProjects = projects.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.technologies && item.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory =
      categoryFilter === 'ALL' ||
      item.category.toLowerCase() === categoryFilter.toLowerCase() ||
      (categoryFilter === 'E-Commerce' && item.category.includes('E-Commerce')) ||
      (categoryFilter === 'Mobile Application' && item.category.includes('Mobile'));

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: 0, backgroundColor: 'transparent' }}>
      {/* Top Search & Filter Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.5rem 2rem 1.25rem 2rem',
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search portfolio by title, client, tech stack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '0.65rem 1.15rem',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            width: '340px',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: categoryFilter === cat ? 'var(--dark-indigo, #1a0b54)' : '#E2E8F0',
                backgroundColor: categoryFilter === cat ? 'var(--dark-indigo, #1a0b54)' : '#FFFFFF',
                color: categoryFilter === cat ? '#FFFFFF' : '#64748B',
                fontSize: '0.775rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Full-width Edge-to-Edge Table */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.14)' }}>
              <th style={{ padding: '0.85rem 1rem 0.85rem 2rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>PROJECT</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>CATEGORY</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>CLIENT / ROLE</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>TECH STACK</th>
              <th style={{ padding: '0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>LIVE DEMO</th>
              <th style={{ padding: '0.85rem 2rem 0.85rem 1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: '#94A3B8' }}>
                  No portfolio projects found matching your search.
                </td>
              </tr>
            ) : (
              filteredProjects.map((item) => (
                <tr key={item.slug} className="admin-row-hover" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  {/* Project Column */}
                  <td style={{ padding: '0.75rem 1rem 0.75rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: '#F1F5F9',
                          border: '1px solid #E2E8F0',
                          flexShrink: 0,
                          position: 'relative',
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.9rem' }}>
                          {item.title}
                        </div>
                        <div style={{ color: '#64748B', fontSize: '0.75rem', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category Column */}
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <span
                      style={{
                        fontSize: '0.725rem',
                        padding: '3px 8px',
                        borderRadius: '100px',
                        backgroundColor:
                          item.category.includes('Business') ? '#EEF2FF' :
                          item.category.includes('E-Commerce') ? '#FEF3C7' :
                          item.category.includes('Mobile') ? '#F3E8FF' :
                          item.category.includes('Software') ? '#ECFDF5' :
                          item.category.includes('Graphic') ? '#FFE4E6' : '#F1F5F9',
                        color:
                          item.category.includes('Business') ? '#4338CA' :
                          item.category.includes('E-Commerce') ? '#B45309' :
                          item.category.includes('Mobile') ? '#7E22CE' :
                          item.category.includes('Software') ? '#047857' :
                          item.category.includes('Graphic') ? '#BE123C' : '#475569',
                        fontWeight: 800,
                      }}
                    >
                      {item.category}
                    </span>
                  </td>

                  {/* Client & Role */}
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div style={{ fontWeight: 700, color: '#334155', fontSize: '0.825rem' }}>
                      {item.client || item.title}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '0.75rem' }}>
                      {item.role || 'Design & Development'}
                    </div>
                  </td>

                  {/* Tech Stack */}
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', maxWidth: '180px' }}>
                      {item.technologies && item.technologies.length > 0 ? (
                        item.technologies.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            style={{
                              fontSize: '0.675rem',
                              padding: '2px 5px',
                              borderRadius: '4px',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              color: '#475569',
                              fontWeight: 600,
                            }}
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>—</span>
                      )}
                      {item.technologies && item.technologies.length > 2 && (
                        <span style={{ fontSize: '0.675rem', color: '#94A3B8', fontWeight: 600 }}>
                          +{item.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Live Demo Link */}
                  <td style={{ padding: '0.6rem 1rem' }}>
                    {item.liveUrl ? (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: '#1833FE',
                          fontSize: '0.775rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <span>Live Site</span>
                        <span>↗</span>
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Case Study</span>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td style={{ padding: '0.6rem 2rem 0.6rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => onSelectProject(item)}
                        style={{
                          backgroundColor: 'var(--vivid-blue, #4f46e5)',
                          color: '#FFFFFF',
                          padding: '5px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        View Details
                      </button>
                      <Link
                        href={`/portfolio/${item.slug}`}
                        target="_blank"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          color: '#475569',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}
                      >
                        ↗
                      </Link>
                    </div>
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
