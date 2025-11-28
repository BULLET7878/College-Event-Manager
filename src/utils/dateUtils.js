// Convert string → Date object
export function toDate(dateString) {
  return new Date(dateString);
}

// Check if a date is valid
export function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

// Format date into human readable "YYYY-MM-DD"
export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Compare two dates (for sorting)
export function isAfter(date1, date2) {
  return new Date(date1).getTime() > new Date(date2).getTime();
}

// Compare two dates (for sorting)
export function isBefore(date1, date2) {
  return new Date(date1).getTime() < new Date(date2).getTime();
}

export default {
  toDate,
  isValidDate,
  formatDate,
  isAfter,
  isBefore
};
