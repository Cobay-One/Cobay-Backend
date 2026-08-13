// A minimal Result helper for representing success or failure.

/**
 * Return a successful result wrapping value.
 * @template T
 * @param {T} value
 * @returns {{ ok: true, value: T }}
 */
export function ok(value) {
  return { ok: true, value };
}

/**
 * Return a failed result carrying an error message.
 * @param {string} message
 * @returns {{ ok: false, error: string }}
 */
export function err(message) {
  return { ok: false, error: message };
}

/**
 * Return the value of a successful result, throwing on failure.
 * @template T
 * @param {{ ok: boolean, value?: T, error?: string }} result
 * @returns {T}
 */
export function unwrap(result) {
  if (!result.ok) {
    throw new Error(result.error ?? "result is not ok");
  }
  return result.value;
}
