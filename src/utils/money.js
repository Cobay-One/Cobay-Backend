// Helpers for working with integer cent amounts.

/**
 * Convert a dollar amount to whole cents, rounding to the nearest cent.
 * @param {number} dollars
 * @returns {number}
 */
export function toCents(dollars) {
  return Math.round(dollars * 100);
}

/**
 * Convert whole cents to a dollar amount.
 * @param {number} cents
 * @returns {number}
 */
export function toDollars(cents) {
  return cents / 100;
}

/**
 * Return a display string such as "$12.34" for the given cents.
 * @param {number} cents
 * @param {string} [symbol]
 * @returns {string}
 */
export function formatAmount(cents, symbol = "$") {
  return `${symbol}${(cents / 100).toFixed(2)}`;
}

/**
 * Return the sum of the given cent amounts.
 * @param {...number} amounts
 * @returns {number}
 */
export function add(...amounts) {
  return amounts.reduce((sum, value) => sum + value, 0);
}

/**
 * Return true when the amount is greater than zero.
 * @param {number} cents
 * @returns {boolean}
 */
export function isPositive(cents) {
  return cents > 0;
}
