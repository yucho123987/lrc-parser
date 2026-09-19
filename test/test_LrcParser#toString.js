import assert from "assert";
import { LrcParser } from "../src/index.js";

let parser1 = new LrcParser();
parser1.updateLyrics(114514, "Never gonna give you up", "永远不会放弃你");
parser1.updateLyrics(191981, "Never gonna give you up", "永远不会放弃你");
parser1.updateLyrics(202608, "Never gonna let you down", "永远不会让你失望");
describe("LrcParser", () => {
  describe("#toString()", () => {
    it("should return LRC lyrics with contemporary LRC format", () => {
      assert.strictEqual(parser1.toString(), "[01:54.514][03:11.981]Never gonna give you up\n[01:54.514][03:11.981]永远不会放弃你\n[03:22.608]Never gonna let you down\n[03:22.608]永远不会让你失望");
    });
  });
});
let parser2 = new LrcParser();
parser2.useTraditionalFormat = true;
parser2.updateLyrics(114514, "Never gonna give you up", "永远不会放弃你");
parser2.updateLyrics(191981, "Never gonna give you up", "永远不会放弃你");
parser2.updateLyrics(202608, "Never gonna let you down", "永远不会让你失望");
describe("LrcParser", () => {
  describe("#toString()", () => {
    it("should return LRC lyrics with traditional LRC format when method 'useTraditionalFormat' is called", () => {
      assert.strictEqual(parser2.toString(), "[01:54.514]Never gonna give you up\n[01:54.514]永远不会放弃你\n[03:11.981]Never gonna give you up\n[03:11.981]永远不会放弃你\n[03:22.608]Never gonna let you down\n[03:22.608]永远不会让你失望");
    });
  });
});