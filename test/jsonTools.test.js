import assert from "node:assert/strict";
import { test } from "node:test";

import * as jsonTools from "../src/utils/jsonTools.js";

test("roundtrip and default", () => {
  const encoded = jsonTools.dumps({ b: 1, a: 2 });
  assert.deepEqual(jsonTools.loads(encoded), { a: 2, b: 1 });
  assert.deepEqual(jsonTools.loadsOrDefault("not json", []), []);
});
