// Read and parse a JSON request body while enforcing a hard size limit so a
// large payload cannot exhaust memory.

const MAX_BODY_BYTES = 1_000_000;

/**
 * Read the request body, parse it as JSON and resolve the result. Resolves to
 * null for an empty body; rejects on oversized or malformed input.
 * @param {import("node:http").IncomingMessage} req
 * @returns {Promise<unknown>}
 */
export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    /** @type {Buffer[]} */
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        req.destroy();
        reject(new RangeError("request body too large"));
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      if (chunks.length === 0) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new SyntaxError("invalid JSON body"));
      }
    });

    req.on("error", reject);
  });
}
