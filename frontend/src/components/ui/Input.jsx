import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      name,
      type = 'text',
      required = false,
      error = '',
      placeholder = '',
      value,
      onChange,
      onBlur,
      className = '',
      labelClassName = '',
      inputClassName = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className={`block text-gray-700 text-sm font-bold mb-2 ${labelClassName}`}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;