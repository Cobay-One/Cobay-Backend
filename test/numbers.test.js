import assert from "node:assert/strict";
import { test } from "node:test";

import * as numbers from "../src/utils/numbers.js";

test("clamp and percent", () => {
  assert.equal(numbers.clamp(15, 0, 10), 10);
  assert.equal(numbers.clamp(-1, 0, 10), 0);
  assert.equal(numbers.percent(25, 200), 12.5);
});

test("safeDivide", () => {
  assert.equal(numbers.safeDivide(10, 2), 5);
  assert.equal(numbers.safeDivide(1, 0), 0);
});
