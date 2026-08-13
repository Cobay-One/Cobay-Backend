// Helpers for writing JSON HTTP responses with correct headers.

/**
 * Write a JSON response with the given status code.
 * @param {import("node:http").ServerResponse} res
 * @param {number} statusCode
 * @param {unknown} payload
 */
export function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

/**
 * Write a JSON error envelope with the given status code.
 * @param {import("node:http").ServerResponse} res
 * @param {number} statusCode
 * @param {string} message
 */
export function sendError(res, statusCode, message) {
  sendJson(res, statusCode, { error: message });
}
