// Helpers for transforming arrays.

/**
 * Split items into consecutive chunks of at most size elements.
 * @template T
 * @param {T[]} items
 * @param {number} size
 * @returns {T[][]}
 */
export function chunk(items, size) {
  if (size <= 0) {
    throw new RangeError("size must be positive");
  }
  const result = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

/**
 * Return items with duplicates removed, preserving first-seen order.
 * @template T
 * @param {T[]} items
 * @returns {T[]}
 */
export function unique(items) {
  return [...new Set(items)];
}

/**
 * Flatten one level of nesting into a single array.
 * @template T
 * @param {T[][]} nested
 * @returns {T[]}
 */
export function flatten(nested) {
  return nested.flat();
}
