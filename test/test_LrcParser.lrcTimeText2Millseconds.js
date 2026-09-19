import assert from "assert";
import { LrcParser } from "../src/index.js";

describe("LrcParser", () => {
  describe(".lrcTimeText2Millseconds('[01:54.514]')", () => {
    it("should return 114514", () => {
      assert.strictEqual(LrcParser.lrcTimeText2Millseconds("[01:54.514]"), 114514);
    });
  });
});