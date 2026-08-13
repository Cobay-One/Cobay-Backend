import assert from "node:assert/strict";
import { test } from "node:test";

import * as hashing from "../src/utils/hashing.js";

test("sha256 is stable", () => {
  const first = hashing.sha256Hex("cobay");
  const second = hashing.sha256Hex("cobay");
  assert.equal(first, second);
  assert.equal(first.length, 64);
  assert.equal(hashing.shortFingerprint("cobay").length, 12);
});
