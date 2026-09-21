import { describe, expect, it } from "vitest";
import { escapeHtml, renderHtml } from "./report.js";

describe("BrowserProof report", () => {
  it("escapes HTML and renders pass state", () => {
    expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
    const html = renderHtml({
      startedAt: "a", finishedAt: "b", url: "x", finalUrl: "x", title: "x",
      passed: true, assertions: [], screenshotPath: "final.png", screenshotSha256: "abc"
    });
    expect(html).toContain("BrowserProof: PASS");
  });
});
