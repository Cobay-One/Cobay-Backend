// Pure service helpers for ApiKey collections.
// Operates on plain ApiKey instances; see ../domain/apiKey.js.

/**
 * Return the summed amount of the active records.
 * @param {object[]} items
 * @returns {number}
 */
export function totalAmount(items) {
  return items
    .filter((item) => item.active)
    .reduce((sum, item) => sum + item.amountCents, 0);
}

/**
 * Return only the active records, preserving order.
 * @param {ApiKey[]} items
 * @returns {ApiKey[]}
 */
export function activeOnly(items) {
  return items.filter((item) => item.active);
}

/**
 * Return the record whose id matches targetId, or null.
 * @param {ApiKey[]} items
 * @param {number} targetId
 * @returns {ApiKey | null}
 */
export function findById(items, targetId) {
  return items.find((item) => item.id === targetId) ?? null;
}

/**
 * Return the names of all records.
 * @param {ApiKey[]} items
 * @returns {string[]}
 */
export function names(items) {
  return items.map((item) => item.name);
}

/**
 * Return the mean amount, or 0 for an empty collection.
 * @param {ApiKey[]} items
 * @returns {number}
 */
export function averageAmount(items) {
  if (items.length === 0) {
    return 0;
  }
  const sum = items.reduce((acc, item) => acc + item.amountCents, 0);
  return sum / items.length;
}
