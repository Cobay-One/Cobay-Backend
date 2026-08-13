// Cryptographically-safe identifier and token helpers.

import { randomBytes, randomUUID } from "node:crypto";

/**
 * Return a random UUID v4 string.
 * @returns {string}
 */
export function newUuid() {
  return randomUUID();
}

/**
 * Return a URL-safe random token drawn from a secure source.
 * @param {number} [numBytes]
 * @returns {string}
 */
export function newToken(numBytes = 32) {
  return randomBytes(numBytes).toString("base64url");
}

/**
 * Return a random hex string drawn from a secure source.
 * @param {number} [numBytes]
 * @returns {string}
 */
export function newHex(numBytes = 16) {
  return randomBytes(numBytes).toString("hex");
}
