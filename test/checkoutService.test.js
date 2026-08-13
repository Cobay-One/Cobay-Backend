import assert from "node:assert/strict";
import { test } from "node:test";

import { lineSubtotal, summarize } from "../src/services/checkoutService.js";

const items = [
  { productId: 1, name: "a", unitAmountCents: 1000, quantity: 2 },
  { productId: 2, name: "b", unitAmountCents: 500, quantity: 1 },
];

test("lineSubtotal multiplies unit price by quantity", () => {
  assert.equal(lineSubtotal(items[0]), 2000);
});

test("summarize computes subtotal without adjustments", () => {
  const summary = summarize(items);
  assert.equal(summary.subtotalCents, 2500);
  assert.equal(summary.unitsCount, 3);
  assert.equal(summary.totalCents, 2500);
});

test("summarize applies discount then tax", () => {
  const summary = summarize(items, { discountPercent: 20, taxRatePercent: 10 });
  assert.equal(summary.discountCents, 500);
  assert.equal(summary.taxCents, 200);
  assert.equal(summary.totalCents, 2200);
});

test("summarize clamps out-of-range percentages", () => {
  const summary = summarize(items, { discountPercent: 250, taxRatePercent: -5 });
  assert.equal(summary.discountCents, 2500);
  assert.equal(summary.taxCents, 0);
  assert.equal(summary.totalCents, 0);
});
