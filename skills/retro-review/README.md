# retro-review

Reviews a retro desktop UI and lists every detail that breaks the look, with file, line and the fix.

```bash
npx skills add theyaxh/skillsmith --skill retro-review
```

Then ask *"review my retro UI"*, *"why doesn't this look 98 enough?"* or *"polish this pixel OS page"*.

## What it's for

Fun builds: portfolios, side projects, games, jams, toys. It judges how convincing the illusion is, not modern product UX. Don't point it at your real app's settings page.

## What it does

1. Runs a lint over your code for the usual giveaways: rounded corners, soft shadows, blur, eased transitions, hover lifts, faded disabled states, removed focus, glow rings, the "fi" ligature bug, tracking, gradients, off-grid icon sizes, line icons, Microsoft names.
2. Screenshots the UI at 1x and 200%, because bevel and icon mistakes hide at normal size.
3. Walks a checklist (bevels, colour, type, icons, controls, states, motion, chrome, layout, branding).
4. Reports the problems, most visible first, with exact fixes and the top three changes. It only edits when you ask.

## What's inside

| File | What |
|---|---|
| `SKILL.md` | The procedure and report format |
| `references/checklist.md` | What to look for and how to fix each thing |
| `scripts/lint.mjs` | `node scripts/lint.mjs src/`: zero dependencies, prints `file:line [rule] message` |

Works on anything retro, whether it was made with `retro-convert`, 98.css, XP.css or by hand.
