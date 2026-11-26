#!/usr/bin/env node
// Retro lint: finds code-level details that break a late-90s desktop look.
// Usage: node lint.mjs <file-or-folder> [...more]
// Scans .css .scss .html .jsx .tsx .js .ts .vue .svelte .astro. Skips node_modules, dist, build, .git.
// Prints file:line  [rule]  message. Exit 1 when anything is found. Findings are leads, not verdicts:
// a title bar's 6px top radius or a radio's circle are fine, so read each one before fixing it.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const EXT = new Set([".css", ".scss", ".html", ".jsx", ".tsx", ".js", ".ts", ".vue", ".svelte", ".astro"]);
const SKIP = new Set(["node_modules", "dist", "build", ".git", ".next", "out", "coverage"]);

const RULES = [
  ["radius", /border-radius\s*:\s*(?!0(px)?\s*[;}"'])[^;}"']*[1-9]/i, "rounded corner on a bevelled surface (only title-bar top corners and radios are round)"],
  ["radius", /\brounded(-(?!none)[a-z0-9]+)?\b/, "Tailwind rounded-* class"],
  ["soft-shadow", /box-shadow\s*:(?![^;}]*inset)(?:[^;}]*,)?\s*-?\d+(px)?\s+-?\d+(px)?\s+[1-9]\d*px/i, "blurred box-shadow; depth is hard 1px lines"],
  ["soft-shadow", /\bshadow-(sm|md|lg|xl|2xl|inner)\b|\bshadow\b(?=["'\s])/, "Tailwind shadow class"],
  ["blur", /backdrop-filter|filter\s*:\s*[^;]*blur|\bbackdrop-blur|\bblur-(sm|md|lg|xl)|drop-shadow/i, "blur or drop-shadow"],
  ["smooth-motion", /cubic-bezier|\bease(-in|-out|-in-out)?\b|type\s*:\s*["']spring["']|\bspring\(/i, "smooth easing or spring; retro motion snaps with steps()"],
  ["smooth-motion", /transition\s*:\s*(?!none)[^;}]*\d*\.?\d+m?s\b/i, "CSS transition; retro UI cuts or steps"],
  ["smooth-motion", /\btransition(-all|-colors|-transform|-opacity)?\b(?=["'\s])|\bduration-\d+/, "Tailwind transition/duration class"],
  ["hover-lift", /hover:(scale|-?translate|shadow)|:hover[^{]*\{[^}]*(transform|scale)/i, "hover lifts or grows; retro hover is quiet"],
  ["faded-disabled", /:disabled[^{]*\{[^}]*opacity|disabled:opacity/i, "disabled faded with opacity; use grey text with a 1px white emboss"],
  ["focus-removed", /outline\s*:\s*(none|0)\b|focus:outline-none|focus-visible:outline-none/i, "focus outline removed; keep the dotted rectangle"],
  ["glow-ring", /\bring-\d|focus:ring|box-shadow\s*:\s*0 0 0 [2-9]px/i, "glow focus ring"],
  ["ligatures", /font-feature-settings\s*:\s*[^;]*["']liga["']\s*1|font-variant-ligatures\s*:\s*(normal|common)/i, "ligatures on; Pixelify Sans turns 'fi' into a glyph that reads as 'A'"],
  ["tracking", /letter-spacing\s*:\s*(?!0|normal)|\btracking-(wide|wider|widest)\b|text-transform\s*:\s*uppercase|\buppercase\b(?=["'\s])/i, "letter-spacing or uppercase tracking"],
  ["gradient", /bg-gradient-|from-\w+-\d+\s+to-/, "gradient fill (allowed only on title bars and the taskbar)"],
  ["icon-size", /class(Name)?=["'][^"']*\br-icon\b[^"']*["'][^>]*\b(width|height)=["']?(?!16\b|32\b|48\b)\d+/, "pixel icon not at 16, 32 or 48px"],
  ["line-icon", /stroke-width=["']?(1\.5|2)|strokeWidth=\{?["']?(1\.5|2)|lucide-react|@heroicons|react-icons/, "modern line icon; use 16px pixel icons"],
  ["branding", /\b(Windows\s*(95|98|XP|ME|2000)?|Microsoft|Bliss|MS Sans Serif)\b/, "real company or OS name in product copy"],
];

const files = [];
const walk = (p) => {
  const st = statSync(p);
  if (st.isDirectory()) { for (const n of readdirSync(p)) if (!SKIP.has(n)) walk(join(p, n)); }
  else if (EXT.has(extname(p))) files.push(p);
};
const args = process.argv.slice(2);
if (!args.length) { console.error("Usage: node lint.mjs <file-or-folder> [...]"); process.exit(2); }
args.forEach(walk);

let n = 0;
const byRule = {};
for (const f of files) {
  const lines = readFileSync(f, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.length > 2000) return; // minified
    for (const [rule, re, msg] of RULES) {
      if (re.test(line)) { n++; byRule[rule] = (byRule[rule] || 0) + 1; console.log(`${f}:${i + 1}  [${rule}]  ${msg}`); }
    }
  });
}
console.log(n ? `\n${n} finding(s): ${Object.entries(byRule).map(([k, v]) => `${k} ${v}`).join(", ")}` : `clean: ${files.length} file(s) checked`);
process.exit(n ? 1 : 0);
