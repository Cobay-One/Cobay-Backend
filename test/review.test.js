// Tests for the Review entity, service and repository.

import assert from "node:assert/strict";
import { test } from "node:test";

import { Review } from "../src/domain/review.js";
import { ReviewRepository } from "../src/repositories/reviewRepository.js";
import * as service from "../src/services/reviewService.js";

function sample() {
  return new Review({ id: 1, name: "sample", amountCents: 250 });
}

test("review: rename returns an independent copy", () => {
  const original = sample();
  const renamed = original.rename("updated");
  assert.equal(renamed.name, "updated");
  assert.equal(original.name, "sample");
});

test("review: deactivate and isFree", () => {
  const item = sample().deactivate().withAmount(0);
  assert.equal(item.active, false);
  assert.equal(item.isFree(), true);
});

test("review: service totals and lookup", () => {
  const items = [sample(), new Review({ id: 2, name: "second", amountCents: 750 })];
  assert.equal(service.totalAmount(items), 1000);
  assert.equal(service.averageAmount(items), 500);
  assert.equal(service.findById(items, 2).name, "second");
  assert.equal(service.findById(items, 99), null);
});

test("review: repository roundtrip", () => {
  const repo = new ReviewRepository();
  repo.add(sample());
  assert.equal(repo.has(1), true);
  assert.equal(repo.size, 1);
  assert.equal(repo.get(1).name, "sample");
  assert.equal(repo.remove(1), true);
  assert.equal(repo.get(1), null);
});
