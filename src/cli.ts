#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { Command } from "commander";
import { runProof } from "./run.js";
import type { ProofSpec } from "./types.js";

const program = new Command();
program.name("browserproof").description("Verify browser automation with explicit evidence.");
program.command("run").argument("<spec>")
  .option("-o, --out <dir>", "Artifact directory", "browserproof-artifacts")
  .option("--headed", "Show the browser")
  .action(async (specPath, options) => {
    const spec = JSON.parse(await readFile(specPath, "utf8")) as ProofSpec;
    const report = await runProof(spec, options.out, Boolean(options.headed));
    console.log((report.passed ? "PASS " : "FAIL ") + report.finalUrl);
    console.log("proof: " + options.out + "/report.html");
    process.exitCode = report.passed ? 0 : 1;
  });
await program.parseAsync();
