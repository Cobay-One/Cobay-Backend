// Tests for the Promotion entity, service and repository.

import assert from "node:assert/strict";
import { test } from "node:test";

import { Promotion } from "../src/domain/promotion.js";
import { PromotionRepository } from "../src/repositories/promotionRepository.js";
import * as service from "../src/services/promotionService.js";

function sample() {
  return new Promotion({ id: 1, name: "sample", amountCents: 250 });
}

test("promotion: rename returns an independent copy", () => {
  const original = sample();
  const renamed = original.rename("updated");
  assert.equal(renamed.name, "updated");
  assert.equal(original.name, "sample");
});

test("promotion: deactivate and isFree", () => {
  const item = sample().deactivate().withAmount(0);
  assert.equal(item.active, false);
  assert.equal(item.isFree(), true);
});

test("promotion: service totals and lookup", () => {
  const items = [sample(), new Promotion({ id: 2, name: "second", amountCents: 750 })];
  assert.equal(service.totalAmount(items), 1000);
  assert.equal(service.averageAmount(items), 500);
  assert.equal(service.findById(items, 2).name, "second");
  assert.equal(service.findById(items, 99), null);
});

test("promotion: repository roundtrip", () => {
  const repo = new PromotionRepository();
  repo.add(sample());
  assert.equal(repo.has(1), true);
  assert.equal(repo.size, 1);
  assert.equal(repo.get(1).name, "sample");
  assert.equal(repo.remove(1), true);
  assert.equal(repo.get(1), null);
});
