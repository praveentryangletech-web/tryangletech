'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  subjects: string[];
}

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactContextType {
  formData: ContactFormData;
  status: SubmissionStatus;
  errorMessage: string;
  setFormField: (field: keyof Omit<ContactFormData, 'subjects'>, value: string) => void;
  toggleSubject: (subject: string) => void;
  submitForm: () => Promise<boolean>;
  resetForm: () => void;
}

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
  subjects: [],
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const setFormField = (field: keyof Omit<ContactFormData, 'subjects'>, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSubject = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setStatus('idle');
    setErrorMessage('');
  };

  const submitForm = async (): Promise<boolean> => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData(initialFormData);
        return true;
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit form. Please check your inputs.');
        return false;
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage(err?.message || 'Network error. Please try again later.');
      return false;
    }
  };
const value:ContactContextType={
  formData,
  status,
  errorMessage,
  setFormField,
  toggleSubject,
  submitForm,
  resetForm,
}
  return (
    <ContactContext.Provider
      value={value}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
}
