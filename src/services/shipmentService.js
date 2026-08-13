// Pure service helpers for Shipment collections.
// Operates on plain Shipment instances; see ../domain/shipment.js.

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
 * @param {Shipment[]} items
 * @returns {Shipment[]}
 */
export function activeOnly(items) {
  return items.filter((item) => item.active);
}

/**
 * Return the record whose id matches targetId, or null.
 * @param {Shipment[]} items
 * @param {number} targetId
 * @returns {Shipment | null}
 */
export function findById(items, targetId) {
  return items.find((item) => item.id === targetId) ?? null;
}

/**
 * Return the names of all records.
 * @param {Shipment[]} items
 * @returns {string[]}
 */
export function names(items) {
  return items.map((item) => item.name);
}

/**
 * Return the mean amount, or 0 for an empty collection.
 * @param {Shipment[]} items
 * @returns {number}
 */
export function averageAmount(items) {
  if (items.length === 0) {
    return 0;
  }
  const sum = items.reduce((acc, item) => acc + item.amountCents, 0);
  return sum / items.length;
}
