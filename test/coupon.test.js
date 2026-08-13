// Tests for the Coupon entity, service and repository.

import assert from "node:assert/strict";
import { test } from "node:test";

import { Coupon } from "../src/domain/coupon.js";
import { CouponRepository } from "../src/repositories/couponRepository.js";
import * as service from "../src/services/couponService.js";

function sample() {
  return new Coupon({ id: 1, name: "sample", amountCents: 250 });
}

test("coupon: rename returns an independent copy", () => {
  const original = sample();
  const renamed = original.rename("updated");
  assert.equal(renamed.name, "updated");
  assert.equal(original.name, "sample");
});

test("coupon: deactivate and isFree", () => {
  const item = sample().deactivate().withAmount(0);
  assert.equal(item.active, false);
  assert.equal(item.isFree(), true);
});

test("coupon: service totals and lookup", () => {
  const items = [sample(), new Coupon({ id: 2, name: "second", amountCents: 750 })];
  assert.equal(service.totalAmount(items), 1000);
  assert.equal(service.averageAmount(items), 500);
  assert.equal(service.findById(items, 2).name, "second");
  assert.equal(service.findById(items, 99), null);
});

test("coupon: repository roundtrip", () => {
  const repo = new CouponRepository();
  repo.add(sample());
  assert.equal(repo.has(1), true);
  assert.equal(repo.size, 1);
  assert.equal(repo.get(1).name, "sample");
  assert.equal(repo.remove(1), true);
  assert.equal(repo.get(1), null);
});
