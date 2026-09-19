import assert from "assert";
import { LrcParser } from "../src/index.js";

describe("LrcParser", () => {
  describe(".millseconds2LrcTimeText(114514)", () => {
    it("should return '01:54.514'", () => {
      assert.strictEqual(LrcParser.millseconds2LrcTimeText(114514), "[01:54.514]");
    });
  });
});