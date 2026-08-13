// Read configuration values from the process environment safely.

/**
 * Return the environment variable name, or fallback when unset.
 * @param {string} name
 * @param {string} [fallback]
 * @returns {string}
 */
export function getString(name, fallback = "") {
  const raw = process.env[name];
  return raw === undefined ? fallback : raw;
}

/**
 * Return the environment variable as an integer, or fallback when invalid.
 * @param {string} name
 * @param {number} [fallback]
 * @returns {number}
 */
export function getInt(name, fallback = 0) {
  const raw = process.env[name];
  if (raw === undefined) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * Return a boolean parsed from the environment variable.
 * @param {string} name
 * @param {boolean} [fallback]
 * @returns {boolean}
 */
export function getBool(name, fallback = false) {
  const raw = process.env[name];
  if (raw === undefined) {
    return fallback;
  }
  return ["1", "true", "yes", "on"].includes(raw.trim().toLowerCase());
}
