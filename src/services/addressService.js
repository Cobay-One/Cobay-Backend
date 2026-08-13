// Pure service helpers for Address collections.
// Operates on plain Address instances; see ../domain/address.js.

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
 * @param {Address[]} items
 * @returns {Address[]}
 */
export function activeOnly(items) {
  return items.filter((item) => item.active);
}

/**
 * Return the record whose id matches targetId, or null.
 * @param {Address[]} items
 * @param {number} targetId
 * @returns {Address | null}
 */
export function findById(items, targetId) {
  return items.find((item) => item.id === targetId) ?? null;
}

/**
 * Return the names of all records.
 * @param {Address[]} items
 * @returns {string[]}
 */
export function names(items) {
  return items.map((item) => item.name);
}

/**
 * Return the mean amount, or 0 for an empty collection.
 * @param {Address[]} items
 * @returns {number}
 */
export function averageAmount(items) {
  if (items.length === 0) {
    return 0;
  }
  const sum = items.reduce((acc, item) => acc + item.amountCents, 0);
  return sum / items.length;
}
