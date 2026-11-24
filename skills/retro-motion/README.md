# retro-motion

Late-90s desktop motion for the web. Windows zoom open with dotted rectangles, drag as outlines and shrink into the taskbar. Menus drop in steps, progress crawls in blocks, the hourglass spins. Nothing eases.

```bash
npx skills add theyaxh/skillsmith --skill retro-motion
```

Then ask *"make my windows open like Windows 98"*, *"add a fake boot sequence"* or *"retro cursors and loading bars"*.

## What it's for

Fun builds: desktop-style portfolios, games, jam entries, toys, joke sites. The motion is choppy on purpose, which suits a playful page and nothing serious.

## What's inside

| File | What |
|---|---|
| `SKILL.md` | The rules (steps, few frames, motion with a job, reduced motion) and which effect fits which moment |
| `assets/retro-motion.css` | `rm-*` classes: zoom open/close, menu drop, title flash, crawl, block progress, marching ants, caret, typewriter, desktop icon, cursors |
| `assets/retro-motion.js` | `zoomOpen`, `zoomClose`, `dragOutline`: plain ES module, no dependencies |
| `assets/cursors/` | Arrow, hourglass and hand, original pixel art |
| `assets/demo.html` | Everything wired up (serve the folder; ES modules don't load over `file://`) |

Respects `prefers-reduced-motion`. No Microsoft sounds, boot screens or cursor files.
