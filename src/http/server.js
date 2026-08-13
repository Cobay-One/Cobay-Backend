// Wrap an app (router + state) in a node:http server with body parsing and
// centralised error handling.

import { createServer as createHttpServer } from "node:http";

import { readJsonBody } from "./body.js";
import { sendError } from "./responses.js";

const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH"]);

/**
 * Dispatch a single request through the router.
 * @param {{ router: import("./router.js").Router }} app
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 */
async function handle(app, req, res) {
  const method = req.method ?? "GET";
  const url = new URL(req.url ?? "/", "http://localhost");
  const route = app.router.match(method, url.pathname);
  if (!route) {
    sendError(res, 404, "not found");
    return;
  }

  let body = null;
  if (METHODS_WITH_BODY.has(method.toUpperCase())) {
    try {
      body = await readJsonBody(req);
    } catch (error) {
      sendError(res, 400, error instanceof Error ? error.message : "invalid request body");
      return;
    }
  }

  await route.handler({ req, res, params: route.params, body });
}

/**
 * Create an HTTP server for the given app.
 * @param {{ router: import("./router.js").Router }} app
 * @returns {import("node:http").Server}
 */
export function createServer(app) {
  return createHttpServer((req, res) => {
    handle(app, req, res).catch(() => {
      if (!res.headersSent) {
        sendError(res, 500, "internal server error");
      }
    });
  });
}
