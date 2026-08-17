'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SuperadminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      if (email.trim() && password.trim()) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('superadmin_auth', 'true');
        }
        router.push('/superadmin');
      } else {
        setErrorMessage('Please enter both email and password.');
        setIsLoading(false);
      }
    }, 500);
  };

  const handleQuickDemo = () => {
    setEmail('admin@tryangletech.com');
    setPassword('tryangle2026');
    setIsLoading(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('superadmin_auth', 'true');
      }
      router.push('/superadmin');
    }, 300);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        backgroundColor: '#f0f4ff',
        fontFamily: 'var(--_fonts---font-family--inter, Inter, sans-serif)',
      }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes spinCircle {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .admin-login-input:focus {
              border-color: #6366F1 !important;
              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2) !important;
            }
          `,
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '460px',
        }}>
        {/* Card Container */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e1e6f4',
            borderRadius: '24px',
            padding: '2.75rem 2.25rem',
            boxShadow: '0 20px 40px rgba(24, 72, 212, 0.08)',
          }}>
          {/* Header & Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                textDecoration: 'none',
              }}>
              <Image
                src="/logo.png"
                alt="TryangleTech"
                width={160}
                height={42}
                style={{ objectFit: 'contain', height: '38px', width: 'auto' }}
              />
            </Link>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                borderRadius: '100px',
                backgroundColor: '#EEF2FF',
                color: '#4338CA',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#6366F1',
                }}
              />
              Superadmin Portal
            </div>

            <h1
              style={{
                fontSize: '1.65rem',
                fontWeight: 800,
                color: 'var(--dark-indigo, #1a0b54)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
              Sign in to Control Center
            </h1>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#64748B',
                marginTop: '0.5rem',
                marginBottom: 0,
              }}>
              Access live inquiries, quote requests, and platform analytics.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#991B1B',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
                textAlign: 'center',
                fontWeight: 500,
              }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="admin-email"
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '0.4rem',
                }}>
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tryangletech.com"
                required
                className="admin-login-input"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '12px',
                  color: '#1E293B',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="admin-password"
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '0.4rem',
                }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="admin-login-input"
                  style={{
                    width: '100%',
                    padding: '0.85rem 2.75rem 0.85rem 1rem',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '12px',
                    color: '#1E293B',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    padding: '4px',
                  }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  defaultChecked
                  style={{
                    accentColor: '#4F46E5',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                />
                Remember this session
              </label>
              <span style={{ color: '#4F46E5', fontSize: '0.8rem', fontWeight: 600 }}>
                🔒 256-bit SSL
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.95rem 1.5rem',
                backgroundColor: 'var(--vivid-blue, #4f46e5)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
                opacity: isLoading ? 0.8 : 1,
              }}>
              {isLoading ? (
                <>
                  <svg
                    style={{
                      width: '18px',
                      height: '18px',
                      animation: 'spinCircle 0.8s linear infinite',
                    }}
                    viewBox="0 0 24 24"
                    fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Shortcut */}
          <div
            style={{
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid #EDF2F7',
              textAlign: 'center',
            }}>
            <button
              type="button"
              onClick={handleQuickDemo}
              style={{
                background: '#F1F5F9',
                border: '1px solid #E2E8F0',
                color: '#334155',
                padding: '0.6rem 1.2rem',
                borderRadius: '100px',
                fontSize: '0.825rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}>
              ⚡ <span>Quick 1-Click Demo Login</span>
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link
            href="/"
            style={{
              color: '#64748B',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
            ← Back to TryangleTech Website
          </Link>
        </div>
      </div>
    </div>
  );
}
