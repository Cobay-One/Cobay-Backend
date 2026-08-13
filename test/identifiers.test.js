import assert from "node:assert/strict";
import { test } from "node:test";

import * as identifiers from "../src/utils/identifiers.js";

test("tokens are unique and sized", () => {
  assert.notEqual(identifiers.newUuid(), identifiers.newUuid());
  assert.equal(identifiers.newHex(16).length, 32);
  assert.notEqual(identifiers.newToken(), identifiers.newToken());
});
