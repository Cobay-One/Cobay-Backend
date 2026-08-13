// Compose the application: shared in-memory state plus a configured router.

import { ProductRepository } from "../repositories/productRepository.js";
import { registerCartRoutes } from "./controllers/cartController.js";
import { registerProductRoutes } from "./controllers/productController.js";
import { sendJson } from "./responses.js";
import { Router } from "./router.js";

/**
 * Build the application state and router.
 * @returns {{ router: Router, state: object }}
 */
export function createApp() {
  const state = {
    products: new ProductRepository(),
    carts: new Map(),
    nextProductId: 0,
  };

  const router = new Router();
  router.get("/health", ({ res }) => sendJson(res, 200, { status: "ok" }));
  registerProductRoutes(router, state);
  registerCartRoutes(router, state);

  return { router, state };
}
