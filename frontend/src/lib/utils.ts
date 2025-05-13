import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ApiResponse, ValidationRule, ValidationRules, ValidationResult } from '@/types';

/**
 * Combines multiple class names and Tailwind CSS classes together without conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Truncates a string to a specified length
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Converts a file size in bytes to a human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generates a random ID
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Create a debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format a number to a currency string
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Create a throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Validate a form based on validation rules
 */
export function validateForm(
  data: Record<string, any>,
  rules: ValidationRules
): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Check each field against its rules
  Object.entries(rules).forEach(([field, rule]) => {
    // Skip validation if the field doesn't exist in the data
    if (!(field in data)) return;
    
    const value = data[field];
    
    // Required field
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required`;
      return; // Skip other validations for this field
    }
    
    // Min length
    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} must be at least ${rule.minLength} characters`;
    }
    
    // Max length
    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} must be less than ${rule.maxLength} characters`;
    }
    
    // Email validation
    if (rule.isEmail && typeof value === 'string' && value.trim() !== '') {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(value)) {
        errors[field] = 'Please enter a valid email address';
      }
    }
    
    // Pattern matching
    if (rule.pattern && typeof value === 'string' && value.trim() !== '') {
      if (!rule.pattern.test(value)) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is not in the correct format`;
      }
    }
    
    // Matches another field
    if (rule.matches && typeof value === 'string' && value.trim() !== '') {
      if (data[rule.matches] !== value) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} must match ${rule.matches.replace('_', ' ')}`;
      }
    }
    
    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is invalid`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}