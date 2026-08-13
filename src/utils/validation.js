// Lightweight, ReDoS-safe validation helpers.

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Return true when value looks like a simple email address.
 * @param {string} value
 * @returns {boolean}
 */
export function isValidEmail(value) {
  return EMAIL.test(value);
}

/**
 * Return true when value contains non-whitespace characters.
 * @param {string} value
 * @returns {boolean}
 */
export function isNonEmpty(value) {
  return value.trim().length > 0;
}

/**
 * Return true when low <= value <= high.
 * @param {number} value
 * @param {number} low
 * @param {number} high
 * @returns {boolean}
 */
export function inRange(value, low, high) {
  return value >= low && value <= high;
}

/**
 * Return value when non-empty, otherwise throw a RangeError.
 * @param {string} value
 * @param {string} field
 * @returns {string}
 */
export function requireNonEmpty(value, field) {
  if (!isNonEmpty(value)) {
    throw new RangeError(`${field} must not be empty`);
  }
  return value;
}
