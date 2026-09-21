import test from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, renderHtml } from "./report.js";

test("escapes HTML and renders pass state", () => {
  assert.equal(escapeHtml("<script>"), "&lt;script&gt;");
  const html = renderHtml({startedAt:"a",finishedAt:"b",url:"x",finalUrl:"x",title:"x",passed:true,assertions:[],screenshotPath:"final.png",screenshotSha256:"abc"});
  assert.match(html, /BrowserProof: PASS/);
});
