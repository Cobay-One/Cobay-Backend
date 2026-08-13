// Convert arbitrary text into URL-friendly slugs.

/**
 * Return a lowercase, hyphen-separated slug derived from value.
 * @param {string} value
 * @returns {string}
 */
export function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
