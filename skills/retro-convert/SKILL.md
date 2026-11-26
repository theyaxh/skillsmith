---
name: retro-convert
description: Converts any existing UI (React, Vue, Svelte, Angular, plain HTML, Tailwind, CSS modules) into a retro late-90s desktop look, with grey bevelled windows, blue gradient title bars, pixel fonts, crisp pixel icons, sunken fields, blocky progress meters and a taskbar. It keeps every word, control and behaviour and swaps only the skin. Use it whenever someone asks to make an app, page, component or screen "look like an old 90s computer", "old PC", "retro desktop", "pixel OS", "vaporwave OS", "Y2K computer", "classic desktop UI", "bevelled 90s buttons", or wants a nostalgic or retro computer skin on an existing interface, even if they never say "convert".
---

# Retro Convert

Reskin an existing interface as a late-90s desktop: grey bevelled windows, blue gradient title bars, pixel type, crisp 16px icons.

Made for fun: side projects, portfolios, games, jams, April Fools skins, toys. Not meant for serious production product UI.

**The one rule: change the skin, never the product.** Every label, value, control, route, handler and state that exists before the conversion exists after it. You are replacing colour, radius, shadow, font and icon. Layout stays, unless a part has a retro equivalent that needs a different structure (a card becomes a window, so it gains a title bar).

## Files

- `assets/retro.css`: tokens and `r-*` classes. Plain CSS, namespaced, safe beside Tailwind, Bootstrap or shadcn.
- `assets/icons/*.svg`: original 16x16 pixel icons (app, folder, file, save, archive, upload, download, search, user, bell, mail, trash, home, chart, gear, info, help, warning, error, check, heart, star, note, computer, lock, smiley). Need one that is not there? Use the retro-icons skill.
- `assets/demo.html`: every part with its markup. Read it before writing markup, and copy from it.
- `references/mapping.md`: modern pattern to retro part. Read it during step 2.
- `references/rules.md`: wrong vs right pairs for the details that break the look. Read it before step 4.
- `scripts/content-check.mjs`: renders before and after in headless Chrome and diffs visible text and control counts.

## Procedure

### 1. Inventory

Read the UI's code and list its parts: app shell, nav, headers, cards, forms and each control type, buttons and their variants, menus, dialogs, toasts, tables, lists, tabs, progress, badges, icons, empty states. Note how it is styled (Tailwind utilities, CSS modules, styled-components, plain CSS, a component library) and where the shared pieces live. Shared components are where the conversion pays off: converting `Button.tsx` converts every button.

If you can run the app, screenshot it now. That is your "before".

### 2. Map

Give each part its retro equivalent from `references/mapping.md`. The common ones:

