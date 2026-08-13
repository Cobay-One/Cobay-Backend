import assert from "node:assert/strict";
import { test } from "node:test";

import * as result from "../src/utils/result.js";

test("ok result", () => {
  const outcome = result.ok(42);
  assert.equal(outcome.ok, true);
  assert.equal(result.unwrap(outcome), 42);
});

test("err result", () => {
  const outcome = result.err("boom");
  assert.equal(outcome.ok, false);
  assert.throws(() => result.unwrap(outcome), /boom/);
});
