// Numeric helpers with predictable edge-case behaviour.

/**
 * Return value constrained to the inclusive [low, high] range.
 * @param {number} value
 * @param {number} low
 * @param {number} high
 * @returns {number}
 */
export function clamp(value, low, high) {
  return Math.max(low, Math.min(value, high));
}

/**
 * Return part as a percentage of whole, or 0 when whole is zero.
 * @param {number} part
 * @param {number} whole
 * @returns {number}
 */
export function percent(part, whole) {
  if (whole === 0) {
    return 0;
  }
  return (part / whole) * 100;
}

/**
 * Return the quotient, or 0 when the denominator is zero.
 * @param {number} numerator
 * @param {number} denominator
 * @returns {number}
 */
export function safeDivide(numerator, denominator) {
  if (denominator === 0) {
    return 0;
  }
  return numerator / denominator;
}
