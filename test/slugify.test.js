import assert from "node:assert/strict";
import { test } from "node:test";

import { slugify } from "../src/utils/slugify.js";

test("slugify basic", () => {
  assert.equal(slugify("Hello, World!"), "hello-world");
});

test("slugify trims and collapses", () => {
  assert.equal(slugify("  Multiple   Spaces  "), "multiple-spaces");
  assert.equal(slugify("Café Déjà Vu"), "cafe-deja-vu");
});
