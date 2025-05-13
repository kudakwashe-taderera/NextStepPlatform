import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiResponse, ValidationRule, ValidationRules, ValidationResult } from "@/types";

/**
 * Combine class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a string
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
 * Helper function to format API errors into a readable format
 */
export function formatApiErrors(
  error: string | Record<string, string | string[]> | undefined
): string {
  if (!error) return "An unknown error occurred";
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (typeof error === 'object') {
    // If it's a nested object with field names as keys
    return Object.entries(error)
      .map(([field, message]) => {
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ');
        const errorMsg = Array.isArray(message) ? message.join(', ') : message;
        return `${fieldName}: ${errorMsg}`;
      })
      .join('; ');
  }
  
  return 'An unknown error occurred';
}

/**
 * A simple form validation helper
 */
export function validateForm(fields: Record<string, any>, rules: ValidationRules): ValidationResult {
  const errors: Record<string, string> = {};
  let isValid = true;
  
  Object.entries(rules).forEach(([fieldName, fieldRules]) => {
    const value = fields[fieldName];
    
    // Required check
    if (fieldRules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[fieldName] = `${fieldName.replace('_', ' ')} is required`;
      isValid = false;
      return;
    }
    
    if (value) {
      // Minimum length check
      if (fieldRules.minLength && typeof value === 'string' && value.length < fieldRules.minLength) {
        errors[fieldName] = `${fieldName.replace('_', ' ')} must be at least ${fieldRules.minLength} characters`;
        isValid = false;
        return;
      }
      
      // Maximum length check
      if (fieldRules.maxLength && typeof value === 'string' && value.length > fieldRules.maxLength) {
        errors[fieldName] = `${fieldName.replace('_', ' ')} must be at most ${fieldRules.maxLength} characters`;
        isValid = false;
        return;
      }
      
      // Email format check
      if (fieldRules.isEmail && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[fieldName] = 'Please enter a valid email address';
          isValid = false;
          return;
        }
      }
      
      // Pattern check
      if (fieldRules.pattern && typeof value === 'string') {
        if (!fieldRules.pattern.test(value)) {
          errors[fieldName] = `${fieldName.replace('_', ' ')} is invalid`;
          isValid = false;
          return;
        }
      }
      
      // Password match check
      if (fieldRules.matches && fields[fieldRules.matches] !== value) {
        errors[fieldName] = `${fieldName.replace('_', ' ')} does not match ${fieldRules.matches.replace('_', ' ')}`;
        isValid = false;
        return;
      }
      
      // Custom validation
      if (fieldRules.custom && !fieldRules.custom(value)) {
        errors[fieldName] = `${fieldName.replace('_', ' ')} is invalid`;
        isValid = false;
        return;
      }
    }
  });
  
  return { isValid, errors };
}