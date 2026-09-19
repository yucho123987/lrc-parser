import assert from "assert";
import { LrcParser } from "../src/index.js";

let parser = new LrcParser(`
[00:16.000][00:31.154]Never gonna give you up
[00:16.000][00:31.154]永远不会放弃你
[00:21.154]Never gonna let you down
[00:21.154]永远不会让你失望
`);
describe("LrcParser", () => {
  describe("constructor('\\n[00:16.000][00:31.154]Never gonna give you up\\n[00:16.000][00:31.154]永远不会放弃你\\n[00:21.154]Never gonna let you down\\n[00:21.154]永远不会让你失望\\n')", () => {
    it("method 'toString' should return '[00:16.000][00:31.154]Never gonna give you up\\n[00:16.000][00:31.154]永远不会放弃你\\n[00:21.154]Never gonna let you down\\n[00:21.154]永远不会让你失望'", () => {
      assert.strictEqual(parser.toString(), `[00:16.000][00:31.154]Never gonna give you up
[00:16.000][00:31.154]永远不会放弃你
[00:21.154]Never gonna let you down
[00:21.154]永远不会让你失望`);
    });
  });
});