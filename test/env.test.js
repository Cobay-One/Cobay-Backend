import assert from "node:assert/strict";
import { test } from "node:test";

import * as env from "../src/utils/env.js";

test("getInt and getBool", () => {
  process.env.COBAY_PORT = "8080";
  process.env.COBAY_DEBUG = "true";
  assert.equal(env.getInt("COBAY_PORT"), 8080);
  assert.equal(env.getBool("COBAY_DEBUG"), true);
  assert.equal(env.getString("COBAY_MISSING", "fallback"), "fallback");
});
