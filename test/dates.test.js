import assert from "node:assert/strict";
import { test } from "node:test";

import * as dates from "../src/utils/dates.js";

test("parse and diff", () => {
  const start = dates.parseIsoDate("2026-01-01");
  const end = dates.parseIsoDate("2026-01-31");
  assert.equal(dates.daysBetween(start, end), 30);
  assert.equal(dates.toIsoDate(start), "2026-01-01");
});

test("invalid date throws", () => {
  assert.throws(() => dates.parseIsoDate("nope"), /invalid ISO date/);
});
