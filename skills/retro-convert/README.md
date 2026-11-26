# retro-convert

Turns any UI into a late-90s desktop: grey bevelled windows, blue gradient title bars, pixel type, crisp 16px icons, sunken fields, blocky progress bars, balloons instead of toasts.

```bash
npx skills add theyaxh/skillsmith --skill retro-convert
```

Then ask your agent something like *"make this page look like an old 90s computer"* or *"give my portfolio a retro desktop skin"*.

## What it's for

Fun stuff: portfolios, side projects, games, jam entries, April Fools skins, toys, personal sites. It is not meant for real production product UI. A pixel font and a grey bevel look great on a playful page and get tiring on a tool people use all day.

## What it does

- Reads your UI (React, Vue, Svelte, Angular, plain HTML; Tailwind, CSS modules or plain CSS) and lists its parts.
- Maps each part to its retro version: card to window, modal to dialog, dropdown to menu, switch to checkbox, sidebar to explorer pane, toast to balloon.
- Swaps only the skin. Every word, control, handler and state stays.
- Checks the result with a script that diffs visible text and control counts before and after.

## What's inside

| File | What |
|---|---|
| `SKILL.md` | The procedure the agent follows |
| `references/mapping.md` | Modern pattern to retro part, about 50 rows |
| `references/rules.md` | Wrong vs right pairs for the details that break the look |
| `assets/retro.css` | Drop-in plain CSS: tokens plus `r-*` classes, safe beside Tailwind or any app CSS |
| `assets/icons/` | 26 original 16x16 pixel icons |
| `assets/demo.html` | Every part with copyable markup |
| `scripts/content-check.mjs` | Before/after text and control diff in headless Chrome |

## Pairs well with

- `retro-review`: a second pass that finds what still breaks the look.
- `retro-icons`: when you need an icon the kit doesn't have.
- `retro-motion`: stepped window zooms, outline drags, hourglass cursors.

Fonts are Pixelify Sans and VT323 (open Google Fonts). Icons are original. No assets from any real company.
