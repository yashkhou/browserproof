import { createHash } from "node:crypto"; import { mkdir,readFile,writeFile } from "node:fs/promises"; import path from "node:path";
import { chromium,type Page } from "playwright"; import { renderHtml } from "./report.js"; import type { AssertionResult,BrowserAssertion,ProofReport,ProofSpec } from "./types.js";
async function check(page:Page,a:BrowserAssertion):Promise<AssertionResult>{try{
 if(a.type==="urlIncludes"){const x=page.url();return{assertion:a,actual:x,passed:x.includes(a.value)}}
 if(a.type==="titleIncludes"){const x=await page.title();return{assertion:a,actual:x,passed:x.includes(a.value)}}
 if(a.type==="text"){const x=await page.locator("body").innerText();return{assertion:a,actual:x.slice(0,500),passed:x.includes(a.value)}}
 if(a.type==="selectorVisible"){const x=await page.locator(a.selector).first().isVisible();return{assertion:a,actual:String(x),passed:x}}
 const x=await page.locator(a.selector).first().inputValue();return{assertion:a,actual:x,passed:x===a.value};
}catch(e){return{assertion:a,passed:false,error:e instanceof Error?e.message:String(e)}}}
export async function runProof(spec:ProofSpec,outDir="browserproof-artifacts",headed=false):Promise<ProofReport>{
 const startedAt=new Date().toISOString();await mkdir(outDir,{recursive:true});const browser=await chromium.launch({headless:!headed});const page=await browser.newPage();page.setDefaultTimeout(spec.timeoutMs??10000);await page.goto(spec.url,{waitUntil:"domcontentloaded"});
 for(const s of spec.steps??[]){if(s.action==="click")await page.locator(s.selector).click();else if(s.action==="fill")await page.locator(s.selector).fill(s.value);else if(s.action==="press")await page.locator(s.selector).press(s.key);else await page.locator(s.selector).waitFor({state:"visible"});}
 const assertions=[] as AssertionResult[];for(const a of spec.assertions??[])assertions.push(await check(page,a));const screenshotPath=path.join(outDir,"final.png");await page.screenshot({path:screenshotPath,fullPage:true});
 const screenshotSha256=createHash("sha256").update(await readFile(screenshotPath)).digest("hex");const report:ProofReport={startedAt,finishedAt:new Date().toISOString(),url:spec.url,finalUrl:page.url(),title:await page.title(),passed:assertions.every(x=>x.passed),assertions,screenshotPath,screenshotSha256};
 await browser.close();await writeFile(path.join(outDir,"report.json"),JSON.stringify(report,null,2));await writeFile(path.join(outDir,"report.html"),renderHtml(report));return report;}
