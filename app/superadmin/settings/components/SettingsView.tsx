'use client';

import React from 'react';

interface SettingsViewProps {
  dbLatency?: number;
}

export default function SettingsView({ dbLatency = 24 }: SettingsViewProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '1.25rem 0' }}>
      <div className="admin-white-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          🐘 Supabase PostgreSQL Configuration
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.8rem', fontWeight: 700 }}>DATABASE HOST:</span>
            <strong>aws-0-ap-northeast-1.pooler.supabase.com (Port 6543)</strong>
          </div>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.8rem', fontWeight: 700 }}>LIVE STATUS:</span>
            <span style={{ color: '#10B981', fontWeight: 800 }}>🟢 Connected & Healthy ({dbLatency}ms latency)</span>
          </div>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.8rem', fontWeight: 700 }}>PRISMA SCHEMAS:</span>
            <code>ContactSubmission, NewsletterSubscriber, QuoteRequest, BlogPost</code>
          </div>
        </div>
      </div>

      <div className="admin-white-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          ⚡ Quick Commands
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '14px', border: '1px solid #EDF2F7' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>Visual Database Studio:</div>
            <code style={{ color: '#4F46E5', fontWeight: 800, fontSize: '0.95rem' }}>npx prisma studio</code>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '14px', border: '1px solid #EDF2F7' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>Sync Database Schema:</div>
            <code style={{ color: '#0284C7', fontWeight: 800, fontSize: '0.95rem' }}>npx prisma db push</code>
          </div>
        </div>
      </div>
    </div>
  );
}
