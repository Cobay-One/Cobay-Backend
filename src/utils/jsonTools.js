// Safe JSON serialisation helpers.

/**
 * Return a compact, deterministic JSON string for value.
 * @param {unknown} value
 * @returns {string}
 */
export function dumps(value) {
  return JSON.stringify(value, Object.keys(value ?? {}).sort());
}

/**
 * Parse a JSON document into JavaScript values.
 * @param {string} payload
 * @returns {unknown}
 */
export function loads(payload) {
  return JSON.parse(payload);
}

/**
 * Parse payload as JSON, returning fallback on malformed input.
 * @param {string} payload
 * @param {unknown} fallback
 * @returns {unknown}
 */
export function loadsOrDefault(payload, fallback) {
  try {
    return JSON.parse(payload);
  } catch {
    return fallback;
  }
}
