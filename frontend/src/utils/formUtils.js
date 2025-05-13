/**
 * Helper function to format API errors into a readable format
 * @param {Object|string} error - Error from the API
 * @returns {string} - Formatted error message
 */
export const formatApiErrors = (error) => {
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
};

/**
 * A simple form validation helper
 * @param {Object} fields - Form fields to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} - { isValid, errors }
 */
export const validateForm = (fields, rules) => {
  const errors = {};
  let isValid = true;
  
  Object.entries(rules).forEach(([fieldName, fieldRules]) => {
    const value = fields[fieldName];
    
    // Required check
    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[fieldName] = `${fieldName.replace('_', ' ')} is required`;
      isValid = false;
      return;
    }
    
    // Minimum length check
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[fieldName] = `${fieldName.replace('_', ' ')} must be at least ${fieldRules.minLength} characters`;
      isValid = false;
      return;
    }
    
    // Email format check
    if (fieldRules.isEmail && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[fieldName] = 'Please enter a valid email address';
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
  });
  
  return { isValid, errors };
};