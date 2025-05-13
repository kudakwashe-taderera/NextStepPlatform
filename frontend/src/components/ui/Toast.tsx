import React, { ReactNode } from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';

interface ToasterProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export function Toaster({ position = 'top-right' }: ToasterProps) {
  return (
    <HotToaster
      position={position}
      toastOptions={{
        className: 'rounded-md shadow-lg p-4',
        duration: 5000,
        success: {
          className: 'bg-green-50 text-green-800 border border-green-200',
          iconTheme: {
            primary: '#22c55e',
            secondary: '#ffffff',
          },
        },
        error: {
          className: 'bg-red-50 text-red-800 border border-red-200',
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}

export interface ToastProps {
  title?: string;
  description: string;
  action?: ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
}

// This is just a type definition component, the actual toast is handled by react-hot-toast
export function Toast({ title, description, action, variant = 'default', duration }: ToastProps) {
  return null;
}
