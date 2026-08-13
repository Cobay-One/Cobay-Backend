import assert from "node:assert/strict";
import { test } from "node:test";

import * as text from "../src/utils/text.js";

test("truncate", () => {
  assert.equal(text.truncate("hello world", 8), "hello...");
  assert.equal(text.truncate("short", 10), "short");
});

test("titlecase and initials", () => {
  assert.equal(text.titlecaseWords("the quick fox"), "The Quick Fox");
  assert.equal(text.initials("ada lovelace"), "AL");
});
