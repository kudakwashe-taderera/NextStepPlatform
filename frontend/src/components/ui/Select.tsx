import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  labelClassName?: string;
  selectClassName?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    label,
    error,
    labelClassName,
    selectClassName,
    id,
    name,
    required,
    options,
    placeholder = 'Select an option',
    ...props
  }, ref) => {
    // Generate an ID if none is provided
    const selectId = id || name || `select-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className={cn('mb-4', className)}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'block text-gray-700 text-sm font-bold mb-2',
              labelClassName
            )}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          name={name}
          required={required}
          className={cn(
            'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
            error ? 'border-red-500' : 'border-gray-300',
            selectClassName
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };