'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function SuperadminLoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [shakeForm, setShakeForm] = useState(false);

  // Frontend SQL Injection detector
  const SQL_INJECTION_PATTERNS = [
    /(\b(SELECT|UNION|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|EXECUTE|TRUNCATE|DECLARE|WAITFOR|BENCHMARK|SLEEP)\b)/i,
    /(--|\/\*|\*\/|@@|char\s*\(|nchar\s*\(|varchar\s*\(|nvarchar\s*\()/i,
    /((\bOR\b|\bAND\b)\s+['"\d\w]+\s*=\s*['"\d\w]+)/i,
    /((\bOR\b|\bAND\b)\s+true\b)/i,
    /('|\")\s*(OR|AND)\s*('|\")?\d+('|\")?\s*=\s*('|\")?\d+/i,
    /('|\")\s*--/i,
    /(;\s*(DROP|SELECT|INSERT|UPDATE|DELETE|ALTER|EXEC))/i,
    /(['"`]\s*;\s*--)/i,
    /(\bUNION\s+(ALL\s+)?SELECT\b)/i,
    /(\b0x[0-9a-fA-F]{4,})/i,
  ];

  const hasSqlInjection = (val: string): boolean => {
    if (!val) return false;
    try {
      const decoded = decodeURIComponent(val);
      return SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(decoded) || pattern.test(val));
    } catch {
      return SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(val));
    }
  };

  // Email format validator
  const validateEmailFormat = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Email address is required.';
    }
    // Check for SQL injection patterns
    if (hasSqlInjection(trimmed)) {
      return 'Disallowed characters or SQL commands detected in email.';
    }
    // Check for stray quotes or illegal characters
    if (/['"`;\\]/.test(trimmed)) {
      return 'Email cannot contain quotes, semicolons, or backslashes.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address (e.g. admin@tryangletech.com).';
    }
    return '';
  };

  // Password validator
  const validatePasswordFormat = (val: string): string => {
    if (!val) {
      return 'Password is required.';
    }
    // Check for SQL injection patterns
    if (hasSqlInjection(val)) {
      return 'Disallowed characters or SQL commands detected in password.';
    }
    if (val.length < 4) {
      return 'Password must be at least 4 characters.';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setEmail(rawVal);
    setErrorMessage('');
    if (touched.email) {
      setEmailError(validateEmailFormat(rawVal));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    setErrorMessage('');
    if (touched.password) {
      setPasswordError(validatePasswordFormat(val));
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setEmailError(validateEmailFormat(email));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    setPasswordError(validatePasswordFormat(password));
  };

  const triggerShake = () => {
    setShakeForm(true);
    setTimeout(() => setShakeForm(false), 500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ email: true, password: true });
    const eErr = validateEmailFormat(email);
    const pErr = validatePasswordFormat(password);

    setEmailError(eErr);
    setPasswordError(pErr);

    if (eErr || pErr) {
      triggerShake();
      return;
    }

    setErrorMessage('');

    // Clean trimmed email
    const cleanEmail = email.trim().replace(/^['"`]|['"`]$/g, '');
    const res = await login(cleanEmail, password);
    if (res.success) {
      router.push('/superadmin');
    } else {
      triggerShake();
      setErrorMessage(res.error || 'Invalid credentials. Please verify your email and password.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        background: 'radial-gradient(ellipse at 15% 15%, rgba(24, 51, 254, 0.16) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(248, 89, 54, 0.14) 0%, transparent 55%), radial-gradient(ellipse at 50% 10%, rgba(99, 102, 241, 0.12) 0%, transparent 60%), linear-gradient(135deg, #eef2ff 0%, #f0f4ff 50%, #fdf2f8 100%)',
        fontFamily: 'var(--_fonts---font-family--inter, Inter, sans-serif)',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes spinCircle {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes shakeCard {
              0%, 100% { transform: translateX(0); }
              20%, 60% { transform: translateX(-8px); }
              40%, 80% { transform: translateX(8px); }
            }
            .admin-login-input:focus {
              border-color: #6366F1 !important;
              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2) !important;
              background-color: #FFFFFF !important;
            }
            .admin-login-input-error {
              border-color: #EF4444 !important;
              background-color: #FEF2F2 !important;
            }
            .admin-login-input-error:focus {
              box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
            }
            .shake-animation {
              animation: shakeCard 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            }
          `,
        }}
      />

      <div
        className={shakeForm ? 'shake-animation' : ''}
        style={{
          width: '100%',
          maxWidth: '460px',
          transition: 'transform 0.2s ease',
        }}>
        {/* Card Container */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(225, 230, 244, 0.9)',
            borderRadius: '24px',
            padding: '2.75rem 2.25rem',
            boxShadow: '0 25px 50px -12px rgba(24, 51, 254, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8)',
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
              Access live inquiries, portfolio, and platform analytics.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#991B1B',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 500,
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email Field */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label
                  htmlFor="admin-email"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#334155',
                  }}>
                  Email address
                </label>
                {touched.email && !emailError && email.trim() && (
                  <span style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    ✓ Valid
                  </span>
                )}
              </div>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="admin@tryangletech.com"
                autoComplete="email"
                className={`admin-login-input ${touched.email && emailError ? 'admin-login-input-error' : ''}`}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#F8FAFC',
                  border: touched.email && emailError ? '1px solid #EF4444' : '1px solid #CBD5E1',
                  borderRadius: '12px',
                  color: '#1E293B',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
              />
              {touched.email && emailError && (
                <p style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '0.35rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {emailError}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label
                  htmlFor="admin-password"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#334155',
                  }}>
                  Password
                </label>
                {touched.password && !passwordError && password.length >= 4 && (
                  <span style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    ✓ Filled
                  </span>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className={`admin-login-input ${touched.password && passwordError ? 'admin-login-input-error' : ''}`}
                  style={{
                    width: '100%',
                    padding: '0.85rem 2.75rem 0.85rem 1rem',
                    backgroundColor: '#F8FAFC',
                    border: touched.password && passwordError ? '1px solid #EF4444' : '1px solid #CBD5E1',
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {touched.password && passwordError && (
                <p style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '0.35rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {passwordError}
                </p>
              )}
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
