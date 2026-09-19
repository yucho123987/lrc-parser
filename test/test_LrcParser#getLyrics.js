import assert from "assert";
import { LrcParser } from "../src/index.js";

let parser = new LrcParser();
parser.updateLyrics(6324, "Never gonna give you up");
describe("LrcParser", () => {
  describe("#getLyrics(6324)", () => {
    it("should return a Lyrics object whose 'lyrics' property is set to 'Never gonna give you up' if moment exists", () => {
      assert.strictEqual(parser.getLyrics(6324).lyrics, "Never gonna give you up");
    });
  });
});
describe("LrcParser", () => {
  describe("#getLyrics()", () => {
    it("should return a Lyrics object whose 'lyrics' property is set to null if moment does not exist", () => {
      assert.strictEqual(parser.getLyrics(114514), null);
    });
  });
});