| Modern | Retro |
|---|---|
| top-level card, panel, section | `r-window` with `r-title` (title = the card's heading) |
| nested card, settings group | `r-group` fieldset with a legend |
| primary button | `r-btn r-default` (bold), never a coloured fill |
| text input, select, textarea | `r-input`, `r-select`, `r-textarea` (sunken white well) |
| switch / toggle | `r-check` checkbox |
| dropdown menu | `r-menu` |
| modal | `r-window r-dialog` on `r-backdrop` |
| toast, tooltip | `r-balloon` |
| sidebar nav | explorer pane: `r-pane` + `r-list` |
| progress bar | `r-meter` (blocks) or `r-progress` |
| badge, pill | `r-tag` |
| stat number | `r-num` (VT323) |

Decide before writing code. If a part has no clear equivalent, use a raised panel (`r-raised`) or sunken well (`r-well`) and keep its structure.

### 3. Install the kit

Copy `assets/retro.css` and the icons you need into the project (for example `src/styles/retro.css`, `public/icons/retro/`). Import the CSS once at the app root, after any reset or base CSS and before utility CSS. Tailwind v3: `@tailwind base;`, then `retro.css`, then `@tailwind utilities;`. Tailwind v4: `@import "./retro.css" layer(components);` after `@import "tailwindcss";`. Kit selectors weigh one class each, so a layout utility on the same element (`max-w-md`, `fixed`, `flex-col`) wins. `retro.css` pulls its fonts with an `@import` on line 1; if your bundler drops it, add the Google Fonts `<link>` for Pixelify Sans and VT323 in the HTML head instead. Put `class="retro"` on `<body>` (or `<html>`), not on an inner wrapper, so portalled menus, dialogs and toasts inherit it. Give the page background `--retro-desktop` blue.

In Tailwind projects, put `.retro` and `r-*` classes beside the layout utilities. Do not try to rebuild the bevels in utilities: the shadows are four-layer and order-sensitive, and the classes already have them right.

### 4. Convert, part by part

Start with shared components, then pages. For each element:

1. **Strip the skin.** Remove colour, background, border, border-radius, box-shadow, font-family, font-size tweaks, gradients, blur, transitions on colour/transform. In Tailwind that means `bg-*`, `text-{color}`, `border-*`, `rounded-*`, `shadow-*`, `ring-*`, `font-{family}`, `backdrop-blur-*`, `transition-*`. In CSS files, delete those properties. Keep layout: `display`, `grid`, `flex`, `gap`, `padding`, `margin`, `width`, `position`, responsive breakpoints.
2. **Apply the retro part** from your map, using the markup shape in `assets/demo.html`.
3. **Keep semantics and behaviour.** Same element types, same `aria-*`, same handlers, same state. A `<button>` stays a button. A switch becomes a checkbox with the same `checked` binding and `onChange`; keep `role="switch"` and `aria-checked` on the input if the original had them. A tab keeps `role="tab"` and `aria-selected`.
4. **Invent nothing.** No new words: no legends, headings, labels or titles that weren't in the original (a window without a heading gets no title bar text, or no title bar). Icons are not words, so a 16px icon in a title bar is fine. Title-bar buttons `_ □ ×` are decoration: render them as `aria-hidden` spans. The one exception: when a dialog or panel already has a close action (a Cancel, an Esc handler, a close icon), the title bar's `×` becomes a real button wired to that same action. Don't add a taskbar, menu bar, Start button or status bar unless the original has something they can honestly stand for (a global nav, a menu, a status line), or the user asks for desktop dressing.
5. **Swap icons.** Replace line icons with the closest `assets/icons/*.svg` at 16px (or 32px for dialog icons). If none fits, draw a new 16x16 pixel icon in the same style (hard 1px black outline, flat fills, `shape-rendering="crispEdges"`). Keep the original line icon only as a last resort, at 16px with its stroke thickened so it doesn't vanish. Drop decorative logo gradients for the `app` icon or the product's own mark.

Fonts: Pixelify Sans for all UI text, VT323 (`r-num`, `r-readout`, `r-lcd`) for numbers, times, sizes and counters. For long reading text (articles, docs, help), add `r-readable` to the root so paragraphs use a plain sans while chrome stays pixel.

Colour meaning survives, in retro form: success becomes `r-tag r-good` or `--retro-good` text, danger becomes `--retro-bad` text or `r-tag r-bad`, brand colour mostly goes away (selection is always `--retro-select` navy). A destructive button stays a plain `r-btn`; its confirmation dialog carries the warning with the `warning` icon.

### 5. Verify

1. **Fonts loaded.** In the screenshot, labels must be in the blocky pixel face and numbers in the tall thin VT323. A smooth sans means the fonts didn't load: fix that before judging anything else.
2. **Content check.** Run `node scripts/content-check.mjs <before> <after>` (files or URLs; keep a copy of the original page or run both versions). Text, buttons, inputs and links must match, with nothing added. Two differences are expected and fine: a switch moves from buttons to inputs, and a wired dialog `×` adds one button. Name any difference in your report. If you can't render pages, count them by hand from the code. Then search the diff for deleted handlers, props or `aria-*`.
3. **Screenshot** the converted UI (run the app, or a headless browser on the page) and compare with the before.
4. **Rules pass.** Go through `references/rules.md` against the screenshot and code. The usual misses: leftover `rounded-*` or soft shadows, a coloured primary button, a modern switch, smooth-scaled icons, a bevel hidden by a full-bleed child, pixel font on a 40-line paragraph.
5. Check one narrow width (about 390px): windows stack, nothing scrolls sideways.

Report what you mapped, anything you left as-is and why, and show the screenshots.

## Motion

Retro UI snaps. No easing, springs, fades or blur. If the original animates, keep the timing purpose and change the motion to steps: `animation-timing-function: steps(n)`, or the `r-opening` class (a three-step box zoom for windows and dialogs). Progress crawls in steps (`r-progress`). Respect `prefers-reduced-motion`; the kit already does.

## Naming and assets

Never use another company's names, logos, wallpapers, system fonts or sounds in a product. The kit's fonts (Pixelify Sans, VT323) are open Google Fonts and its icons are original. In UI copy, say "retro desktop", never a real operating system's name.
