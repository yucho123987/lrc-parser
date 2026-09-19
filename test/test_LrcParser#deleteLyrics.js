import assert from "assert";
import { LrcParser } from "../src/index.js";

let parser = new LrcParser();
parser.updateLyrics(114514, "花曇り 夢の街 でも明日が見えなくて", "花漫天 梦的街 但明日却看不见");

describe("LrcParser", () => {
  describe("#deleteLyrics(114514)", () => {
    it("should return true after deleting an existing moment", () => {
      assert.strictEqual(parser.deleteLyrics(114514), true);
    });
  });
});
describe("LrcParser", () => {
  describe("#deleteLyrics()", () => {
    it("should return false after trying to delete a nonexistent moment", () => {
      assert.strictEqual(parser.deleteLyrics(1919810), false);
    });
  });
});