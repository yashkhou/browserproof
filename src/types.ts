export type BrowserStep = { action: "click"; selector: string } | { action: "fill"; selector: string; value: string } | { action: "press"; selector: string; key: string } | { action: "waitFor"; selector: string };
export type BrowserAssertion = { type: "urlIncludes"; value: string } | { type: "titleIncludes"; value: string } | { type: "text"; value: string } | { type: "selectorVisible"; selector: string } | { type: "value"; selector: string; value: string };
export interface ProofSpec { url: string; steps?: BrowserStep[]; assertions?: BrowserAssertion[]; timeoutMs?: number; }
export interface AssertionResult { assertion: BrowserAssertion; passed: boolean; actual?: string; error?: string; }
export interface ProofReport { startedAt: string; finishedAt: string; url: string; finalUrl: string; title: string; passed: boolean; assertions: AssertionResult[]; screenshotPath: string; screenshotSha256: string; }
