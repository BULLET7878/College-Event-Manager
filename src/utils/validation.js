/**
 * Validation Utilities
 * Functions to validate user input and forms
 */

/**
 * Validate student profile data
 * @param {object} data - Student data to validate
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateStudentForm = (data) => {
  const errors = {};

  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Roll number validation (optional for students)
  if (data.rollNumber && typeof data.rollNumber !== 'string') {
    errors.rollNumber = 'Roll number must be a string';
  }

  // Branch validation (optional)
  if (data.branch && typeof data.branch !== 'string') {
    errors.branch = 'Branch must be a string';
  }

  // Year validation (optional)
  if (data.year && (typeof data.year !== 'number' || data.year < 1 || data.year > 4)) {
    errors.year = 'Year must be between 1 and 4';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate admin profile data
 * @param {object} data - Admin data to validate
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateAdminForm = (data) => {
  const errors = {};

  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // ID validation
  if (!data.id || typeof data.id !== 'string' || data.id.trim().length === 0) {
    errors.id = 'ID is required';
  }

  // isAdmin must be true
  if (data.isAdmin !== true) {
    errors.isAdmin = 'Admin flag must be true';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate event data
 * @param {object} data - Event data to validate
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateEvent = (data) => {
  const errors = {};

  // Title validation
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  }

  // Start date validation
  if (!data.startAt) {
    errors.startAt = 'Start date is required';
  } else if (isNaN(new Date(data.startAt).getTime())) {
    errors.startAt = 'Start date must be a valid date';
  }

  // End date validation
  if (!data.endAt) {
    errors.endAt = 'End date is required';
  } else if (isNaN(new Date(data.endAt).getTime())) {
    errors.endAt = 'End date must be a valid date';
  }

  // Date range validation
  if (data.startAt && data.endAt) {
    const start = new Date(data.startAt);
    const end = new Date(data.endAt);
    if (end <= start) {
      errors.endAt = 'End date must be after start date';
    }
  }

  // Capacity validation
  if (data.capacity !== undefined && data.capacity !== null) {
    if (typeof data.capacity !== 'number' || data.capacity <= 0) {
      errors.capacity = 'Capacity must be a positive number';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate required fields
 * @param {object} data - Data object to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateRequiredFields = (data, requiredFields) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim().length === 0)) {
      errors[field] = `${field} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validateStudentForm,
  validateAdminForm,
  validateEvent,
  isValidEmail,
  validateRequiredFields,
};
