---
name: retro-motion
description: Adds late-90s desktop motion to a web UI. Windows open and close with stepped dotted zoom rectangles, windows drag as outlines, menus drop in steps, progress crawls in blocks, carets blink, text types out, plus hourglass and arrow pixel cursors and marching-ants selection. Everything snaps or steps and nothing eases or fades. Use it whenever someone wants Windows 98 / XP / retro OS animations, "make it move like an old computer", window open/minimize effects, a fake boot or loading sequence, pixel cursors, or a retro desktop site or game that should feel alive, even if they just say "add some retro animation".
---

# Retro Motion

Old operating systems didn't ease. Things appeared, or stepped there in a few hard frames. That choppiness is the charm: copy it, don't smooth it.

Made for fun builds: side projects, portfolios, games, jams, toys, desktop-style sites.

## Files

- `assets/retro-motion.css`: stepped CSS effects (`rm-*` classes) and cursors.
- `assets/retro-motion.js`: `zoomOpen`, `zoomClose`, `dragOutline` as plain ES module functions, no dependencies.
- `assets/cursors/`: arrow, hourglass and hand, original 16px pixel art exported at 32px.
- `assets/demo.html`: every effect wired up. Read it for usage.

## The rules

1. **Steps, never curves.** Every animation uses `steps(n)` or `steps(1, end)` across keyframes. No `ease`, `cubic-bezier`, springs or `transition` on transform or opacity. If a library is in use (Motion, GSAP), use its stepped easing or skip it for these effects.
2. **Few frames, short.** 3 to 6 frames, 30 to 60ms each. A window opens in about 200ms. Longer looks broken, not retro.
3. **No fades, no blur, no scale-on-hover.** Things are visible or not.
4. **Motion has a job.** Zoom shows where a window came from or went to. The hourglass says "wait". Crawl says "working". Don't animate for decoration.
5. **Reduced motion cuts to the end.** The kit already does: zooms skip to the final state, crawl becomes a full bar, the caret stops.
6. **Keep behaviour.** Adding motion never changes what a control does or when. Open handlers still open; the animation runs around them.

## Pick the effect

| Moment | Effect | How |
|---|---|---|
| Window or dialog opens | Dotted outlines zoom out from the thing that launched it | `await zoomOpen(win, { from: launcherEl })`, or class `rm-zoom-open` for a CSS-only box zoom |
| Window closes or minimizes | Outlines shrink into its taskbar button | `await zoomClose(win, { to: taskButton })`, or `rm-zoom-close` |
| Window dragged | Outline follows the pointer, window jumps on release | `dragOutline(titleBar, win, { onMove })` |
| Menu opens | Drops in 3 steps | `rm-drop` (or `rm-drop-up` for menus that open upward) |
| Needs attention | Title bar flashes 3 times | `rm-flash` (re-add the class to replay) |
| Loading, unknown length | Blocks crawl across a sunken track | `<div class="rm-crawl"><i></i></div>` |
| Loading, known percent | Bar fills in 5% blocks | `<div class="rm-blocks" style="--rm-pct: 62"><i></i></div>` |
| Busy | Hourglass cursor | add `rm-cursor-busy` to `body`, remove when done |
| Selection rectangle | Marching ants | `rm-ants` on the box |
| Terminal / boot text | Types out, block caret blinks | `rm-type` with `--rm-chars: <length>`, then `rm-caret` |
| Desktop shortcut | Icon with label that selects navy | `button.rm-desk-icon > img + span` |

## Procedure

1. Find the moments in the UI that change state: open, close, load, wait, select, drag. Only those get motion.
2. Copy `retro-motion.css` (and `cursors/` beside it) and `retro-motion.js` into the project. Import the CSS once.
3. Wire each moment to its effect from the table. In React, call `zoomOpen` in an effect after the window mounts, or before unmount for `zoomClose` (await it, then update state). In Vue or Svelte the same, around the toggle.
4. Check it: click through each moment, then turn on reduced motion in the OS or devtools and confirm everything still works with no motion.

## Don't

Use Microsoft's real startup sound, boot screens, logos or cursor files. The cursors and effects here are original; keep it that way.
