// Tests for the Category entity, service and repository.

import assert from "node:assert/strict";
import { test } from "node:test";

import { Category } from "../src/domain/category.js";
import { CategoryRepository } from "../src/repositories/categoryRepository.js";
import * as service from "../src/services/categoryService.js";

function sample() {
  return new Category({ id: 1, name: "sample", amountCents: 250 });
}

test("category: rename returns an independent copy", () => {
  const original = sample();
  const renamed = original.rename("updated");
  assert.equal(renamed.name, "updated");
  assert.equal(original.name, "sample");
});

test("category: deactivate and isFree", () => {
  const item = sample().deactivate().withAmount(0);
  assert.equal(item.active, false);
  assert.equal(item.isFree(), true);
});

test("category: service totals and lookup", () => {
  const items = [sample(), new Category({ id: 2, name: "second", amountCents: 750 })];
  assert.equal(service.totalAmount(items), 1000);
  assert.equal(service.averageAmount(items), 500);
  assert.equal(service.findById(items, 2).name, "second");
  assert.equal(service.findById(items, 99), null);
});

test("category: repository roundtrip", () => {
  const repo = new CategoryRepository();
  repo.add(sample());
  assert.equal(repo.has(1), true);
  assert.equal(repo.size, 1);
  assert.equal(repo.get(1).name, "sample");
  assert.equal(repo.remove(1), true);
  assert.equal(repo.get(1), null);
});
