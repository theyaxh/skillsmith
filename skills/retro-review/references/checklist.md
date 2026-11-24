# Retro review checklist

Go top to bottom. Each item: what to look for, then the fix.

## Bevels
- **Rounded bevelled surfaces.** Windows, buttons, fields, menus, panels must be square. Fix: `border-radius: 0`. Allowed round: title-bar top corners (6px), radios, the start button's right end.
- **Wrong bevel order.** Light edge must be top-left on raised things and bottom-right on sunken things. A bottom highlight looks lit from below. Fix: raised `inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf`; sunken `inset -1px -1px #fff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a`.
- **Two-layer bevels.** One light and one dark line looks flat and cheap. Fix: all four layers.
- **Bevel covered by a child.** A full-bleed image, header or input inside a bevelled box hides its edge. Fix: 3px padding on windows, 2px on wells.
- **Pressed state missing.** Buttons that don't invert on `:active`. Fix: pressed bevel plus 1px label shift (`padding: 7px 13px 5px 15px` from `6px 14px`).
- **CSS borders instead of bevels.** `border: 1px solid #ccc` reads modern. Fix: inset shadows, `border: 0`.

## Depth and colour
- **Soft shadows, blur, glass.** Any blurred `box-shadow`, `drop-shadow`, `backdrop-filter`. Fix: remove; depth is only the bevel lines.
- **Brand-coloured buttons or rows.** Fix: grey face; primary button is bold, not coloured. Selection and menu hover are navy with white text.
- **Off-grey face.** Greys like `#d4d0c8`, `#e0e0e0` mixed with `#c0c0c0`. Fix: one face colour everywhere.
- **Gradients outside the title bar and taskbar.** Fix: flat fills.
- **Dark mode.** The look has no dark mode. Fix: drop it, or force `color-scheme: light` on the retro root.

## Type
- **Wrong fonts.** UI not in a pixel face, numbers not in VT323 (or another tall pixel mono). Fix: Pixelify Sans for UI, VT323 for figures.
- **"fi" ligature.** "files" shows as "Ales" in Pixelify Sans. Fix: `font-feature-settings: "liga" 0, "clig" 0` on the root (the `font` shorthand does not reset it, so it sticks).
- **Smoothing on.** Fix: `-webkit-font-smoothing: none`.
- **Tracking, uppercase labels, half-pixel sizes.** Fix: no letter-spacing, sentence case, whole-pixel sizes, 13px minimum.
- **Long text in pixel type.** Paragraphs over a few lines tire the eye. Fix: plain sans (Tahoma, Verdana) for reading text; chrome stays pixel.
- **Fonts never loaded.** Smooth fallback sans in the screenshot. Fix the font link before anything else.

## Icons
- **Line icons.** Thin strokes from a modern set. Fix: 16x16 pixel icons with 1px black outlines and flat fills.
- **Off-grid sizes.** 20px, 24px. Fix: 16, 32 or 48 only.
- **Blurry scaling.** Fix: `shape-rendering="crispEdges"` on SVG, `image-rendering: pixelated` on images.
- **Emoji as icons.** Fix: pixel icons.

## Controls
- **Switches.** No switches in this world. Fix: checkbox, same state and handler.
- **Pill inputs, pill badges, circle avatars.** Fix: square sunken fields, square tags, square avatars.
- **Native controls left unstyled.** Modern checkbox, select arrow, slider. Fix: sunken white box with pixel check, bevelled arrow button, bevelled slider thumb.
- **Tabs as underlines.** Fix: raised tabs; the selected one rises and joins the panel.
- **Spinners.** Fix: blocky progress bar or meter.
- **Toasts as dark pills.** Fix: pale yellow `#ffffe1` balloon with a 1px black outline.

## States
- **Glow focus rings or no focus at all.** Fix: 1px dotted outline drawn 4px inside the control.
- **Faded disabled.** `opacity: .5`. Fix: grey `#808080` text with `text-shadow: 1px 1px #fff`.
- **Hover lifts, grows or glows.** Fix: buttons don't react to hover; menus and list rows go navy.

## Motion
- **Eased or springy transitions.** Fix: appear at once, or `steps(n)`. Windows open with a stepped box zoom.
- **Fades.** Fix: cut.
- **No reduced-motion handling.** Fix: `@media (prefers-reduced-motion: reduce)` turns crawls and zooms off.

## Window chrome
- **Title bar without a heading.** The title should be the panel's own heading, not invented text.
- **Fake buttons.** `_ □ ×` that look clickable but do nothing should be `aria-hidden` spans; a real close action gets a real button.
- **Title text overflow.** Long titles must ellipsize, never wrap the bar taller.

## Layout
- **Horizontal scroll at phone width.** Fix: windows stack below ~600px.
- **Fixed taskbar covering content.** Fix: bottom padding equal to the taskbar height.

## Branding
- **Microsoft names or assets.** "Windows", the four-colour flag, Bliss, MS fonts bundled, system sounds. Fix: original names, icons and wallpaper. "start" is a fine generic label.
