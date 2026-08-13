// HTTP handlers for shopping carts and checkout.

import { summarize } from "../../services/checkoutService.js";
import { newUuid } from "../../utils/identifiers.js";
import { sendError, sendJson } from "../responses.js";

const MAX_QUANTITY = 1000;

/**
 * Serialise a cart, including a freshly computed (undiscounted) summary.
 * @param {{ id: string, items: Map<number, object> }} cart
 * @returns {{ id: string, items: object[], summary: object }}
 */
function serializeCart(cart) {
  const items = [...cart.items.values()];
  return { id: cart.id, items, summary: summarize(items) };
}

/**
 * Read a percentage field from a request body, defaulting to 0.
 * @param {unknown} body
 * @param {string} field
 * @returns {number}
 */
function readPercent(body, field) {
  if (typeof body !== "object" || body === null) {
    return 0;
  }
  const value = Number(body[field] ?? 0);
  return Number.isFinite(value) ? value : 0;
}

/**
 * Register cart routes against the router and shared state.
 * @param {import("../router.js").Router} router
 * @param {{ products: object, carts: Map<string, object> }} state
 */
export function registerCartRoutes(router, state) {
  router.post("/api/carts", ({ res }) => {
    const cart = { id: newUuid(), items: new Map() };
    state.carts.set(cart.id, cart);
    sendJson(res, 201, serializeCart(cart));
  });

  router.get("/api/carts/:id", ({ res, params }) => {
    const cart = state.carts.get(params.id);
    if (!cart) {
      sendError(res, 404, "cart not found");
      return;
    }
    sendJson(res, 200, serializeCart(cart));
  });

  router.post("/api/carts/:id/items", ({ res, params, body }) => {
    const cart = state.carts.get(params.id);
    if (!cart) {
      sendError(res, 404, "cart not found");
      return;
    }
    if (typeof body !== "object" || body === null) {
      sendError(res, 400, "a JSON object is required");
      return;
    }
    const productId = Number.parseInt(body.productId, 10);
    const quantity = Number.parseInt(body.quantity ?? 1, 10);
    if (!Number.isInteger(productId)) {
      sendError(res, 400, "productId is required");
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      sendError(res, 400, `quantity must be between 1 and ${MAX_QUANTITY}`);
      return;
    }
    const product = state.products.get(productId);
    if (!product) {
      sendError(res, 400, "unknown product");
      return;
    }
    const existing = cart.items.get(productId);
    const nextQuantity = (existing ? existing.quantity : 0) + quantity;
    cart.items.set(productId, {
      productId,
      name: product.name,
      unitAmountCents: product.amountCents,
      quantity: nextQuantity,
    });
    sendJson(res, 200, serializeCart(cart));
  });

  router.delete("/api/carts/:id/items/:productId", ({ res, params }) => {
    const cart = state.carts.get(params.id);
    if (!cart) {
      sendError(res, 404, "cart not found");
      return;
    }
    const removed = cart.items.delete(Number.parseInt(params.productId, 10));
    if (!removed) {
      sendError(res, 404, "item not in cart");
      return;
    }
    sendJson(res, 200, serializeCart(cart));
  });

  router.post("/api/carts/:id/checkout", ({ res, params, body }) => {
    const cart = state.carts.get(params.id);
    if (!cart) {
      sendError(res, 404, "cart not found");
      return;
    }
    const items = [...cart.items.values()];
    if (items.length === 0) {
      sendError(res, 400, "cart is empty");
      return;
    }
    const summary = summarize(items, {
      discountPercent: readPercent(body, "discountPercent"),
      taxRatePercent: readPercent(body, "taxRatePercent"),
    });
    sendJson(res, 200, { cartId: cart.id, summary });
  });
}
