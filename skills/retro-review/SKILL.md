---
name: retro-review
description: Reviews a retro late-90s desktop UI (bevelled grey windows, blue title bars, pixel fonts and icons) and reports every detail that breaks the look, with file and line, why it breaks, and the fix. Use it whenever someone asks to "review", "check", "audit", "polish" or "make more authentic" a retro desktop / pixel OS / 90s-computer-style interface, asks "why does this not look retro enough", or has just finished a retro conversion and wants a second pass, even if they don't say "review".
---

# Retro Review

Find what breaks the retro desktop look and say how to fix it. Read-only by default: report first, fix only when asked.

Made for fun builds: side projects, portfolios, games, jams, toys. Judge them by how convincing the illusion is, not by modern product UX standards.

## Procedure

1. **Lint the code.** Run `node scripts/lint.mjs <src folder or files>`. It flags rounded corners, soft shadows, blur, smooth easing, hover lifts, faded disabled states, removed focus, glow rings, ligatures, tracking, gradients, icon sizes, line icons and real-company branding. Each hit is a lead: open it and decide. Title-bar top corners, radios and the taskbar's start button are allowed to be round. Gradients are allowed on title bars and the taskbar.
2. **Look at it.** Screenshot the UI (run it, or headless Chrome on the page) at normal size and zoomed to 200%. Bevel and icon mistakes only show up zoomed.
3. **Walk the checklist** in `references/checklist.md`, top to bottom, against the screenshot and the code. It has what to look for and the fix for each.
4. **Report** in this shape, most visible problems first:

```
## Breaks the look
1. [bevels] Buttons have 6px radius. src/Button.css:12. Set border-radius: 0.
...
## Small stuff
...
## Already right
- bevel order, focus rectangles, icon grid
```

Each finding: the checklist area in brackets, what is wrong, where (file:line or the element), the exact fix. Keep it to things a person would notice; skip nits the lint raised that are fine on inspection. End with the three changes that would help most.

5. **Fix only if asked.** Then change the skin only: never text, controls or behaviour.

## What "right" looks like, in one breath

Grey `#c0c0c0` face, white wells, navy `#0a246a` selection. Square bevels from four hard 1px inset lines (raised: white top-left, near-black bottom-right; sunken: the mirror; pressed: near-black outer top-left). Blue gradient title bar with 6px top corners only. Pixelify Sans for UI, VT323 for numbers, ligatures off, no smoothing. 16px pixel icons, crisp. Dotted focus rectangles. Embossed disabled text. Motion in steps, never eased.
