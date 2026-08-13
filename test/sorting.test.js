import assert from "node:assert/strict";
import { test } from "node:test";

import * as sorting from "../src/utils/sorting.js";

test("sort and topN", () => {
  const values = [3, 1, 4, 1, 5, 9, 2];
  assert.deepEqual(sorting.sortByKey(values, (x) => x).slice(0, 3), [1, 1, 2]);
  assert.deepEqual(sorting.topN(values, (x) => x, 2), [9, 5]);
});
