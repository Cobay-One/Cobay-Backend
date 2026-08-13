import assert from "node:assert/strict";
import { test } from "node:test";

import * as coll from "../src/utils/collections.js";

test("chunk and flatten", () => {
  assert.deepEqual(coll.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(coll.flatten([[1, 2], [3]]), [1, 2, 3]);
});

test("unique preserves order", () => {
  assert.deepEqual(coll.unique([3, 1, 3, 2, 1]), [3, 1, 2]);
});
