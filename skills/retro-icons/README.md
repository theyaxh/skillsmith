# retro-icons

Original 16x16 pixel icons in a late-90s desktop style, plus the method and script to draw new ones.

```bash
npx skills add theyaxh/skillsmith --skill retro-icons
```

Then ask *"make me a pixel icon of a rocket"*, *"I need 8-bit icons for my game menu"* or *"pixel art favicon for my site"*.

## What it's for

Fun stuff: retro sites, games, desktop-style portfolios, jam entries, favicons, stickers on a page. Icons are drawn as text grids, so your agent can make new ones that match the set.

## What's inside

| File | What |
|---|---|
| `SKILL.md` | How to draw a good 16px icon: silhouette, outline, steps, light, palette, symmetry |
| `assets/icons.json` | The source: palette and every icon as an ASCII grid |
| `assets/icons/` | 26 exported SVGs and a `preview.html` sheet |
| `scripts/pixel-icons.mjs` | Grid to SVG, plus `--sprite` and `--react` outputs |

The set: app, archive, bell, chart, check, computer, download, error, file, folder, gear, heart, help, home, info, lock, mail, note, save, search, smiley, star, trash, upload, user, warning.

```bash
node scripts/pixel-icons.mjs assets/icons.json out/ --react --sprite
```

All art is original. No copies of real OS icons.
