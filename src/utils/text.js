// Small, pure text-formatting helpers.

/**
 * Return value shortened to limit characters with an optional suffix.
 * @param {string} value
 * @param {number} limit
 * @param {string} [suffix]
 * @returns {string}
 */
export function truncate(value, limit, suffix = "...") {
  if (limit <= 0 || value.length <= limit) {
    return value;
  }
  const keep = Math.max(limit - suffix.length, 0);
  return value.slice(0, keep) + suffix;
}

/**
 * Return value with each whitespace-separated word capitalised.
 * @param {string} value
 * @returns {string}
 */
export function titlecaseWords(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Return the uppercase initials for a person's name.
 * @param {string} fullName
 * @returns {string}
 */
export function initials(fullName) {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .join("");
}
