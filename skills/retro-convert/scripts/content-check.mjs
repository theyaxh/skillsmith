#!/usr/bin/env node
// Content check for a conversion: same visible text and the same number of buttons, inputs and links, before vs after.
// Usage: node content-check.mjs <before> <after>
//   <before>/<after> are file paths or http(s) URLs. Pages are rendered in headless Chrome or Edge, so JS-built UIs count.
//   Set CHROME=/path/to/chrome if it is not found automatically.
// Exit code 1 when anything differs. Title-bar glyphs (_ □ ×) and caret ▾ are ignored.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const candidates = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) { console.error("No Chrome/Edge found. Set CHROME=/path/to/browser."); process.exit(2); }

const url = (x) => (/^https?:/.test(x) ? x : pathToFileURL(resolve(x)).href);
const dump = (x) => execFileSync(chrome, ["--headless=new", "--disable-gpu", "--virtual-time-budget=6000", "--dump-dom", url(x)],
  { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 });

const stats = (html) => {
  const body = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, "");
  const count = (re) => (body.match(re) || []).length;
  const text = body.replace(/<[^>]+>/g, "\n").split("\n")
    .map((s) => s.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&times;|×|✕|✖/g, "x").replace(/\s+/g, " ").trim())
    .filter((s) => s && !/^[_□x▾▼]$/.test(s));
  return { buttons: count(/<button\b/g), inputs: count(/<(input|select|textarea)\b/g), links: count(/<a\b/g), text: new Set(text) };
};

const [beforeArg, afterArg] = process.argv.slice(2);
if (!beforeArg || !afterArg) { console.error("Usage: node content-check.mjs <before> <after>"); process.exit(2); }
const a = stats(dump(beforeArg)), b = stats(dump(afterArg));
let ok = true;
for (const k of ["buttons", "inputs", "links"]) {
  const same = a[k] === b[k]; ok &&= same;
  console.log(`${same ? "ok  " : "DIFF"} ${k.padEnd(8)} ${a[k]} -> ${b[k]}`);
}
const lost = [...a.text].filter((t) => !b.text.has(t)), added = [...b.text].filter((t) => !a.text.has(t));
if (lost.length) { ok = false; console.log("DIFF text missing after:", lost); } else console.log("ok   no text lost");
if (added.length) { ok = false; console.log("DIFF text added after (invented labels?):", added); } else console.log("ok   no text added");
process.exit(ok ? 0 : 1);
