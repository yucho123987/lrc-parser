import assert from "assert";
import { LrcParser } from "../src/index.js";

let parser = new LrcParser();
describe("LrcParser", () => {
  describe("#updateLyrics(1, 'Never gonna give you up')", () => {
    it("should return undefined after creating a moment ", () => {
      assert.strictEqual(parser.updateLyrics(114514, "Never gonna give you up"), undefined);
    });
  });
});
describe("LrcParser", () => {
  describe("#updateLyrics(114514, 'Never gonna let you down', '永远不会让你失望')", () => {
    it("should return undefined after updating a moment ", () => {
      assert.strictEqual(parser.updateLyrics(114514, "Never gonna let you down", "永远不会让你失望"), undefined);
    });
  });
});