// Pure service helpers for Customer collections.
// Operates on plain Customer instances; see ../domain/customer.js.

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
 * @param {Customer[]} items
 * @returns {Customer[]}
 */
export function activeOnly(items) {
  return items.filter((item) => item.active);
}

/**
 * Return the record whose id matches targetId, or null.
 * @param {Customer[]} items
 * @param {number} targetId
 * @returns {Customer | null}
 */
export function findById(items, targetId) {
  return items.find((item) => item.id === targetId) ?? null;
}

/**
 * Return the names of all records.
 * @param {Customer[]} items
 * @returns {string[]}
 */
export function names(items) {
  return items.map((item) => item.name);
}

/**
 * Return the mean amount, or 0 for an empty collection.
 * @param {Customer[]} items
 * @returns {number}
 */
export function averageAmount(items) {
  if (items.length === 0) {
    return 0;
  }
  const sum = items.reduce((acc, item) => acc + item.amountCents, 0);
  return sum / items.length;
}
