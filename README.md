# Skillsmith

Skills for designers and engineers, forged by hand.

Each skill teaches your coding agent one craft properly, so it stops guessing.

## Install

```bash
npx skills add theyaxh/skillsmith
```

Pick the skills you want from the list, or install one:

```bash
npx skills add theyaxh/skillsmith --skill retro-convert
```

Works with Claude Code, Cursor, Codex and the other agents the `skills` CLI supports. In Claude Code the skills also load as a plugin, named `skillsmith:<skill>`.

## Skills

### Retro

A late-90s desktop look for fun builds: portfolios, side projects, games, jams, toys. Not for serious production UI.

| Skill | What it does |
|---|---|
| [`retro-convert`](skills/retro-convert) | Reskins any UI (React, Vue, Svelte, plain HTML) as a retro desktop: bevelled windows, blue title bars, pixel type and icons. Keeps every word and behaviour. |
| [`retro-review`](skills/retro-review) | Finds what breaks the retro look, with file, line and fix. Ships a zero-dependency lint. |
| [`retro-icons`](skills/retro-icons) | 26 original 16x16 pixel icons, plus the method and script to draw more. |
| [`retro-motion`](skills/retro-motion) | Stepped window zooms, outline drags, menu drops, block progress, pixel cursors. Nothing eases. |
