// Integration tests: drive the real HTTP server over the network.

import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import { createApp } from "../../src/http/app.js";
import { createServer } from "../../src/http/server.js";

let server;
let base;

before(async () => {
  server = createServer(createApp());
  await new Promise((resolve) => {
    server.listen(0, resolve);
  });
  const { port } = server.address();
  base = `http://127.0.0.1:${port}`;
});

after(() => {
  server.close();
});

async function createProduct(name, amountCents) {
  const res = await fetch(`${base}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, amountCents }),
  });
  assert.equal(res.status, 201);
  return res.json();
}

test("health check responds ok", async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("unknown route returns 404", async () => {
  const res = await fetch(`${base}/does-not-exist`);
  assert.equal(res.status, 404);
});

test("products can be created, listed and fetched", async () => {
  const created = await createProduct("Keyboard", 4999);
  assert.equal(created.name, "Keyboard");
  assert.equal(created.amountCents, 4999);

  const listRes = await fetch(`${base}/api/products`);
  const list = await listRes.json();
  assert.ok(list.total >= 1);

  const oneRes = await fetch(`${base}/api/products/${created.id}`);
  assert.equal(oneRes.status, 200);
  assert.equal((await oneRes.json()).id, created.id);
});

test("creating a product rejects invalid input", async () => {
  const res = await fetch(`${base}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "  ", amountCents: -5 }),
  });
  assert.equal(res.status, 400);
});

test("cart flow: add items and checkout with discount and tax", async () => {
  const product = await createProduct("Desk Lamp", 1000);

  const cartRes = await fetch(`${base}/api/carts`, { method: "POST" });
  assert.equal(cartRes.status, 201);
  const cart = await cartRes.json();

  const addRes = await fetch(`${base}/api/carts/${cart.id}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: product.id, quantity: 2 }),
  });
  assert.equal(addRes.status, 200);
  const withItem = await addRes.json();
  assert.equal(withItem.summary.subtotalCents, 2000);
  assert.equal(withItem.summary.unitsCount, 2);

  const checkoutRes = await fetch(`${base}/api/carts/${cart.id}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ discountPercent: 10, taxRatePercent: 5 }),
  });
  assert.equal(checkoutRes.status, 200);
  const { summary } = await checkoutRes.json();
  // 2000 subtotal - 10% (200) = 1800; +5% tax (90) = 1890.
  assert.equal(summary.discountCents, 200);
  assert.equal(summary.taxCents, 90);
  assert.equal(summary.totalCents, 1890);
});

test("cart rejects unknown product and empty checkout", async () => {
  const cart = await (await fetch(`${base}/api/carts`, { method: "POST" })).json();

  const badItem = await fetch(`${base}/api/carts/${cart.id}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: 999999, quantity: 1 }),
  });
  assert.equal(badItem.status, 400);

  const emptyCheckout = await fetch(`${base}/api/carts/${cart.id}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.equal(emptyCheckout.status, 400);
});

test("items can be removed from a cart", async () => {
  const product = await createProduct("Mouse", 2500);
  const cart = await (await fetch(`${base}/api/carts`, { method: "POST" })).json();

  await fetch(`${base}/api/carts/${cart.id}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: product.id, quantity: 1 }),
  });

  const removeRes = await fetch(`${base}/api/carts/${cart.id}/items/${product.id}`, {
    method: "DELETE",
  });
  assert.equal(removeRes.status, 200);
  assert.equal((await removeRes.json()).summary.lineCount, 0);
});
