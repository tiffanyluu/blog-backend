const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  blogs = [];
  assert.strictEqual(listHelper.dummy(blogs), 1);
});
