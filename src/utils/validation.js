/**
 * Validation Utilities
 * Functions to validate user input and forms
 */

// Helper functions
export const isEmpty = (value) => !value || String(value).trim() === "";

export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPositiveNumber = (num) => typeof num === "number" && num > 0;

/**
 * Validate student profile data
 * @param {object} data - Student data to validate
 * @returns {object} - { isValid: boolean, success: boolean, errors: object }
 */
export const validateStudentForm = (data) => {
  const errors = {};

  // Name validation
  if (isEmpty(data.name)) {
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

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    success: isValid, // Alias for compatibility
    errors,
  };
};

/**
 * Validate admin profile data
 * @param {object} data - Admin data to validate
 * @returns {object} - { isValid: boolean, success: boolean, errors: object }
 */
export const validateAdminForm = (data) => {
  const errors = {};

  // Name validation
  if (isEmpty(data.name)) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // ID validation
  if (isEmpty(data.id)) {
    errors.id = 'ID is required';
  }

  // isAdmin must be true
  if (data.isAdmin !== true) {
    errors.isAdmin = 'Admin flag must be true';
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    success: isValid, // Alias for compatibility
    errors,
  };
};

/**
 * Validate event data
 * @param {object} data - Event data to validate
 * @returns {object} - { isValid: boolean, success: boolean, errors: object }
 */
export const validateEvent = (data) => {
  const errors = {};

  // Title validation
  if (isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  // Start date validation
  if (!data.startAt && !data.date) {
    errors.startAt = 'Date is required';
  }

  // Capacity validation
  if (data.capacity !== undefined && data.capacity !== null) {
    if (!isPositiveNumber(data.capacity)) {
      errors.capacity = 'Capacity must be a positive number';
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    success: isValid, // Alias for compatibility
    errors,
  };
};

/**
 * Validate registration data
 * @param {object} data 
 */
export const validateRegistration = (data) => {
  const errors = {};

  if (isEmpty(data.name)) errors.name = "Name is required";
  if (!isEmail(data.email)) errors.email = "Invalid email";
  if (isEmpty(data.eventId)) errors.eventId = "Event ID is required";

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    success: isValid,
    errors
  };
};

// Default export for backward compatibility
export default {
  validateStudentForm,
  validateAdminForm,
  validateEvent,
  validateRegistration,
  isEmpty,
  isEmail,
  isPositiveNumber,
};
