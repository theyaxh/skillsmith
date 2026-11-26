# Rules: details that break the look

Each rule has a wrong and a right version. Read them before converting, and check the result against them after.

## 1. Bevels are square

Bevelled surfaces (windows, buttons, fields, menus, panels) have no radius. Only two things in the kit are rounded, both on purpose: the title bar's top corners (`6px 6px 0 0`) and the Start button's right end. Radios are round because they always were.

```css
/* wrong */
.card { border-radius: 12px; box-shadow: var(--retro-raised); }
/* right */
.card { border-radius: 0; box-shadow: var(--retro-raised); }
```

In Tailwind, remove every `rounded-*`, including `rounded-full` on avatars and pills.

## 2. Shadows are hard 1px lines, never soft

Depth comes from 1px light and dark lines, never blur. No `box-shadow` with blur radius, no `drop-shadow`, no `backdrop-filter`.

```css
/* wrong */
.menu { box-shadow: 0 12px 32px rgba(0,0,0,.15); backdrop-filter: blur(8px); }
/* right */
.menu { box-shadow: var(--retro-raised); background: var(--retro-face); }
```

## 3. Bevel order is fixed

Three bevels, each four layers: outer pair, then inner pair. Copy the tokens, never retype them.

- **Raised** (windows, buttons, menus): white top-left, near-black bottom-right outside; light grey top-left, grey bottom-right inside.
- **Sunken** (fields, wells, panes): the mirror. Grey top-left, white bottom-right outside; near-black top-left, light grey bottom-right inside.
- **Pressed** (active button): like sunken, but the near-black is the outer top-left.

```css
/* wrong: highlight on the bottom reads as lit from below */
.btn { box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #fff; }
/* right */
.btn { box-shadow: var(--retro-raised); }
.btn:active { box-shadow: var(--retro-pressed); }
```

Pressed buttons also shift their label 1px right and down (`padding: 7px 13px 5px 15px`). Without the shift, the press looks flat.

## 4. Inset bevels need room

Bevels are inset shadows, so a child that fills the box edge to edge paints over them. That's why `.r-window` has `padding: 3px` and `.r-well` has `padding: 2px`.

```html
<!-- wrong: the image covers the sunken edge -->
<div class="r-well" style="padding:0"><img src="a.png" style="width:100%"></div>
<!-- right -->
<div class="r-frame"><img src="a.png"></div>
```

Same for full-bleed headers or images inside a window: keep them inside the 3px frame.

## 5. One grey face, one navy selection

The face is `--retro-face` (#c0c0c0). Fields and wells are white. Selection, hover in menus and lists, and current nav items are `--retro-select` navy with white text. Brand colours don't fill buttons, rows or backgrounds.

```html
<!-- wrong -->
<button class="r-btn" style="background:#6366f1;color:#fff">Save</button>
<!-- right -->
<button class="r-btn r-default">Save</button>
```

Allowed colour: title-bar blue, the taskbar, `r-tag`, status text (`--retro-good`, `--retro-bad`), icons, meters, charts.

## 6. Pixel font in chrome, numbers in VT323

Pixelify Sans for labels, buttons, titles, menus, short body text. VT323 for figures: counts, money, sizes, times, table numbers. Long reading text (more than a few lines) goes in a plain sans with `r-readable` or `r-read`.

```html
<!-- wrong: a number in the UI font, a 30-line article in pixel type -->
<div class="value">1,240</div>
<article>...</article>
<!-- right -->
<div class="value r-num">1,240</div>
<article class="r-read">...</article>
```

At UI sizes Pixelify's 3 and 8 look alike, which is one more reason every figure goes in VT323.

Keep ligatures off: Pixelify Sans joins "fi" into a glyph that reads as "A" ("files" shows as "Ales"). `.retro` sets `font-feature-settings: "liga" 0`; don't re-enable it. Turn font smoothing off (`-webkit-font-smoothing: none`, set on `.retro`). Don't add `letter-spacing` or uppercase tracking. Keep pixel type at 13px or larger, and use whole-pixel sizes.

## 7. Icons are crisp and on the 16px grid

Show pixel icons at 16, 32 or 48px only. Other sizes give uneven pixels. Inline SVG needs `shape-rendering="crispEdges"`. `<img>` and raster images need `image-rendering: pixelated` when scaled. Both are already on `.r-icon`.

If the kit has no match, draw one on the same 16x16 grid with a 1px black outline. Don't drop in a line icon from a modern set.

```html
<!-- wrong: 20px blurs the grid, line icons look modern -->
<img src="icons/gear.svg" width="20" height="20">
<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">...</svg>
<!-- right -->
<img class="r-icon" src="icons/gear.svg" width="16" height="16" alt="">
```

## 8. Controls keep their real elements

Reskin, don't replace. A switch becomes a checkbox with the same state. A custom select keeps its keyboard handling. Title-bar buttons without a real action are `aria-hidden` spans, not fake buttons.

```jsx
// wrong: new element, lost handler, fake close
<div className="r-check">Weekly digest</div>
<button className="r-tb r-close">×</button>
// right
<label className="r-check"><input type="checkbox" checked={digest} onChange={toggleDigest} /><span>Weekly digest</span></label>
<span className="r-tb r-close" aria-hidden="true">×</span>
```

## 9. Focus is a dotted rectangle

Keyboard focus is a 1px dotted outline drawn inside the control (`outline-offset: -4px` on buttons). No glow rings.

```css
/* wrong */
.input:focus { box-shadow: 0 0 0 3px rgba(99,102,241,.3); }
/* right */
.input:focus { outline: 1px dotted var(--retro-ink); outline-offset: -4px; }
```

Never remove focus styles. `retro.css` already sets them; don't override them with `outline: none`.

## 10. Disabled text is embossed

Disabled labels are grey with a 1px white shadow below-right, not faded with opacity.

```css
/* wrong */
.btn:disabled { opacity: .5; }
/* right */
.btn:disabled { color: var(--retro-shadow); text-shadow: 1px 1px var(--retro-hilite); }
```

## 11. Motion snaps

No easing curves, springs, fades, blur or scale-on-hover. Use `steps()`.

```css
/* wrong */
.menu { transition: opacity .2s ease, transform .2s cubic-bezier(.2,.8,.2,1); }
/* right: appear at once, or step */
.dialog { animation: r-open 180ms steps(1, end) both; }
```

## 12. Hover is quiet

Buttons don't change colour on hover. Menus and list rows highlight navy. Taskbar buttons brighten slightly. Nothing lifts, grows or glows.

## 13. No real-company branding

Never use a real operating system\'s logo or name in product UI, its wallpapers, its bundled fonts or its system sounds. The kit is original: keep it that way. "start" on the taskbar is fine as a generic label, or use the product name.
