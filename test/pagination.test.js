import assert from "node:assert/strict";
import { test } from "node:test";

import { paginate } from "../src/utils/pagination.js";

const range = (n) => Array.from({ length: n }, (_, i) => i);

test("paginate first page", () => {
  const page = paginate(range(25), 1, 10);
  assert.deepEqual(page.items, range(10));
  assert.equal(page.pages, 3);
  assert.equal(page.hasNext, true);
});

test("paginate last page", () => {
  const page = paginate(range(25), 3, 10);
  assert.deepEqual(page.items, [20, 21, 22, 23, 24]);
  assert.equal(page.hasNext, false);
});
