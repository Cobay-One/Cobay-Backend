// Date helpers that avoid ambiguous parsing.

/**
 * Return the whole number of days from start to end.
 * @param {Date} start
 * @param {Date} end
 * @returns {number}
 */
export function daysBetween(start, end) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((end.getTime() - start.getTime()) / msPerDay);
}

/**
 * Parse an ISO date (YYYY-MM-DD) into a UTC Date, throwing when invalid.
 * @param {string} value
 * @returns {Date}
 */
export function parseIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new RangeError(`invalid ISO date: ${value}`);
  }
  return new Date(`${value}T00:00:00.000Z`);
}

/**
 * Return an ISO date string (YYYY-MM-DD) for the given Date in UTC.
 * @param {Date} value
 * @returns {string}
 */
export function toIsoDate(value) {
  return value.toISOString().slice(0, 10);
}
