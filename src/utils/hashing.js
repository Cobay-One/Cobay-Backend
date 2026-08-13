// Content-hashing helpers using secure digest algorithms.

import { createHash } from "node:crypto";

/**
 * Return the SHA-256 hex digest of the given string.
 * @param {string} data
 * @returns {string}
 */
export function sha256Hex(data) {
  return createHash("sha256").update(data, "utf8").digest("hex");
}

/**
 * Return a short, stable fingerprint for cache keys and dedup.
 * @param {string} data
 * @param {number} [length]
 * @returns {string}
 */
export function shortFingerprint(data, length = 12) {
  return sha256Hex(data).slice(0, length);
}
