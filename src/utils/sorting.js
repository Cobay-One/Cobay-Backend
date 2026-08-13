// Stable sorting helpers keyed by attribute or callable.

/**
 * Return a new array sorted by the given key function.
 * @template T
 * @param {T[]} items
 * @param {(item: T) => number | string} key
 * @param {boolean} [descending]
 * @returns {T[]}
 */
export function sortByKey(items, key, descending = false) {
  const direction = descending ? -1 : 1;
  return [...items].sort((a, b) => {
    const ka = key(a);
    const kb = key(b);
    if (ka < kb) {
      return -direction;
    }
    if (ka > kb) {
      return direction;
    }
    return 0;
  });
}

/**
 * Return the count highest-ranked items by key.
 * @template T
 * @param {T[]} items
 * @param {(item: T) => number | string} key
 * @param {number} count
 * @returns {T[]}
 */
export function topN(items, key, count) {
  return sortByKey(items, key, true).slice(0, count);
}
