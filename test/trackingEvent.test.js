// Tests for the TrackingEvent entity, service and repository.

import assert from "node:assert/strict";
import { test } from "node:test";

import { TrackingEvent } from "../src/domain/trackingEvent.js";
import { TrackingEventRepository } from "../src/repositories/trackingEventRepository.js";
import * as service from "../src/services/trackingEventService.js";

function sample() {
  return new TrackingEvent({ id: 1, name: "sample", amountCents: 250 });
}

test("trackingEvent: rename returns an independent copy", () => {
  const original = sample();
  const renamed = original.rename("updated");
  assert.equal(renamed.name, "updated");
  assert.equal(original.name, "sample");
});

test("trackingEvent: deactivate and isFree", () => {
  const item = sample().deactivate().withAmount(0);
  assert.equal(item.active, false);
  assert.equal(item.isFree(), true);
});

test("trackingEvent: service totals and lookup", () => {
  const items = [sample(), new TrackingEvent({ id: 2, name: "second", amountCents: 750 })];
  assert.equal(service.totalAmount(items), 1000);
  assert.equal(service.averageAmount(items), 500);
  assert.equal(service.findById(items, 2).name, "second");
  assert.equal(service.findById(items, 99), null);
});

test("trackingEvent: repository roundtrip", () => {
  const repo = new TrackingEventRepository();
  repo.add(sample());
  assert.equal(repo.has(1), true);
  assert.equal(repo.size, 1);
  assert.equal(repo.get(1).name, "sample");
  assert.equal(repo.remove(1), true);
  assert.equal(repo.get(1), null);
});
