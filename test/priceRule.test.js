// Tests for the PriceRule entity, service and repository.

import assert from "node:assert/strict";
import { test } from "node:test";

import { PriceRule } from "../src/domain/priceRule.js";
import { PriceRuleRepository } from "../src/repositories/priceRuleRepository.js";
import * as service from "../src/services/priceRuleService.js";

function sample() {
  return new PriceRule({ id: 1, name: "sample", amountCents: 250 });
}

test("priceRule: rename returns an independent copy", () => {
  const original = sample();
  const renamed = original.rename("updated");
  assert.equal(renamed.name, "updated");
  assert.equal(original.name, "sample");
});

test("priceRule: deactivate and isFree", () => {
  const item = sample().deactivate().withAmount(0);
  assert.equal(item.active, false);
  assert.equal(item.isFree(), true);
});

test("priceRule: service totals and lookup", () => {
  const items = [sample(), new PriceRule({ id: 2, name: "second", amountCents: 750 })];
  assert.equal(service.totalAmount(items), 1000);
  assert.equal(service.averageAmount(items), 500);
  assert.equal(service.findById(items, 2).name, "second");
  assert.equal(service.findById(items, 99), null);
});

test("priceRule: repository roundtrip", () => {
  const repo = new PriceRuleRepository();
  repo.add(sample());
  assert.equal(repo.has(1), true);
  assert.equal(repo.size, 1);
  assert.equal(repo.get(1).name, "sample");
  assert.equal(repo.remove(1), true);
  assert.equal(repo.get(1), null);
});
