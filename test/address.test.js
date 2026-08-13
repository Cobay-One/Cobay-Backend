// Tests for the Address entity, service and repository.

import assert from "node:assert/strict";
import { test } from "node:test";

import { Address } from "../src/domain/address.js";
import { AddressRepository } from "../src/repositories/addressRepository.js";
import * as service from "../src/services/addressService.js";

function sample() {
  return new Address({ id: 1, name: "sample", amountCents: 250 });
}

test("address: rename returns an independent copy", () => {
  const original = sample();
  const renamed = original.rename("updated");
  assert.equal(renamed.name, "updated");
  assert.equal(original.name, "sample");
});

test("address: deactivate and isFree", () => {
  const item = sample().deactivate().withAmount(0);
  assert.equal(item.active, false);
  assert.equal(item.isFree(), true);
});

test("address: service totals and lookup", () => {
  const items = [sample(), new Address({ id: 2, name: "second", amountCents: 750 })];
  assert.equal(service.totalAmount(items), 1000);
  assert.equal(service.averageAmount(items), 500);
  assert.equal(service.findById(items, 2).name, "second");
  assert.equal(service.findById(items, 99), null);
});

test("address: repository roundtrip", () => {
  const repo = new AddressRepository();
  repo.add(sample());
  assert.equal(repo.has(1), true);
  assert.equal(repo.size, 1);
  assert.equal(repo.get(1).name, "sample");
  assert.equal(repo.remove(1), true);
  assert.equal(repo.get(1), null);
});
