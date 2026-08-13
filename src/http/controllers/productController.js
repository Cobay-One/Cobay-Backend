// HTTP handlers for the product catalog.

import { Product } from "../../domain/product.js";
import { sendError, sendJson } from "../responses.js";

/**
 * Serialise a Product into a plain response object.
 * @param {Product} product
 * @returns {{ id: number, name: string, amountCents: number, active: boolean }}
 */
function toResponse(product) {
  return {
    id: product.id,
    name: product.name,
    amountCents: product.amountCents,
    active: product.active,
  };
}

/**
 * Validate and normalise a product create payload.
 * @param {unknown} body
 * @returns {{ name: string, amountCents: number } | { error: string }}
 */
function parseCreate(body) {
  if (typeof body !== "object" || body === null) {
    return { error: "a JSON object is required" };
  }
  const name = String(body.name ?? "").trim();
  if (name.length === 0) {
    return { error: "name is required" };
  }
  const amountCents = Number(body.amountCents ?? 0);
  if (!Number.isInteger(amountCents) || amountCents < 0) {
    return { error: "amountCents must be a non-negative integer" };
  }
  return { name, amountCents };
}

/**
 * Register product routes against the router and shared state.
 * @param {import("../router.js").Router} router
 * @param {{ products: import("../../repositories/productRepository.js").ProductRepository, nextProductId: number }} state
 */
export function registerProductRoutes(router, state) {
  router.get("/api/products", ({ res }) => {
    const items = state.products.listAll().map(toResponse);
    sendJson(res, 200, { items, total: items.length });
  });

  router.get("/api/products/:id", ({ res, params }) => {
    const product = state.products.get(Number.parseInt(params.id, 10));
    if (!product) {
      sendError(res, 404, "product not found");
      return;
    }
    sendJson(res, 200, toResponse(product));
  });

  router.post("/api/products", ({ res, body }) => {
    const parsed = parseCreate(body);
    if ("error" in parsed) {
      sendError(res, 400, parsed.error);
      return;
    }
    state.nextProductId += 1;
    const product = new Product({
      id: state.nextProductId,
      name: parsed.name,
      amountCents: parsed.amountCents,
    });
    state.products.add(product);
    sendJson(res, 201, toResponse(product));
  });
}
