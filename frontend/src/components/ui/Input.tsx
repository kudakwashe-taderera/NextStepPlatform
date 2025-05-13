import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    labelClassName, 
    inputClassName,
    id, 
    name, 
    required, 
    ...props 
  }, ref) => {
    // Generate an ID if none is provided
    const inputId = id || name || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={cn('mb-4', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-gray-700 text-sm font-bold mb-2',
              labelClassName
            )}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          className={cn(
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
            error ? 'border-red-500' : 'border-gray-300',
            inputClassName
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };