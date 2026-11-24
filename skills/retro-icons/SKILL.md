---
name: retro-icons
description: Draws original 16x16 pixel-art icons in a late-90s desktop style (hard 1px black outlines, flat fills, crisp at any whole-number scale) and exports them as SVG files, a sprite, or React components. Ships 26 ready icons (folder, file, save, trash, gear, search, user, bell, mail, home, chart, warning, error, info, help, check, upload, download, heart, star, note, computer, lock, smiley and more). Use it whenever someone wants pixel icons, 8-bit or 16-bit icons, retro / Windows 98 / XP / old-OS style icons, desktop icons for a fun site or game, a favicon in pixel art, or needs an icon the retro kit doesn't have, even if they just say "make me a little icon for X".
---

# Retro Icons

Pixel icons on a 16x16 grid, drawn as text, exported crisp.

Made for fun builds: side projects, portfolios, games, jams, toys, desktop-style sites.

## Files

- `assets/icons.json`: the palette and every icon as an ASCII grid. This is the source; edit it, not the SVGs.
- `assets/icons/*.svg` and `assets/icons/preview.html`: the exported set.
- `scripts/pixel-icons.mjs`: grid to SVG. `node scripts/pixel-icons.mjs <icons.json> <out-dir> [--sprite] [--react] [--only a,b]`.

## Using an existing icon

Copy the SVG. Show it at 16, 32 or 48px only. Inline SVG keeps `shape-rendering="crispEdges"`; an `<img>` scaled up needs `image-rendering: pixelated`. Decorative icons get `alt=""` / `aria-hidden`; an icon-only button keeps its `aria-label`.

## Drawing a new icon

1. **Pick the silhouette first.** One object, readable at 16px from its outline alone. Choose the most iconic angle: a floppy from the front, a folder from the side, a bell from the front. No scenes, no text, no gradients.
2. **Grid.** 16 rows of 16 characters. `.` is transparent. Keep a 1px empty margin on at least two sides so icons line up in a row; tall objects can use rows 1 to 14.
3. **Outline.** A closed 1px `k` (black) outline. Diagonals are staircase steps of 1 or 2 pixels, kept regular: 1-1-1 or 2-2-2, never 1-3-1. Avoid orphan pixels and doubled corners (an L of three black pixels where two would do).
4. **Fill.** Flat palette colours, one main colour plus one darker shade for the bottom-right side. Light comes from the top-left: a white or light highlight of 1 to 3 pixels on the top-left edge, never a gradient.
5. **Palette.** Use the keys in `icons.json` (`k` black, `w` white, `g` face grey, `d` shadow grey, `b`/`B` blues, `y`/`Y` yellows, `o`/`O` orange, `r`/`R` reds, `n` green, `s` skin, `l` light blue, `L`/`p` light greys, `K` near-black). Add a key only when an icon truly needs a new colour.
6. **Symmetry.** Symmetric objects are symmetric about the centre line between columns 7 and 8: if column 3 is set, column 12 is too.
7. **Export and look.** Add the grid to `icons.json`, run the script with `--only <name>`, open `preview.html`, and check it at 1x on both grey and white. Fix whatever reads wrong at 1x even if 3x looks fine: 1x is what people see.

Example, a folder:

```
"folder": [
 "................",
 "................",
 "..kkkkk.........",
 ".kyyyyyk........",
 ".kyyyyyykkkkkkkk",
 ".kywwwwwwwwwwwyk",
 ".kyyyyyyyyyyyyYk",
 ".kyyyyyyyyyyyyYk",
 ".kyyyyyyyyyyyyYk",
 ".kyyyyyyyyyyyyYk",
 ".kyyyyyyyyyyyyYk",
 ".kyyyyyyyyyyyyYk",
 ".kYYYYYYYYYYYYYk",
 ".kkkkkkkkkkkkkkk",
 "................",
 "................"
]
```

## Bigger icons

A 32x32 grid works the same (the script reads the size from the grid). Use it for dialog and desktop icons only. Draw it fresh: never scale a 16px icon up and call it 32px art.

## Favicons

Export the 16px SVG and use it directly: `<link rel="icon" href="/icons/app.svg" type="image/svg+xml">`.

## Don't

Draw Microsoft logos, the four-colour flag, or copies of real OS icons. Draw your own: the style is generic, the art must be original.
