import assert from "node:assert/strict";
import { test } from "node:test";

import * as validation from "../src/utils/validation.js";

test("email and range", () => {
  assert.equal(validation.isValidEmail("a@b.co"), true);
  assert.equal(validation.isValidEmail("nope"), false);
  assert.equal(validation.inRange(5, 1, 10), true);
});

test("requireNonEmpty", () => {
  assert.equal(validation.requireNonEmpty("x", "name"), "x");
  assert.throws(() => validation.requireNonEmpty("  ", "name"), /name/);
});
