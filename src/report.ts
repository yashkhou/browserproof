import type { ProofReport } from "./types.js";
export const escapeHtml=(v:string)=>v.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]??c));
export function renderHtml(r:ProofReport):string{
 const rows=r.assertions.map(x=>`<tr><td>${x.passed?"PASS":"FAIL"}</td><td><code>${escapeHtml(JSON.stringify(x.assertion))}</code></td><td>${escapeHtml(x.actual??x.error??"")}</td></tr>`).join("");
 return `<!doctype html><meta charset="utf-8"><title>BrowserProof report</title><style>body{font:15px system-ui;max-width:1000px;margin:40px auto;padding:0 20px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:10px;text-align:left}code{white-space:pre-wrap}</style><h1>BrowserProof: ${r.passed?"PASS":"FAIL"}</h1><p><b>Final URL:</b> ${escapeHtml(r.finalUrl)}</p><p><b>Screenshot SHA-256:</b> <code>${r.screenshotSha256}</code></p><table><tr><th>Status</th><th>Assertion</th><th>Observed</th></tr>${rows}</table>`;
}
