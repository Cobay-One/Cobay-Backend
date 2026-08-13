// Simple in-memory pagination helpers.

/**
 * Return the requested page slice from items (1-indexed pages).
 * @param {unknown[]} items
 * @param {number} page
 * @param {number} pageSize
 * @returns {{ items: unknown[], page: number, pageSize: number, total: number, pages: number, hasNext: boolean }}
 */
export function paginate(items, page, pageSize) {
  const safePage = Math.max(page, 1);
  const safeSize = Math.max(pageSize, 1);
  const start = (safePage - 1) * safeSize;
  const slice = items.slice(start, start + safeSize);
  const pages = Math.ceil(items.length / safeSize);
  return {
    items: slice,
    page: safePage,
    pageSize: safeSize,
    total: items.length,
    pages,
    hasNext: safePage < pages,
  };
}
