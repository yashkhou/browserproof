# BrowserProof

**Proof, not vibes, for browser agents.**

BrowserProof is an evidence-first TypeScript runner for browser automation and AI agents. It executes Playwright steps, checks explicit success conditions, captures the final browser state, hashes the screenshot, and emits portable JSON + HTML proof.

## Why this exists

Agentic browser tools can finish with a confident “done” even when the wrong page is open, a save failed, or the screenshot does not show the claimed result. BrowserProof makes success an explicit contract.

## What it verifies

- URL and page-title conditions
- required text and visible selectors
- input values and deterministic steps
- final screenshot evidence with SHA-256
- machine-readable pass/fail for CI

## Quick start

~~~bash
git clone https://github.com/yashkhou/browserproof.git
cd browserproof
npm install
npx playwright install chromium
npm test
node dist/cli.js run example.json
~~~

Artifacts: final.png, report.json, and report.html.

## Where it fits

Use BrowserProof after an AI browser agent, Playwright workflow, QA bot, or computer-use task. It is deliberately smaller than an agent framework: it only answers **can you prove the browser reached the requested state?**

## Roadmap

Perceptual screenshot assertions, signed proof bundles, GitHub Action annotations, agent adapters, and replay timelines.

## License

MIT
