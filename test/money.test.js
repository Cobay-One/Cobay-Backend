import assert from "node:assert/strict";
import { test } from "node:test";

import * as money from "../src/utils/money.js";

test("money conversions", () => {
  assert.equal(money.toCents(1.239), 124);
  assert.equal(money.toDollars(250), 2.5);
});

test("money format and add", () => {
  assert.equal(money.formatAmount(1234), "$12.34");
  assert.equal(money.add(100, 200, 50), 350);
  assert.equal(money.isPositive(1), true);
  assert.equal(money.isPositive(0), false);
});
